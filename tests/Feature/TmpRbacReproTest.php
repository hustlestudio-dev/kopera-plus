<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;

class TmpRbacReproTest extends TestCase
{
    public function test_explorer_can_open_explorer_dashboard(): void
    {
        $u = User::where('email', 'explorer@mail.com')->firstOrFail();
        $this->actingAs($u);
        $r = $this->get('/explorer-dashboard');
        fwrite(STDERR, "\n[EXPLORER /explorer-dashboard] status=".$r->status().' exception='.($r->exception ? $r->exception->getMessage() : 'none')."\n");
        $this->assertTrue(true);
    }

    public function test_admin_can_open_admin_dashboard(): void
    {
        $u = User::where('email', 'administrator@mail.com')->firstOrFail();
        $this->actingAs($u);
        $r = $this->get('/admin-dashboard');
        fwrite(STDERR, "\n[ADMIN /admin-dashboard] status=".$r->status().' exception='.($r->exception ? $r->exception->getMessage() : 'none')."\n");
        $this->assertTrue(true);
    }

    public function test_member_can_open_dashboard(): void
    {
        $u = User::where('email', 'member@mail.com')->firstOrFail();
        $this->actingAs($u);
        $r = $this->get('/dashboard');
        fwrite(STDERR, "\n[MEMBER /dashboard] status=".$r->status().' exception='.($r->exception ? $r->exception->getMessage() : 'none')."\n");
        $this->assertTrue(true);
    }
}
