<?php

namespace App\Http\Controllers\Ai;

use App\Http\Controllers\Controller;
use App\Services\Ai\KoperaAiService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AssistantMessageController extends Controller
{
    public function __construct(private readonly KoperaAiService $koperaAiService) {}

    public function store(Request $request): JsonResponse|StreamedResponse
    {
        $validated = $request->validate([
            'mode' => ['required', Rule::in([
                'assistant',
                'onboarding',
                'commerce',
                'rat_summary',
                'governance',
                'cross_kopdes',
                'nudge',
            ])],
            'message' => ['required', 'string', 'max:4000'],
            'context' => ['array'],
            'context.cooperative_name' => ['nullable', 'string'],
            'context.cooperative_location' => ['nullable', 'string'],
            'context.main_commodity' => ['nullable', 'string'],
            'context.total_members' => ['nullable', 'integer'],
            'context.total_points' => ['nullable', 'integer'],
            'context.current_level' => ['nullable', 'string'],
            'context.user_name' => ['nullable', 'string'],
        ]);

        $context = array_merge([
            'cooperative_name' => config('app.name'),
            'cooperative_location' => 'Koperasi setempat',
            'main_commodity' => 'produk koperasi',
            'total_members' => 0,
            'total_points' => 0,
            'current_level' => '-',
            'user_name' => $request->user()?->name ?? 'Anggota',
        ], $validated['context'] ?? []);

        $systemPrompt = $this->koperaAiService->buildModePrompt($validated['mode'], $context);

        $userPrompt = $validated['message'];

        if ($validated['mode'] === 'commerce') {
            $systemPrompt .= "\n\n".$this->koperaAiService->buildCommercePrompt($context);
            $userPrompt .= "\n\nDATA PRODUK AKTIF:\n".json_encode(
                $this->koperaAiService->listActiveProducts(),
                JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT,
            );
        } elseif ($validated['mode'] === 'rat_summary') {
            $systemPrompt .= "\n\n".$this->koperaAiService->buildRatSummaryInstructions();
        }

        $response = $this->koperaAiService->generateResponse([
            'system_prompt' => $systemPrompt,
            'user_prompt' => $userPrompt,
            'max_tokens' => $validated['mode'] === 'nudge' ? 140 : 320,
            'model' => config('services.gemini.model', 'gemini-2.0-flash'),
        ]);

        $payload = [
            'message' => $response['content'],
            'provider' => $response['provider'],
            'model' => $response['model'],
            'debug' => $response['debug'] ?? null,
        ];

        if ($request->boolean('stream')) {
            return response()->stream(function () use ($response): void {
                echo "event: message\n";
                echo 'data: '.json_encode(['chunk' => $response['content']], JSON_UNESCAPED_UNICODE)."\n\n";
                echo "event: done\n";
                echo 'data: '.json_encode($response, JSON_UNESCAPED_UNICODE)."\n\n";
            }, 200, [
                'Content-Type' => 'text/event-stream',
                'Cache-Control' => 'no-cache',
                'X-Accel-Buffering' => 'no',
            ]);
        }

        return response()->json($payload);
    }

    public function debug(Request $request): JsonResponse
    {
        $provider = $request->string('provider')->toString() ?: 'gemini';

        return response()->json([
            'provider' => $provider,
            'state' => $this->koperaAiService->getProviderDebugState($provider),
            'mode' => $request->string('mode')->toString() ?: 'assistant',
        ]);
    }
}
