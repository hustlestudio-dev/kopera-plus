<?php

namespace App\Http\Controllers;

use App\Models\Hackathon\ERatVote;
use App\Models\Hackathon\RatKoperasi;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ERatController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $sessions = RatKoperasi::query()
            ->orderByDesc('tahun_buku')
            ->orderBy('koperasi_ref')
            ->limit(100)
            ->get()
            ->map(fn (RatKoperasi $rat) => [
                'rat_sample_id' => $rat->rat_sample_id,
                'koperasi_ref' => $rat->koperasi_ref,
                'jenis_sektor_koperasi' => $rat->jenis_sektor_koperasi,
                'urutan_rat' => $rat->urutan_rat,
                'tahun_buku' => $rat->tahun_buku,
                'jumlah_peserta_rat' => $rat->jumlah_peserta_rat,
                'status_rat' => $rat->status_rat,
                'tahap_rat' => $rat->tahap_rat,
                'tanggal_rat' => $rat->tanggal_rat?->toDateString(),
                'agenda' => Str::limit(strip_tags((string) ($rat->laporan_posisi_keuangan ?? '')), 160),
            ]);

        $ratIds = $sessions->pluck('rat_sample_id')->all();

        $results = ERatVote::query()
            ->whereIn('rat_koperasi_id', $ratIds)
            ->select('rat_koperasi_id', 'pilihan', DB::raw('count(*) as total'))
            ->groupBy('rat_koperasi_id', 'pilihan')
            ->get()
            ->groupBy('rat_koperasi_id')
            ->map(fn ($rows) => $rows->pluck('total', 'pilihan')->toArray())
            ->toArray();

        $myVotes = $user
            ? ERatVote::query()
                ->where('user_id', $user->id)
                ->whereIn('rat_koperasi_id', $ratIds)
                ->pluck('pilihan', 'rat_koperasi_id')
                ->toArray()
            : [];

        return Inertia::render('e-rat', [
            'sessions' => $sessions,
            'results' => $results,
            'myVotes' => $myVotes,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'rat_koperasi_id' => ['required', 'string', Rule::exists('rat_koperasi', 'rat_sample_id')],
            'pilihan' => ['required', 'string', Rule::in(['setuju', 'tidak_setuju', 'abstain'])],
        ]);

        ERatVote::updateOrCreate(
            ['rat_koperasi_id' => $data['rat_koperasi_id'], 'user_id' => $request->user()->id],
            ['pilihan' => $data['pilihan']],
        );

        return back()->with('success', 'Suara Anda telah tercatat. Terima kasih telah berpartisipasi.');
    }
}
