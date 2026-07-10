<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class ErrorsTest extends TestCase
{
    use RefreshDatabase;

    public function test_inertia_request_404_renders_friendly_error_page(): void
    {
        $this->get('/halaman-yang-tidak-ada', ['X-Inertia' => 'true'])
            ->assertStatus(404)
            ->assertJson(['component' => 'errors/error', 'props' => ['status' => 404]]);
    }

    public function test_inertia_post_request_renders_friendly_error_page(): void
    {
        // Unknown path returns 404 for any method; assert the visit still lands
        // on the friendly Inertia page instead of the bare error screen.
        $this->post('/halaman-yang-tidak-ada', [], ['X-Inertia' => 'true'])
            ->assertStatus(404)
            ->assertJson(['component' => 'errors/error', 'props' => ['status' => 404]]);
    }

    public function test_api_request_404_still_returns_json(): void
    {
        $this->getJson('/halaman-yang-tidak-ada')
            ->assertStatus(404)
            ->assertJsonStructure(['message']);
    }

    public function test_non_inertia_web_request_404_renders_friendly_blade_page(): void
    {
        $this->get('/halaman-yang-tidak-ada')
            ->assertStatus(404)
            ->assertSee('Halaman tidak ditemukan')
            ->assertSee('KOPERA-PLUS');
    }

    public function test_non_inertia_web_request_409_renders_session_expired_page(): void
    {
        Route::get('/_sesi-berakhir', fn () => abort(409))->middleware('web');

        $this->get('/_sesi-berakhir')
            ->assertStatus(409)
            ->assertSee('Sesi telah berakhir')
            ->assertSee('KOPERA-PLUS');
    }
}
