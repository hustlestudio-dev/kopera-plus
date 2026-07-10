<?php

namespace Database\Factories;

use App\Models\Cooperative;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
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
            'name' => fake()->words(3, true),
            'stock' => fake()->numberBetween(0, 100),
            'price' => fake()->randomFloat(2, 10000, 250000),
            'is_active' => true,
        ];
    }

    /**
     * Indicate the product is low stock.
     */
    public function lowStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'stock' => fake()->numberBetween(0, 10),
        ]);
    }
}
