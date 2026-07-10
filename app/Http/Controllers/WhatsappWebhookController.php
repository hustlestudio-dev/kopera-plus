<?php

namespace App\Http\Controllers;

use App\Ai\KoperaRuntime;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WhatsappWebhookController extends Controller
{
    public function handle(Request $request, KoperaRuntime $koperaRuntime): JsonResponse
    {
        $request->validate([
            'sender' => ['required', 'string'],
            'message' => ['nullable', 'string'],
        ]);

        $response = $koperaRuntime->handle(
            phoneNumber: $request->string('sender')->toString(),
            message: $request->string('message')->toString(),
        );

        return response()->json([
            'status' => 'ok',
            'response' => $response,
        ]);
    }
}
