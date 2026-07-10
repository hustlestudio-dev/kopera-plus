<?php

namespace App\Ai\Tools;

use Illuminate\Support\Facades\DB;

class GetCrossKopdesInsights
{
    public function __construct(private readonly int $cooperativeId) {}

    /**
     * @return array<int, array{title: string, content: string}>
     */
    public function handle(): array
    {
        return DB::table('cross_kopdes_insights')
            ->where('cooperative_id', $this->cooperativeId)
            ->orderByDesc('id')
            ->limit(5)
            ->get(['title', 'content'])
            ->map(fn ($row): array => ['title' => $row->title, 'content' => $row->content])
            ->all();
    }
}
