<?php

namespace App\Http\Controllers;

use App\Services\HackathonData;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        return Inertia::render('admin-dashboard', [
            'kpis' => HackathonData::kpis(),
            'ratParticipation' => HackathonData::ratParticipation(),
        ]);
    }
}
