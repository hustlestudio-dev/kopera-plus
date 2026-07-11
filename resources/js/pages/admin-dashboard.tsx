import { Head, Link } from '@inertiajs/react';
import {
    Search,
    Brain,
    AlertCircle,
    Activity,
    ShieldCheck,
    HelpCircle,
    Bell,
    MessageSquare,
    ChevronRight,
    LogOut,
} from 'lucide-react';
import React, { useState } from 'react';
import PrototypeHud from '@/components/PrototypeHud';

interface KPIItem {
    label: string;
    value: string;
    change: string;
    positive: boolean;
    data: number[];
}

interface RecItem {
    type: 'Kritis' | 'Inventaris';
    confidence: string;
    title: string;
    desc: string;
    recommendation: string;
}

interface KPIShape {
    total_koperasi: number;
    total_anggota: number;
    total_simpanan: number;
    total_pendapatan: number;
    total_produk: number;
    total_gerai: number;
    total_rat: number;
    latest_rat_tahun_buku: number;
}

interface RatParticipationItem {
    status_rat: string;
    tahap_rat: string;
    jumlah_rat: number;
    total_peserta: number | null;
    rata_peserta: number | null;
}

interface AdminDashboardProps {
    kpis?: KPIShape | null;
    ratParticipation?: RatParticipationItem[];
}

