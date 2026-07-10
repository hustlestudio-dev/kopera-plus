<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class MemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(?SeedContext $context = null): void
    {
        $context ??= new SeedContext;

        DB::transaction(function () use ($context): void {
            $now = Carbon::now();

            $user = User::factory()->create([
                'name' => 'Test User',
                'email' => 'test@example.com',
            ]);

            $user->forceFill([
                'cooperative_id' => $context->cooperativeId,
                'phone_number' => '081234567890',
                'role' => 'member',
                'conversation_state' => 'onboarding_complete',
                'joined_at' => $now,
            ])->save();

            $context->userId = $user->id;

            DB::table('member_profiles')->insert([
                'user_id' => $user->id,
                'interests' => 'Pupuk, Sembako',
                'location_detail' => 'Dusun Melati',
                'profiling_raw_data' => json_encode([
                    'source' => 'whatsapp_onboarding',
                    'confidence' => 0.91,
                ]),
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        });
    }
}
