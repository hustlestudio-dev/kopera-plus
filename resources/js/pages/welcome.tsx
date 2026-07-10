import { Head, Link } from '@inertiajs/react';
import React, { useEffect } from 'react';
import PrototypeHud from '@/components/PrototypeHud';

export default function Welcome() {
    useEffect(() => {
        /* Intersection observer for reveal animations */
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            },
            { threshold: 0.08 },
        );
        document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

        /* Shrink navbar on scroll */
        const nav = document.querySelector('nav');
        const handleScroll = () => {
            if (window.scrollY > 60) {
                nav?.classList.add('shadow-lg');

                if (nav) {
nav.style.height = '68px';
}
            } else {
                nav?.classList.remove('shadow-lg');

                if (nav) {
nav.style.height = '80px';
}
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <Head>
                <title>KOPERA-PLUS | Memberdayakan Pertumbuhan Koperasi dengan AI</title>
                <meta
                    name="description"
                    content="KOPERA-PLUS memanfaatkan AI untuk membantu masyarakat menemukan, bergabung, dan berpartisipasi dalam koperasi secara transparan."
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
                    rel="stylesheet"
                />
            </Head>

            <div className="bg-background text-on-background font-body-md overflow-x-hidden min-h-screen">
                {/* ── NAVBAR ──────────────────────────────────────────── */}
                <nav
                    className="fixed top-0 w-full z-50 transition-all duration-300 h-20"
                    style={{
                        background: 'rgba(249, 249, 255, 0.82)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderBottom: '1px solid rgba(195, 198, 215, 0.25)',
                    }}
                >
                    <div className="flex justify-between items-center h-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                        {/* Logo */}
                        <div className="flex items-center gap-2.5">

                            <span
                                className="font-headline-sm text-headline-sm font-extrabold tracking-tight"
                                style={{
                                    background: 'linear-gradient(135deg, #1e1b4b, #3730a3)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                KOPERA-PLUS
                            </span>
                        </div>

                        {/* Nav Links */}
                        <div className="hidden lg:flex items-center gap-8">
                            {[
                                { label: 'Beranda', href: '#', active: true },
                                { label: 'Fitur', href: '#features' },
                                { label: 'Solusi', href: '#solutions' },
                                { label: 'Perjalanan', href: '#journey' },
                            ].map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className={`font-label-md text-label-md transition-colors duration-200 outline-none focus:outline-none focus-visible:outline-none select-none ${
                                        item.active
                                            ? 'text-primary font-bold border-b-2 border-primary pb-1'
                                            : 'text-on-surface-variant hover:text-primary'
                                    }`}
                                    style={{ WebkitTapHighlightColor: 'transparent' }}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex items-center gap-3">
                            <Link
                                href="/login"
                                className="hidden md:block text-on-surface-variant font-label-md text-label-md hover:text-primary px-4 py-2 rounded-xl transition-all duration-200 hover:bg-primary/5 outline-none focus:outline-none select-none"
                                style={{ WebkitTapHighlightColor: 'transparent' }}
                            >
                                Masuk
                            </Link>
                            <Link
                                href="/onboarding"
                                className="glow-button font-label-md text-label-md px-5 py-2.5 rounded-xl text-white font-semibold outline-none focus:outline-none select-none"
                                style={{ background: 'linear-gradient(135deg, #7C3AED, #2563EB)', WebkitTapHighlightColor: 'transparent' }}
                            >
                                Mulai Sekarang
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* ── HERO ────────────────────────────────────────────── */}
                <header
                    className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-margin-mobile md:px-margin-desktop overflow-hidden"
                    style={{
                        background:
                            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(112,58,237,0.12) 0%, rgba(37,99,235,0.08) 40%, transparent 70%), #f9f9ff',
                    }}
                >
                    {/* Animated Blobs */}
                    <div className="hero-blob hero-blob-1" style={{ top: '-80px', right: '5%' }} />
                    <div className="hero-blob hero-blob-2" style={{ top: '20%', left: '-10%' }} />
                    <div className="hero-blob hero-blob-3" style={{ bottom: '0', right: '30%' }} />

                    {/* Grid dot overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.03]"
                        style={{
                            backgroundImage:
                                'radial-gradient(circle, #334155 1px, transparent 1px)',
                            backgroundSize: '32px 32px',
                        }}
                    />

                    <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                        {/* Left — Copy */}
                        <div className="animate-fadeInUp">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
                                <span
                                    className="w-2 h-2 rounded-full animate-pulse"
                                    style={{ background: '#7C3AED' }}
                                />
                                <span className="text-label-sm font-label-sm text-primary font-semibold tracking-wide">
                                    Platform Koperasi Berbasis AI
                                </span>
                            </div>

                            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-6 leading-[1.08]">
                                Memberdayakan Pertumbuhan Koperasi dengan{' '}
                                <span className="gradient-text-primary">Kecerdasan Buatan</span>
                            </h1>

                            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl leading-relaxed">
                                Membantu orang menemukan koperasi, menjadi anggota, membeli produk,
                                meraih hadiah, dan berpartisipasi secara transparan melalui AI.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/onboarding"
                                    className="glow-button font-label-md text-label-md px-8 py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
                                    style={{ background: 'linear-gradient(135deg, #7C3AED, #2563EB)' }}
                                >
                                    <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                                    Mulai — Gratis
                                </Link>
                                <button className="flex items-center justify-center gap-2 border border-outline/40 text-on-surface font-label-md text-label-md px-8 py-4 rounded-xl hover:bg-surface-container transition-all active:scale-95 hover:border-primary/30 hover:shadow-md">
                                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[14px] text-primary">
                                            play_arrow
                                        </span>
                                    </div>
                                    Lihat Demo
                                </button>
                            </div>

                            {/* Social proof */}
                            <div className="mt-10 flex items-center gap-4">
                                <div className="flex -space-x-2">
                                    {['#7C3AED', '#2563EB', '#059669', '#d97706'].map((color, i) => (
                                        <div
                                            key={i}
                                            className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold"
                                            style={{ background: color }}
                                        >
                                            {['A', 'B', 'C', 'D'][i]}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-label-sm text-on-surface-variant">
                                    <span className="font-bold text-on-surface">12.000+</span> anggota sudah bergabung
                                </p>
                            </div>
                        </div>

                        {/* Right — Image */}
                        <div className="animate-fadeInRight delay-200">
                            <div className="glass-hero p-3 rounded-[32px] relative">
                                <div className="absolute -top-16 -right-16 w-72 h-72 bg-secondary/15 blur-[100px] rounded-full -z-10" />
                                <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-primary/15 blur-[100px] rounded-full -z-10" />
                                <img
                                    className="w-full rounded-[24px] shadow-2xl"
                                    alt="AI brain illustration"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLVvwxD8icfCm6zxGJy-NDkvqTSwAP5c0Pxe7FjKC6--IWymB5Ve-Wxd14MFmV0iUGISMcZIyxmrAwFApdyuSDg_TiRfpxoFP81FYAYtkZbRCX5zG2dDBulKZI_ayH2i310LWIQui1CneQ1hcneWmZspuCuR1MWNkMhHHIXDUAeO4SZHuFvVL2KeWtcSYNSQ3zXZYHW9raRKfNiHWVEFrPgndIdkhAfuvb5xwmbltrv8SRRefr072O-cPO2Pcgh790hgnaEcwpSzQ"
                                />

                                {/* Floating badge */}
                                <div
                                    className="absolute -bottom-5 -right-4 p-4 rounded-2xl border border-white/60 animate-float"
                                    style={{
                                        background: 'rgba(255,255,255,0.85)',
                                        backdropFilter: 'blur(12px)',
                                        boxShadow: '0 8px 32px rgba(37,99,235,0.15)',
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-9 h-9 rounded-full flex items-center justify-center"
                                            style={{ background: 'linear-gradient(135deg, #7C3AED22, #2563EB22)' }}
                                        >
                                            <span className="material-symbols-outlined text-[18px] text-primary">
                                                auto_awesome
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-on-surface-variant font-medium">AI Optimization</p>
                                            <p className="text-body-md font-extrabold gradient-text-primary">+42% Growth</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Top-left badge */}
                                <div
                                    className="absolute -top-5 -left-4 px-3 py-2 rounded-xl border border-white/60 flex items-center gap-2"
                                    style={{
                                        background: 'rgba(255,255,255,0.85)',
                                        backdropFilter: 'blur(12px)',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                    }}
                                >
                                    <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
                                    <span className="text-[11px] font-semibold text-on-surface">250+ Cooperatives</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ── TRUSTED BY ───────────────────────────────────────── */}
                <section className="py-12 border-y border-outline-variant/15 mesh-bg">
                    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
                        <p className="text-label-sm font-label-sm text-outline mb-10 tracking-[0.2em] uppercase">
                            Dipercaya oleh
                        </p>
                        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
                            {[
                                { icon: 'corporate_fare', label: 'Cooperatives' },
                                { icon: 'groups', label: 'Communities' },
                                { icon: 'store', label: 'Local Businesses' },
                                { icon: 'public', label: 'Global Orgs' },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-center gap-2.5 opacity-50 hover:opacity-100 transition-opacity duration-300 group"
                                >
                                    <span className="material-symbols-outlined text-4xl text-primary group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </span>
                                    <span className="font-headline-sm text-on-surface-variant font-semibold">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── STATS ────────────────────────────────────────────── */}
                <section className="py-section-padding px-margin-mobile md:px-margin-desktop">
                    <div className="max-w-container-max mx-auto grid grid-cols-2 lg:grid-cols-4 gap-gutter">
                        {[
                            { value: '12K+', label: 'Anggota Aktif', color: 'linear-gradient(135deg, #7C3AED, #2563EB)' },
                            { value: '250+', label: 'Koperasi', color: 'linear-gradient(135deg, #2563EB, #0ea5e9)' },
                            { value: '95%', label: 'Kepuasan', color: 'linear-gradient(135deg, #059669, #2563EB)' },
                            { value: '85%', label: 'Partisipasi Aktif', color: 'linear-gradient(135deg, #7C3AED, #d946ef)' },
                        ].map((stat, i) => (
                            <div
                                key={stat.label}
                                className={`reveal stat-card p-8 text-center delay-${i * 100}`}
                            >
                                <h3
                                    className="font-display-lg text-display-lg mb-2"
                                    style={{
                                        background: stat.color,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    {stat.value}
                                </h3>
                                <p className="font-label-md text-on-surface-variant">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── PAIN POINTS / FEATURES ────────────────────────────── */}
                <section
                    id="features"
                    className="py-section-padding px-margin-mobile md:px-margin-desktop overflow-hidden"
                    style={{
                        background:
                            'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(112,58,237,0.05) 0%, transparent 70%), #f5f6ff',
                    }}
                >
                    <div className="max-w-container-max mx-auto">
                        <div className="reveal text-center mb-16">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-error/10 text-error text-label-sm font-semibold mb-4">
                                Masalah Utama
                            </span>
                            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">
                                Mengapa orang mulai kehilangan minat pada koperasi?
                            </h2>
                            <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
                                Model koperasi tradisional menghadapi hambatan digital yang menghalangi
                                                                keterlibatan bermakna di era modern.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
                            {[
                                {
                                    icon: 'person_off',
                                    title: 'Low Engagement',
                                    desc: 'Passive members often lose interest without interactive digital tools to keep them connected.',
                                    color: '#ba1a1a',
                                    bg: 'rgba(186,26,26,0.08)',
                                    border: '#ba1a1a',
                                },
                                {
                                    icon: 'visibility_off',
                                    title: 'Lack of Transparency',
                                    desc: 'Opaque financial and decision-making processes create distrust among community members.',
                                    color: '#2563EB',
                                    bg: 'rgba(37,99,235,0.08)',
                                    border: '#2563EB',
                                },
                                {
                                    icon: 'account_tree',
                                    title: 'Complex Services',
                                    desc: 'Navigating bureaucratic systems and legacy processes is frustrating for new users.',
                                    color: '#7C3AED',
                                    bg: 'rgba(124,58,237,0.08)',
                                    border: '#7C3AED',
                                },
                                {
                                    icon: 'smartphone',
                                    title: 'Limited Digital Access',
                                    desc: 'Outdated platforms fail to meet the "mobile-first" expectations of today\'s workforce.',
                                    color: '#525657',
                                    bg: 'rgba(82,86,87,0.08)',
                                    border: '#525657',
                                },
                            ].map((item, i) => (
                                <div
                                    key={item.title}
                                    className={`reveal bg-white p-8 rounded-3xl border border-outline-variant/20 group transition-all duration-300 delay-${i * 100}`}
                                    style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.borderColor = item.border + '40';
                                        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 48px ${item.color}18`;
                                        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(195,198,215,0.2)';
                                        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.04)';
                                        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                                    }}
                                >
                                    <div
                                        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                                        style={{ background: item.bg }}
                                    >
                                        <span
                                            className="material-symbols-outlined"
                                            style={{ color: item.color }}
                                        >
                                            {item.icon}
                                        </span>
                                    </div>
                                    <h4 className="font-headline-sm text-headline-sm text-on-surface mb-3">{item.title}</h4>
                                    <p className="font-body-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── SOLUTIONS (BENTO) ────────────────────────────────── */}
                <section id="solutions" className="py-section-padding px-margin-mobile md:px-margin-desktop">
                    <div className="max-w-container-max mx-auto">
                        <div className="reveal text-center mb-16">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-label-sm font-semibold mb-4">
                                The Solution
                            </span>
                            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">
                                The Intelligent Solution
                            </h2>
                            <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto">
                                We bridge the gap between traditional cooperation and modern AI technology.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
                            {/* Big card — AI Assistant */}
                            <div
                                className="reveal md:col-span-8 bg-white rounded-[32px] overflow-hidden p-8 flex flex-col md:flex-row gap-8 transition-all duration-300 hover:shadow-2xl border border-outline-variant/20"
                                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
                            >
                                <div className="flex-1 flex flex-col justify-center">
                                    <span
                                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-label-sm font-semibold mb-4 w-fit"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(37,99,235,0.12))',
                                            color: '#4338ca',
                                        }}
                                    >
                                        <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                                        Featured AI
                                    </span>
                                    <h3 className="font-headline-md text-headline-md text-on-surface mb-4">
                                        AI Member Assistant
                                    </h3>
                                    <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">
                                        Personalized guidance for every step of the membership journey. Our AI helps
                                        discover the right cooperatives based on interests and needs.
                                    </p>
                                    <ul className="space-y-3">
                                        {['24/7 Intelligent Support', 'Automated Documentation', 'Smart Recommendations'].map(
                                            (f) => (
                                                <li key={f} className="flex items-center gap-2.5 text-on-surface-variant font-label-md">
                                                    <span className="material-symbols-outlined text-primary text-[18px]">
                                                        check_circle
                                                    </span>
                                                    {f}
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                </div>
                                <div className="flex-1 h-64 md:h-full relative overflow-hidden rounded-2xl">
                                    <img
                                        className="w-full h-full object-cover"
                                        alt="AI Chat Interface Mockup"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj87LhVVCQVASCjIvrDwXlg_v0mlWrRi9M4opvc6XhZyxGERKXZM2WlOoEAZy3q2VUfeIl1FIZAWqu4aYKL8bB_Udlaud10W0rGqc4FkaGZbAYcVNEJEteGeLwejYvVf2SR2BT3nSX8C188FIpkXn0Mtc_ImAhyv9IxUDVbGW9hENvN6J8BrHA92uUGa0Z-CjE8aRWkfgwXr307T3PzDRdIrmSG-SanqiGM5ethg7fsAP5HWyYVXySCJB9qyid5Q1Xg820emJoInA"
                                    />
                                </div>
                            </div>

                            {/* Gamification card */}
                            <div
                                className="reveal md:col-span-4 rounded-[32px] overflow-hidden p-8 flex flex-col hover:shadow-xl transition-all duration-300 delay-100 relative"
                                style={{
                                    background: 'linear-gradient(145deg, #7C3AED, #4338ca)',
                                    boxShadow: '0 8px 40px rgba(124,58,237,0.3)',
                                }}
                            >
                                {/* subtle glow orb */}
                                <div
                                    className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none"
                                    style={{ background: '#818cf8' }}
                                />
                                <div className="mb-8 relative z-10">
                                    <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                                        <span className="material-symbols-outlined text-white text-[20px]">workspace_premium</span>
                                    </div>
                                    <h3 className="font-headline-sm text-headline-sm text-white mb-3">
                                        Gamification & Rewards
                                    </h3>
                                    <p className="font-body-sm text-white/80 leading-relaxed">
                                        Earn tokens and reputation by actively participating in governance and community
                                        events.
                                    </p>
                                </div>
                                <div className="mt-auto relative z-10">
                                    <div className="flex justify-center -space-x-4 mb-4">
                                        {[
                                            { icon: 'workspace_premium', color: '#fbbf24' },
                                            { icon: 'volunteer_activism', color: '#34d399' },
                                            { icon: 'token', color: '#60a5fa' },
                                        ].map((b, i) => (
                                            <div
                                                key={i}
                                                className="w-12 h-12 rounded-full border-[3px] border-purple-600 bg-white/10 flex items-center justify-center"
                                            >
                                                <span className="material-symbols-outlined text-[18px]" style={{ color: b.color }}>
                                                    {b.icon}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/25 text-center">
                                        <p className="text-label-md font-bold text-white">🎉 New Level Reached!</p>
                                        <p className="text-[11px] text-white/70 mt-0.5">Ambassador Status Unlocked</p>
                                    </div>
                                </div>
                            </div>

                            {/* Governance card */}
                            <div
                                className="reveal md:col-span-12 bg-white rounded-[32px] overflow-hidden p-8 flex flex-col lg:flex-row items-center gap-12 transition-all duration-300 delay-200 border border-outline-variant/20 hover:shadow-xl"
                            >
                                <div className="lg:w-1/2">
                                    <img
                                        className="w-full rounded-2xl shadow-xl"
                                        alt="Governance Dashboard Visual"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCjxbkZSO_AzD9j-VHEQpbxCWmVft8XvRkA3wG1USHGJuBDXvicYL541_SYTmg2tbKuDTkQY0qudlX5wrl_7dehnv5hadhSymSo0h4UmUaUHdsmpxjXQxIE9Zl37DtUFxflxQxmfATDdpXNN2xG0d9OK-w8JiqHKZSTttB3yV6uuWWCt0nAhMKdwpfxw_KIJGH3FZFvpWSjbA4jfqTBCtoPENUFjdIg01FVbzw4QOVdRtrgZaAXRCthXWmPvUxigWjHbYXm69xaME"
                                    />
                                </div>
                                <div className="lg:w-1/2">
                                    <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-label-sm font-semibold mb-4">
                                        Blockchain-Backed
                                    </span>
                                    <h3 className="font-headline-md text-headline-md text-on-surface mb-4">
                                        Smart Governance Dashboard
                                    </h3>
                                    <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">
                                        Experience true transparency with our blockchain-backed governance engine. Vote on
                                        proposals and track fund allocation in real-time with AI-summarized reports.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div
                                            className="p-5 rounded-2xl text-center"
                                            style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.07), rgba(37,99,235,0.03))' }}
                                        >
                                            <p className="text-headline-md font-extrabold text-primary">0%</p>
                                            <p className="text-label-sm text-on-surface-variant mt-1">Hidden Fees</p>
                                        </div>
                                        <div
                                            className="p-5 rounded-2xl text-center"
                                            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.07), rgba(124,58,237,0.03))' }}
                                        >
                                            <p className="text-headline-md font-extrabold text-secondary">100%</p>
                                            <p className="text-label-sm text-on-surface-variant mt-1">Auditability</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── JOURNEY ──────────────────────────────────────────── */}
                <section
                    id="journey"
                    className="py-section-padding px-margin-mobile md:px-margin-desktop overflow-x-hidden"
                    style={{
                        background:
                            'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(37,99,235,0.05) 0%, transparent 70%), #f9f9ff',
                    }}
                >
                    <div className="max-w-container-max mx-auto">
                        <div className="reveal text-center mb-20">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-label-sm font-semibold mb-4">
                                Your Roadmap
                            </span>
                            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">
                                Your Journey to Empowerment
                            </h2>
                            <p className="font-body-md text-on-surface-variant">
                                The path from discovery to becoming a key cooperative contributor.
                            </p>
                        </div>

                        <div className="relative">
                            {/* Timeline line */}
                            <div className="hidden lg:block absolute top-6 left-0 w-full h-[2px]"
                                style={{ background: 'linear-gradient(90deg, #7C3AED, #2563EB, #0ea5e9, #7C3AED30)' }} />

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-8 relative z-10">
                                {[
                                    { icon: 'explore', label: 'Discover', sub: 'AI-curated matches', phase: 'primary' },
                                    { icon: 'person_add', label: 'Join', sub: 'Digital Onboarding', phase: 'primary' },
                                    { icon: 'shopping_cart', label: 'Buy', sub: 'Support Locals', phase: 'primary' },
                                    { icon: 'loyalty', label: 'Earn', sub: 'Yield & Rewards', phase: 'secondary' },
                                    { icon: 'token', label: 'Digital RAT', sub: 'Tokenized Equity', phase: 'secondary' },
                                    { icon: 'how_to_vote', label: 'Governance', sub: 'Active Voice', phase: 'secondary' },
                                    { icon: 'grade', label: 'Active Member', sub: 'Community Leader', phase: 'accent' },
                                ].map((step, i) => {
                                    const gradients: Record<string, string> = {
                                        primary: 'linear-gradient(135deg, #7C3AED, #2563EB)',
                                        secondary: 'linear-gradient(135deg, #2563EB, #0ea5e9)',
                                        accent: 'linear-gradient(135deg, #059669, #2563EB)',
                                    };

                                    return (
                                        <div
                                            key={step.label}
                                            className={`reveal flex flex-col items-center group delay-${Math.min(i, 5) * 100}`}
                                        >
                                            <div
                                                className="w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-125 transition-transform duration-300 shadow-lg relative z-20"
                                                style={{
                                                    background: gradients[step.phase],
                                                    boxShadow: `0 4px 16px ${step.phase === 'primary' ? 'rgba(124,58,237,0.3)' : step.phase === 'secondary' ? 'rgba(37,99,235,0.3)' : 'rgba(5,150,105,0.3)'}`,
                                                }}
                                            >
                                                <span className="material-symbols-outlined text-white text-[18px]">
                                                    {step.icon}
                                                </span>
                                            </div>
                                            <div className="text-center">
                                                <p className="font-label-md text-on-surface font-semibold mb-0.5">{step.label}</p>
                                                <p className="text-[11px] text-on-surface-variant opacity-70">{step.sub}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CTA BANNER ───────────────────────────────────────── */}
                <section className="py-24 px-margin-mobile md:px-margin-desktop">
                    <div className="max-w-container-max mx-auto">
                        <div
                            className="rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden"
                            style={{ boxShadow: '0 24px 80px rgba(124,58,237,0.25)' }}
                        >
                            {/* Animated gradient background */}
                            <div className="absolute inset-0 animated-gradient-cta rounded-[48px]" />

                            {/* Overlay glow blobs */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[48px]">
                                <div
                                    className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-30"
                                    style={{ background: 'white' }}
                                />
                                <div
                                    className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20"
                                    style={{ background: '#818cf8' }}
                                />
                            </div>

                            {/* Dot grid */}
                            <div
                                className="absolute inset-0 opacity-10 pointer-events-none"
                                style={{
                                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
                                    backgroundSize: '28px 28px',
                                }}
                            />

                            <div className="relative z-10">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-label-sm font-semibold mb-6 border border-white/30">
                                    🚀 Start for free today
                                </span>
                                <h2 className="font-display-lg-mobile md:font-display-lg text-on-primary text-display-lg mb-6 leading-tight">
                                    Ready to experience the
                                    <br />
                                    future of cooperatives?
                                </h2>
                                <p className="font-body-md text-white/70 max-w-md mx-auto mb-10">
                                    Join 12,000+ members building a fairer digital economy powered by AI.
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <Link
                                        href="/onboarding"
                                        className="bg-white font-headline-sm px-10 py-4 rounded-2xl transition-all shadow-2xl active:scale-95 flex items-center justify-center font-bold gap-2 hover:shadow-white/30 hover:scale-[1.02]"
                                        style={{ color: '#7C3AED' }}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                                        Get Started — It's Free
                                    </Link>
                                    <Link
                                        href="/login"
                                        className="border-2 border-white/40 text-white font-label-md px-10 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 hover:bg-white/10"
                                    >
                                        Already have an account? Login
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── FOOTER ───────────────────────────────────────────── */}
                <footer
                    className="border-t border-outline-variant/20 w-full py-section-padding"
                    style={{ background: '#fafaff' }}
                >
                    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-gutter mb-16">
                            {/* Brand */}
                            <div className="col-span-2">
                                <div className="flex items-center gap-2.5 mb-5">

                                    <span
                                        className="font-headline-sm font-extrabold"
                                        style={{
                                            background: 'linear-gradient(135deg, #1e1b4b, #3730a3)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                        }}
                                    >
                                        KOPERA-PLUS
                                    </span>
                                </div>
                                <p className="font-body-sm text-on-surface-variant max-w-xs mb-6 leading-relaxed">
                                    The world's first AI-powered infrastructure for cooperative growth and transparent
                                    community participation.
                                </p>
                                {/* Social links */}
                                <div className="flex gap-3">
                                    {['language', 'mail', 'chat'].map((icon) => (
                                        <a
                                            key={icon}
                                            href="#"
                                            className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all text-on-surface-variant"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">{icon}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Links */}
                            {[
                                {
                                    title: 'Product',
                                    links: ['AI Assistant', 'Governance', 'Rewards', 'Marketplace'],
                                },
                                {
                                    title: 'Company',
                                    links: ['About', 'Careers', 'Contact', 'Blog'],
                                },
                                {
                                    title: 'Resources',
                                    links: ['Documentation', 'API', 'Support', 'Status'],
                                },
                                {
                                    title: 'Legal',
                                    links: ['Privacy Policy', 'Terms', 'Security', 'Cookies'],
                                },
                            ].map((col) => (
                                <div key={col.title}>
                                    <h5 className="font-label-md text-on-surface font-semibold mb-5">{col.title}</h5>
                                    <ul className="space-y-3.5">
                                        {col.links.map((link) => (
                                            <li key={link}>
                                                <a
                                                    href="#"
                                                    className="font-body-sm text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-primary/30"
                                                >
                                                    {link}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Bottom bar */}
                        <div
                            className="pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4"
                        >
                            <p className="font-body-sm text-label-sm text-on-surface-variant">
                                © 2024 KOPERA-PLUS. All rights reserved.
                            </p>
                            <div className="flex items-center gap-1 text-on-surface-variant text-label-sm">
                                <span>Built with</span>
                                <span className="material-symbols-outlined text-[16px] text-error" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                                <span>for cooperative communities</span>
                            </div>
                            <div className="flex items-center gap-6">
                                {['Privacy Policy', 'Terms'].map((link) => (
                                    <a
                                        key={link}
                                        href="#"
                                        className="text-on-surface-variant hover:text-primary font-semibold font-label-sm text-label-sm transition-colors"
                                    >
                                        {link}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

            <PrototypeHud />
        </>
    );
}
