import { Head, Link } from '@inertiajs/react';
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
import PrototypeHud from '@/components/PrototypeHud';

interface Message {
    sender: 'user' | 'ai';
    text: string;
    showCard?: boolean;
}

export default function Dashboard() {
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

    // Chat states
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'user', text: 'I want to buy Premium Rice.' },
        {
            sender: 'ai',
            text: "I've found a matching product from Green Life Cooperative inventory. Here are the details:",
            showCard: true,
        },
    ]);
    const [chatInput, setChatInput] = useState('');
    const [, setIsTyping] = useState(false);

    // Community feed states
    const [feedPosts, setFeedPosts] = useState([
        {
            id: 1,
            author: 'Sarah Jenkins',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPFhkd_ENsZpyI8li2qveKX9fOxFBQfZlD_uaY8XCXtdB7g4GBUYWPvth4feq9p5qi3Sv4I97-OaSjaI1RgaKPrW1QBHuNmjNRZZ28wp__4_FULSMVjcmPKN-8gOPzW5sqntUa8pm5F0aYjpHjvwYq5g42lOQpl-WxnhyCtZBGNIfJr1GBK9tPPqqRK6H-oa-SU6efoCyZtpqJxRD001teC0h4Jc-pRApCelZLdKRBB0slwFVy-PGWGmkirB0F1Ff088Y95ko1LpU',
            role: 'Top Contributor',
            content:
                'Our organic harvest yields are up by 25% this month! Thanks to Green Life Cooperative for supplying verified fertilizers.',
            likes: 42,
            comments: 8,
        },
        {
            id: 2,
            author: 'Muhammad Rizky',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPFhkd_ENsZpyI8li2qveKX9fOxFBQfZlD_uaY8XCXtdB7g4GBUYWPvth4feq9p5qi3Sv4I97-OaSjaI1RgaKPrW1QBHuNmjNRZZ28wp__4_FULSMVjcmPKN-8gOPzW5sqntUa8pm5F0aYjpHjvwYq5g42lOQpl-WxnhyCtZBGNIfJr1GBK9tPPqqRK6H-oa-SU6efoCyZtpqJxRD001teC0h4Jc-pRApCelZLdKRBB0slwFVy-PGWGmkirB0F1Ff088Y95ko1LpU',
            role: 'Diamond Member',
            content:
                'Excited about the upcoming Digital RAT! Looking forward to voting on the new dividend allocation proposals.',
            likes: 18,
            comments: 2,
        },
    ]);
    const [newPostContent, setNewPostContent] = useState('');

    // Governance voting states
    const [votes, setVotes] = useState<Record<number, 'yes' | 'no' | null>>({
        1: null,
        2: null,
    });

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
                    text: `I've analyzed your request for "${textToSend}". I will fetch live inventories and check the cooperative benefits database.`,
                },
            ]);
            showToast('AI updated query results');
        }, 1200);
    };

    const handleCreatePost = () => {
        if (!newPostContent.trim()) {
            return;
        }

        const newPost = {
            id: Date.now(),
            author: 'Muhammad Rizky',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgGFYPJJrQS59wIbI2FuPkEUtimZi9vTjCaJl1jSk3skE4hCA7Oq8JU2mdKCauJ6Iw14Fgu1ne-760PCZkYWZ4BPIhVGsDHyrQG2GfeqEX3aoMJMBIKLV1yMwHcqfu2QMZxZZSOYNFwIA6OI24q51G8CSxELDNIOD4hmSKGI-NkicK6PAfEQ0llKQSYYe8Rvg-0nTPy_-kvEIL0dOJwFxt0fNlbECQ-No9V8lPAshfDNoiB7e8TUeZKY8ypFpslhW20X8dmj-rRHc',
            role: 'Diamond Member',
            content: newPostContent,
            likes: 0,
            comments: 0,
        };
        setFeedPosts((prev) => [newPost, ...prev]);
        setNewPostContent('');
        showToast('Post shared to community!');
    };

    const handleVote = (proposalId: number, option: 'yes' | 'no') => {
        setVotes((prev) => ({ ...prev, [proposalId]: option }));
        showToast(`Voted ${option.toUpperCase()} on Proposal #${proposalId}!`);
    };

    return (
        <>
            <Head title="Member Portal | KOPERA-PLUS" />

            <div className="flex min-h-screen overflow-x-hidden bg-[#f8f9ff] font-sans text-[#0b1c30] antialiased">
                {/* Left Side Navigation (Universal Dashboard Sidebar) */}
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
                                    AI-First Governance
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
                                <span>Dashboard</span>
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
                                <span>AI Member Assistant</span>
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
                                <span>Rewards</span>
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
                                <span>Digital RAT</span>
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
                                <span>Community</span>
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
                                <span>Profile</span>
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
                                <span>Settings</span>
                            </button>
                            <Link
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
                                href="/"
                            >
                                <span className="material-symbols-outlined">
                                    logout
                                </span>
                                <span>Logout</span>
                            </Link>
                        </div>

                    </div>
                </aside>

                {/* Main Content Area Wrapper */}
                <div className="ml-64 flex min-h-screen flex-grow flex-col bg-slate-50">
                    {/* Universal TopNavBar */}
                    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-zinc-200/50 bg-white px-8 py-4">
                        <div className="relative w-full max-w-md">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                            <input
                                className="w-full rounded-full border border-zinc-200 bg-slate-50 py-2 pr-4 pl-10 text-xs text-zinc-800 focus:outline-none"
                                placeholder="Search cooperatives, products, or ask AI..."
                                type="text"
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="relative rounded-full p-2 text-zinc-600 transition-all hover:bg-slate-50">
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
                            </button>
                            <button
                                className="rounded-full p-2 text-zinc-600 transition-all hover:bg-slate-50"
                                onClick={() =>
                                    showToast('Dark mode toggle clicked.')
                                }
                            >
                                <span className="material-symbols-outlined text-xl">
                                    dark_mode
                                </span>
                            </button>
                            <div className="ml-2 flex items-center gap-3 border-l border-zinc-200 pl-4">
                                <div className="text-right">
                                    <p className="text-xs leading-none font-bold">
                                        Muhammad Rizky
                                    </p>
                                    <p className="mt-0.5 text-[9px] font-bold text-zinc-400">
                                        Diamond Member
                                    </p>
                                </div>
                                <div className="h-9 w-9 overflow-hidden rounded-full border border-zinc-300 bg-slate-200">
                                    <img
                                        className="h-full w-full object-cover"
                                        alt="Profile"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgGFYPJJrQS59wIbI2FuPkEUtimZi9vTjCaJl1jSk3skE4hCA7Oq8JU2mdKCauJ6Iw14Fgu1ne-760PCZkYWZ4BPIhVGsDHyrQG2GfeqEX3aoMJMBIKLV1yMwHcqfu2QMZxZZSOYNFwIA6OI24q51G8CSxELDNIOD4hmSKGI-NkicK6PAfEQ0llKQSYYe8Rvg-0nTPy_-kvEIL0dOJwFxt0fNlbECQ-No9V8lPAshfDNoiB7e8TUeZKY8ypFpslhW20X8dmj-rRHc"
                                    />
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* DYNAMIC TABS RENDERING */}
                    <div className="mx-auto flex w-full max-w-[1440px] flex-grow gap-8 p-8">
                        {/* TAB 1: DASHBOARD */}
                        {currentTab === 'dashboard' && (
                            <div className="animate-fadeIn flex w-full gap-8">
                                {/* Left Section of main dashboard */}
                                <div className="flex-1 space-y-8">
                                    {/* Greeting */}
                                    <div>
                                        <h2 className="font-display-sm flex items-center gap-2 text-3xl font-extrabold text-zinc-900">
                                            Good Morning, Muhammad{' '}
                                            <span className="animate-wiggle">
                                                👋
                                            </span>
                                        </h2>
                                        <p className="mt-1 text-sm text-zinc-500">
                                            Your cooperative portfolio grew by{' '}
                                            <strong className="font-bold text-emerald-600">
                                                +4.2%
                                            </strong>{' '}
                                            this week. How can I help you today?
                                        </p>
                                    </div>

                                    {/* Quick action buttons row */}
                                    <div className="flex flex-wrap gap-2.5">
                                        <button
                                            className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-bold shadow-sm transition-colors hover:bg-slate-50"
                                            onClick={() =>
                                                showToast(
                                                    'Searching cooperatives...',
                                                )
                                            }
                                        >
                                            <Compass className="h-3.5 w-3.5 text-primary" />{' '}
                                            Find Cooperative
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
                                            Buy Product
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
                                            Check SHU
                                        </button>
                                        <button
                                            className="flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-primary/20 transition-all hover:opacity-95 active:scale-95"
                                            onClick={() => setCurrentTab('rat')}
                                        >
                                            <Sparkles className="h-3.5 w-3.5 text-white" />{' '}
                                            Join Digital RAT
                                        </button>
                                    </div>

                                    {/* AI Assistant Preview Card */}
                                    <div className="bento-card border border-zinc-200/50 bg-white p-6 shadow-md">
                                        <div className="mb-6 flex items-center gap-3 border-b border-zinc-100 pb-4">
                                            <Brain className="h-6 w-6 animate-pulse text-blue-600" />
                                            <div>
                                                <h3 className="font-headline-sm text-sm font-bold text-zinc-950">
                                                    AI Member Assistant
                                                </h3>
                                                <p className="text-[10px] text-zinc-400">
                                                    Ask me anything about your
                                                    membership or cooperative
                                                    status.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mb-6 space-y-4">
                                            <div className="flex gap-4">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
                                                    AI
                                                </div>
                                                <div className="max-w-2xl rounded-2xl rounded-tl-none border border-zinc-200/30 bg-slate-50 p-4 text-xs leading-relaxed text-zinc-700">
                                                    Welcome back,{' '}
                                                    <strong className="font-bold text-zinc-900">
                                                        Muhammad
                                                    </strong>
                                                    ! I've analyzed your latest
                                                    transactions. You've earned{' '}
                                                    <strong className="font-bold text-blue-700">
                                                        250 extra coins
                                                    </strong>{' '}
                                                    this week from the community
                                                    challenge. Would you like to
                                                    see how to redeem them?
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-3 border-t border-zinc-100 pt-4">
                                            <button
                                                onClick={() =>
                                                    setCurrentTab('rewards')
                                                }
                                                className="rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white transition-all hover:brightness-105 active:scale-95"
                                            >
                                                Yes, please show me the
                                                available rewards.
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setCurrentTab('assistant')
                                                }
                                                className="flex items-center gap-1 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-bold text-zinc-700 transition-all hover:bg-slate-50"
                                            >
                                                Continue Chat{' '}
                                                <ArrowRight className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Sub-cards Grid: Digital RAT countdown & Activity */}
                                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                        <div className="bento-card border border-zinc-200/50 p-6 shadow-md">
                                            <div className="mb-6 flex items-center gap-3 border-b border-zinc-100 pb-4">
                                                <Calendar className="h-5 w-5 text-blue-600" />
                                                <h4 className="text-sm font-bold">
                                                    Digital RAT Countdown
                                                </h4>
                                            </div>
                                            <div className="mb-6 space-y-3 text-xs">
                                                <div className="flex justify-between">
                                                    <span className="text-zinc-400">
                                                        Date:
                                                    </span>
                                                    <strong className="font-bold text-zinc-800">
                                                        Oct 24, 2023 • 09:00 AM
                                                    </strong>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-zinc-400">
                                                        Countdown:
                                                    </span>
                                                    <strong className="font-bold text-blue-600">
                                                        2d 14h 32m
                                                    </strong>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    setCurrentTab('rat')
                                                }
                                                className="w-full rounded-xl bg-primary py-3 text-xs font-bold text-white transition-all hover:opacity-95 active:scale-95"
                                            >
                                                Join Meeting Lobby
                                            </button>
                                        </div>

                                        <div className="bento-card border border-zinc-200/50 p-6 shadow-md">
                                            <h4 className="mb-6 border-b border-zinc-100 pb-4 text-sm font-bold">
                                                Recent Activity
                                            </h4>
                                            <div className="space-y-3.5 text-xs">
                                                <div className="flex items-start gap-3">
                                                    <span className="material-symbols-outlined mt-0.5 text-[16px] text-zinc-400">
                                                        shopping_bag
                                                    </span>
                                                    <div>
                                                        <p className="font-bold">
                                                            Purchased Organic
                                                            Rice
                                                        </p>
                                                        <p className="text-[10px] text-zinc-400">
                                                            5kg - Green Life
                                                            Cooperative • 2h ago
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <span className="material-symbols-outlined mt-0.5 text-[16px] text-zinc-400">
                                                        workspace_premium
                                                    </span>
                                                    <div>
                                                        <p className="font-bold">
                                                            Earned Rewards
                                                        </p>
                                                        <p className="text-[10px] text-zinc-400">
                                                            +50 Coins from Vote
                                                            • yesterday
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right sidebar panel of main dashboard */}
                                <div className="w-80 shrink-0 space-y-6">
                                    {/* Rewards Card */}
                                    <div className="bento-card border border-zinc-200/50 p-5 shadow-sm">
                                        <div className="mb-4 flex items-center justify-between">
                                            <h4 className="text-xs font-bold text-zinc-800">
                                                Rewards Progress
                                            </h4>
                                            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700 uppercase">
                                                Level 12
                                            </span>
                                        </div>
                                        <div className="mb-2 flex justify-between text-xs font-semibold">
                                            <span className="text-zinc-500">
                                                4,250 / 5,000 XP
                                            </span>
                                            <span className="text-blue-700">
                                                85%
                                            </span>
                                        </div>
                                        <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                            <div
                                                className="h-full rounded-full bg-blue-600"
                                                style={{ width: '85%' }}
                                            ></div>
                                        </div>
                                        <div className="rounded-xl border border-blue-100/50 bg-blue-50 p-3.5 text-[10px] leading-relaxed font-semibold text-blue-900">
                                            🎯 <strong>Today's Mission</strong>:
                                            Vote on 2 governance proposals (+50
                                            XP)
                                        </div>
                                    </div>

                                    {/* Smart Governance card */}
                                    <div className="bento-card space-y-4 border border-zinc-200/50 p-5 shadow-sm">
                                        <h4 className="text-xs font-bold text-zinc-800">
                                            Smart Governance Status
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3 text-center">
                                            <div className="rounded-xl border border-zinc-200/30 bg-slate-50 p-3">
                                                <p className="text-[9px] font-bold text-zinc-400 uppercase">
                                                    Participation
                                                </p>
                                                <p className="mt-1 text-base font-black text-primary">
                                                    94.2%
                                                </p>
                                            </div>
                                            <div className="rounded-xl border border-zinc-200/30 bg-slate-50 p-3">
                                                <p className="text-[9px] font-bold text-zinc-400 uppercase">
                                                    Transparency
                                                </p>
                                                <p className="mt-1 text-base font-black text-emerald-700">
                                                    A+
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() =>
                                                setCurrentTab('governance')
                                            }
                                            className="w-full rounded-lg bg-primary/10 py-2 text-xs font-bold text-primary transition-all hover:bg-primary/20"
                                        >
                                            Cast Proposal Votes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 2: AI MEMBER ASSISTANT (CHAT INTERFACE) */}
                        {currentTab === 'assistant' && (
                            <div className="animate-fadeIn flex w-full gap-8">
                                <div className="border-zinc-250/30 flex h-[650px] flex-1 flex-col justify-between rounded-3xl border bg-white p-6 shadow-sm">
                                    <div className="mb-4 flex items-center justify-between border-b border-zinc-100 pb-4">
                                        <div>
                                            <h3 className="flex items-center gap-2 text-sm font-bold text-zinc-950">
                                                AI Member Assistant{' '}
                                                <Brain className="h-4.5 w-4.5 text-blue-600" />
                                            </h3>
                                            <p className="text-[10px] text-zinc-400">
                                                Interact with KOPERA
                                                intelligence core directly.
                                            </p>
                                        </div>
                                        <button
                                            onClick={() =>
                                                setMessages([
                                                    {
                                                        sender: 'ai',
                                                        text: 'New Chat Session loaded. What is your request?',
                                                    },
                                                ])
                                            }
                                            className="text-xs font-bold text-primary hover:underline"
                                        >
                                            Clear Thread
                                        </button>
                                    </div>

                                    {/* Messages View */}
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
                                                    {msg.showCard && (
                                                        <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200 bg-white text-zinc-800">
                                                            <img
                                                                className="h-32 w-full object-cover"
                                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHAso7gSAxYgOjquC3G-bOpfr2QfZg3-8EYReKKo7w89v2stwHsuQ4It3GaFD-1W3aNKnPXlOHBluGPdv2idmYF_toIOrpbYIiP1yx2F2DqUu5gyKtZth2xuYDlayLC6NgTTh3bEVDv3ATOSwDl7M2JVavF8XLUeP51NQcZgAaZmHjTsbcBfRsXXC81_oybEiZUOGVya9tyZ76DK11HEfnFka1QgEJ_kVMAG3zw0c-m-zAI_KJwwyP8R7MZ25mQAABlV3wdFKcAKI"
                                                            />
                                                            <div className="p-4">
                                                                <h4 className="font-bold">
                                                                    Premium Rice
                                                                    5kg
                                                                </h4>
                                                                <p className="mb-2 text-[10px] text-zinc-400">
                                                                    Rp75.000
                                                                </p>
                                                                <button
                                                                    onClick={() =>
                                                                        showToast(
                                                                            'Order processed.',
                                                                        )
                                                                    }
                                                                    className="w-full rounded-lg bg-primary py-2 text-[10px] font-bold text-white"
                                                                >
                                                                    Buy Now
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Input bar */}
                                    <div className="mt-4 flex items-center gap-3 border-t border-zinc-100 pt-4">
                                        <input
                                            className="flex-grow rounded-xl border border-zinc-200 bg-slate-50 px-4 py-3 text-xs text-zinc-800 outline-none focus:ring-1 focus:ring-primary/20"
                                            placeholder="Ask KOPERA AI..."
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

                        {/* TAB 3: REWARDS (XP, POINTS & REDEEMING) */}
                        {currentTab === 'rewards' && (
                            <div className="animate-fadeIn w-full space-y-8">
                                <div className="bento-card border border-zinc-200/50 p-8 shadow-md">
                                    <h3 className="font-display-sm mb-2 text-xl font-bold">
                                        XP Rewards & Voucher Store
                                    </h3>
                                    <p className="mb-8 text-xs text-zinc-400">
                                        Redeem earned cooperative points for
                                        real rewards or dividend options.
                                    </p>

                                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
                                        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 text-center">
                                            <p className="text-[10px] font-bold text-blue-700 uppercase">
                                                Redeemable Points
                                            </p>
                                            <p className="mt-2 text-3xl font-black text-blue-900">
                                                4,250
                                            </p>
                                        </div>
                                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-center">
                                            <p className="text-[10px] font-bold text-emerald-700 uppercase">
                                                Lifetime Earned
                                            </p>
                                            <p className="mt-2 text-3xl font-black text-emerald-900">
                                                12,800
                                            </p>
                                        </div>
                                    </div>

                                    <h4 className="mb-4 text-sm font-bold">
                                        Available Reward Vouchers
                                    </h4>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                        <div className="flex flex-col justify-between rounded-2xl border border-zinc-200 p-5 transition-colors hover:border-primary">
                                            <div>
                                                <span className="rounded bg-blue-100 px-2 py-0.5 text-[9px] font-bold text-blue-700">
                                                    500 PTS
                                                </span>
                                                <h5 className="mt-3 text-xs font-bold">
                                                    Free Premium Rice Bag (5kg)
                                                </h5>
                                                <p className="mt-1 text-[10px] text-zinc-400">
                                                    Claim one free bag of long
                                                    grain organic white rice.
                                                </p>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    showToast(
                                                        'Voucher claimed!',
                                                    )
                                                }
                                                className="mt-6 w-full rounded-lg bg-primary py-2.5 text-xs font-bold text-white transition-all hover:brightness-105 active:scale-95"
                                            >
                                                Claim Reward
                                            </button>
                                        </div>
                                        <div className="flex flex-col justify-between rounded-2xl border border-zinc-200 p-5 transition-colors hover:border-primary">
                                            <div>
                                                <span className="rounded bg-blue-100 px-2 py-0.5 text-[9px] font-bold text-blue-700">
                                                    300 PTS
                                                </span>
                                                <h5 className="mt-3 text-xs font-bold">
                                                    Organic Fertilizer 1L
                                                </h5>
                                                <p className="mt-1 text-[10px] text-zinc-400">
                                                    Redeem for one bottle of
                                                    verified organic liquid
                                                    compost.
                                                </p>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    showToast(
                                                        'Voucher claimed!',
                                                    )
                                                }
                                                className="mt-6 w-full rounded-lg bg-primary py-2.5 text-xs font-bold text-white transition-all hover:brightness-105 active:scale-95"
                                            >
                                                Claim Reward
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 4: SMART GOVERNANCE (VOTING & PROPOSALS) */}
                        {currentTab === 'governance' && (
                            <div className="animate-fadeIn w-full space-y-8">
                                <div className="bento-card border border-zinc-200/50 p-8 shadow-md">
                                    <h3 className="font-display-sm mb-2 text-xl font-bold">
                                        Smart Governance Voting
                                    </h3>
                                    <p className="mb-8 text-xs text-zinc-400">
                                        Cast your vote on active proposals.
                                        Decisions are sealed on the cooperative
                                        ledger.
                                    </p>

                                    <div className="space-y-6">
                                        <div className="rounded-2xl border border-zinc-200 p-6">
                                            <div className="mb-3 flex items-start justify-between">
                                                <div>
                                                    <span className="rounded bg-red-100 px-2 py-0.5 text-[9px] font-bold text-red-700">
                                                        Prop #04 - Critical
                                                    </span>
                                                    <h4 className="mt-2 text-sm font-bold text-zinc-950">
                                                        Youth Segment Digital
                                                        Skills Workshop
                                                    </h4>
                                                </div>
                                                <span className="text-xs font-bold text-blue-700">
                                                    94% AI Confidence
                                                </span>
                                            </div>
                                            <p className="mb-6 text-xs text-zinc-500">
                                                Launch a micro-training digital
                                                business course to boost active
                                                transactions among Gen-Z
                                                members.
                                            </p>

                                            {votes[1] ? (
                                                <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3.5 text-center text-xs font-bold text-emerald-700">
                                                    You voted{' '}
                                                    {votes[1].toUpperCase()} on
                                                    this proposal.
                                                </div>
                                            ) : (
                                                <div className="flex gap-4">
                                                    <button
                                                        onClick={() =>
                                                            handleVote(1, 'yes')
                                                        }
                                                        className="flex-1 rounded-xl bg-primary py-3 text-xs font-bold text-white transition-all active:scale-95"
                                                    >
                                                        Vote YES
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleVote(1, 'no')
                                                        }
                                                        className="flex-1 rounded-xl border border-zinc-200 bg-white py-3 text-xs font-bold text-zinc-700 transition-all active:scale-95"
                                                    >
                                                        Vote NO
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <div className="rounded-2xl border border-zinc-200 p-6">
                                            <div className="mb-3 flex items-start justify-between">
                                                <div>
                                                    <span className="rounded bg-blue-100 px-2 py-0.5 text-[9px] font-bold text-blue-700">
                                                        Prop #03 - Inventory
                                                    </span>
                                                    <h4 className="mt-2 text-sm font-bold text-zinc-950">
                                                        Secure +30% Wholesale
                                                        Fertilizer Stock
                                                    </h4>
                                                </div>
                                                <span className="text-xs font-bold text-blue-700">
                                                    88% AI Confidence
                                                </span>
                                            </div>
                                            <p className="mb-6 text-xs text-zinc-500">
                                                Lock in lower prices to prepare
                                                for predicted upcoming supply
                                                shortages.
                                            </p>

                                            {votes[2] ? (
                                                <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3.5 text-center text-xs font-bold text-emerald-700">
                                                    You voted{' '}
                                                    {votes[2].toUpperCase()} on
                                                    this proposal.
                                                </div>
                                            ) : (
                                                <div className="flex gap-4">
                                                    <button
                                                        onClick={() =>
                                                            handleVote(2, 'yes')
                                                        }
                                                        className="flex-1 rounded-xl bg-primary py-3 text-xs font-bold text-white transition-all active:scale-95"
                                                    >
                                                        Vote YES
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleVote(2, 'no')
                                                        }
                                                        className="flex-1 rounded-xl border border-zinc-200 bg-white py-3 text-xs font-bold text-zinc-700 transition-all active:scale-95"
                                                    >
                                                        Vote NO
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 5: DIGITAL RAT (MEETING LOBBY & PDF ARCHIVES) */}
                        {currentTab === 'rat' && (
                            <div className="animate-fadeIn w-full space-y-8">
                                <div className="bento-card border border-zinc-200/50 p-8 shadow-md">
                                    <h3 className="font-display-sm mb-2 text-xl font-bold">
                                        Digital RAT Meeting Hub
                                    </h3>
                                    <p className="mb-8 text-xs text-zinc-400">
                                        Access annual cooperative meetings,
                                        review allocations, and check historical
                                        documentations.
                                    </p>

                                    <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                                        <div className="flex min-h-[220px] flex-col justify-between rounded-2xl bg-gradient-to-br from-blue-900 to-zinc-950 p-8 text-white">
                                            <div>
                                                <h4 className="text-base font-bold">
                                                    Annual Financial Meeting RAT
                                                </h4>
                                                <p className="mt-2 text-xs opacity-75">
                                                    Next live broadcast starts
                                                    in 2 days.
                                                </p>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    showToast(
                                                        'Registered for broadcast email alerts!',
                                                    )
                                                }
                                                className="w-fit rounded-lg bg-white px-6 py-2.5 text-xs font-bold text-zinc-950"
                                            >
                                                Register for Notifications
                                            </button>
                                        </div>

                                        <div className="space-y-4 rounded-2xl border border-zinc-200 p-6">
                                            <h4 className="text-sm font-bold">
                                                RAT Meeting Agenda
                                            </h4>
                                            <div className="text-zinc-650 space-y-2.5 text-xs">
                                                <p>
                                                    • 09:00 AM - Opening &
                                                    Registration
                                                </p>
                                                <p>
                                                    • 10:00 AM - Annual
                                                    Financial Audit Report
                                                </p>
                                                <p>
                                                    • 11:30 AM - SHU Allocation
                                                    approvals
                                                </p>
                                                <p>
                                                    • 01:00 PM - General Q&A
                                                    Voting
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <h4 className="mb-4 text-sm font-bold">
                                        Historical Archives
                                    </h4>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="border-zinc-150 flex items-center justify-between rounded-xl border p-4 text-xs">
                                            <span>
                                                📄 Financial Audit Statement
                                                2023.pdf
                                            </span>
                                            <button
                                                onClick={() =>
                                                    showToast(
                                                        'Downloading report...',
                                                    )
                                                }
                                                className="font-bold text-primary"
                                            >
                                                Download
                                            </button>
                                        </div>
                                        <div className="border-zinc-150 flex items-center justify-between rounded-xl border p-4 text-xs">
                                            <span>
                                                📄 Cooperative Bylaws & Smart
                                                Charters.pdf
                                            </span>
                                            <button
                                                onClick={() =>
                                                    showToast(
                                                        'Downloading bylaws...',
                                                    )
                                                }
                                                className="font-bold text-primary"
                                            >
                                                Download
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 6: COMMUNITY (POST FEED & CONTRIBUTOR STATS) */}
                        {currentTab === 'community' && (
                            <div className="animate-fadeIn flex w-full gap-8">
                                <div className="flex-1 space-y-6">
                                    {/* Make Post Box */}
                                    <div className="bento-card border border-zinc-200/50 bg-white p-6 shadow-sm">
                                        <h4 className="mb-3 text-sm font-bold">
                                            Share an update
                                        </h4>
                                        <textarea
                                            className="mb-3 w-full rounded-xl border border-zinc-200 bg-slate-50 p-3.5 text-xs text-zinc-700 outline-none focus:ring-1 focus:ring-primary/20"
                                            placeholder="Tell the community about harvest updates, products, or questions..."
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
                                                Post Update
                                            </button>
                                        </div>
                                    </div>

                                    {/* Feed Posts */}
                                    <div className="space-y-4">
                                        {feedPosts.map((post) => (
                                            <div
                                                key={post.id}
                                                className="bento-card border border-zinc-200/50 bg-white p-6 shadow-sm"
                                            >
                                                <div className="mb-4 flex items-center gap-3">
                                                    <img
                                                        className="h-8 w-8 rounded-full object-cover"
                                                        src={post.avatar}
                                                    />
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
                                                <div className="flex gap-4 text-[10px] font-bold text-zinc-400">
                                                    <button
                                                        onClick={() =>
                                                            showToast(
                                                                'Liked post.',
                                                            )
                                                        }
                                                        className="transition-colors hover:text-primary"
                                                    >
                                                        👍 {post.likes} Likes
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            showToast(
                                                                'Opened comments.',
                                                            )
                                                        }
                                                        className="transition-colors hover:text-primary"
                                                    >
                                                        💬 {post.comments}{' '}
                                                        Comments
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="w-80 shrink-0 space-y-6">
                                    <div className="bento-card border border-zinc-200/50 bg-white p-5 shadow-sm">
                                        <h4 className="mb-4 border-b pb-2 text-xs font-bold text-zinc-800">
                                            Top Contributors
                                        </h4>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-xs">
                                                <img
                                                    className="h-8 w-8 rounded-full object-cover"
                                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPFhkd_ENsZpyI8li2qveKX9fOxFBQfZlD_uaY8XCXtdB7g4GBUYWPvth4feq9p5qi3Sv4I97-OaSjaI1RgaKPrW1QBHuNmjNRZZ28wp__4_FULSMVjcmPKN-8gOPzW5sqntUa8pm5F0aYjpHjvwYq5g42lOQpl-WxnhyCtZBGNIfJr1GBK9tPPqqRK6H-oa-SU6efoCyZtpqJxRD001teC0h4Jc-pRApCelZLdKRBB0slwFVy-PGWGmkirB0F1Ff088Y95ko1LpU"
                                                />
                                                <div>
                                                    <p className="font-bold">
                                                        Sarah Jenkins
                                                    </p>
                                                    <p className="text-[10px] text-zinc-400">
                                                        1,240 Reputation
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 7: PROFILE (SHU WITHDRAWAL & LEVEL CARDS) */}
                        {currentTab === 'profile' && (
                            <div className="animate-fadeIn w-full space-y-8">
                                <div className="bento-card border border-zinc-200/50 p-8 shadow-md">
                                    <h3 className="font-display-sm mb-2 text-xl font-bold">
                                        Member Profile Settings
                                    </h3>
                                    <p className="mb-8 text-xs text-zinc-400">
                                        Manage personal accounts, review
                                        registered documents, and withdraw SHU
                                        dividends.
                                    </p>

                                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                                        <div className="flex flex-col justify-between rounded-2xl border border-zinc-200 p-6 md:col-span-2">
                                            <div>
                                                <h4 className="mb-4 text-sm font-bold">
                                                    SHU Dividends Account
                                                </h4>
                                                <p className="text-2xl font-black text-emerald-700">
                                                    Rp1.200.000
                                                </p>
                                                <p className="mt-1 text-[10px] text-zinc-400">
                                                    Authorized SHU payout
                                                    balance for fiscal year
                                                    2023.
                                                </p>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    showToast(
                                                        'SHU dividend transfer requested successfully!',
                                                    )
                                                }
                                                className="mt-8 w-full rounded-xl bg-[#006229] py-3 text-xs font-bold text-white transition-all hover:bg-[#004f20] active:scale-95"
                                            >
                                                Withdraw to Bank
                                            </button>
                                        </div>
                                        <div className="space-y-4 rounded-2xl border border-zinc-200 p-6">
                                            <h4 className="text-sm font-bold">
                                                Account Status
                                            </h4>
                                            <div className="space-y-2 text-xs text-zinc-500">
                                                <p>
                                                    • Identity:{' '}
                                                    <strong className="font-bold text-emerald-600">
                                                        VERIFIED
                                                    </strong>
                                                </p>
                                                <p>
                                                    • Tier Level:{' '}
                                                    <strong className="font-bold text-blue-600">
                                                        DIAMOND MEMBER
                                                    </strong>
                                                </p>
                                                <p>
                                                    • Join Date:{' '}
                                                    <strong className="text-zinc-700">
                                                        June 12, 2021
                                                    </strong>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 8: SETTINGS (PASSKEY TOGGLES & THEMES) */}
                        {currentTab === 'settings' && (
                            <div className="animate-fadeIn w-full space-y-8">
                                <div className="bento-card border border-zinc-200/50 p-8 shadow-md">
                                    <h3 className="font-display-sm mb-2 text-xl font-bold">
                                        Portal Configuration
                                    </h3>
                                    <p className="mb-8 text-xs text-zinc-400">
                                        Personalize options and set up biometric
                                        auth settings.
                                    </p>

                                    <div className="max-w-xl space-y-6">
                                        <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                                            <div>
                                                <h4 className="text-xs font-bold text-zinc-950">
                                                    Email Notifications
                                                </h4>
                                                <p className="mt-0.5 text-[10px] text-zinc-400">
                                                    Receive alerts when new
                                                    proposals go live.
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
                                                    Passkey Authentication
                                                </h4>
                                                <p className="mt-0.5 text-[10px] text-zinc-400">
                                                    Use biometric
                                                    face/fingerprint scan to
                                                    login securely.
                                                </p>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    showToast(
                                                        'Passkey registration successfully triggered!',
                                                    )
                                                }
                                                className="rounded-lg border border-zinc-200 px-4 py-2 text-[10px] font-bold transition-all hover:bg-slate-50"
                                            >
                                                Configure
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
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
