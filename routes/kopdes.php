<?php

use App\Http\Controllers\KopdesController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/community', [KopdesController::class, 'index'])
        ->middleware('role:member|administrator|explorer')
        ->name('community.index');
    Route::post('/community', [KopdesController::class, 'store'])
        ->middleware('role:member|administrator')
        ->name('community.store');
    Route::post('/community/{post}/like', [KopdesController::class, 'like'])
        ->middleware('role:member|administrator')
        ->name('community.like');
});
