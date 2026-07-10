<?php

namespace Database\Factories;

use App\Models\CommunityPost;
use App\Models\Cooperative;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CommunityPost>
 */
class CommunityPostFactory extends Factory
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
            'user_id' => User::factory(),
            'title' => fake()->sentence(4),
            'content' => fake()->paragraph(),
        ];
    }

    public function knowledgeShare(): static
    {
        return $this->state(fn (array $attributes) => [
            'title' => 'Tips Stok Beras',
            'content' => 'Pengelolaan stok beras lebih stabil jika restock dilakukan mingguan.',
        ]);
    }
}
