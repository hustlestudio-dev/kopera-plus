<?php

namespace Tests\Feature;

use App\Enums\UserPermission;
use App\Enums\UserRole;
use Database\Seeders\RoleSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class RoleSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_roles_and_permissions_are_seeded_idempotently(): void
    {
        $this->seed(RoleSeeder::class);
        // Rerun to prove no duplicates / no errors are introduced.
        $this->seed(RoleSeeder::class);

        $this->assertDatabaseCount('roles', count(UserRole::cases()));
        $this->assertDatabaseCount('permissions', count(UserPermission::cases()));
    }

    public function test_each_role_carries_its_declared_permissions(): void
    {
        $this->seed(RoleSeeder::class);

        foreach (UserRole::cases() as $role) {
            $expected = array_map(
                fn (UserPermission $permission) => $permission->value,
                $role->permissions(),
            );

            $actual = Role::findByName($role->value)
                ->permissions()
                ->pluck('name')
                ->all();

            $this->assertEqualsCanonicalizing($expected, $actual, "Role {$role->value}");
        }
    }
}
