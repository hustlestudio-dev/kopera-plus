import { Head, Link } from '@inertiajs/react';
import React from 'react';
import PrototypeHud from '@/components/PrototypeHud';

export default function Onboarding() {
    return (
        <>
            <Head title="Selamat Datang di KOPERA-PLUS | Onboarding" />

            <div className="flex min-h-screen flex-col justify-between bg-background font-body-md text-on-surface antialiased">
                {/* Top AppBar */}
                <header className="sticky top-0 z-50 border-b border-outline-variant/30 bg-surface/80 backdrop-blur-md">
                    <div className="mx-auto flex w-full max-w-container-max items-center justify-between px-8 py-4">
                        <Link
                            href="/"
                            className="font-headline-lg text-headline-sm font-black tracking-tight text-primary transition-opacity hover:opacity-90"
                        >
                            KOPERA-PLUS
                        </Link>
                        <div className="flex gap-4">
                            <Link
                                href="/login"
                                className="rounded-full px-5 py-2 font-label-md text-label-md text-on-surface-variant transition-all hover:bg-surface-container-low"
                            >
                                Masuk
                            </Link>
                            <button className="rounded-full bg-primary px-5 py-2 font-label-md text-label-md text-on-primary transition-all hover:opacity-90">
                                Hubungi Tim Sales
                            </button>
                        </div>
                    </div>
                </header>

                <main className="mx-auto w-full max-w-container-max flex-grow px-margin-desktop py-12">
                    {/* Header Illustration Section */}
                    <section className="mb-16 flex flex-col items-center text-center">
                        <div className="relative mb-12 h-64 w-full max-w-4xl overflow-hidden rounded-3xl shadow-2xl md:h-[350px]">
                            <img
                                alt="Advanced AI collaboration illustration"
                                className="h-full w-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxCbFB1zKuStylc_HZ90f4ndPfbjSXD7ESAmVkvS_8n_lxan3Fl-GEJ0CyoM-3oZ8xmpHkmXC3CdqTXO4LlSGqoE-FmDF5eoMVdJs6osyHDmQG5RVHh8sfiTDjqf22n1AOwz5N9dT77DBvSJaZjl8Z-VTNBCMfpyf5i-7rLVyu6wqROu05G_c7APA-WkXJuthr6RDZzp0k-_7nOoMnLUX4W7su0gX3fr2NQ8xn2PkX1Gym_aX953A65qZ925_oAgMdMNlCTZarguc"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/25 to-transparent"></div>
                        </div>
                        <h1 className="font-display-sm text-display-sm mb-4 text-primary md:font-display-lg md:text-display-lg">
                            Selamat Datang di KOPERA AI 👋
                        </h1>
                        <p className="mx-auto max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
                            Pilih cara Anda memulai perjalanan. Kami akan
                            mempersonalisasi pengalaman berdasarkan pilihan
                            Anda.
                        </p>
                    </section>

                    {/* Role Selection Bento Grid */}
                    <section className="mb-16 grid grid-cols-1 gap-gutter md:grid-cols-3">
                        {/* Option 1: Explore */}
                        <div className="bento-card flex h-full flex-col border border-outline-variant/20 p-8 transition-transform duration-300 hover:scale-[1.02]">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <span className="material-symbols-outlined text-3xl">
                                    potted_plant
                                </span>
                            </div>
                            <h3 className="mb-2 font-headline-md text-headline-md text-on-surface">
                                Jelajahi Koperasi
                            </h3>
                            <p className="mb-6 flex-grow font-body-md text-body-md text-on-surface-variant">
                                Perfect for people who want to learn about
                                cooperatives, discover local products, and
                                browse active member catalogs.
                            </p>
                            <div className="mb-10 space-y-3">
                                <div className="flex items-center gap-3 font-body-sm text-body-sm text-on-surface-variant">
                                    <span className="material-symbols-outlined text-lg text-primary">
                                        check_circle
                                    </span>
                                    AI Search Catalog
                                </div>
                                <div className="flex items-center gap-3 font-body-sm text-body-sm text-on-surface-variant">
                                    <span className="material-symbols-outlined text-lg text-primary">
                                        check_circle
                                    </span>
                                    Find Nearby Cooperative
                                </div>
                                <div className="flex items-center gap-3 font-body-sm text-body-sm text-on-surface-variant">
                                    <span className="material-symbols-outlined text-lg text-primary">
                                        check_circle
                                    </span>
                                    Explore Organic Products
                                </div>
                            </div>
                            <Link
                                href="/explorer-dashboard"
                                className="block w-full rounded-xl bg-primary py-4 text-center font-label-md text-label-md text-on-primary transition-colors hover:bg-primary/95"
                            >
                                Lanjut
                            </Link>
                        </div>

                        {/* Option 2: Member */}
                        <div className="bento-card relative flex h-full flex-col border-2 border-primary/30 p-8 shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                            <div className="absolute -top-3 right-6 rounded-full bg-primary px-3 py-1 text-[10px] font-bold tracking-wider text-on-primary uppercase">
                                Recommended
                            </div>
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                                <span className="material-symbols-outlined text-3xl">
                                    groups
                                </span>
                            </div>
                            <h3 className="mb-2 font-headline-md text-headline-md text-on-surface">
                                I'm a Member
                            </h3>
                            <p className="mb-6 flex-grow font-body-md text-body-md text-on-surface-variant">
                                Access your cooperative services, AI assistant,
                                points & rewards, shopping, Digital RAT, and
                                community.
                            </p>
                            <div className="mb-10 space-y-3">
                                <div className="flex items-center gap-3 font-body-sm text-body-sm text-on-surface-variant">
                                    <span className="material-symbols-outlined text-lg text-secondary">
                                        check_circle
                                    </span>
                                    AI Member Assistant
                                </div>
                                <div className="flex items-center gap-3 font-body-sm text-body-sm text-on-surface-variant">
                                    <span className="material-symbols-outlined text-lg text-secondary">
                                        check_circle
                                    </span>
                                    AI Commerce & Checkout
                                </div>
                                <div className="flex items-center gap-3 font-body-sm text-body-sm text-on-surface-variant">
                                    <span className="material-symbols-outlined text-lg text-secondary">
                                        check_circle
                                    </span>
                                    Digital RAT Voting
                                </div>
                            </div>
                            <Link
                                href="/workspace"
                                className="ai-gradient-bg block w-full rounded-xl py-4 text-center font-label-md text-label-md font-semibold text-on-primary transition-opacity hover:opacity-95"
                            >
                                Continue
                            </Link>
                        </div>

                        {/* Option 3: Administrator */}
                        <div className="bento-card flex h-full flex-col border border-outline-variant/20 p-8 transition-transform duration-300 hover:scale-[1.02]">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-tertiary-container/20 text-tertiary">
                                <span className="material-symbols-outlined text-3xl">
                                    corporate_fare
                                </span>
                            </div>
                            <h3 className="mb-2 font-headline-md text-headline-md text-on-surface">
                                I'm an Administrator
                            </h3>
                            <p className="mb-6 flex-grow font-body-md text-body-md text-on-surface-variant">
                                Manage members, products, inventory, governance,
                                and analytics using enterprise AI tools.
                            </p>
                            <div className="mb-10 space-y-3">
                                <div className="flex items-center gap-3 font-body-sm text-body-sm text-on-surface-variant">
                                    <span className="material-symbols-outlined text-lg text-tertiary">
                                        check_circle
                                    </span>
                                    Governance Dashboard
                                </div>
                                <div className="flex items-center gap-3 font-body-sm text-body-sm text-on-surface-variant">
                                    <span className="material-symbols-outlined text-lg text-tertiary">
                                        check_circle
                                    </span>
                                    AI Insight Engine
                                </div>
                                <div className="flex items-center gap-3 font-body-sm text-body-sm text-on-surface-variant">
                                    <span className="material-symbols-outlined text-lg text-tertiary">
                                        check_circle
                                    </span>
                                    Automated Reporting
                                </div>
                            </div>
                            <Link
                                href="/admin-dashboard"
                                className="hover:bg-opacity-95 block w-full rounded-xl bg-tertiary py-4 text-center font-label-md text-label-md text-on-primary transition-all"
                            >
                                Continue
                            </Link>
                        </div>
                    </section>

                    {/* AI Assistant Banner */}
                    <div className="bento-card flex flex-col items-center justify-between gap-8 border border-outline-variant/20 bg-surface-container-low p-8 md:flex-row md:p-12">
                        <div className="flex items-center gap-6">
                            <div className="ai-gradient-bg flex h-16 w-16 animate-pulse items-center justify-center rounded-full text-white shadow-lg">
                                <span className="material-symbols-outlined text-3xl">
                                    smart_toy
                                </span>
                            </div>
                            <div>
                                <h4 className="mb-1 font-headline-sm text-headline-sm text-on-surface">
                                    Not sure which option fits you?
                                </h4>
                                <p className="font-body-md text-body-md text-on-surface-variant">
                                    Describe your goals and let our AI
                                    personalize your onboarding journey
                                    instantly.
                                </p>
                            </div>
                        </div>
                        <button className="ai-gradient-bg flex items-center gap-2 rounded-2xl px-8 py-4 font-label-md text-label-md text-on-primary shadow-lg transition-all hover:shadow-xl active:scale-95">
                            <span className="material-symbols-outlined">
                                magic_button
                            </span>
                            Ask AI
                        </button>
                    </div>
                </main>

                {/* Footer */}
                <footer className="mt-20 border-t border-outline-variant/20 bg-surface-container-lowest">
                    <div className="mx-auto flex w-full max-w-container-max flex-col items-center justify-between gap-4 px-8 py-12 md:flex-row">
                        <div className="flex flex-col items-center gap-2 md:items-start">
                            <div className="font-headline-sm font-extrabold text-on-surface">
                                KOPERA-PLUS
                            </div>
                            <div className="font-body-sm text-body-sm text-on-surface-variant">
                                © 2024 KOPERA-PLUS. AI-Powered Cooperation.
                            </div>
                        </div>
                        <div className="flex gap-8">
                            <a
                                className="font-label-sm text-label-sm text-on-surface-variant transition-opacity hover:text-primary"
                                href="#"
                            >
                                Kebijakan Privasi
                            </a>
                            <a
                                className="font-label-sm text-label-sm text-on-surface-variant transition-opacity hover:text-primary"
                                href="#"
                            >
                                Syarat Layanan
                            </a>
                            <a
                                className="font-label-sm text-label-sm text-on-surface-variant transition-opacity hover:text-primary"
                                href="#"
                            >
                                Keamanan
                            </a>
                        </div>
                    </div>
                </footer>
            </div>

            <PrototypeHud />
        </>
    );
}
