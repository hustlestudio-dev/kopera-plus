<?php

namespace Database\Factories;

use App\Models\CommunityPost;
use App\Models\Cooperative;
use App\Models\CrossKopdesInsight;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CrossKopdesInsight>
 */
class CrossKopdesInsightFactory extends Factory
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
            'source_post_id' => CommunityPost::factory(),
            'ai_recommendation_reason' => fake()->sentence(),
            'relevance_score' => fake()->randomFloat(2, 0, 100),
            'generated_at' => now(),
        ];
    }

    public function recommended(): static
    {
        return $this->state(fn (array $attributes) => [
            'ai_recommendation_reason' => 'Topik relevan untuk koperasi dengan commodity sejenis.',
            'relevance_score' => 92.50,
        ]);
    }
}
