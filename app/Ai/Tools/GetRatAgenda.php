<?php

namespace App\Ai\Tools;

use Illuminate\Support\Facades\DB;

class GetRatAgenda
{
    public function __construct(private readonly int $cooperativeId) {}

    /**
     * @return array<int, array{id: int, title: string, scheduled_at: string, summary: string|null, items: array<int, array{id: int, title: string, is_votable: bool, is_secret_ballot: bool}>}>
     */
    public function handle(): array
    {
        $agendas = DB::table('rat_agendas')
            ->where('cooperative_id', $this->cooperativeId)
            ->where('is_active', true)
            ->orderBy('scheduled_at')
            ->get();

        return $agendas->map(function ($agenda): array {
            return [
                'id' => (int) $agenda->id,
                'title' => $agenda->title,
                'scheduled_at' => (string) $agenda->scheduled_at,
                'summary' => $agenda->summary,
                'items' => DB::table('rat_agenda_items')
                    ->where('rat_agenda_id', $agenda->id)
                    ->orderBy('sort_order')
                    ->get()
                    ->map(fn ($item): array => [
                        'id' => (int) $item->id,
                        'title' => $item->title,
                        'is_votable' => (bool) $item->is_votable,
                        'is_secret_ballot' => (bool) $item->is_secret_ballot,
                    ])
                    ->all(),
            ];
        })->all();
    }
}
