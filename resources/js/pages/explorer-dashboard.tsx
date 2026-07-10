import { Head, Link } from '@inertiajs/react';
import {
    Search,
    Star,
    Bell,
    LayoutDashboard,
    Store,
    BookOpen,
    Brain,
    Calendar,
    HelpCircle,
    ArrowRight,
    CheckCircle2,
    ShieldCheck,
} from 'lucide-react';
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
            verified: true,
        },
        {
            name: 'Modern Weaver Coop',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCer0p4rh2IUQaSSA39njUkwd6WOBEOp-7789RMwcQ8kqUAgZAENo7x6In2TYLiYdaaoy1dNiL1zXG-F_O7V0bnQLM-VrAru80A23AENW_KaKQjlv58wtdDJz-Rl1FF-C_8V0YRiThat84MGFLf5oVcfH-OPs3LNkb8FJ2DqAlD_xVE5ChruE_l3hvmXnmatWoKuYNwKVes6Q5lJCfBJiRfi_iMBIq_aKAXElvBi3qUTPtJgndWexjP4u6F2t0yrMF3NLu28cYC0nw',
            logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-duQqY321nFUN2WyujvLTK9lH3DJVW-_oSnv7b6SG7Qh8FtPZ6igGiudsE8K8DPzobfeGijEmgRZVw2p_5ikZfy8Y6tqO9hRJBsS5d26l_zdUNDDIih8pMWr7EJ5AxlAua3fYqIWpwuhjLcOiRTeP73hy0f07iuX3zGw5IF1cy7_ypsA_NCrztufmaGDCM12I0wa_5fFPTlxMhd91a8EHrOtDtkL-n-r90kk6tjEp60FLARY5DwDCngSu7k4zv4qA3PnrSJORi4k',
            rating: '4.9',
            members: '240 Members',
            verified: true,
        },
        {
            name: 'Urban Synergy Hub',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRtcujunrHtsbv3E3Av6vfwqUejowBuBJQIrwryzmTZxCE3A1taSE-nbsMs7m7ufOI_G2dtG8Z28wjCSOJaAndHfPI0bE5joXFCqbIlvSmv6KHMM7LEzOrd3_v6TeHJCUtosYmep-Xz4RoV7kujpc0TKhYDRq-xUQ97y9LmFob3m-gk3rK1DHt02yJPtywzmia9rvuVtDgj-RDv2Vgr6mPn8S9qAveHILJC_P8LvbtVld0yA2jNp0vCYB4mgUJpfSym1w9pKt7N98',
            logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWHgZnAx3y5prpnjEXEVgELZUmzvF3-UQ5MDrVWAfX7CX2QwIaaJaVq391xf0j-tcVTRpYwweIOrBtUVlqjxboXFQ6hjM9S9Q1pj027oV_250yRrZaQA15NjNdY3u1nAHDQDVxPjQRtJ8QQeMifrhm4bS6O_tNBL6QP1SD869Zr3ILBbBub77ZtYYMUYT7SAMYO1DAOmsZGoGP9RbpB0yS6lOnG7AIBr7Q5s7UGzloMwFD81ZQ_YfABdnagi0YQIDpOTTPUICnW14',
            rating: '4.7',
            members: '86 Members',
            verified: true,
        },
    ];

    const products: ProductItem[] = [
        {
            name: 'Premium Arabica Blend',
            coop: 'Koperasi Tani Sejahtera',
            price: 'Rp 85.000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBH7uSTjXfmmd9kxn--ub08l4tcCMxnlmPHjOu5RPmvsMh-1-2M8gHHf4WaDgXVZvnlrxnB-qSSbg0Cm-7c-clNLEjHFHNQrWkJ1V_gscn10A6tr1p_7obVAN8icXDTh-zy6crCBlaJte6jl7WGhEviACq2oF8Mb3bn_sDdKUfBXz-oWEvvw21xyx6cy9kzkmxfOiBtKNqe6mNvJveDqsr11IeWExRRmm7N0npiJ9G4m-yc9MWm4k_6cZLaY2VrXnEmP4uj7yHEWSc',
        },
        {
            name: 'Wild Forest Honey',
            coop: 'Lestari Apiculture',
            price: 'Rp 120.000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBA_UzhYk34yAK77zXFK7QCymhYqlGxVOgiqJtfPJKyPUdr5xQs-sutJ_KY49vENedNm4JnIfjj4jzOdNRwl0IY8Y3ii2w2QOeCic-EUjAdIXxEHCS1hihQOIgJ_K6vaCPJFmw2hah-9Ed7TZLd-7BLcXhkMoquBW39mof6Leo6zvfDpXZBUgFX83OGIAo7naspBrKC6iUCHPf2BZ4hdo8YA3Xlm9IiSGR8Y-3Hkz0H94U3IDErjySkPNCUomlbgYOb75YZWdx7vbQ',
        },
        {
            name: 'Artisan Tenun Scarf',
            coop: 'Modern Weaver Coop',
            price: 'Rp 250.000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk4hYDMhMwH3mOXoHhAl-V2Zeuy3kqMbt7J_oV4kBcNqaQbB-UvbnuBMFCisps35ZAF7ADl_M-R3MvUMtmfArd6yTSTO5V3tdBmFj7APRR2D_JXwFGqoz4pusbnedZC7WT6IzxiiCYS4Dp6u8lmXC7m1MQ4G0KYyLDdXQMp2lUjA1ELuraZaQBgWX2K_sDmWOG9Vyd4lKjhnvxaH5n6c-_CAvQtp-vxqUS6CPT_en-U1Z125-o9i6OQvtGfKp95G7oDXxByh4by9w',
        },
        {
            name: 'Matte Ceramic Tea Set',
            coop: 'Urban Synergy Hub',
            price: 'Rp 450.000',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClQZSzG-YrQVuDklgjt1qZd4hcQtXNBwyBNCcyjAOnrpe2Kw3UEk6IUGPzj779WtZlycJc4QMvc4Xj4XlqjoN3XfpIOHYbNUf2pNN41ozyf0vXRa8yQBlXeH6yKicqqb2OubDm-X9GDYo8oFwWqgbEidXmcbH8RBZBA89AZ3Kc8DzltzSOsmqyEq4JDMJTVg0twx3NqPbZZfLhPjRYAK6bvcWQaTtLvM5JCDup6Y1EUa9rujPl0znT3ALGdEyeypBTjesBk09Ne0Y',
            lowStock: true,
        },
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

            <div className="flex min-h-screen bg-[#f8f9ff] font-sans text-on-background">
                {/* SideNavBar (Desktop) */}
                <aside className="fixed top-0 left-0 z-50 flex hidden h-screen w-64 flex-col gap-y-2 overflow-y-auto border-r border-zinc-200 bg-white py-6 md:flex">
                    <div className="mb-8 flex items-center gap-3 px-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 font-bold text-primary">
                            <span className="material-symbols-outlined">
                                explore
                            </span>
                        </div>
                        <div>
                            <h1 className="font-headline-sm text-headline-sm leading-none font-black text-primary">
                                KOPERA-PLUS
                            </h1>
                            <p className="mt-1 text-[10px] font-bold text-zinc-400 uppercase">
                                Community Explorer
                            </p>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-1">
                        <Link
                            className="mx-2 flex items-center gap-3 rounded-xl bg-primary/5 px-4 py-3 text-sm font-bold text-primary"
                            href="/explorer-dashboard"
                        >
                            <LayoutDashboard className="h-4 w-4 text-primary" />
                            <span>Dashboard</span>
                        </Link>
                        <Link
                            className="mx-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-600 transition-colors hover:bg-slate-50"
                            href="/workspace"
                        >
                            <span className="material-symbols-outlined text-zinc-400">
                                groups
                            </span>
                            <span>Explore Coops</span>
                        </Link>
                        <Link
                            className="mx-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-600 transition-colors hover:bg-slate-50"
                            href="/assistant"
                        >
                            <Store className="h-4 w-4 text-zinc-400" />
                            <span>Marketplace</span>
                        </Link>
                        <Link
                            className="mx-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-600 transition-colors hover:bg-slate-50"
                            href="/workspace"
                        >
                            <Calendar className="h-4 w-4 text-zinc-400" />
                            <span>Events</span>
                        </Link>
                        <Link
                            className="mx-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-600 transition-colors hover:bg-slate-50"
                            href="/workspace"
                        >
                            <BookOpen className="h-4 w-4 text-zinc-400" />
                            <span>Learning Center</span>
                        </Link>
                    </nav>

                    <div className="mt-auto px-4 pb-4">
                        <Link
                            href="/login"
                            className="block w-full rounded-xl bg-primary py-3 text-center font-label-md text-sm font-semibold text-white shadow-lg transition-all hover:brightness-110"
                        >
                            Upgrade to Member
                        </Link>
                    </div>
                </aside>

                {/* Main Content Wrapper */}
                <div className="flex min-h-screen flex-grow flex-col md:ml-64">
                    {/* TopNavBar */}
                    <header className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-zinc-200/50 bg-white/80 px-8 py-4 shadow-sm backdrop-blur-md">
                        <div className="flex max-w-xl flex-grow items-center">
                            <div className="relative w-full">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                                <input
                                    className="w-full rounded-full border border-zinc-200/50 bg-slate-100 py-2 pr-4 pl-10 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                                    placeholder="Search cooperatives, products, or ask AI..."
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="ml-6 flex items-center gap-6 text-sm">
                            <Link
                                className="font-bold text-primary hover:underline"
                                href="/onboarding"
                            >
                                Join Community
                            </Link>
                            <div className="flex items-center gap-3 border-l border-zinc-200 pl-6">
                                <button className="rounded-full p-2 text-zinc-600 hover:bg-slate-100">
                                    <Bell className="h-5 w-5" />
                                </button>
                                <div className="h-10 w-10 overflow-hidden rounded-full border border-zinc-300 bg-slate-200">
                                    <img
                                        className="h-full w-full object-cover"
                                        alt="Explorer avatar"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgGFYPJJrQS59wIbI2FuPkEUtimZi9vTjCaJl1jSk3skE4hCA7Oq8JU2mdKCauJ6Iw14Fgu1ne-760PCZkYWZ4BPIhVGsDHyrQG2GfeqEX3aoMJMBIKLV1yMwHcqfu2QMZxZZSOYNFwIA6OI24q51G8CSxELDNIOD4hmSKGI-NkicK6PAfEQ0llKQSYYe8Rvg-0nTPy_-kvEIL0dOJwFxt0fNlbECQ-No9V8lPAshfDNoiB7e8TUeZKY8ypFpslhW20X8dmj-rRHc"
                                    />
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Main Scrollable Content Area */}
                    <main className="mx-auto w-full max-w-[1440px] flex-1 px-8 py-10">
                        {/* Hero Section */}
                        <section className="relative mb-12 overflow-hidden rounded-3xl bg-zinc-900 p-8 text-white shadow-xl md:p-12 lg:p-16">
                            <div className="pointer-events-none absolute -top-20 -right-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
                            <div className="relative z-10 max-w-3xl">
                                <h2 className="font-display-sm mb-4 text-3xl leading-tight font-extrabold">
                                    Welcome to KOPERA AI 👋
                                </h2>
                                <p className="mb-10 text-sm opacity-90">
                                    Discover modern cooperatives powered by
                                    Artificial Intelligence.
                                </p>
                                <div className="mb-8 flex flex-col gap-3 md:flex-row">
                                    <div className="relative flex-1">
                                        <Brain className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 animate-pulse text-blue-400" />
                                        <input
                                            className="w-full rounded-2xl border border-white/20 bg-white/10 py-4 pr-4 pl-12 text-sm text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-500/30 focus:outline-none"
                                            placeholder="Ask AI: 'Find agriculture coops near me'"
                                            type="text"
                                            value={input}
                                            onChange={(e) =>
                                                setInput(e.target.value)
                                            }
                                            onKeyDown={(e) =>
                                                e.key === 'Enter' &&
                                                handleAISearch()
                                            }
                                        />
                                    </div>
                                    <button
                                        onClick={handleAISearch}
                                        className="hover:bg-opacity-95 flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-label-md font-semibold text-white shadow-lg transition-all"
                                    >
                                        <span>Search AI</span>
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2.5">
                                    {[
                                        'Find Cooperatives',
                                        'Browse Products',
                                        'Ask AI Co-pilot',
                                        'Join Public Events',
                                    ].map((chip, cIdx) => (
                                        <button
                                            key={cIdx}
                                            onClick={() =>
                                                showToast(
                                                    `Opening explorer category: "${chip}"`,
                                                )
                                            }
                                            className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs text-white shadow-sm transition-colors hover:bg-white/20"
                                        >
                                            {chip}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* AI Recommendation & Featured Section */}
                        <div className="animate-fadeInUp mb-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
                            {/* AI Recommendation Card */}
                            <div className="bento-card relative flex flex-col justify-between border border-zinc-200/50 p-6 shadow-sm lg:col-span-1">
                                <div>
                                    <div className="mb-4 flex items-center gap-2">
                                        <Brain className="h-5 w-5 animate-pulse text-blue-600" />
                                        <h3 className="font-headline-sm text-base font-bold">
                                            AI Recommended
                                        </h3>
                                    </div>
                                    <div className="mb-4 rounded-xl border border-blue-100 bg-blue-50 p-4 text-xs leading-relaxed font-semibold text-blue-900">
                                        🤖 Based on your interests, we recommend
                                        Koperasi Tani Sejahtera.
                                    </div>
                                    <div className="mb-6 space-y-3 text-xs text-zinc-500">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">
                                                location_on
                                            </span>
                                            <span>
                                                2km away from your location
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">
                                                agriculture
                                            </span>
                                            <span>Agriculture-focused</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">
                                                star
                                            </span>
                                            <span>
                                                High Member Satisfaction
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="hover:bg-opacity-95 w-full rounded-xl bg-blue-600 py-3 font-label-md text-xs font-bold text-white shadow-md shadow-blue-500/10 transition-colors"
                                    onClick={() =>
                                        showToast(
                                            'Opening details for Koperasi Tani Sejahtera...',
                                        )
                                    }
                                >
                                    View Details
                                </button>
                            </div>

                            {/* Featured Cooperatives */}
                            <div className="flex flex-col lg:col-span-2">
                                <div className="mb-4 flex items-center justify-between px-2">
                                    <h3 className="font-headline-sm text-base font-bold text-zinc-950">
                                        Featured Cooperatives
                                    </h3>
                                    <button
                                        className="text-xs font-bold text-primary hover:underline"
                                        onClick={() =>
                                            showToast(
                                                'Loading all cooperatives...',
                                            )
                                        }
                                    >
                                        View All
                                    </button>
                                </div>
                                <div className="custom-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-4">
                                    {coops.map((coop, cIdx) => (
                                        <div
                                            key={cIdx}
                                            className="bento-card flex w-[280px] min-w-[280px] shrink-0 flex-col overflow-hidden border border-zinc-200/50 shadow-sm"
                                        >
                                            <div className="relative h-32 w-full">
                                                <img
                                                    className="h-full w-full object-cover"
                                                    alt={coop.name}
                                                    src={coop.image}
                                                />
                                            </div>
                                            <div className="flex flex-1 flex-col justify-between p-4">
                                                <div className="mb-2 flex items-start justify-between">
                                                    <div className="relative z-10 -mt-8 flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
                                                        <img
                                                            className="h-8 w-8 object-contain"
                                                            alt="Coop Logo"
                                                            src={coop.logo}
                                                        />
                                                    </div>
                                                    {coop.verified && (
                                                        <span className="flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[9px] font-extrabold text-emerald-700 uppercase">
                                                            Verified
                                                        </span>
                                                    )}
                                                </div>
                                                <h4 className="mb-1 font-headline-sm text-xs font-bold text-zinc-950">
                                                    {coop.name}
                                                </h4>
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                                    <span className="text-xs font-bold">
                                                        {coop.rating}
                                                    </span>
                                                    <span className="text-[10px] text-zinc-400">
                                                        ({coop.members})
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Popular Products Section */}
                        <section className="mb-12">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="font-headline-md text-lg font-bold">
                                    Popular Products
                                </h3>
                                <Link
                                    className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                                    href="/assistant"
                                >
                                    Explore Marketplace
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {products.map((prod, pIdx) => (
                                    <div
                                        key={pIdx}
                                        className="bento-card group flex flex-col overflow-hidden border border-zinc-200/50 shadow-sm"
                                    >
                                        <div className="relative h-48 w-full overflow-hidden">
                                            <img
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                alt={prod.name}
                                                src={prod.image}
                                            />
                                            <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-extrabold tracking-wider shadow-sm backdrop-blur">
                                                <span
                                                    className={`h-1.5 w-1.5 rounded-full ${prod.lowStock ? 'bg-red-500' : 'animate-pulse bg-green-500'}`}
                                                ></span>
                                                {prod.lowStock
                                                    ? 'LOW STOCK'
                                                    : 'LIVE STOCK'}
                                            </div>
                                        </div>
                                        <div className="flex flex-grow flex-col justify-between p-5">
                                            <div className="mb-4">
                                                <h4 className="mb-1 font-headline-sm text-xs font-bold text-zinc-950">
                                                    {prod.name}
                                                </h4>
                                                <p className="text-[10px] font-semibold text-zinc-400">
                                                    {prod.coop}
                                                </p>
                                            </div>
                                            <div className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-3">
                                                <span className="text-sm font-bold text-primary">
                                                    {prod.price}
                                                </span>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() =>
                                                            showToast(
                                                                `Purchased ${prod.name}!`,
                                                            )
                                                        }
                                                        className="rounded-lg bg-primary px-3 py-1.5 text-[10px] font-bold text-white transition-all hover:brightness-105 active:scale-95"
                                                    >
                                                        Buy
                                                    </button>
                                                    <Link
                                                        href="/assistant"
                                                        className="rounded-lg border border-blue-500/30 p-1.5 text-blue-600 transition-colors hover:bg-blue-50/50"
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
                            <h3 className="mb-6 font-headline-md text-lg font-bold">
                                Learning Center
                            </h3>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                <div
                                    className="bento-card flex cursor-pointer flex-col justify-between border border-zinc-200/50 p-6 shadow-sm transition-transform duration-300 hover:scale-[1.02]"
                                    onClick={() =>
                                        showToast(
                                            'Opening Module: What is a Cooperative?',
                                        )
                                    }
                                >
                                    <div className="mb-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                        <HelpCircle className="h-6 w-6" />
                                    </div>
                                    <h4 className="mb-2 font-headline-sm text-sm font-bold text-zinc-950">
                                        What is a Cooperative?
                                    </h4>
                                    <p className="mb-6 text-xs leading-relaxed text-zinc-500">
                                        Learn the fundamental principles of
                                        community-driven businesses and
                                        cooperative growth.
                                    </p>
                                    <span className="mt-auto flex items-center gap-1.5 text-xs font-bold text-primary">
                                        Read Module{' '}
                                        <ArrowRight className="h-3 w-3" />
                                    </span>
                                </div>
                                <div
                                    className="bento-card flex cursor-pointer flex-col justify-between border border-zinc-200/50 p-6 shadow-sm transition-transform duration-300 hover:scale-[1.02]"
                                    onClick={() =>
                                        showToast(
                                            'Opening Module: Benefits of Membership?',
                                        )
                                    }
                                >
                                    <div className="mb-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                                        <span className="material-symbols-outlined">
                                            card_membership
                                        </span>
                                    </div>
                                    <h4 className="mb-2 font-headline-sm text-sm font-bold text-zinc-950">
                                        Benefits of Membership
                                    </h4>
                                    <p className="mb-6 text-xs leading-relaxed text-zinc-500">
                                        Discover unique privileges of
                                        cooperative membership, from dividend
                                        RAT shares to collective buying power.
                                    </p>
                                    <span className="mt-auto flex items-center gap-1.5 text-xs font-bold text-primary">
                                        Read Module{' '}
                                        <ArrowRight className="h-3 w-3" />
                                    </span>
                                </div>
                                <div
                                    className="bento-card flex cursor-pointer flex-col justify-between border border-zinc-200/50 p-6 shadow-sm transition-transform duration-300 hover:scale-[1.02]"
                                    onClick={() =>
                                        showToast(
                                            'Opening Module: Financial Literacy?',
                                        )
                                    }
                                >
                                    <div className="mb-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                        <span className="material-symbols-outlined">
                                            payments
                                        </span>
                                    </div>
                                    <h4 className="mb-2 font-headline-sm text-sm font-bold text-zinc-950">
                                        Financial Literacy
                                    </h4>
                                    <p className="mb-6 text-xs leading-relaxed text-zinc-500">
                                        Master your personal finance with
                                        specialized courses tailored for
                                        cooperative environments.
                                    </p>
                                    <span className="mt-auto flex items-center gap-1.5 text-xs font-bold text-primary">
                                        Read Module{' '}
                                        <ArrowRight className="h-3 w-3" />
                                    </span>
                                </div>
                            </div>
                        </section>

                        {/* Success Stories */}
                        <section className="mb-12">
                            <div className="bento-card grid grid-cols-1 overflow-hidden border border-zinc-200/50 shadow-sm lg:grid-cols-2">
                                <div className="h-64 min-h-[300px] lg:h-full">
                                    <img
                                        className="h-full w-full object-cover"
                                        alt="Success Story Sarah"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmE-XfeJT1t8t6F2yHgQ-oiBvygSaDeI7a-976JkYaKJrJ7T7_i3w9zyTiO_9phNjgYlg3U_wt_wQv-kZMSL2pnIfYwIT29YtwGAIxkSbXkcdl0yOyECXQa8LTp7eNvVZ2FVubRfmJ1rxc96eZZzGLD8lPFb8t7aWkIUG7CW7dacJWqDJdM_JQ-go0i0GMwzpqSea1uf8_5-1sMs_OTJZAriwyEwJZf-lQYUTm59zr2aZiEJnP5GingDcX4Hw8HfhEQivmF020cS0"
                                    />
                                </div>
                                <div className="flex flex-col justify-center p-8 lg:p-12">
                                    <div className="mb-4 flex items-center gap-2 text-xs font-bold tracking-widest text-blue-600 uppercase">
                                        <span
                                            className="material-symbols-outlined text-sm"
                                            style={{
                                                fontVariationSettings:
                                                    "'FILL' 1",
                                            }}
                                        >
                                            format_quote
                                        </span>
                                        <span>Member Spotlight</span>
                                    </div>
                                    <h3 className="font-display-sm mb-6 text-2xl leading-tight font-bold">
                                        "Joining KOPERA-PLUS transformed my
                                        local craft into a sustainable business
                                        with global reach."
                                    </h3>
                                    <p className="mb-8 text-xs font-semibold text-zinc-500">
                                        Sarah Wijaya, Founder of Batik Modern
                                        Collective
                                    </p>
                                    <div className="flex items-center gap-8">
                                        <div>
                                            <div className="text-2xl font-black text-primary">
                                                200%
                                            </div>
                                            <div className="mt-1 text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                                                Income Growth
                                            </div>
                                        </div>
                                        <div className="h-10 w-px bg-zinc-200"></div>
                                        <div>
                                            <div className="text-2xl font-black text-primary">
                                                15+
                                            </div>
                                            <div className="mt-1 text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                                                New Partners
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Become a Member CTA */}
                        <section className="mb-12">
                            <div className="bento-card relative overflow-hidden bg-primary p-8 text-white shadow-lg md:p-12 lg:p-16">
                                <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
                                <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"></div>
                                <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                                    <div>
                                        <h2 className="font-display-sm mb-6 text-2xl leading-tight font-bold">
                                            Ready to shape the future of
                                            community business?
                                        </h2>
                                        <p className="mb-8 text-sm leading-relaxed opacity-80">
                                            Join over 10,000 members who are
                                            already building a better economic
                                            future together.
                                        </p>
                                        <Link
                                            href="/onboarding"
                                            className="block w-fit rounded-2xl bg-white px-10 py-5 text-center font-headline-sm text-sm font-extrabold text-primary shadow-xl transition-transform hover:scale-105 active:scale-95"
                                        >
                                            Become a Member
                                        </Link>
                                    </div>
                                    <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
                                        <h4 className="mb-6 text-sm font-bold tracking-wider text-white uppercase">
                                            Membership Benefits
                                        </h4>
                                        <ul className="space-y-4 text-xs font-semibold">
                                            <li className="flex items-center gap-3">
                                                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
                                                <span>
                                                    Personalized AI Advisor
                                                    Access
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
                                                <span>
                                                    Exclusive Member Marketplace
                                                    Deals
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
                                                <span>
                                                    Voting Rights on Community
                                                    Decisions
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
                                                <span>
                                                    Annual Profit Dividends
                                                    (SHU)
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>

                    {/* Footer */}
                    <footer className="border-t border-zinc-200 bg-white px-8 py-8">
                        <div className="flex flex-col items-center justify-between gap-4 text-xs md:flex-row">
                            <div className="flex items-center gap-2">
                                <span className="text-zinc-500">
                                    © 2024 KOPERA-PLUS. All rights reserved.
                                </span>
                            </div>
                            <div className="flex gap-6 text-zinc-500">
                                <a
                                    className="transition-colors hover:text-primary"
                                    href="#"
                                >
                                    Privacy Policy
                                </a>
                                <a
                                    className="transition-colors hover:text-primary"
                                    href="#"
                                >
                                    Terms of Service
                                </a>
                                <a
                                    className="transition-colors hover:text-primary"
                                    href="#"
                                >
                                    Contact Us
                                </a>
                            </div>
                        </div>
                    </footer>
                </div>
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
