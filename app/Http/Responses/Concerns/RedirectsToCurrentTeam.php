<?php

namespace App\Http\Responses\Concerns;

use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

trait RedirectsToCurrentTeam
{
    protected function redirectPathForCurrentTeam(Request $request, string $redirect): string
    {
        $user = $request->user();

        // Guests can never reach a post-authentication response; don't 403.
        if (! $user) {
            return '/';
        }

        if ($user->hasRole('administrator')) {
            return '/admin-dashboard';
        }

        if ($user->hasRole('explorer')) {
            return '/explorer-dashboard';
        }

        // Members land on their team dashboard. Anyone without a platform role
        // yet (or without a team) is sent to the teams screen instead of a hard
        // 403 — they can create or join a team from there.
        if ($user->hasRole('member')) {
            $team = $user->personalTeam() ?? $user->currentTeam;

            if ($team) {
                URL::defaults(['current_team' => $team->slug]);

                return '/'.$team->slug.'/dashboard';
            }
        }

        return '/settings/teams';
    }
}
