<?php

namespace App\Ai\Tools;

use Illuminate\Support\Facades\DB;
use Throwable;

class SubmitRatAttendance
{
    public function __construct(private readonly int $cooperativeId) {}

    /**
     * @return array{success: bool, message: string}
     */
    public function handle(int $ratAgendaId, int $userId): array
    {
        try {
            DB::table('rat_attendances')->updateOrInsert(
                [
                    'rat_agenda_id' => $ratAgendaId,
                    'user_id' => $userId,
                ],
                [
                    'attended_at' => now(),
                    'updated_at' => now(),
                    'created_at' => now(),
                ],
            );

            DB::table('points_ledger')->insert([
                'cooperative_id' => $this->cooperativeId,
                'user_id' => $userId,
                'source' => 'rat_attendance',
                'points' => 50,
                'reference_type' => 'rat_agenda',
                'reference_id' => $ratAgendaId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return ['success' => true, 'message' => 'Kehadiran RAT kamu sudah dicatat.'];
        } catch (Throwable) {
            return ['success' => false, 'message' => 'Maaf, data sedang tidak tersedia. Coba beberapa saat lagi atau hubungi pengurus.'];
        }
    }
}
