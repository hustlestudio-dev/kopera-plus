<?php

use App\Http\Controllers\AdminDashboardController;
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
        Route::get('/admin-dashboard', [AdminDashboardController::class, '__invoke'])->name('admin.dashboard');
    });

    // EXPLORER
    Route::middleware('role:explorer|administrator')->group(function () {
        Route::get('/explorer-dashboard', [DashboardController::class, 'explorer'])->name('explorer.dashboard');
    });
});

Route::middleware(['auth'])->group(function () {
    Route::get('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
    Route::delete('invitations/{invitation}', [TeamInvitationController::class, 'decline'])->name('invitations.decline');
});

require __DIR__.'/e-rat.php';
require __DIR__.'/gamification.php';
require __DIR__.'/kopdes.php';
require __DIR__.'/member.php';
require __DIR__.'/whatsapp.php';
require __DIR__.'/settings.php';
