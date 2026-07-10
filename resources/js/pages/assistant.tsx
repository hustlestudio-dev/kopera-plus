import { Head, Link } from '@inertiajs/react';
import { Search, ShoppingCart, Trash2, CheckCircle, Bell, Settings, Plus, Send } from 'lucide-react';
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
        { sender: 'user', text: 'Saya mencari beras organik berkualitas tinggi untuk keluarga saya.' },
        { 
            sender: 'ai', 
            text: 'Saya telah menganalisis stok yang tersedia di 3 koperasi terdekat. Berdasarkan ukuran keluarga dan preferensi kesehatan Anda sebelumnya, saya merekomendasikan Premium Mentik Susu dari Koperasi Tani Sejahtera.',
            showCard: true
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVisible, setToastVisible] = useState(false);

    const [cart, setCart] = useState<CartItem[]>([
        { id: 1, name: 'Organic Fertilizer (2L)', price: 120000, qty: 1 },
        { id: 2, name: 'Garden Shears', price: 45000, qty: 1 }
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
        setMessages(prev => [...prev, newMsg]);
        setInput('');
        setIsTyping(true);

        // Simulated AI response
        setTimeout(() => {
            setIsTyping(false);
            const aiMsg: Message = {
                sender: 'ai',
                text: `I've registered your request for "${textToSend}". I will query the catalog databases of local cooperatives for optimal pricing, eco-ratings, and shipping routes.`
            };
            setMessages(prev => [...prev, aiMsg]);
            showToast('AI memperbarui hasil pencarian!');
        }, 1500);
    };

    const addToCart = (item: { name: string; price: number }) => {
        const existing = cart.find(c => c.name === item.name);

        if (existing) {
            setCart(prev => prev.map(c => c.name === item.name ? { ...c, qty: c.qty + 1 } : c));
        } else {
            setCart(prev => [...prev, { id: Date.now(), name: item.name, price: item.price, qty: 1 }]);
        }

        showToast('Item ditambahkan ke keranjang! AI mengoptimalkan rute pengiriman...');
    };

    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(c => c.id !== id));
        showToast('Item dihapus dari keranjang.');
    };

    const subtotal = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
    const discount = Math.round(subtotal * 0.1);
    const total = subtotal - discount;

    return (
        <>
            <Head title="Asisten Komersial AI | KOPERA-PLUS" />

            <div className="flex bg-slate-50 font-sans antialiased text-[#0b1c30] h-screen overflow-hidden">
                {/* Left Sidebar */}
                <aside className="h-screen w-64 fixed left-0 top-0 flex flex-col bg-white border-r border-zinc-200/80 py-8 z-50">
                    <div className="px-6 mb-10 flex flex-col">
                        <span className="font-headline-md text-headline-md font-extrabold text-primary leading-none">KOPERA-PLUS</span>
                        <span className="font-label-sm text-on-surface-variant opacity-70 text-xs mt-1">Asisten AI Premium</span>
                    </div>
                    <nav className="flex-1 px-3 space-y-1">
                        <Link className="flex items-center gap-3 px-4 py-3 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-slate-100 transition-colors" href="/workspace">
                            <span className="material-symbols-outlined">dashboard</span>
                            Dashboard
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-slate-100 transition-colors" href="/workspace">
                            <span className="material-symbols-outlined">smart_toy</span>
                            Asisten AI
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 rounded-xl font-label-md text-label-md text-primary font-bold bg-primary/10" href="/assistant">
                            <span className="material-symbols-outlined active-pill" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_cart</span>
                            Komersial AI
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-slate-100 transition-colors" href="/explorer-dashboard">
                            <span className="material-symbols-outlined">storefront</span>
                            Pasar
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-slate-100 transition-colors" href="/workspace">
                            <span className="material-symbols-outlined">redeem</span>
                            Hadiah
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-slate-100 transition-colors" href="/workspace">
                            <span className="material-symbols-outlined">groups</span>
                            Komunitas
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 rounded-xl font-label-md text-label-md text-on-surface-variant hover:bg-slate-100 transition-colors" href="/workspace">
                            <span className="material-symbols-outlined">monitoring</span>
                            Digital RAT
                        </Link>
                    </nav>
                    <div className="px-4 mt-auto">
                        <button className="w-full ai-gradient-bg text-white font-label-md text-label-md py-3 rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-transform" onClick={() => showToast("Upgrade to Pro feature unlocked!")}>
                            Upgrade ke Pro
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="ml-64 flex-1 flex flex-col h-screen overflow-hidden bg-slate-50 relative">
                    {/* TopNavBar */}
                    <header className="h-16 sticky top-0 z-40 w-full flex justify-between items-center px-8 bg-white/80 backdrop-blur-md border-b border-zinc-200/50">
                        <div className="flex items-center gap-6">
                            <div className="relative w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 h-4 w-4" />
                                <input className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Cari operasi..." type="text"/>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="bg-primary text-white px-5 py-2 rounded-full font-label-md text-label-md flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all text-sm font-semibold" onClick={() => {
 setMessages([{ sender: 'ai', text: 'Sesi belanja baru dimulai. Produk apa yang ingin Anda cari?' }]); showToast('Sesi baru dimulai.'); 
}}>
                                <Plus className="h-4 w-4" />
                                Sesi Baru
                            </button>
                            <div className="flex items-center gap-2">
                                <button className="p-2 rounded-full hover:bg-slate-100 transition-colors"><Bell className="h-5 w-5 text-zinc-600" /></button>
                                <button className="p-2 rounded-full hover:bg-slate-100 transition-colors"><Settings className="h-5 w-5 text-zinc-600" /></button>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white">
                                <img className="w-full h-full object-cover" alt="Member profile picture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIMjOFNDBVynLh3HdvXhsBc0xx6Bm_3tVpzOnhVoi8zWQZA5F-G6q8QFB8EoNTVoRqSor5EB7B8e-YBdI6GPt_MPAqdnO54z2km593WIMTFD2jgAwHTV8m3kdp89ojd_B3fD-Asx8iOAB9OXXH1NRP-Cx7NrbmOyj3BoJD940Yg7lkYvSkoURDMRFouHPVF_N7qHwhQ9AhFPhkK9FMLfJqLS9LhhD6XC4ygnP9vld2cuorEZHDDhBDLNpwyYJ8663gDMHTC0dxKvg" />
                            </div>
                        </div>
                    </header>

                    {/* Content (Scrollable) */}
                    <div className="flex-1 overflow-y-auto px-8 py-8 flex gap-6">
                        {/* Left Conversation Column */}
                        <div className="flex-1 flex flex-col justify-between max-w-4xl bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 overflow-hidden">
                            {/* Chat Header */}
                            <div className="text-center space-y-2 border-b border-zinc-100 pb-4">
                                <h1 className="font-display-sm text-2xl font-bold text-on-surface flex items-center justify-center gap-2">
                                    Asisten Komersial AI <ShoppingCart className="h-6 w-6 text-primary" />
                                </h1>
                                <p className="font-body-lg text-sm text-zinc-500">Ceritakan kebutuhan Anda ke AI dan kami akan mencarikannya dari koperasi tepercaya.</p>
                            </div>

                            {/* Chat History */}
                            <div className="flex-grow overflow-y-auto my-6 space-y-6 pr-2 custom-scrollbar">
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} gap-3`}>
                                        {msg.sender === 'ai' && (
                                            <div className="w-10 h-10 rounded-full ai-gradient-bg flex items-center justify-center flex-shrink-0 text-white shadow-sm font-bold text-xs">
                                                AI
                                            </div>
                                        )}
                                        <div className="flex-1 max-w-[80%] space-y-4">
                                            <div className={`p-5 rounded-2xl ${
                                                msg.sender === 'user' 
                                                    ? 'bg-primary text-white rounded-tr-none ml-auto w-fit' 
                                                    : 'bg-slate-100 text-on-surface rounded-tl-none'
                                            } shadow-sm text-sm font-medium`}>
                                                {msg.text}
                                            </div>

                                            {msg.showCard && (
                                                /* Product Audit Card */
                                                <div className="bento-card overflow-hidden grid grid-cols-1 md:grid-cols-5 border border-zinc-200/50 shadow-md">
                                                    <div className="md:col-span-2 relative overflow-hidden group min-h-[160px]">
                                                        <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Mentik Susu grains" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKqUnFQTbpl1Naff5rKVHJqk1vJ36qhSRN9XaBYGM6ywiLTvq45r8afpUX_J2seh9A_XQLua7SCX4_efCtzsPKxrKfAyAKrPKSy2OBVgSy5Yw2R-BrsRjjgZmVeG6LdstJPQD1AImumELFfjSAp3VfbpXZMvVnD6dN7TrcDvhwUmgUm0v6kI0-qx4UMyyzH-j3E4V_LvN-_MYmrpqjhx1wRHUEwSGIc20zznq7__D-UuOi4jirNarGjlsnEIFC_Q-Sf7hSyKMVPS0" />
                                                        <div className="absolute top-3 left-3 bg-[#006229] text-white text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-[12px]">verified</span>
                                                            Stok Terverifikasi
                                                        </div>
                                                    </div>
                                                    <div className="md:col-span-3 p-6 flex flex-col justify-between">
                                                        <div>
                                                            <div className="flex justify-between items-start mb-2">
                                                                <h3 className="font-headline-sm text-lg font-bold text-on-surface">Premium Mentik Susu (5kg)</h3>
                                                                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                                                    Kecocokan 98%
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2 mb-4">
                                                                <span className="text-[#006229] font-bold text-lg">Rp85.000</span>
                                                                <span className="text-xs text-zinc-400">Harga Anggota Koperasi</span>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-2 text-xs text-zinc-500">
                                                                <div className="flex items-center gap-1.5">
                                                                    <span className="material-symbols-outlined text-[16px]">inventory_2</span>
                                                                    <span>Tersisa 42 karung</span>
                                                                </div>
                                                                <div className="flex items-center gap-1.5">
                                                                    <span className="material-symbols-outlined text-[16px]">near_me</span>
                                                                    <span>Jarak 2 km</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-6 flex gap-3">
                                                            <button 
                                                                onClick={() => addToCart({ name: 'Premium Mentik Susu (5kg)', price: 85000 })}
                                                                className="flex-1 bg-primary text-white py-2.5 rounded-xl font-label-md text-sm hover:shadow-lg transition-all active:scale-95 font-semibold"
                                                            >
                                                                Tambah ke Keranjang
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
                                        <div className="w-10 h-10 rounded-full ai-gradient-bg flex items-center justify-center shrink-0 text-white font-bold text-xs">
                                            AI
                                        </div>
                                        <div className="flex items-center gap-2 text-zinc-400 bg-slate-100 px-4 py-3.5 rounded-full rounded-tl-none w-fit">
                                            <span className="text-xs">Mengoptimalkan basis data stok koperasi</span>
                                            <div className="flex gap-1">
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full streaming-dot"></div>
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full streaming-dot"></div>
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full streaming-dot"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Chat Input Field */}
                            <div className="space-y-4 border-t border-zinc-100 pt-4">
                                <div className="flex items-center gap-2 overflow-x-auto pb-1 select-none">
                                    {['Beli Beras Organik', 'Minta Pupuk', 'Promo Terbaik Hari Ini', 'Alat Tani Lokal'].map((pill, pIdx) => (
                                        <button 
                                            key={pIdx} 
                                            onClick={() => handleSend(pill)}
                                            className="px-4 py-1.5 rounded-full border border-zinc-200 hover:bg-slate-50 text-xs text-zinc-600 transition-colors whitespace-nowrap"
                                        >
                                            {pill}
                                        </button>
                                    ))}
                                </div>
                                <div className="glass-input rounded-2xl p-1.5 shadow-lg border border-zinc-200/60 flex items-center gap-3 focus-within:ring-2 focus-within:ring-primary/20 transition-all bg-white">
                                    <input 
                                        className="flex-grow bg-transparent border-none py-3 px-4 text-sm focus:ring-0 outline-none text-zinc-800" 
                                        placeholder='Tanyakan apa pun: "Saya butuh beras dan pupuk organik"'
                                        type="text"
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                                    />
                                    <button 
                                        onClick={() => handleSend()}
                                        className="ai-gradient-bg w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md active:scale-95 transition-transform"
                                    >
                                        <Send className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Summary Column */}
                        <aside className="w-80 space-y-6 flex-shrink-0">
                            {/* Member Status card */}
                            <div className="bento-card p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="text-xs opacity-80 mb-1 uppercase tracking-wider font-semibold">Level Anggota</div>
                                        <div className="font-headline-sm text-lg font-bold">Anggota Gold</div>
                                    </div>
                                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                                        <span className="material-symbols-outlined text-white">workspace_premium</span>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="text-3xl font-black">4,250</div>
                                    <div className="text-xs opacity-80 mt-1">Poin Tersedia</div>
                                </div>
                                <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                                    <div className="bg-white h-full" style={{ width: '75%' }}></div>
                                </div>
                            </div>

                            {/* Shopping Cart Summary */}
                            <div className="bento-card p-6 border border-zinc-100 shadow-sm">
                                <h3 className="font-headline-sm text-base font-bold mb-4 flex items-center gap-2">
                                    Keranjang Saat Ini <ShoppingCart className="h-4 w-4 text-zinc-500" />
                                </h3>

                                {cart.length === 0 ? (
                                    <div className="py-8 text-center text-zinc-400 text-xs">
                                        Keranjang Anda kosong. Tambahkan item koperasi terverifikasi untuk memulai.
                                    </div>
                                ) : (
                                    <>
                                        <div className="space-y-4 mb-6 max-h-48 overflow-y-auto pr-1">
                                            {cart.map(c => (
                                                <div key={c.id} className="flex justify-between items-start text-xs border-b border-zinc-50 pb-2">
                                                    <div>
                                                        <span className="font-semibold text-zinc-800">{c.name}</span>
                                                        <div className="text-[10px] text-zinc-400 mt-0.5">Jumlah: {c.qty} × Rp{(c.price).toLocaleString()}</div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="font-bold text-zinc-700">Rp{(c.price * c.qty).toLocaleString()}</span>
                                                        <button onClick={() => removeFromCart(c.id)} className="text-red-400 hover:text-red-600 transition-colors">
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="pt-4 border-t border-zinc-100 space-y-2 text-xs">
                                            <div className="flex justify-between text-zinc-500">
                                                <span>Subtotal</span>
                                                <span>Rp{subtotal.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-[#006229] font-medium">
                                                <span>Diskon Anggota (10%)</span>
                                                <span>-Rp{discount.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between font-bold text-base mt-2 border-t border-dashed border-zinc-100 pt-2 text-zinc-900">
                                                <span>Total</span>
                                                <span className="text-primary">Rp{total.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => {
 setCart([]); showToast('Checkout selesai! AI mengirimkan pengiriman di hari yang sama.'); 
}}
                                            className="w-full mt-4 bg-primary text-white py-3 rounded-xl font-label-md text-sm font-semibold hover:bg-opacity-95 active:scale-95 transition-all text-center"
                                        >
                                            Bayar
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Recent Purchases */}
                            <div className="bento-card p-6 border border-zinc-100 shadow-sm">
                                <h3 className="font-headline-sm text-sm font-bold mb-4">Pesanan Koperasi Terbaru</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-xs">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-[#006229]">
                                            <span className="material-symbols-outlined text-sm">agriculture</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold">Seedling Starter Kit</div>
                                            <div className="text-[10px] text-zinc-400">Oct 12, 2024</div>
                                        </div>
                                        <div className="font-bold text-zinc-700">Rp85k</div>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined text-sm">water_drop</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold">Drip Irrigation Set</div>
                                            <div className="text-[10px] text-zinc-400">Oct 05, 2024</div>
                                        </div>
                                        <div className="font-bold text-zinc-700">Rp450k</div>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </main>
            </div>

            {/* Notification Toast */}
            <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 transition-all duration-500 z-[9999] pointer-events-none ${
                toastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <span className="text-xs font-semibold">{toastMessage}</span>
            </div>

            <PrototypeHud />
        </>
    );
}
