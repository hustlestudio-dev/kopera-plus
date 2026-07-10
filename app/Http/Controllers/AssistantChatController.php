<?php

namespace App\Http\Controllers;

use App\Ai\KoperaRuntime;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AssistantChatController extends Controller
{
    public function __invoke(Request $request, KoperaRuntime $koperaRuntime): JsonResponse
    {
        $request->validate([
            'message' => ['required', 'string'],
        ]);

        $user = $request->user();

        if (! $user) {
            return response()->json([
                'message' => 'Maaf, Anda harus login dulu untuk memakai asisten AI ini.',
            ], 401);
        }

        $response = $koperaRuntime->handleForUser($user, $request->string('message')->toString());

        return response()->json([
            'message' => $response,
        ]);
    }
}
