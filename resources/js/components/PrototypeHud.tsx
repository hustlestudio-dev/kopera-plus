import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Layers, Menu, X, ArrowRightLeft, Home, UserCheck, Compass, Settings, ShieldAlert, Cpu, ShoppingCart } from 'lucide-react';

interface ScreenItem {
    name: string;
    path: string;
    icon: React.ReactNode;
}

export default function PrototypeHud() {
    const { url } = usePage();
    const [isOpen, setIsOpen] = useState(false);

    const screens: ScreenItem[] = [
        { name: '1. Landing Page', path: '/', icon: <Home className="h-4 w-4" /> },
        { name: '2. Authentication', path: '/login', icon: <UserCheck className="h-4 w-4" /> },
        { name: '3. Onboarding', path: '/onboarding', icon: <ArrowRightLeft className="h-4 w-4" /> },
        { name: '4. AI Commerce Assistant', path: '/assistant', icon: <ShoppingCart className="h-4 w-4" /> },
        { name: '5. AI Workspace', path: '/workspace', icon: <Cpu className="h-4 w-4" /> },
        { name: '6. Admin Dashboard', path: '/admin-dashboard', icon: <ShieldAlert className="h-4 w-4" /> },
        { name: '7. Explorer Dashboard', path: '/explorer-dashboard', icon: <Compass className="h-4 w-4" /> },
    ];

    const currentScreen = screens.find(s => {
        if (s.path === '/') return url === '/';
        return url.startsWith(s.path);
    });

    return (
        <div className="fixed bottom-6 right-6 z-[9999] font-sans antialiased">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white px-4 py-3 rounded-full shadow-lg shadow-purple-500/20 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="text-sm font-semibold tracking-wide">Prototype HUD</span>
            </button>

            {/* Menu Dropdown */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-80 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl shadow-2xl p-4 animate-fadeInUp">
                    <div className="flex items-center justify-between mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                        <div className="flex items-center gap-2">
                            <Layers className="h-4 w-4 text-[#7C3AED]" />
                            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">KOPERA-PLUS Screens</h4>
                        </div>
                        <span className="text-[10px] bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full font-bold uppercase">
                            Prototype
                        </span>
                    </div>

                    <ul className="space-y-1.5 max-h-96 overflow-y-auto pr-1">
                        {screens.map((screen, idx) => {
                            const isActive = url === screen.path || (screen.path !== '/' && url.startsWith(screen.path));
                            return (
                                <li key={idx}>
                                    <Link
                                        href={screen.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                                            isActive
                                                ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-700 dark:text-purple-300 font-bold border-l-4 border-[#7C3AED] pl-2'
                                                : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
                                        }`}
                                    >
                                        <span className={isActive ? 'text-[#7C3AED]' : 'text-zinc-400'}>
                                            {screen.icon}
                                        </span>
                                        <span className="flex-1 text-left truncate">{screen.name}</span>
                                        {isActive && (
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] animate-ping"></span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-[10px] text-center text-zinc-400">
                        Current Page: <strong className="text-zinc-700 dark:text-zinc-300">{currentScreen?.name || 'Unknown'}</strong>
                    </div>
                </div>
            )}
        </div>
    );
}
