<?php

namespace Database\Factories;

use App\Models\Cooperative;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Cooperative>
 */
class CooperativeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->company();

        return [
            'name' => $name,
            'location' => fake()->city(),
            'main_commodity' => fake()->word(),
            'total_members' => fake()->numberBetween(25, 500),
            'quorum_threshold_percent' => fake()->randomFloat(2, 25, 75),
        ];
    }

    /**
     * Indicate the cooperative is a small cooperative.
     */
    public function small(): static
    {
        return $this->state(fn (array $attributes) => [
            'total_members' => fake()->numberBetween(25, 75),
            'quorum_threshold_percent' => 50,
        ]);
    }
}
