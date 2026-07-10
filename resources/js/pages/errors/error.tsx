import type { PageProps } from '@inertiajs/core';
import { Head, Link, router } from '@inertiajs/react';
import {
    AlertTriangle,
    Ban,
    Clock,
    Compass,
    KeyRound,
    ServerCrash,
    ShieldAlert,
    Timer,
    Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Tone = 'warn' | 'danger' | 'info';

type ErrorContent = {
    title: string;
    description: string;
    icon: LucideIcon;
    tone: Tone;
};

// Single source of friendly, non-alarming copy keyed by HTTP status.
const CONTENT: Record<number, ErrorContent> = {
    400: {
        title: 'Permintaan tidak dapat diproses',
        description:
            'Sebagian informasi yang dikirim tidak sesuai format. Periksa kembali lalu coba lagi.',
        icon: AlertTriangle,
        tone: 'warn',
    },
    401: {
        title: 'Kamu belum masuk',
        description:
            'Halaman ini hanya bisa diakses setelah masuk. Silakan login untuk melanjutkan.',
        icon: KeyRound,
        tone: 'info',
    },
    403: {
        title: 'Akses ditolak',
        description:
            'Kamu tidak memiliki izin untuk membuka halaman ini. Jika merasa ini salah, hubungi tim kami.',
        icon: ShieldAlert,
        tone: 'danger',
    },
    404: {
        title: 'Halaman tidak ditemukan',
        description:
            'Tautan yang kamu buka mungkin sudah dipindahkan atau belum tersedia. Coba cari dari beranda.',
        icon: Compass,
        tone: 'info',
    },
    405: {
        title: 'Aksi tidak diizinkan',
        description:
            'Metode yang digunakan untuk membuka halaman ini tidak didukung. Coba kembali ke halaman sebelumnya.',
        icon: Ban,
        tone: 'warn',
    },
    419: {
        title: 'Sesi telah berakhir',
        description:
            'Demi keamanan, sesi kamu telah berakhir. Muat ulang halaman ini untuk kembali melanjutkan.',
        icon: Clock,
        tone: 'warn',
    },
    429: {
        title: 'Terlalu banyak permintaan',
        description:
            'Kamu melakukan terlalu banyak permintaan dalam waktu singkat. Tarik napas sejenak, lalu coba lagi.',
        icon: Timer,
        tone: 'warn',
    },
    // Symfony coerces the non-standard 419 code to 409, so map it too.
    409: {
        title: 'Sesi telah berakhir',
        description:
            'Demi keamanan, sesi kamu telah berakhir. Muat ulang halaman ini untuk kembali melanjutkan.',
        icon: Clock,
        tone: 'warn',
    },
    500: {
        title: 'Ada gangguan di sistem',
        description:
            'Sistem sedang mengalami kendala sementara. Tim kami sudah mengetahuinya dan sedang menanganinya.',
        icon: ServerCrash,
        tone: 'danger',
    },
    503: {
        title: 'Sedang dalam pemeliharaan',
        description:
            'Kami sedang memperbarui sistem agar lebih baik untukmu. Silakan kembali beberapa saat lagi.',
        icon: Wrench,
        tone: 'info',
    },
};

// Tone → soft badge + accent color so the page feels calm, not alarming.
const TONE_STYLES: Record<Tone, { badge: string; accent: string }> = {
    warn: {
        badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20',
        accent: 'text-amber-600 dark:text-amber-400',
    },
    danger: {
        badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-rose-500/20',
        accent: 'text-rose-600 dark:text-rose-400',
    },
    info: {
        badge: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 ring-sky-500/20',
        accent: 'text-sky-600 dark:text-sky-400',
    },
};

type ErrorPageProps = PageProps & {
    status: number;
    message?: string;
};

export default function Error({ status }: ErrorPageProps) {
    const content = CONTENT[status] ?? CONTENT[500];
    const Icon = content.icon;
    const tone = TONE_STYLES[content.tone];
    const isSessionExpired = status === 419;

    return (
        <>
            <Head title={`${status} – ${content.title}`} />

            <div className="relative flex min-h-dvh flex-col items-center justify-center bg-gradient-to-b from-background to-muted/40 px-6 py-16">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,theme(colors.primary/8%),transparent)]" />

                <div className="relative w-full max-w-md">
                    <div className="mb-8 flex items-center justify-center gap-2 text-sm font-semibold tracking-tight">
                        <span className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                            <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
                        </span>
                        <span>KOPERA-PLUS</span>
                    </div>

                    <div className="rounded-2xl border bg-card p-8 text-center shadow-sm">
                        <div
                            className={cn(
                                'mx-auto mb-6 flex size-14 items-center justify-center rounded-full ring-1',
                                tone.badge,
                            )}
                        >
                            <Icon className="size-7" />
                        </div>

                        <p
                            className={cn(
                                'text-xs font-semibold tracking-widest uppercase',
                                tone.accent,
                            )}
                        >
                            Kode {status}
                        </p>

                        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
                            {content.title}
                        </h1>

                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            {content.description}
                        </p>

                        <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-center">
                            {isSessionExpired ? (
                                <Button onClick={() => router.reload()}>
                                    Muat ulang halaman
                                </Button>
                            ) : (
                                <Button onClick={() => window.history.back()}>
                                    Kembali
                                </Button>
                            )}

                            <Button variant="outline" asChild>
                                <Link href="/">Ke beranda</Link>
                            </Button>
                        </div>
                    </div>

                    <p className="mt-6 text-center text-xs text-muted-foreground">
                        Butuh bantuan? Tim kami siap membantu jika kendala
                        berlanjut.
                    </p>
                </div>
            </div>
        </>
    );
}
