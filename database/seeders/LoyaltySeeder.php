<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class LoyaltySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(?SeedContext $context = null): void
    {
        $context ??= new SeedContext;

        DB::transaction(function () use ($context): void {
            $now = Carbon::now();

            DB::table('points_ledger')->insert([
                'user_id' => $context->userId,
                'event_type' => 'order_completed',
                'points' => 25,
                'reference_type' => 'orders',
                'reference_id' => $context->orderId,
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            DB::table('member_levels')->insert([
                'user_id' => $context->userId,
                'current_level' => 'bronze',
                'total_points_snapshot' => 25,
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            $context->badgeId = DB::table('badges')->insertGetId([
                'name' => 'First Transaction',
                'description' => 'Mendapatkan poin dari transaksi pertama.',
                'trigger_condition' => json_encode([
                    'event_type' => 'order_completed',
                    'minimum_count' => 1,
                ]),
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            DB::table('member_badges')->insert([
                'user_id' => $context->userId,
                'badge_id' => $context->badgeId,
                'earned_at' => $now,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        });
    }
}
