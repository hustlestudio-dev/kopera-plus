<?php

namespace App\Ai\Tools;

use Illuminate\Support\Facades\DB;
use Throwable;

class SubmitRatVote
{
    public function __construct(private readonly int $cooperativeId) {}

    /**
     * @return array{success: bool, message: string}
     */
    public function handle(int $ratAgendaItemId, int $userId, string $choice): array
    {
        try {
            $item = DB::table('rat_agenda_items')
                ->join('rat_agendas', 'rat_agenda_items.rat_agenda_id', '=', 'rat_agendas.id')
                ->where('rat_agenda_items.id', $ratAgendaItemId)
                ->where('rat_agendas.cooperative_id', $this->cooperativeId)
                ->select('rat_agenda_items.*')
                ->first();

            if (! $item) {
                return ['success' => false, 'message' => 'Maaf, data sedang tidak tersedia. Coba beberapa saat lagi atau hubungi pengurus.'];
            }

            DB::table('rat_votes')->updateOrInsert(
                [
                    'rat_agenda_item_id' => $ratAgendaItemId,
                    'user_id' => $userId,
                ],
                [
                    'choice' => $choice,
                    'voted_at' => now(),
                    'updated_at' => now(),
                    'created_at' => now(),
                ],
            );

            return [
                'success' => true,
                'message' => $item->is_secret_ballot
                    ? 'Vote berhasil dicatat. Pilihan kamu tidak ditampilkan publik, hanya audit trail yang disimpan.'
                    : 'Vote berhasil dicatat. Terima kasih, 1 anggota = 1 suara.',
            ];
        } catch (Throwable) {
            return ['success' => false, 'message' => 'Maaf, data sedang tidak tersedia. Coba beberapa saat lagi atau hubungi pengurus.'];
        }
    }
}
