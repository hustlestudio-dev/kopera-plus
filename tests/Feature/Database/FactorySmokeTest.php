<?php

namespace Tests\Feature\Database;

use App\Models\Badge;
use App\Models\CommunityPost;
use App\Models\ConversationSession;
use App\Models\Cooperative;
use App\Models\MemberProfile;
use App\Models\Order;
use App\Models\PointsLedger;
use App\Models\Product;
use App\Models\RatAgenda;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FactorySmokeTest extends TestCase
{
    use RefreshDatabase;

    public function test_core_factories_can_build_related_records(): void
    {
        $cooperative = Cooperative::factory()->create();
        $user = User::factory()->forCooperative($cooperative)->create();

        $profile = MemberProfile::factory()->for($user)->onboarding()->create();
        $product = Product::factory()->for($cooperative)->lowStock()->create();
        $order = Order::factory()->for($user)->for($cooperative)->confirmed()->create();
        $badge = Badge::factory()->firstTransaction()->create();
        $ratAgenda = RatAgenda::factory()->for($cooperative)->open()->create();
        $session = ConversationSession::factory()->for($user)->closed()->create();
        $post = CommunityPost::factory()->for($cooperative)->for($user, 'author')->knowledgeShare()->create();
        $ledger = PointsLedger::factory()->for($user)->orderCompleted()->create();

        $this->assertDatabaseHas('cooperatives', [
            'id' => $cooperative->id,
        ]);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'cooperative_id' => $cooperative->id,
            'role' => 'member',
        ]);

        $this->assertDatabaseHas('member_profiles', [
            'id' => $profile->id,
            'user_id' => $user->id,
        ]);

        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'cooperative_id' => $cooperative->id,
        ]);

        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'user_id' => $user->id,
        ]);

        $this->assertDatabaseHas('badges', [
            'id' => $badge->id,
        ]);

        $this->assertDatabaseHas('rat_agendas', [
            'id' => $ratAgenda->id,
            'cooperative_id' => $cooperative->id,
        ]);

        $this->assertDatabaseHas('conversation_sessions', [
            'id' => $session->id,
            'status' => 'closed',
        ]);

        $this->assertDatabaseHas('community_posts', [
            'id' => $post->id,
            'title' => 'Tips Stok Beras',
        ]);

        $this->assertDatabaseHas('points_ledger', [
            'id' => $ledger->id,
            'event_type' => 'order_completed',
        ]);
    }
}
