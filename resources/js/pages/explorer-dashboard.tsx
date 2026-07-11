import { Head, Link } from '@inertiajs/react';
import {
    Search,
    Bell,
    LayoutDashboard,
    Store,
    Brain,
    HelpCircle,
    ArrowRight,
    CheckCircle2,
    ShieldCheck,
    LogOut,
} from 'lucide-react';
import React, { useState } from 'react';
import { usePermissions } from '@/lib/permissions';

interface CooperativeItem {
    koperasi_ref: string;
    nama_koperasi: string | null;
    status_registrasi: string | null;
    bentuk_koperasi: string | null;
    kategori_usaha: string | null;
    koordinat_dibulatkan: string | null;
    koperasiWilayah?: {
        kode_wilayah: string;
        wilayah?: {
            provinsi?: string;
            kab_kota?: string;
            kecamatan?: string;
            desa_kelurahan?: string;
        };
    };
}

interface ProductItem {
    produk_sample_id: string;
    koperasi_ref: string;
    kode_barcode: string | null;
    nama_produk: string | null;
    unit: string | null;
    koperasi?: { nama_koperasi: string | null };
    inventaris_sum_stok: number | null;
}

interface Paginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface ExplorerDashboardProps {
    cooperatives: Paginated<CooperativeItem>;
    products: Paginated<ProductItem>;
}

function hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function gradientFromId(id: string): string {
    const h = hashCode(id) % 360;
    return `hsl(${h}, 60%, 55%)`;
}

function gradientLightFromId(id: string): string {
    const h = hashCode(id) % 360;
    return `hsl(${h}, 50%, 92%)`;
}

