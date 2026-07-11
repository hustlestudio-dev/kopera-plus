import { Head, Link } from '@inertiajs/react';
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
import PrototypeHud from '@/components/PrototypeHud';

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
    const [messages, setMessages] = useState<Message[]>([
        {
            sender: 'user',
            text: 'Saya mencari beras organik berkualitas tinggi untuk keluarga saya.',
        },
        {
            sender: 'ai',
            text: 'Saya telah menganalisis stok yang tersedia di 3 koperasi terdekat. Berdasarkan ukuran keluarga dan preferensi kesehatan Anda sebelumnya, saya merekomendasikan Premium Mentik Susu dari Koperasi Tani Sejahtera.',
            showCard: true,
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVisible, setToastVisible] = useState(false);

    const [cart, setCart] = useState<CartItem[]>([
        { id: 1, name: 'Organic Fertilizer (2L)', price: 120000, qty: 1 },
        { id: 2, name: 'Garden Shears', price: 45000, qty: 1 },
    ]);

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

        // Add user message
        const newMsg: Message = { sender: 'user', text: textToSend };
        setMessages((prev) => [...prev, newMsg]);
        setInput('');
        setIsTyping(true);

        // Simulated AI response
        setTimeout(() => {
            setIsTyping(false);
            const aiMsg: Message = {
                sender: 'ai',
                text: `I've registered your request for "${textToSend}". I will query the catalog databases of local cooperatives for optimal pricing, eco-ratings, and shipping routes.`,
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

        showToast(
            'Item ditambahkan ke keranjang! AI mengoptimalkan rute pengiriman...',
        );
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
                {/* Left Sidebar */}
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
                            href="/explorer-dashboard"
                        >
                            <span className="material-symbols-outlined">
                                storefront
                            </span>
                            Pasar
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
                            Digital RAT
                        </Link>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="relative ml-64 flex h-screen flex-1 flex-col overflow-hidden bg-slate-50">
                    {/* TopNavBar */}
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
                            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-slate-200">
                                <img
                                    className="h-full w-full object-cover"
                                    alt="Member profile picture"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIMjOFNDBVynLh3HdvXhsBc0xx6Bm_3tVpzOnhVoi8zWQZA5F-G6q8QFB8EoNTVoRqSor5EB7B8e-YBdI6GPt_MPAqdnO54z2km593WIMTFD2jgAwHTV8m3kdp89ojd_B3fD-Asx8iOAB9OXXH1NRP-Cx7NrbmOyj3BoJD940Yg7lkYvSkoURDMRFouHPVF_N7qHwhQ9AhFPhkK9FMLfJqLS9LhhD6XC4ygnP9vld2cuorEZHDDhBDLNpwyYJ8663gDMHTC0dxKvg"
                                />
                            </div>
                        </div>
                    </header>

                    {/* Content (Scrollable) */}
                    <div className="flex flex-1 gap-6 overflow-y-auto px-8 py-8">
                        {/* Left Conversation Column */}
                        <div className="flex max-w-4xl flex-1 flex-col justify-between overflow-hidden rounded-3xl border border-zinc-100 bg-white p-6 shadow-sm">
                            {/* Chat Header */}
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

                            {/* Chat History */}
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
                                                /* Product Audit Card */
                                                <div className="bento-card grid grid-cols-1 overflow-hidden border border-zinc-200/50 shadow-md md:grid-cols-5">
                                                    <div className="group relative min-h-[160px] overflow-hidden md:col-span-2">
                                                        <img
                                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                            alt="Mentik Susu grains"
                                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKqUnFQTbpl1Naff5rKVHJqk1vJ36qhSRN9XaBYGM6ywiLTvq45r8afpUX_J2seh9A_XQLua7SCX4_efCtzsPKxrKfAyAKrPKSy2OBVgSy5Yw2R-BrsRjjgZmVeG6LdstJPQD1AImumELFfjSAp3VfbpXZMvVnD6dN7TrcDvhwUmgUm0v6kI0-qx4UMyyzH-j3E4V_LvN-_MYmrpqjhx1wRHUEwSGIc20zznq7__D-UuOi4jirNarGjlsnEIFC_Q-Sf7hSyKMVPS0"
                                                        />
                                                        <div className="absolute top-3 left-3 flex items-center gap-1 rounded bg-[#006229] px-2 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
                                                            <span className="material-symbols-outlined text-[12px]">
                                                                verified
                                                            </span>
                                                            Stok Terverifikasi
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col justify-between p-6 md:col-span-3">
                                                        <div>
                                                            <div className="mb-2 flex items-start justify-between">
                                                                <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                                                                    Premium
                                                                    Mentik Susu
                                                                    (5kg)
                                                                </h3>
                                                                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                                                                    Kecocokan
                                                                    98%
                                                                </span>
                                                            </div>
                                                            <div className="mb-4 flex items-center gap-2">
                                                                <span className="text-lg font-bold text-[#006229]">
                                                                    Rp85.000
                                                                </span>
                                                                <span className="text-xs text-zinc-400">
                                                                    Harga
                                                                    Anggota
                                                                    Koperasi
                                                                </span>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-2 text-xs text-zinc-500">
                                                                <div className="flex items-center gap-1.5">
                                                                    <span className="material-symbols-outlined text-[16px]">
                                                                        inventory_2
                                                                    </span>
                                                                    <span>
                                                                        Tersisa
                                                                        42
                                                                        karung
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-1.5">
                                                                    <span className="material-symbols-outlined text-[16px]">
                                                                        near_me
                                                                    </span>
                                                                    <span>
                                                                        Jarak 2
                                                                        km
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-6 flex gap-3">
                                                            <button
                                                                onClick={() =>
                                                                    addToCart({
                                                                        name: 'Premium Mentik Susu (5kg)',
                                                                        price: 85000,
                                                                    })
                                                                }
                                                                className="flex-1 rounded-xl bg-primary py-2.5 font-label-md text-sm font-semibold text-white transition-all hover:shadow-lg active:scale-95"
                                                            >
                                                                Tambah ke
                                                                Keranjang
                                                            </button>
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
                                                Mengoptimalkan basis data stok
                                                koperasi
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

                            {/* Chat Input Field */}
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

                        {/* Right Summary Column */}
                        <aside className="w-80 flex-shrink-0 space-y-6">
                            {/* Member Status card */}
                            <div className="bento-card bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white shadow-xl">
                                <div className="mb-6 flex items-start justify-between">
                                    <div>
                                        <div className="mb-1 text-xs font-semibold tracking-wider uppercase opacity-80">
                                            Level Anggota
                                        </div>
                                        <div className="font-headline-sm text-lg font-bold">
                                            Anggota Gold
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
                                        4,250
                                    </div>
                                    <div className="mt-1 text-xs opacity-80">
                                        Poin Tersedia
                                    </div>
                                </div>
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                                    <div
                                        className="h-full bg-white"
                                        style={{ width: '75%' }}
                                    ></div>
                                </div>
                            </div>

                            {/* Shopping Cart Summary */}
                            <div className="bento-card border border-zinc-100 p-6 shadow-sm">
                                <h3 className="mb-4 flex items-center gap-2 font-headline-sm text-base font-bold">
                                    Keranjang Saat Ini{' '}
                                    <ShoppingCart className="h-4 w-4 text-zinc-500" />
                                </h3>

                                {cart.length === 0 ? (
                                    <div className="py-8 text-center text-xs text-zinc-400">
                                        Keranjang Anda kosong. Tambahkan item
                                        koperasi terverifikasi untuk memulai.
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
                                                            Jumlah: {c.qty} × Rp
                                                            {c.price.toLocaleString()}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="font-bold text-zinc-700">
                                                            Rp
                                                            {(
                                                                c.price * c.qty
                                                            ).toLocaleString()}
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
                                                    {subtotal.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex justify-between font-medium text-[#006229]">
                                                <span>
                                                    Diskon Anggota (10%)
                                                </span>
                                                <span>
                                                    -Rp
                                                    {discount.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="mt-2 flex justify-between border-t border-dashed border-zinc-100 pt-2 text-base font-bold text-zinc-900">
                                                <span>Total</span>
                                                <span className="text-primary">
                                                    Rp{total.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setCart([]);
                                                showToast(
                                                    'Checkout selesai! AI mengirimkan pengiriman di hari yang sama.',
                                                );
                                            }}
                                            className="hover:bg-opacity-95 mt-4 w-full rounded-xl bg-primary py-3 text-center font-label-md text-sm font-semibold text-white transition-all active:scale-95"
                                        >
                                            Bayar
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Recent Purchases */}
                            <div className="bento-card border border-zinc-100 p-6 shadow-sm">
                                <h3 className="mb-4 font-headline-sm text-sm font-bold">
                                    Pesanan Koperasi Terbaru
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-xs">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-[#006229]">
                                            <span className="material-symbols-outlined text-sm">
                                                agriculture
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold">
                                                Seedling Starter Kit
                                            </div>
                                            <div className="text-[10px] text-zinc-400">
                                                Oct 12, 2024
                                            </div>
                                        </div>
                                        <div className="font-bold text-zinc-700">
                                            Rp85k
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-primary">
                                            <span className="material-symbols-outlined text-sm">
                                                water_drop
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold">
                                                Drip Irrigation Set
                                            </div>
                                            <div className="text-[10px] text-zinc-400">
                                                Oct 05, 2024
                                            </div>
                                        </div>
                                        <div className="font-bold text-zinc-700">
                                            Rp450k
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </main>
            </div>

            {/* Notification Toast */}
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

            <PrototypeHud />
        </>
    );
}
