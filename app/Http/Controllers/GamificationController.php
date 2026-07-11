<?php

namespace App\Http\Controllers;

use App\Services\GamificationService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GamificationController extends Controller
{
    public function __invoke(Request $request, GamificationService $gamification): Response
    {
        $user = $request->user();

        return Inertia::render('rewards', [
            'loyalty' => $gamification->getUserPoints($user),
            'badges' => $gamification->getUserBadges($user),
        ]);
    }
}
