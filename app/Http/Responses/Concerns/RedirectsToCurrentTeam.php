<?php

namespace App\Http\Responses\Concerns;

use App\Enums\UserRole;
use Illuminate\Http\Request;

trait RedirectsToCurrentTeam
{
    protected function redirectPathForCurrentTeam(Request $request, string $redirect): string
    {
        $user = $request->user();

        // Guests can never reach a post-authentication response; don't 403.
        if (! $user) {
            return '/';
        }

        // The role enum is the single source of truth for where each role lands.
        // Enumerating UserRole::orderedForLanding() (instead of hard-coding
        // hasRole('explorer') strings) means adding or renaming a role forces
        // this match to handle it, so a role can never silently fall through to
        // the wrong destination. This is what previously let an explorer be
        // mis-routed to a page it could not open.
        foreach (UserRole::orderedForLanding() as $role) {
            if ($user->hasRole($role->value)) {
                return $role->homePath($user);
            }
        }

        return '/settings/teams';
    }
}
