<?php

namespace App\Services;

use App\Ai\Tools\CalculateDeliveryFee;
use App\Ai\Tools\CheckProductStock;
use App\Ai\Tools\CreateOrder;
use App\Ai\Tools\GetCommunityPosts;
use App\Ai\Tools\GetMemberPoints;
use App\Ai\Tools\GetRatAgenda;
use App\Ai\Tools\GetUserContext;
use App\Ai\Tools\SubmitRatVote;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Throwable;

class KoperaAiService
{
    public function handleIncomingMessage(string $phoneNumber, string $message): string
    {
        if ((bool) config('ai.fallback_mode', false)) {
            return 'Mohon tunggu, saya sedang mengecek data terbaru.';
        }

        $userContext = app(GetUserContext::class, [
            'whatsappNumber' => $phoneNumber,
            'cooperativeId' => User::query()->where('phone_number', $phoneNumber)->value('cooperative_id'),
        ])->handle();

        $user = $userContext['exists']
            ? User::query()->find($userContext['user_id'])
            : User::query()->where('phone_number', $phoneNumber)->first();
        $normalizedMessage = Str::lower(trim($message));

        if ($user && Cache::has($this->commerceCacheKey($phoneNumber)) && Str::contains($normalizedMessage, ['ya', 'konfirmasi'])) {
            return $this->handleCommerce($user, $message);
        }

        $intent = $this->detectIntent($message);

        return match ($intent) {
            'commerce' => $this->handleCommerce($user, $message),
            'points' => $this->handlePoints($user),
            'rat' => $this->handleRat($user, $message),
            'community' => $this->handleCommunity($user, $message),
            default => $this->handleOnboarding($user, $phoneNumber, $message),
        };
    }

    protected function detectIntent(string $message): string
    {
        $message = Str::lower($message);

        if (Str::contains($message, ['beli', 'pesan', 'stok', 'harga', 'produk'])) {
            return 'commerce';
        }

        if (Str::contains($message, ['poin', 'level', 'badge', 'reward', 'hadiah', 'tukar poin'])) {
            return 'points';
        }

        if (Str::contains($message, ['rat', 'rapat', 'voting', 'agenda', 'kuorum', 'vote'])) {
            return 'rat';
        }

        if (Str::contains($message, ['koperasi lain', 'praktik baik', 'kopdes community', 'sharing', 'insight'])) {
            return 'community';
        }

        return 'onboarding';
    }

    protected function handleOnboarding(?User $user, string $phoneNumber, string $message): string
    {
        if (! $user) {
            return 'Halo, saya KOPERA. Boleh sebutkan nama dan minat utama Anda? Misalnya pertanian, peternakan, UMKM, atau simpan-pinjam.';
        }

        $profile = $this->extractProfile($message);

        if ($profile === null) {
            return 'Saya bisa bantu pendaftaran dan edukasi koperasi. Ceritakan dulu nama, lokasi, dan jenis usaha Anda.';
        }

        DB::table('member_profiles')->updateOrInsert(
            [
                'cooperative_id' => $user->cooperative_id,
                'user_id' => $user->id,
            ],
            [
                'phone_number' => $phoneNumber,
                'name' => $profile['name'],
                'location' => $profile['location'],
                'occupation' => $profile['occupation'],
                'interest' => $profile['interest'],
                'onboarding_status' => 'completed',
                'meta' => json_encode(['source' => 'whatsapp']),
                'updated_at' => now(),
                'created_at' => now(),
            ],
        );

        return 'Terima kasih. Profil Anda sudah saya simpan. Selanjutnya saya bisa bantu pilih koperasi yang paling relevan, cek produk, atau jelaskan cara daftar.';
    }

