<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AiDemoController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $cooperative = DB::table('cooperatives')
            ->orderBy('id')
            ->first();

        $products = $cooperative
            ? DB::table('products')->where('cooperative_id', $cooperative->id)->orderBy('name')->get()
            : collect();

        $agenda = $cooperative
            ? DB::table('rat_agendas')->where('cooperative_id', $cooperative->id)->orderBy('scheduled_at')->first()
            : null;

        $posts = $cooperative
            ? DB::table('community_posts')->where('cooperative_id', $cooperative->id)->latest()->get()
            : collect();

        $points = $cooperative
            ? DB::table('points_ledger')->where('cooperative_id', $cooperative->id)->sum('points')
            : 0;

        return Inertia::render('ai-demo', [
            'cooperative' => $cooperative,
            'products' => $products,
            'agenda' => $agenda,
            'posts' => $posts,
            'points' => $points,
        ]);
    }
}
