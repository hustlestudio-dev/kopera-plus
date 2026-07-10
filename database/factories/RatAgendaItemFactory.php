<?php

namespace Database\Factories;

use App\Models\RatAgenda;
use App\Models\RatAgendaItem;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<RatAgendaItem>
 */
class RatAgendaItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'rat_agenda_id' => RatAgenda::factory(),
            'item_title' => fake()->sentence(3),
            'agenda_type' => 'approval',
            'is_votable' => true,
            'is_secret_ballot' => false,
            'vote_options' => ['setuju', 'tidak_setuju'],
        ];
    }
}
