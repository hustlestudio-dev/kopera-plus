import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PrototypeHud from '@/components/PrototypeHud';

export default function Onboarding() {
    return (
        <>
            <Head title="Welcome to KOPERA-PLUS | Onboarding" />

            <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col justify-between antialiased">
                {/* Top AppBar */}
                <header className="bg-surface/80 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/30">
                    <div className="flex justify-between items-center w-full px-8 py-4 max-w-container-max mx-auto">
                        <Link href="/" className="text-headline-sm font-headline-lg font-black tracking-tight text-primary hover:opacity-90 transition-opacity">
                            KOPERA-PLUS
                        </Link>
                        <div className="flex gap-4">
                            <Link href="/demo/auth" className="px-5 py-2 font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-low transition-all rounded-full">
                                Login
                            </Link>
                            <button className="px-5 py-2 font-label-md text-label-md bg-primary text-on-primary hover:opacity-90 transition-all rounded-full">
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </header>

                <main className="max-w-container-max mx-auto px-margin-desktop py-12 flex-grow w-full">
                    {/* Header Illustration Section */}
                    <section className="mb-16 flex flex-col items-center text-center">
                        <div className="w-full max-w-4xl h-64 md:h-[350px] rounded-3xl overflow-hidden mb-12 shadow-2xl relative">
                            <img alt="Advanced AI collaboration illustration" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxCbFB1zKuStylc_HZ90f4ndPfbjSXD7ESAmVkvS_8n_lxan3Fl-GEJ0CyoM-3oZ8xmpHkmXC3CdqTXO4LlSGqoE-FmDF5eoMVdJs6osyHDmQG5RVHh8sfiTDjqf22n1AOwz5N9dT77DBvSJaZjl8Z-VTNBCMfpyf5i-7rLVyu6wqROu05G_c7APA-WkXJuthr6RDZzp0k-_7nOoMnLUX4W7su0gX3fr2NQ8xn2PkX1Gym_aX953A65qZ925_oAgMdMNlCTZarguc" />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/25 to-transparent"></div>
                        </div>
                        <h1 className="font-display-sm text-display-sm md:font-display-lg md:text-display-lg text-primary mb-4">Welcome to KOPERA AI 👋</h1>
                        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
                            Choose how you would like to start your journey. We will personalize your experience based on your selection.
                        </p>
                    </section>

                    {/* Role Selection Bento Grid */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-16">
                        {/* Option 1: Explore */}
                        <div className="bento-card p-8 flex flex-col h-full border border-outline-variant/20 hover:scale-[1.02] transition-transform duration-300">
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                                <span className="material-symbols-outlined text-3xl">potted_plant</span>
                            </div>
                            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Explore Cooperatives</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">
                                Perfect for people who want to learn about cooperatives, discover local products, and browse active member catalogs.
                            </p>
                            <div className="space-y-3 mb-10">
                                <div className="flex items-center gap-3 text-on-surface-variant font-body-sm text-body-sm">
                                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                    AI Search Catalog
                                </div>
                                <div className="flex items-center gap-3 text-on-surface-variant font-body-sm text-body-sm">
                                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                    Find Nearby Cooperative
                                </div>
                                <div className="flex items-center gap-3 text-on-surface-variant font-body-sm text-body-sm">
                                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                    Explore Organic Products
                                </div>
                            </div>
                            <Link href="/explorer-dashboard" className="w-full py-4 bg-primary text-on-primary rounded-xl font-label-md text-label-md text-center hover:bg-primary/95 transition-colors block">
                                Continue
                            </Link>
                        </div>

                        {/* Option 2: Member */}
                        <div className="bento-card p-8 flex flex-col h-full border-2 border-primary/30 shadow-lg hover:scale-[1.02] transition-transform duration-300 relative">
                            <div className="absolute -top-3 right-6 bg-primary text-on-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                Recommended
                            </div>
                            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 text-secondary">
                                <span className="material-symbols-outlined text-3xl">groups</span>
                            </div>
                            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">I'm a Member</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">
                                Access your cooperative services, AI assistant, points & rewards, shopping, Digital RAT, and community.
                            </p>
                            <div className="space-y-3 mb-10">
                                <div className="flex items-center gap-3 text-on-surface-variant font-body-sm text-body-sm">
                                    <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                                    AI Member Assistant
                                </div>
                                <div className="flex items-center gap-3 text-on-surface-variant font-body-sm text-body-sm">
                                    <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                                    AI Commerce & Checkout
                                </div>
                                <div className="flex items-center gap-3 text-on-surface-variant font-body-sm text-body-sm">
                                    <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                                    Digital RAT Voting
                                </div>
                            </div>
                            <Link href="/workspace" className="w-full py-4 ai-gradient-bg text-on-primary rounded-xl font-label-md text-label-md text-center hover:opacity-95 transition-opacity block font-semibold">
                                Continue
                            </Link>
                        </div>

                        {/* Option 3: Administrator */}
                        <div className="bento-card p-8 flex flex-col h-full border border-outline-variant/20 hover:scale-[1.02] transition-transform duration-300">
                            <div className="w-14 h-14 bg-tertiary-container/20 rounded-2xl flex items-center justify-center mb-6 text-tertiary">
                                <span className="material-symbols-outlined text-3xl">corporate_fare</span>
                            </div>
                            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">I'm an Administrator</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">
                                Manage members, products, inventory, governance, and analytics using enterprise AI tools.
                            </p>
                            <div className="space-y-3 mb-10">
                                <div className="flex items-center gap-3 text-on-surface-variant font-body-sm text-body-sm">
                                    <span className="material-symbols-outlined text-tertiary text-lg">check_circle</span>
                                    Governance Dashboard
                                </div>
                                <div className="flex items-center gap-3 text-on-surface-variant font-body-sm text-body-sm">
                                    <span className="material-symbols-outlined text-tertiary text-lg">check_circle</span>
                                    AI Insight Engine
                                </div>
                                <div className="flex items-center gap-3 text-on-surface-variant font-body-sm text-body-sm">
                                    <span className="material-symbols-outlined text-tertiary text-lg">check_circle</span>
                                    Automated Reporting
                                </div>
                            </div>
                            <Link href="/admin-dashboard" className="w-full py-4 bg-tertiary text-on-primary rounded-xl font-label-md text-label-md text-center hover:bg-opacity-95 transition-all block">
                                Continue
                            </Link>
                        </div>
                    </section>

                    {/* AI Assistant Banner */}
                    <div className="bento-card p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-surface-container-low border border-outline-variant/20">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-full ai-gradient-bg flex items-center justify-center shadow-lg animate-pulse text-white">
                                <span className="material-symbols-outlined text-3xl">smart_toy</span>
                            </div>
                            <div>
                                <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1">Not sure which option fits you?</h4>
                                <p className="font-body-md text-body-md text-on-surface-variant">Describe your goals and let our AI personalize your onboarding journey instantly.</p>
                            </div>
                        </div>
                        <button className="px-8 py-4 ai-gradient-bg text-on-primary rounded-2xl font-label-md text-label-md shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined">magic_button</span>
                            Ask AI
                        </button>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-surface-container-lowest border-t border-outline-variant/20 mt-20">
                    <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 py-12 max-w-container-max mx-auto gap-4">
                        <div className="flex flex-col items-center md:items-start gap-2">
                            <div className="font-headline-sm text-on-surface font-extrabold">KOPERA-PLUS</div>
                            <div className="font-body-sm text-body-sm text-on-surface-variant">© 2024 KOPERA-PLUS. AI-Powered Cooperation.</div>
                        </div>
                        <div className="flex gap-8">
                            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-opacity" href="#">Privacy Policy</a>
                            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-opacity" href="#">Terms of Service</a>
                            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-opacity" href="#">Security</a>
                        </div>
                    </div>
                </footer>
            </div>

            <PrototypeHud />
        </>
    );
}
