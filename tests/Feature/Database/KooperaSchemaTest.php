<?php

namespace Tests\Feature\Database;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class KooperaSchemaTest extends TestCase
{
    use RefreshDatabase;

    public function test_erd_tables_and_seed_data_are_created(): void
    {
        $this->seed();

        $this->assertTrue(Schema::hasTable('cooperatives'));
        $this->assertTrue(Schema::hasTable('member_profiles'));
        $this->assertTrue(Schema::hasTable('conversation_sessions'));
        $this->assertTrue(Schema::hasTable('conversation_messages'));
        $this->assertTrue(Schema::hasTable('products'));
        $this->assertTrue(Schema::hasTable('orders'));
        $this->assertTrue(Schema::hasTable('order_items'));
        $this->assertTrue(Schema::hasTable('points_ledger'));
        $this->assertTrue(Schema::hasTable('member_levels'));
        $this->assertTrue(Schema::hasTable('badges'));
        $this->assertTrue(Schema::hasTable('member_badges'));
        $this->assertTrue(Schema::hasTable('rat_agendas'));
        $this->assertTrue(Schema::hasTable('rat_agenda_items'));
        $this->assertTrue(Schema::hasTable('rat_attendances'));
        $this->assertTrue(Schema::hasTable('rat_votes'));
        $this->assertTrue(Schema::hasTable('rat_ai_summaries'));
        $this->assertTrue(Schema::hasTable('rat_result_summaries'));
        $this->assertTrue(Schema::hasTable('community_posts'));
        $this->assertTrue(Schema::hasTable('cross_kopdes_insights'));
        $this->assertTrue(Schema::hasTable('cooperative_metrics_snapshots'));

        $this->assertDatabaseHas('cooperatives', [
            'name' => 'Koperasi Desa Sejahtera',
        ]);

        $this->assertDatabaseHas('products', [
            'name' => 'Beras Premium 5kg',
        ]);

        $this->assertDatabaseHas('badges', [
            'name' => 'First Transaction',
        ]);

        $this->assertDatabaseHas('rat_agendas', [
            'title' => 'RAT 2026',
        ]);
    }
}
