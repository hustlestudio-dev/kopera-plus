<?php

namespace App\Enums;

/**
 * Platform-level roles for cooperative members.
 *
 * ponytail: role enforcement actually happens through spatie/laravel-permission
 * (see `Role::firstOrCreate` in CreateNewUser and the `role:` middleware in
 * routes/web.php). This enum is a convenience for type-safe role references
 * and may be wired into form requests / policies later.
 */
enum UserRole: string
{
    case Explorer = 'explorer';
    case Member = 'member';
    case Administrator = 'administrator';

    /**
     * Get the display label for the role.
     */
    public function label(): string
    {
        return match ($this) {
            self::Explorer => 'Penjelajah',
            self::Member => 'Anggota',
            self::Administrator => 'Administrator',
        };
    }

    /**
     * Get all the permissions granted to this role.
     *
     * @return array<UserPermission>
     */
    public function permissions(): array
    {
        return match ($this) {
            self::Explorer => [
                UserPermission::ProfileView,
                UserPermission::ProfileUpdate,
                UserPermission::ExplorerAccess,
            ],
            self::Member => [
                UserPermission::ProfileView,
                UserPermission::ProfileUpdate,
                UserPermission::MemberAccess,
                UserPermission::WorkspaceAccess,
                UserPermission::AssistantAccess,
            ],
            // Administrator is the platform superuser: every capability.
            self::Administrator => UserPermission::cases(),
        };
    }

    /**
     * Roles that a user may self-assign during registration.
     *
     * `Administrator` is intentionally excluded: it must be provisioned by an
     * existing administrator (seeder, admin console, or elevation flow), never
     * chosen on a public registration form. Allowing self-service admin would
     * let any visitor grant themselves full platform control.
     *
     * @return array<array{value: string, label: string}>
     */
    public static function assignable(): array
    {
        return collect(self::cases())
            ->reject(fn (self $role) => $role === self::Administrator)
            ->map(fn (self $role) => ['value' => $role->value, 'label' => $role->label()])
            ->values()
            ->toArray();
    }
}
