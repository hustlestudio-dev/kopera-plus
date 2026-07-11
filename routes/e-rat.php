<?php

// M9 e-RAT (Digital Voting Facilitation) routes. Owned by agent-m9.
use App\Http\Controllers\ERatController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::get('/e-rat', [ERatController::class, 'index'])->name('e-rat.index');
    Route::post('/e-rat/vote', [ERatController::class, 'store'])->name('e-rat.vote');
});
