<?php

use App\Http\Controllers\GamificationController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/rewards', GamificationController::class)
        ->middleware('role:member|administrator')
        ->name('rewards');
});
