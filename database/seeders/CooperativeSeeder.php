<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class CooperativeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(?SeedContext $context = null): void
    {
        $context ??= new SeedContext;

        $now = Carbon::now();

        $context->cooperativeId = DB::table('cooperatives')->insertGetId([
            'name' => 'Koperasi Desa Sejahtera',
            'location' => 'Kabupaten Contoh',
            'main_commodity' => 'Hasil Tani',
            'total_members' => 120,
            'quorum_threshold_percent' => 50,
            'created_at' => $now,
            'updated_at' => $now,
        ]);
    }
}
