<?php

use App\Http\Controllers\WhatsappWebhookController;
use Illuminate\Support\Facades\Route;

Route::post('/whatsapp/webhook', [WhatsappWebhookController::class, 'handle']);
