<?php

namespace Database\Factories;

use App\Models\Badge;
use App\Models\MemberBadge;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<MemberBadge>
 */
class MemberBadgeFactory extends Factory
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
            'badge_id' => Badge::factory(),
            'earned_at' => now(),
        ];
    }

    /**
     * Indicate the badge has just been earned.
     */
    public function earnedNow(): static
    {
        return $this->state(fn (array $attributes) => [
            'earned_at' => now(),
        ]);
    }
}