export default function ExplorerDashboard({ cooperatives, products }: ExplorerDashboardProps) {
    const [input, setInput] = useState('');
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const { canAccess } = usePermissions();

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 3000);
    };

    const handleAISearch = () => {
        if (!input.trim()) {
            return;
        }
        showToast(`Pencarian AI: "${input}"`);
        setInput('');
    };

    return (
        <>
            <Head title="Jelajahi Koperasi | KOPERA-PLUS" />

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
                        {[
                            {
                                href: '/explorer-dashboard',
                                label: 'Dashboard',
                                icon: (
                                    <LayoutDashboard className="h-4 w-4 text-primary" />
                                ),
                                active: true,
                            },
                            {
                                href: '/workspace',
                                label: 'Jelajahi Koperasi',
                                icon: (
                                    <span className="material-symbols-outlined text-zinc-400">
                                        groups
                                    </span>
                                ),
                            },
                            {
                                href: '/assistant',
                                label: 'Marketplace',
                                icon: (
                                    <Store className="h-4 w-4 text-zinc-400" />
                                ),
                            },
                        ]
                            .filter((item) => canAccess(item.href))
                            .map((item) => (
                                <Link
                                    key={item.label}
                                    className={
                                        'mx-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ' +
                                        (item.active
                                            ? 'bg-primary/5 text-primary'
                                            : 'text-zinc-600 hover:bg-slate-50')
                                    }
                                    href={item.href}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                    </nav>

                    <div className="mt-auto px-4 pb-4">
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-600 transition-colors hover:bg-slate-50"
                        >
                            <LogOut className="h-4 w-4 text-zinc-400" />
                            <span>Keluar</span>
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
                                    placeholder="Cari koperasi, produk, atau tanya AI..."
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="ml-6 flex items-center gap-6 text-sm">
                            <Link
                                className="font-bold text-primary hover:underline"
                                href="/onboarding"
                            >
                                Gabung Komunitas
                            </Link>
                            <div className="flex items-center gap-3 border-l border-zinc-200 pl-6">
                                <button className="rounded-full p-2 text-zinc-600 hover:bg-slate-100">
                                    <Bell className="h-5 w-5" />
                                </button>
                                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-zinc-300 bg-slate-200 text-sm font-bold text-zinc-500">
                                    E
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
                                    Selamat Datang di KOPERA AI
                                </h2>
                                <p className="mb-10 text-sm opacity-90">
                                    Temukan koperasi modern berbasis Kecerdasan
                                    Buatan.
                                </p>
                                <div className="mb-8 flex flex-col gap-3 md:flex-row">
                                    <div className="relative flex-1">
                                        <Brain className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 animate-pulse text-blue-400" />
                                        <input
                                            className="w-full rounded-2xl border border-white/20 bg-white/10 py-4 pr-4 pl-12 text-sm text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-500/30 focus:outline-none"
                                            placeholder="Tanya AI: 'Cari koperasi pertanian di sekitar saya'"
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
                                        <span>Cari AI</span>
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2.5">
                                    {[
                                        'Cari Koperasi',
                                        'Lihat Produk',
                                        'Tanya AI',
                                        'Ikuti Acara',
                                    ].map((chip, cIdx) => (
                                        <button
                                            key={cIdx}
                                            onClick={() =>
                                                showToast(
                                                    `Membuka kategori: "${chip}"`,
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
                                            Rekomendasi AI
                                        </h3>
                                    </div>
                                    <div className="mb-4 rounded-xl border border-blue-100 bg-blue-50 p-4 text-xs leading-relaxed font-semibold text-blue-900">
                                        Berdasarkan minat Anda, berikut koperasi
                                        unggulan yang layak dijelajahi.
                                    </div>
                                    <div className="mb-6 space-y-3 text-xs text-zinc-500">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">
                                                location_on
                                            </span>
                                            <span>
                                                Berdasarkan lokasi Anda
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">
                                                agriculture
                                            </span>
                                            <span>Kategori usaha lokal</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm">
                                                star
                                            </span>
                                            <span>
                                                Koperasi dengan status aktif
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="hover:bg-opacity-95 w-full rounded-xl bg-blue-600 py-3 font-label-md text-xs font-bold text-white shadow-md shadow-blue-500/10 transition-colors"
                                    onClick={() =>
                                        showToast(
                                            'Membuka detail koperasi rekomendasi...',
                                        )
                                    }
                                >
                                    Lihat Detail
                                </button>
                            </div>

                            {/* Featured Cooperatives */}
                            <div className="flex flex-col lg:col-span-2">
                                <div className="mb-4 flex items-center justify-between px-2">
                                    <h3 className="font-headline-sm text-base font-bold text-zinc-950">
                                        Koperasi Unggulan
                                    </h3>
                                    <button
                                        className="text-xs font-bold text-primary hover:underline"
                                        onClick={() =>
                                            showToast(
                                                'Memuat semua koperasi...',
                                            )
                                        }
                                    >
                                        Lihat Semua
                                    </button>
                                </div>
                                {cooperatives.data.length === 0 ? (
                                    <div className="flex items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-12 text-center">
                                        <p className="text-sm text-zinc-400">
                                            Belum ada data koperasi tersedia
                                        </p>
                                    </div>
                                ) : (
                                    <div className="custom-scrollbar flex gap-4 overflow-x-auto scroll-smooth pb-4">
                                        {cooperatives.data.map((coop) => (
                                            <div
                                                key={coop.koperasi_ref}
                                                className="bento-card flex w-[280px] min-w-[280px] shrink-0 flex-col overflow-hidden border border-zinc-200/50 shadow-sm"
                                            >
                                                <div
                                                    className="relative flex h-32 w-full items-center justify-center"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${gradientFromId(coop.koperasi_ref)}, ${gradientLightFromId(coop.koperasi_ref)})`,
                                                    }}
                                                >
                                                    <span className="text-4xl font-black text-white/80">
                                                        {(coop.nama_koperasi ?? '?')
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="flex flex-1 flex-col justify-between p-4">
                                                    <div className="mb-2 flex items-start justify-between">
                                                        <div
                                                            className="relative z-10 -mt-8 flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm text-sm font-bold"
                                                            style={{
                                                                color: gradientFromId(
                                                                    coop.koperasi_ref,
                                                                ),
                                                            }}
                                                        >
                                                            {(coop.nama_koperasi ?? '?')
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </div>
                                                        {coop.status_registrasi === 'AKTIF' && (
                                                            <span className="flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[9px] font-extrabold text-emerald-700 uppercase">
                                                                Aktif
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h4 className="mb-1 font-headline-sm text-xs font-bold text-zinc-950">
                                                        {coop.nama_koperasi ?? 'Tanpa Nama'}
                                                    </h4>
                                                    <div className="space-y-0.5 text-[10px] text-zinc-400">
                                                        {coop.bentuk_koperasi && (
                                                            <div>{coop.bentuk_koperasi}</div>
                                                        )}
                                                        {coop.kategori_usaha && (
                                                            <div>{coop.kategori_usaha}</div>
                                                        )}
                                                        {coop.koperasiWilayah?.wilayah && (
                                                            <div>
                                                                {coop.koperasiWilayah.wilayah.kab_kota}
                                                                {coop.koperasiWilayah.wilayah.provinsi &&
                                                                    `, ${coop.koperasiWilayah.wilayah.provinsi}`}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Popular Products Section */}
                        <section className="mb-12">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="font-headline-md text-lg font-bold">
                                    Produk Populer
                                </h3>
                                {canAccess('/assistant') && (
                                    <Link
                                        className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                                        href="/assistant"
                                    >
                                        Jelajahi Marketplace
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                )}
                            </div>
                            {products.data.length === 0 ? (
                                <div className="flex items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-12 text-center">
                                    <p className="text-sm text-zinc-400">
                                        Belum ada data produk tersedia
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                    {products.data.map((prod) => {
                                        const isLowStock =
                                            prod.inventaris_sum_stok !== null &&
                                            prod.inventaris_sum_stok <= 10;
                                        return (
                                            <div
                                                key={prod.produk_sample_id}
                                                className="bento-card group flex flex-col overflow-hidden border border-zinc-200/50 shadow-sm"
                                            >
                                                <div
                                                    className="relative flex h-48 w-full items-center justify-center overflow-hidden"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${gradientFromId(prod.produk_sample_id)}, ${gradientLightFromId(prod.produk_sample_id)})`,
                                                    }}
                                                >
                                                    <span className="text-3xl font-black text-white/70">
                                                        {(prod.nama_produk ?? '?')
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </span>
                                                    <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-extrabold tracking-wider shadow-sm backdrop-blur">
                                                        <span
                                                            className={`h-1.5 w-1.5 rounded-full ${isLowStock ? 'bg-red-500' : 'animate-pulse bg-green-500'}`}
                                                        ></span>
                                                        {prod.inventaris_sum_stok !== null
                                                            ? `Stok: ${prod.inventaris_sum_stok} ${prod.unit ?? ''}`
                                                            : 'Tersedia'}
                                                    </div>
                                                </div>
                                                <div className="flex flex-grow flex-col justify-between p-5">
                                                    <div className="mb-4">
                                                        <h4 className="mb-1 font-headline-sm text-xs font-bold text-zinc-950">
                                                            {prod.nama_produk ?? 'Tanpa Nama'}
                                                        </h4>
                                                        <p className="text-[10px] font-semibold text-zinc-400">
                                                            {prod.koperasi?.nama_koperasi ?? 'Koperasi'}
                                                        </p>
                                                    </div>
                                                    <div className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-3">
                                                        <span className="text-[10px] font-bold text-zinc-500">
                                                            {isLowStock
                                                                ? 'Stok Rendah'
                                                                : 'Tersedia'}
                                                        </span>
                                                        <div className="flex gap-2">
                                                            {canAccess(
                                                                '/assistant',
                                                            ) && (
                                                                <Link
                                                                    href="/assistant"
                                                                    className="rounded-lg border border-blue-500/30 p-1.5 text-blue-600 transition-colors hover:bg-blue-50/50"
                                                                    title="Tanya AI tentang produk ini"
                                                                >
                                                                    <Brain className="h-3.5 w-3.5" />
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </section>

                        {/* Learning Center */}
                        <section className="mb-12">
                            <h3 className="mb-6 font-headline-md text-lg font-bold">
                                Pusat Pembelajaran
                            </h3>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                <div
                                    className="bento-card flex cursor-pointer flex-col justify-between border border-zinc-200/50 p-6 shadow-sm transition-transform duration-300 hover:scale-[1.02]"
                                    onClick={() =>
                                        showToast(
                                            'Membuka Modul: Apa itu Koperasi?',
                                        )
                                    }
                                >
                                    <div className="mb-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                        <HelpCircle className="h-6 w-6" />
                                    </div>
                                    <h4 className="mb-2 font-headline-sm text-sm font-bold text-zinc-950">
                                        Apa itu Koperasi?
                                    </h4>
                                    <p className="mb-6 text-xs leading-relaxed text-zinc-500">
                                        Pelajari prinsip dasar bisnis
                                        berbasis komunitas dan pertumbuhan
                                        koperasi.
                                    </p>
                                    <span className="mt-auto flex items-center gap-1.5 text-xs font-bold text-primary">
                                        Baca Modul{' '}
                                        <ArrowRight className="h-3 w-3" />
                                    </span>
                                </div>
                                <div
                                    className="bento-card flex cursor-pointer flex-col justify-between border border-zinc-200/50 p-6 shadow-sm transition-transform duration-300 hover:scale-[1.02]"
                                    onClick={() =>
                                        showToast(
                                            'Membuka Modul: Manfaat Menjadi Anggota',
                                        )
                                    }
                                >
                                    <div className="mb-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                                        <span className="material-symbols-outlined">
                                            card_membership
                                        </span>
                                    </div>
                                    <h4 className="mb-2 font-headline-sm text-sm font-bold text-zinc-950">
                                        Manfaat Menjadi Anggota
                                    </h4>
                                    <p className="mb-6 text-xs leading-relaxed text-zinc-500">
                                        Temukan hak istimewa keanggotaan
                                        koperasi, dari pembagian SHU hingga
                                        daya beli bersama.
                                    </p>
                                    <span className="mt-auto flex items-center gap-1.5 text-xs font-bold text-primary">
                                        Baca Modul{' '}
                                        <ArrowRight className="h-3 w-3" />
                                    </span>
                                </div>
                                <div
                                    className="bento-card flex cursor-pointer flex-col justify-between border border-zinc-200/50 p-6 shadow-sm transition-transform duration-300 hover:scale-[1.02]"
                                    onClick={() =>
                                        showToast(
                                            'Membuka Modul: Literasi Keuangan',
                                        )
                                    }
                                >
                                    <div className="mb-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                        <span className="material-symbols-outlined">
                                            payments
                                        </span>
                                    </div>
                                    <h4 className="mb-2 font-headline-sm text-sm font-bold text-zinc-950">
                                        Literasi Keuangan
                                    </h4>
                                    <p className="mb-6 text-xs leading-relaxed text-zinc-500">
                                        Kuasai keuangan pribadi dengan kursus
                                        khusus yang disesuaikan untuk lingkungan
                                        koperasi.
                                    </p>
                                    <span className="mt-auto flex items-center gap-1.5 text-xs font-bold text-primary">
                                        Baca Modul{' '}
                                        <ArrowRight className="h-3 w-3" />
                                    </span>
                                </div>
                            </div>
                        </section>

                        {/* Success Stories */}
                        <section className="mb-12">
                            <div className="bento-card grid grid-cols-1 overflow-hidden border border-zinc-200/50 shadow-sm lg:grid-cols-2">
                                <div className="flex h-64 min-h-[300px] items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/15 to-tertiary/20 lg:h-full">
                                    <span className="material-symbols-outlined text-[80px] text-primary/30">
                                        format_quote
                                    </span>
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
                                        <span>Sorotan Anggota</span>
                                    </div>
                                    <h3 className="font-display-sm mb-6 text-2xl leading-tight font-bold">
                                        "Bergabung dengan KOPERA-PLUS
                                        mengubah kerajinan lokal saya
                                        menjadi bisnis berkelanjutan
                                        dengan jangkauan global."
                                    </h3>
                                    <p className="mb-8 text-xs font-semibold text-zinc-500">
                                        Sarah Wijaya, Pendiri Batik Modern
                                        Collective
                                    </p>
                                    <div className="flex items-center gap-8">
                                        <div>
                                            <div className="text-2xl font-black text-primary">
                                                200%
                                            </div>
                                            <div className="mt-1 text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                                                Pertumbuhan Pendapatan
                                            </div>
                                        </div>
                                        <div className="h-10 w-px bg-zinc-200"></div>
                                        <div>
                                            <div className="text-2xl font-black text-primary">
                                                15+
                                            </div>
                                            <div className="mt-1 text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                                                Mitra Baru
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
                                            Siap membentuk masa depan
                                            bisnis komunitas?
                                        </h2>
                                        <p className="mb-8 text-sm leading-relaxed opacity-80">
                                            Bergabunglah bersama ribuan anggota
                                            yang sudah membangun masa depan
                                            ekonomi yang lebih baik bersama.
                                        </p>
                                        <Link
                                            href="/onboarding"
                                            className="block w-fit rounded-2xl bg-white px-10 py-5 text-center font-headline-sm text-sm font-extrabold text-primary shadow-xl transition-transform hover:scale-105 active:scale-95"
                                        >
                                            Menjadi Anggota
                                        </Link>
                                    </div>
                                    <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
                                        <h4 className="mb-6 text-sm font-bold tracking-wider text-white uppercase">
                                            Manfaat Keanggotaan
                                        </h4>
                                        <ul className="space-y-4 text-xs font-semibold">
                                            <li className="flex items-center gap-3">
                                                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
                                                <span>
                                                    Akses Penasihat AI
                                                    Personal
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
                                                <span>
                                                    Penawaran Eksklusif
                                                    Marketplace Anggota
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
                                                <span>
                                                    Hak Suara dalam
                                                    Keputusan Komunitas
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
                                                <span>
                                                    Pembagian SHU Tahunan
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
                                    © 2024 KOPERA-PLUS. Hak cipta dilindungi.
                                </span>
                            </div>
                            <div className="flex gap-6 text-zinc-500">
                                <a
                                    className="transition-colors hover:text-primary"
                                    href="#"
                                >
                                    Kebijakan Privasi
                                </a>
                                <a
                                    className="transition-colors hover:text-primary"
                                    href="#"
                                >
                                    Syarat Layanan
                                </a>
                                <a
                                    className="transition-colors hover:text-primary"
                                    href="#"
                                >
                                    Hubungi Kami
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
        </>
    );
}
