<?php

use App\Http\Controllers\DashboardController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;

// M7 Member Hub routes. Owned by agent-m7.
Route::middleware(['auth', 'verified', 'role:member|administrator'])->group(function () {
    Route::get('{current_team}/dashboard', DashboardController::class)
        ->middleware(EnsureTeamMembership::class)
        ->name('dashboard');
    Route::get('workspace', [DashboardController::class, 'workspace'])->name('member.workspace');
    Route::get('assistant', [DashboardController::class, 'assistant'])->name('member.assistant');
});
