<?php

namespace Database\Factories;

use App\Models\PointsLedger;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PointsLedger>
 */
class PointsLedgerFactory extends Factory
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
            'event_type' => fake()->randomElement(['order_completed', 'rat_attended', 'community_posted']),
            'points' => fake()->numberBetween(5, 100),
            'reference_type' => null,
            'reference_id' => null,
        ];
    }

    /**
     * Indicate the points entry comes from an order.
     */
    public function orderCompleted(int $points = 25): static
    {
        return $this->state(fn (array $attributes) => [
            'event_type' => 'order_completed',
            'points' => $points,
        ]);
    }
}
