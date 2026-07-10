<?php

namespace Tests\Feature;

use App\Enums\UserPermission;
use App\Enums\UserRole;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_role_and_user_seeders_are_idempotent(): void
    {
        $this->seed(RoleSeeder::class);
        $this->seed(UserSeeder::class);
        // Rerun to prove no duplicates / no errors are introduced.
        $this->seed(UserSeeder::class);

        $this->assertDatabaseCount('roles', 3);
        $this->assertDatabaseCount('users', 3);

        foreach (UserRole::cases() as $role) {
            $email = $role->value.'@mail.com';

            $user = User::where('email', $email)->firstOrFail();
            $this->assertSame($role->value, $user->roles->first()?->name);
            $this->assertTrue(
                $user->ownedTeams()->where('is_personal', true)->exists(),
                "{$email} should have a personal team",
            );

            // Each demo user must carry exactly the capabilities its role grants.
            $expected = array_map(
                fn (UserPermission $permission) => $permission->value,
                $role->permissions(),
            );
            $this->assertEqualsCanonicalizing($expected, $user->getAllPermissions()->pluck('name')->all());
        }

        // Exactly one role assignment row per user, even after a rerun.
        $this->assertDatabaseCount('model_has_roles', 3);
    }

    public function test_administrator_receives_every_permission(): void
    {
        $this->seed(RoleSeeder::class);
        $this->seed(UserSeeder::class);

        $admin = User::where('email', 'administrator@mail.com')->firstOrFail();

        $this->assertEqualsCanonicalizing(
            array_map(fn (UserPermission $p) => $p->value, UserPermission::cases()),
            $admin->getAllPermissions()->pluck('name')->all(),
        );
    }
}
