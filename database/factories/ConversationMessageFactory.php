<?php

namespace Database\Factories;

use App\Models\ConversationMessage;
use App\Models\ConversationSession;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ConversationMessage>
 */
class ConversationMessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'session_id' => ConversationSession::factory(),
            'sender_type' => fake()->randomElement(['user', 'ai', 'system']),
            'message_body' => fake()->sentence(),
            'ai_intent_detected' => fake()->optional()->word(),
        ];
    }
}