    protected function handleCommerce(?User $user, string $message): string
    {
        $cooperativeId = $user?->cooperative_id;
        $normalizedMessage = Str::lower($message);

        if (Str::contains($normalizedMessage, ['ya', 'konfirmasi']) && $user) {
            $phoneNumber = $user->phone_number ?? '';
            $proposal = Cache::get($this->commerceCacheKey($phoneNumber));

            if (! is_array($proposal) || ! isset($proposal['product_id'])) {
                return 'Saya belum menemukan pesanan terakhir yang perlu dikonfirmasi. Sebutkan produk yang ingin dibeli dulu.';
            }

            $orderResult = app(CreateOrder::class, ['cooperativeId' => $cooperativeId])->handle([
                'user_id' => $user->id,
                'delivery_method' => $proposal['delivery_method'] ?? 'pickup',
                'delivery_address' => $proposal['delivery_address'] ?? null,
                'items' => [
                    [
                        'product_id' => (int) $proposal['product_id'],
                        'quantity' => (int) ($proposal['quantity'] ?? 1),
                    ],
                ],
            ]);

            Cache::forget($this->commerceCacheKey($phoneNumber));

            return $orderResult['created']
                ? "✅ Order berhasil dibuat. Nomor order: {$orderResult['order_id']}."
                : $orderResult['message'];
        }

        $productResult = app(CheckProductStock::class, ['cooperativeId' => $cooperativeId])->handle($message);

        if (! $productResult['found']) {
            return 'Maaf, data sedang tidak tersedia. Coba beberapa saat lagi atau hubungi pengurus.';
        }

        $product = $productResult['product'];
        $fee = app(CalculateDeliveryFee::class)->handle();
        $quantity = $this->extractQuantity($message);
        $deliveryMethod = Str::contains($normalizedMessage, ['antar', 'diantar']) ? 'delivery' : 'pickup';
        $deliveryAddress = $deliveryMethod === 'delivery' ? $this->extractDeliveryAddress($message) : null;

        Cache::put($this->commerceCacheKey($user?->phone_number ?? ''), [
            'product_id' => $product['id'],
            'quantity' => $quantity,
            'delivery_method' => $deliveryMethod,
            'delivery_address' => $deliveryAddress,
            'delivery_fee' => $fee['fee'],
        ], now()->addMinutes(15));

        return "📦 {$product['name']} tersedia!\nStok: {$product['stock']} {$product['unit']}\nHarga: Rp".number_format((int) $product['price'], 0, ',', '.')."/{$product['unit']}\nOngkir estimasi: Rp".number_format($fee['fee'], 0, ',', '.')."\n\nMau diantar ke rumah atau diambil di koperasi? Ketik YA untuk konfirmasi.";
    }

    protected function handlePoints(?User $user): string
    {
        if (! $user) {
            return 'Maaf, data sedang tidak tersedia. Coba beberapa saat lagi atau hubungi pengurus.';
        }

        $points = app(GetMemberPoints::class, ['cooperativeId' => $user->cooperative_id])->handle($user->id);
        $badgeText = empty($points['badges']) ? 'Belum ada badge' : implode(', ', $points['badges']);

        return "🏆 Info Poin Kamu\nLevel: {$points['level']}\nTotal Poin: {$points['total_points']} poin\nBadge: {$badgeText}\n\nKamu bisa dapat poin dari transaksi, ikut RAT, atau lengkapi profil.";
    }

