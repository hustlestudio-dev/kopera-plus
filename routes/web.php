<?php

use App\Http\Controllers\AiDemoController;
use App\Http\Controllers\AssistantChatController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');
Route::get('/ai-demo', AiDemoController::class)->name('ai-demo');
Route::post('/assistant/chat', AssistantChatController::class)
    ->middleware(['auth', 'verified'])
    ->name('assistant.chat');

Route::inertia('/onboarding', 'onboarding')->name('onboarding');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('/workspace', 'workspace')->name('workspace');
    Route::inertia('/assistant', 'assistant')->name('assistant');
    Route::inertia('/admin-dashboard', 'admin-dashboard')->name('admin-dashboard');
    Route::inertia('/explorer-dashboard', 'explorer-dashboard')->name('explorer-dashboard');
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
