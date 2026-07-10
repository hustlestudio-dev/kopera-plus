<?php

namespace App\Ai\Tools;

use Illuminate\Support\Facades\DB;

class GetCommunityPosts
{
    /**
     * @return array<int, array{title: string, content: string, cooperative_id: int}>
     */
    public function handle(?int $cooperativeId = null): array
    {
        return DB::table('community_posts')
            ->when($cooperativeId, fn ($query) => $query->where('cooperative_id', $cooperativeId))
            ->orderByDesc('id')
            ->limit(10)
            ->get()
            ->map(fn ($post): array => [
                'title' => $post->title,
                'content' => $post->content,
                'cooperative_id' => (int) $post->cooperative_id,
            ])
            ->all();
    }
}
