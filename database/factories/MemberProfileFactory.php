<?php

namespace Database\Factories;

use App\Models\MemberProfile;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<MemberProfile>
 */
class MemberProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'interests' => fake()->words(3, true),
            'location_detail' => fake()->address(),
            'profiling_raw_data' => [
                'source' => 'factory',
                'confidence' => fake()->randomFloat(2, 0.6, 0.99),
            ],
        ];
    }

    /**
     * Indicate the profile is produced by onboarding.
     */
    public function onboarding(): static
    {
        return $this->state(fn (array $attributes) => [
            'profiling_raw_data' => [
                'source' => 'whatsapp_onboarding',
                'confidence' => fake()->randomFloat(2, 0.85, 0.99),
            ],
        ]);
    }
}
