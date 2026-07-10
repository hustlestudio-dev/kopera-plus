import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import PrototypeHud from '@/components/PrototypeHud';

export default function Welcome() {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

        const nav = document.querySelector('nav');
        const handleScroll = () => {
            if (window.scrollY > 50) {
                if (nav) {
                    nav.classList.add('shadow-md');
                    nav.style.height = '72px';
                }
            } else {
                if (nav) {
                    nav.classList.remove('shadow-md');
                    nav.style.height = '80px';
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Head>
                <title>KOPERA-PLUS | Empowering Cooperative Growth with AI</title>
                <meta
                    name="description"
                    content="KOPERA-PLUS leverages AI to help people discover, join, and participate in cooperatives transparently."
                />
            </Head>

            <div className="bg-background text-on-background font-body-md overflow-x-hidden min-h-screen">
                <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm h-20 px-margin-mobile md:px-margin-desktop transition-all duration-300">
                    <div className="flex justify-between items-center h-full max-w-container-max mx-auto">
                        <div className="flex items-center gap-2">
                            <img
                                alt="KOPERA-PLUS Logo"
                                className="h-10 w-10 object-contain"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAAghwedj2tFNxqbbxH59PE6WsqXRMnNOvO-1fU9_JYGL_tDKuMfiFAyBrnSX0s-84WuLeYdPFkogH9RbWFU42dUrKL76LCivu8XBv6HzjZZ_56LE5IKKS7meGN4e28A6m_SGP54_TPldxBnQp-jJz5k1RDnwMJrbnvAMUehfJYSqmAa0Q7hsRdVsCbdU19LKKRSX5SrHaP82u2VIOPIFoZQx-LJkTU13JVGGtPpmVIfOF6wVGO80vHTlrufJdLrRAOcemvjBlbEA"
                            />
                            <span className="font-headline-sm text-headline-sm font-extrabold tracking-tight text-on-surface">KOPERA-PLUS</span>
                        </div>
                        <div className="hidden lg:flex items-center gap-8">
                            <a className="text-primary font-bold border-b-2 border-primary pb-1 font-label-md text-label-md" href="#">
                                Home
                            </a>
                            <a className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md" href="#features">
                                Features
                            </a>
                            <a className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md" href="#solutions">
                                Solutions
                            </a>
                            <a className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md" href="#journey">
                                Journey
                            </a>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/login" className="hidden md:block text-on-surface font-label-md text-label-md hover:bg-surface-container-low px-4 py-2 rounded-lg transition-all duration-200">
                                Login
                            </Link>
                            <Link href="/onboarding" className="bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded-lg hover:shadow-lg active:scale-95 transition-all duration-200">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </nav>

                <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-margin-mobile md:px-margin-desktop overflow-hidden">
                    <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="animate-fadeInUp">
                            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-6 leading-tight">
                                Empowering Cooperative Growth with <span className="text-primary">Artificial Intelligence</span>
                            </h1>
                            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl">
                                Helping people discover cooperatives, become members, purchase products, earn rewards, and participate transparently through AI.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/onboarding" className="bg-primary text-on-primary font-label-md text-label-md px-8 py-4 rounded-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center">
                                    Get Started
                                </Link>
                                <button className="flex items-center justify-center gap-2 border border-outline text-on-surface font-label-md text-label-md px-8 py-4 rounded-lg hover:bg-surface-container transition-all active:scale-95">
                                    <span className="material-symbols-outlined">play_circle</span> Watch Demo
                                </button>
                            </div>
                        </div>
                        <div className="animate-fadeInUp delay-200">
                            <div className="glass-hero p-4 rounded-[32px] relative">
                                <div className="absolute -top-12 -right-12 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full -z-10"></div>
                                <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -z-10"></div>
                                <img
                                    className="w-full rounded-[24px] shadow-2xl"
                                    alt="AI brain illustration"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLVvwxD8icfCm6zxGJy-NDkvqTSwAP5c0Pxe7FjKC6--IWymB5Ve-Wxd14MFmV0iUGISMcZIyxmrAwFApdyuSDg_TiRfpxoFP81FYAYtkZbRCX5zG2dDBulKZI_ayH2i310LWIQui1CneQ1hcneWmZspuCuR1MWNkMhHHIXDUAeO4SZHuFvVL2KeWtcSYNSQ3zXZYHW9raRKfNiHWVEFrPgndIdkhAfuvb5xwmbltrv8SRRefr072O-cPO2Pcgh790hgnaEcwpSzQ"
                                />
                                <div className="absolute -bottom-6 -right-6 bg-surface-container-highest p-6 rounded-2xl shadow-xl border border-white/50 animate-bounce sm:animate-none" style={{ animationDuration: '3s' }}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                                            <span className="material-symbols-outlined">auto_awesome</span>
                                        </div>
                                        <div>
                                            <p className="text-label-sm font-label-sm text-on-surface-variant">AI Optimization</p>
                                            <p className="text-body-md font-bold text-primary">+42% Growth</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <section className="py-12 border-y border-outline-variant/20 bg-surface-container-low">
                    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
                        <p className="text-label-sm font-label-sm text-outline mb-10 tracking-[0.2em] uppercase">Trusted by</p>
                        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-4xl">corporate_fare</span>
                                <span className="font-headline-sm text-on-surface-variant">Cooperatives</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-4xl">groups</span>
                                <span className="font-headline-sm text-on-surface-variant">Communities</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-4xl">store</span>
                                <span className="font-headline-sm text-on-surface-variant">Local Businesses</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-4xl">public</span>
                                <span className="font-headline-sm text-on-surface-variant">Global Orgs</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-section-padding px-margin-mobile md:px-margin-desktop">
                    <div className="max-w-container-max mx-auto grid grid-cols-2 lg:grid-cols-4 gap-gutter">
                        <div className="reveal bg-surface p-8 rounded-3xl shadow-sm border border-outline-variant/30 text-center hover:scale-[1.02] transition-transform duration-300">
                            <h3 className="font-display-lg text-primary text-display-lg mb-2">12K+</h3>
                            <p className="font-label-md text-on-surface-variant">Active Members</p>
                        </div>
                        <div className="reveal bg-surface p-8 rounded-3xl shadow-sm border border-outline-variant/30 text-center hover:scale-[1.02] transition-transform duration-300 delay-100">
                            <h3 className="font-display-lg text-secondary text-display-lg mb-2">250+</h3>
                            <p className="font-label-md text-on-surface-variant">Cooperatives</p>
                        </div>
                        <div className="reveal bg-surface p-8 rounded-3xl shadow-sm border border-outline-variant/30 text-center hover:scale-[1.02] transition-transform duration-300 delay-200">
                            <h3 className="font-display-lg text-primary text-display-lg mb-2">95%</h3>
                            <p className="font-label-md text-on-surface-variant">Satisfaction</p>
                        </div>
                        <div className="reveal bg-surface p-8 rounded-3xl shadow-sm border border-outline-variant/30 text-center hover:scale-[1.02] transition-transform duration-300 delay-300">
                            <h3 className="font-display-lg text-secondary text-display-lg mb-2">85%</h3>
                            <p className="font-label-md text-on-surface-variant">Active Participation</p>
                        </div>
                    </div>
                </section>

                <section id="features" className="py-section-padding bg-surface-container-low px-margin-mobile md:px-margin-desktop overflow-hidden">
                    <div className="max-w-container-max mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Why are people losing interest in cooperatives?</h2>
                            <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto">Traditional cooperative models face digital barriers that prevent meaningful engagement in the modern era.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
                            <div className="reveal bg-surface p-8 rounded-3xl border border-outline-variant/30 hover:border-error transition-all duration-300 group">
                                <div className="w-12 h-12 rounded-xl bg-error-container/20 flex items-center justify-center text-error mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined">person_off</span>
                                </div>
                                <h4 className="font-headline-sm text-headline-sm text-on-surface mb-3">Low Engagement</h4>
                                <p className="font-body-sm text-on-surface-variant">Passive members often lose interest without interactive digital tools to keep them connected.</p>
                            </div>
                            <div className="reveal bg-surface p-8 rounded-3xl border border-outline-variant/30 hover:border-primary transition-all duration-300 group delay-100">
                                <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined">visibility_off</span>
                                </div>
                                <h4 className="font-headline-sm text-headline-sm text-on-surface mb-3">Lack of Transparency</h4>
                                <p className="font-body-sm text-on-surface-variant">Opaque financial and decision-making processes create distrust among community members.</p>
                            </div>
                            <div className="reveal bg-surface p-8 rounded-3xl border border-outline-variant/30 hover:border-secondary transition-all duration-300 group delay-200">
                                <div className="w-12 h-12 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined">account_tree</span>
                                </div>
                                <h4 className="font-headline-sm text-headline-sm text-on-surface mb-3">Complex Services</h4>
                                <p className="font-body-sm text-on-surface-variant">Navigating bureaucratic systems and legacy processes is frustrating for new users.</p>
                            </div>
                            <div className="reveal bg-surface p-8 rounded-3xl border border-outline-variant/30 hover:border-tertiary transition-all duration-300 group delay-300">
                                <div className="w-12 h-12 rounded-xl bg-tertiary-container/20 flex items-center justify-center text-tertiary mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined">no_meals</span>
                                </div>
                                <h4 className="font-headline-sm text-headline-sm text-on-surface mb-3">Limited Digital Access</h4>
                                <p className="font-body-sm text-on-surface-variant">Outdated platforms fail to meet the "mobile-first" expectations of today's workforce.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="solutions" className="py-section-padding px-margin-mobile md:px-margin-desktop">
                    <div className="max-w-container-max mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">The Intelligent Solution</h2>
                            <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto">We bridge the gap between traditional cooperation and modern AI technology.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter h-auto lg:h-[600px]">
                            <div className="reveal md:col-span-8 bg-surface border border-outline-variant/30 rounded-[32px] overflow-hidden p-8 flex flex-col md:flex-row gap-8 hover:shadow-lg transition-all duration-300">
                                <div className="flex-1 flex flex-col justify-center">
                                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-label-sm font-label-sm mb-4 w-fit">Featured AI</span>
                                    <h3 className="font-headline-md text-headline-md text-on-surface mb-4">AI Member Assistant</h3>
                                    <p className="font-body-md text-on-surface-variant mb-6">Personalized guidance for every step of the membership journey. Our AI helps discover the right cooperatives based on interests and needs.</p>
                                    <ul className="space-y-3">
                                        <li className="flex items-center gap-2 text-on-surface-variant font-label-md">
                                            <span className="material-symbols-outlined text-primary">check_circle</span> 24/7 Intelligent Support
                                        </li>
                                        <li className="flex items-center gap-2 text-on-surface-variant font-label-md">
                                            <span className="material-symbols-outlined text-primary">check_circle</span> Automated Documentation
                                        </li>
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
                            <div className="reveal md:col-span-4 bg-secondary-container text-on-secondary-container rounded-[32px] overflow-hidden p-8 flex flex-col hover:shadow-lg transition-all duration-300 delay-100">
                                <div className="mb-8">
                                    <h3 className="font-headline-sm text-headline-sm mb-4">Gamification & Rewards</h3>
                                    <p className="font-body-sm opacity-90">Earn tokens and reputation by actively participating in governance and community events.</p>
                                </div>
                                <div className="mt-auto relative">
                                    <div className="flex justify-center -space-x-4 mb-4">
                                        <div className="w-12 h-12 rounded-full border-4 border-secondary-container bg-surface flex items-center justify-center">
                                            <span className="material-symbols-outlined text-secondary">workspace_premium</span>
                                        </div>
                                        <div className="w-12 h-12 rounded-full border-4 border-secondary-container bg-surface flex items-center justify-center">
                                            <span className="material-symbols-outlined text-secondary">volunteer_activism</span>
                                        </div>
                                        <div className="w-12 h-12 rounded-full border-4 border-secondary-container bg-surface flex items-center justify-center">
                                            <span className="material-symbols-outlined text-secondary">token</span>
                                        </div>
                                    </div>
                                    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30 text-center">
                                        <p className="text-label-md font-bold">New Level Reached!</p>
                                        <p className="text-[10px] opacity-80">Ambassador Status Unlocked</p>
                                    </div>
                                </div>
                            </div>
                            <div className="reveal md:col-span-12 bg-surface border border-outline-variant/30 rounded-[32px] overflow-hidden p-8 flex flex-col lg:flex-row items-center gap-12 hover:shadow-lg transition-all duration-300 delay-200">
                                <div className="lg:w-1/2">
                                    <img
                                        className="w-full rounded-2xl shadow-xl"
                                        alt="Governance Dashboard Visual"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCjxbkZSO_AzD9j-VHEQpbxCWmVft8XvRkA3wG1USHGJuBDXvicYL541_SYTmg2tbKuDTkQY0qudlX5wrl_7dehnv5hadhSymSo0h4UmUaUHdsmpxjXQxIE9Zl37DtUFxflxQxmfATDdpXNN2xG0d9OK-w8JiqHKZSTttB3yV6uuWWCt0nAhMKdwpfxw_KIJGH3FZFvpWSjbA4jfqTBCtoPENUFjdIg01FVbzw4QOVdRtrgZaAXRCthXWmPvUxigWjHbYXm69xaME"
                                    />
                                </div>
                                <div className="lg:w-1/2">
                                    <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Smart Governance Dashboard</h3>
                                    <p className="font-body-md text-on-surface-variant mb-6">Experience true transparency with our blockchain-backed governance engine. Vote on proposals and track fund allocation in real-time with AI-summarized reports.</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl bg-surface-container">
                                            <p className="text-headline-sm text-primary">0%</p>
                                            <p className="text-label-sm text-on-surface-variant">Hidden Fees</p>
                                        </div>
                                        <div className="p-4 rounded-xl bg-surface-container">
                                            <p className="text-headline-sm text-secondary">100%</p>
                                            <p className="text-label-sm text-on-surface-variant">Auditability</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="journey" className="py-section-padding bg-surface px-margin-mobile md:px-margin-desktop overflow-x-hidden">
                    <div className="max-w-container-max mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Your Journey to Empowerment</h2>
                            <p className="font-body-md text-on-surface-variant">The path from discovery to becoming a key cooperative contributor.</p>
                        </div>
                        <div className="relative">
                            <div className="hidden lg:block absolute top-6 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-secondary to-primary/20"></div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-8 relative z-10">
                                <div className="reveal flex flex-col items-center group">
                                    <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg relative z-20">
                                        <span className="material-symbols-outlined">explore</span>
                                    </div>
                                    <p className="font-label-md text-on-surface mb-1">Discover</p>
                                    <p className="text-[10px] text-on-surface-variant text-center opacity-70">AI-curated matches</p>
                                </div>
                                <div className="reveal flex flex-col items-center group delay-100">
                                    <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg relative z-20">
                                        <span className="material-symbols-outlined">person_add</span>
                                    </div>
                                    <p className="font-label-md text-on-surface mb-1">Join</p>
                                    <p className="text-[10px] text-on-surface-variant text-center opacity-70">Digital Onboarding</p>
                                </div>
                                <div className="reveal flex flex-col items-center group delay-200">
                                    <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg relative z-20">
                                        <span className="material-symbols-outlined">shopping_cart</span>
                                    </div>
                                    <p className="font-label-md text-on-surface mb-1">Buy</p>
                                    <p className="text-[10px] text-on-surface-variant text-center opacity-70">Support Locals</p>
                                </div>
                                <div className="reveal flex flex-col items-center group delay-300">
                                    <div className="w-12 h-12 rounded-full bg-secondary text-on-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg relative z-20">
                                        <span className="material-symbols-outlined">loyalty</span>
                                    </div>
                                    <p className="font-label-md text-on-surface mb-1">Earn</p>
                                    <p className="text-[10px] text-on-surface-variant text-center opacity-70">Yield & Rewards</p>
                                </div>
                                <div className="reveal flex flex-col items-center group delay-100 lg:delay-300">
                                    <div className="w-12 h-12 rounded-full bg-secondary text-on-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg relative z-20">
                                        <span className="material-symbols-outlined">token</span>
                                    </div>
                                    <p className="font-label-md text-on-surface mb-1">Digital RAT</p>
                                    <p className="text-[10px] text-on-surface-variant text-center opacity-70">Tokenized Equity</p>
                                </div>
                                <div className="reveal flex flex-col items-center group delay-200 lg:delay-300">
                                    <div className="w-12 h-12 rounded-full bg-secondary text-on-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg relative z-20">
                                        <span className="material-symbols-outlined">how_to_vote</span>
                                    </div>
                                    <p className="font-label-md text-on-surface mb-1">Governance</p>
                                    <p className="text-[10px] text-on-surface-variant text-center opacity-70">Active Voice</p>
                                </div>
                                <div className="reveal flex flex-col items-center group delay-300 lg:delay-300">
                                    <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg relative z-20">
                                        <span className="material-symbols-outlined">grade</span>
                                    </div>
                                    <p className="font-label-md text-on-surface mb-1">Active Member</p>
                                    <p className="text-[10px] text-on-surface-variant text-center opacity-70">Community Leader</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 px-margin-mobile md:px-margin-desktop">
                    <div className="max-w-container-max mx-auto">
                        <div className="bg-primary rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                                <div className="absolute top-0 left-0 w-64 h-64 bg-white blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                                <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary blur-3xl rounded-full translate-x-1/4 translate-y-1/4"></div>
                            </div>
                            <h2 className="font-display-lg-mobile md:font-display-lg text-on-primary text-display-lg mb-8 relative z-10">Ready to experience the future of cooperatives?</h2>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                                <Link href="/onboarding" className="bg-white text-primary font-headline-sm px-10 py-5 rounded-2xl hover:bg-surface-container transition-all shadow-2xl active:scale-95 flex items-center justify-center font-bold">
                                    Get Started
                                </Link>
                            </div>
                            <p className="mt-8 text-on-primary/60 font-body-sm relative z-10">Join 12,000+ members building a fairer digital economy.</p>
                        </div>
                    </div>
                </section>

                <footer className="bg-surface dark:bg-surface-container-lowest border-t border-outline-variant/20 w-full py-section-padding">
                    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-gutter mb-16">
                            <div className="col-span-2">
                                <div className="flex items-center gap-2 mb-6">
                                    <img
                                        alt="KOPERA-PLUS Logo"
                                        className="h-8 w-8 object-contain"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAAghwedj2tFNxqbbxH59PE6WsqXRMnNOvO-1fU9_JYGL_tDKuMfiFAyBrnSX0s-84WuLeYdPFkogH9RbWFU42dUrKL76LCivu8XBv6HzjZZ_56LE5IKKS7meGN4e28A6m_SGP54_TPldxBnQp-jJz5k1RDnwMJrbnvAMUehfJYSqmAa0Q7hsRdVsCbdU19LKKRSX5SrHaP82u2VIOPIFoZQx-LJkTU13JVGGtPpmVIfOF6wVGO80vHTlrufJdLrRAOcemvjBlbEA"
                                    />
                                    <span className="font-headline-sm text-headline-sm font-bold text-on-surface">KOPERA-PLUS</span>
                                </div>
                                <p className="font-body-sm text-on-surface-variant max-w-xs mb-8">
                                    The world's first AI-powered infrastructure for cooperative growth and transparent community participation.
                                </p>
                            </div>
                            <div>
                                <h5 className="font-label-md text-on-surface mb-6">Product</h5>
                                <ul className="space-y-4">
                                    <li><a className="font-body-sm text-on-surface-variant hover:text-on-surface hover:underline decoration-primary/30 transition-colors" href="#">AI Assistant</a></li>
                                    <li><a className="font-body-sm text-on-surface-variant hover:text-on-surface hover:underline decoration-primary/30 transition-colors" href="#">Governance</a></li>
                                    <li><a className="font-body-sm text-on-surface-variant hover:text-on-surface hover:underline decoration-primary/30 transition-colors" href="#">Rewards</a></li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="font-label-md text-on-surface mb-6">Company</h5>
                                <ul className="space-y-4">
                                    <li><a className="font-body-sm text-on-surface-variant hover:text-on-surface hover:underline decoration-primary/30 transition-colors" href="#">About</a></li>
                                    <li><a className="font-body-sm text-on-surface-variant hover:text-on-surface hover:underline decoration-primary/30 transition-colors" href="#">Careers</a></li>
                                    <li><a className="font-body-sm text-on-surface-variant hover:text-on-surface hover:underline decoration-primary/30 transition-colors" href="#">Contact</a></li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="font-label-md text-on-surface mb-6">Resources</h5>
                                <ul className="space-y-4">
                                    <li><a className="font-body-sm text-on-surface-variant hover:text-on-surface hover:underline decoration-primary/30 transition-colors" href="#">Documentation</a></li>
                                    <li><a className="font-body-sm text-on-surface-variant hover:text-on-surface hover:underline decoration-primary/30 transition-colors" href="#">Blog</a></li>
                                    <li><a className="font-body-sm text-on-surface-variant hover:text-on-surface hover:underline decoration-primary/30 transition-colors" href="#">Support</a></li>
                                </ul>
                            </div>
                            <div>
                                <h5 className="font-label-md text-on-surface mb-6">Legal</h5>
                                <ul className="space-y-4">
                                    <li><a className="font-body-sm text-on-surface-variant hover:text-on-surface hover:underline decoration-primary/30 transition-colors" href="#">Privacy Policy</a></li>
                                    <li><a className="font-body-sm text-on-surface-variant hover:text-on-surface hover:underline decoration-primary/30 transition-colors" href="#">Terms</a></li>
                                    <li><a className="font-body-sm text-on-surface-variant hover:text-on-surface hover:underline decoration-primary/30 transition-colors" href="#">Security</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="font-body-sm text-label-sm text-on-surface-variant">© 2024 KOPERA-PLUS. All rights reserved.</p>
                            <div className="flex items-center gap-6">
                                <a className="text-on-surface-variant hover:text-primary font-semibold font-label-sm text-label-sm" href="#">
                                    Privacy Policy
                                </a>
                                <a className="text-on-surface-variant hover:text-primary font-semibold font-label-sm text-label-sm" href="#">
                                    Terms
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

            <PrototypeHud />
        </>
    );
}
