<?php

namespace Database\Factories;

use App\Models\MemberLevel;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<MemberLevel>
 */
class MemberLevelFactory extends Factory
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
            'current_level' => fake()->randomElement(['bronze', 'silver', 'gold']),
            'total_points_snapshot' => fake()->numberBetween(0, 1000),
        ];
    }

    public function bronze(): static
    {
        return $this->state(fn (array $attributes) => [
            'current_level' => 'bronze',
            'total_points_snapshot' => fake()->numberBetween(0, 499),
        ]);
    }

    public function silver(): static
    {
        return $this->state(fn (array $attributes) => [
            'current_level' => 'silver',
            'total_points_snapshot' => fake()->numberBetween(500, 999),
        ]);
    }

    public function gold(): static
    {
        return $this->state(fn (array $attributes) => [
            'current_level' => 'gold',
            'total_points_snapshot' => fake()->numberBetween(1000, 2500),
        ]);
    }
}
