<?php

namespace Database\Factories;

use App\Models\RatAgendaItem;
use App\Models\RatVote;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<RatVote>
 */
class RatVoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'rat_agenda_item_id' => RatAgendaItem::factory(),
            'user_id' => User::factory(),
            'selected_option' => 'setuju',
            'voted_at' => now(),
        ];
    }

    public function approve(): static
    {
        return $this->state(fn (array $attributes) => [
            'selected_option' => 'setuju',
        ]);
    }
}
