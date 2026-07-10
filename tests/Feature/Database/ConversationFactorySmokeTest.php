<?php

namespace Tests\Feature\Database;

use App\Models\ConversationMessage;
use App\Models\ConversationSession;
use App\Models\MemberLevel;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ConversationFactorySmokeTest extends TestCase
{
    use RefreshDatabase;

    public function test_conversation_factories_can_build_related_records(): void
    {
        $user = User::factory()->create();
        $session = ConversationSession::factory()->for($user)->create();
        $message = ConversationMessage::factory()->for($session, 'session')->create();
        $memberLevel = MemberLevel::factory()->for($user)->create();

        $this->assertDatabaseHas('conversation_sessions', [
            'id' => $session->id,
            'user_id' => $user->id,
        ]);

        $this->assertDatabaseHas('conversation_messages', [
            'id' => $message->id,
            'session_id' => $session->id,
        ]);

        $this->assertDatabaseHas('member_levels', [
            'id' => $memberLevel->id,
            'user_id' => $user->id,
        ]);
    }
}
