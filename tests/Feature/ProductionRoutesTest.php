<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductionRoutesTest extends TestCase
{
    use RefreshDatabase;

    public function test_legacy_demo_auth_route_redirects_to_login(): void
    {
        $this->get('/demo/auth')
            ->assertStatus(301)
            ->assertRedirect('/login');
    }

    public function test_guest_users_are_redirected_to_login_from_app_pages(): void
    {
        $protectedPages = [
            '/workspace',
            '/assistant',
            '/admin-dashboard',
            '/explorer-dashboard',
        ];

        foreach ($protectedPages as $path) {
            $this->get($path)->assertRedirect('/login');
        }
    }

    public function test_authenticated_verified_users_can_access_app_pages(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        $protectedPages = [
            '/workspace',
            '/assistant',
            '/admin-dashboard',
            '/explorer-dashboard',
        ];

        foreach ($protectedPages as $path) {
            $this->get($path)->assertOk();
        }
    }
}
