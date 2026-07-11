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

    /**
     * Lock the capability model (docs/role-permission.md) so explorer, member,
     * and administrator never silently gain or lose a capability.
     */
    public function test_role_capability_matrix_matches_the_model(): void
    {
        $this->seed(RoleSeeder::class);

        $explorer = Role::findByName(UserRole::Explorer->value)->permissions()->pluck('name')->all();
        $member = Role::findByName(UserRole::Member->value)->permissions()->pluck('name')->all();
        $admin = Role::findByName(UserRole::Administrator->value)->permissions()->pluck('name')->all();

        // Explorer (masyarakat): browse/buy/transact + savings, never E-RAT.
        foreach (['shop:browse', 'shop:purchase', 'shop:transact', 'savings:deposit', 'savings:withdraw'] as $cap) {
            $this->assertContains($cap, $explorer, "explorer must have {$cap}");
        }
        $this->assertNotContains('erat:access', $explorer);

        // Member (anggota): profile + E-RAT ONLY.
        $this->assertEqualsCanonicalizing(['profile:view', 'profile:update', 'erat:access'], $member);

        // Administrator: every declared capability (forward-compatible).
        $this->assertEqualsCanonicalizing(
            array_map(fn (UserPermission $p) => $p->value, UserPermission::cases()),
            $admin,
        );
    }

    public function test_administrator_is_not_self_assignable(): void
    {
        $assignable = array_column(UserRole::assignable(), 'value');

        $this->assertNotContains(UserRole::Administrator->value, $assignable);
        $this->assertContains(UserRole::Explorer->value, $assignable);
        $this->assertContains(UserRole::Member->value, $assignable);
    }
}
