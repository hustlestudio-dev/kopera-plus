<?php

namespace Database\Factories;

use App\Models\Cooperative;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Order>
 */
class OrderFactory extends Factory
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
            'cooperative_id' => Cooperative::factory(),
            'fulfillment_type' => fake()->randomElement(['pickup', 'delivery']),
            'estimated_delivery_fee' => fake()->randomFloat(2, 0, 25000),
            'status' => fake()->randomElement(['pending', 'confirmed', 'completed', 'cancelled']),
            'confirmed_at' => now(),
        ];
    }

    /**
     * Indicate the order is still pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'confirmed_at' => null,
        ]);
    }

    /**
     * Indicate the order is already confirmed.
     */
    public function confirmed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'confirmed',
            'confirmed_at' => now(),
        ]);
    }
}
