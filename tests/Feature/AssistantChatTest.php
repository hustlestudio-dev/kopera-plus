<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class AssistantChatTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_returns_backend_ai_response_for_authenticated_users(): void
    {
        $cooperativeId = DB::table('cooperatives')->insertGetId([
            'name' => 'Koperasi Maju Bersama',
            'slug' => 'koperasi-maju-bersama',
            'whatsapp_number' => '6281234567890',
            'province' => 'Jawa Timur',
            'city' => 'Malang',
            'total_members' => 124,
            'quorum_threshold_percent' => 50,
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $user = User::factory()->create();
        User::query()->whereKey($user->id)->update([
            'phone_number' => '6281234567890',
            'cooperative_id' => $cooperativeId,
            'role' => 'anggota',
        ]);

        DB::table('products')->insert([
            'cooperative_id' => $cooperativeId,
            'name' => 'Beras Premium 5 Kg',
            'sku' => 'BRG-5',
            'stock' => 24,
            'unit' => 'karung',
            'price' => 75000,
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->actingAs($user)
            ->postJson('/assistant/chat', [
                'message' => 'mau beli beras premium 2 antar ke Desa Suka Maju',
            ])
            ->assertOk()
            ->assertJsonStructure(['message'])
            ->assertJsonPath('message', fn (string $message): bool => str_contains($message, 'Beras Premium 5 Kg'));
    }

    public function test_it_requires_authentication_for_realtime_chat(): void
    {
        $this->postJson('/assistant/chat', [
            'message' => 'halo',
        ])->assertStatus(401);
    }
}
