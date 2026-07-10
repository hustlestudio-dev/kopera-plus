<?php

namespace App\Ai\Tools;

use Illuminate\Support\Facades\DB;
use Throwable;

class CreateCommunityPost
{
    public function __construct(private readonly int $cooperativeId) {}

    /**
     * @return array{success: bool, message: string}
     */
    public function handle(int $userId, string $title, string $content): array
    {
        try {
            DB::table('community_posts')->insert([
                'cooperative_id' => $this->cooperativeId,
                'user_id' => $userId,
                'title' => $title,
                'content' => $content,
                'visibility' => 'public',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return ['success' => true, 'message' => 'Postingan praktik baik berhasil disimpan.'];
        } catch (Throwable) {
            return ['success' => false, 'message' => 'Maaf, data sedang tidak tersedia. Coba beberapa saat lagi atau hubungi pengurus.'];
        }
    }
}
