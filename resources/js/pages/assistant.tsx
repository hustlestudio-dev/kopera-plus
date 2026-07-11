import { Head, Link, usePage } from '@inertiajs/react';
import {
    Search,
    ShoppingCart,
    Trash2,
    CheckCircle,
    Bell,
    Settings,
    Plus,
    Send,
} from 'lucide-react';
import React, { useState } from 'react';

interface Message {
    sender: 'user' | 'ai';
    text: string;
    showCard?: boolean;
}

interface CartItem {
    id: number;
    name: string;
    price: number;
    qty: number;
}

export default function Assistant() {
    const { auth } = usePage().props as unknown as { auth: { user?: { name?: string } } };
    const userName = auth.user?.name || 'Anggota';

    const [messages, setMessages] = useState<Message[]>([
        {
            sender: 'ai',
            text: 'Selamat datang di Asisten Komersial AI. Ceritakan kebutuhan Anda dan saya akan mencarikannya dari koperasi terdekat.',
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVisible, setToastVisible] = useState(false);

    const [cart, setCart] = useState<CartItem[]>([]);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setToastVisible(true);
        setTimeout(() => {
            setToastVisible(false);
        }, 3000);
    };

    const handleSend = (textToSend = input) => {
        if (!textToSend.trim()) {
            return;
        }

        const newMsg: Message = { sender: 'user', text: textToSend };
        setMessages((prev) => [...prev, newMsg]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            const aiMsg: Message = {
                sender: 'ai',
                text: `Saya telah mencatat permintaan Anda "${textToSend}". Saya akan mengambil data katalog dari koperasi terdekat.`,
            };
            setMessages((prev) => [...prev, aiMsg]);
            showToast('AI memperbarui hasil pencarian!');
        }, 1500);
    };

    const addToCart = (item: { name: string; price: number }) => {
        const existing = cart.find((c) => c.name === item.name);

        if (existing) {
            setCart((prev) =>
                prev.map((c) =>
                    c.name === item.name ? { ...c, qty: c.qty + 1 } : c,
                ),
            );
        } else {
            setCart((prev) => [
                ...prev,
                { id: Date.now(), name: item.name, price: item.price, qty: 1 },
            ]);
        }

        showToast('Ditambahkan ke keranjang!');
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((c) => c.id !== id));
        showToast('Item dihapus dari keranjang.');
    };

    const subtotal = cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
    const discount = Math.round(subtotal * 0.1);
    const total = subtotal - discount;

    return (
        <>
            <Head title="Asisten Komersial AI | KOPERA-PLUS" />

            <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-[#0b1c30] antialiased">
                {/* Sidebar Kiri */}
                <aside className="fixed top-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-zinc-200/80 bg-white py-8">
                    <div className="mb-10 flex flex-col px-6">
                        <span className="font-headline-md text-headline-md leading-none font-extrabold text-primary">
                            KOPERA-PLUS
                        </span>
                        <span className="mt-1 font-label-sm text-xs text-on-surface-variant opacity-70">
                            Asisten AI Premium
                        </span>
                    </div>
                    <nav className="flex-1 space-y-1 px-3">
                        <Link
                            className="flex items-center gap-3 rounded-xl px-4 py-3 font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-slate-100"
                            href="/workspace"
                        >
                            <span className="material-symbols-outlined">
                                smart_toy
                            </span>
                            Asisten AI
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-xl bg-primary/10 px-4 py-3 font-label-md text-label-md font-bold text-primary"
                            href="/assistant"
                        >
                            <span
                                className="material-symbols-outlined active-pill"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                shopping_cart
                            </span>
                            Komersial AI
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-xl px-4 py-3 font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-slate-100"
                            href="/workspace"
                        >
                            <span className="material-symbols-outlined">
                                redeem
                            </span>
                            Hadiah
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-xl px-4 py-3 font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-slate-100"
                            href="/workspace"
                        >
                            <span className="material-symbols-outlined">
                                groups
                            </span>
                            Komunitas
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-xl px-4 py-3 font-label-md text-label-md text-on-surface-variant transition-colors hover:bg-slate-100"
                            href="/workspace"
                        >
                            <span className="material-symbols-outlined">
                                monitoring
                            </span>
                            e-RAT
                        </Link>
                    </nav>
                </aside>

                {/* Area Konten Utama */}
                <main className="relative ml-64 flex h-screen flex-1 flex-col overflow-hidden bg-slate-50">
                    {/* Bilah Navigasi Atas */}
                    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-zinc-200/50 bg-white/80 px-8 backdrop-blur-md">
                        <div className="flex items-center gap-6">
                            <div className="relative w-80">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                                <input
                                    className="w-full rounded-full border-none bg-slate-100 py-2 pr-4 pl-10 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="Cari operasi..."
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 font-label-md text-sm text-label-md font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                                onClick={() => {
                                    setMessages([
                                        {
                                            sender: 'ai',
                                            text: 'Sesi belanja baru dimulai. Produk apa yang ingin Anda cari?',
                                        },
                                    ]);
                                    showToast('Sesi baru dimulai.');
                                }}
                            >
                                <Plus className="h-4 w-4" />
                                Sesi Baru
                            </button>
                            <div className="flex items-center gap-2">
                                <button className="rounded-full p-2 transition-colors hover:bg-slate-100">
                                    <Bell className="h-5 w-5 text-zinc-600" />
                                </button>
                                <button className="rounded-full p-2 transition-colors hover:bg-slate-100">
                                    <Settings className="h-5 w-5 text-zinc-600" />
                                </button>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary/10 text-sm font-bold text-primary">
                                {userName.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </header>

                    {/* Konten (Dapat Digulir) */}
                    <div className="flex flex-1 gap-6 overflow-y-auto px-8 py-8">
                        {/* Kolom Percakapan Kiri */}
                        <div className="flex max-w-4xl flex-1 flex-col justify-between overflow-hidden rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
                            {/* Judul Chat */}
                            <div className="space-y-2 border-b border-zinc-100 pb-4 text-center">
                                <h1 className="font-display-sm flex items-center justify-center gap-2 text-2xl font-bold text-on-surface">
                                    Asisten Komersial AI{' '}
                                    <ShoppingCart className="h-6 w-6 text-primary" />
                                </h1>
                                <p className="font-body-lg text-sm text-zinc-500">
                                    Ceritakan kebutuhan Anda ke AI dan kami akan
                                    mencarikannya dari koperasi tepercaya.
                                </p>
                            </div>

                            {/* Riwayat Chat */}
                            <div className="custom-scrollbar my-6 flex-grow space-y-6 overflow-y-auto pr-2">
                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} gap-3`}
                                    >
                                        {msg.sender === 'ai' && (
                                            <div className="ai-gradient-bg flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm">
                                                AI
                                            </div>
                                        )}
                                        <div className="max-w-[80%] flex-1 space-y-4">
                                            <div
                                                className={`rounded-2xl p-5 ${
                                                    msg.sender === 'user'
                                                        ? 'ml-auto w-fit rounded-tr-none bg-primary text-white'
                                                        : 'rounded-tl-none bg-slate-100 text-on-surface'
                                                } text-sm font-medium shadow-sm`}
                                            >
                                                {msg.text}
                                            </div>

                                            {msg.showCard && (
                                                <div className="bento-card overflow-hidden border border-zinc-200/50 p-6 shadow-md">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-xs text-zinc-400">
                                                                Produk rekomendasi akan muncul di sini
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {isTyping && (
                                    <div className="flex gap-4">
                                        <div className="ai-gradient-bg flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                                            AI
                                        </div>
                                        <div className="flex w-fit items-center gap-2 rounded-full rounded-tl-none bg-slate-100 px-4 py-3.5 text-zinc-400">
                                            <span className="text-xs">
                                                AI sedang memproses
                                            </span>
                                            <div className="flex gap-1">
                                                <div className="streaming-dot h-1.5 w-1.5 rounded-full bg-primary"></div>
                                                <div className="streaming-dot h-1.5 w-1.5 rounded-full bg-primary"></div>
                                                <div className="streaming-dot h-1.5 w-1.5 rounded-full bg-primary"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Bidang Input Chat */}
                            <div className="space-y-4 border-t border-zinc-100 pt-4">
                                <div className="flex items-center gap-2 overflow-x-auto pb-1 select-none">
                                    {[
                                        'Beli Beras Organik',
                                        'Minta Pupuk',
                                        'Promo Terbaik Hari Ini',
                                        'Alat Tani Lokal',
                                    ].map((pill, pIdx) => (
                                        <button
                                            key={pIdx}
                                            onClick={() => handleSend(pill)}
                                            className="rounded-full border border-zinc-200 px-4 py-1.5 text-xs whitespace-nowrap text-zinc-600 transition-colors hover:bg-slate-50"
                                        >
                                            {pill}
                                        </button>
                                    ))}
                                </div>
                                <div className="glass-input flex items-center gap-3 rounded-2xl border border-zinc-200/60 bg-white p-1.5 shadow-lg transition-all focus-within:ring-2 focus-within:ring-primary/20">
                                    <input
                                        className="flex-grow border-none bg-transparent px-4 py-3 text-sm text-zinc-800 outline-none focus:ring-0"
                                        placeholder='Tanyakan apa pun: "Saya butuh beras dan pupuk organik"'
                                        type="text"
                                        value={input}
                                        onChange={(e) =>
                                            setInput(e.target.value)
                                        }
                                        onKeyDown={(e) =>
                                            e.key === 'Enter' && handleSend()
                                        }
                                    />
                                    <button
                                        onClick={() => handleSend()}
                                        className="ai-gradient-bg flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-md transition-transform active:scale-95"
                                    >
                                        <Send className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Kolom Ringkasan Kanan */}
                        <aside className="w-80 flex-shrink-0 space-y-6">
                            {/* Kartu Status Anggota */}
                            <div className="bento-card bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white shadow-xl">
                                <div className="mb-6 flex items-start justify-between">
                                    <div>
                                        <div className="mb-1 text-xs font-semibold tracking-wider uppercase opacity-80">
                                            Level Anggota
                                        </div>
                                        <div className="font-headline-sm text-lg font-bold">
                                            Anggota
                                        </div>
                                    </div>
                                    <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                                        <span className="material-symbols-outlined text-white">
                                            workspace_premium
                                        </span>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="text-3xl font-black">
                                        0
                                    </div>
                                    <div className="mt-1 text-xs opacity-80">
                                        Poin Tersedia
                                    </div>
                                </div>
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                                    <div
                                        className="h-full bg-white"
                                        style={{ width: '0%' }}
                                    ></div>
                                </div>
                            </div>

                            {/* Ringkasan Keranjang Belanja */}
                            <div className="bento-card border border-zinc-100 p-6 shadow-sm">
                                <h3 className="mb-4 flex items-center gap-2 font-headline-sm text-base font-bold">
                                    Keranjang Saat Ini{' '}
                                    <ShoppingCart className="h-4 w-4 text-zinc-500" />
                                </h3>

                                {cart.length === 0 ? (
                                    <div className="py-8 text-center text-xs text-zinc-400">
                                        Keranjang Anda kosong. Tambahkan item
                                        dari percakapan AI untuk memulai.
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-6 max-h-48 space-y-4 overflow-y-auto pr-1">
                                            {cart.map((c) => (
                                                <div
                                                    key={c.id}
                                                    className="flex items-start justify-between border-b border-zinc-50 pb-2 text-xs"
                                                >
                                                    <div>
                                                        <span className="font-semibold text-zinc-800">
                                                            {c.name}
                                                        </span>
                                                        <div className="mt-0.5 text-[10px] text-zinc-400">
                                                            Jumlah: {c.qty} x Rp
                                                            {c.price.toLocaleString('id-ID')}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="font-bold text-zinc-700">
                                                            Rp
                                                            {(
                                                                c.price * c.qty
                                                            ).toLocaleString('id-ID')}
                                                        </span>
                                                        <button
                                                            onClick={() =>
                                                                removeFromCart(
                                                                    c.id,
                                                                )
                                                            }
                                                            className="text-red-400 transition-colors hover:text-red-600"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="space-y-2 border-t border-zinc-100 pt-4 text-xs">
                                            <div className="flex justify-between text-zinc-500">
                                                <span>Subtotal</span>
                                                <span>
                                                    Rp
                                                    {subtotal.toLocaleString('id-ID')}
                                                </span>
                                            </div>
                                            <div className="flex justify-between font-medium text-[#006229]">
                                                <span>
                                                    Diskon Anggota (10%)
                                                </span>
                                                <span>
                                                    -Rp
                                                    {discount.toLocaleString('id-ID')}
                                                </span>
                                            </div>
                                            <div className="mt-2 flex justify-between border-t border-dashed border-zinc-100 pt-2 text-base font-bold text-zinc-900">
                                                <span>Total</span>
                                                <span className="text-primary">
                                                    Rp{total.toLocaleString('id-ID')}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setCart([]);
                                                showToast(
                                                    'Checkout selesai!',
                                                );
                                            }}
                                            className="hover:bg-opacity-95 mt-4 w-full rounded-xl bg-primary py-3 text-center font-label-md text-sm font-semibold text-white transition-all active:scale-95"
                                        >
                                            Bayar
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Pesanan Terbaru */}
                            <div className="bento-card border border-zinc-100 p-6 shadow-sm">
                                <h3 className="mb-4 font-headline-sm text-sm font-bold">
                                    Pesanan Koperasi Terbaru
                                </h3>
                                <div className="flex flex-col items-center justify-center py-6 text-center">
                                    <span className="material-symbols-outlined mb-2 text-3xl text-zinc-300">
                                        receipt_long
                                    </span>
                                    <p className="text-xs text-zinc-400">
                                        Belum ada pesanan
                                    </p>
                                </div>
                            </div>
                        </aside>
                    </div>
                </main>
            </div>

            {/* Toast Notifikasi */}
            <div
                className={`pointer-events-none fixed bottom-8 left-1/2 z-[9999] flex -translate-x-1/2 items-center gap-3 rounded-full bg-zinc-900 px-6 py-3.5 text-white shadow-2xl transition-all duration-500 ${
                    toastVisible
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-10 opacity-0'
                }`}
            >
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <span className="text-xs font-semibold">{toastMessage}</span>
            </div>
        </>
    );
}
