<?php

use App\Http\Controllers\Ai\AssistantMessageController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::inertia('/onboarding', 'onboarding')->name('onboarding');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('/workspace', 'workspace')->name('workspace');
    Route::inertia('/assistant', 'assistant')->name('assistant');
    Route::inertia('/admin-dashboard', 'admin-dashboard')->name('admin-dashboard');
    Route::inertia('/explorer-dashboard', 'explorer-dashboard')->name('explorer-dashboard');
    Route::post('/assistant/messages', [AssistantMessageController::class, 'store'])->name('assistant.messages.store');
    Route::get('/assistant/debug', [AssistantMessageController::class, 'debug'])->name('assistant.messages.debug');
});

Route::redirect('/demo/auth', '/login', 301);

Route::prefix('{current_team}')
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->group(function () {
        Route::get('dashboard', DashboardController::class)->name('dashboard');
    });

Route::middleware(['auth'])->group(function () {
    Route::get('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
    Route::delete('invitations/{invitation}', [TeamInvitationController::class, 'decline'])->name('invitations.decline');
});

require __DIR__.'/settings.php';
