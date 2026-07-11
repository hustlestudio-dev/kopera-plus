<?php

namespace App\Services\Ai;

use App\Models\Product;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Throwable;

class KoperaAiService
{
    public function buildModePrompt(string $mode, array $context): string
    {
        return match ($mode) {
            'onboarding' => $this->buildOnboardingPrompt($context),
            'commerce' => $this->buildCommercePrompt($context),
            'rat_summary' => $this->buildRatSummaryPrompt($context),
            'governance' => $this->buildGovernancePrompt($context),
            'cross_kopdes' => $this->buildCrossKopdesPrompt($context),
            'nudge' => $this->buildEngagementNudgePrompt($context),
            default => $this->buildAssistantPrompt($context),
        };
    }

    public function generateResponse(array $payload): array
    {
        $provider = $payload['provider'] ?? 'gemini';
        $systemPrompt = $payload['system_prompt'];
        $userPrompt = $payload['user_prompt'];
        $toolsContext = $payload['tools_context'] ?? [];

        $primaryModel = $payload['model'] ?? $this->defaultModel($provider);

        $primaryResponse = $this->callProvider(
            $provider,
            $primaryModel,
            $systemPrompt,
            $userPrompt,
            $payload['temperature'] ?? 0.4,
            $payload['max_tokens'] ?? 250,
            $toolsContext,
        );

        if (($primaryResponse['provider'] ?? null) !== 'fallback') {
            return $primaryResponse;
        }

        if ($provider === 'gemini') {
            $fallbackResponse = $this->callProvider(
                'groq',
                $this->defaultModel('groq'),
                $systemPrompt,
                $userPrompt,
                $payload['temperature'] ?? 0.4,
                $payload['max_tokens'] ?? 250,
                $toolsContext,
            );

            if (($fallbackResponse['provider'] ?? null) !== 'fallback') {
                $fallbackResponse['debug']['fallback_from'] = 'gemini';

                return $fallbackResponse;
            }
        }

        return $primaryResponse;
    }

    public function buildAssistantPrompt(array $context): string
    {
        return trim(<<<PROMPT
            Kamu adalah KOPI (Kopera AI Assistant), asisten digital resmi dari {$context['cooperative_name']}.
            Kamu membantu anggota dan calon anggota memahami koperasi secara ramah, jelas, dan personal.

            IDENTITAS:
            - Nama: KOPI
            - Koperasi: {$context['cooperative_name']} berlokasi di {$context['cooperative_location']}
            - Komoditas utama: {$context['main_commodity']}
            - Total anggota: {$context['total_members']} orang

            ATURAN PENTING:
            - Gunakan bahasa Indonesia yang ramah, hangat, dan mudah dipahami.
            - Jangan memberikan angka atau data yang tidak ada di konteks yang diberikan.
            - Jangan buat janji tentang harga, stok, atau jadwal yang tidak dikonfirmasi sistem.
            - Respons maksimal 3 paragraf pendek.
            - Jika data kurang, jelaskan apa yang masih perlu dicek oleh sistem/pengurus.
            PROMPT);
    }

    public function buildOnboardingPrompt(array $context): string
    {
        return trim(<<<PROMPT
            Kamu adalah KOPI, asisten onboarding dari {$context['cooperative_name']}.
            Tugasmu adalah memandu calon anggota baru melalui proses pengenalan koperasi secara personal dan menyenangkan.

            ALUR ONBOARDING:
            1. Sapa dan kenalan.
            2. Profiling minat.
            3. Edukasi personal.
            4. Ajakan bergabung.

            ATURAN:
            - Satu pertanyaan per pesan.
            - Respons maksimal 4 kalimat per giliran.
            - Simpan informasi yang relevan untuk profiling.
            - Output akhir setelah profil cukup harus ringkas dalam format JSON saat diminta sistem.
            PROMPT);
    }

    public function buildCommercePrompt(array $context): string
    {
        return trim(<<<PROMPT
            Kamu adalah KOPI Commerce, asisten belanja dari {$context['cooperative_name']}.
            Tugasmu membantu anggota memesan produk koperasi dengan aman, cepat, dan transparan.

            ATURAN KRITIS:
            - Wajib gunakan data stok dari function call atau tools_context.
            - Jangan pernah sebut angka stok yang tidak dari sistem.
            - Jika stok habis, tawarkan produk alternatif atau notifikasi.
            - Selalu tampilkan harga sebelum konfirmasi pesanan.
            - Jika ada produk yang cocok, jawab dengan format: nama produk, stok, harga, dan langkah berikutnya.
            PROMPT);
    }

