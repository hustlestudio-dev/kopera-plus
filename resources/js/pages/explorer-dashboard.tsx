import { Head, Link } from '@inertiajs/react';
import { Search, Star, Bell, Compass, LayoutDashboard, Store, BookOpen, Brain, Calendar, HelpCircle, ArrowRight, CheckCircle2, ShieldCheck, Heart, User } from 'lucide-react';
import React, { useState } from 'react';
import PrototypeHud from '@/components/PrototypeHud';

interface CoopItem {
    name: string;
    image: string;
    logo: string;
    rating: string;
    members: string;
    verified: boolean;
}

interface ProductItem {
    name: string;
    coop: string;
    price: string;
    image: string;
    lowStock?: boolean;
}

export default function ExplorerDashboard() {
    const [input, setInput] = useState('');
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 3000);
    };

    const coops: CoopItem[] = [
        { 
            name: 'Koperasi Hijau Lestari', 
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlicuD3Tbm1cqeu5yMo7FKzwTv2vgOvFVOQRCQzsdYkASugUtZGjuJilN3pT4RBCKVirgMr_LCRw1aAoyZ76PT9wxVTOCwcxOyJrCiiK9O9r8jaaVHNG5ziGHKhoAWTnl6qBC68vsooicWxoNoTRGQLa09ZZTRshktZINzskpdkJp3S48YnUZFsimQI7FLDJLSgP79lQG0ME1fhhTYHjDmP0dpvuVEWNqKCA_RMBNgXYsaWADvr2qaZfgzK4HyR8lShTefHVdgFlo',
            logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyFGNkBvPtikqeTVfiPYEQ_Rrdw6nWlkewaaJB4oe3bOP1MBw45IRMAnoV_QZUH9svbwhKP2fIkNs15_TJJ4eHV9gSe-7QibU3azRV7Znq2szl37uTxZ7w2rlMap8lx1xIai6929VVCZ7v-2XugVMjHRJmGnYXEFqV7-pMkCSdmCHcdI5OyfgDaRPAX6dYrhLHMwOnRBWjgE3pIee7UXUjFXQyuKOr7q4IgotFpuUFrpIody9i3-lhwirVidN9VPsARR7UgQJqC9Y',
            rating: '4.8',
            members: '128 Members',
            verified: true
        },
        { 
            name: 'Modern Weaver Coop', 
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCer0p4rh2IUQaSSA39njUkwd6WOBEOp-7789RMwcQ8kqUAgZAENo7x6In2TYLiYdaaoy1dNiL1zXG-F_O7V0bnQLM-VrAru80A23AENW_KaKQjlv58wtdDJz-Rl1FF-C_8V0YRiThat84MGFLf5oVcfH-OPs3LNkb8FJ2DqAlD_xVE5ChruE_l3hvmXnmatWoKuYNwKVes6Q5lJCfBJiRfi_iMBIq_aKAXElvBi3qUTPtJgndWexjP4u6F2t0yrMF3NLu28cYC0nw',
            logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-duQqY321nFUN2WyujvLTK9lH3DJVW-_oSnv7b6SG7Qh8FtPZ6igGiudsE8K8DPzobfeGijEmgRZVw2p_5ikZfy8Y6tqO9hRJBsS5d26l_zdUNDDIih8pMWr7EJ5AxlAua3fYqIWpwuhjLcOiRTeP73hy0f07iuX3zGw5IF1cy7_ypsA_NCrztufmaGDCM12I0wa_5fFPTlxMhd91a8EHrOtDtkL-n-r90kk6tjEp60FLARY5DwDCngSu7k4zv4qA3PnrSJORi4k',
            rating: '4.9',
            members: '240 Members',
            verified: true
        },
        { 
            name: 'Urban Synergy Hub', 
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRtcujunrHtsbv3E3Av6vfwqUejowBuBJQIrwryzmTZxCE3A1taSE-nbsMs7m7ufOI_G2dtG8Z28wjCSOJaAndHfPI0bE5joXFCqbIlvSmv6KHMM7LEzOrd3_v6TeHJCUtosYmep-Xz4RoV7kujpc0TKhYDRq-xUQ97y9LmFob3m-gk3rK1DHt02yJPtywzmia9rvuVtDgj-RDv2Vgr6mPn8S9qAveHILJC_P8LvbtVld0yA2jNp0vCYB4mgUJpfSym1w9pKt7N98',
            logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWHgZnAx3y5prpnjEXEVgELZUmzvF3-UQ5MDrVWAfX7CX2QwIaaJaVq391xf0j-tcVTRpYwweIOrBtUVlqjxboXFQ6hjM9S9Q1pj027oV_250yRrZaQA15NjNdY3u1nAHDQDVxPjQRtJ8QQeMifrhm4bS6O_tNBL6QP1SD869Zr3ILBbBub77ZtYYMUYT7SAMYO1DAOmsZGoGP9RbpB0yS6lOnG7AIBr7Q5s7UGzloMwFD81ZQ_YfABdnagi0YQIDpOTTPUICnW14',
            rating: '4.7',
            members: '86 Members',
            verified: true
        }
    ];

    const products: ProductItem[] = [
        {
            name: 'Premium Arabica Blend',
            coop: 'Koperasi Tani Sejahtera',
            price: 'Rp 85.000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBH7uSTjXfmmd9kxn--ub08l4tcCMxnlmPHjOu5RPmvsMh-1-2M8gHHf4WaDgXVZvnlrxnB-qSSbg0Cm-7c-clNLEjHFHNQrWkJ1V_gscn10A6tr1p_7obVAN8icXDTh-zy6crCBlaJte6jl7WGhEviACq2oF8Mb3bn_sDdKUfBXz-oWEvvw21xyx6cy9kzkmxfOiBtKNqe6mNvJveDqsr11IeWExRRmm7N0npiJ9G4m-yc9MWm4k_6cZLaY2VrXnEmP4uj7yHEWSc'
        },
        {
            name: 'Wild Forest Honey',
            coop: 'Lestari Apiculture',
            price: 'Rp 120.000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBA_UzhYk34yAK77zXFK7QCymhYqlGxVOgiqJtfPJKyPUdr5xQs-sutJ_KY49vENedNm4JnIfjj4jzOdNRwl0IY8Y3ii2w2QOeCic-EUjAdIXxEHCS1hihQOIgJ_K6vaCPJFmw2hah-9Ed7TZLd-7BLcXhkMoquBW39mof6Leo6zvfDpXZBUgFX83OGIAo7naspBrKC6iUCHPf2BZ4hdo8YA3Xlm9IiSGR8Y-3Hkz0H94U3IDErjySkPNCUomlbgYOb75YZWdx7vbQ'
        },
        {
            name: 'Artisan Tenun Scarf',
            coop: 'Modern Weaver Coop',
            price: 'Rp 250.000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk4hYDMhMwH3mOXoHhAl-V2Zeuy3kqMbt7J_oV4kBcNqaQbB-UvbnuBMFCisps35ZAF7ADl_M-R3MvUMtmfArd6yTSTO5V3tdBmFj7APRR2D_JXwFGqoz4pusbnedZC7WT6IzxiiCYS4Dp6u8lmXC7m1MQ4G0KYyLDdXQMp2lUjA1ELuraZaQBgWX2K_sDmWOG9Vyd4lKjhnvxaH5n6c-_CAvQtp-vxqUS6CPT_en-U1Z125-o9i6OQvtGfKp95G7oDXxByh4by9w'
        },
        {
            name: 'Matte Ceramic Tea Set',
            coop: 'Urban Synergy Hub',
            price: 'Rp 450.000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClQZSzG-YrQVuDklgjt1qZd4hcQtXNBwyBNCcyjAOnrpe2Kw3UEk6IUGPzj779WtZlycJc4QMvc4Xj4XlqjoN3XfpIOHYbNUf2pNN41ozyf0vXRa8yQBlXeH6yKicqqb2OubDm-X9GDYo8oFwWqgbEidXmcbH8RBZBA89AZ3Kc8DzltzSOsmqyEq4JDMJTVg0twx3NqPbZZfLhPjRYAK6bvcWQaTtLvM5JCDup6Y1EUa9rujPl0znT3ALGdEyeypBTjesBk09Ne0Y',
            lowStock: true
        }
    ];

    const handleAISearch = () => {
        if (!input.trim()) {
return;
}

        showToast(`AI Explorer running query for "${input}"`);
        setInput('');
    };

    return (
        <>
            <Head title="Community Explorer | KOPERA-PLUS" />

            <div className="bg-[#f8f9ff] text-on-background min-h-screen flex font-sans">
                
                {/* SideNavBar (Desktop) */}
                <aside className="h-screen w-64 fixed left-0 top-0 overflow-y-auto bg-white border-r border-zinc-200 flex flex-col py-6 gap-y-2 z-50 hidden md:flex">
                    <div className="px-6 mb-8 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                            <span className="material-symbols-outlined">explore</span>
                        </div>
                        <div>
                            <h1 className="font-headline-sm text-headline-sm font-black text-primary leading-none">KOPERA-PLUS</h1>
                            <p className="text-[10px] text-zinc-400 font-bold uppercase mt-1">Community Explorer</p>
                        </div>
                    </div>
                    
                    <nav className="flex-1 space-y-1">
                        <Link className="flex items-center gap-3 px-4 py-3 bg-primary/5 text-primary rounded-xl mx-2 font-bold text-sm border-r-4 border-primary" href="/explorer-dashboard">
                            <LayoutDashboard className="h-4 w-4 text-primary" />
                            <span>Dashboard</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-slate-50 mx-2 rounded-xl text-sm font-semibold transition-colors" href="/workspace">
                            <span className="material-symbols-outlined text-zinc-400">groups</span>
                            <span>Explore Coops</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-slate-50 mx-2 rounded-xl text-sm font-semibold transition-colors" href="/assistant">
                            <Store className="h-4 w-4 text-zinc-400" />
                            <span>Marketplace</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-slate-50 mx-2 rounded-xl text-sm font-semibold transition-colors" href="/workspace">
                            <Calendar className="h-4 w-4 text-zinc-400" />
                            <span>Events</span>
                        </Link>
                        <Link className="flex items-center gap-3 px-4 py-3 text-zinc-600 hover:bg-slate-50 mx-2 rounded-xl text-sm font-semibold transition-colors" href="/workspace">
                            <BookOpen className="h-4 w-4 text-zinc-400" />
                            <span>Learning Center</span>
                        </Link>
                    </nav>

                    <div className="mt-auto px-4 pb-4">
                        <Link href="/login" className="w-full py-3 bg-primary text-white font-label-md text-sm font-semibold rounded-xl shadow-lg hover:brightness-110 transition-all text-center block">
                            Upgrade to Member
                        </Link>
                    </div>
                </aside>

                {/* Main Content Wrapper */}
                <div className="md:ml-64 flex flex-col flex-grow min-h-screen">
                    {/* TopNavBar */}
                    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm border-b border-zinc-200/50 flex justify-between items-center w-full px-8 py-4">
                        <div className="flex items-center flex-grow max-w-xl">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 h-4 w-4" />
                                <input className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-zinc-200/50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Search cooperatives, products, or ask AI..." type="text"/>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 ml-6 text-sm">
                            <Link className="font-bold text-primary hover:underline" href="/onboarding">Join Community</Link>
                            <div className="flex items-center gap-3 border-l border-zinc-200 pl-6">
                                <button className="p-2 text-zinc-600 hover:bg-slate-100 rounded-full"><Bell className="h-5 w-5" /></button>
                                <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden border border-zinc-300">
                                    <img className="w-full h-full object-cover" alt="Explorer avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgGFYPJJrQS59wIbI2FuPkEUtimZi9vTjCaJl1jSk3skE4hCA7Oq8JU2mdKCauJ6Iw14Fgu1ne-760PCZkYWZ4BPIhVGsDHyrQG2GfeqEX3aoMJMBIKLV1yMwHcqfu2QMZxZZSOYNFwIA6OI24q51G8CSxELDNIOD4hmSKGI-NkicK6PAfEQ0llKQSYYe8Rvg-0nTPy_-kvEIL0dOJwFxt0fNlbECQ-No9V8lPAshfDNoiB7e8TUeZKY8ypFpslhW20X8dmj-rRHc" />
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Main Scrollable Content Area */}
                    <main className="flex-1 px-8 py-10 max-w-[1440px] mx-auto w-full">
                        {/* Hero Section */}
                        <section className="mb-12 relative overflow-hidden rounded-3xl bg-zinc-900 text-white p-8 md:p-12 lg:p-16 shadow-xl">
                            <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                            <div className="relative z-10 max-w-3xl">
                                <h2 className="font-display-sm text-3xl font-extrabold mb-4 leading-tight">Welcome to KOPERA AI 👋</h2>
                                <p className="text-sm opacity-90 mb-10">Discover modern cooperatives powered by Artificial Intelligence.</p>
                                <div className="flex flex-col md:flex-row gap-3 mb-8">
                                    <div className="flex-1 relative">
                                        <Brain className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 h-5 w-5 animate-pulse" />
                                        <input 
                                            className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/30 text-white placeholder:text-zinc-400 bg-white/10" 
                                            placeholder="Ask AI: 'Find agriculture coops near me'" 
                                            type="text"
                                            value={input}
                                            onChange={e => setInput(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && handleAISearch()}
                                        />
                                    </div>
                                    <button onClick={handleAISearch} className="px-8 py-4 bg-purple-600 text-white font-label-md rounded-2xl shadow-lg hover:bg-opacity-95 transition-all flex items-center justify-center gap-2 font-semibold">
                                        <span>Search AI</span>
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2.5">
                                    {['Find Cooperatives', 'Browse Products', 'Ask AI Co-pilot', 'Join Public Events'].map((chip, cIdx) => (
                                        <button 
                                            key={cIdx} 
                                            onClick={() => showToast(`Opening explorer category: "${chip}"`)}
                                            className="px-4 py-2 bg-white/10 border border-white/25 rounded-full text-xs hover:bg-white/20 transition-colors shadow-sm text-white"
                                        >
                                            {chip}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* AI Recommendation & Featured Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 animate-fadeInUp">
                            {/* AI Recommendation Card */}
                            <div className="lg:col-span-1 bento-card border border-zinc-200/50 p-6 flex flex-col justify-between shadow-sm relative">
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Brain className="h-5 w-5 text-purple-600 animate-pulse" />
                                        <h3 className="font-headline-sm text-base font-bold">AI Recommended</h3>
                                    </div>
                                    <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 mb-4 text-xs font-semibold text-purple-900 leading-relaxed">
                                        🤖 Based on your interests, we recommend Koperasi Tani Sejahtera.
                                    </div>
                                    <div className="space-y-3 mb-6 text-xs text-zinc-500">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">location_on</span>
                                            <span>2km away from your location</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">agriculture</span>
                                            <span>Agriculture-focused</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">star</span>
                                            <span>High Member Satisfaction</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="w-full py-3 bg-purple-600 text-white font-label-md text-xs font-bold rounded-xl hover:bg-opacity-95 transition-colors shadow-md shadow-purple-500/10" onClick={() => showToast("Opening details for Koperasi Tani Sejahtera...")}>
                                    View Details
                                </button>
                            </div>

                            {/* Featured Cooperatives */}
                            <div className="lg:col-span-2 flex flex-col">
                                <div className="flex items-center justify-between mb-4 px-2">
                                    <h3 className="font-headline-sm text-base font-bold text-zinc-950">Featured Cooperatives</h3>
                                    <button className="text-primary text-xs font-bold hover:underline" onClick={() => showToast("Loading all cooperatives...")}>View All</button>
                                </div>
                                <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar scroll-smooth">
                                    {coops.map((coop, cIdx) => (
                                        <div key={cIdx} className="min-w-[280px] w-[280px] bento-card overflow-hidden flex flex-col border border-zinc-200/50 shadow-sm shrink-0">
                                            <div className="h-32 w-full relative">
                                                <img className="w-full h-full object-cover" alt={coop.name} src={coop.image} />
                                            </div>
                                            <div className="p-4 flex-1 flex flex-col justify-between">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="h-10 w-10 bg-white shadow-sm border border-zinc-200 rounded-lg -mt-8 relative z-10 flex items-center justify-center overflow-hidden">
                                                        <img className="w-8 h-8 object-contain" alt="Coop Logo" src={coop.logo} />
                                                    </div>
                                                    {coop.verified && (
                                                        <span className="bg-emerald-50 text-emerald-700 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase flex items-center gap-1 border border-emerald-100">
                                                            Verified
                                                        </span>
                                                    )}
                                                </div>
                                                <h4 className="font-headline-sm text-xs font-bold text-zinc-950 mb-1">{coop.name}</h4>
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                                    <span className="text-xs font-bold">{coop.rating}</span>
                                                    <span className="text-[10px] text-zinc-400">({coop.members})</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Popular Products Section */}
                        <section className="mb-12">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-headline-md text-lg font-bold">Popular Products</h3>
                                <Link className="flex items-center gap-1.5 text-primary text-xs font-bold hover:underline" href="/assistant">
                                    Explore Marketplace
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {products.map((prod, pIdx) => (
                                    <div key={pIdx} className="bento-card overflow-hidden flex flex-col group border border-zinc-200/50 shadow-sm">
                                        <div className="h-48 w-full relative overflow-hidden">
                                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={prod.name} src={prod.image} />
                                            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-[9px] font-extrabold tracking-wider flex items-center gap-1 shadow-sm">
                                                <span className={`w-1.5 h-1.5 rounded-full ${prod.lowStock ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></span>
                                                {prod.lowStock ? 'LOW STOCK' : 'LIVE STOCK'}
                                            </div>
                                        </div>
                                        <div className="p-5 flex-grow flex flex-col justify-between">
                                            <div className="mb-4">
                                                <h4 className="font-headline-sm text-xs font-bold text-zinc-950 mb-1">{prod.name}</h4>
                                                <p className="text-[10px] text-zinc-400 font-semibold">{prod.coop}</p>
                                            </div>
                                            <div className="flex justify-between items-center mt-auto border-t border-zinc-100 pt-3">
                                                <span className="font-bold text-sm text-primary">{prod.price}</span>
                                                <div className="flex gap-2">
                                                    <button 
                                                        onClick={() => showToast(`Purchased ${prod.name}!`)}
                                                        className="py-1.5 px-3 bg-primary text-white rounded-lg text-[10px] font-bold hover:brightness-105 transition-all active:scale-95"
                                                    >
                                                        Buy
                                                    </button>
                                                    <Link 
                                                        href="/assistant"
                                                        className="p-1.5 border border-purple-500/30 text-purple-600 rounded-lg hover:bg-purple-50/50 transition-colors"
                                                        title="Ask AI about this product"
                                                    >
                                                        <Brain className="h-3.5 w-3.5" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Learning Center */}
                        <section className="mb-12">
                            <h3 className="font-headline-md text-lg font-bold mb-6">Learning Center</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bento-card p-6 flex flex-col justify-between border border-zinc-200/50 shadow-sm hover:scale-[1.02] transition-transform duration-300 cursor-pointer" onClick={() => showToast("Opening Module: What is a Cooperative?")}>
                                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 shrink-0">
                                        <HelpCircle className="h-6 w-6" />
                                    </div>
                                    <h4 className="font-headline-sm text-sm font-bold text-zinc-950 mb-2">What is a Cooperative?</h4>
                                    <p className="text-xs text-zinc-500 mb-6 leading-relaxed">Learn the fundamental principles of community-driven businesses and cooperative growth.</p>
                                    <span className="text-primary text-xs font-bold flex items-center gap-1.5 mt-auto">Read Module <ArrowRight className="h-3 w-3" /></span>
                                </div>
                                <div className="bento-card p-6 flex flex-col justify-between border border-zinc-200/50 shadow-sm hover:scale-[1.02] transition-transform duration-300 cursor-pointer" onClick={() => showToast("Opening Module: Benefits of Membership?")}>
                                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shrink-0">
                                        <span className="material-symbols-outlined">card_membership</span>
                                    </div>
                                    <h4 className="font-headline-sm text-sm font-bold text-zinc-950 mb-2">Benefits of Membership</h4>
                                    <p className="text-xs text-zinc-500 mb-6 leading-relaxed">Discover unique privileges of cooperative membership, from dividend RAT shares to collective buying power.</p>
                                    <span className="text-primary text-xs font-bold flex items-center gap-1.5 mt-auto">Read Module <ArrowRight className="h-3 w-3" /></span>
                                </div>
                                <div className="bento-card p-6 flex flex-col justify-between border border-zinc-200/50 shadow-sm hover:scale-[1.02] transition-transform duration-300 cursor-pointer" onClick={() => showToast("Opening Module: Financial Literacy?")}>
                                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 shrink-0">
                                        <span className="material-symbols-outlined">payments</span>
                                    </div>
                                    <h4 className="font-headline-sm text-sm font-bold text-zinc-950 mb-2">Financial Literacy</h4>
                                    <p className="text-xs text-zinc-500 mb-6 leading-relaxed">Master your personal finance with specialized courses tailored for cooperative environments.</p>
                                    <span className="text-primary text-xs font-bold flex items-center gap-1.5 mt-auto">Read Module <ArrowRight className="h-3 w-3" /></span>
                                </div>
                            </div>
                        </section>

                        {/* Success Stories */}
                        <section className="mb-12">
                            <div className="bento-card overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-zinc-200/50 shadow-sm">
                                <div className="h-64 lg:h-full min-h-[300px]">
                                    <img className="w-full h-full object-cover" alt="Success Story Sarah" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmE-XfeJT1t8t6F2yHgQ-oiBvygSaDeI7a-976JkYaKJrJ7T7_i3w9zyTiO_9phNjgYlg3U_wt_wQv-kZMSL2pnIfYwIT29YtwGAIxkSbXkcdl0yOyECXQa8LTp7eNvVZ2FVubRfmJ1rxc96eZZzGLD8lPFb8t7aWkIUG7CW7dacJWqDJdM_JQ-go0i0GMwzpqSea1uf8_5-1sMs_OTJZAriwyEwJZf-lQYUTm59zr2aZiEJnP5GingDcX4Hw8HfhEQivmF020cS0" />
                                </div>
                                <div className="p-8 lg:p-12 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 text-purple-600 mb-4 font-bold text-xs uppercase tracking-widest">
                                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
                                        <span>Member Spotlight</span>
                                    </div>
                                    <h3 className="font-display-sm text-2xl font-bold leading-tight mb-6">"Joining KOPERA-PLUS transformed my local craft into a sustainable business with global reach."</h3>
                                    <p className="text-xs text-zinc-500 font-semibold mb-8">Sarah Wijaya, Founder of Batik Modern Collective</p>
                                    <div className="flex items-center gap-8">
                                        <div>
                                            <div className="text-2xl font-black text-primary">200%</div>
                                            <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-1">Income Growth</div>
                                        </div>
                                        <div className="w-px h-10 bg-zinc-200"></div>
                                        <div>
                                            <div className="text-2xl font-black text-primary">15+</div>
                                            <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mt-1">New Partners</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Become a Member CTA */}
                        <section className="mb-12">
                            <div className="bento-card bg-primary text-white p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-lg">
                                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                                <div className="absolute -left-20 -top-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>
                                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                    <div>
                                        <h2 className="font-display-sm text-2xl font-bold mb-6 leading-tight">Ready to shape the future of community business?</h2>
                                        <p className="text-sm opacity-80 mb-8 leading-relaxed">Join over 10,000 members who are already building a better economic future together.</p>
                                        <Link href="/onboarding" className="px-10 py-5 bg-white text-primary font-headline-sm text-sm font-extrabold rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-transform block text-center w-fit">
                                            Become a Member
                                        </Link>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                                        <h4 className="text-sm font-bold mb-6 text-white uppercase tracking-wider">Membership Benefits</h4>
                                        <ul className="space-y-4 text-xs font-semibold">
                                            <li className="flex items-center gap-3">
                                                <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                                                <span>Personalized AI Advisor Access</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                                                <span>Exclusive Member Marketplace Deals</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                                                <span>Voting Rights on Community Decisions</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                                                <span>Annual Profit Dividends (SHU)</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>

                    {/* Footer */}
                    <footer className="px-8 py-8 border-t border-zinc-200 bg-white">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                            <div className="flex items-center gap-2">
                                <span className="text-zinc-500">© 2024 KOPERA-PLUS. All rights reserved.</span>
                            </div>
                            <div className="flex gap-6 text-zinc-500">
                                <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                                <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                                <a className="hover:text-primary transition-colors" href="#">Contact Us</a>
                            </div>
                        </div>
                    </footer>
                </div>

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
