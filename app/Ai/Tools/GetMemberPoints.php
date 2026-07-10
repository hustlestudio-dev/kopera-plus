<?php

namespace App\Ai\Tools;

use Illuminate\Support\Facades\DB;

class GetMemberPoints
{
    public function __construct(private readonly int $cooperativeId) {}

    /**
     * @return array{
     *     total_points: int,
     *     level: string,
     *     badges: array<int, string>
     * }
     */
    public function handle(int $userId): array
    {
        $totalPoints = (int) DB::table('points_ledger')
            ->where('cooperative_id', $this->cooperativeId)
            ->where('user_id', $userId)
            ->sum('points');

        $level = match (true) {
            $totalPoints >= 1000 => 'Village Hero',
            $totalPoints >= 700 => 'Platinum',
            $totalPoints >= 400 => 'Gold',
            $totalPoints >= 200 => 'Silver',
            default => 'Bronze',
        };

        $badges = DB::table('member_badges')
            ->join('badges', 'member_badges.badge_id', '=', 'badges.id')
            ->where('member_badges.user_id', $userId)
            ->where('badges.cooperative_id', $this->cooperativeId)
            ->pluck('badges.name')
            ->all();

        return [
            'total_points' => $totalPoints,
            'level' => $level,
            'badges' => $badges,
        ];
    }
}