    /**
     * @return array<int, array{id:int,name:string,stock:int,price:float,is_active:bool}>
     */
    public function listActiveProducts(): array
    {
        try {
            return Product::query()
                ->select(['id', 'name', 'stock', 'price', 'is_active'])
                ->where('is_active', true)
                ->orderBy('name')
                ->get()
                ->map(fn (Product $product): array => [
                    'id' => $product->id,
                    'name' => $product->name,
                    'stock' => (int) $product->stock,
                    'price' => (float) $product->price,
                    'is_active' => (bool) $product->is_active,
                ])
                ->all();
        } catch (Throwable) {
            return [];
        }
    }

    public function findProductByName(string $name): ?array
    {
        try {
            $product = Product::query()
                ->select(['id', 'name', 'stock', 'price', 'is_active'])
                ->where('is_active', true)
                ->where('name', 'like', '%'.$name.'%')
                ->orderBy('name')
                ->first();
        } catch (Throwable) {
            return null;
        }

        if ($product === null) {
            return null;
        }

        return [
            'id' => $product->id,
            'name' => $product->name,
            'stock' => (int) $product->stock,
            'price' => (float) $product->price,
            'is_active' => (bool) $product->is_active,
        ];
    }

    public function buildRatSummaryPrompt(array $context): string
    {
        return trim(<<<PROMPT
            Kamu adalah asisten AI untuk tata kelola koperasi {$context['cooperative_name']}.
            Tugasmu adalah merangkum agenda RAT menjadi bahasa sederhana untuk anggota.

            DATA RAT:
            Nama koperasi: {$context['cooperative_name']}
            Judul RAT: {$context['rat_title']}
            Tanggal: {$context['rat_date']}
            Total anggota terdaftar: {$context['total_members']}
            Total SHU tersedia: Rp {$context['total_shu']}
            PROMPT);
    }

    public function buildRatSummaryInstructions(): string
    {
        return trim(<<<'PROMPT'
            Format jawaban:
            - judul agenda
            - ringkasan singkat
            - dampak untuk anggota
            - status: VOTABLE atau DISCUSSION-ONLY
            PROMPT);
    }

    public function buildGovernancePrompt(array $context): string
    {
        return trim(<<<PROMPT
            Kamu adalah asisten analitik untuk pengurus koperasi {$context['cooperative_name']}.
            Tugasmu adalah memberikan insight engagement anggota berdasarkan data aktivitas dan rekomendasi tindakan konkret.
            Jawaban wajib singkat, terstruktur, dan bisa langsung ditindaklanjuti pengurus.
            Hindari narasi panjang. Beri 3 aksi prioritas dan 1 peringatan risiko jika ada.
            PROMPT);
    }

    public function buildCrossKopdesPrompt(array $context): string
    {
        return trim(<<<'PROMPT'
            Kamu adalah asisten jaringan koperasi desa (Kopdes Community).
            Tugasmu adalah membantu pengurus menemukan praktik baik dari koperasi lain yang relevan dengan kondisi koperasi pengguna.
            Beri maksimal 3 rekomendasi yang paling relevan.
            Untuk tiap rekomendasi, jelaskan relevansi, yang bisa diadaptasi, dan catatan adaptasi lokal.
            PROMPT);
    }

    public function buildEngagementNudgePrompt(array $context): string
    {
        return trim(<<<PROMPT
            Kamu adalah penulis pesan notifikasi untuk koperasi {$context['cooperative_name']}.
            Tugasmu adalah membuat pesan WhatsApp yang personal, hangat, dan mendorong anggota untuk kembali aktif tanpa terasa seperti spam.
            Pesan harus maksimal 3 kalimat, menyebut nama, manfaat konkret, dan CTA jelas.
            PROMPT);
    }

    public function getProviderDebugState(string $provider = 'gemini'): array
    {
        $keys = $this->providerKeys($provider);

        return [
            'provider' => $provider,
            'model' => $this->defaultModel($provider),
            'configured_key_count' => count($keys),
            'key_rotation_enabled' => count($keys) > 1,
        ];
    }

