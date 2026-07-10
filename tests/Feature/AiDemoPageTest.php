<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AiDemoPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_renders_the_ai_demo_page_with_seed_data(): void
    {
        DB::table('cooperatives')->insert([
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

        $this->get('/ai-demo')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('ai-demo')
                ->where('cooperative.name', 'Koperasi Maju Bersama')
                ->where('points', 0)
                ->has('products', 0)
            );
    }
}
