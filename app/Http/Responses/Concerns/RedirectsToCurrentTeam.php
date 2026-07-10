<?php

namespace App\Http\Responses\Concerns;

use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\URL;

trait RedirectsToCurrentTeam
{
    protected function redirectPathForCurrentTeam(Request $request, string $redirect): string
    {
        $user = $request->user();

        abort_if(! $user, 403);

        return match (true) {
            $user->hasRole('administrator') => '/admin-dashboard',
            $user->hasRole('explorer') => '/explorer-dashboard',
            default => $this->memberDashboardPath($user),
        };
    }

    protected function memberDashboardPath($user): string
    {
        $team = $user->personalTeam() ?? $user->currentTeam;

        abort_if(! $team, 403);

        URL::defaults(['current_team' => $team->slug]);

        return '/'.$team->slug.'/dashboard';
    }
}
