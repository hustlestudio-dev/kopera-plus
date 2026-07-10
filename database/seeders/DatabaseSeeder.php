<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (! Schema::hasTable('cooperatives')) {
            return;
        }

        $cooperativeId = DB::table('cooperatives')->updateOrInsert(
            ['slug' => 'koperasi-maju-bersama'],
            [
                'name' => 'Koperasi Maju Bersama',
                'whatsapp_number' => '6281234567890',
                'province' => 'Jawa Timur',
                'city' => 'Malang',
                'total_members' => 124,
                'quorum_threshold_percent' => 50,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        );

        $cooperativeId = (int) DB::table('cooperatives')->where('slug', 'koperasi-maju-bersama')->value('id');

        $anggota = User::query()->updateOrCreate([
            'email' => 'budi@example.com',
        ], [
            'name' => 'Budi Santoso',
            'email' => 'budi@example.com',
            'password' => 'password',
            'phone_number' => '628111111111',
            'cooperative_id' => $cooperativeId,
            'role' => 'anggota',
        ]);

        DB::table('products')->updateOrInsert(
            [
                'cooperative_id' => $cooperativeId,
                'sku' => 'BRG-5',
            ],
            [
                'name' => 'Beras Premium 5 Kg',
                'stock' => 24,
                'unit' => 'karung',
                'price' => 75000,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        );

        DB::table('products')->updateOrInsert(
            [
                'cooperative_id' => $cooperativeId,
                'sku' => 'MNY-1',
            ],
            [
                'name' => 'Minyak Goreng 1 Liter',
                'stock' => 18,
                'unit' => 'botol',
                'price' => 18000,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        );

        $agendaId = DB::table('rat_agendas')->updateOrInsert(
            [
                'cooperative_id' => $cooperativeId,
                'title' => 'RAT Koperasi Maju Bersama 2026',
            ],
            [
                'scheduled_at' => now()->addWeeks(2),
                'summary' => 'Membahas laporan keuangan tahunan, pembagian SHU, dan pemilihan pengurus.',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        );

        $agendaId = (int) DB::table('rat_agendas')->where('cooperative_id', $cooperativeId)->where('title', 'RAT Koperasi Maju Bersama 2026')->value('id');

        DB::table('rat_agenda_items')->updateOrInsert(
            [
                'rat_agenda_id' => $agendaId,
                'title' => 'Pengesahan Laporan Tahunan',
            ],
            [
                'details' => 'Agenda persetujuan laporan keuangan koperasi.',
                'is_votable' => true,
                'is_secret_ballot' => false,
                'sort_order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        );

        DB::table('rat_agenda_items')->updateOrInsert(
            [
                'rat_agenda_id' => $agendaId,
                'title' => 'Pemilihan Ketua Baru',
            ],
            [
                'details' => 'Voting rahasia untuk ketua koperasi.',
                'is_votable' => true,
                'is_secret_ballot' => true,
                'sort_order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        );

        DB::table('rat_ai_summaries')->updateOrInsert(
            ['rat_agenda_id' => $agendaId],
            [
                'summary' => 'Agenda ini membahas hasil usaha koperasi setahun terakhir dan memilih pengurus baru untuk masa bakti berikutnya.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        );

        DB::table('community_posts')->updateOrInsert(
            [
                'cooperative_id' => $cooperativeId,
                'title' => 'Cara Menambah Partisipasi Anggota',
            ],
            [
                'user_id' => $anggota->id,
                'content' => 'Kami membagikan jadwal rutin, ringkasan hasil rapat, dan manfaat konkret agar anggota lebih aktif.',
                'visibility' => 'public',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        );

        DB::table('cross_kopdes_insights')->updateOrInsert(
            [
                'cooperative_id' => $cooperativeId,
                'title' => 'Perkuat Komunikasi RAT',
            ],
            [
                'content' => 'Koperasi dengan kehadiran RAT tinggi biasanya mengirim ringkasan agenda 3 hari sebelum rapat dan reminder H-1 melalui WhatsApp.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        );
    }
}
