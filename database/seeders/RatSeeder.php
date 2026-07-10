<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class RatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(?SeedContext $context = null): void
    {
        $context ??= new SeedContext;

        DB::transaction(function () use ($context): void {
            $now = Carbon::now();

            $context->ratAgendaId = DB::table('rat_agendas')->insertGetId([
                'cooperative_id' => $context->cooperativeId,
                'title' => 'RAT 2026',
                'description' => 'Agenda tahunan koperasi.',
                'status' => 'open',
                'voting_opens_at' => $now,
                'voting_closes_at' => $now->copy()->addDay(),
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            $context->ratAgendaItemId = DB::table('rat_agenda_items')->insertGetId([
                'rat_agenda_id' => $context->ratAgendaId,
                'item_title' => 'Pengesahan Laporan Tahunan',
                'agenda_type' => 'approval',
                'is_votable' => true,
                'is_secret_ballot' => false,
                'vote_options' => json_encode(['setuju', 'tidak_setuju']),
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            DB::table('rat_attendances')->insert([
                'rat_agenda_id' => $context->ratAgendaId,
                'user_id' => $context->userId,
                'attendance_mode' => 'online',
                'checked_in_at' => $now,
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            DB::table('rat_votes')->insert([
                'rat_agenda_item_id' => $context->ratAgendaItemId,
                'user_id' => $context->userId,
                'selected_option' => 'setuju',
                'voted_at' => $now,
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            DB::table('rat_ai_summaries')->insert([
                'rat_agenda_id' => $context->ratAgendaId,
                'summary_text' => 'Agenda ini disetujui mayoritas anggota.',
                'impact_simulation' => 'Likuiditas koperasi tetap stabil.',
                'generated_at' => $now,
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            DB::table('rat_result_summaries')->insert([
                'rat_agenda_id' => $context->ratAgendaId,
                'participation_rate' => 75,
                'ai_followup_recommendation' => 'Lanjutkan distribusi laporan ke anggota.',
                'generated_at' => $now,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        });
    }
}
