import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Search, Bell, Settings, Award, Cpu, ShieldCheck, Compass, Info, MessageSquare, Send, Paperclip, Mic, HelpCircle, LayoutDashboard, Brain, Store, ArrowRight, Star, Settings2, Plus, Calendar, Moon, Sparkles, TrendingUp, Vote, User, Trash2, Heart, CheckCircle2, ChevronRight, Share2, LogOut, BookOpen } from 'lucide-react';
import PrototypeHud from '@/components/PrototypeHud';

interface Message {
    sender: 'user' | 'ai';
    text: string;
    showCard?: boolean;
}

export default function Dashboard() {
    const [currentTab, setCurrentTab] = useState<'dashboard' | 'assistant' | 'rewards' | 'governance' | 'rat' | 'community' | 'profile' | 'settings'>('dashboard');
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Chat states
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'user', text: "I want to buy Premium Rice." },
        { 
            sender: 'ai', 
            text: "I've found a matching product from Green Life Cooperative inventory. Here are the details:",
            showCard: true
        }
    ]);
    const [chatInput, setChatInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // Community feed states
    const [feedPosts, setFeedPosts] = useState([
        { id: 1, author: 'Sarah Jenkins', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPFhkd_ENsZpyI8li2qveKX9fOxFBQfZlD_uaY8XCXtdB7g4GBUYWPvth4feq9p5qi3Sv4I97-OaSjaI1RgaKPrW1QBHuNmjNRZZ28wp__4_FULSMVjcmPKN-8gOPzW5sqntUa8pm5F0aYjpHjvwYq5g42lOQpl-WxnhyCtZBGNIfJr1GBK9tPPqqRK6H-oa-SU6efoCyZtpqJxRD001teC0h4Jc-pRApCelZLdKRBB0slwFVy-PGWGmkirB0F1Ff088Y95ko1LpU', role: 'Top Contributor', content: 'Our organic harvest yields are up by 25% this month! Thanks to Green Life Cooperative for supplying verified fertilizers.', likes: 42, comments: 8 },
        { id: 2, author: 'Muhammad Rizky', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPFhkd_ENsZpyI8li2qveKX9fOxFBQfZlD_uaY8XCXtdB7g4GBUYWPvth4feq9p5qi3Sv4I97-OaSjaI1RgaKPrW1QBHuNmjNRZZ28wp__4_FULSMVjcmPKN-8gOPzW5sqntUa8pm5F0aYjpHjvwYq5g42lOQpl-WxnhyCtZBGNIfJr1GBK9tPPqqRK6H-oa-SU6efoCyZtpqJxRD001teC0h4Jc-pRApCelZLdKRBB0slwFVy-PGWGmkirB0F1Ff088Y95ko1LpU', role: 'Diamond Member', content: 'Excited about the upcoming Digital RAT! Looking forward to voting on the new dividend allocation proposals.', likes: 18, comments: 2 }
    ]);
    const [newPostContent, setNewPostContent] = useState('');

    // Governance voting states
    const [votes, setVotes] = useState<Record<number, 'yes' | 'no' | null>>({
        1: null,
        2: null
    });

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 3000);
    };

    const handleSendChat = (textToSend = chatInput) => {
        if (!textToSend.trim()) return;

        setMessages(prev => [...prev, { sender: 'user', text: textToSend }]);
        setChatInput('');
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
                sender: 'ai',
                text: `I've analyzed your request for "${textToSend}". I will fetch live inventories and check the cooperative benefits database.`
            }]);
            showToast("AI updated query results");
        }, 1200);
    };

    const handleCreatePost = () => {
        if (!newPostContent.trim()) return;
        const newPost = {
            id: Date.now(),
            author: 'Muhammad Rizky',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgGFYPJJrQS59wIbI2FuPkEUtimZi9vTjCaJl1jSk3skE4hCA7Oq8JU2mdKCauJ6Iw14Fgu1ne-760PCZkYWZ4BPIhVGsDHyrQG2GfeqEX3aoMJMBIKLV1yMwHcqfu2QMZxZZSOYNFwIA6OI24q51G8CSxELDNIOD4hmSKGI-NkicK6PAfEQ0llKQSYYe8Rvg-0nTPy_-kvEIL0dOJwFxt0fNlbECQ-No9V8lPAshfDNoiB7e8TUeZKY8ypFpslhW20X8dmj-rRHc',
            role: 'Diamond Member',
            content: newPostContent,
            likes: 0,
            comments: 0
        };
        setFeedPosts(prev => [newPost, ...prev]);
        setNewPostContent('');
        showToast("Post shared to community!");
    };

    const handleVote = (proposalId: number, option: 'yes' | 'no') => {
        setVotes(prev => ({ ...prev, [proposalId]: option }));
        showToast(`Voted ${option.toUpperCase()} on Proposal #${proposalId}!`);
    };

    return (
        <>
            <Head title="Member Portal | KOPERA-PLUS" />

            <div className="bg-[#f8f9ff] text-[#0b1c30] font-sans antialiased overflow-x-hidden min-h-screen flex">
                
                {/* Left Side Navigation (Universal Dashboard Sidebar) */}
                <aside className="w-64 h-screen fixed left-0 top-0 bg-white border-r border-zinc-200/60 shadow-sm flex flex-col justify-between p-6 z-50">
                    <div>
                        <div className="mb-10 flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
                            </div>
                            <div>
                                <h1 className="text-base font-extrabold text-primary leading-none">KOPERA-PLUS</h1>
                                <p className="text-[10px] text-zinc-400 font-bold uppercase mt-1">AI-First Governance</p>
                            </div>
                        </div>

                        <nav className="space-y-1">
                            <button 
                                onClick={() => setCurrentTab('dashboard')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                                    currentTab === 'dashboard'
                                        ? 'bg-primary/10 text-primary border-r-4 border-primary'
                                        : 'text-zinc-600 hover:bg-slate-50'
                                }`}
                            >
                                <span className="material-symbols-outlined">dashboard</span>
                                <span>Dashboard</span>
                            </button>
                            <button 
                                onClick={() => setCurrentTab('assistant')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                                    currentTab === 'assistant'
                                        ? 'bg-primary/10 text-primary border-r-4 border-primary'
                                        : 'text-zinc-600 hover:bg-slate-50'
                                }`}
                            >
                                <span className="material-symbols-outlined">smart_toy</span>
                                <span>AI Member Assistant</span>
                            </button>
                            <button 
                                onClick={() => setCurrentTab('rewards')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                                    currentTab === 'rewards'
                                        ? 'bg-primary/10 text-primary border-r-4 border-primary'
                                        : 'text-zinc-600 hover:bg-slate-50'
                                }`}
                            >
                                <span className="material-symbols-outlined">redeem</span>
                                <span>Rewards</span>
                            </button>
                            <button 
                                onClick={() => setCurrentTab('governance')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                                    currentTab === 'governance'
                                        ? 'bg-primary/10 text-primary border-r-4 border-primary'
                                        : 'text-zinc-600 hover:bg-slate-50'
                                }`}
                            >
                                <span className="material-symbols-outlined">gavel</span>
                                <span>Smart Governance</span>
                            </button>
                            <button 
                                onClick={() => setCurrentTab('rat')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                                    currentTab === 'rat'
                                        ? 'bg-primary/10 text-primary border-r-4 border-primary'
                                        : 'text-zinc-600 hover:bg-slate-50'
                                }`}
                            >
                                <span className="material-symbols-outlined">monitoring</span>
                                <span>Digital RAT</span>
                            </button>
                            <button 
                                onClick={() => setCurrentTab('community')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                                    currentTab === 'community'
                                        ? 'bg-primary/10 text-primary border-r-4 border-primary'
                                        : 'text-zinc-600 hover:bg-slate-50'
                                }`}
                            >
                                <span className="material-symbols-outlined">groups</span>
                                <span>Community</span>
                            </button>
                        </nav>
                    </div>

                    <div>
                        <div className="space-y-1 mb-6">
                            <button 
                                onClick={() => setCurrentTab('profile')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                                    currentTab === 'profile'
                                        ? 'bg-primary/10 text-primary border-r-4 border-primary'
                                        : 'text-zinc-600 hover:bg-slate-50'
                                }`}
                            >
                                <span className="material-symbols-outlined">person</span>
                                <span>Profile</span>
                            </button>
                            <button 
                                onClick={() => setCurrentTab('settings')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                                    currentTab === 'settings'
                                        ? 'bg-primary/10 text-primary border-r-4 border-primary'
                                        : 'text-zinc-600 hover:bg-slate-50'
                                }`}
                            >
                                <span className="material-symbols-outlined">settings</span>
                                <span>Settings</span>
                            </button>
                            <Link className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl text-sm font-semibold" href="/">
                                <span className="material-symbols-outlined">logout</span>
                                <span>Logout</span>
                            </Link>
                        </div>

                        {/* Upgrade Pro Widget */}
                        <div className="p-4 bg-primary text-white rounded-2xl relative overflow-hidden shadow-lg">
                            <div className="absolute right-0 top-0 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                            <p className="text-xs font-bold mb-1">Elevate experience</p>
                            <p className="text-[10px] text-white/80 mb-3">Unlock deeper SHU insights.</p>
                            <button className="w-full py-2 bg-white text-primary text-xs font-bold rounded-lg hover:bg-opacity-95 active:scale-95 transition-all" onClick={() => showToast("Upgrade option unlocked!")}>
                                Upgrade to Pro
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area Wrapper */}
                <div className="ml-64 flex-grow min-h-screen flex flex-col bg-slate-50">
                    
                    {/* Universal TopNavBar */}
                    <header className="sticky top-0 z-40 bg-white border-b border-zinc-200/50 flex justify-between items-center px-8 py-4">
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 h-4 w-4" />
                            <input className="w-full bg-slate-50 border border-zinc-200 rounded-full py-2 pl-10 pr-4 text-xs focus:outline-none text-zinc-800" placeholder="Search cooperatives, products, or ask AI..." type="text"/>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="p-2 text-zinc-600 hover:bg-slate-50 rounded-full transition-all relative">
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <button className="p-2 text-zinc-600 hover:bg-slate-50 rounded-full transition-all" onClick={() => showToast("Dark mode toggle clicked.")}>
                                <span className="material-symbols-outlined text-xl">dark_mode</span>
                            </button>
                            <div className="flex items-center gap-3 border-l border-zinc-200 pl-4 ml-2">
                                <div className="text-right">
                                    <p className="text-xs font-bold leading-none">Muhammad Rizky</p>
                                    <p className="text-[9px] text-zinc-400 font-bold mt-0.5">Diamond Member</p>
                                </div>
                                <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden border border-zinc-300">
                                    <img className="w-full h-full object-cover" alt="Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgGFYPJJrQS59wIbI2FuPkEUtimZi9vTjCaJl1jSk3skE4hCA7Oq8JU2mdKCauJ6Iw14Fgu1ne-760PCZkYWZ4BPIhVGsDHyrQG2GfeqEX3aoMJMBIKLV1yMwHcqfu2QMZxZZSOYNFwIA6OI24q51G8CSxELDNIOD4hmSKGI-NkicK6PAfEQ0llKQSYYe8Rvg-0nTPy_-kvEIL0dOJwFxt0fNlbECQ-No9V8lPAshfDNoiB7e8TUeZKY8ypFpslhW20X8dmj-rRHc" />
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* DYNAMIC TABS RENDERING */}
                    <div className="p-8 max-w-[1440px] mx-auto w-full flex-grow flex gap-8">
                        
                        {/* TAB 1: DASHBOARD */}
                        {currentTab === 'dashboard' && (
                            <div className="w-full flex gap-8 animate-fadeIn">
                                {/* Left Section of main dashboard */}
                                <div className="flex-1 space-y-8">
                                    {/* Greeting */}
                                    <div>
                                        <h2 className="font-display-sm text-3xl font-extrabold text-zinc-900 flex items-center gap-2">
                                            Good Morning, Muhammad <span className="animate-wiggle">👋</span>
                                        </h2>
                                        <p className="text-sm text-zinc-500 mt-1">
                                            Your cooperative portfolio grew by <strong className="text-emerald-600 font-bold">+4.2%</strong> this week. How can I help you today?
                                        </p>
                                    </div>

                                    {/* Quick action buttons row */}
                                    <div className="flex flex-wrap gap-2.5">
                                        <button className="px-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-1.5" onClick={() => showToast("Searching cooperatives...")}>
                                            <Compass className="h-3.5 w-3.5 text-primary" /> Find Cooperative
                                        </button>
                                        <button className="px-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-1.5" onClick={() => setCurrentTab('assistant')}>
                                            <span className="material-symbols-outlined text-[16px] text-primary">shopping_bag</span> Buy Product
                                        </button>
                                        <button className="px-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-1.5" onClick={() => setCurrentTab('profile')}>
                                            <span className="material-symbols-outlined text-[16px] text-primary">account_balance_wallet</span> Check SHU
                                        </button>
                                        <button className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:opacity-95 shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center gap-1.5" onClick={() => setCurrentTab('rat')}>
                                            <Sparkles className="h-3.5 w-3.5 text-white" /> Join Digital RAT
                                        </button>
                                    </div>

                                    {/* AI Assistant Preview Card */}
                                    <div className="bento-card p-6 bg-white border border-zinc-200/50 shadow-md">
                                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-100">
                                            <Brain className="h-6 w-6 text-purple-600 animate-pulse" />
                                            <div>
                                                <h3 className="font-headline-sm text-sm font-bold text-zinc-950">AI Member Assistant</h3>
                                                <p className="text-[10px] text-zinc-400">Ask me anything about your membership or cooperative status.</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4 mb-6">
                                            <div className="flex gap-4">
                                                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">AI</div>
                                                <div className="bg-slate-50 rounded-2xl rounded-tl-none p-4 max-w-2xl border border-zinc-200/30 text-xs leading-relaxed text-zinc-700">
                                                    Welcome back, <strong className="text-zinc-900 font-bold">Muhammad</strong>! I've analyzed your latest transactions. You've earned <strong className="text-purple-700 font-bold">250 extra coins</strong> this week from the community challenge. Would you like to see how to redeem them?
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
                                            <button onClick={() => setCurrentTab('rewards')} className="px-4 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:brightness-105 active:scale-95 transition-all">
                                                Yes, please show me the available rewards.
                                            </button>
                                            <button onClick={() => setCurrentTab('assistant')} className="px-4 py-2.5 bg-white border border-zinc-200 text-zinc-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all flex items-center gap-1">
                                                Continue Chat <ArrowRight className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Sub-cards Grid: Digital RAT countdown & Activity */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="bento-card p-6 border border-zinc-200/50 shadow-md">
                                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-100">
                                                <Calendar className="h-5 w-5 text-indigo-600" />
                                                <h4 className="font-bold text-sm">Digital RAT Countdown</h4>
                                            </div>
                                            <div className="space-y-3 text-xs mb-6">
                                                <div className="flex justify-between">
                                                    <span className="text-zinc-400">Date:</span>
                                                    <strong className="text-zinc-800 font-bold">Oct 24, 2023 • 09:00 AM</strong>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-zinc-400">Countdown:</span>
                                                    <strong className="text-indigo-600 font-bold">2d 14h 32m</strong>
                                                </div>
                                            </div>
                                            <button onClick={() => setCurrentTab('rat')} className="w-full py-3 bg-primary text-white text-xs font-bold rounded-xl hover:opacity-95 active:scale-95 transition-all">
                                                Join Meeting Lobby
                                            </button>
                                        </div>

                                        <div className="bento-card p-6 border border-zinc-200/50 shadow-md">
                                            <h4 className="font-bold text-sm mb-6 pb-4 border-b border-zinc-100">Recent Activity</h4>
                                            <div className="space-y-3.5 text-xs">
                                                <div className="flex items-start gap-3">
                                                    <span className="material-symbols-outlined text-[16px] text-zinc-400 mt-0.5">shopping_bag</span>
                                                    <div>
                                                        <p className="font-bold">Purchased Organic Rice</p>
                                                        <p className="text-[10px] text-zinc-400">5kg - Green Life Cooperative • 2h ago</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <span className="material-symbols-outlined text-[16px] text-zinc-400 mt-0.5">workspace_premium</span>
                                                    <div>
                                                        <p className="font-bold">Earned Rewards</p>
                                                        <p className="text-[10px] text-zinc-400">+50 Coins from Vote • yesterday</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right sidebar panel of main dashboard */}
                                <div className="w-80 space-y-6 shrink-0">
                                    {/* Rewards Card */}
                                    <div className="bento-card p-5 border border-zinc-200/50 shadow-sm">
                                        <div className="flex justify-between items-center mb-4">
                                            <h4 className="text-xs font-bold text-zinc-800">Rewards Progress</h4>
                                            <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Level 12</span>
                                        </div>
                                        <div className="flex justify-between text-xs font-semibold mb-2">
                                            <span className="text-zinc-500">4,250 / 5,000 XP</span>
                                            <span className="text-purple-700">85%</span>
                                        </div>
                                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
                                            <div className="bg-purple-600 h-full rounded-full" style={{ width: '85%' }}></div>
                                        </div>
                                        <div className="bg-purple-50 p-3.5 rounded-xl border border-purple-100/50 text-[10px] text-purple-900 leading-relaxed font-semibold">
                                            🎯 <strong>Today's Mission</strong>: Vote on 2 governance proposals (+50 XP)
                                        </div>
                                    </div>

                                    {/* Smart Governance card */}
                                    <div className="bento-card p-5 border border-zinc-200/50 shadow-sm space-y-4">
                                        <h4 className="text-xs font-bold text-zinc-800">Smart Governance Status</h4>
                                        <div className="grid grid-cols-2 gap-3 text-center">
                                            <div className="bg-slate-50 p-3 rounded-xl border border-zinc-200/30">
                                                <p className="text-[9px] text-zinc-400 font-bold uppercase">Participation</p>
                                                <p className="text-base font-black text-primary mt-1">94.2%</p>
                                            </div>
                                            <div className="bg-slate-50 p-3 rounded-xl border border-zinc-200/30">
                                                <p className="text-[9px] text-zinc-400 font-bold uppercase">Transparency</p>
                                                <p className="text-base font-black text-emerald-700 mt-1">A+</p>
                                            </div>
                                        </div>
                                        <button onClick={() => setCurrentTab('governance')} className="w-full py-2 bg-primary/10 text-primary text-xs font-bold rounded-lg hover:bg-primary/20 transition-all">
                                            Cast Proposal Votes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 2: AI MEMBER ASSISTANT (CHAT INTERFACE) */}
                        {currentTab === 'assistant' && (
                            <div className="w-full flex gap-8 animate-fadeIn">
                                <div className="flex-1 bg-white border border-zinc-250/30 rounded-3xl p-6 shadow-sm flex flex-col justify-between h-[650px]">
                                    <div className="border-b border-zinc-100 pb-4 mb-4 flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-sm text-zinc-950 flex items-center gap-2">
                                                AI Member Assistant <Brain className="h-4.5 w-4.5 text-purple-600" />
                                            </h3>
                                            <p className="text-[10px] text-zinc-400">Interact with KOPERA intelligence core directly.</p>
                                        </div>
                                        <button onClick={() => setMessages([{ sender: 'ai', text: "New Chat Session loaded. What is your request?" }])} className="text-xs font-bold text-primary hover:underline">
                                            Clear Thread
                                        </button>
                                    </div>

                                    {/* Messages View */}
                                    <div className="flex-grow overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                                        {messages.map((msg, idx) => (
                                            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`p-4 rounded-2xl max-w-md text-xs leading-relaxed ${
                                                    msg.sender === 'user' 
                                                        ? 'bg-primary text-white rounded-tr-none' 
                                                        : 'bg-slate-100 text-zinc-800 rounded-tl-none border-l-4 border-purple-500'
                                                }`}>
                                                    {msg.text}
                                                    {msg.showCard && (
                                                        <div className="mt-4 border border-zinc-200 rounded-xl overflow-hidden bg-white text-zinc-800">
                                                            <img className="w-full h-32 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHAso7gSAxYgOjquC3G-bOpfr2QfZg3-8EYReKKo7w89v2stwHsuQ4It3GaFD-1W3aNKnPXlOHBluGPdv2idmYF_toIOrpbYIiP1yx2F2DqUu5gyKtZth2xuYDlayLC6NgTTh3bEVDv3ATOSwDl7M2JVavF8XLUeP51NQcZgAaZmHjTsbcBfRsXXC81_oybEiZUOGVya9tyZ76DK11HEfnFka1QgEJ_kVMAG3zw0c-m-zAI_KJwwyP8R7MZ25mQAABlV3wdFKcAKI" />
                                                            <div className="p-4">
                                                                <h4 className="font-bold">Premium Rice 5kg</h4>
                                                                <p className="text-[10px] text-zinc-400 mb-2">Rp75.000</p>
                                                                <button onClick={() => showToast("Order processed.")} className="w-full py-2 bg-primary text-white text-[10px] font-bold rounded-lg">Buy Now</button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Input bar */}
                                    <div className="border-t border-zinc-100 pt-4 mt-4 flex gap-3 items-center">
                                        <input 
                                            className="flex-grow bg-slate-50 border border-zinc-200 rounded-xl py-3 px-4 text-xs focus:ring-1 focus:ring-primary/20 outline-none text-zinc-800" 
                                            placeholder="Ask KOPERA AI..." 
                                            type="text"
                                            value={chatInput}
                                            onChange={e => setChatInput(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && handleSendChat()}
                                        />
                                        <button onClick={() => handleSendChat()} className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center shrink-0">
                                            <Send className="h-4.5 w-4.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 3: REWARDS (XP, POINTS & REDEEMING) */}
                        {currentTab === 'rewards' && (
                            <div className="w-full space-y-8 animate-fadeIn">
                                <div className="bento-card p-8 border border-zinc-200/50 shadow-md">
                                    <h3 className="font-display-sm text-xl font-bold mb-2">XP Rewards & Voucher Store</h3>
                                    <p className="text-xs text-zinc-400 mb-8">Redeem earned cooperative points for real rewards or dividend options.</p>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                                        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 text-center">
                                            <p className="text-[10px] font-bold text-purple-700 uppercase">Redeemable Points</p>
                                            <p className="text-3xl font-black text-purple-900 mt-2">4,250</p>
                                        </div>
                                        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 text-center">
                                            <p className="text-[10px] font-bold text-emerald-700 uppercase">Lifetime Earned</p>
                                            <p className="text-3xl font-black text-emerald-900 mt-2">12,800</p>
                                        </div>
                                    </div>

                                    <h4 className="font-bold text-sm mb-4">Available Reward Vouchers</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="border border-zinc-200 rounded-2xl p-5 hover:border-primary transition-colors flex flex-col justify-between">
                                            <div>
                                                <span className="bg-purple-100 text-purple-700 text-[9px] font-bold px-2 py-0.5 rounded">500 PTS</span>
                                                <h5 className="font-bold text-xs mt-3">Free Premium Rice Bag (5kg)</h5>
                                                <p className="text-[10px] text-zinc-400 mt-1">Claim one free bag of long grain organic white rice.</p>
                                            </div>
                                            <button onClick={() => showToast("Voucher claimed!")} className="w-full mt-6 py-2.5 bg-primary text-white text-xs font-bold rounded-lg hover:brightness-105 active:scale-95 transition-all">Claim Reward</button>
                                        </div>
                                        <div className="border border-zinc-200 rounded-2xl p-5 hover:border-primary transition-colors flex flex-col justify-between">
                                            <div>
                                                <span className="bg-purple-100 text-purple-700 text-[9px] font-bold px-2 py-0.5 rounded">300 PTS</span>
                                                <h5 className="font-bold text-xs mt-3">Organic Fertilizer 1L</h5>
                                                <p className="text-[10px] text-zinc-400 mt-1">Redeem for one bottle of verified organic liquid compost.</p>
                                            </div>
                                            <button onClick={() => showToast("Voucher claimed!")} className="w-full mt-6 py-2.5 bg-primary text-white text-xs font-bold rounded-lg hover:brightness-105 active:scale-95 transition-all">Claim Reward</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 4: SMART GOVERNANCE (VOTING & PROPOSALS) */}
                        {currentTab === 'governance' && (
                            <div className="w-full space-y-8 animate-fadeIn">
                                <div className="bento-card p-8 border border-zinc-200/50 shadow-md">
                                    <h3 className="font-display-sm text-xl font-bold mb-2">Smart Governance Voting</h3>
                                    <p className="text-xs text-zinc-400 mb-8">Cast your vote on active proposals. Decisions are sealed on the cooperative ledger.</p>

                                    <div className="space-y-6">
                                        <div className="border border-zinc-200 p-6 rounded-2xl">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <span className="bg-red-100 text-red-700 text-[9px] font-bold px-2 py-0.5 rounded">Prop #04 - Critical</span>
                                                    <h4 className="font-bold text-sm mt-2 text-zinc-950">Youth Segment Digital Skills Workshop</h4>
                                                </div>
                                                <span className="text-xs text-purple-700 font-bold">94% AI Confidence</span>
                                            </div>
                                            <p className="text-xs text-zinc-500 mb-6">Launch a micro-training digital business course to boost active transactions among Gen-Z members.</p>
                                            
                                            {votes[1] ? (
                                                <div className="bg-emerald-50 text-emerald-700 p-3.5 rounded-xl border border-emerald-100 text-xs font-bold text-center">
                                                    You voted {votes[1].toUpperCase()} on this proposal.
                                                </div>
                                            ) : (
                                                <div className="flex gap-4">
                                                    <button onClick={() => handleVote(1, 'yes')} className="flex-1 py-3 bg-primary text-white text-xs font-bold rounded-xl active:scale-95 transition-all">Vote YES</button>
                                                    <button onClick={() => handleVote(1, 'no')} className="flex-1 py-3 bg-white border border-zinc-200 text-zinc-700 text-xs font-bold rounded-xl active:scale-95 transition-all">Vote NO</button>
                                                </div>
                                            )}
                                        </div>

                                        <div className="border border-zinc-200 p-6 rounded-2xl">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <span className="bg-blue-100 text-blue-700 text-[9px] font-bold px-2 py-0.5 rounded">Prop #03 - Inventory</span>
                                                    <h4 className="font-bold text-sm mt-2 text-zinc-950">Secure +30% Wholesale Fertilizer Stock</h4>
                                                </div>
                                                <span className="text-xs text-purple-700 font-bold">88% AI Confidence</span>
                                            </div>
                                            <p className="text-xs text-zinc-500 mb-6">Lock in lower prices to prepare for predicted upcoming supply shortages.</p>
                                            
                                            {votes[2] ? (
                                                <div className="bg-emerald-50 text-emerald-700 p-3.5 rounded-xl border border-emerald-100 text-xs font-bold text-center">
                                                    You voted {votes[2].toUpperCase()} on this proposal.
                                                </div>
                                            ) : (
                                                <div className="flex gap-4">
                                                    <button onClick={() => handleVote(2, 'yes')} className="flex-1 py-3 bg-primary text-white text-xs font-bold rounded-xl active:scale-95 transition-all">Vote YES</button>
                                                    <button onClick={() => handleVote(2, 'no')} className="flex-1 py-3 bg-white border border-zinc-200 text-zinc-700 text-xs font-bold rounded-xl active:scale-95 transition-all">Vote NO</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 5: DIGITAL RAT (MEETING LOBBY & PDF ARCHIVES) */}
                        {currentTab === 'rat' && (
                            <div className="w-full space-y-8 animate-fadeIn">
                                <div className="bento-card p-8 border border-zinc-200/50 shadow-md">
                                    <h3 className="font-display-sm text-xl font-bold mb-2">Digital RAT Meeting Hub</h3>
                                    <p className="text-xs text-zinc-400 mb-8">Access annual cooperative meetings, review allocations, and check historical documentations.</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                        <div className="bg-gradient-to-br from-indigo-900 to-zinc-950 text-white p-8 rounded-2xl flex flex-col justify-between min-h-[220px]">
                                            <div>
                                                <h4 className="font-bold text-base">Annual Financial Meeting RAT</h4>
                                                <p className="text-xs opacity-75 mt-2">Next live broadcast starts in 2 days.</p>
                                            </div>
                                            <button onClick={() => showToast("Registered for broadcast email alerts!")} className="w-fit px-6 py-2.5 bg-white text-zinc-950 text-xs font-bold rounded-lg">Register for Notifications</button>
                                        </div>

                                        <div className="border border-zinc-200 p-6 rounded-2xl space-y-4">
                                            <h4 className="font-bold text-sm">RAT Meeting Agenda</h4>
                                            <div className="space-y-2.5 text-xs text-zinc-650">
                                                <p>• 09:00 AM - Opening & Registration</p>
                                                <p>• 10:00 AM - Annual Financial Audit Report</p>
                                                <p>• 11:30 AM - SHU Allocation approvals</p>
                                                <p>• 01:00 PM - General Q&A Voting</p>
                                            </div>
                                        </div>
                                    </div>

                                    <h4 className="font-bold text-sm mb-4">Historical Archives</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="border border-zinc-150 p-4 rounded-xl flex items-center justify-between text-xs">
                                            <span>📄 Financial Audit Statement 2023.pdf</span>
                                            <button onClick={() => showToast("Downloading report...")} className="text-primary font-bold">Download</button>
                                        </div>
                                        <div className="border border-zinc-150 p-4 rounded-xl flex items-center justify-between text-xs">
                                            <span>📄 Cooperative Bylaws & Smart Charters.pdf</span>
                                            <button onClick={() => showToast("Downloading bylaws...")} className="text-primary font-bold">Download</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 6: COMMUNITY (POST FEED & CONTRIBUTOR STATS) */}
                        {currentTab === 'community' && (
                            <div className="w-full flex gap-8 animate-fadeIn">
                                <div className="flex-1 space-y-6">
                                    {/* Make Post Box */}
                                    <div className="bento-card p-6 border border-zinc-200/50 shadow-sm bg-white">
                                        <h4 className="font-bold text-sm mb-3">Share an update</h4>
                                        <textarea 
                                            className="w-full bg-slate-50 border border-zinc-200 rounded-xl p-3.5 text-xs outline-none focus:ring-1 focus:ring-primary/20 text-zinc-700 mb-3" 
                                            placeholder="Tell the community about harvest updates, products, or questions..." 
                                            rows={3}
                                            value={newPostContent}
                                            onChange={e => setNewPostContent(e.target.value)}
                                        />
                                        <div className="flex justify-end">
                                            <button onClick={handleCreatePost} className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-xl active:scale-95 transition-all">
                                                Post Update
                                            </button>
                                        </div>
                                    </div>

                                    {/* Feed Posts */}
                                    <div className="space-y-4">
                                        {feedPosts.map(post => (
                                            <div key={post.id} className="bento-card p-6 border border-zinc-200/50 shadow-sm bg-white">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <img className="w-8 h-8 rounded-full object-cover" src={post.avatar} />
                                                    <div className="text-xs">
                                                        <p className="font-bold text-zinc-950">{post.author}</p>
                                                        <p className="text-[10px] text-zinc-400 mt-0.5">{post.role}</p>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-zinc-650 leading-relaxed mb-4">{post.content}</p>
                                                <div className="flex gap-4 text-[10px] font-bold text-zinc-400">
                                                    <button onClick={() => showToast("Liked post.")} className="hover:text-primary transition-colors">👍 {post.likes} Likes</button>
                                                    <button onClick={() => showToast("Opened comments.")} className="hover:text-primary transition-colors">💬 {post.comments} Comments</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="w-80 space-y-6 shrink-0">
                                    <div className="bento-card p-5 border border-zinc-200/50 shadow-sm bg-white">
                                        <h4 className="text-xs font-bold text-zinc-800 mb-4 pb-2 border-b">Top Contributors</h4>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-xs">
                                                <img className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPFhkd_ENsZpyI8li2qveKX9fOxFBQfZlD_uaY8XCXtdB7g4GBUYWPvth4feq9p5qi3Sv4I97-OaSjaI1RgaKPrW1QBHuNmjNRZZ28wp__4_FULSMVjcmPKN-8gOPzW5sqntUa8pm5F0aYjpHjvwYq5g42lOQpl-WxnhyCtZBGNIfJr1GBK9tPPqqRK6H-oa-SU6efoCyZtpqJxRD001teC0h4Jc-pRApCelZLdKRBB0slwFVy-PGWGmkirB0F1Ff088Y95ko1LpU" />
                                                <div>
                                                    <p className="font-bold">Sarah Jenkins</p>
                                                    <p className="text-[10px] text-zinc-400">1,240 Reputation</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 7: PROFILE (SHU WITHDRAWAL & LEVEL CARDS) */}
                        {currentTab === 'profile' && (
                            <div className="w-full space-y-8 animate-fadeIn">
                                <div className="bento-card p-8 border border-zinc-200/50 shadow-md">
                                    <h3 className="font-display-sm text-xl font-bold mb-2">Member Profile Settings</h3>
                                    <p className="text-xs text-zinc-400 mb-8">Manage personal accounts, review registered documents, and withdraw SHU dividends.</p>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                        <div className="md:col-span-2 border border-zinc-200 rounded-2xl p-6 flex flex-col justify-between">
                                            <div>
                                                <h4 className="font-bold text-sm mb-4">SHU Dividends Account</h4>
                                                <p className="text-2xl font-black text-emerald-700">Rp1.200.000</p>
                                                <p className="text-[10px] text-zinc-400 mt-1">Authorized SHU payout balance for fiscal year 2023.</p>
                                            </div>
                                            <button onClick={() => showToast("SHU dividend transfer requested successfully!")} className="w-full mt-8 py-3 bg-[#006229] hover:bg-[#004f20] text-white text-xs font-bold rounded-xl active:scale-95 transition-all">Withdraw to Bank</button>
                                        </div>
                                        <div className="border border-zinc-200 rounded-2xl p-6 space-y-4">
                                            <h4 className="font-bold text-sm">Account Status</h4>
                                            <div className="space-y-2 text-xs text-zinc-500">
                                                <p>• Identity: <strong className="text-emerald-600 font-bold">VERIFIED</strong></p>
                                                <p>• Tier Level: <strong className="text-purple-600 font-bold">DIAMOND MEMBER</strong></p>
                                                <p>• Join Date: <strong className="text-zinc-700">June 12, 2021</strong></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 8: SETTINGS (PASSKEY TOGGLES & THEMES) */}
                        {currentTab === 'settings' && (
                            <div className="w-full space-y-8 animate-fadeIn">
                                <div className="bento-card p-8 border border-zinc-200/50 shadow-md">
                                    <h3 className="font-display-sm text-xl font-bold mb-2">Portal Configuration</h3>
                                    <p className="text-xs text-zinc-400 mb-8">Personalize options and set up biometric auth settings.</p>

                                    <div className="max-w-xl space-y-6">
                                        <div className="flex justify-between items-center pb-4 border-b border-zinc-100">
                                            <div>
                                                <h4 className="font-bold text-xs text-zinc-950">Email Notifications</h4>
                                                <p className="text-[10px] text-zinc-400 mt-0.5">Receive alerts when new proposals go live.</p>
                                            </div>
                                            <input type="checkbox" defaultChecked className="text-primary focus:ring-primary rounded" />
                                        </div>
                                        <div className="flex justify-between items-center pb-4 border-b border-zinc-100">
                                            <div>
                                                <h4 className="font-bold text-xs text-zinc-950">Passkey Authentication</h4>
                                                <p className="text-[10px] text-zinc-400 mt-0.5">Use biometric face/fingerprint scan to login securely.</p>
                                            </div>
                                            <button onClick={() => showToast("Passkey registration successfully triggered!")} className="px-4 py-2 border border-zinc-200 rounded-lg text-[10px] font-bold hover:bg-slate-50 transition-all">Configure</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
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
