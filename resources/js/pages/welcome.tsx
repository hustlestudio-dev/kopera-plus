import { Head, Link, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import PrototypeHud from '@/components/PrototypeHud';

export default function Welcome() {
    const { auth, currentTeam } = usePage().props;
    const user = auth?.user;
    const isAuthed = Boolean(user);
    const teamSlug = (currentTeam as { slug?: string } | null)?.slug;

    // Mirror the server-side role-based landing (RedirectsToCurrentTeam): only
    // route to a role-guarded dashboard when the user actually holds that role.
    const dashboardUrl = user?.roles?.includes('administrator')
        ? '/admin-dashboard'
        : user?.roles?.includes('explorer')
          ? '/explorer-dashboard'
          : user?.roles?.includes('member') && teamSlug
            ? `/${teamSlug}/dashboard`
            : '/settings/teams';

    const [activeSection, setActiveSection] = useState('home');

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
        document
            .querySelectorAll('.reveal')
            .forEach((el) => observer.observe(el));

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        const sectionIds = ['home', 'features', 'solutions', 'journey'];

        const updateActiveSection = () => {
            const scrollPosition = window.scrollY + 180;
            let currentSection = 'home';

            sectionIds.forEach((sectionId) => {
                const section = document.getElementById(sectionId);

                if (section && section.offsetTop <= scrollPosition) {
                    currentSection = sectionId;
                }
            });

            setActiveSection(currentSection);
        };

        updateActiveSection();

        window.addEventListener('scroll', updateActiveSection, {
            passive: true,
        });
        window.addEventListener('hashchange', updateActiveSection);

        return () => {
            window.removeEventListener('scroll', updateActiveSection);
            window.removeEventListener('hashchange', updateActiveSection);
        };
    }, []);

    return (
        <>
            <Head>
                <title>
                    KOPERA-PLUS | Memberdayakan Pertumbuhan Koperasi dengan AI
                </title>
                <meta
                    name="description"
                    content="KOPERA-PLUS memanfaatkan AI untuk membantu masyarakat menemukan, bergabung, dan berpartisipasi dalam koperasi secara transparan."
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Hanken+Grotesk:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
                    rel="stylesheet"
                />
            </Head>

            <div className="relative min-h-screen overflow-x-hidden bg-background font-body-md text-on-background">
                {/* ── NAVBAR ──────────────────────────────────────────── */}
                <nav
                    className="absolute top-0 left-0 z-50 h-20 w-full transition-all duration-300"
                    style={{
                        background: 'transparent',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
                    }}
                >
                    <div className="mx-auto flex h-full max-w-container-max items-center justify-between px-margin-mobile text-white md:px-margin-desktop">
                        {/* Logo */}
                        <div className="flex items-center gap-2.5">
                            <span
                                className="font-headline-sm text-headline-sm font-extrabold tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]"
                                style={{
                                    background:
                                        'linear-gradient(135deg, #f8fafc, #c4b5fd)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                KOPERA-PLUS
                            </span>
                        </div>

                        {/* Nav Links */}
                        <div className="hidden items-center gap-8 lg:flex">
                            {[
                                {
                                    label: 'Beranda',
                                    href: '#home',
                                    sectionId: 'home',
                                },
                                {
                                    label: 'Fitur',
                                    href: '#features',
                                    sectionId: 'features',
                                },
                                {
                                    label: 'Solusi',
                                    href: '#solutions',
                                    sectionId: 'solutions',
                                },
                                {
                                    label: 'Perjalanan',
                                    href: '#journey',
                                    sectionId: 'journey',
                                },
                            ].map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className={`font-label-md text-label-md drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] transition-colors duration-200 outline-none select-none focus:outline-none focus-visible:outline-none ${
                                        activeSection === item.sectionId
                                            ? 'border-b-2 border-white pb-1 font-bold text-white'
                                            : 'text-white/85 hover:text-white'
                                    }`}
                                    style={{
                                        WebkitTapHighlightColor: 'transparent',
                                    }}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex items-center gap-3">
                            {isAuthed ? (
                                <Link
                                    href={dashboardUrl}
                                    prefetch
                                    className="glow-button rounded-xl px-5 py-2.5 font-label-md text-label-md font-semibold text-white outline-none select-none focus:outline-none"
                                    style={{
                                        background:
                                            'linear-gradient(135deg, #7C3AED, #2563EB)',
                                        WebkitTapHighlightColor: 'transparent',
                                    }}
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="hidden rounded-xl px-4 py-2 font-label-md text-label-md text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] transition-all duration-200 outline-none select-none hover:bg-white/10 hover:text-white focus:outline-none md:block"
                                        style={{
                                            WebkitTapHighlightColor: 'transparent',
                                        }}
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="glow-button rounded-xl px-5 py-2.5 font-label-md text-label-md font-semibold text-white outline-none select-none focus:outline-none"
                                        style={{
                                            background:
                                                'linear-gradient(135deg, #7C3AED, #2563EB)',
                                            WebkitTapHighlightColor: 'transparent',
                                        }}
                                    >
                                        Mulai Sekarang
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* ── HERO ────────────────────────────────────────────── */}
                <header
                    id="home"
                    className="relative flex h-[100dvh] min-h-[100svh] items-start overflow-hidden px-margin-mobile pt-24 pb-12 md:px-margin-desktop md:pt-28 md:pb-16"
                >
                    <video
                        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        aria-hidden="true"
                    >
                        <source src="/0711(4).mp4" type="video/mp4" />
                    </video>

                    <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/72 to-zinc-950/85" />
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-zinc-950/70 to-transparent" />

                    <div className="animate-fadeInUp relative z-10 mx-auto flex w-full max-w-container-max flex-col items-center text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur-sm">
                            <span
                                className="h-2 w-2 animate-pulse rounded-full"
                                style={{ background: '#7C3AED' }}
                            />
                            <span className="font-label-sm text-label-sm font-semibold tracking-wide text-white">
                                Platform Koperasi Berbasis AI
                            </span>
                        </div>

                        <h1 className="mx-auto mb-6 max-w-4xl font-display-lg-mobile text-display-lg-mobile leading-[1.08] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)] md:font-display-lg md:text-display-lg">
                            Memberdayakan Pertumbuhan Koperasi dengan{' '}
                            <span className="gradient-text-primary">
                                Kecerdasan Buatan
                            </span>
                        </h1>

                        <p className="mx-auto mb-10 max-w-2xl font-body-lg text-body-lg leading-relaxed text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
                            Membantu orang menemukan koperasi, menjadi anggota,
                            membeli produk, meraih hadiah, dan berpartisipasi
                            secara transparan melalui AI.
                        </p>

                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Link
                                href="/register"
                                className="glow-button flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-label-md text-label-md font-semibold text-white"
                                style={{
                                    background:
                                        'linear-gradient(135deg, #7C3AED, #2563EB)',
                                }}
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    rocket_launch
                                </span>
                                {isAuthed ? 'Dashboard' : 'Mulai Sekarang'}
                            </Link>
                            <button className="flex items-center justify-center gap-2 rounded-xl border border-white/50 px-8 py-4 font-label-md text-label-md text-white backdrop-blur-sm transition-all hover:bg-white/10 active:scale-95">
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                                    <span className="material-symbols-outlined text-[14px] text-white">
                                        play_arrow
                                    </span>
                                </div>
                                Info Lebih Lanjut
                            </button>
                        </div>

                        <div className="mt-10 flex items-center justify-center gap-4">
                            <div className="flex -space-x-2">
                                {[
                                    '#7C3AED',
                                    '#2563EB',
                                    '#059669',
                                    '#d97706',
                                ].map((color, i) => (
                                    <div
                                        key={i}
                                        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white"
                                        style={{ background: color }}
                                    >
                                        {['A', 'B', 'C', 'D'][i]}
                                    </div>
                                ))}
                            </div>
                            <p className="text-label-sm text-white/90">
                                <span className="font-bold text-white">
                                    80.000+
                                </span>{' '}
                                total koperasi
                            </p>
                        </div>
                    </div>
                </header>

                {/* ── TRUSTED BY ───────────────────────────────────────── */}
                <section className="mesh-bg border-y border-outline-variant/15 py-12">
                    <div className="mx-auto max-w-container-max px-margin-mobile text-center md:px-margin-desktop">
                        <p className="mb-10 font-label-sm text-label-sm tracking-[0.2em] text-outline uppercase">
                            Dipercaya oleh
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
                            {[
                                { icon: 'corporate_fare', label: 'Koperasi' },
                                { icon: 'groups', label: 'Komunitas' },
                                { icon: 'store', label: 'UMKM Lokal' },
                                { icon: 'public', label: 'Organisasi Global' },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="group flex items-center gap-2.5 opacity-50 transition-opacity duration-300 hover:opacity-100"
                                >
                                    <span className="material-symbols-outlined text-4xl text-primary transition-transform group-hover:scale-110">
                                        {item.icon}
                                    </span>
                                    <span className="font-headline-sm font-semibold text-on-surface-variant">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── STATS ────────────────────────────────────────────── */}
                <section className="px-margin-mobile py-section-padding md:px-margin-desktop">
                    <div className="mx-auto grid max-w-container-max grid-cols-1 gap-gutter md:grid-cols-3">
                        {[
                            {
                                value: '80.000+',
                                label: 'Koperasi',
                                color: 'linear-gradient(135deg, #2563EB, #0ea5e9)',
                            },
                            {
                                value: '95%',
                                label: 'Kepuasan',
                                color: 'linear-gradient(135deg, #059669, #2563EB)',
                            },
                            {
                                value: '85%',
                                label: 'Partisipasi Aktif',
                                color: 'linear-gradient(135deg, #7C3AED, #d946ef)',
                            },
                        ].map((stat, i) => (
                            <div
                                key={stat.label}
                                className={`reveal stat-card p-8 text-center delay-${i * 100}`}
                            >
                                <h3
                                    className="mb-2 font-display-lg text-display-lg"
                                    style={{
                                        background: stat.color,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}
                                >
                                    {stat.value}
                                </h3>
                                <p className="font-label-md text-on-surface-variant">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── PAIN POINTS / FEATURES ────────────────────────────── */}
                <section
                    id="features"
                    className="overflow-hidden px-margin-mobile py-section-padding md:px-margin-desktop"
                    style={{
                        background:
                            'radial-gradient(ellipse 100% 60% at 50% 50%, rgba(112,58,237,0.05) 0%, transparent 70%), #f5f6ff',
                    }}
                >
                    <div className="mx-auto max-w-container-max">
                        <div className="reveal mb-16 text-center">
                            <span className="mb-4 inline-block rounded-full bg-error/10 px-4 py-1.5 text-label-sm font-semibold text-error">
                                Masalah Utama
                            </span>
                            <h2 className="mb-4 font-headline-lg text-headline-lg text-on-surface">
                                Mengapa orang mulai kehilangan minat pada
                                koperasi?
                            </h2>
                            <p className="mx-auto max-w-2xl font-body-md leading-relaxed text-on-surface-variant">
                                Model koperasi tradisional menghadapi hambatan
                                digital yang menghalangi keterlibatan bermakna
                                di era modern.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:grid-cols-4">
                            {[
                                {
                                    icon: 'person_off',
                                    title: 'Keterlibatan Rendah',
                                    desc: 'Anggota pasif sering kehilangan minat karena belum ada alat digital interaktif yang menjaga mereka tetap terhubung.',
                                    color: '#ba1a1a',
                                    bg: 'rgba(186,26,26,0.08)',
                                    border: '#ba1a1a',
                                },
                                {
                                    icon: 'visibility_off',
                                    title: 'Kurang Transparan',
                                    desc: 'Proses keuangan dan pengambilan keputusan yang tidak terbuka menimbulkan ketidakpercayaan antaranggota.',
                                    color: '#2563EB',
                                    bg: 'rgba(37,99,235,0.08)',
                                    border: '#2563EB',
                                },
                                {
                                    icon: 'account_tree',
                                    title: 'Layanan Rumit',
                                    desc: 'Sistem birokrasi dan proses lama membuat pengguna baru kesulitan dan cepat menyerah.',
                                    color: '#7C3AED',
                                    bg: 'rgba(124,58,237,0.08)',
                                    border: '#004ac6',
                                },
                                {
                                    icon: 'smartphone',
                                    title: 'Akses Digital Terbatas',
                                    desc: 'Platform lama belum memenuhi ekspektasi "mobile-first" dari pengguna masa kini.',
                                    color: '#525657',
                                    bg: 'rgba(82,86,87,0.08)',
                                    border: '#525657',
                                },
                            ].map((item, i) => (
                                <div
                                    key={item.title}
                                    className={`reveal group rounded-3xl border border-outline-variant/20 bg-white p-8 transition-all duration-300 delay-${i * 100}`}
                                    style={{
                                        boxShadow:
                                            '0 2px 16px rgba(0,0,0,0.04)',
                                    }}
                                    onMouseEnter={(e) => {
                                        (
                                            e.currentTarget as HTMLDivElement
                                        ).style.borderColor =
                                            item.border + '40';
                                        (
                                            e.currentTarget as HTMLDivElement
                                        ).style.boxShadow =
                                            `0 16px 48px ${item.color}18`;
                                        (
                                            e.currentTarget as HTMLDivElement
                                        ).style.transform = 'translateY(-4px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        (
                                            e.currentTarget as HTMLDivElement
                                        ).style.borderColor =
                                            'rgba(195,198,215,0.2)';
                                        (
                                            e.currentTarget as HTMLDivElement
                                        ).style.boxShadow =
                                            '0 2px 16px rgba(0,0,0,0.04)';
                                        (
                                            e.currentTarget as HTMLDivElement
                                        ).style.transform = 'translateY(0)';
                                    }}
                                >
                                    <div
                                        className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                                        style={{ background: item.bg }}
                                    >
                                        <span
                                            className="material-symbols-outlined"
                                            style={{ color: item.color }}
                                        >
                                            {item.icon}
                                        </span>
                                    </div>
                                    <h4 className="mb-3 font-headline-sm text-headline-sm text-on-surface">
                                        {item.title}
                                    </h4>
                                    <p className="font-body-sm leading-relaxed text-on-surface-variant">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── SOLUTIONS (BENTO) ────────────────────────────────── */}
                <section
                    id="solutions"
                    className="px-margin-mobile py-section-padding md:px-margin-desktop"
                >
                    <div className="mx-auto max-w-container-max">
                        <div className="reveal mb-16 text-center">
                            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-label-sm font-semibold text-primary">
                                Solusi Kami
                            </span>
                            <h2 className="mb-4 font-headline-lg text-headline-lg text-on-surface">
                                Solusi Cerdas untuk Koperasi
                            </h2>
                            <p className="mx-auto max-w-2xl font-body-md text-on-surface-variant">
                                Kami menjembatani koperasi tradisional dengan
                                teknologi AI modern.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-gutter md:grid-cols-12">
                            {/* Big card — AI Assistant */}
                            <div
                                className="reveal flex flex-col gap-8 overflow-hidden rounded-[32px] border border-outline-variant/20 bg-white p-8 transition-all duration-300 hover:shadow-2xl md:col-span-8 md:flex-row"
                                style={{
                                    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                                }}
                            >
                                <div className="flex flex-1 flex-col justify-center">
                                    <span
                                        className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-label-sm font-semibold"
                                        style={{
                                            background:
                                                'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(37,99,235,0.12))',
                                            color: '#4338ca',
                                        }}
                                    >
                                        <span className="material-symbols-outlined text-[14px]">
                                            auto_awesome
                                        </span>
                                        AI Unggulan
                                    </span>
                                    <h3 className="mb-4 font-headline-md text-headline-md text-on-surface">
                                        Asisten Anggota AI
                                    </h3>
                                    <p className="mb-6 font-body-md leading-relaxed text-on-surface-variant">
                                        Pendampingan personal di setiap tahap
                                        perjalanan keanggotaan. AI kami membantu
                                        menemukan koperasi yang paling sesuai
                                        dengan minat dan kebutuhan.
                                    </p>
                                    <ul className="space-y-3">
                                        {[
                                            'Dukungan Cerdas 24/7',
                                            'Dokumentasi Otomatis',
                                            'Rekomendasi Pintar',
                                        ].map((f) => (
                                            <li
                                                key={f}
                                                className="flex items-center gap-2.5 font-label-md text-on-surface-variant"
                                            >
                                                <span className="material-symbols-outlined text-[18px] text-primary">
                                                    check_circle
                                                </span>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="relative h-64 flex-1 overflow-hidden rounded-2xl md:h-full">
                                    <img
                                        className="h-full w-full object-cover"
                                        alt="Tampilan antarmuka chat AI"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj87LhVVCQVASCjIvrDwXlg_v0mlWrRi9M4opvc6XhZyxGERKXZM2WlOoEAZy3q2VUfeIl1FIZAWqu4aYKL8bB_Udlaud10W0rGqc4FkaGZbAYcVNEJEteGeLwejYvVf2SR2BT3nSX8C188FIpkXn0Mtc_ImAhyv9IxUDVbGW9hENvN6J8BrHA92uUGa0Z-CjE8aRWkfgwXr307T3PzDRdIrmSG-SanqiGM5ethg7fsAP5HWyYVXySCJB9qyid5Q1Xg820emJoInA"
                                    />
                                </div>
                            </div>

                            {/* Gamification card */}
                            <div
                                className="reveal relative flex flex-col overflow-hidden rounded-[32px] p-8 transition-all delay-100 duration-300 hover:shadow-xl md:col-span-4"
                                style={{
                                    background:
                                        'linear-gradient(145deg, #7C3AED, #4338ca)',
                                    boxShadow:
                                        '0 8px 40px rgba(124,58,237,0.3)',
                                }}
                            >
                                {/* subtle glow orb */}
                                <div
                                    className="pointer-events-none absolute top-0 right-0 h-48 w-48 rounded-full opacity-30 blur-3xl"
                                    style={{ background: '#818cf8' }}
                                />
                                <div className="relative z-10 mb-8">
                                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20">
                                        <span className="material-symbols-outlined text-[20px] text-white">
                                            workspace_premium
                                        </span>
                                    </div>
                                    <h3 className="mb-3 font-headline-sm text-headline-sm text-white">
                                        Gamifikasi & Hadiah
                                    </h3>
                                    <p className="font-body-sm leading-relaxed text-white/80">
                                        Dapatkan token dan reputasi dengan aktif
                                        berpartisipasi dalam tata kelola dan
                                        kegiatan komunitas.
                                    </p>
                                </div>
                                <div className="relative z-10 mt-auto">
                                    <div className="mb-4 flex justify-center -space-x-4">
                                        {[
                                            {
                                                icon: 'workspace_premium',
                                                color: '#fbbf24',
                                            },
                                            {
                                                icon: 'volunteer_activism',
                                                color: '#34d399',
                                            },
                                            { icon: 'token', color: '#60a5fa' },
                                        ].map((b, i) => (
                                            <div
                                                key={i}
                                                className="flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-purple-600 bg-white/10"
                                            >
                                                <span
                                                    className="material-symbols-outlined text-[18px]"
                                                    style={{ color: b.color }}
                                                >
                                                    {b.icon}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="rounded-2xl border border-white/25 bg-white/15 p-4 text-center backdrop-blur-md">
                                        <p className="text-label-md font-bold text-white">
                                            🎉 Level Baru Tercapai!
                                        </p>
                                        <p className="mt-0.5 text-[11px] text-white/70">
                                            Status Duta Berhasil Dibuka
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Governance card */}
                            <div className="reveal flex flex-col items-center gap-12 overflow-hidden rounded-[32px] border border-outline-variant/20 bg-white p-8 transition-all delay-200 duration-300 hover:shadow-xl md:col-span-12 lg:flex-row">
                                <div className="lg:w-1/2">
                                    <img
                                        className="w-full rounded-2xl shadow-xl"
                                        alt="Visual dashboard tata kelola"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCjxbkZSO_AzD9j-VHEQpbxCWmVft8XvRkA3wG1USHGJuBDXvicYL541_SYTmg2tbKuDTkQY0qudlX5wrl_7dehnv5hadhSymSo0h4UmUaUHdsmpxjXQxIE9Zl37DtUFxflxQxmfATDdpXNN2xG0d9OK-w8JiqHKZSTttB3yV6uuWWCt0nAhMKdwpfxw_KIJGH3FZFvpWSjbA4jfqTBCtoPENUFjdIg01FVbzw4QOVdRtrgZaAXRCthXWmPvUxigWjHbYXm69xaME"
                                    />
                                </div>
                                <div className="lg:w-1/2">
                                    <span className="mb-4 inline-block rounded-full bg-secondary/10 px-3 py-1 text-label-sm font-semibold text-secondary">
                                        Didukung Blockchain
                                    </span>
                                    <h3 className="mb-4 font-headline-md text-headline-md text-on-surface">
                                        Dashboard Tata Kelola Cerdas
                                    </h3>
                                    <p className="mb-6 font-body-md leading-relaxed text-on-surface-variant">
                                        Rasakan transparansi nyata dengan mesin
                                        tata kelola berbasis blockchain. Beri
                                        suara untuk proposal dan pantau alokasi
                                        dana secara real-time dengan ringkasan
                                        AI.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div
                                            className="rounded-2xl p-5 text-center"
                                            style={{
                                                background:
                                                    'linear-gradient(135deg, rgba(37,99,235,0.07), rgba(37,99,235,0.03))',
                                            }}
                                        >
                                            <p className="text-headline-md font-extrabold text-primary">
                                                0%
                                            </p>
                                            <p className="mt-1 text-label-sm text-on-surface-variant">
                                                Biaya Tersembunyi
                                            </p>
                                        </div>
                                        <div
                                            className="rounded-2xl p-5 text-center"
                                            style={{
                                                background:
                                                    'linear-gradient(135deg, rgba(124,58,237,0.07), rgba(124,58,237,0.03))',
                                            }}
                                        >
                                            <p className="text-headline-md font-extrabold text-secondary">
                                                100%
                                            </p>
                                            <p className="mt-1 text-label-sm text-on-surface-variant">
                                                Dapat Diaudit
                                            </p>
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
                    className="overflow-x-hidden px-margin-mobile py-section-padding md:px-margin-desktop"
                    style={{
                        background:
                            'radial-gradient(ellipse 100% 80% at 50% 50%, rgba(37,99,235,0.05) 0%, transparent 70%), #f9f9ff',
                    }}
                >
                    <div className="mx-auto max-w-container-max">
                        <div className="reveal mb-20 text-center">
                            <span className="mb-4 inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-label-sm font-semibold text-secondary">
                                Peta Perjalanan Anda
                            </span>
                            <h2 className="mb-4 font-headline-lg text-headline-lg text-on-surface">
                                Perjalanan Anda Menuju Kemandirian
                            </h2>
                            <p className="font-body-md text-on-surface-variant">
                                Langkah dari tahap mengenal hingga menjadi
                                kontributor utama koperasi.
                            </p>
                        </div>

                        <div className="relative">
                            {/* Timeline line */}
                            <div
                                className="absolute top-6 left-0 hidden h-[2px] w-full lg:block"
                                style={{
                                    background:
                                        'linear-gradient(90deg, #7C3AED, #2563EB, #0ea5e9, #7C3AED30)',
                                }}
                            />

                            <div className="relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-7">
                                {[
                                    {
                                        icon: 'explore',
                                        label: 'Jelajahi',
                                        sub: 'Pencocokan oleh AI',
                                        phase: 'primary',
                                    },
                                    {
                                        icon: 'person_add',
                                        label: 'Bergabung',
                                        sub: 'Onboarding Digital',
                                        phase: 'primary',
                                    },
                                    {
                                        icon: 'shopping_cart',
                                        label: 'Belanja',
                                        sub: 'Dukung Produk Lokal',
                                        phase: 'primary',
                                    },
                                    {
                                        icon: 'loyalty',
                                        label: 'Dapatkan',
                                        sub: 'Imbal Hasil & Hadiah',
                                        phase: 'secondary',
                                    },
                                    {
                                        icon: 'token',
                                        label: 'RAT Digital',
                                        sub: 'Ekuitas Tertokenisasi',
                                        phase: 'secondary',
                                    },
                                    {
                                        icon: 'how_to_vote',
                                        label: 'Tata Kelola',
                                        sub: 'Suara Aktif',
                                        phase: 'secondary',
                                    },
                                    {
                                        icon: 'grade',
                                        label: 'Anggota Aktif',
                                        sub: 'Pemimpin Komunitas',
                                        phase: 'accent',
                                    },
                                ].map((step, i) => {
                                    const gradients: Record<string, string> = {
                                        primary:
                                            'linear-gradient(135deg, #7C3AED, #2563EB)',
                                        secondary:
                                            'linear-gradient(135deg, #2563EB, #0ea5e9)',
                                        accent: 'linear-gradient(135deg, #059669, #2563EB)',
                                    };

                                    return (
                                        <div
                                            key={step.label}
                                            className={`reveal group flex flex-col items-center delay-${Math.min(i, 5) * 100}`}
                                        >
                                            <div
                                                className="relative z-20 mb-4 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform duration-300 group-hover:scale-125"
                                                style={{
                                                    background:
                                                        gradients[step.phase],
                                                    boxShadow: `0 4px 16px ${step.phase === 'primary' ? 'rgba(124,58,237,0.3)' : step.phase === 'secondary' ? 'rgba(37,99,235,0.3)' : 'rgba(5,150,105,0.3)'}`,
                                                }}
                                            >
                                                <span className="material-symbols-outlined text-[18px] text-white">
                                                    {step.icon}
                                                </span>
                                            </div>
                                            <div className="text-center">
                                                <p className="mb-0.5 font-label-md font-semibold text-on-surface">
                                                    {step.label}
                                                </p>
                                                <p className="text-[11px] text-on-surface-variant opacity-70">
                                                    {step.sub}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CTA BANNER ───────────────────────────────────────── */}
                <section className="px-margin-mobile py-24 md:px-margin-desktop">
                    <div className="mx-auto max-w-container-max">
                        <div
                            className="relative overflow-hidden rounded-[48px] p-12 text-center md:p-24"
                            style={{
                                boxShadow: '0 24px 80px rgba(124,58,237,0.25)',
                            }}
                        >
                            {/* Animated gradient background */}
                            <div className="animated-gradient-cta absolute inset-0 rounded-[48px]" />

                            {/* Overlay glow blobs */}
                            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[48px]">
                                <div
                                    className="absolute -top-20 -left-20 h-80 w-80 rounded-full opacity-30 blur-3xl"
                                    style={{ background: 'white' }}
                                />
                                <div
                                    className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full opacity-20 blur-3xl"
                                    style={{ background: '#818cf8' }}
                                />
                            </div>

                            {/* Dot grid */}
                            <div
                                className="pointer-events-none absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage:
                                        'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
                                    backgroundSize: '28px 28px',
                                }}
                            />

                            <div className="relative z-10">
                                <span className="mb-6 inline-block rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-label-sm font-semibold text-white">
                                    🚀 Mulai gratis hari ini
                                </span>
                                <h2 className="mb-6 font-display-lg-mobile text-display-lg leading-tight text-on-primary md:font-display-lg">
                                    Siap merasakan
                                    <br />
                                    masa depan koperasi?
                                </h2>
                                <p className="mx-auto mb-10 max-w-md font-body-md text-white/70">
                                    Bergabung dengan 80.000+ koperasi yang
                                    membangun ekonomi digital lebih adil dengan
                                    dukungan AI.
                                </p>
                                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                    <Link
                                        href={isAuthed ? dashboardUrl : '/register'}
                                        prefetch={isAuthed}
                                        className="flex items-center justify-center gap-2 rounded-2xl bg-white px-10 py-4 font-headline-sm font-bold shadow-2xl transition-all hover:scale-[1.02] hover:shadow-white/30 active:scale-95"
                                        style={{ color: '#7C3AED' }}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            rocket_launch
                                        </span>
                                        {isAuthed ? 'Dashboard' : 'Mulai Sekarang — Gratis'}
                                    </Link>
                                    {!isAuthed && (
                                        <Link
                                            href="/login"
                                            className="flex items-center justify-center gap-2 rounded-2xl border-2 border-white/40 px-10 py-4 font-label-md text-white transition-all hover:bg-white/10"
                                        >
                                            Sudah punya akun? Masuk
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── FOOTER ───────────────────────────────────────────── */}
                <footer
                    className="w-full border-t border-outline-variant/20 py-section-padding"
                    style={{ background: '#fafaff' }}
                >
                    <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
                        <div className="mb-16 grid grid-cols-2 gap-gutter md:grid-cols-4 lg:grid-cols-6">
                            {/* Brand */}
                            <div className="col-span-2">
                                <div className="mb-5 flex items-center gap-2.5">
                                    <span
                                        className="font-headline-sm font-extrabold"
                                        style={{
                                            background:
                                                'linear-gradient(135deg, #1e1b4b, #3730a3)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                        }}
                                    >
                                        KOPERA-PLUS
                                    </span>
                                </div>
                                <p className="mb-6 max-w-xs font-body-sm leading-relaxed text-on-surface-variant">
                                    Infrastruktur berbasis AI untuk mendorong
                                    pertumbuhan koperasi dan partisipasi
                                    komunitas secara transparan.
                                </p>
                                {/* Social links */}
                                <div className="flex gap-3">
                                    {['language', 'mail', 'chat'].map(
                                        (icon) => (
                                            <a
                                                key={icon}
                                                href="#"
                                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-container text-on-surface-variant transition-all hover:bg-primary/10 hover:text-primary"
                                            >
                                                <span className="material-symbols-outlined text-[18px]">
                                                    {icon}
                                                </span>
                                            </a>
                                        ),
                                    )}
                                </div>
                            </div>

                            {/* Links */}
                            {[
                                {
                                    title: 'Produk',
                                    links: [
                                        'Asisten AI',
                                        'Tata Kelola',
                                        'Hadiah',
                                        'Pasar Digital',
                                    ],
                                },
                                {
                                    title: 'Perusahaan',
                                    links: [
                                        'Tentang Kami',
                                        'Karier',
                                        'Kontak',
                                        'Blog',
                                    ],
                                },
                                {
                                    title: 'Sumber Daya',
                                    links: [
                                        'Dokumentasi',
                                        'Antarmuka API',
                                        'Bantuan',
                                        'Status Layanan',
                                    ],
                                },
                                {
                                    title: 'Hukum',
                                    links: [
                                        'Kebijakan Privasi',
                                        'Syarat & Ketentuan',
                                        'Keamanan',
                                        'Kuki',
                                    ],
                                },
                            ].map((col) => (
                                <div key={col.title}>
                                    <h5 className="mb-5 font-label-md font-semibold text-on-surface">
                                        {col.title}
                                    </h5>
                                    <ul className="space-y-3.5">
                                        {col.links.map((link) => (
                                            <li key={link}>
                                                <a
                                                    href="#"
                                                    className="font-body-sm text-on-surface-variant decoration-primary/30 transition-colors hover:text-primary hover:underline"
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
                        <div className="flex flex-col items-center justify-between gap-4 border-t border-outline-variant/20 pt-8 md:flex-row">
                            <p className="font-body-sm text-label-sm text-on-surface-variant">
                                © 2026 KOPERA-PLUS. Seluruh hak cipta
                                dilindungi.
                            </p>

                            <div className="flex items-center gap-6">
                                {[
                                    'Kebijakan Privasi',
                                    'Syarat & Ketentuan',
                                ].map((link) => (
                                    <a
                                        key={link}
                                        href="#"
                                        className="font-label-sm text-label-sm font-semibold text-on-surface-variant transition-colors hover:text-primary"
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
