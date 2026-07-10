<?php

namespace Database\Factories;

use App\Models\RatAgenda;
use App\Models\RatResultSummary;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<RatResultSummary>
 */
class RatResultSummaryFactory extends Factory
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
            'participation_rate' => fake()->randomFloat(2, 25, 100),
            'ai_followup_recommendation' => fake()->sentence(),
            'generated_at' => now(),
        ];
    }

    public function finalized(): static
    {
        return $this->state(fn (array $attributes) => [
            'participation_rate' => 75,
            'ai_followup_recommendation' => 'Lanjutkan distribusi laporan ke anggota.',
        ]);
    }
}
