<?php

namespace App\Http\Controllers;

use App\Models\CommunityPost;
use App\Models\Hackathon\ProfilKoperasi;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KopdesController extends Controller
{
    public function index(Request $request): Response
    {
        $posts = CommunityPost::with('user:id,name')
            ->latest()
            ->paginate(20);

        $directory = ProfilKoperasi::query()
            ->select(['koperasi_ref', 'nama_koperasi', 'bentuk_koperasi', 'kategori_usaha'])
            ->orderBy('nama_koperasi')
            ->limit(50)
            ->get();

        return Inertia::render('community', [
            'posts' => $posts,
            'directory' => $directory,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'category' => ['sometimes', 'string', 'in:praktik_baik,pertanyaan,insight'],
        ]);

        CommunityPost::create([
            ...$data,
            'user_id' => $request->user()->id,
        ]);

        return back()->with('success', 'Postingan berhasil dibagikan.');
    }

    public function like(Request $request, CommunityPost $post): RedirectResponse
    {
        $post->increment('likes');

        return back();
    }
}
