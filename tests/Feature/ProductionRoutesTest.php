<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
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
            '/'.$this->slug().'/dashboard',
        ];

        foreach ($protectedPages as $path) {
            $this->get($path)->assertRedirect('/login');
        }
    }

    public function test_member_can_access_member_areas_but_not_role_specific_dashboards(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        $this->get('/workspace')->assertOk();
        $this->get('/assistant')->assertOk();
        $this->get('/'.$user->personalTeam()->slug.'/dashboard')->assertOk();

        $this->get('/admin-dashboard')->assertForbidden();
        $this->get('/explorer-dashboard')->assertForbidden();
    }

    public function test_explorer_can_access_explorer_dashboard_only(): void
    {
        $user = User::factory()->create();
        $user->syncRoles(Role::findOrCreate('explorer', 'web'));

        $this->actingAs($user);

        $this->get('/explorer-dashboard')->assertOk();

        $this->get('/admin-dashboard')->assertForbidden();
        $this->get('/workspace')->assertForbidden();
        $this->get('/assistant')->assertForbidden();
        $this->get('/'.$user->personalTeam()->slug.'/dashboard')->assertForbidden();
    }

    public function test_administrator_can_access_everything(): void
    {
        $user = User::factory()->create();
        $user->syncRoles(Role::findOrCreate('administrator', 'web'));

        $this->actingAs($user);

        $this->get('/admin-dashboard')->assertOk();
        $this->get('/explorer-dashboard')->assertOk();
        $this->get('/workspace')->assertOk();
        $this->get('/assistant')->assertOk();
        $this->get('/'.$user->personalTeam()->slug.'/dashboard')->assertOk();
    }

    private function slug(): string
    {
        return User::factory()->create()->personalTeam()->slug;
    }
}
