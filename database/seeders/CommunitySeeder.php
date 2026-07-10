<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class CommunitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(?SeedContext $context = null): void
    {
        $context ??= new SeedContext;

        DB::transaction(function () use ($context): void {
            $now = Carbon::now();

            $context->communityPostId = DB::table('community_posts')->insertGetId([
                'cooperative_id' => $context->cooperativeId,
                'user_id' => $context->userId,
                'title' => 'Tips Stok Beras',
                'content' => 'Pengelolaan stok beras lebih stabil jika restock dilakukan mingguan.',
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            DB::table('cross_kopdes_insights')->insert([
                'cooperative_id' => $context->cooperativeId,
                'source_post_id' => $context->communityPostId,
                'ai_recommendation_reason' => 'Topik relevan untuk koperasi dengan commodity sejenis.',
                'relevance_score' => 92.5,
                'generated_at' => $now,
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            DB::table('cooperative_metrics_snapshots')->insert([
                'cooperative_id' => $context->cooperativeId,
                'total_members' => 120,
                'active_members' => 88,
                'total_transactions' => 750000,
                'total_shu' => 125000,
                'snapshot_date' => $now->toDateString(),
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        });
    }
}
