import { Head, Link, usePage } from '@inertiajs/react';
import {
    Search,
    Bell,
    ShieldCheck,
    Compass,
    Send,
    Brain,
    ArrowRight,
    Calendar,
    Sparkles,
} from 'lucide-react';
import React, { useState } from 'react';

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

interface DashboardProps {
    pendingInvitations: unknown[];
    kpis: KPIShape;
}

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

export default function Dashboard({ pendingInvitations, kpis }: DashboardProps) {
    const { auth } = usePage().props as unknown as { auth: { user?: { name?: string } } };
    const userName = auth.user?.name || 'Anggota';

    const [currentTab, setCurrentTab] = useState<
        | 'dashboard'
        | 'assistant'
        | 'rewards'
        | 'governance'
        | 'rat'
        | 'community'
        | 'profile'
        | 'settings'
    >('dashboard');
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const [messages, setMessages] = useState<Message[]>([
        {
            sender: 'ai',
            text: 'Selamat datang kembali! Ada yang bisa saya bantu hari ini?',
        },
    ]);
    const [chatInput, setChatInput] = useState('');
    const [, setIsTyping] = useState(false);

    const [feedPosts] = useState<
        {
            id: number;
            author: string;
            initials: string;
            role: string;
            content: string;
            likes: number;
            comments: number;
        }[]
    >([]);
    const [newPostContent, setNewPostContent] = useState('');

    const [votes] = useState<Record<number, 'yes' | 'no' | null>>({});

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 3000);
    };

    const handleSendChat = (textToSend = chatInput) => {
        if (!textToSend.trim()) {
            return;
        }

        setMessages((prev) => [...prev, { sender: 'user', text: textToSend }]);
        setChatInput('');
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            setMessages((prev) => [
                ...prev,
                {
                    sender: 'ai',
                    text: `Saya telah menganalisis permintaan Anda "${textToSend}". Saya akan mengambil data inventaris dan memeriksa database manfaat koperasi.`,
                },
            ]);
            showToast('AI memperbarui hasil');
        }, 1200);
    };

    const handleCreatePost = () => {
        if (!newPostContent.trim()) {
            return;
        }
        setNewPostContent('');
        showToast('Postingan berhasil dibagikan!');
    };

    const handleVote = (proposalId: number, option: 'yes' | 'no') => {
        showToast(`Memberikan suara ${option.toUpperCase()} pada Proposal #${proposalId}!`);
    };

    const greetingTime = () => {
        const h = new Date().getHours();
        if (h < 11) return 'Selamat Pagi';
        if (h < 15) return 'Selamat Siang';
        if (h < 18) return 'Selamat Sore';
        return 'Selamat Malam';
    };

    return (
        <>
            <Head title="Portal Anggota | KOPERA-PLUS" />

            <div className="flex min-h-screen overflow-x-hidden bg-[#f8f9ff] font-sans text-[#0b1c30] antialiased">
                {/* Sidebar Navigasi */}
                <aside className="fixed top-0 left-0 z-50 flex h-screen w-64 flex-col justify-between border-r border-zinc-200/60 bg-white p-6 shadow-sm">
                    <div>
                        <div className="mb-10 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <span
                                    className="material-symbols-outlined"
                                    style={{
                                        fontVariationSettings: "'FILL' 1",
                                    }}
                                >
                                    hub
                                </span>
                            </div>
                            <div>
                                <h1 className="text-base leading-none font-extrabold text-primary">
                                    KOPERA-PLUS
                                </h1>
                                <p className="mt-1 text-[10px] font-bold text-zinc-400 uppercase">
                                    Tata Kelola Berbasis AI
                                </p>
                            </div>
                        </div>

                        <nav className="space-y-1">
                            <button
                                onClick={() => setCurrentTab('dashboard')}
                                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition-all ${
                                    currentTab === 'dashboard'
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-zinc-600 hover:bg-slate-50'
                                }`}
                            >
                                <span className="material-symbols-outlined">
                                    dashboard
                                </span>
                                <span>Dasbor</span>
                            </button>
                            <button
                                onClick={() => setCurrentTab('assistant')}
                                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition-all ${
                                    currentTab === 'assistant'
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-zinc-600 hover:bg-slate-50'
                                }`}
                            >
                                <span className="material-symbols-outlined">
                                    smart_toy
                                </span>
                                <span>Asisten AI Anggota</span>
                            </button>
                            <button
                                onClick={() => setCurrentTab('rewards')}
                                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition-all ${
                                    currentTab === 'rewards'
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-zinc-600 hover:bg-slate-50'
                                }`}
                            >
                                <span className="material-symbols-outlined">
                                    redeem
                                </span>
                                <span>Reward</span>
                            </button>
                            <button
                                onClick={() => setCurrentTab('governance')}
                                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition-all ${
                                    currentTab === 'governance'
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-zinc-600 hover:bg-slate-50'
                                }`}
                            >
                                <span className="material-symbols-outlined">
                                    monitoring
                                </span>
                                <span>e-RAT</span>
                            </button>
                            <button
                                onClick={() => setCurrentTab('community')}
                                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition-all ${
                                    currentTab === 'community'
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-zinc-600 hover:bg-slate-50'
                                }`}
                            >
                                <span className="material-symbols-outlined">
                                    groups
                                </span>
                                <span>Komunitas</span>
                            </button>
                        </nav>
                    </div>

                    <div>
                        <div className="mb-6 space-y-1">
                            <button
                                onClick={() => setCurrentTab('profile')}
                                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition-all ${
                                    currentTab === 'profile'
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-zinc-600 hover:bg-slate-50'
                                }`}
                            >
                                <span className="material-symbols-outlined">
                                    person
                                </span>
                                <span>Profil</span>
                            </button>
                            <button
                                onClick={() => setCurrentTab('settings')}
                                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition-all ${
                                    currentTab === 'settings'
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-zinc-600 hover:bg-slate-50'
                                }`}
                            >
                                <span className="material-symbols-outlined">
                                    settings
                                </span>
                                <span>Pengaturan</span>
                            </button>
                            <Link
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
                                href="/"
                            >
                                <span className="material-symbols-outlined">
                                    logout
                                </span>
                                <span>Keluar</span>
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* Area Konten Utama */}
                <div className="ml-64 flex min-h-screen flex-grow flex-col bg-slate-50">
                    {/* Bilah Navigasi Atas */}
                    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-zinc-200/50 bg-white px-8 py-4">
                        <div className="relative w-full max-w-md">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                            <input
                                className="w-full rounded-full border border-zinc-200 bg-slate-50 py-2 pr-4 pl-10 text-xs text-zinc-800 focus:outline-none"
                                placeholder="Cari koperasi, produk, atau tanyakan AI..."
                                type="text"
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="relative rounded-full p-2 text-zinc-600 transition-all hover:bg-slate-50">
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
                            </button>
                            <div className="ml-2 flex items-center gap-3 border-l border-zinc-200 pl-4">
                                <div className="text-right">
                                    <p className="text-xs leading-none font-bold">
                                        {userName}
                                    </p>
                                    <p className="mt-0.5 text-[9px] font-bold text-zinc-400">
                                        Anggota Koperasi
                                    </p>
                                </div>
                                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 bg-primary/10 text-xs font-bold text-primary">
                                    {userName.charAt(0).toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* RENDERING TAB DINAMIS */}
                    <div className="mx-auto flex w-full max-w-[1440px] flex-grow gap-8 p-8">
                        {/* TAB 1: DASBOR */}
                        {currentTab === 'dashboard' && (
                            <div className="animate-fadeIn flex w-full gap-8">
                                <div className="flex-1 space-y-8">
                                    {/* Sapaan */}
                                    <div>
                                        <h2 className="font-display-sm flex items-center gap-2 text-3xl font-extrabold text-zinc-900">
                                            {greetingTime()}, {userName}
                                        </h2>
                                        <p className="mt-1 text-sm text-zinc-500">
                                            Ringkasan koperasi Anda hari ini.
                                        </p>
                                    </div>

                                    {/* Tombol Aksi Cepat */}
                                    <div className="flex flex-wrap gap-2.5">
                                        <button
                                            className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-bold shadow-sm transition-colors hover:bg-slate-50"
                                            onClick={() =>
                                                showToast(
                                                    'Mencari koperasi...',
                                                )
                                            }
                                        >
                                            <Compass className="h-3.5 w-3.5 text-primary" />{' '}
                                            Cari Koperasi
                                        </button>
                                        <button
                                            className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-bold shadow-sm transition-colors hover:bg-slate-50"
                                            onClick={() =>
                                                setCurrentTab('assistant')
                                            }
                                        >
                                            <span className="material-symbols-outlined text-[16px] text-primary">
                                                shopping_bag
                                            </span>{' '}
                                            Beli Produk
                                        </button>
                                        <button
                                            className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-bold shadow-sm transition-colors hover:bg-slate-50"
                                            onClick={() =>
                                                setCurrentTab('profile')
                                            }
                                        >
                                            <span className="material-symbols-outlined text-[16px] text-primary">
                                                account_balance_wallet
                                            </span>{' '}
                                            Cek SHU
                                        </button>
                                        <button
                                            className="flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-primary/20 transition-all hover:opacity-95 active:scale-95"
                                            onClick={() => setCurrentTab('rat')}
                                        >
                                            <Sparkles className="h-3.5 w-3.5 text-white" />{' '}
                                            Ikuti e-RAT
                                        </button>
                                    </div>

                                    {/* Kartu Pratinjau Asisten AI */}
                                    <div className="bento-card border border-zinc-200/50 bg-white p-6 shadow-md">
                                        <div className="mb-6 flex items-center gap-3 border-b border-zinc-100 pb-4">
                                            <Brain className="h-6 w-6 animate-pulse text-blue-600" />
                                            <div>
                                                <h3 className="font-headline-sm text-sm font-bold text-zinc-950">
                                                    Asisten AI Anggota
                                                </h3>
                                                <p className="text-[10px] text-zinc-400">
                                                    Tanyakan apa pun tentang keanggotaan atau status koperasi Anda.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mb-6 space-y-4">
                                            <div className="flex gap-4">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
                                                    AI
                                                </div>
                                                <div className="max-w-2xl rounded-2xl rounded-tl-none border border-zinc-200/30 bg-slate-50 p-4 text-xs leading-relaxed text-zinc-700">
                                                    Selamat datang kembali,{' '}
                                                    <strong className="font-bold text-zinc-900">
                                                        {userName}
                                                    </strong>
                                                    ! Ada yang bisa saya bantu terkait koperasi Anda hari ini?
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-3 border-t border-zinc-100 pt-4">
                                            <button
                                                onClick={() =>
                                                    setCurrentTab('assistant')
                                                }
                                                className="flex items-center gap-1 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-bold text-zinc-700 transition-all hover:bg-slate-50"
                                            >
                                                Lanjutkan Obrolan{' '}
                                                <ArrowRight className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Kartu Bawah: Hitung Mundur e-RAT & Aktivitas */}
                                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                        <div className="bento-card border border-zinc-200/50 p-6 shadow-md">
                                            <div className="mb-6 flex items-center gap-3 border-b border-zinc-100 pb-4">
                                                <Calendar className="h-5 w-5 text-blue-600" />
                                                <h4 className="text-sm font-bold">
                                                    Hitung Mundur e-RAT
                                                </h4>
                                            </div>
                                            <div className="mb-6 space-y-3 text-xs">
                                                <div className="flex justify-between">
                                                    <span className="text-zinc-400">
                                                        Tahun Buku:
                                                    </span>
                                                    <strong className="font-bold text-zinc-800">
                                                        {kpis.latest_rat_tahun_buku || '-'}
                                                    </strong>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-zinc-400">
                                                        Total RAT:
                                                    </span>
                                                    <strong className="font-bold text-blue-600">
                                                        {kpis.total_rat}
                                                    </strong>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    setCurrentTab('rat')
                                                }
                                                className="w-full rounded-xl bg-primary py-3 text-xs font-bold text-white transition-all hover:opacity-95 active:scale-95"
                                            >
                                                Masuk Lobi Rapat
                                            </button>
                                        </div>

                                        <div className="bento-card border border-zinc-200/50 p-6 shadow-md">
                                            <h4 className="mb-6 border-b border-zinc-100 pb-4 text-sm font-bold">
                                                Aktivitas Terbaru
                                            </h4>
                                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                                <span className="material-symbols-outlined mb-2 text-3xl text-zinc-300">
                                                    inbox
                                                </span>
                                                <p className="text-xs text-zinc-400">
                                                    Belum ada aktivitas terbaru
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Panel Sisi Kanan */}
                                <div className="w-80 shrink-0 space-y-6">
                                    {/* Statistik KPI */}
                                    <div className="bento-card border border-zinc-200/50 p-5 shadow-sm">
                                        <h4 className="mb-4 text-xs font-bold text-zinc-800">
                                            Statistik Koperasi
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3 text-center">
                                            <div className="rounded-xl border border-zinc-200/30 bg-slate-50 p-3">
                                                <p className="text-[9px] font-bold text-zinc-400 uppercase">
                                                    Total Anggota
                                                </p>
                                                <p className="mt-1 text-base font-black text-primary">
                                                    {kpis.total_anggota.toLocaleString('id-ID')}
                                                </p>
                                            </div>
                                            <div className="rounded-xl border border-zinc-200/30 bg-slate-50 p-3">
                                                <p className="text-[9px] font-bold text-zinc-400 uppercase">
                                                    Total Koperasi
                                                </p>
                                                <p className="mt-1 text-base font-black text-emerald-700">
                                                    {kpis.total_koperasi.toLocaleString('id-ID')}
                                                </p>
                                            </div>
                                            <div className="rounded-xl border border-zinc-200/30 bg-slate-50 p-3">
                                                <p className="text-[9px] font-bold text-zinc-400 uppercase">
                                                    Total Simpanan
                                                </p>
                                                <p className="mt-1 text-base font-black text-blue-700">
                                                    {kpis.total_simpanan.toLocaleString('id-ID')}
                                                </p>
                                            </div>
                                            <div className="rounded-xl border border-zinc-200/30 bg-slate-50 p-3">
                                                <p className="text-[9px] font-bold text-zinc-400 uppercase">
                                                    Total Produk
                                                </p>
                                                <p className="mt-1 text-base font-black text-amber-700">
                                                    {kpis.total_produk.toLocaleString('id-ID')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status Tata Kelola */}
                                    <div className="bento-card space-y-4 border border-zinc-200/50 p-5 shadow-sm">
                                        <h4 className="text-xs font-bold text-zinc-800">
                                            Status Tata Kelola
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3 text-center">
                                            <div className="rounded-xl border border-zinc-200/30 bg-slate-50 p-3">
                                                <p className="text-[9px] font-bold text-zinc-400 uppercase">
                                                    Partisipasi
                                                </p>
                                                <p className="mt-1 text-base font-black text-primary">
                                                    -
                                                </p>
                                            </div>
                                            <div className="rounded-xl border border-zinc-200/30 bg-slate-50 p-3">
                                                <p className="text-[9px] font-bold text-zinc-400 uppercase">
                                                    Transparansi
                                                </p>
                                                <p className="mt-1 text-base font-black text-emerald-700">
                                                    -
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() =>
                                                setCurrentTab('governance')
                                            }
                                            className="w-full rounded-lg bg-primary/10 py-2 text-xs font-bold text-primary transition-all hover:bg-primary/20"
                                        >
                                            Berikan Suara
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 2: ASISTEN AI ANGGOTA */}
                        {currentTab === 'assistant' && (
                            <div className="animate-fadeIn flex w-full gap-8">
                                <div className="border-zinc-250/30 flex h-[650px] flex-1 flex-col justify-between rounded-3xl border bg-white p-6 shadow-sm">
                                    <div className="mb-4 flex items-center justify-between border-b border-zinc-100 pb-4">
                                        <div>
                                            <h3 className="flex items-center gap-2 text-sm font-bold text-zinc-950">
                                                Asisten AI Anggota{' '}
                                                <Brain className="h-4.5 w-4.5 text-blue-600" />
                                            </h3>
                                            <p className="text-[10px] text-zinc-400">
                                                Berinteraksi langsung dengan inti kecerdasan KOPERA.
                                            </p>
                                        </div>
                                        <button
                                            onClick={() =>
                                                setMessages([
                                                    {
                                                        sender: 'ai',
                                                        text: 'Sesi baru dimulai. Apa permintaan Anda?',
                                                    },
                                                ])
                                            }
                                            className="text-xs font-bold text-primary hover:underline"
                                        >
                                            Hapus Percakapan
                                        </button>
                                    </div>

                                    <div className="custom-scrollbar flex-grow space-y-4 overflow-y-auto pr-2">
                                        {messages.map((msg, idx) => (
                                            <div
                                                key={idx}
                                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`max-w-md rounded-2xl p-4 text-xs leading-relaxed ${
                                                        msg.sender === 'user'
                                                            ? 'rounded-tr-none bg-primary text-white'
                                                            : 'rounded-tl-none bg-slate-100 text-zinc-800'
                                                    }`}
                                                >
                                                    {msg.text}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4 flex items-center gap-3 border-t border-zinc-100 pt-4">
                                        <input
                                            className="flex-grow rounded-xl border border-zinc-200 bg-slate-50 px-4 py-3 text-xs text-zinc-800 outline-none focus:ring-1 focus:ring-primary/20"
                                            placeholder="Tanyakan ke AI KOPERA..."
                                            type="text"
                                            value={chatInput}
                                            onChange={(e) =>
                                                setChatInput(e.target.value)
                                            }
                                            onKeyDown={(e) =>
                                                e.key === 'Enter' &&
                                                handleSendChat()
                                            }
                                        />
                                        <button
                                            onClick={() => handleSendChat()}
                                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white"
                                        >
                                            <Send className="h-4.5 w-4.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 3: REWARD */}
                        {currentTab === 'rewards' && (
                            <div className="animate-fadeIn w-full space-y-8">
                                <div className="bento-card border border-zinc-200/50 p-8 shadow-md">
                                    <h3 className="font-display-sm mb-2 text-xl font-bold">
                                        Reward & Penukaran Poin
                                    </h3>
                                    <p className="mb-8 text-xs text-zinc-400">
                                        Tukarkan poin koperasi yang telah Anda kumpulkan.
                                    </p>

                                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
                                        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 text-center">
                                            <p className="text-[10px] font-bold text-blue-700 uppercase">
                                                Poin Tersedia
                                            </p>
                                            <p className="mt-2 text-3xl font-black text-blue-900">
                                                0
                                            </p>
                                        </div>
                                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-center">
                                            <p className="text-[10px] font-bold text-emerald-700 uppercase">
                                                Total Terkumpul
                                            </p>
                                            <p className="mt-2 text-3xl font-black text-emerald-900">
                                                0
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <span className="material-symbols-outlined mb-3 text-4xl text-zinc-300">
                                            redeem
                                        </span>
                                        <p className="text-sm font-bold text-zinc-500">
                                            Belum ada voucher tersedia
                                        </p>
                                        <p className="mt-1 text-xs text-zinc-400">
                                            Mulai bertransaksi untuk mengumpulkan poin reward.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 4: TATA KELOLA (VOTING) */}
                        {currentTab === 'governance' && (
                            <div className="animate-fadeIn w-full space-y-8">
                                <div className="bento-card border border-zinc-200/50 p-8 shadow-md">
                                    <h3 className="font-display-sm mb-2 text-xl font-bold">
                                        Voting Tata Kelola Digital
                                    </h3>
                                    <p className="mb-8 text-xs text-zinc-400">
                                        Berikan suara Anda pada proposal yang aktif. Keputusan dicatat pada buku besar koperasi.
                                    </p>

                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <span className="material-symbols-outlined mb-3 text-4xl text-zinc-300">
                                            how_to_vote
                                        </span>
                                        <p className="text-sm font-bold text-zinc-500">
                                            Belum ada agenda voting aktif
                                        </p>
                                        <p className="mt-1 text-xs text-zinc-400">
                                            Agenda voting akan muncul di sini saat tersedia.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 5: e-RAT */}
                        {currentTab === 'rat' && (
                            <div className="animate-fadeIn w-full space-y-8">
                                <div className="bento-card border border-zinc-200/50 p-8 shadow-md">
                                    <h3 className="font-display-sm mb-2 text-xl font-bold">
                                        Pusat Rapat e-RAT
                                    </h3>
                                    <p className="mb-8 text-xs text-zinc-400">
                                        Akses rapat tahunan koperasi, tinjau alokasi, dan lihat dokumentasi historis.
                                    </p>

                                    <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                                        <div className="flex min-h-[220px] flex-col justify-between rounded-2xl bg-gradient-to-br from-blue-900 to-zinc-950 p-8 text-white">
                                            <div>
                                                <h4 className="text-base font-bold">
                                                    Rapat Keuangan Tahunan e-RAT
                                                </h4>
                                                <p className="mt-2 text-xs opacity-75">
                                                    Tahun Buku: {kpis.latest_rat_tahun_buku || '-'}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    showToast(
                                                        'Terdaftar untuk notifikasi rapat!',
                                                    )
                                                }
                                                className="w-fit rounded-lg bg-white px-6 py-2.5 text-xs font-bold text-zinc-950"
                                            >
                                                Daftar Notifikasi
                                            </button>
                                        </div>

                                        <div className="space-y-4 rounded-2xl border border-zinc-200 p-6">
                                            <h4 className="text-sm font-bold">
                                                Agenda Rapat e-RAT
                                            </h4>
                                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                                <span className="material-symbols-outlined mb-2 text-3xl text-zinc-300">
                                                    event_note
                                                </span>
                                                <p className="text-xs text-zinc-400">
                                                    Belum ada agenda terjadwal
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <h4 className="mb-4 text-sm font-bold">
                                        Arsip Historis
                                    </h4>
                                    <div className="flex flex-col items-center justify-center py-8 text-center">
                                        <span className="material-symbols-outlined mb-2 text-3xl text-zinc-300">
                                            folder_open
                                        </span>
                                        <p className="text-xs text-zinc-400">
                                            Belum ada dokumen tersedia
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 6: KOMUNITAS */}
                        {currentTab === 'community' && (
                            <div className="animate-fadeIn flex w-full gap-8">
                                <div className="flex-1 space-y-6">
                                    {/* Kolom Posting */}
                                    <div className="bento-card border border-zinc-200/50 bg-white p-6 shadow-sm">
                                        <h4 className="mb-3 text-sm font-bold">
                                            Bagikan pembaruan
                                        </h4>
                                        <textarea
                                            className="mb-3 w-full rounded-xl border border-zinc-200 bg-slate-50 p-3.5 text-xs text-zinc-700 outline-none focus:ring-1 focus:ring-primary/20"
                                            placeholder="Ceritakan tentang hasil panen, produk, atau pertanyaan Anda..."
                                            rows={3}
                                            value={newPostContent}
                                            onChange={(e) =>
                                                setNewPostContent(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <div className="flex justify-end">
                                            <button
                                                onClick={handleCreatePost}
                                                className="rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-white transition-all active:scale-95"
                                            >
                                                Kirim Postingan
                                            </button>
                                        </div>
                                    </div>

                                    {/* Feed Postingan */}
                                    {feedPosts.length === 0 ? (
                                        <div className="bento-card flex flex-col items-center justify-center border border-zinc-200/50 bg-white py-16 shadow-sm">
                                            <span className="material-symbols-outlined mb-3 text-4xl text-zinc-300">
                                                forum
                                            </span>
                                            <p className="text-sm font-bold text-zinc-500">
                                                Belum ada postingan komunitas
                                            </p>
                                            <p className="mt-1 text-xs text-zinc-400">
                                                Jadilah yang pertama membagikan sesuatu!
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {feedPosts.map((post) => (
                                                <div
                                                    key={post.id}
                                                    className="bento-card border border-zinc-200/50 bg-white p-6 shadow-sm"
                                                >
                                                    <div className="mb-4 flex items-center gap-3">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                                            {post.initials}
                                                        </div>
                                                        <div className="text-xs">
                                                            <p className="font-bold text-zinc-950">
                                                                {post.author}
                                                            </p>
                                                            <p className="mt-0.5 text-[10px] text-zinc-400">
                                                                {post.role}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <p className="text-zinc-650 mb-4 text-xs leading-relaxed">
                                                        {post.content}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="w-80 shrink-0 space-y-6">
                                    <div className="bento-card border border-zinc-200/50 bg-white p-5 shadow-sm">
                                        <h4 className="mb-4 border-b pb-2 text-xs font-bold text-zinc-800">
                                            Kontributor Terbaik
                                        </h4>
                                        <div className="flex flex-col items-center justify-center py-6 text-center">
                                            <span className="material-symbols-outlined mb-2 text-3xl text-zinc-300">
                                                emoji_events
                                            </span>
                                            <p className="text-xs text-zinc-400">
                                                Belum ada data kontributor
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 7: PROFIL */}
                        {currentTab === 'profile' && (
                            <div className="animate-fadeIn w-full space-y-8">
                                <div className="bento-card border border-zinc-200/50 p-8 shadow-md">
                                    <h3 className="font-display-sm mb-2 text-xl font-bold">
                                        Profil Anggota
                                    </h3>
                                    <p className="mb-8 text-xs text-zinc-400">
                                        Kelola akun pribadi, tinjau dokterdaftar, dan tarik dividen SHU.
                                    </p>

                                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                                        <div className="flex flex-col justify-between rounded-2xl border border-zinc-200 p-6 md:col-span-2">
                                            <div>
                                                <h4 className="mb-4 text-sm font-bold">
                                                    Akun Dividen SHU
                                                </h4>
                                                <p className="text-2xl font-black text-emerald-700">
                                                    Rp0
                                                </p>
                                                <p className="mt-1 text-[10px] text-zinc-400">
                                                    Saldo SHU tahun buku saat ini.
                                                </p>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    showToast(
                                                        'Belum ada saldo SHU untuk ditarik.',
                                                    )
                                                }
                                                className="mt-8 w-full rounded-xl bg-[#006229] py-3 text-xs font-bold text-white transition-all hover:bg-[#004f20] active:scale-95"
                                            >
                                                Tarik ke Bank
                                            </button>
                                        </div>
                                        <div className="space-y-4 rounded-2xl border border-zinc-200 p-6">
                                            <h4 className="text-sm font-bold">
                                                Status Akun
                                            </h4>
                                            <div className="space-y-2 text-xs text-zinc-500">
                                                <p>
                                                    Identitas:{' '}
                                                    <strong className="font-bold text-zinc-400">
                                                        -
                                                    </strong>
                                                </p>
                                                <p>
                                                    Level:{' '}
                                                    <strong className="font-bold text-zinc-400">
                                                        -
                                                    </strong>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 8: PENGATURAN */}
                        {currentTab === 'settings' && (
                            <div className="animate-fadeIn w-full space-y-8">
                                <div className="bento-card border border-zinc-200/50 p-8 shadow-md">
                                    <h3 className="font-display-sm mb-2 text-xl font-bold">
                                        Konfigurasi Portal
                                    </h3>
                                    <p className="mb-8 text-xs text-zinc-400">
                                        Personalisasi opsi dan atur pengaturan autentikasi biometrik.
                                    </p>

                                    <div className="max-w-xl space-y-6">
                                        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                                            <div>
                                                <h4 className="text-xs font-bold text-zinc-950">
                                                    Notifikasi Email
                                                </h4>
                                                <p className="mt-0.5 text-[10px] text-zinc-400">
                                                    Terima pemberitahuan saat proposal baru tersedia.
                                                </p>
                                            </div>
                                            <input
                                                type="checkbox"
                                                defaultChecked
                                                className="rounded text-primary focus:ring-primary"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                                            <div>
                                                <h4 className="text-xs font-bold text-zinc-950">
                                                    Autentikasi Passkey
                                                </h4>
                                                <p className="mt-0.5 text-[10px] text-zinc-400">
                                                    Gunakan pemindai biometrik wajah/sidik jari untuk login.
                                                </p>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    showToast(
                                                        'Pendaftaran passkey berhasil dipicu!',
                                                    )
                                                }
                                                className="rounded-lg border border-zinc-200 px-4 py-2 text-[10px] font-bold transition-all hover:bg-slate-50"
                                            >
                                                Konfigurasi
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Toast Notifikasi */}
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
        </>
    );
}
