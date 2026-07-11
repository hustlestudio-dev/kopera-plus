<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LoyaltyPoint extends Model
{
    protected $fillable = ['user_id', 'points', 'tier'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public static function tiers(): array
    {
        return ['Bronze', 'Silver', 'Gold', 'Platinum', 'Village Hero'];
    }

    public static function tierThreshold(string $tier): int
    {
        return match ($tier) {
            'Bronze' => 0,
            'Silver' => 1000,
            'Gold' => 3000,
            'Platinum' => 5000,
            'Village Hero' => 10000,
            default => 0,
        };
    }

    public static function resolveTier(int $points): string
    {
        return match (true) {
            $points >= 10000 => 'Village Hero',
            $points >= 5000 => 'Platinum',
            $points >= 3000 => 'Gold',
            $points >= 1000 => 'Silver',
            default => 'Bronze',
        };
    }
}
