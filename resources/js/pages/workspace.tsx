import { Head, Link } from '@inertiajs/react';
import {
    Search,
    Bell,
    ShieldCheck,
    Send,
    Paperclip,
    Mic,
    Plus,
    Moon,
} from 'lucide-react';
import React, { useState } from 'react';
import PrototypeHud from '@/components/PrototypeHud';

interface Message {
    sender: 'user' | 'ai';
    text: string;
    showCard?: boolean;
}

export default function Workspace() {
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'user', text: 'Saya ingin membeli Beras Premium.' },
        {
            sender: 'ai',
            text: 'Saya menemukan produk yang sesuai dari inventaris Koperasi Green Life. Berikut detailnya:',
            showCard: true,
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 3000);
    };

    const handleSend = (textToSend = input) => {
        if (!textToSend.trim()) {
            return;
        }

        setMessages((prev) => [...prev, { sender: 'user', text: textToSend }]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            setMessages((prev) => [
                ...prev,
                {
                    sender: 'ai',
                    text: `Saya telah menganalisis pertanyaan Anda "${textToSend}". Saya akan mengambil inventaris terkini dan memeriksa basis data manfaat koperasi.`,
                },
            ]);
            showToast('AI menganalisis pesan');
        }, 1500);
    };

    return (
        <>
            <Head title="Asisten AI Anggota | KOPERA-PLUS" />

            <div className="flex h-screen overflow-hidden bg-[#f4f7fc] font-sans text-[#0b1c30] antialiased">
                {/* Left Sidebar (Matches Mockup) */}
                <aside className="fixed top-0 left-0 z-50 flex h-screen w-64 flex-col justify-between border-r border-zinc-200/60 bg-white p-6 shadow-sm">
                    <div>
                        {/* Branding */}
                        <div className="mb-8 flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <span className="material-symbols-outlined text-lg font-bold">
                                    hub
                                </span>
                            </div>
                            <div>
                                <h1 className="text-sm leading-none font-extrabold text-[#0b1c30]">
                                    KOPERA
                                </h1>
                                <p className="mt-1 text-[9px] font-bold text-zinc-400 uppercase">
                                    AI-First Governance
                                </p>
                            </div>
                        </div>

                        {/* New Chat Button */}
                        <button
                            onClick={() => {
                                setMessages([
                                    {
                                        sender: 'ai',
                                        text: 'Obrolan baru dimulai. Apa yang ingin Anda beli hari ini?',
                                    },
                                ]);
                                showToast('Sesi baru dimulai.');
                            }}
                            className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#004ac6] py-3 text-xs font-bold text-white shadow-md transition-all hover:brightness-105 active:scale-95"
                        >
                            <Plus className="h-4 w-4" /> Obrolan Baru
                        </button>

                        {/* Search Input */}
                        <div className="relative mb-6">
                            <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
                            <input
                                className="w-full rounded-xl border border-zinc-200/50 bg-slate-50 py-2.5 pr-3 pl-9 text-xs text-zinc-700 outline-none focus:ring-1 focus:ring-primary/20"
                                placeholder="Cari riwayat..."
                                type="text"
                            />
                        </div>

                        {/* Recent Conversations */}
                        <div>
                            <p className="mb-3 text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                                Percakapan Terbaru
                            </p>
                            <nav className="space-y-1">
                                <button className="flex w-full items-center gap-3 rounded-xl bg-[#004ac6]/10 px-4 py-3 text-left text-xs font-bold text-[#004ac6]">
                                    <span className="material-symbols-outlined text-[18px]">
                                        shopping_bag
                                    </span>
                                    <span>Membeli Produk</span>
                                </button>
                                <button
                                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-xs font-semibold text-zinc-500 transition-colors hover:bg-slate-50"
                                    onClick={() =>
                                        showToast('Beralih ke percakapan lain.')
                                    }
                                >
                                    <span className="material-symbols-outlined text-[18px] text-zinc-400">
                                        gavel
                                    </span>
                                    <span>RAT Digital</span>
                                </button>
                                <button
                                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-xs font-semibold text-zinc-500 transition-colors hover:bg-slate-50"
                                    onClick={() =>
                                        showToast('Beralih ke percakapan lain.')
                                    }
                                >
                                    <span className="material-symbols-outlined text-[18px] text-zinc-400">
                                        help_outline
                                    </span>
                                    <span>Pertanyaan SHU</span>
                                </button>
                                <button
                                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-xs font-semibold text-zinc-500 transition-colors hover:bg-slate-50"
                                    onClick={() =>
                                        showToast('Beralih ke percakapan lain.')
                                    }
                                >
                                    <span className="material-symbols-outlined text-[18px] text-zinc-400">
                                        person_outline
                                    </span>
                                    <span>Keanggotaan</span>
                                </button>
                            </nav>
                        </div>
                    </div>

                    <div className="space-y-1 border-t border-zinc-100 pt-6 text-xs">
                        <Link
                            className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-zinc-600 hover:bg-slate-50"
                            href="/dashboard"
                        >
                            <span className="material-symbols-outlined text-zinc-400">
                                dashboard
                            </span>
                            <span>Dashboard</span>
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-zinc-600 hover:bg-slate-50"
                            href="/workspace"
                        >
                            <span className="material-symbols-outlined text-zinc-400">
                                settings
                            </span>
                            <span>Pengaturan</span>
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-red-500 hover:bg-red-50"
                            href="/"
                        >
                            <span className="material-symbols-outlined">
                                logout
                            </span>
                            <span>Keluar</span>
                        </Link>
                    </div>
                </aside>

                {/* Chat Panel (Middle Column - Matches Mockup) */}
                <main className="relative mr-80 ml-64 flex h-screen flex-grow flex-col justify-between border-r border-zinc-200/50 bg-slate-50">
                    {/* Header */}
                    <header className="sticky top-0 z-45 flex h-16 shrink-0 items-center justify-between border-b border-zinc-200/50 bg-white px-8">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-zinc-950">
                                Asisten AI Anggota
                            </span>
                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                                Aktif
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="rounded-full p-2 text-zinc-600 transition-colors hover:bg-slate-50">
                                <Bell className="h-4.5 w-4.5" />
                            </button>
                            <button className="rounded-full p-2 text-zinc-600 transition-colors hover:bg-slate-50">
                                <Moon className="h-4.5 w-4.5" />
                            </button>
                            <div className="ml-1 h-8 w-8 overflow-hidden rounded-full border border-zinc-200 bg-slate-200">
                                <img
                                    className="h-full w-full object-cover"
                                    alt="Profile"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgGFYPJJrQS59wIbI2FuPkEUtimZi9vTjCaJl1jSk3skE4hCA7Oq8JU2mdKCauJ6Iw14Fgu1ne-760PCZkYWZ4BPIhVGsDHyrQG2GfeqEX3aoMJMBIKLV1yMwHcqfu2QMZxZZSOYNFwIA6OI24q51G8CSxELDNIOD4hmSKGI-NkicK6PAfEQ0llKQSYYe8Rvg-0nTPy_-kvEIL0dOJwFxt0fNlbECQ-No9V8lPAshfDNoiB7e8TUeZKY8ypFpslhW20X8dmj-rRHc"
                                />
                            </div>
                        </div>
                    </header>

                    {/* Chat Messages */}
                    <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto p-8 pb-32">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                            >
                                {msg.sender === 'user' ? (
                                    <div className="max-w-md rounded-2xl rounded-tr-none bg-[#004ac6] px-5 py-3.5 text-xs leading-relaxed font-semibold text-white shadow-sm">
                                        {msg.text}
                                    </div>
                                ) : (
                                    <div className="flex w-full gap-3">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-extrabold text-white shadow-sm">
                                            AI
                                        </div>
                                        <div className="max-w-[85%] flex-1 space-y-4">
                                            <div className="rounded-2xl rounded-tl-none border border-zinc-200/50 bg-white p-4 text-xs leading-relaxed font-medium text-zinc-700 shadow-sm">
                                                {msg.text}
                                            </div>

                                            {msg.showCard && (
                                                /* Product Card (Matches Mockup) */
                                                <div className="group max-w-sm overflow-hidden rounded-2xl border border-zinc-200/50 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
                                                    <div className="relative h-44 w-full">
                                                        <img
                                                            className="h-full w-full object-cover"
                                                            alt="Premium Rice"
                                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHAso7gSAxYgOjquC3G-bOpfr2QfZg3-8EYReKKo7w89v2stwHsuQ4It3GaFD-1W3aNKnPXlOHBluGPdv2idmYF_toIOrpbYIiP1yx2F2DqUu5gyKtZth2xuYDlayLC6NgTTh3bEVDv3ATOSwDl7M2JVavF8XLUeP51NQcZgAaZmHjTsbcBfRsXXC81_oybEiZUOGVya9tyZ76DK11HEfnFka1QgEJ_kVMAG3zw0c-m-zAI_KJwwyP8R7MZ25mQAABlV3wdFKcAKI"
                                                        />
                                                        <span className="absolute top-3 left-3 rounded bg-[#004ac6] px-2.5 py-1 text-[9px] font-extrabold tracking-wider text-white uppercase shadow-sm">
                                                            Terlaris
                                                        </span>
                                                    </div>
                                                    <div className="p-5">
                                                        <h4 className="mb-1 text-xs font-bold text-zinc-950">
                                                            Premium Rice 5kg
                                                        </h4>
                                                        <p className="mb-4 text-[10px] font-semibold text-zinc-400">
                                                            Green Life Signature
                                                            Organic Series
                                                        </p>
                                                        <div className="mb-5 flex items-center justify-between">
                                                            <span className="text-sm font-bold text-[#004ac6]">
                                                                Rp75.000
                                                            </span>
                                                            <span className="flex items-center gap-1.5 rounded-md bg-red-50 px-2.5 py-1 text-[10px] font-bold text-red-500">
                                                                <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>{' '}
                                                                Tersisa 24 item
                                                            </span>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() =>
                                                                    showToast(
                                                                        'Added to deliver home list',
                                                                    )
                                                                }
                                                                className="flex-1 rounded-xl bg-[#004ac6] py-2.5 text-[10px] font-bold text-white transition-all hover:brightness-105 active:scale-95"
                                                            >
                                                                Antar ke Rumah
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    showToast(
                                                                        'Selected pick up point',
                                                                    )
                                                                }
                                                                className="flex-1 rounded-xl border border-zinc-200 bg-white py-2.5 text-[10px] font-bold text-zinc-700 transition-colors hover:bg-slate-50 active:scale-95"
                                                            >
                                                                Ambil Sendiri
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex gap-3">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white shadow-sm">
                                    AI
                                </div>
                                <div className="flex items-center gap-2 rounded-2xl rounded-tl-none border border-zinc-200/50 bg-white px-4 py-3 text-xs font-semibold text-zinc-400 shadow-sm">
                                    <span>AI sedang mengetik</span>
                                    <div className="flex gap-1">
                                        <div className="h-1 w-1 animate-pulse rounded-full bg-blue-500"></div>
                                        <div
                                            className="h-1 w-1 animate-pulse rounded-full bg-blue-500"
                                            style={{ animationDelay: '0.2s' }}
                                        ></div>
                                        <div
                                            className="h-1 w-1 animate-pulse rounded-full bg-blue-500"
                                            style={{ animationDelay: '0.4s' }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Chat Actions & Input Area */}
                    <div className="absolute bottom-0 left-0 z-40 w-full shrink-0 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent p-6">
                        <div className="mx-auto max-w-3xl">
                            {/* Option Chips */}
                            <div className="mb-3 flex scrollbar-none gap-2 overflow-x-auto pb-2 select-none">
                                {[
                                    'Beli Produk',
                                    'Cek SHU',
                                    'Hadiah',
                                    'Pelatihan',
                                ].map((chip, cIdx) => (
                                    <button
                                        key={cIdx}
                                        onClick={() => handleSend(chip)}
                                        className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-[10px] font-semibold whitespace-nowrap text-zinc-600 shadow-sm transition-all hover:border-primary hover:text-primary"
                                    >
                                        {chip}
                                    </button>
                                ))}
                            </div>

                            {/* Text Input Box */}
                            <div className="flex items-center gap-3 rounded-2xl border border-zinc-200/60 bg-white p-2 shadow-lg">
                                <button
                                    className="rounded-xl p-3 text-zinc-400 hover:bg-slate-50"
                                    onClick={() =>
                                        showToast('Penjelajah lampiran dibuka.')
                                    }
                                >
                                    <Paperclip className="h-4.5 w-4.5" />
                                </button>
                                <input
                                    className="text-zinc-850 placeholder:text-zinc-450 flex-grow border-none bg-transparent py-3.5 text-xs font-medium outline-none focus:ring-0"
                                    placeholder="Tanyakan apa pun tentang koperasi Anda..."
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) =>
                                        e.key === 'Enter' && handleSend()
                                    }
                                />
                                <button
                                    className="rounded-xl p-3 text-zinc-400 hover:bg-slate-50"
                                    onClick={() =>
                                        showToast(
                                            'Mikrofon sedang mendengarkan...',
                                        )
                                    }
                                >
                                    <Mic className="h-4.5 w-4.5" />
                                </button>
                                <button
                                    onClick={() => handleSend()}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#004ac6] text-white shadow-md transition-transform active:scale-90"
                                >
                                    <Send className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Right Context Panel (Matches Mockup) */}
                <aside className="custom-scrollbar fixed top-0 right-0 z-50 flex h-screen w-80 flex-col gap-6 overflow-y-auto border-l border-zinc-200/60 bg-white p-6">
                    {/* Profile Header */}
                    <div className="bento-card flex flex-col items-center border border-zinc-200/50 p-5 text-center shadow-sm">
                        <div className="relative mb-4 h-16 w-16">
                            <div className="h-full w-full rounded-full border-2 border-emerald-500 bg-white p-[3px]">
                                <img
                                    className="h-full w-full rounded-full object-cover"
                                    alt="Profile Avatar"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgGFYPJJrQS59wIbI2FuPkEUtimZi9vTjCaJl1jSk3skE4hCA7Oq8JU2mdKCauJ6Iw14Fgu1ne-760PCZkYWZ4BPIhVGsDHyrQG2GfeqEX3aoMJMBIKLV1yMwHcqfu2QMZxZZSOYNFwIA6OI24q51G8CSxELDNIOD4hmSKGI-NkicK6PAfEQ0llKQSYYe8Rvg-0nTPy_-kvEIL0dOJwFxt0fNlbECQ-No9V8lPAshfDNoiB7e8TUeZKY8ypFpslhW20X8dmj-rRHc"
                                />
                            </div>
                            <span className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500"></span>
                        </div>
                        <h4 className="mb-1 text-sm font-extrabold text-zinc-950">
                            Muhammad
                        </h4>
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold text-blue-700">
                            Gold Member
                        </span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-zinc-200/30 bg-slate-50 p-4 text-center">
                            <p className="text-[9px] font-bold text-zinc-400 uppercase">
                                Total Points
                            </p>
                            <p className="mt-1 text-base font-black text-[#004ac6]">
                                4,250
                            </p>
                        </div>
                        <div className="rounded-2xl border border-zinc-200/30 bg-slate-50 p-4 text-center">
                            <p className="text-[9px] font-bold text-zinc-400 uppercase">
                                SHU 2023
                            </p>
                            <p className="mt-1 text-base font-black text-emerald-700">
                                Rp1.2M
                            </p>
                        </div>
                    </div>

                    {/* Member Details */}
                    <div className="bento-card space-y-4 border border-zinc-200/50 p-5 shadow-sm">
                        <h4 className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                            Detail Anggota
                        </h4>

                        <div className="flex items-start gap-3 border-b border-zinc-50 pb-3 text-xs">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#004ac6]">
                                <span className="material-symbols-outlined text-[18px]">
                                    corporate_fare
                                </span>
                            </div>
                            <div>
                                <p className="text-[10px] font-semibold text-zinc-400">
                                    Koperasi Saat Ini
                                </p>
                                <p className="mt-0.5 font-bold text-zinc-800">
                                    Koperasi Green Life
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 text-xs">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                <span className="material-symbols-outlined text-[18px]">
                                    calendar_today
                                </span>
                            </div>
                            <div>
                                <p className="text-[10px] font-semibold text-zinc-400">
                                    Acara Mendatang
                                </p>
                                <p className="mt-0.5 font-bold text-zinc-800">
                                    Digital RAT
                                </p>
                                <p className="mt-0.5 text-[10px] font-bold text-blue-600">
                                    24 Okt, 09:00
                                </p>
                            </div>
                        </div>

                        <button
                            className="mt-2 w-full rounded-xl bg-[#e5eeff]/80 py-3 text-xs font-bold text-[#004ac6] transition-all hover:bg-[#e5eeff]"
                            onClick={() =>
                                showToast('Modal profil lengkap dibuka.')
                            }
                        >
                            Lihat Profil Lengkap
                        </button>
                    </div>

                    {/* AI Insight Card */}
                    <div className="bento-card relative overflow-hidden border border-zinc-200/50 bg-gradient-to-br from-blue-50 to-blue-50 p-5 shadow-sm">
                        <div className="relative z-10">
                            <div className="mb-3 flex items-center gap-2 text-xs font-bold text-[#004ac6]">
                                <span
                                    className="material-symbols-outlined text-[18px]"
                                    style={{
                                        fontVariationSettings: "'FILL' 1",
                                    }}
                                >
                                    auto_awesome
                                </span>
                                <span>Wawasan AI</span>
                            </div>
                            <p className="text-xs leading-relaxed font-semibold text-zinc-700">
                                Anda tinggal{' '}
                                <strong className="font-bold text-primary">
                                    750 poin
                                </strong>{' '}
                                lagi menuju{' '}
                                <strong className="font-bold text-[#004ac6]">
                                    Tingkat Platinum
                                </strong>
                                . Membeli 2 karung lagi Beras Premium akan
                                membuka diskon eksklusif.
                            </p>
                        </div>
                    </div>
                </aside>
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
