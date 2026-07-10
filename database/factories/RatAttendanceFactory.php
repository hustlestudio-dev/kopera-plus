<?php

namespace Database\Factories;

use App\Models\RatAgenda;
use App\Models\RatAttendance;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<RatAttendance>
 */
class RatAttendanceFactory extends Factory
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
            'user_id' => User::factory(),
            'attendance_mode' => fake()->randomElement(['online', 'onsite']),
            'checked_in_at' => now(),
        ];
    }

    public function online(): static
    {
        return $this->state(fn (array $attributes) => [
            'attendance_mode' => 'online',
        ]);
    }
}
