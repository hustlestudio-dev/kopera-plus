<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Models\User;
use Tests\TestCase;

/**
 * Independent verification (no code changes). Asserts every role can open its
 * dashboard, and that the post-login landing path resolves to the right route.
 */
class RbacAccessVerifyTest extends TestCase
{
    public function test_explorer_opens_explorer_dashboard(): void
    {
        $u = User::where('email', 'explorer@mail.com')->firstOrFail();
        $this->assertTrue($u->hasRole('explorer'));
        $r = $this->actingAs($u)->get('/explorer-dashboard');
        $this->assertEquals(200, $r->status(), (string) ($r->exception?->getMessage() ?? 'no exception'));
        $this->assertNull($r->exception);
        $this->assertEquals('/explorer-dashboard', UserRole::Explorer->homePath($u));
    }

    public function test_administrator_opens_admin_dashboard(): void
    {
        $u = User::where('email', 'administrator@mail.com')->firstOrFail();
        $this->assertTrue($u->hasRole('administrator'));
        $r = $this->actingAs($u)->get('/admin-dashboard');
        $this->assertEquals(200, $r->status(), (string) ($r->exception?->getMessage() ?? 'no exception'));
        $this->assertNull($r->exception);
        $this->assertEquals('/admin-dashboard', UserRole::Administrator->homePath($u));
    }

    public function test_member_opens_team_dashboard(): void
    {
        $u = User::where('email', 'member@mail.com')->firstOrFail();
        $this->assertTrue($u->hasRole('member'));
        $team = $u->currentTeam;
        $this->assertNotNull($team, 'member must have a current team for the landing route');
        $r = $this->actingAs($u)->get('/'.$team->slug.'/dashboard');
        $this->assertEquals(200, $r->status(), (string) ($r->exception?->getMessage() ?? 'no exception'));
        $this->assertNull($r->exception);
    }

    public function test_role_middleware_blocks_wrong_role(): void
    {
        $explorer = User::where('email', 'explorer@mail.com')->firstOrFail();
        $r = $this->actingAs($explorer)->get('/admin-dashboard');
        $this->assertEquals(403, $r->status());
    }

    public function test_route_list_resolves_all_dashboards(): void
    {
        $routes = \Illuminate\Support\Facades\Route::getRoutes();
        $this->assertNotNull($routes->getByName('admin.dashboard'));
        $this->assertNotNull($routes->getByName('explorer.dashboard'));
    }
}
