<?php

namespace Tests\Feature;

use App\Models\User;
use App\Services\KoperaAiService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class WhatsappWebhookTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_accepts_valid_whatsapp_webhook_payloads(): void
    {
        $cooperativeId = DB::table('cooperatives')->insertGetId([
            'name' => 'Koperasi Maju Bersama',
            'slug' => 'koperasi-maju-bersama',
            'whatsapp_number' => '6281234567890',
            'total_members' => 10,
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
        $user->refresh();

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

        $this->postJson('/api/whatsapp/webhook', [
            'sender' => $user->phone_number,
            'message' => 'mau beli beras',
        ])->assertOk()->assertJson([
            'status' => 'ok',
        ]);

        $this->assertStringContainsString('Stok:', (string) $this->app->make(KoperaAiService::class)->handleIncomingMessage($user->phone_number, 'mau beli beras'));
    }

    public function test_it_confirms_and_creates_order_after_yes_reply(): void
    {
        $cooperativeId = DB::table('cooperatives')->insertGetId([
            'name' => 'Koperasi Maju Bersama',
            'slug' => 'koperasi-maju-bersama-yes',
            'whatsapp_number' => '6281234567898',
            'total_members' => 10,
            'quorum_threshold_percent' => 50,
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $user = User::factory()->create();
        User::query()->whereKey($user->id)->update([
            'phone_number' => '6281234567898',
            'cooperative_id' => $cooperativeId,
            'role' => 'anggota',
        ]);
        $user->refresh();

        $productId = DB::table('products')->insertGetId([
            'cooperative_id' => $cooperativeId,
            'name' => 'Beras Premium 5 Kg',
            'sku' => 'BRG-YES',
            'stock' => 24,
            'unit' => 'karung',
            'price' => 75000,
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->app->make(KoperaAiService::class)
            ->handleIncomingMessage($user->phone_number, 'mau beli beras premium');

        $response = $this->app->make(KoperaAiService::class)
            ->handleIncomingMessage($user->phone_number, 'YA');

        $this->assertStringContainsString('Order berhasil dibuat', $response);
        $this->assertDatabaseHas('orders', [
            'cooperative_id' => $cooperativeId,
            'user_id' => $user->id,
            'status' => 'confirmed',
        ]);
        $this->assertDatabaseHas('products', [
            'id' => $productId,
            'stock' => 23,
        ]);
    }

    public function test_it_parses_quantity_and_delivery_address_from_chat(): void
    {
        $cooperativeId = DB::table('cooperatives')->insertGetId([
            'name' => 'Koperasi Maju Bersama',
            'slug' => 'koperasi-maju-bersama-delivery',
            'whatsapp_number' => '6281234567897',
            'total_members' => 10,
            'quorum_threshold_percent' => 50,
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $user = User::factory()->create();
        User::query()->whereKey($user->id)->update([
            'phone_number' => '6281234567897',
            'cooperative_id' => $cooperativeId,
            'role' => 'anggota',
        ]);
        $user->refresh();

        DB::table('products')->insert([
            'cooperative_id' => $cooperativeId,
            'name' => 'Beras Premium 5 Kg',
            'sku' => 'BRG-DELIVERY',
            'stock' => 24,
            'unit' => 'karung',
            'price' => 75000,
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $message = 'mau beli 3 beras premium antar ke Desa Suka Maju';

        $response = $this->app->make(KoperaAiService::class)
            ->handleIncomingMessage($user->phone_number, $message);

        $this->assertStringContainsString('Ketik YA untuk konfirmasi', $response);

        $this->app->make(KoperaAiService::class)
            ->handleIncomingMessage($user->phone_number, 'YA');

        $this->assertDatabaseHas('orders', [
            'cooperative_id' => $cooperativeId,
            'user_id' => $user->id,
            'delivery_method' => 'delivery',
        ]);
    }

    public function test_it_rejects_webhook_payloads_without_sender(): void
    {
        $this->postJson('/api/whatsapp/webhook', [
            'message' => 'halo',
        ])->assertStatus(422);
    }

    public function test_it_shows_member_points_when_requested(): void
    {
        $cooperativeId = DB::table('cooperatives')->insertGetId([
            'name' => 'Koperasi Maju Bersama',
            'slug' => 'koperasi-maju-bersama',
            'whatsapp_number' => '6281234567890',
            'total_members' => 10,
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
        $user->refresh();

        DB::table('points_ledger')->insert([
            'cooperative_id' => $cooperativeId,
            'user_id' => $user->id,
            'source' => 'transaksi',
            'points' => 250,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $response = $this->app->make(KoperaAiService::class)
            ->handleIncomingMessage($user->phone_number, 'poin saya berapa');

        $this->assertStringContainsString('Info Poin Kamu', $response);
        $this->assertStringContainsString('250 poin', $response);
    }

    public function test_it_saves_member_profile_from_onboarding_message(): void
    {
        $cooperativeId = DB::table('cooperatives')->insertGetId([
            'name' => 'Koperasi Maju Bersama',
            'slug' => 'koperasi-maju-bersama-2',
            'whatsapp_number' => '6281234567891',
            'total_members' => 10,
            'quorum_threshold_percent' => 50,
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $user = User::factory()->create();
        User::query()->whereKey($user->id)->update([
            'phone_number' => '6281234567891',
            'cooperative_id' => $cooperativeId,
            'role' => 'anggota',
        ]);
        $user->refresh();

        $response = $this->app->make(KoperaAiService::class)
            ->handleIncomingMessage($user->phone_number, 'nama saya Budi, lokasi Desa Suka Maju, usaha tani, minat pertanian');

        $this->assertStringContainsString('Profil Anda sudah saya simpan', $response);
        $this->assertDatabaseHas('member_profiles', [
            'cooperative_id' => $cooperativeId,
            'user_id' => $user->id,
            'name' => 'Budi',
        ]);
    }

    public function test_it_records_rat_attendance(): void
    {
        $cooperativeId = DB::table('cooperatives')->insertGetId([
            'name' => 'Koperasi Maju Bersama',
            'slug' => 'koperasi-maju-bersama-3',
            'whatsapp_number' => '6281234567892',
            'total_members' => 10,
            'quorum_threshold_percent' => 50,
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $user = User::factory()->create();
        User::query()->whereKey($user->id)->update([
            'phone_number' => '6281234567892',
            'cooperative_id' => $cooperativeId,
            'role' => 'anggota',
        ]);
        $user->refresh();

        $agendaId = DB::table('rat_agendas')->insertGetId([
            'cooperative_id' => $cooperativeId,
            'title' => 'RAT 2026',
            'scheduled_at' => now()->addDay(),
            'summary' => 'Membahas laporan tahunan.',
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $response = $this->app->make(KoperaAiService::class)
            ->handleIncomingMessage($user->phone_number, 'saya hadir RAT');

        $this->assertStringContainsString('Kehadiran RAT kamu sudah dicatat', $response);
        $this->assertDatabaseHas('rat_attendances', [
            'rat_agenda_id' => $agendaId,
            'user_id' => $user->id,
        ]);
    }

    public function test_it_records_secret_ballot_votes_without_exposing_choice(): void
    {
        $cooperativeId = DB::table('cooperatives')->insertGetId([
            'name' => 'Koperasi Maju Bersama',
            'slug' => 'koperasi-maju-bersama-4',
            'whatsapp_number' => '6281234567893',
            'total_members' => 10,
            'quorum_threshold_percent' => 50,
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $user = User::factory()->create();
        User::query()->whereKey($user->id)->update([
            'phone_number' => '6281234567893',
            'cooperative_id' => $cooperativeId,
            'role' => 'anggota',
        ]);
        $user->refresh();

        $agendaId = DB::table('rat_agendas')->insertGetId([
            'cooperative_id' => $cooperativeId,
            'title' => 'RAT 2026',
            'scheduled_at' => now()->addDay(),
            'summary' => 'Membahas laporan tahunan.',
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $itemId = DB::table('rat_agenda_items')->insertGetId([
            'rat_agenda_id' => $agendaId,
            'title' => 'Pemilihan Ketua',
            'details' => 'Agenda voting rahasia',
            'is_votable' => true,
            'is_secret_ballot' => true,
            'sort_order' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $response = $this->app->make(KoperaAiService::class)
            ->handleIncomingMessage($user->phone_number, 'vote');

        $this->assertStringContainsString('Vote berhasil dicatat', $response);
        $this->assertStringContainsString('tidak ditampilkan publik', $response);
        $this->assertDatabaseHas('rat_votes', [
            'rat_agenda_item_id' => $itemId,
            'user_id' => $user->id,
        ]);
    }
}
