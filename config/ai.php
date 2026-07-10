<?php

use App\Ai\Tools\CalculateDeliveryFee;
use App\Ai\Tools\CheckProductStock;
use App\Ai\Tools\CreateCommunityPost;
use App\Ai\Tools\CreateOrder;
use App\Ai\Tools\GetCommunityPosts;
use App\Ai\Tools\GetCrossKopdesInsights;
use App\Ai\Tools\GetKopdesDirectory;
use App\Ai\Tools\GetMemberPoints;
use App\Ai\Tools\GetQuorumStatus;
use App\Ai\Tools\GetRatAgenda;
use App\Ai\Tools\GetRatParticipationSummary;
use App\Ai\Tools\GetUserContext;
use App\Ai\Tools\SaveMemberProfile;
use App\Ai\Tools\SubmitRatAttendance;
use App\Ai\Tools\SubmitRatVote;

return [
    'fallback_mode' => env('AI_FALLBACK_MODE', false),

    'agent' => [
        'provider' => env('AI_PROVIDER', 'gemini'),
        'temperature' => (float) env('AI_TEMPERATURE', 0.3),
        'max_tokens' => (int) env('AI_MAX_TOKENS', 1024),
        'max_steps' => (int) env('AI_MAX_STEPS', 5),
        'timeout' => (int) env('AI_TIMEOUT', 30),
    ],

    'tools' => [
        'get_user_context' => GetUserContext::class,
        'save_member_profile' => SaveMemberProfile::class,
        'check_product_stock' => CheckProductStock::class,
        'calculate_delivery_fee' => CalculateDeliveryFee::class,
        'create_order' => CreateOrder::class,
        'get_member_points' => GetMemberPoints::class,
        'get_rat_agenda' => GetRatAgenda::class,
        'get_quorum_status' => GetQuorumStatus::class,
        'submit_rat_attendance' => SubmitRatAttendance::class,
        'submit_rat_vote' => SubmitRatVote::class,
        'get_rat_participation_summary' => GetRatParticipationSummary::class,
        'get_kopdes_directory' => GetKopdesDirectory::class,
        'get_community_posts' => GetCommunityPosts::class,
        'get_cross_kopdes_insights' => GetCrossKopdesInsights::class,
        'create_community_post' => CreateCommunityPost::class,
    ],
];
