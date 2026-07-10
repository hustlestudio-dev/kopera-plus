<?php

namespace Tests\Feature\Ai;

use App\Ai\Tools\CheckProductStock;
use App\Ai\Tools\CreateCommunityPost;
use App\Ai\Tools\CreateOrder;
use App\Ai\Tools\GetCommunityPosts;
use App\Ai\Tools\GetMemberPoints;
use App\Ai\Tools\GetQuorumStatus;
use App\Ai\Tools\GetRatAgenda;
use App\Ai\Tools\GetRatParticipationSummary;
use App\Ai\Tools\GetUserContext;
use App\Ai\Tools\SaveMemberProfile;
use App\Ai\Tools\SubmitRatAttendance;
use App\Ai\Tools\SubmitRatVote;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class ToolBehaviorTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_order_deducts_stock_and_awards_points(): void
    {
        [$cooperativeId, $userId, $productId] = $this->seedCooperativeWithUserAndProduct();

        $result = $this->app->make(CreateOrder::class, ['cooperativeId' => $cooperativeId])->handle([
            'user_id' => $userId,
            'delivery_method' => 'delivery',
            'delivery_address' => 'Desa Suka Maju',
            'delivery_fee' => 5000,
            'items' => [
                ['product_id' => $productId, 'quantity' => 2],
            ],
        ]);

        $this->assertTrue($result['created']);
        $this->assertDatabaseHas('orders', [
            'cooperative_id' => $cooperativeId,
            'user_id' => $userId,
            'status' => 'confirmed',
            'delivery_fee' => 5000,
            'total' => 155000,
        ]);
        $this->assertDatabaseHas('products', [
            'id' => $productId,
            'stock' => 8,
        ]);
        $this->assertDatabaseHas('points_ledger', [
            'cooperative_id' => $cooperativeId,
            'user_id' => $userId,
            'source' => 'transaksi',
        ]);
    }

    public function test_get_member_points_returns_level_and_badges(): void
    {
        [$cooperativeId, $userId] = $this->seedCooperativeWithUser();

        DB::table('points_ledger')->insert([
            [
                'cooperative_id' => $cooperativeId,
                'user_id' => $userId,
                'source' => 'transaksi',
                'points' => 250,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cooperative_id' => $cooperativeId,
                'user_id' => $userId,
                'source' => 'rat_attendance',
                'points' => 50,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        $badgeId = DB::table('badges')->insertGetId([
            'cooperative_id' => $cooperativeId,
            'code' => 'active-member',
            'name' => 'Anggota Aktif',
            'description' => 'Aktif berpartisipasi',
            'points_threshold' => 200,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('member_badges')->insert([
            'user_id' => $userId,
            'badge_id' => $badgeId,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $result = $this->app->make(GetMemberPoints::class, [
            'cooperativeId' => $cooperativeId,
        ])->handle($userId);

        $this->assertSame(300, $result['total_points']);
        $this->assertSame('Silver', $result['level']);
        $this->assertSame(['Anggota Aktif'], $result['badges']);
    }

    public function test_get_community_posts_returns_latest_public_posts(): void
    {
        [$cooperativeId, $userId] = $this->seedCooperativeWithUser();

        DB::table('community_posts')->insert([
            [
                'cooperative_id' => $cooperativeId,
                'user_id' => $userId,
                'title' => 'Posting 1',
                'content' => 'Konten 1',
                'visibility' => 'public',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cooperative_id' => $cooperativeId,
                'user_id' => $userId,
                'title' => 'Posting 2',
                'content' => 'Konten 2',
                'visibility' => 'public',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        $result = $this->app->make(GetCommunityPosts::class)->handle($cooperativeId);

        $this->assertCount(2, $result);
        $this->assertSame('Posting 2', $result[0]['title']);
    }

    public function test_save_member_profile_persists_profile_data(): void
    {
        [$cooperativeId, $userId] = $this->seedCooperativeWithUser();

        $result = $this->app->make(SaveMemberProfile::class, ['cooperativeId' => $cooperativeId])->handle([
            'user_id' => $userId,
            'phone_number' => '628111111111',
            'name' => 'Budi',
            'location' => 'Desa Suka Maju',
            'occupation' => 'Tani',
            'interest' => 'pertanian',
        ]);

        $this->assertTrue($result['saved']);
        $this->assertDatabaseHas('member_profiles', [
            'cooperative_id' => $cooperativeId,
            'user_id' => $userId,
            'name' => 'Budi',
            'interest' => 'pertanian',
        ]);
    }

    public function test_submit_rat_attendance_records_checkin_and_points(): void
    {
        [$cooperativeId, $userId] = $this->seedCooperativeWithUser();

        $agendaId = DB::table('rat_agendas')->insertGetId([
            'cooperative_id' => $cooperativeId,
            'title' => 'RAT 2026',
            'scheduled_at' => now()->addDay(),
            'summary' => 'Agenda tahunan',
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $result = $this->app->make(SubmitRatAttendance::class, ['cooperativeId' => $cooperativeId])->handle($agendaId, $userId);

        $this->assertTrue($result['success']);
        $this->assertDatabaseHas('rat_attendances', [
            'rat_agenda_id' => $agendaId,
            'user_id' => $userId,
        ]);
        $this->assertDatabaseHas('points_ledger', [
            'cooperative_id' => $cooperativeId,
            'user_id' => $userId,
            'source' => 'rat_attendance',
            'points' => 50,
        ]);
    }

    public function test_submit_rat_vote_handles_secret_ballot_message(): void
    {
        [$cooperativeId, $userId] = $this->seedCooperativeWithUser();

        $agendaId = DB::table('rat_agendas')->insertGetId([
            'cooperative_id' => $cooperativeId,
            'title' => 'RAT 2026',
            'scheduled_at' => now()->addDay(),
            'summary' => 'Agenda tahunan',
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $itemId = DB::table('rat_agenda_items')->insertGetId([
            'rat_agenda_id' => $agendaId,
            'title' => 'Pemilihan Ketua',
            'details' => 'Voting rahasia',
            'is_votable' => true,
            'is_secret_ballot' => true,
            'sort_order' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $result = $this->app->make(SubmitRatVote::class, ['cooperativeId' => $cooperativeId])->handle($itemId, $userId, 'calon A');

        $this->assertTrue($result['success']);
        $this->assertStringContainsString('tidak ditampilkan publik', $result['message']);
        $this->assertDatabaseHas('rat_votes', [
            'rat_agenda_item_id' => $itemId,
            'user_id' => $userId,
            'choice' => 'calon A',
        ]);
    }

    public function test_create_community_post_requires_cooperative_scope(): void
    {
        [$cooperativeId, $userId] = $this->seedCooperativeWithUser();

        $result = $this->app->make(CreateCommunityPost::class, ['cooperativeId' => $cooperativeId])->handle(
            $userId,
            'Praktik Baik',
            'Kami berhasil meningkatkan partisipasi anggota.'
        );

        $this->assertTrue($result['success']);
        $this->assertDatabaseHas('community_posts', [
            'cooperative_id' => $cooperativeId,
            'user_id' => $userId,
            'title' => 'Praktik Baik',
        ]);
    }

    public function test_quorum_summary_uses_only_current_cooperative(): void
    {
        [$cooperativeId, $userId] = $this->seedCooperativeWithUser();

        $agendaId = DB::table('rat_agendas')->insertGetId([
            'cooperative_id' => $cooperativeId,
            'title' => 'RAT 2026',
            'scheduled_at' => now()->addDay(),
            'summary' => 'Agenda tahunan',
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('rat_attendances')->insert([
            'rat_agenda_id' => $agendaId,
            'user_id' => $userId,
            'attended_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $status = $this->app->make(GetQuorumStatus::class, ['cooperativeId' => $cooperativeId])->handle($agendaId);
        $summary = $this->app->make(GetRatParticipationSummary::class, ['cooperativeId' => $cooperativeId])->handle($agendaId);

        $this->assertSame(1, $status['present']);
        $this->assertStringContainsString('Kehadiran: 1 anggota', $summary['summary']);
    }

    public function test_get_user_context_returns_scoped_user_data(): void
    {
        [$cooperativeId, $userId] = $this->seedCooperativeWithUser();

        $context = $this->app->make(GetUserContext::class, [
            'whatsappNumber' => '628111111111',
            'cooperativeId' => $cooperativeId,
        ])->handle();

        $this->assertTrue($context['exists']);
        $this->assertSame($cooperativeId, $context['cooperative_id']);
        $this->assertSame($userId, $context['user_id']);
        $this->assertSame('anggota', $context['role']);
    }

    public function test_check_product_stock_returns_matching_product(): void
    {
        [$cooperativeId, , $productId] = $this->seedCooperativeWithUserAndProduct();

        $result = $this->app->make(CheckProductStock::class, [
            'cooperativeId' => $cooperativeId,
        ])->handle('beras');

        $this->assertTrue($result['found']);
        $this->assertSame($productId, $result['product']['id']);
        $this->assertSame('Beras Premium', $result['product']['name']);
    }

    public function test_get_rat_agenda_returns_items_for_current_cooperative(): void
    {
        [$cooperativeId] = $this->seedCooperativeWithUser();

        $agendaId = DB::table('rat_agendas')->insertGetId([
            'cooperative_id' => $cooperativeId,
            'title' => 'RAT 2026',
            'scheduled_at' => now()->addDay(),
            'summary' => 'Agenda tahunan',
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('rat_agenda_items')->insert([
            'rat_agenda_id' => $agendaId,
            'title' => 'Pengesahan Laporan Tahunan',
            'details' => 'Agenda penting',
            'is_votable' => true,
            'is_secret_ballot' => false,
            'sort_order' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $agendas = $this->app->make(GetRatAgenda::class, [
            'cooperativeId' => $cooperativeId,
        ])->handle();

        $this->assertNotEmpty($agendas);
        $this->assertSame('RAT 2026', $agendas[0]['title']);
        $this->assertNotEmpty($agendas[0]['items']);
    }

    /**
     * @return array{0:int,1:int}
     */
    private function seedCooperativeWithUser(): array
    {
        $cooperativeId = DB::table('cooperatives')->insertGetId([
            'name' => 'Koperasi Maju Bersama',
            'slug' => 'koperasi-maju-bersama-'.str()->random(6),
            'whatsapp_number' => fake()->numerify('628##########'),
            'total_members' => 10,
            'quorum_threshold_percent' => 50,
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $user = User::factory()->create();
        User::query()->whereKey($user->id)->update([
            'phone_number' => '628111111111',
            'cooperative_id' => $cooperativeId,
            'role' => 'anggota',
        ]);

        return [$cooperativeId, $user->id];
    }

    /**
     * @return array{0:int,1:int,2:int}
     */
    private function seedCooperativeWithUserAndProduct(): array
    {
        [$cooperativeId, $userId] = $this->seedCooperativeWithUser();

        $productId = DB::table('products')->insertGetId([
            'cooperative_id' => $cooperativeId,
            'name' => 'Beras Premium',
            'sku' => 'BR-001',
            'stock' => 10,
            'unit' => 'kg',
            'price' => 75000,
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return [$cooperativeId, $userId, $productId];
    }
}
