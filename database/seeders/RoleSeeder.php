<?php

namespace Database\Seeders;

use App\Enums\UserPermission;
use App\Enums\UserRole;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Create the platform-level Spatie roles and permissions, then attach the
     * capabilities defined on each `UserRole` to its matching `Role`. Idempotent.
     */
    public function run(): void
    {
        foreach (UserPermission::cases() as $permission) {
            Permission::firstOrCreate([
                'name' => $permission->value,
                'guard_name' => 'web',
            ]);
        }

        foreach (UserRole::cases() as $role) {
            $roleModel = Role::firstOrCreate([
                'name' => $role->value,
                'guard_name' => 'web',
            ]);

            $roleModel->syncPermissions(
                collect($role->permissions())
                    ->map(fn (UserPermission $permission) => $permission->value)
                    ->all()
            );
        }
    }
}
