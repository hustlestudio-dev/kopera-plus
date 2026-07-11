import { Head, Link } from '@inertiajs/react';
import { Search, Brain, AlertCircle, Activity, ShieldCheck, HelpCircle, Bell, MessageSquare, ChevronRight, Sparkles } from 'lucide-react';
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

export default function AdminDashboard() {
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 3000);
    };

    const kpis: KPIItem[] = [
        { label: 'Anggota Aktif', value: '4,821', change: '+12%', positive: true, data: [2, 4, 3, 6] },
        { label: 'Baru Bulan Ini', value: '142', change: '+5%', positive: true, data: [3, 2, 5, 4] },
        { label: 'Transaksi', value: '12.4k', change: '-2%', positive: false, data: [6, 5, 4, 2] },
        { label: 'Pendapatan', value: 'Rp24.8M', change: '+8%', positive: true, data: [2, 3, 5, 7] },
    ];

    const recommendations: RecItem[] = [
        {
            type: 'Kritis',
            confidence: 'Kepercayaan 94%',
            title: 'Keterlibatan anggota usia 18-25 menurun',
            desc: 'Data menunjukkan penurunan 15% volume transaksi untuk segmen Gen-Z selama 3 bulan terakhir. Keterlibatan terhadap layanan digital stagnan.',
            recommendation: 'Luncurkan workshop keterampilan digital untuk wirausaha muda minggu depan.',
        },
        {
            type: 'Inventaris',
            confidence: 'Kepercayaan 88%',
            title: 'Diprediksi Kekurangan Pasokan Pupuk',
            desc: 'Permintaan regional meningkat tajam. Stok saat ini akan habis dalam 12 hari berdasarkan pola pembelian prediktif anggota petani.',
            recommendation: 'Lakukan restock +30% dengan pesanan segera untuk mengunci harga grosir saat ini.',
        },
    ];

    return (
        <>
            <Head title="Kopilot Bisnis AI | KOPERA-PLUS" />

            <div className="flex bg-[#f8f9ff] font-sans antialiased text-[#0b1c30] min-h-screen">
                {/* SideNavBar */}
                <aside className="h-screen w-72 flex flex-col fixed left-0 top-0 bg-white border-r border-zinc-200/80 shadow-sm z-50">
                    <div className="h-full py-8 flex flex-col justify-between">
                        <div>
                            <div className="px-8 mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl ai-gradient-bg flex items-center justify-center text-white shadow-lg">
                                        <span className="material-symbols-outlined">analytics</span>
                                    </div>
                                    <div>
                                        <h1 className="text-base font-extrabold text-primary leading-none">KOPERA-PLUS</h1>
                                        <p className="text-[10px] text-zinc-400 font-bold uppercase mt-1">AI Business Copilot</p>
                                    </div>
                                </div>
                            </div>
                            
                            <nav className="px-4 space-y-1">
                                <Link className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 text-primary border-r-4 border-primary font-bold text-sm" href="/admin-dashboard">
                                    <span className="material-symbols-outlined">dashboard</span>
                                    <span>Dashboard</span>
                                </Link>
                                <Link className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-600 hover:bg-slate-50 text-sm font-semibold transition-colors" href="/workspace">
                                    <span className="material-symbols-outlined">group</span>
                                    <span>Anggota</span>
                                </Link>
                                <Link className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-600 hover:bg-slate-50 text-sm font-semibold transition-colors" href="/assistant">
                                    <span className="material-symbols-outlined">inventory_2</span>
                                    <span>Produk</span>
                                </Link>
                                <Link className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-600 hover:bg-slate-50 text-sm font-semibold transition-colors" href="/workspace">
                                    <span className="material-symbols-outlined">widgets</span>
                                    <span>Inventaris</span>
                                </Link>
                                <Link className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-600 hover:bg-slate-50 text-sm font-semibold transition-colors" href="/workspace">
                                    <span className="material-symbols-outlined">receipt_long</span>
                                    <span>Transaksi</span>
                                </Link>
                                <Link className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-600 hover:bg-slate-50 text-sm font-semibold transition-colors" href="/workspace">
                                    <span className="material-symbols-outlined">military_tech</span>
                                    <span>Hadiah</span>
                                </Link>
                                <Link className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-600 hover:bg-slate-50 text-sm font-semibold transition-colors" href="/workspace">
                                    <span className="material-symbols-outlined">forum</span>
                                    <span>Komunitas</span>
                                </Link>
                                <Link className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-600 hover:bg-slate-50 text-sm font-semibold transition-colors" href="/workspace">
                                    <span className="material-symbols-outlined">analytics</span>
                                    <span>Digital RAT</span>
                                </Link>
                                <Link className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-600 hover:bg-slate-50 text-sm font-semibold transition-colors" href="/workspace">
                                    <span className="material-symbols-outlined">assessment</span>
                                    <span>Laporan</span>
                                </Link>
                                <Link className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#7C3AED] bg-purple-50/50 font-bold text-sm" href="/workspace">
                                    <span className="material-symbols-outlined">psychology</span>
                                    <span>AI Insight</span>
                                </Link>
                            </nav>
                        </div>
                        
                        <div className="px-4 space-y-1">
                            <Link className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-600 hover:bg-slate-50 text-sm" href="/workspace">
                                <span className="material-symbols-outlined">settings</span>
                                <span>Pengaturan</span>
                            </Link>
                            <Link className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-600 hover:bg-slate-50 text-sm" href="/workspace">
                                <HelpCircle className="h-4 w-4 text-zinc-400" />
                                <span>Pusat Bantuan</span>
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* Main Wrapper */}
                <div className="ml-72 flex-grow min-h-screen flex flex-col bg-slate-50">
                    {/* TopNavBar */}
                    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-zinc-200/50 flex justify-between items-center px-8 py-4">
                        <div className="flex items-center gap-6 flex-1">
                            <div className="relative w-full max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 h-4 w-4" />
                                <input className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Cari insight, anggota, atau produk..." type="text"/>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="ai-gradient-bg text-white px-6 py-2.5 rounded-full font-label-md text-sm flex items-center gap-2 shadow-md hover:opacity-95 active:scale-95 transition-all font-semibold" onClick={() => showToast("AI Insight analysis re-triggered.")}>
                                <Brain className="h-4 w-4" />
                                Insight AI
                            </button>
                            <div className="flex items-center gap-2 border-l border-zinc-200 pl-4 ml-2">
                                <button className="p-2 rounded-full text-zinc-600 hover:bg-slate-100 transition-colors relative">
                                    <Bell className="h-5 w-5" />
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                                </button>
                                <button className="p-2 rounded-full text-zinc-600 hover:bg-slate-100 transition-colors">
                                    <MessageSquare className="h-5 w-5" />
                                </button>
                                <div className="flex items-center gap-3 ml-2 cursor-pointer hover:bg-slate-50 p-1.5 rounded-full transition-colors pr-4 border border-zinc-100">
                                    <img className="w-8 h-8 rounded-full object-cover shadow-sm" alt="Admin headshot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARx0ZRsnatRWN-N-W0mKEFT_a9DNWdqxfrKvRTnP9FpbspJlyAfun2eDqrjtBhmJxbmUhG8ix9uzzNE37Gy65YTE9DDUykawdaqn5x-0walk6FwZ-nx_JkQzfb_F-k4Cd_s4V9-84EYijk932BdXYGto3PIYdFTcKZFyO9WkQOUm5-B3d75jDakXw0x6cecQrP3KEw8zQeCUPdu-dTr8_Iz0LFLrnjuwAN0KAl5xzAcScougc-yN5e040RgoGzvzwseeKcULR_I_8" />
                                    <div className="hidden lg:block">
                                        <p className="text-xs font-bold leading-none">Admin User</p>
                                        <p className="text-[10px] text-zinc-400 font-bold mt-0.5">Super Administrator</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="p-8 space-y-8 max-w-[1600px] mx-auto w-full flex-grow">
                        {/* Hero Section */}
                        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 bento-card p-8 bg-zinc-950 text-white relative overflow-hidden flex flex-col justify-between min-h-[240px] shadow-xl">
                                <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                                <div className="relative z-10">
                                    <h2 className="font-display-sm text-2xl font-bold mb-2">Selamat Pagi, Admin 👋</h2>
                                    <p className="text-sm opacity-80 max-w-lg">
                                        Berikut insight koperasi Anda yang dihasilkan AI hari ini. Kami mendeteksi 3 area prioritas tinggi yang membutuhkan perhatian Anda.
                                    </p>
                                </div>
                                <div className="relative z-10 flex gap-4 mt-6">
                                    <button className="bg-primary text-white px-8 py-3 rounded-xl font-label-md text-xs font-bold hover:bg-opacity-95 transition-all" onClick={() => showToast("Showing priority recommendations...")}>
                                        Lihat Rekomendasi
                                    </button>
                                    <a href="/assistant?mode=governance" className="bg-white/10 border border-white/20 px-8 py-3 rounded-xl font-label-md text-xs font-bold hover:bg-white/20 transition-all text-white inline-flex items-center gap-2">
                                        <Sparkles className="h-3.5 w-3.5" />
                                        AI Governance
                                    </a>
                                    <button className="bg-white/10 border border-white/20 px-8 py-3 rounded-xl font-label-md text-xs font-bold hover:bg-white/20 transition-all text-white" onClick={() => showToast("Report compiled and downloaded.")}>
                                        Unduh Laporan
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-rows-2 gap-4">
                                <div className="bento-card p-6 flex items-start gap-4 border-l-4 border-red-500 shadow-sm border border-zinc-100">
                                    <div className="bg-red-50 p-3 rounded-xl text-red-500 shrink-0">
                                        <AlertCircle className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Peringatan Inventaris</p>
                                        <p className="font-headline-sm text-sm font-bold">Inventaris menipis: 12 SKU</p>
                                        <p className="text-xs text-zinc-500 mt-1">Disarankan restock dalam 48 jam.</p>
                                    </div>
                                </div>
                                <div className="bento-card p-6 flex items-start gap-4 border-l-4 border-indigo-500 shadow-sm border border-zinc-100">
                                    <div className="bg-indigo-50 p-3 rounded-xl text-indigo-500 shrink-0">
                                        <Activity className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Peringatan Retensi</p>
                                        <p className="font-headline-sm text-sm font-bold">Partisipasi turun 8%</p>
                                        <p className="text-xs text-zinc-500 mt-1">Segmen anak muda menunjukkan inaktivitas.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* KPI Bento Grid */}
                        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {kpis.map((kpi, kIdx) => (
                                <div key={kIdx} className="bento-card p-6 flex flex-col justify-between border border-zinc-100 shadow-sm">
                                    <div>
                                        <p className="text-xs text-zinc-400 font-semibold">{kpi.label}</p>
                                        <p className="font-headline-md text-2xl font-bold mt-2 text-zinc-900">{kpi.value}</p>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                            kpi.positive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                                        }`}>{kpi.change}</span>
                                        <div className="w-16 h-8 flex items-end px-1 pb-1 gap-[2px]">
                                            {kpi.data.map((h, hIdx) => (
                                                <div 
                                                    key={hIdx} 
                                                    className={`flex-1 rounded-sm ${
                                                        kpi.positive 
                                                            ? (hIdx === kpi.data.length - 1 ? 'bg-emerald-500' : 'bg-emerald-200')
                                                            : (hIdx === kpi.data.length - 1 ? 'bg-red-500' : 'bg-red-200')
                                                    }`} 
                                                    style={{ height: `${h * 12}px` }}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </section>

                        {/* AI Insight Bento Grid */}
                        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* AI Insight Main Card */}
                            <div className="lg:col-span-8 bento-card p-8 border border-zinc-100 shadow-sm">
                                <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-100">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-purple-50 text-[#7C3AED] rounded-xl shrink-0">
                                            <Brain className="h-5 w-5" />
                                        </div>
                                        <h3 className="font-headline-md text-lg font-bold">Rekomendasi Strategis AI</h3>
                                    </div>
                                    <span className="text-xs text-zinc-400 italic">Dibuat 14 menit lalu</span>
                                </div>
                                <div className="mb-6 flex flex-wrap gap-3">
                                    <a href="/assistant?mode=cross_kopdes" className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:brightness-105 transition-all inline-flex items-center gap-2">
                                        <Sparkles className="h-3.5 w-3.5" />
                                        Cross-Kopdes AI
                                    </a>
                                    <a href="/assistant?mode=nudge" className="px-4 py-2 bg-white border border-zinc-200 text-zinc-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all inline-flex items-center gap-2">
                                        <Brain className="h-3.5 w-3.5 text-primary" />
                                        Generate Nudge
                                    </a>
                                </div>

                                <div className="space-y-6">
                                    {recommendations.map((rec, rIdx) => (
                                        <div key={rIdx} className="p-6 rounded-2xl bg-slate-50 border border-zinc-200/50 hover:border-purple-300 transition-colors cursor-pointer group">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-grow">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                                                            rec.type === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                                        }`}>{rec.type}</span>
                                                        <span className="text-xs text-purple-700 font-bold">{rec.confidence}</span>
                                                    </div>
                                                    <h4 className="font-headline-sm text-sm font-bold text-zinc-950 mb-2">{rec.title}</h4>
                                                    <p className="text-xs text-zinc-500 leading-relaxed">{rec.desc}</p>
                                                    <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-purple-700 bg-purple-50 p-2.5 rounded-lg border border-purple-100/50">
                                                        <span className="material-symbols-outlined text-[16px]">lightbulb</span>
                                                        <p>{rec.recommendation}</p>
                                                    </div>
                                                </div>
                                                <ChevronRight className="h-5 w-5 text-zinc-400 group-hover:text-purple-600 transition-colors" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Secondary Bento Column */}
                            <div className="lg:col-span-4 space-y-6">
                                <div className="bento-card p-6 flex flex-col border border-zinc-100 shadow-sm h-full justify-between">
                                    <div>
                                        <h3 className="font-headline-sm text-sm font-bold mb-6">Status Inventaris</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors text-xs border border-zinc-100 bg-white">
                                                <div className="w-10 h-10 bg-slate-100 flex items-center justify-center rounded-lg overflow-hidden shrink-0">
                                                    <img className="w-full h-full object-cover" alt="Fertilizer bag" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnx6yfR_zcnBAwES0Dq469-dV7nI3xjEvOLe92SxGsnnkrPRBrhiihfHMqsNTe_b6qDFkKXW6FfRKtsW1qu6CdQmMoojSU9-KcvgQsEPUdwYqjyTgFUfkuEuSiiBmd-Y_3hqS9am_qUQW-R4g0qUl6AbBpAgS8LuGIOV0lVGkpYZFdcjziGIVrR_AwIEnqsPO6hcWUEQKiieVe8_oSaqW70I2bJhwmxeuwFjcU1GnIrSRxtpTzK4FkKACVnWMWDvpxZxU0v7D61ls" />
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-bold">Organic Fertilizer A</p>
                                                    <p className="text-[10px] text-zinc-400 mt-0.5">Stock: 42 Units</p>
                                                </div>
                                                <span className="font-bold text-red-500 text-[10px]">Reorder</span>
                                            </div>
                                            <div className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors text-xs border border-zinc-100 bg-white">
                                                <div className="w-10 h-10 bg-slate-100 flex items-center justify-center rounded-lg overflow-hidden shrink-0">
                                                    <img className="w-full h-full object-cover" alt="Corn seeds" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsYOmeliWVZk5oFfWaKWwDvuiECyNZebak7wo-SXm1369wt5u-v7M6KCowRKP5N09EV9Mxb59xEltTTmU4ZnuMEwG5rmvDa3tvB3NJOrSt05ji7dT9CFxEDZmNEiMnQW9N7nMBY441Fk9NPbLMEOy50uUS0StuTFNOXp5vBPMIPP7dAL9M5aDRuSs6P6uB136w9CxLH6ENdcwU99PIKnlPcM0_QdVpXdAuwJ9G4hGYqY_kQH15_nvVD3Jq9AhHukUpATiuL6UzsvM" />
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-bold">Hybrid Corn Seeds</p>
                                                    <p className="text-[10px] text-zinc-400 mt-0.5">Stock: 124 Units</p>
                                                </div>
                                                <span className="font-bold text-emerald-600 text-[10px]">Stable</span>
                                            </div>
                                            <div className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors text-xs border border-zinc-100 bg-white">
                                                <div className="w-10 h-10 bg-slate-100 flex items-center justify-center rounded-lg overflow-hidden shrink-0">
                                                    <img className="w-full h-full object-cover" alt="Moisture sensors" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdOto96PurXodu2fn9Egv--X32-hIdQ2PYwHZXDmxhJ4GBizbUGgfZKz5VB0vjNl51WToWewDzyfcb-0Xd8Y_5kEhUFcaQBZ0gpv_iwNZBkIcOAE4lvOgvRadR_Agkw4qR5l7E0XgtGBB2CKtF50qaeQdiKC4pRY4VzZ7EdstO9z_VUMpLllxIvNUpWm3oo4Db12kvU3dw_9EOGynebW48jkGl5jiyPkSvaz0MCjyQdkB3lKKjI-rYVJc1nSMtGL-uJq0IK7XZVug" />
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-bold">Moisture Sensors v2</p>
                                                    <p className="text-[10px] text-zinc-400 mt-0.5">Stock: 18 Units</p>
                                                </div>
                                                <span className="font-bold text-red-500 text-[10px]">Reorder</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full mt-6 py-3 border border-zinc-200 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors text-zinc-700" onClick={() => showToast("Redirecting to full inventory view...")}>
                                        Lihat Semua Inventaris
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Bottom Section: Transactions & Performance */}
                        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 bento-card p-8 border border-zinc-100 shadow-sm">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="font-headline-md text-base font-bold">Tren Pendapatan & Partisipasi</h3>
                                </div>
                                <div className="h-64 flex items-end gap-4 px-4 pt-4 border-b border-zinc-100 pb-2">
                                    {/* Simulated Chart */}
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, dIdx) => {
                                        const heights = [40, 65, 55, 85, 45, 30, 20];

                                        return (
                                            <div key={dIdx} className="flex-1 flex flex-col items-center gap-2 group">
                                                <div 
                                                    className={`w-full rounded-t-md transition-all duration-300 ${
                                                        day === 'Thu' 
                                                            ? 'bg-primary shadow-lg shadow-blue-500/20' 
                                                            : 'bg-primary/20 group-hover:bg-primary/35'
                                                    }`} 
                                                    style={{ height: `${heights[dIdx]}%` }}
                                                ></div>
                                                <span className={`text-[10px] ${day === 'Thu' ? 'font-bold text-primary' : 'text-zinc-400'}`}>{day}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="bento-card p-8 bg-zinc-900 text-white relative shadow-lg">
                                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent"></div>
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-headline-md text-base font-bold mb-2">Target Pertumbuhan Anggota</h3>
                                        <p className="text-xs opacity-75">Di jalur yang tepat untuk mencapai target kuartalan 5.000 anggota.</p>
                                    </div>
                                    <div className="flex-grow flex items-center justify-center py-6">
                                        <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle className="text-white/10" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8"></circle>
                                                <circle className="text-purple-400" cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364.4" strokeDashoffset="36.4" strokeWidth="10" strokeLinecap="round"></circle>
                                            </svg>
                                            <span className="absolute text-2xl font-black">90%</span>
                                        </div>
                                    </div>
                                    <button className="w-full py-3 bg-white text-zinc-950 rounded-xl text-xs font-bold hover:bg-opacity-95 transition-all active:scale-95" onClick={() => showToast("Recalculating strategic marketing allocations...")}>
                                        Optimalkan Strategi
                                    </button>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>

            {/* AI Floating Action Button */}
            <div className="fixed bottom-24 right-8 z-50">
                <button 
                    onClick={() => showToast("Opening AI Business Copilot sidebar...")}
                    className="w-16 h-16 rounded-full ai-gradient-bg text-white shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all group relative"
                >
                    <span className="material-symbols-outlined text-[32px] text-white">psychology</span>
                    <div className="absolute right-full mr-4 bg-zinc-900 text-white px-4 py-2 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap text-xs font-bold">
                        Tanya Asisten AI
                    </div>
                </button>
            </div>

            {/* Notification Toast */}
            <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 transition-all duration-500 z-[9999] pointer-events-none ${
                toastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                <span className="text-xs font-semibold">{toastMessage}</span>
            </div>

            <PrototypeHud />
        </>
    );
}
