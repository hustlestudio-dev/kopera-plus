<?php

namespace App\Ai\Tools;

use Illuminate\Support\Facades\DB;

class GetQuorumStatus
{
    public function __construct(private readonly int $cooperativeId) {}

    /**
     * @return array{present: int, total_members: int, quorum_threshold_percent: int}
     */
    public function handle(int $ratAgendaId): array
    {
        $present = (int) DB::table('rat_attendances')
            ->join('rat_agendas', 'rat_attendances.rat_agenda_id', '=', 'rat_agendas.id')
            ->where('rat_agendas.cooperative_id', $this->cooperativeId)
            ->where('rat_attendances.rat_agenda_id', $ratAgendaId)
            ->count();

        $cooperative = DB::table('cooperatives')->where('id', $this->cooperativeId)->first();

        return [
            'present' => $present,
            'total_members' => (int) ($cooperative->total_members ?? 0),
            'quorum_threshold_percent' => (int) ($cooperative->quorum_threshold_percent ?? 0),
        ];
    }
}
