import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, CalendarDays, Info, Users, Vote } from 'lucide-react';

type VoteOption = 'setuju' | 'tidak_setuju' | 'abstain';

interface RatSession {
    rat_sample_id: string;
    koperasi_ref: string;
    jenis_sektor_koperasi: string | null;
    urutan_rat: string | null;
    tahun_buku: number | null;
    jumlah_peserta_rat: number | null;
    status_rat: string | null;
    tahap_rat: string | null;
    tanggal_rat: string | null;
    agenda: string | null;
}

interface ERatProps {
    sessions: RatSession[];
    results: Record<string, Record<string, number>>;
    myVotes: Record<string, VoteOption>;
}

const OPTIONS: { value: VoteOption; label: string; active: string; idle: string }[] = [
    {
        value: 'setuju',
        label: 'Setuju',
        active: 'bg-emerald-600 text-white border-emerald-600',
        idle: 'border-emerald-300 text-emerald-700 hover:bg-emerald-50',
    },
    {
        value: 'tidak_setuju',
        label: 'Tidak Setuju',
        active: 'bg-rose-600 text-white border-rose-600',
        idle: 'border-rose-300 text-rose-700 hover:bg-rose-50',
    },
    {
        value: 'abstain',
        label: 'Abstain',
        active: 'bg-slate-600 text-white border-slate-600',
        idle: 'border-slate-300 text-slate-700 hover:bg-slate-50',
    },
];

function SessionCard({ session, result, myVote }: { session: RatSession; result: Record<string, number>; myVote?: VoteOption }) {
    const { post, processing, setData } = useForm({
        rat_koperasi_id: session.rat_sample_id,
        pilihan: myVote ?? 'setuju',
    });

    const cast = (option: VoteOption) => {
        setData('pilihan', option);
        post('/e-rat/vote', { preserveScroll: true });
    };

    const total = OPTIONS.reduce((sum, o) => sum + (result[o.value] ?? 0), 0);

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h3 className="text-base font-semibold text-slate-900">{session.koperasi_ref}</h3>
                    <p className="text-sm text-slate-500">
                        {session.jenis_sektor_koperasi} · Buku {session.tahun_buku}
                    </p>
                </div>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                    {session.tahap_rat}
                </span>
            </div>

            {session.agenda ? <p className="mt-3 line-clamp-3 text-sm text-slate-600">{session.agenda}</p> : null}

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {session.jumlah_peserta_rat ?? 0} peserta
                </span>
                {session.tanggal_rat ? (
                    <span className="inline-flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {session.tanggal_rat}
                    </span>
                ) : null}
                <span className="rounded bg-slate-100 px-2 py-0.5">{session.status_rat}</span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
                {OPTIONS.map((o) => {
                    const selected = myVote === o.value;

                    return (
                        <button
                            key={o.value}
                            type="button"
                            disabled={processing}
                            onClick={() => cast(o.value)}
                            className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${selected ? o.active : o.idle}`}
                        >
                            {o.label}
                        </button>
                    );
                })}
            </div>

            <div className="mt-4">
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Hasil sementara ({total} suara)
                </p>
                <div className="space-y-1.5">
                    {OPTIONS.map((o) => {
                        const count = result[o.value] ?? 0;
                        const pct = total > 0 ? Math.round((count / total) * 100) : 0;

                        return (
                            <div key={o.value} className="flex items-center gap-2">
                                <span className="w-24 shrink-0 text-xs text-slate-500">{o.label}</span>
                                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                                    <div
                                        className={`h-full ${
                                            o.value === 'setuju'
                                                ? 'bg-emerald-500'
                                                : o.value === 'tidak_setuju'
                                                  ? 'bg-rose-500'
                                                  : 'bg-slate-400'
                                        }`}
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                                <span className="w-10 text-right text-xs font-medium text-slate-700">{count}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default function ERat({ sessions, results, myVotes }: ERatProps) {
    const sessionResults = (id: string): Record<string, number> => results[id] ?? {};

    return (
        <div className="min-h-screen bg-slate-50">
            <Head title="e-RAT Digital | KOPERA-PLUS" />

            <div className="mx-auto max-w-3xl px-4 py-8">
                <Link
                    href="/dashboard"
                    className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Dashboard
                </Link>

                <header className="mb-6">
                    <div className="flex items-center gap-2 text-indigo-700">
                        <Vote className="h-6 w-6" />
                        <h1 className="text-2xl font-bold text-slate-900">e-RAT Digital</h1>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                        Fasilitasi partisipasi RAT: sampaikan preferensi Anda pada agenda yang divotasi.
                    </p>
                </header>

                <div className="mb-6 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                    <Info className="mt-0.5 h-4 w-4 shrink-0" />
                    <p>
                        e-RAT adalah alat bantu (facilitation) untuk mencatat preferensi anggota. Hasil ini
                        bersifat pendamping dan tidak menggantikan keputusan RAT formal tatap muka.
                    </p>
                </div>

                {sessions.length === 0 ? (
                    <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
                        Belum ada sesi RAT yang tersedia.
                    </p>
                ) : (
                    <div className="space-y-4">
                        {sessions.map((session) => (
                            <SessionCard
                                key={session.rat_sample_id}
                                session={session}
                                result={sessionResults(session.rat_sample_id)}
                                myVote={myVotes[session.rat_sample_id]}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
