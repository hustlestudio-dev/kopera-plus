import { usePage } from '@inertiajs/react';
import type { PageProps } from '@/types';

/**
 * Single source of truth for platform roles. Mirrors App\Enums\UserRole.
 * Keep in sync with that enum; the Slug<T> cast below guarantees the values
 * match the backend role names exactly.
 */
export const ROLE = {
    EXPLORER: 'explorer',
    MEMBER: 'member',
    ADMIN: 'administrator',
} as const;

type RoleSlug = (typeof ROLE)[keyof typeof ROLE];

/**
 * Central map of route path -> roles allowed to open it. This MUST mirror the
 * `role:` middleware groups in routes/web.php and routes/settings.php. When the
 * server grants access via `role:member|administrator`, the same pair lives
 * here so a link is only ever rendered for users who can actually open it.
 *
 * Any path not listed is treated as public (ungated) and always allowed.
 */
export const ROUTE_ROLES: Record<string, RoleSlug[]> = {
    '/admin-dashboard': [ROLE.ADMIN],
    '/explorer-dashboard': [ROLE.EXPLORER, ROLE.ADMIN],
    '/workspace': [ROLE.MEMBER, ROLE.ADMIN],
    '/assistant': [ROLE.MEMBER, ROLE.ADMIN],
    '/settings/teams': [ROLE.MEMBER, ROLE.ADMIN],
};

/**
 * Client mirror of `App\Enums\UserRole::homePath()`. Derive the landing path
 * from a user's roles so the welcome / landing screen cannot drift from the
 * server's post-login routing. Keep in sync with that enum.
 */
export function roleHomePath(roles: string[], teamSlug?: string | null): string {
    if (roles.includes(ROLE.ADMIN)) {
        return '/admin-dashboard';
    }

    if (roles.includes(ROLE.EXPLORER)) {
        return '/explorer-dashboard';
    }

    if (roles.includes(ROLE.MEMBER) && teamSlug) {
        return `/${teamSlug}/dashboard`;
    }

    return '/settings/teams';
}

/**
 * One standardized way to check access on the client. Reads the roles and
 * permissions shared by HandleInertiaRequests, so this is the client equivalent
 * of the server's `hasAnyRole` / `hasPermissionTo`.
 *
 * Use canAccess(href) for navigation links so gated routes are never shown to a
 * role that would otherwise hit a 403.
 */
export function usePermissions() {
    const { auth } = usePage<PageProps>().props;

    const roles: string[] = auth.user?.roles ?? [];
    const permissions: string[] = auth.user?.permissions ?? [];

    const hasRole = (role: string): boolean => roles.includes(role);

    const hasAnyRole = (required: string[]): boolean =>
        required.some((role) => roles.includes(role));

    const hasPermission = (permission: string): boolean =>
        permissions.includes(permission) || hasRole(ROLE.ADMIN);

    const canAccess = (href: string, required?: string[]): boolean => {
        const needed = required ?? ROUTE_ROLES[href];

        // No entry in ROUTE_ROLES means the route is ungated/public.
        if (!needed || needed.length === 0) {
            return true;
        }

        return hasAnyRole(needed);
    };

    return { roles, permissions, hasRole, hasAnyRole, hasPermission, canAccess };
}
