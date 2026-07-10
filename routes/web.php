<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::redirect('/demo/auth', '/login', 301);

/*
 * Role-scoped application areas.
 *
 * Routes are grouped per role first, then by action. The `role:` middleware
 * (provided by spatie/laravel-permission) enforces access; administrators are
 * superusers and may reach every area.
 */
Route::middleware(['auth', 'verified'])->group(function () {
    // ADMINISTRATOR
    Route::middleware('role:administrator')->group(function () {
        Route::inertia('/admin-dashboard', 'admin-dashboard')->name('admin.dashboard');
    });

    // EXPLORER
    Route::middleware('role:explorer|administrator')->group(function () {
        Route::inertia('/explorer-dashboard', 'explorer-dashboard')->name('explorer.dashboard');
    });

    // MEMBER
    Route::middleware('role:member|administrator')->group(function () {
        Route::get('{current_team}/dashboard', DashboardController::class)
            ->middleware(EnsureTeamMembership::class)
            ->name('dashboard');
        Route::inertia('workspace', 'workspace')->name('member.workspace');
        Route::inertia('assistant', 'assistant')->name('member.assistant');
    });
});

Route::middleware(['auth'])->group(function () {
    Route::get('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
    Route::delete('invitations/{invitation}', [TeamInvitationController::class, 'decline'])->name('invitations.decline');
});

require __DIR__.'/settings.php';