    private function callProvider(string $provider, string $model, string $systemPrompt, string $userPrompt, float $temperature, int $maxTokens, array $toolsContext = []): array
    {
        $keys = $this->providerKeys($provider);

        if ($keys === []) {
            return $this->fallbackResponse($userPrompt, $provider, 'no_api_keys_configured');
        }

        $errors = [];

        foreach ($keys as $index => $apiKey) {
            $attempt = match ($provider) {
                'groq' => $this->callGroqOnce($apiKey, $model, $systemPrompt, $userPrompt, $temperature, $maxTokens),
                default => $this->callGeminiOnce($apiKey, $model, $systemPrompt, $userPrompt, $temperature, $maxTokens, $toolsContext),
            };

            if ($attempt['ok']) {
                return [
                    'provider' => $provider,
                    'model' => $model,
                    'content' => $attempt['content'],
                    'raw' => $attempt['raw'],
                    'debug' => [
                        'used_key_index' => $index + 1,
                        'attempts' => count($errors) + 1,
                        'fallback_reason' => null,
                        'provider_attempted' => $provider,
                    ],
                ];
            }

            $errors[] = $attempt['error'];
        }

        return $this->fallbackResponse($userPrompt, $provider, implode('; ', array_filter($errors)) ?: 'provider_error');
    }

    private function callGeminiOnce(string $apiKey, string $model, string $systemPrompt, string $userPrompt, float $temperature, int $maxTokens, array $toolsContext = []): array
    {
        try {
            $response = Http::retry(2, 200, throw: false)
                ->timeout(30)
                ->post($this->geminiUrl($model, $apiKey), [
                    'system_instruction' => [
                        'parts' => [
                            ['text' => $systemPrompt],
                        ],
                    ],
                    'contents' => [
                        [
                            'role' => 'user',
                            'parts' => [
                                ['text' => $userPrompt],
                            ],
                        ],
                    ],
                    'generationConfig' => [
                        'temperature' => $temperature,
                        'maxOutputTokens' => $maxTokens,
                    ],
                ]);
        } catch (Throwable $exception) {
            return [
                'ok' => false,
                'error' => 'connection_exception: '.$exception->getMessage(),
            ];
        }

        if (! $response->successful()) {
            return [
                'ok' => false,
                'error' => 'http_'.$response->status(),
            ];
        }

        $text = data_get($response->json(), 'candidates.0.content.parts.0.text');

        if (blank($text)) {
            return [
                'ok' => false,
                'error' => 'empty_gemini_response',
            ];
        }

        return [
            'ok' => true,
            'content' => $text,
            'raw' => $response->json(),
        ];
    }

    private function callGroqOnce(string $apiKey, string $model, string $systemPrompt, string $userPrompt, float $temperature, int $maxTokens): array
    {
        try {
            $response = Http::retry(2, 200, throw: false)
                ->timeout(30)
                ->withToken($apiKey)
                ->post('https://api.groq.com/openai/v1/chat/completions', [
                    'model' => $model,
                    'temperature' => $temperature,
                    'max_tokens' => $maxTokens,
                    'messages' => [
                        ['role' => 'system', 'content' => $systemPrompt],
                        ['role' => 'user', 'content' => $userPrompt],
                    ],
                ]);
        } catch (Throwable $exception) {
            return [
                'ok' => false,
                'error' => 'connection_exception: '.$exception->getMessage(),
            ];
        }

        if (! $response->successful()) {
            return [
                'ok' => false,
                'error' => 'http_'.$response->status(),
            ];
        }

        $text = data_get($response->json(), 'choices.0.message.content');

        if (blank($text)) {
            return [
                'ok' => false,
                'error' => 'empty_groq_response',
            ];
        }

        return [
            'ok' => true,
            'content' => $text,
            'raw' => $response->json(),
        ];
    }

    private function fallbackResponse(string $userPrompt, string $provider, string $reason): array
    {
        $summary = Str::of($userPrompt)->squish()->limit(120);

        return [
            'provider' => 'fallback',
            'model' => null,
            'content' => 'Saat ini AI belum aktif penuh. Ringkasan permintaan Anda: '.$summary,
            'raw' => null,
            'debug' => [
                'used_key_index' => null,
                'attempts' => null,
                'fallback_reason' => $provider.': '.$reason,
                'provider_attempted' => $provider,
            ],
        ];
    }

    private function geminiUrl(string $model, string $apiKey): string
    {
        return "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key={$apiKey}";
    }

    /**
     * @return array<int, string>
     */
    private function providerKeys(string $provider): array
    {
        $raw = config("services.{$provider}.api_keys");

        if (is_string($raw) && trim($raw) !== '') {
            return array_values(array_filter(array_map('trim', preg_split('/[,\s]+/', $raw) ?: [])));
        }

        $single = config("services.{$provider}.api_key");

        return is_string($single) && trim($single) !== '' ? [$single] : [];
    }

    private function defaultModel(string $provider): string
    {
        return (string) config("services.{$provider}.model", $provider === 'groq' ? 'llama-3.3-70b-versatile' : 'gemini-2.0-flash');
    }
}
