<?php

namespace App\Ai\Tools;

use Illuminate\Support\Facades\DB;

class SaveMemberProfile
{
    public function __construct(private readonly int $cooperativeId) {}

    /**
     * @param  array{name: string, location?: string|null, occupation?: string|null, interest?: string|null, phone_number?: string|null, user_id?: int|null}  $profile
     * @return array{saved: bool}
     */
    public function handle(array $profile): array
    {
        DB::table('member_profiles')->updateOrInsert(
            [
                'cooperative_id' => $this->cooperativeId,
                'user_id' => $profile['user_id'] ?? null,
            ],
            [
                'phone_number' => $profile['phone_number'] ?? null,
                'name' => $profile['name'],
                'location' => $profile['location'] ?? null,
                'occupation' => $profile['occupation'] ?? null,
                'interest' => $profile['interest'] ?? null,
                'onboarding_status' => 'completed',
                'meta' => json_encode(['source' => 'ai']),
                'updated_at' => now(),
                'created_at' => now(),
            ],
        );

        return ['saved' => true];
    }
}
