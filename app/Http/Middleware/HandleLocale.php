<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HandleLocale
{
    /**
     * @var array<int, string>
     */
    private array $supportedLocales = ['id', 'en'];

    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $queryLocale = $request->query('lang');

        if (is_string($queryLocale) && in_array($queryLocale, $this->supportedLocales, true)) {
            $request->session()->put('locale', $queryLocale);
        }

        $locale = $request->session()->get('locale');

        if (! is_string($locale) || ! in_array($locale, $this->supportedLocales, true)) {
            $locale = config('app.locale', 'id');
        }

        app()->setLocale($locale);

        return $next($request);
    }
}
