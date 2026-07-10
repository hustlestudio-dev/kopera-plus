<?php

namespace Database\Factories;

use App\Models\Badge;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Badge>
 */
class BadgeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->words(2, true),
            'description' => fake()->sentence(),
            'trigger_condition' => [
                'event_type' => 'order_completed',
                'minimum_count' => 1,
            ],
        ];
    }

    public function firstTransaction(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'First Transaction',
            'description' => 'Earned after the first completed order.',
            'trigger_condition' => [
                'event_type' => 'order_completed',
                'minimum_count' => 1,
            ],
        ]);
    }
}
