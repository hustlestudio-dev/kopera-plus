import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Award,
    FileText,
    Gift,
    MessageSquare,
    ShoppingCart,
    Star,
    Target,
    Trophy,
    UserPlus,
    Users,
    Vote,
} from 'lucide-react';

interface LoyaltyData {
    points: number;
    tier: string;
    next_tier: string | null;
    progress: number;
}

interface BadgeItem {
    id: number;
    name: string;
    slug: string;
    description: string | null;
}

interface RewardsProps {
    loyalty: LoyaltyData;
    badges: BadgeItem[];
}

const TIER_STYLES: Record<string, { gradient: string; ring: string; icon: string }> = {
    Bronze: {
        gradient: 'from-amber-50 to-orange-50',
        ring: 'ring-amber-300',
        icon: 'text-amber-700',
    },
    Silver: {
        gradient: 'from-slate-50 to-gray-100',
        ring: 'ring-slate-300',
        icon: 'text-slate-700',
    },
    Gold: {
        gradient: 'from-yellow-50 to-amber-50',
        ring: 'ring-yellow-300',
        icon: 'text-yellow-700',
    },
    Platinum: {
        gradient: 'from-blue-50 to-indigo-50',
        ring: 'ring-blue-300',
        icon: 'text-blue-700',
    },
    'Village Hero': {
        gradient: 'from-purple-50 to-violet-50',
        ring: 'ring-purple-300',
        icon: 'text-purple-700',
    },
};

const EARN_GUIDE = [
    { icon: ShoppingCart, label: 'Transaksi pembelian', points: '+10 poin' },
    { icon: Vote, label: 'Mengikuti RAT', points: '+50 poin' },
    { icon: UserPlus, label: 'Mengajak anggota baru', points: '+100 poin' },
    { icon: FileText, label: 'Melengkapi profil', points: '+25 poin' },
    { icon: MessageSquare, label: 'Posting di komunitas', points: '+5 poin' },
];

function TierIcon({ tier }: { tier: string }) {
    if (tier === 'Village Hero') return <Trophy className="h-8 w-8" />;
    if (tier === 'Platinum') return <Star className="h-8 w-8" />;
    if (tier === 'Gold') return <Award className="h-8 w-8" />;
    return <Gift className="h-8 w-8" />;
}

export default function Rewards({ loyalty, badges }: RewardsProps) {
    const tierStyle = TIER_STYLES[loyalty.tier] ?? TIER_STYLES.Bronze;

    return (
        <div className="min-h-screen bg-slate-50">
            <Head title="Poin & Hadiah | KOPERA-PLUS" />

            <div className="mx-auto max-w-4xl px-4 py-8">
                <Link
                    href="/dashboard"
                    className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Dashboard
                </Link>

                <header className="mb-8">
                    <div className="flex items-center gap-2 text-indigo-700">
                        <Gift className="h-6 w-6" />
                        <h1 className="text-2xl font-bold text-slate-900">Poin & Hadiah</h1>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                        Kumpulkan poin dari aktivitas Anda dan tukarkan dengan hadiah menarik.
                    </p>
                </header>

                <div className={`mb-8 rounded-2xl bg-gradient-to-br p-6 ring-1 shadow-sm ${tierStyle.gradient} ${tierStyle.ring}`}>
                    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                        <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-white/80 shadow-sm ${tierStyle.icon}`}>
                            <TierIcon tier={loyalty.tier} />
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Status Saat Ini</p>
                            <h2 className="mt-1 text-2xl font-bold text-slate-900">{loyalty.tier}</h2>
                            <p className="mt-2 text-3xl font-black text-indigo-700">{loyalty.points.toLocaleString()} Poin</p>

                            {loyalty.next_tier && (
                                <div className="mt-4">
                                    <div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-600">
                                        <span>Progress ke {loyalty.next_tier}</span>
                                        <span>{loyalty.progress}%</span>
                                    </div>
                                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/60">
                                        <div
                                            className="h-full rounded-full bg-indigo-600 transition-all duration-500"
                                            style={{ width: `${loyalty.progress}%` }}
                                        />
                                    </div>
                                    <p className="mt-1.5 text-xs text-slate-500">
                                        Terus kumpulkan poin untuk naik ke tier {loyalty.next_tier}.
                                    </p>
                                </div>
                            )}

                            {!loyalty.next_tier && (
                                <p className="mt-2 text-xs font-medium text-emerald-700">
                                    Anda telah mencapai tier tertinggi!
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <section className="mb-8">
                    <div className="mb-4 flex items-center gap-2">
                        <Award className="h-5 w-5 text-slate-700" />
                        <h2 className="text-lg font-bold text-slate-900">Koleksi Badge</h2>
                    </div>

                    {badges.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                            <Target className="mx-auto h-10 w-10 text-slate-300" />
                            <p className="mt-3 text-sm font-medium text-slate-500">
                                Belum ada badge. Selesaikan aktivitas untuk mendapatkan badge!
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {badges.map((badge) => (
                                <div
                                    key={badge.id}
                                    className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                                >
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                        <Award className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900">{badge.name}</h3>
                                        {badge.description && (
                                            <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{badge.description}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section>
                    <div className="mb-4 flex items-center gap-2">
                        <Star className="h-5 w-5 text-slate-700" />
                        <h2 className="text-lg font-bold text-slate-900">Cara Mendapatkan Poin</h2>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <ul className="divide-y divide-slate-100">
                            {EARN_GUIDE.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <li key={item.label} className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                                            <Icon className="h-4.5 w-4.5" />
                                        </div>
                                        <span className="flex-1 text-sm text-slate-700">{item.label}</span>
                                        <span className="text-sm font-bold text-indigo-700">{item.points}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}
