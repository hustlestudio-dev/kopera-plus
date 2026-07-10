<?php

namespace App\Enums;

/**
 * Platform-level permissions (capabilities) for cooperative members.
 *
 * These back the spatie/laravel-permission `Permission` rows seeded by
 * `RoleSeeder`. Authorization at the platform level should prefer
 * `$user->can(UserPermission::...)` over raw role-name checks, so capability
 * (not role identity) drives access. This mirrors how `TeamPermission`
 * expresses team-scoped capabilities for `TeamRole`.
 */
enum UserPermission: string
{
    // Account & profile - available to every authenticated member.
    case ProfileView = 'profile:view';
    case ProfileUpdate = 'profile:update';

    // Explorer surface.
    case ExplorerAccess = 'explorer:access';

    // Member surface.
    case MemberAccess = 'member:access';
    case WorkspaceAccess = 'workspace:access';
    case AssistantAccess = 'assistant:access';

    // Platform administration.
    case AdminAccess = 'admin:access';
    case ManageUsers = 'admin:users';
    case ManageRoles = 'admin:roles';

    /**
     * Get the display label for the permission.
     */
    public function label(): string
    {
        return match ($this) {
            self::ProfileView => 'Lihat profil',
            self::ProfileUpdate => 'Perbarui profil',
            self::ExplorerAccess => 'Akses layanan penjelajah',
            self::MemberAccess => 'Akses sebagai anggota',
            self::WorkspaceAccess => 'Akses ruang kerja',
            self::AssistantAccess => 'Akses asisten',
            self::AdminAccess => 'Akses panel administrasi',
            self::ManageUsers => 'Kelola pengguna',
            self::ManageRoles => 'Kelola peran',
        };
    }
}
