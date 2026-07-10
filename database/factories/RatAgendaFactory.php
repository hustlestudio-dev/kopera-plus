<?php

namespace Database\Factories;

use App\Models\Cooperative;
use App\Models\RatAgenda;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<RatAgenda>
 */
class RatAgendaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'cooperative_id' => Cooperative::factory(),
            'title' => fake()->words(3, true),
            'description' => fake()->sentence(),
            'status' => fake()->randomElement(['draft', 'open', 'closed']),
            'voting_opens_at' => now(),
            'voting_closes_at' => now()->addDay(),
        ];
    }

    /**
     * Indicate the agenda is open for voting.
     */
    public function open(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'open',
            'voting_opens_at' => now(),
            'voting_closes_at' => now()->addDay(),
        ]);
    }
}
