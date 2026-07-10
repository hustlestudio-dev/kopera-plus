<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Abort unless the authenticated user has one of the given spatie roles.
 *
 * Usage: ->middleware('role:administrator') (provided by spatie/laravel-permission)
 * or by applying this middleware directly with the role names as arguments.
 *
 * ponytail: spatie's `role:` middleware already covers the common cases in
 * routes/web.php; this class is kept for programmatic/inline checks and can be
 * removed once every guard is expressed as a route middleware.
 */
class EnsureUserRole
{
    /**
     * @param  array<int, string>  $roles
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = $request->user();

        if (! $user || ! $user->hasAnyRole($roles)) {
            abort(403);
        }

        return $next($request);
    }
}
