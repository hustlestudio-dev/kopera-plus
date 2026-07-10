<?php

namespace Database\Factories;

use App\Models\RatAgenda;
use App\Models\RatAiSummary;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<RatAiSummary>
 */
class RatAiSummaryFactory extends Factory
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
            'summary_text' => fake()->paragraph(),
            'impact_simulation' => fake()->sentence(),
            'generated_at' => now(),
        ];
    }

    public function concise(): static
    {
        return $this->state(fn (array $attributes) => [
            'summary_text' => 'Agenda ini disetujui mayoritas anggota.',
            'impact_simulation' => 'Likuiditas koperasi tetap stabil.',
        ]);
    }
}
