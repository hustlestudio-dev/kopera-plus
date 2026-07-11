<?php

namespace App\Services;

use App\Models\Badge;
use App\Models\LoyaltyPoint;
use App\Models\User;

final class GamificationService
{
    public function awardPoints(User $user, int $amount, string $reason = ''): LoyaltyPoint
    {
        $record = LoyaltyPoint::firstOrCreate(
            ['user_id' => $user->id],
            ['points' => 0, 'tier' => 'Bronze'],
        );

        $record->increment('points', $amount);
        $record->tier = LoyaltyPoint::resolveTier($record->points);
        $record->save();

        return $record;
    }

    public function getUserPoints(User $user): array
    {
        $record = LoyaltyPoint::where('user_id', $user->id)->first();

        if (! $record) {
            return ['points' => 0, 'tier' => 'Bronze', 'next_tier' => 'Silver', 'progress' => 0];
        }

        $tiers = LoyaltyPoint::tiers();
        $currentIndex = array_search($record->tier, $tiers);
        $nextTier = $tiers[$currentIndex + 1] ?? null;
        $currentThreshold = LoyaltyPoint::tierThreshold($record->tier);
        $nextThreshold = $nextTier ? LoyaltyPoint::tierThreshold($nextTier) : $currentThreshold;
        $progress = $nextThreshold > $currentThreshold
            ? min(100, (int) (($record->points - $currentThreshold) / ($nextThreshold - $currentThreshold) * 100))
            : 100;

        return [
            'points' => $record->points,
            'tier' => $record->tier,
            'next_tier' => $nextTier,
            'progress' => $progress,
        ];
    }

    public function getUserBadges(User $user): array
    {
        return $user->badges()
            ->select(['badges.id', 'badges.name', 'badges.slug', 'badges.description'])
            ->get()
            ->toArray();
    }

    public function awardBadge(User $user, string $slug): bool
    {
        $badge = Badge::where('slug', $slug)->first();

        if (! $badge || $user->badges()->where('badge_id', $badge->id)->exists()) {
            return false;
        }

        $user->badges()->attach($badge->id);

        return true;
    }
}