    protected function handleRat(?User $user, string $message): string
    {
        if (! $user) {
            return 'Maaf, data sedang tidak tersedia. Coba beberapa saat lagi atau hubungi pengurus.';
        }

        $agendas = app(GetRatAgenda::class, ['cooperativeId' => $user->cooperative_id])->handle();

        if (empty($agendas)) {
            return 'Maaf, data sedang tidak tersedia. Coba beberapa saat lagi atau hubungi pengurus.';
        }

        $agenda = $agendas[0];
        $summary = $agenda['summary'] ?? 'Ringkasan belum tersedia.';
        $message = Str::lower($message);

        if (Str::contains($message, ['hadir', 'check-in', 'checkin'])) {
            try {
                DB::table('rat_attendances')->updateOrInsert(
                    [
                        'rat_agenda_id' => $agenda['id'],
                        'user_id' => $user->id,
                    ],
                    [
                        'attended_at' => now(),
                        'updated_at' => now(),
                        'created_at' => now(),
                    ],
                );
            } catch (Throwable) {
                return 'Maaf, data sedang tidak tersedia. Coba beberapa saat lagi atau hubungi pengurus.';
            }

            return '✅ Kehadiran RAT kamu sudah dicatat. 1 anggota = 1 suara.';
        }

        if (Str::contains($message, ['vote', 'pilih'])) {
            $item = DB::table('rat_agenda_items')
                ->where('rat_agenda_id', $agenda['id'])
                ->where('is_votable', true)
                ->orderBy('sort_order')
                ->first();

            if (! $item) {
                return 'Maaf, data sedang tidak tersedia. Coba beberapa saat lagi atau hubungi pengurus.';
            }

            $choice = $this->extractVoteChoice($message);
            $result = app(SubmitRatVote::class, ['cooperativeId' => $user->cooperative_id])->handle(
                $item->id,
                $user->id,
                $choice,
            );

            return $result['message'];
        }

        return "📋 {$agenda['title']}\nTanggal: {$agenda['scheduled_at']}\n\nRingkasan agenda:\n{$summary}\n\nApakah kamu ingin check-in hadir untuk RAT ini?";
    }

    protected function handleCommunity(?User $user, string $message): string
    {
        if (! $user || $user->role !== 'pengurus') {
            return 'Fitur Kopdes Community khusus pengurus koperasi.';
        }

        $posts = app(GetCommunityPosts::class)->handle($user->cooperative_id);

        if (empty($posts)) {
            return 'Maaf, data sedang tidak tersedia. Coba beberapa saat lagi atau hubungi pengurus.';
        }

        $post = $posts[0];

        return "📌 {$post['title']}\n\n{$post['content']}";
    }

    /**
     * @return array{name: string, location: string|null, occupation: string|null, interest: string|null}|null
     */
    protected function extractProfile(string $message): ?array
    {
        $message = Str::lower($message);

        if (! Str::contains($message, ['nama', 'minat', 'lokasi', 'usaha', 'pekerjaan'])) {
            return null;
        }

        preg_match('/nama saya\s+([^,\.]+)/i', $message, $nameMatches);
        preg_match('/lokasi\s+([^,\.]+)/i', $message, $locationMatches);
        preg_match('/usaha\s+([^,\.]+)/i', $message, $occupationMatches);
        preg_match('/minat\s+([^,\.]+)/i', $message, $interestMatches);

        return [
            'name' => isset($nameMatches[1]) ? Str::of($nameMatches[1])->trim()->headline()->toString() : 'Anggota Baru',
            'location' => $locationMatches[1] ?? null,
            'occupation' => $occupationMatches[1] ?? null,
            'interest' => $interestMatches[1] ?? null,
        ];
    }

    protected function commerceCacheKey(string $phoneNumber): string
    {
        return 'kopera:commerce:'.$phoneNumber;
    }

    protected function extractQuantity(string $message): int
    {
        if (preg_match('/\b(\d+)\b/', $message, $matches)) {
            return max(1, (int) $matches[1]);
        }

        return 1;
    }

    protected function extractDeliveryAddress(string $message): ?string
    {
        if (preg_match('/(?:alamat|ke)\s+(.+)/i', $message, $matches)) {
            $address = trim($matches[1]);

            return $address !== '' ? $address : null;
        }

        return null;
    }

    protected function extractVoteChoice(string $message): string
    {
        if (preg_match('/vote\s+(.+)/i', $message, $matches)) {
            return trim($matches[1]);
        }

        if (preg_match('/pilih\s+(.+)/i', $message, $matches)) {
            return trim($matches[1]);
        }

        return 'setuju';
    }
}
