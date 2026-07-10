<?php

namespace Database\Factories;

use App\Models\ConversationSession;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ConversationSession>
 */
class ConversationSessionFactory extends Factory
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
            'channel' => fake()->randomElement(['whatsapp', 'web']),
            'status' => fake()->randomElement(['active', 'closed']),
            'started_at' => now(),
            'ended_at' => null,
        ];
    }

    /**
     * Indicate the session is closed.
     */
    public function closed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'closed',
            'ended_at' => now(),
        ]);
    }
}
