<?php

namespace App\Enums;

use App\Models\User;

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
     * Capability model:
     *  - Explorer (masyarakat): browse/buy/transact products + savings.
     *  - Member (anggota): E-RAT module ONLY.
     *  - Administrator: every capability (superuser).
     *
     * @return array<UserPermission>
     */
    public function permissions(): array
    {
        return match ($this) {
            self::Explorer => [
                UserPermission::ProfileView,
                UserPermission::ProfileUpdate,
                UserPermission::ShopBrowse,
                UserPermission::ShopPurchase,
                UserPermission::ShopTransact,
                UserPermission::SavingsDeposit,
                UserPermission::SavingsWithdraw,
            ],
            self::Member => [
                UserPermission::ProfileView,
                UserPermission::ProfileUpdate,
                UserPermission::EratAccess,
            ],
            // Administrator is the platform superuser: every capability.
            self::Administrator => UserPermission::cases(),
        };
    }

    /**
     * Landing path for a user holding this role. This is the single server-side
     * source of truth for post-login / post-register routing; the client
     * `roleHomePath()` in resources/js/lib/permissions.ts mirrors it. Keep the
     * two in lockstep with ROUTE_ROLES in routes/web.php.
     */
    public function homePath(User $user): string
    {
        return match ($this) {
            self::Administrator => '/admin-dashboard',
            self::Explorer => '/explorer-dashboard',
            // Members land on their (personal) wilayah dashboard; without a
            // team they fall back to the teams screen to create or join one.
            self::Member => $this->memberHomePath($user),
        };
    }

    /**
     * Roles ordered by landing priority (superuser first). Used by
     * RedirectsToCurrentTeam so the most privileged held role wins the redirect.
     *
     * @return array<self>
     */
    public static function orderedForLanding(): array
    {
        return [self::Administrator, self::Explorer, self::Member];
    }

    private function memberHomePath(User $user): string
    {
        $team = $user->personalTeam() ?? $user->currentTeam;

        return $team ? '/'.$team->slug.'/dashboard' : '/settings/teams';
    }

    /**
     * Roles that a visitor may self-assign during registration.
     *
     * `Administrator` is intentionally excluded and may ONLY be provisioned by a
     * developer (seeder or an artisan command) - never from the public register
     * form. Allowing self-service admin would let any anonymous visitor claim
     * full platform control. This mirrors how `TeamRole::assignable()` hides
     * `owner`: you cannot appoint yourself the privileged role via a public form.
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
