import { Head, Link } from '@inertiajs/react';
import { Search, Bell, ShieldCheck, Send, Paperclip, Mic, Plus, Moon } from 'lucide-react';
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
            showCard: true
        }
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

        setMessages(prev => [...prev, { sender: 'user', text: textToSend }]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
                sender: 'ai',
                text: `Saya telah menganalisis pertanyaan Anda "${textToSend}". Saya akan mengambil inventaris terkini dan memeriksa basis data manfaat koperasi.`
            }]);
            showToast('AI menganalisis pesan');
        }, 1500);
    };

    return (
        <>
            <Head title="Asisten AI Anggota | KOPERA-PLUS" />

            <div className="bg-[#f4f7fc] text-[#0b1c30] font-sans antialiased overflow-hidden h-screen flex">
                
                {/* Left Sidebar (Matches Mockup) */}
                <aside className="w-64 h-screen fixed left-0 top-0 bg-white border-r border-zinc-200/60 shadow-sm flex flex-col justify-between p-6 z-50">
                    <div>
                        {/* Branding */}
                        <div className="mb-8 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <span className="material-symbols-outlined font-bold text-lg">hub</span>
                            </div>
                            <div>
                                <h1 className="text-sm font-extrabold text-[#0b1c30] leading-none">KOPERA</h1>
                                <p className="text-[9px] text-zinc-400 font-bold uppercase mt-1">AI-First Governance</p>
                            </div>
                        </div>

                        {/* New Chat Button */}
                        <button 
                            onClick={() => {
 setMessages([{ sender: 'ai', text: 'Obrolan baru dimulai. Apa yang ingin Anda beli hari ini?' }]); showToast('Sesi baru dimulai.'); 
}}
                            className="w-full py-3 bg-[#004ac6] text-white rounded-xl text-xs font-bold shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 mb-6"
                        >
                            <Plus className="h-4 w-4" /> Obrolan Baru
                        </button>

                        {/* Search Input */}
                        <div className="relative mb-6">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 h-3.5 w-3.5" />
                            <input 
                                className="w-full bg-slate-50 border border-zinc-200/50 rounded-xl py-2.5 pl-9 pr-3 text-xs outline-none focus:ring-1 focus:ring-primary/20 text-zinc-700" 
                                placeholder="Cari riwayat..."
                                type="text"
                            />
                        </div>

                        {/* Recent Conversations */}
                        <div>
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-3">Percakapan Terbaru</p>
                            <nav className="space-y-1">
                                <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#004ac6]/10 text-[#004ac6] rounded-xl text-xs font-bold text-left">
                                    <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                                    <span>Membeli Produk</span>
                                </button>
                                <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:bg-slate-50 rounded-xl text-xs font-semibold text-left transition-colors" onClick={() => showToast('Beralih ke percakapan lain.')}>
                                    <span className="material-symbols-outlined text-[18px] text-zinc-400">gavel</span>
                                    <span>RAT Digital</span>
                                </button>
                                <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:bg-slate-50 rounded-xl text-xs font-semibold text-left transition-colors" onClick={() => showToast('Beralih ke percakapan lain.')}>
                                    <span className="material-symbols-outlined text-[18px] text-zinc-400">help_outline</span>
                                    <span>Pertanyaan SHU</span>
                                </button>
                                <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:bg-slate-50 rounded-xl text-xs font-semibold text-left transition-colors" onClick={() => showToast('Beralih ke percakapan lain.')}>
                                    <span className="material-symbols-outlined text-[18px] text-zinc-400">person_outline</span>
                                    <span>Keanggotaan</span>
                                </button>
                            </nav>
                        </div>
                    </div>

                    <div className="space-y-1 pt-6 border-t border-zinc-100 text-xs">
                        <Link className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-slate-50 rounded-xl font-semibold" href="/dashboard">
                            <span className="material-symbols-outlined text-zinc-400">dashboard</span>
                            <span>Dashboard</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-slate-50 rounded-xl font-semibold" href="/workspace">
                            <span className="material-symbols-outlined text-zinc-400">settings</span>
                            <span>Pengaturan</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-semibold" href="/">
                            <span className="material-symbols-outlined">logout</span>
                            <span>Keluar</span>
                        </Link>
                    </div>
                </aside>

                {/* Chat Panel (Middle Column - Matches Mockup) */}
                <main className="ml-64 mr-80 flex-grow flex flex-col justify-between h-screen bg-slate-50 relative border-r border-zinc-200/50">
                    
                    {/* Header */}
                    <header className="h-16 flex justify-between items-center px-8 bg-white border-b border-zinc-200/50 sticky top-0 z-45 shrink-0">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-zinc-950">Asisten AI Anggota</span>
                            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Aktif</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="p-2 text-zinc-600 hover:bg-slate-50 rounded-full transition-colors"><Bell className="h-4.5 w-4.5" /></button>
                            <button className="p-2 text-zinc-600 hover:bg-slate-50 rounded-full transition-colors"><Moon className="h-4.5 w-4.5" /></button>
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 border border-zinc-200 ml-1">
                                <img className="w-full h-full object-cover" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgGFYPJJrQS59wIbI2FuPkEUtimZi9vTjCaJl1jSk3skE4hCA7Oq8JU2mdKCauJ6Iw14Fgu1ne-760PCZkYWZ4BPIhVGsDHyrQG2GfeqEX3aoMJMBIKLV1yMwHcqfu2QMZxZZSOYNFwIA6OI24q51G8CSxELDNIOD4hmSKGI-NkicK6PAfEQ0llKQSYYe8Rvg-0nTPy_-kvEIL0dOJwFxt0fNlbECQ-No9V8lPAshfDNoiB7e8TUeZKY8ypFpslhW20X8dmj-rRHc" />
                            </div>
                        </div>
                    </header>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar pb-32">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                                {msg.sender === 'user' ? (
                                    <div className="bg-[#004ac6] text-white px-5 py-3.5 rounded-2xl rounded-tr-none max-w-md shadow-sm font-semibold text-xs leading-relaxed">
                                        {msg.text}
                                    </div>
                                ) : (
                                    <div className="flex gap-3 w-full">
                                        <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-extrabold text-xs shadow-sm shrink-0">
                                            AI
                                        </div>
                                        <div className="space-y-4 flex-1 max-w-[85%]">
                                            <div className="bg-white border border-zinc-200/50 p-4 rounded-2xl rounded-tl-none text-xs leading-relaxed text-zinc-700 shadow-sm font-medium">
                                                {msg.text}
                                            </div>

                                            {msg.showCard && (
                                                /* Product Card (Matches Mockup) */
                                                <div className="bg-white border border-zinc-200/50 rounded-2xl shadow-md overflow-hidden max-w-sm group hover:shadow-lg transition-shadow duration-300">
                                                    <div className="h-44 w-full relative">
                                                        <img className="w-full h-full object-cover" alt="Premium Rice" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHAso7gSAxYgOjquC3G-bOpfr2QfZg3-8EYReKKo7w89v2stwHsuQ4It3GaFD-1W3aNKnPXlOHBluGPdv2idmYF_toIOrpbYIiP1yx2F2DqUu5gyKtZth2xuYDlayLC6NgTTh3bEVDv3ATOSwDl7M2JVavF8XLUeP51NQcZgAaZmHjTsbcBfRsXXC81_oybEiZUOGVya9tyZ76DK11HEfnFka1QgEJ_kVMAG3zw0c-m-zAI_KJwwyP8R7MZ25mQAABlV3wdFKcAKI" />
                                                        <span className="absolute top-3 left-3 bg-[#004ac6] text-white text-[9px] font-extrabold px-2.5 py-1 rounded uppercase tracking-wider shadow-sm">
                                                            Terlaris
                                                        </span>
                                                    </div>
                                                    <div className="p-5">
                                                        <h4 className="font-bold text-xs text-zinc-950 mb-1">Premium Rice 5kg</h4>
                                                        <p className="text-[10px] text-zinc-400 font-semibold mb-4">Green Life Signature Organic Series</p>
                                                        <div className="flex justify-between items-center mb-5">
                                                            <span className="text-[#004ac6] font-bold text-sm">Rp75.000</span>
                                                            <span className="text-red-500 text-[10px] font-bold flex items-center gap-1.5 bg-red-50 px-2.5 py-1 rounded-md">
                                                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Tersisa 24 item
                                                            </span>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button 
                                                                onClick={() => showToast("Added to deliver home list")}
                                                                className="flex-1 py-2.5 bg-[#004ac6] text-white rounded-xl text-[10px] font-bold hover:brightness-105 transition-all active:scale-95"
                                                            >
                                                                Antar ke Rumah
                                                            </button>
                                                            <button 
                                                                onClick={() => showToast("Selected pick up point")}
                                                                className="flex-1 py-2.5 bg-white border border-zinc-200 text-zinc-700 rounded-xl text-[10px] font-bold hover:bg-slate-50 transition-colors active:scale-95"
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
                                <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">AI</div>
                                <div className="flex items-center gap-2 text-zinc-400 bg-white border border-zinc-200/50 px-4 py-3 rounded-2xl rounded-tl-none text-xs font-semibold shadow-sm">
                                    <span>AI sedang mengetik</span>
                                    <div className="flex gap-1">
                                        <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
                                        <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Chat Actions & Input Area */}
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent z-40 shrink-0">
                        <div className="max-w-3xl mx-auto">
                            {/* Option Chips */}
                            <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-none select-none">
                                {['Beli Produk', 'Cek SHU', 'Hadiah', 'Pelatihan'].map((chip, cIdx) => (
                                    <button 
                                        key={cIdx} 
                                        onClick={() => handleSend(chip)}
                                        className="px-4 py-2 bg-white border border-zinc-200 rounded-xl text-[10px] text-zinc-600 hover:border-primary hover:text-primary transition-all font-semibold whitespace-nowrap shadow-sm"
                                    >
                                        {chip}
                                    </button>
                                ))}
                            </div>

                            {/* Text Input Box */}
                            <div className="bg-white border border-zinc-200/60 shadow-lg rounded-2xl p-2 flex items-center gap-3">
                                <button className="p-3 hover:bg-slate-50 rounded-xl text-zinc-400" onClick={() => showToast('Penjelajah lampiran dibuka.')}>
                                    <Paperclip className="h-4.5 w-4.5" />
                                </button>
                                <input 
                                    className="flex-grow bg-transparent border-none text-xs py-3.5 focus:ring-0 outline-none text-zinc-850 placeholder:text-zinc-450 font-medium" 
                                    placeholder="Tanyakan apa pun tentang koperasi Anda..."
                                    type="text"
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                                />
                                <button className="p-3 hover:bg-slate-50 rounded-xl text-zinc-400" onClick={() => showToast('Mikrofon sedang mendengarkan...')}>
                                    <Mic className="h-4.5 w-4.5" />
                                </button>
                                <button 
                                    onClick={() => handleSend()}
                                    className="w-10 h-10 rounded-full bg-[#004ac6] text-white flex items-center justify-center shadow-md active:scale-90 transition-transform"
                                >
                                    <Send className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Right Context Panel (Matches Mockup) */}
                <aside className="w-80 h-screen fixed right-0 top-0 bg-white border-l border-zinc-200/60 p-6 flex flex-col gap-6 z-50 overflow-y-auto custom-scrollbar">
                    
                    {/* Profile Header */}
                    <div className="bento-card p-5 border border-zinc-200/50 shadow-sm flex flex-col items-center text-center">
                        <div className="relative w-16 h-16 mb-4">
                            <div className="w-full h-full rounded-full p-[3px] border-2 border-emerald-500 bg-white">
                                <img className="w-full h-full rounded-full object-cover" alt="Profile Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgGFYPJJrQS59wIbI2FuPkEUtimZi9vTjCaJl1jSk3skE4hCA7Oq8JU2mdKCauJ6Iw14Fgu1ne-760PCZkYWZ4BPIhVGsDHyrQG2GfeqEX3aoMJMBIKLV1yMwHcqfu2QMZxZZSOYNFwIA6OI24q51G8CSxELDNIOD4hmSKGI-NkicK6PAfEQ0llKQSYYe8Rvg-0nTPy_-kvEIL0dOJwFxt0fNlbECQ-No9V8lPAshfDNoiB7e8TUeZKY8ypFpslhW20X8dmj-rRHc" />
                            </div>
                            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                        </div>
                        <h4 className="font-extrabold text-sm text-zinc-950 mb-1">Muhammad</h4>
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-3 py-1 rounded-full">Gold Member</span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-zinc-200/30 text-center">
                            <p className="text-[9px] text-zinc-400 font-bold uppercase">Total Points</p>
                            <p className="text-base font-black text-[#004ac6] mt-1">4,250</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-zinc-200/30 text-center">
                            <p className="text-[9px] text-zinc-400 font-bold uppercase">SHU 2023</p>
                            <p className="text-base font-black text-emerald-700 mt-1">Rp1.2M</p>
                        </div>
                    </div>

                    {/* Member Details */}
                    <div className="bento-card p-5 border border-zinc-200/50 shadow-sm space-y-4">
                        <h4 className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Detail Anggota</h4>
                        
                        <div className="flex items-start gap-3 text-xs border-b border-zinc-50 pb-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#004ac6] flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[18px]">corporate_fare</span>
                            </div>
                            <div>
                                <p className="text-[10px] text-zinc-400 font-semibold">Koperasi Saat Ini</p>
                                <p className="font-bold text-zinc-800 mt-0.5">Koperasi Green Life</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 text-xs">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                            </div>
                            <div>
                                <p className="text-[10px] text-zinc-400 font-semibold">Acara Mendatang</p>
                                <p className="font-bold text-zinc-800 mt-0.5">Digital RAT</p>
                                <p className="text-[10px] text-blue-600 font-bold mt-0.5">24 Okt, 09:00</p>
                            </div>
                        </div>

                        <button className="w-full mt-2 py-3 bg-[#e5eeff]/80 text-[#004ac6] text-xs font-bold rounded-xl hover:bg-[#e5eeff] transition-all" onClick={() => showToast('Modal profil lengkap dibuka.')}>
                            Lihat Profil Lengkap
                        </button>
                    </div>

                    {/* AI Insight Card */}
                    <div className="bento-card p-5 border border-zinc-200/50 shadow-sm relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-50">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3 text-[#004ac6] font-bold text-xs">
                                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                                <span>Wawasan AI</span>
                            </div>
                            <p className="text-xs text-zinc-700 leading-relaxed font-semibold">
                                Anda tinggal <strong className="text-primary font-bold">750 poin</strong> lagi menuju <strong className="text-[#004ac6] font-bold">Tingkat Platinum</strong>. Membeli 2 karung lagi Beras Premium akan membuka diskon eksklusif.
                            </p>
                        </div>
                    </div>
                </aside>
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
