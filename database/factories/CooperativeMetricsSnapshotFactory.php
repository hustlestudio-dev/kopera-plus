<?php

namespace Database\Factories;

use App\Models\Cooperative;
use App\Models\CooperativeMetricsSnapshot;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CooperativeMetricsSnapshot>
 */
class CooperativeMetricsSnapshotFactory extends Factory
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
            'total_members' => fake()->numberBetween(0, 1000),
            'active_members' => fake()->numberBetween(0, 1000),
            'total_transactions' => fake()->randomFloat(2, 0, 1000000),
            'total_shu' => fake()->randomFloat(2, 0, 1000000),
            'snapshot_date' => now()->toDateString(),
        ];
    }
}