export default function AdminDashboard({ kpis = null }: AdminDashboardProps) {
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 3000);
    };

    const formatRupiah = (value: number): string =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(value);

    const formatNumber = (value: number): string =>
        new Intl.NumberFormat('id-ID').format(value);

    const kpiCards: KPIItem[] = [
        {
            label: 'Total Koperasi',
            value: formatNumber(kpis?.total_koperasi ?? 0),
            change: '',
            positive: true,
            data: [],
        },
        {
            label: 'Total Anggota',
            value: formatNumber(kpis?.total_anggota ?? 0),
            change: '',
            positive: true,
            data: [],
        },
        {
            label: 'Total Simpanan',
            value: formatRupiah(kpis?.total_simpanan ?? 0),
            change: '',
            positive: true,
            data: [],
        },
        {
            label: 'Total Pendapatan',
            value: formatRupiah(kpis?.total_pendapatan ?? 0),
            change: '',
            positive: true,
            data: [],
        },
        {
            label: 'Total Produk',
            value: formatNumber(kpis?.total_produk ?? 0),
            change: '',
            positive: true,
            data: [],
        },
        {
            label: 'Total Gerai',
            value: formatNumber(kpis?.total_gerai ?? 0),
            change: '',
            positive: true,
            data: [],
        },
        {
            label: 'Total RAT',
            value: formatNumber(kpis?.total_rat ?? 0),
            change: '',
            positive: true,
            data: [],
        },
        {
            label: 'Tahun Buku RAT Terbaru',
            value: String(kpis?.latest_rat_tahun_buku ?? '-'),
            change: '',
            positive: true,
            data: [],
        },
    ];

    const recommendations: RecItem[] = [
        {
            type: 'Kritis',
            confidence: 'Kepercayaan 94%',
            title: 'Keterlibatan anggota usia 18-25 menurun',
            desc: 'Data menunjukkan penurunan 15% volume transaksi untuk segmen Gen-Z selama 3 bulan terakhir. Keterlibatan terhadap layanan digital stagnan.',
            recommendation:
                'Luncurkan workshop keterampilan digital untuk wirausaha muda minggu depan.',
        },
        {
            type: 'Inventaris',
            confidence: 'Kepercayaan 88%',
            title: 'Diprediksi Kekurangan Pasokan Pupuk',
            desc: 'Permintaan regional meningkat tajam. Stok saat ini akan habis dalam 12 hari berdasarkan pola pembelian prediktif anggota petani.',
            recommendation:
                'Lakukan restock +30% dengan pesanan segera untuk mengunci harga grosir saat ini.',
        },
    ];

    return (
        <>
            <Head title="Kopilot Bisnis AI | KOPERA-PLUS" />

            <div className="flex min-h-screen bg-[#f8f9ff] font-sans text-[#0b1c30] antialiased">
                {/* SideNavBar */}
                <aside className="fixed top-0 left-0 z-50 flex h-screen w-72 flex-col border-r border-zinc-200/80 bg-white shadow-sm">
                    <div className="flex h-full flex-col justify-between py-8">
                        <div>
                            <div className="mb-8 px-8">
                                <div className="flex items-center gap-3">
                                    <div className="ai-gradient-bg flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-lg">
                                        <span className="material-symbols-outlined">
                                            analytics
                                        </span>
                                    </div>
                                    <div>
                                        <h1 className="text-base leading-none font-extrabold text-primary">
                                            KOPERA-PLUS
                                        </h1>
                                        <p className="mt-1 text-[10px] font-bold text-zinc-400 uppercase">
                                            AI Business Copilot
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <nav className="space-y-1 px-4">
                                <Link
                                    className="flex items-center gap-3 rounded-xl bg-primary/5 px-4 py-3 text-sm font-bold text-primary"
                                    href="/admin-dashboard"
                                >
                                    <span className="material-symbols-outlined">
                                        dashboard
                                    </span>
                                    <span>Dashboard</span>
                                </Link>
                                <Link
                                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-600 transition-colors hover:bg-slate-50"
                                    href="/workspace"
                                >
                                    <span className="material-symbols-outlined">
                                        widgets
                                    </span>
                                    <span>Workspace</span>
                                </Link>
                                <Link
                                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-600 transition-colors hover:bg-slate-50"
                                    href="/assistant"
                                >
                                    <span className="material-symbols-outlined">
                                        smart_toy
                                    </span>
                                    <span>Asisten AI</span>
                                </Link>
                                <p className="px-4 pt-5 pb-1 text-[10px] font-bold tracking-wide text-zinc-400 uppercase">
                                    Segera Hadir
                                </p>
                                <span
                                    className="flex cursor-not-allowed items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-300"
                                    title="Segera Hadir"
                                >
                                    <span className="material-symbols-outlined">
                                        widgets
                                    </span>
                                    <span>Inventaris</span>
                                </span>
                                <span
                                    className="flex cursor-not-allowed items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-300"
                                    title="Segera Hadir"
                                >
                                    <span className="material-symbols-outlined">
                                        receipt_long
                                    </span>
                                    <span>Transaksi</span>
                                </span>
                                <span
                                    className="flex cursor-not-allowed items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-300"
                                    title="Segera Hadir"
                                >
                                    <span className="material-symbols-outlined">
                                        military_tech
                                    </span>
                                    <span>Hadiah</span>
                                </span>
                                <span
                                    className="flex cursor-not-allowed items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-300"
                                    title="Segera Hadir"
                                >
                                    <span className="material-symbols-outlined">
                                        forum
                                    </span>
                                    <span>Komunitas</span>
                                </span>
                                <span
                                    className="flex cursor-not-allowed items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-300"
                                    title="Segera Hadir"
                                >
                                    <span className="material-symbols-outlined">
                                        analytics
                                    </span>
                                    <span>Digital RAT</span>
                                </span>
                                <span
                                    className="flex cursor-not-allowed items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-300"
                                    title="Segera Hadir"
                                >
                                    <span className="material-symbols-outlined">
                                        assessment
                                    </span>
                                    <span>Laporan</span>
                                </span>
                                <span
                                    className="flex cursor-not-allowed items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-300"
                                    title="Segera Hadir"
                                >
                                    <span className="material-symbols-outlined">
                                        psychology
                                    </span>
                                    <span>AI Insight</span>
                                </span>
                            </nav>
                        </div>

                        <div className="space-y-1 px-4">
                            <Link
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-zinc-600 hover:bg-slate-50"
                                href="/settings/profile"
                            >
                                <span className="material-symbols-outlined">
                                    settings
                                </span>
                                <span>Pengaturan</span>
                            </Link>
                            <span
                                className="flex cursor-not-allowed items-center gap-3 rounded-xl px-4 py-3 text-sm text-zinc-300"
                                title="Segera Hadir"
                            >
                                <HelpCircle className="h-4 w-4 text-zinc-300" />
                                <span>Pusat Bantuan</span>
                            </span>
                            <Link
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-600 transition-colors hover:bg-slate-50"
                                href="/logout"
                                method="post"
                                as="button"
                            >
                                <LogOut className="h-4 w-4 text-zinc-400" />
                                <span>Keluar</span>
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* Main Wrapper */}
                <div className="ml-72 flex min-h-screen flex-grow flex-col bg-slate-50">
                    {/* TopNavBar */}
                    <header className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-zinc-200/50 bg-white/80 px-8 py-4 backdrop-blur-md">
                        <div className="flex flex-1 items-center gap-6">
                            <div className="relative w-full max-w-md">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                                <input
                                    className="w-full rounded-full border-none bg-slate-100 py-2 pr-4 pl-10 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="Cari insight, anggota, atau produk..."
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                className="ai-gradient-bg flex items-center gap-2 rounded-full px-6 py-2.5 font-label-md text-sm font-semibold text-white shadow-md transition-all hover:opacity-95 active:scale-95"
                                onClick={() =>
                                    showToast(
                                        'AI Insight analysis re-triggered.',
                                    )
                                }
                            >
                                <Brain className="h-4 w-4" />
                                Insight AI
                            </button>
                            <div className="ml-2 flex items-center gap-2 border-l border-zinc-200 pl-4">
                                <button className="relative rounded-full p-2 text-zinc-600 transition-colors hover:bg-slate-100">
                                    <Bell className="h-5 w-5" />
                                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
                                </button>
                                <button className="rounded-full p-2 text-zinc-600 transition-colors hover:bg-slate-100">
                                    <MessageSquare className="h-5 w-5" />
                                </button>
                                <div className="ml-2 flex cursor-pointer items-center gap-3 rounded-full border border-zinc-100 p-1.5 pr-4 transition-colors hover:bg-slate-50">
                                    <img
                                        className="h-8 w-8 rounded-full object-cover shadow-sm"
                                        alt="Admin headshot"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuARx0ZRsnatRWN-N-W0mKEFT_a9DNWdqxfrKvRTnP9FpbspJlyAfun2eDqrjtBhmJxbmUhG8ix9uzzNE37Gy65YTE9DDUykawdaqn5x-0walk6FwZ-nx_JkQzfb_F-k4Cd_s4V9-84EYijk932BdXYGto3PIYdFTcKZFyO9WkQOUm5-B3d75jDakXw0x6cecQrP3KEw8zQeCUPdu-dTr8_Iz0LFLrnjuwAN0KAl5xzAcScougc-yN5e040RgoGzvzwseeKcULR_I_8"
                                    />
                                    <div className="hidden lg:block">
                                        <p className="text-xs leading-none font-bold">
                                            Admin User
                                        </p>
                                        <p className="mt-0.5 text-[10px] font-bold text-zinc-400">
                                            Super Administrator
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="mx-auto w-full max-w-[1600px] flex-grow space-y-8 p-8">
                        {/* Hero Section */}
                        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            <div className="bento-card relative flex min-h-[240px] flex-col justify-between overflow-hidden bg-zinc-950 p-8 text-white shadow-xl lg:col-span-2">
                                <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"></div>
                                <div className="relative z-10">
                                    <h2 className="font-display-sm mb-2 text-2xl font-bold">
                                        Selamat Pagi, Admin 👋
                                    </h2>
                                    <p className="max-w-lg text-sm opacity-80">
                                        Berikut insight koperasi Anda yang
                                        dihasilkan AI hari ini. Kami mendeteksi
                                        3 area prioritas tinggi yang membutuhkan
                                        perhatian Anda.
                                    </p>
                                </div>
                                <div className="relative z-10 mt-6 flex gap-4">
                                    <button
                                        className="hover:bg-opacity-95 rounded-xl bg-primary px-8 py-3 font-label-md text-xs font-bold text-white transition-all"
                                        onClick={() =>
                                            showToast(
                                                'Showing priority recommendations...',
                                            )
                                        }
                                    >
                                        Lihat Rekomendasi
                                    </button>
                                    <button
                                        className="rounded-xl border border-white/20 bg-white/10 px-8 py-3 font-label-md text-xs font-bold text-white transition-all hover:bg-white/20"
                                        onClick={() =>
                                            showToast(
                                                'Report compiled and downloaded.',
                                            )
                                        }
                                    >
                                        Unduh Laporan
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-rows-2 gap-4">
                                <div className="bento-card flex items-start gap-4 border border-zinc-100 p-6 shadow-sm">
                                    <div className="shrink-0 rounded-xl bg-red-50 p-3 text-red-500">
                                        <AlertCircle className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="mb-1 text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                                            Peringatan Inventaris
                                        </p>
                                        <p className="font-headline-sm text-sm font-bold">
                                            Inventaris menipis: 12 SKU
                                        </p>
                                        <p className="mt-1 text-xs text-zinc-500">
                                            Disarankan restock dalam 48 jam.
                                        </p>
                                    </div>
                                </div>
                                <div className="bento-card flex items-start gap-4 border border-zinc-100 p-6 shadow-sm">
                                    <div className="shrink-0 rounded-xl bg-blue-50 p-3 text-blue-500">
                                        <Activity className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="mb-1 text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                                            Peringatan Retensi
                                        </p>
                                        <p className="font-headline-sm text-sm font-bold">
                                            Partisipasi turun 8%
                                        </p>
                                        <p className="mt-1 text-xs text-zinc-500">
                                            Segmen anak muda menunjukkan
                                            inaktivitas.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* KPI Bento Grid */}
                        <section className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                            {kpiCards.map((kpi, kIdx) => (
                                <div
                                    key={kIdx}
                                    className="bento-card flex flex-col justify-between border border-zinc-100 p-6 shadow-sm"
                                >
                                    <div>
                                        <p className="text-xs font-semibold text-zinc-400">
                                            {kpi.label}
                                        </p>
                                        <p className="mt-2 font-headline-md text-2xl font-bold text-zinc-900">
                                            {kpi.value}
                                        </p>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span
                                            className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                                                kpi.positive
                                                    ? 'bg-emerald-50 text-emerald-700'
                                                    : 'bg-red-50 text-red-700'
                                            }`}
                                        >
                                            {kpi.change}
                                        </span>
                                        <div className="flex h-8 w-16 items-end gap-[2px] px-1 pb-1">
                                            {kpi.data.map((h, hIdx) => (
                                                <div
                                                    key={hIdx}
                                                    className={`flex-1 rounded-sm ${
                                                        kpi.positive
                                                            ? hIdx ===
                                                              kpi.data.length -
                                                                  1
                                                                ? 'bg-emerald-500'
                                                                : 'bg-emerald-200'
                                                            : hIdx ===
                                                                kpi.data
                                                                    .length -
                                                                    1
                                                              ? 'bg-red-500'
                                                              : 'bg-red-200'
                                                    }`}
                                                    style={{
                                                        height: `${h * 12}px`,
                                                    }}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>

                        {/* AI Insight Bento Grid */}
                        <section className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                            {/* AI Insight Main Card */}
                            <div className="bento-card border border-zinc-100 p-8 shadow-sm lg:col-span-8">
                                <div className="mb-8 flex items-center justify-between border-b border-zinc-100 pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="shrink-0 rounded-xl bg-blue-50 p-3 text-[#004ac6]">
                                            <Brain className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-headline-md text-lg font-bold">
                                            Rekomendasi Strategis AI
                                        </h3>
                                    </div>
                                    <span className="text-xs text-zinc-400 italic">
                                        Dibuat 14 menit lalu
                                    </span>
                                </div>

                                <div className="space-y-6">
                                    {recommendations.map((rec, rIdx) => (
                                        <div
                                            key={rIdx}
                                            className="group cursor-pointer rounded-2xl border border-zinc-200/50 bg-slate-50 p-6 transition-colors hover:border-blue-300"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-grow">
                                                    <div className="mb-2 flex items-center gap-2">
                                                        <span
                                                            className={`rounded px-2 py-0.5 text-[9px] font-extrabold uppercase ${
                                                                rec.type ===
                                                                'Kritis'
                                                                    ? 'bg-red-100 text-red-700'
                                                                    : 'bg-blue-100 text-blue-700'
                                                            }`}
                                                        >
                                                            {rec.type}
                                                        </span>
                                                        <span className="text-xs font-bold text-blue-700">
                                                            {rec.confidence}
                                                        </span>
                                                    </div>
                                                    <h4 className="mb-2 font-headline-sm text-sm font-bold text-zinc-950">
                                                        {rec.title}
                                                    </h4>
                                                    <p className="text-xs leading-relaxed text-zinc-500">
                                                        {rec.desc}
                                                    </p>
                                                    <div className="mt-4 flex items-center gap-2 rounded-lg border border-blue-100/50 bg-blue-50 p-2.5 text-xs font-semibold text-blue-700">
                                                        <span className="material-symbols-outlined text-[16px]">
                                                            lightbulb
                                                        </span>
                                                        <p>
                                                            {rec.recommendation}
                                                        </p>
                                                    </div>
                                                </div>
                                                <ChevronRight className="h-5 w-5 text-zinc-400 transition-colors group-hover:text-blue-600" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Secondary Bento Column */}
                            <div className="space-y-6 lg:col-span-4">
                                <div className="bento-card flex h-full flex-col justify-between border border-zinc-100 p-6 shadow-sm">
                                    <div>
                                        <h3 className="mb-6 font-headline-sm text-sm font-bold">
                                            Status Inventaris
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 rounded-xl border border-zinc-100 bg-white p-3 text-xs transition-colors hover:bg-slate-50">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                                                    <img
                                                        className="h-full w-full object-cover"
                                                        alt="Fertilizer bag"
                                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnx6yfR_zcnBAwES0Dq469-dV7nI3xjEvOLe92SxGsnnkrPRBrhiihfHMqsNTe_b6qDFkKXW6FfRKtsW1qu6CdQmMoojSU9-KcvgQsEPUdwYqjyTgFUfkuEuSiiBmd-Y_3hqS9am_qUQW-R4g0qUl6AbBpAgS8LuGIOV0lVGkpYZFdcjziGIVrR_AwIEnqsPO6hcWUEQKiieVe8_oSaqW70I2bJhwmxeuwFjcU1GnIrSRxtpTzK4FkKACVnWMWDvpxZxU0v7D61ls"
                                                    />
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-bold">
                                                        Organic Fertilizer A
                                                    </p>
                                                    <p className="mt-0.5 text-[10px] text-zinc-400">
                                                        Stock: 42 Units
                                                    </p>
                                                </div>
                                                <span className="text-[10px] font-bold text-red-500">
                                                    Reorder
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 rounded-xl border border-zinc-100 bg-white p-3 text-xs transition-colors hover:bg-slate-50">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                                                    <img
                                                        className="h-full w-full object-cover"
                                                        alt="Corn seeds"
                                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsYOmeliWVZk5oFfWaKWwDvuiECyNZebak7wo-SXm1369wt5u-v7M6KCowRKP5N09EV9Mxb59xEltTTmU4ZnuMEwG5rmvDa3tvB3NJOrSt05ji7dT9CFxEDZmNEiMnQW9N7nMBY441Fk9NPbLMEOy50uUS0StuTFNOXp5vBPMIPP7dAL9M5aDRuSs6P6uB136w9CxLH6ENdcwU99PIKnlPcM0_QdVpXdAuwJ9G4hGYqY_kQH15_nvVD3Jq9AhHukUpATiuL6UzsvM"
                                                    />
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-bold">
                                                        Hybrid Corn Seeds
                                                    </p>
                                                    <p className="mt-0.5 text-[10px] text-zinc-400">
                                                        Stock: 124 Units
                                                    </p>
                                                </div>
                                                <span className="text-[10px] font-bold text-emerald-600">
                                                    Stable
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 rounded-xl border border-zinc-100 bg-white p-3 text-xs transition-colors hover:bg-slate-50">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                                                    <img
                                                        className="h-full w-full object-cover"
                                                        alt="Moisture sensors"
                                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdOto96PurXodu2fn9Egv--X32-hIdQ2PYwHZXDmxhJ4GBizbUGgfZKz5VB0vjNl51WToWewDzyfcb-0Xd8Y_5kEhUFcaQBZ0gpv_iwNZBkIcOAE4lvOgvRadR_Agkw4qR5l7E0XgtGBB2CKtF50qaeQdiKC4pRY4VzZ7EdstO9z_VUMpLllxIvNUpWm3oo4Db12kvU3dw_9EOGynebW48jkGl5jiyPkSvaz0MCjyQdkB3lKKjI-rYVJc1nSMtGL-uJq0IK7XZVug"
                                                    />
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-bold">
                                                        Moisture Sensors v2
                                                    </p>
                                                    <p className="mt-0.5 text-[10px] text-zinc-400">
                                                        Stock: 18 Units
                                                    </p>
                                                </div>
                                                <span className="text-[10px] font-bold text-red-500">
                                                    Reorder
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="mt-6 w-full rounded-xl border border-zinc-200 py-3 text-xs font-bold text-zinc-700 transition-colors hover:bg-slate-50"
                                        onClick={() =>
                                            showToast(
                                                'Redirecting to full inventory view...',
                                            )
                                        }
                                    >
                                        Lihat Semua Inventaris
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Bottom Section: Transactions & Performance */}
                        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            <div className="bento-card border border-zinc-100 p-8 shadow-sm lg:col-span-2">
                                <div className="mb-8 flex items-center justify-between">
                                    <h3 className="font-headline-md text-base font-bold">
                                        Tren Pendapatan & Partisipasi
                                    </h3>
                                </div>
                                <div className="flex h-64 items-end gap-4 border-b border-zinc-100 px-4 pt-4 pb-2">
                                    {/* Simulated Chart */}
                                    {[
                                        'Mon',
                                        'Tue',
                                        'Wed',
                                        'Thu',
                                        'Fri',
                                        'Sat',
                                        'Sun',
                                    ].map((day, dIdx) => {
                                        const heights = [
                                            40, 65, 55, 85, 45, 30, 20,
                                        ];

                                        return (
                                            <div
                                                key={dIdx}
                                                className="group flex flex-1 flex-col items-center gap-2"
                                            >
                                                <div
                                                    className={`w-full rounded-t-md transition-all duration-300 ${
                                                        day === 'Thu'
                                                            ? 'bg-primary shadow-lg shadow-blue-500/20'
                                                            : 'bg-primary/20 group-hover:bg-primary/35'
                                                    }`}
                                                    style={{
                                                        height: `${heights[dIdx]}%`,
                                                    }}
                                                ></div>
                                                <span
                                                    className={`text-[10px] ${day === 'Thu' ? 'font-bold text-primary' : 'text-zinc-400'}`}
                                                >
                                                    {day}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="bento-card relative bg-zinc-900 p-8 text-white shadow-lg">
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent opacity-10"></div>
                                <div className="relative z-10 flex h-full flex-col justify-between">
                                    <div>
                                        <h3 className="mb-2 font-headline-md text-base font-bold">
                                            Target Pertumbuhan Anggota
                                        </h3>
                                        <p className="text-xs opacity-75">
                                            Di jalur yang tepat untuk mencapai
                                            target kuartalan 5.000 anggota.
                                        </p>
                                    </div>
                                    <div className="flex flex-grow items-center justify-center py-6">
                                        <div className="relative flex h-32 w-32 shrink-0 items-center justify-center">
                                            <svg className="h-full w-full -rotate-90 transform">
                                                <circle
                                                    className="text-white/10"
                                                    cx="64"
                                                    cy="64"
                                                    fill="transparent"
                                                    r="58"
                                                    stroke="currentColor"
                                                    strokeWidth="8"
                                                ></circle>
                                                <circle
                                                    className="text-blue-400"
                                                    cx="64"
                                                    cy="64"
                                                    fill="transparent"
                                                    r="58"
                                                    stroke="currentColor"
                                                    strokeDasharray="364.4"
                                                    strokeDashoffset="36.4"
                                                    strokeWidth="10"
                                                    strokeLinecap="round"
                                                ></circle>
                                            </svg>
                                            <span className="absolute text-2xl font-black">
                                                90%
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        className="hover:bg-opacity-95 w-full rounded-xl bg-white py-3 text-xs font-bold text-zinc-950 transition-all active:scale-95"
                                        onClick={() =>
                                            showToast(
                                                'Recalculating strategic marketing allocations...',
                                            )
                                        }
                                    >
                                        Optimalkan Strategi
                                    </button>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>

            {/* AI Floating Action Button */}
            <div className="fixed right-8 bottom-24 z-50">
                <button
                    onClick={() =>
                        showToast('Opening AI Business Copilot sidebar...')
                    }
                    className="ai-gradient-bg group relative flex h-16 w-16 items-center justify-center rounded-full text-white shadow-2xl transition-all hover:scale-105 active:scale-95"
                >
                    <span className="material-symbols-outlined text-[32px] text-white">
                        psychology
                    </span>
                    <div className="pointer-events-none absolute right-full mr-4 rounded-xl bg-zinc-900 px-4 py-2 text-xs font-bold whitespace-nowrap text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
                        Tanya Asisten AI
                    </div>
                </button>
            </div>

            {/* Notification Toast */}
            <div
                className={`pointer-events-none fixed bottom-8 left-1/2 z-[9999] flex -translate-x-1/2 items-center gap-3 rounded-full bg-zinc-900 px-6 py-3.5 text-white shadow-2xl transition-all duration-500 ${
                    toastVisible
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-10 opacity-0'
                }`}
            >
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                <span className="text-xs font-semibold">{toastMessage}</span>
            </div>

            <PrototypeHud />
        </>
    );
}
