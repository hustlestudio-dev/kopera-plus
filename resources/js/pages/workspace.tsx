import { Head, Link, usePage } from '@inertiajs/react';
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

interface Message {
    sender: 'user' | 'ai';
    text: string;
    showCard?: boolean;
}

export default function Workspace() {
    const { auth } = usePage().props as unknown as { auth: { user?: { name?: string } } };
    const userName = auth.user?.name || 'Anggota';

    const [messages, setMessages] = useState<Message[]>([
        {
            sender: 'ai',
            text: 'Selamat datang! Ada yang bisa saya bantu terkait koperasi Anda hari ini?',
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
                {/* Sidebar Kiri */}
                <aside className="fixed top-0 left-0 z-50 flex h-screen w-64 flex-col justify-between border-r border-zinc-200/60 bg-white p-6 shadow-sm">
                    <div>
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
                                    Tata Kelola Berbasis AI
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setMessages([
                                    {
                                        sender: 'ai',
                                        text: 'Obrolan baru dimulai. Apa yang ingin Anda lakukan hari ini?',
                                    },
                                ]);
                                showToast('Sesi baru dimulai.');
                            }}
                            className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#004ac6] py-3 text-xs font-bold text-white shadow-md transition-all hover:brightness-105 active:scale-95"
                        >
                            <Plus className="h-4 w-4" /> Obrolan Baru
                        </button>

                        <div className="relative mb-6">
                            <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
                            <input
                                className="w-full rounded-xl border border-zinc-200/50 bg-slate-50 py-2.5 pr-3 pl-9 text-xs text-zinc-700 outline-none focus:ring-1 focus:ring-primary/20"
                                placeholder="Cari riwayat..."
                                type="text"
                            />
                        </div>

                        <div>
                            <p className="mb-3 text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                                Percakapan Terbaru
                            </p>
                            <nav className="space-y-1">
                                <button className="flex w-full items-center gap-3 rounded-xl bg-[#004ac6]/10 px-4 py-3 text-left text-xs font-bold text-[#004ac6]">
                                    <span className="material-symbols-outlined text-[18px]">
                                        smart_toy
                                    </span>
                                    <span>Asisten Umum</span>
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
                            <span>Dasbor</span>
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

                {/* Panel Chat */}
                <main className="relative mr-80 ml-64 flex h-screen flex-grow flex-col justify-between border-r border-zinc-200/50 bg-slate-50">
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
                            <div className="ml-1 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-primary/10 text-xs font-bold text-primary">
                                {userName.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </header>

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

                    {/* Area Input */}
                    <div className="absolute bottom-0 left-0 z-40 w-full shrink-0 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent p-6">
                        <div className="mx-auto max-w-3xl">
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

                {/* Panel Konteks Kanan */}
                <aside className="custom-scrollbar fixed top-0 right-0 z-50 flex h-screen w-80 flex-col gap-6 overflow-y-auto border-l border-zinc-200/60 bg-white p-6">
                    <div className="bento-card flex flex-col items-center border border-zinc-200/50 p-5 text-center shadow-sm">
                        <div className="relative mb-4 h-16 w-16">
                            <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-emerald-500 bg-primary/10 text-lg font-bold text-primary">
                                {userName.charAt(0).toUpperCase()}
                            </div>
                            <span className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500"></span>
                        </div>
                        <h4 className="mb-1 text-sm font-extrabold text-zinc-950">
                            {userName}
                        </h4>
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold text-blue-700">
                            Anggota
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-2xl border border-zinc-200/30 bg-slate-50 p-4 text-center">
                            <p className="text-[9px] font-bold text-zinc-400 uppercase">
                                Total Poin
                            </p>
                            <p className="mt-1 text-base font-black text-[#004ac6]">
                                0
                            </p>
                        </div>
                        <div className="rounded-2xl border border-zinc-200/30 bg-slate-50 p-4 text-center">
                            <p className="text-[9px] font-bold text-zinc-400 uppercase">
                                SHU
                            </p>
                            <p className="mt-1 text-base font-black text-emerald-700">
                                Rp0
                            </p>
                        </div>
                    </div>

                    <div className="bento-card space-y-4 border border-zinc-200/50 p-5 shadow-sm">
                        <h4 className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                            Detail Anggota
                        </h4>

                        <div className="flex items-start gap-3 text-xs">
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
                                    Koperasi Anda
                                </p>
                            </div>
                        </div>
                    </div>

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
                                Mulai bertransaksi di koperasi untuk mengumpulkan poin dan mendapatkan manfaat anggota.
                            </p>
                        </div>
                    </div>
                </aside>
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
