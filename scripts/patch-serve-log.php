<?php

// Re-applies the silent-stdout patch to Laravel's built-in dev server router
// after `composer update` overwrites vendor/. This keeps `php artisan serve`
// quiet when the client closes the connection early (broken pipe / errno 32),
// without editing tracked code.
//
// ponytail: if Laravel changes server.php's logging line, the guarded str_replace
// below will stop matching and exit(1) loudly instead of silently failing.
$path = __DIR__.'/../vendor/laravel/framework/src/Illuminate/Foundation/resources/server.php';

if (! file_exists($path)) {
    fwrite(STDERR, "server.php not found; skipping patch.\n");

    exit(0);
}

$code = file_get_contents($path);

$search = "file_put_contents('php://stdout'";
$replace = '@file_put_contents(\'php://stdout\'';

if (str_contains($code, $replace)) {
    echo "server.php already patched; nothing to do.\n";

    exit(0);
}

if (! str_contains($code, $search)) {
    fwrite(STDERR, "Expected logging line not found in server.php; vendor layout may have changed. Skipping.\n");

    exit(1);
}

$code = str_replace($search, $replace, $code);

file_put_contents($path, $code);

echo "Patched server.php to silence broken-pipe stdout notice.\n";
