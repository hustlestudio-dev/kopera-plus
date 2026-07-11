<?php

namespace Tests\Feature\Ai;

use App\Models\User;
use App\Services\Ai\KoperaAiService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Tests\TestCase;

class AssistantMessageTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_builds_the_assistant_prompt_with_kopera_context(): void
    {
        $service = new KoperaAiService;

        $prompt = $service->buildAssistantPrompt([
            'cooperative_name' => 'Koperasi Tani Maju',
            'cooperative_location' => 'Bandung',
            'main_commodity' => 'beras organik',
            'total_members' => 120,
        ]);

        $this->assertStringContainsString('Koperasi Tani Maju', $prompt);
        $this->assertStringContainsString('Bandung', $prompt);
        $this->assertStringContainsString('beras organik', $prompt);
        $this->assertStringContainsString('120 orang', $prompt);
    }

    public function test_it_returns_gemini_response_when_api_is_available(): void
    {
        Config::set('services.gemini.api_key', 'test-key');
        Config::set('services.gemini.model', 'gemini-2.0-flash');

        Http::fake([
            'generativelanguage.googleapis.com/*' => Http::response([
                'candidates' => [
                    [
                        'content' => [
                            'parts' => [
                                ['text' => 'Halo, ini respons Gemini.'],
                            ],
                        ],
                    ],
                ],
            ]),
        ]);

        $user = User::query()->create([
            'name' => 'Budi',
            'email' => 'budi@example.com',
            'password' => bcrypt('password'),
            'remember_token' => Str::random(10),
        ]);

        $response = $this
            ->actingAs($user)
            ->postJson(route('assistant.messages.store'), [
                'mode' => 'assistant',
                'message' => 'Apa itu koperasi?',
                'context' => [
                    'cooperative_name' => 'Koperasi Tani Maju',
                    'cooperative_location' => 'Bandung',
                    'main_commodity' => 'beras organik',
                    'total_members' => 120,
                    'total_points' => 4200,
                    'current_level' => 'Gold',
                    'user_name' => 'Budi',
                ],
            ]);

        $response->assertOk()
            ->assertJson([
                'provider' => 'gemini',
                'model' => 'gemini-2.0-flash',
                'message' => 'Halo, ini respons Gemini.',
            ]);
    }

    public function test_it_uses_groq_for_engagement_nudges(): void
    {
        Config::set('services.gemini.api_key', 'test-key');
        Config::set('services.gemini.model', 'gemini-2.0-flash');

        Http::fake([
            'generativelanguage.googleapis.com/*' => Http::response([
                'candidates' => [
                    [
                        'content' => [
                            'parts' => [
                                ['text' => 'Hai Budi, poinmu tinggal sedikit lagi.'],
                            ],
                        ],
                    ],
                ],
            ]),
        ]);

        $user = User::query()->create([
            'name' => 'Budi',
            'email' => 'budi@example.com',
            'password' => bcrypt('password'),
            'remember_token' => Str::random(10),
        ]);

        $response = $this
            ->actingAs($user)
            ->postJson(route('assistant.messages.store'), [
                'mode' => 'nudge',
                'message' => 'Buat notifikasi untuk anggota yang hampir naik level.',
                'context' => [
                    'cooperative_name' => 'Koperasi Tani Maju',
                    'user_name' => 'Budi',
                    'total_points' => 4200,
                    'current_level' => 'Gold',
                ],
            ]);

        $response->assertOk()
            ->assertJson([
                'provider' => 'gemini',
                'model' => 'gemini-2.0-flash',
                'message' => 'Hai Budi, poinmu tinggal sedikit lagi.',
            ]);
    }

    public function test_it_rotates_gemini_keys_when_the_first_one_fails(): void
    {
        Config::set('services.gemini.api_keys', 'bad-key,good-key');
        Config::set('services.gemini.model', 'gemini-2.0-flash');

        Http::fake([
            'generativelanguage.googleapis.com/*bad-key*' => Http::response([
                'error' => ['message' => 'quota exceeded'],
            ], 429),
            'generativelanguage.googleapis.com/*good-key*' => Http::response([
                'candidates' => [
                    [
                        'content' => [
                            'parts' => [
                                ['text' => 'Rotasi berhasil.'],
                            ],
                        ],
                    ],
                ],
            ], 200),
        ]);

        $user = User::query()->create([
            'name' => 'Budi',
            'email' => 'budi@example.com',
            'password' => bcrypt('password'),
            'remember_token' => Str::random(10),
        ]);

        $response = $this
            ->actingAs($user)
            ->postJson(route('assistant.messages.store'), [
                'mode' => 'assistant',
                'message' => 'Coba rotasi key',
                'context' => [
                    'cooperative_name' => 'Koperasi Tani Maju',
                ],
            ]);

        $response->assertOk()
            ->assertJson([
                'provider' => 'gemini',
                'model' => 'gemini-2.0-flash',
                'message' => 'Rotasi berhasil.',
            ]);

        $response->assertJsonPath('debug.used_key_index', 2);
    }

    public function test_it_returns_debug_state_for_assistant(): void
    {
        Config::set('services.gemini.api_keys', 'key-a,key-b');
        Config::set('services.gemini.model', 'gemini-2.0-flash');

        $user = User::query()->create([
            'name' => 'Budi',
            'email' => 'budi@example.com',
            'password' => bcrypt('password'),
            'remember_token' => Str::random(10),
        ]);

        $response = $this
            ->actingAs($user)
            ->getJson(route('assistant.messages.debug', [
                'provider' => 'gemini',
                'mode' => 'assistant',
            ]));

        $response->assertOk()
            ->assertJson([
                'provider' => 'gemini',
                'mode' => 'assistant',
            ])
            ->assertJsonPath('state.configured_key_count', 2)
            ->assertJsonPath('state.key_rotation_enabled', true);
    }

    public function test_it_falls_back_to_groq_when_gemini_fails(): void
    {
        Config::set('services.gemini.api_keys', 'bad-gemini');
        Config::set('services.groq.api_keys', 'good-groq');
        Config::set('services.gemini.model', 'gemini-2.0-flash');
        Config::set('services.groq.model', 'llama-3.3-70b-versatile');

        Http::fake([
            'generativelanguage.googleapis.com/*bad-gemini*' => Http::response([
                'error' => ['message' => 'quota exceeded'],
            ], 429),
            'api.groq.com/*' => Http::response([
                'choices' => [
                    [
                        'message' => [
                            'content' => 'Fallback Groq berhasil.',
                        ],
                    ],
                ],
            ]),
        ]);

        $user = User::query()->create([
            'name' => 'Budi',
            'email' => 'budi@example.com',
            'password' => bcrypt('password'),
            'remember_token' => Str::random(10),
        ]);

        $response = $this
            ->actingAs($user)
            ->postJson(route('assistant.messages.store'), [
                'mode' => 'assistant',
                'message' => 'Halo',
                'context' => [
                    'cooperative_name' => 'Koperasi Tani Maju',
                ],
            ]);

        $response->assertOk()
            ->assertJson([
                'provider' => 'groq',
                'model' => 'llama-3.3-70b-versatile',
                'message' => 'Fallback Groq berhasil.',
            ])
            ->assertJsonPath('debug.fallback_from', 'gemini');
    }

    public function test_it_streams_responses_when_requested(): void
    {
        Config::set('services.gemini.api_key', 'test-key');
        Config::set('services.gemini.model', 'gemini-2.0-flash');

        Http::fake([
            'generativelanguage.googleapis.com/*' => Http::response([
                'candidates' => [
                    [
                        'content' => [
                            'parts' => [
                                ['text' => 'Streaming aktif.'],
                            ],
                        ],
                    ],
                ],
            ]),
        ]);

        $user = User::query()->create([
            'name' => 'Budi',
            'email' => 'budi@example.com',
            'password' => bcrypt('password'),
            'remember_token' => Str::random(10),
        ]);

        $response = $this
            ->actingAs($user)
            ->post(route('assistant.messages.store'), [
                'mode' => 'assistant',
                'message' => 'Halo',
                'stream' => true,
            ]);

        $response->assertOk();
        $response->assertHeader('Content-Type', 'text/event-stream; charset=UTF-8');
        $this->assertStringContainsString('event: message', $response->streamedContent());
    }
}
