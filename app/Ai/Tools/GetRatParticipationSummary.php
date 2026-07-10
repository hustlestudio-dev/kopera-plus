<?php

namespace App\Ai\Tools;

use Illuminate\Support\Facades\DB;

class GetRatParticipationSummary
{
    public function __construct(private readonly int $cooperativeId) {}

    /**
     * @return array{summary: string}
     */
    public function handle(int $ratAgendaId): array
    {
        $attendanceCount = (int) DB::table('rat_attendances')
            ->join('rat_agendas', 'rat_attendances.rat_agenda_id', '=', 'rat_agendas.id')
            ->where('rat_agendas.cooperative_id', $this->cooperativeId)
            ->where('rat_attendances.rat_agenda_id', $ratAgendaId)
            ->count();

        $voteCount = (int) DB::table('rat_votes')
            ->join('rat_agenda_items', 'rat_votes.rat_agenda_item_id', '=', 'rat_agenda_items.id')
            ->join('rat_agendas', 'rat_agenda_items.rat_agenda_id', '=', 'rat_agendas.id')
            ->where('rat_agendas.cooperative_id', $this->cooperativeId)
            ->where('rat_agenda_items.rat_agenda_id', $ratAgendaId)
            ->count();

        return [
            'summary' => "Kehadiran: {$attendanceCount} anggota. Total vote tercatat: {$voteCount}.",
        ];
    }
}
