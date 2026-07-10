import { Form, Head, Link } from '@inertiajs/react';
import React from 'react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import PrototypeHud from '@/components/PrototypeHud';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

type Props = {
    passwordRules: string;
    roles: { value: string; label: string }[];
};

const ROLE_COPY: Record<string, { title: string; description: string }> = {
    explorer: {
        title: 'Explorer Koperasi',
        description: 'Jelajahi koperasi, temukan produk lokal, dan jelajahi katalog anggota.',
    },
    member: {
        title: 'Anggota Koperasi',
        description: 'Akses layanan koperasi, asisten AI, poin & reward, belanja, dan RAT Digital.',
    },
    administrator: {
        title: 'Administrator',
        description: 'Kelola anggota, produk, inventaris, tata kelola, dan analitik koperasi.',
    },
};

export default function Register({ passwordRules, roles }: Props) {
    const [role, setRole] = useState<string>(roles[0]?.value ?? 'member');
    const activeCopy = ROLE_COPY[role];
    return (
        <>
            <Head title="Buat Akun | KOPERA-PLUS" />

            <main className="flex min-h-screen flex-col bg-background font-sans text-on-surface md:flex-row">
                {/* Left Side: Branding Panel (45%) */}
                <section className="relative flex min-h-[400px] w-full flex-col items-start justify-between overflow-hidden bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF] p-8 md:min-h-screen md:w-[45%] md:p-16">
                    {/* Brand Identity */}
                    <div className="animate-entrance z-10 w-full">
                        <Link
                            href="/"
                            className="group mb-12 flex items-center gap-2"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-105">
                                <span
                                    className="material-symbols-outlined"
                                    style={{
                                        fontVariationSettings: "'FILL' 1",
                                    }}
                                >
                                    hub
                                </span>
                            </div>
                            <span className="font-headline-lg text-headline-sm font-black tracking-tight text-primary">
                                KOPERA-PLUS
                            </span>
                        </Link>
                        <h1 className="text-display-sm mb-4 font-headline-lg leading-tight text-on-surface">
                            Selamat datang di{' '}
                            <span className="ai-gradient-text">KOPERA AI</span>
                        </h1>
                        <p className="max-w-md font-body-lg text-body-lg text-on-surface-variant">
                            Memberdayakan komunitas melalui pengalaman koperasi
                            yang cerdas.
                        </p>
                    </div>

                    {/* AI Illustration */}
                    <div className="animate-entrance z-10 flex w-full justify-center py-6 delay-100 md:py-12">
                        <div className="relative flex aspect-square w-full max-w-xs justify-center md:max-w-md">
                            <img
                                alt="KOPERA AI Illustration"
                                className="h-full w-full object-contain mix-blend-multiply drop-shadow-2xl"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuANFZUBvSPEBzuY_lnYbbAEvun86U4ANjFNJtwlF7_uAzdx9qTtlji-q3wotLNk22oziQf7YzxKvy6I3TMNvy5JcChkKR2j4oV_-lKr_mAmNZlh5aTBlnX6un3Pl6jUNp7liXrOpk03H8CXTmZyQqt17gN9c9Sr91FIElmN6otZ8dS_mRPdC6p1O70MffIG3Omf3Sd1Vsgk6e4UWu_ZE3phYs-4Z3RhYJr_iuZlg0K7Z-Nk6BKUWQI7ymeLYuK2H6a349GVj57jZHs"
                            />
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="animate-entrance z-10 grid w-full grid-cols-1 gap-4 delay-200">
                        <div className="flex items-center gap-3 rounded-xl border border-outline-variant/30 bg-surface/50 p-4 backdrop-blur-sm">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-tertiary-container/10">
                                <span
                                    className="material-symbols-outlined text-[20px] text-tertiary"
                                    style={{
                                        fontVariationSettings: "'FILL' 1",
                                    }}
                                >
                                    verified_user
                                </span>
                            </div>
                            <span className="font-label-md text-label-md text-on-surface">
                                Autentikasi Aman
                            </span>
                        </div>
                        <div className="flex items-center gap-3 rounded-xl border border-outline-variant/30 bg-surface/50 p-4 backdrop-blur-sm">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-container/10">
                                <span
                                    className="material-symbols-outlined text-[20px] text-secondary"
                                    style={{
                                        fontVariationSettings: "'FILL' 1",
                                    }}
                                >
                                    psychology
                                </span>
                            </div>
                            <span className="font-label-md text-label-md text-on-surface">
                                Pengalaman AI Personal
                            </span>
                        </div>
                    </div>

                    {/* Background Decorative Elements */}
                    <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/5 blur-[100px]"></div>
                    <div className="pointer-events-none absolute top-1/4 -right-24 h-64 w-64 rounded-full bg-secondary/5 blur-[80px]"></div>
                </section>

                {/* Right Side: Auth Card (55%) */}
                <section className="relative flex min-h-screen w-full items-center justify-center bg-surface-bright p-6 md:w-[55%] md:p-12">
                    <div className="animate-entrance w-full max-w-[520px] delay-100">
                        {/* Authentication Card */}
                        <div
                            className="bento-card border border-outline-variant/20 p-8 shadow-xl md:p-10"
                            id="auth-card"
                        >
                            {/* Journey Indicator */}
                            <div className="mb-8 flex items-center justify-between border-b border-outline-variant/20 pb-6">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 animate-pulse rounded-full bg-tertiary"></div>
                                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                                        Anda mendaftar sebagai{' '}
                                        <strong className="text-on-surface">
                                            Anggota Koperasi
                                        </strong>
                                    </span>
                                </div>
                            </div>

                            {/* Register Form Container */}
                            <div id="register-container">
                                <div className="mb-8">
                                    <h2 className="mb-2 font-headline-md text-white">
                                        Buat Akun
                                    </h2>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                                        Bergabunglah dengan komunitas
                                        KOPERA-PLUS hari ini.
                                    </p>
                                </div>

                                <Form
                                    {...store.form()}
                                    resetOnSuccess={[
                                        'password',
                                        'password_confirmation',
                                    ]}
                                    className="space-y-4"
                                >
                                    {({ processing, errors }) => (
                                        <>
                                            <div className="space-y-1.5">
                                                <Label
                                                    className="font-label-md text-label-md text-on-surface-variant"
                                                    htmlFor="name"
                                                >
                                                    Nama Lengkap
                                                </Label>
                                                <Input
                                                    className="w-full rounded-lg border border-outline-variant bg-white px-4 py-3 font-body-md text-on-surface transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Nama Lengkap Anda"
                                                    type="text"
                                                    required
                                                    autoFocus
                                                />
                                                <InputError
                                                    message={errors.name}
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label
                                                    className="font-label-md text-label-md text-on-surface-variant"
                                                    htmlFor="email"
                                                >
                                                    Alamat Email
                                                </Label>
                                                <Input
                                                    className="w-full rounded-lg border border-outline-variant bg-white px-4 py-3 font-body-md text-on-surface transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                                    id="email"
                                                    name="email"
                                                    placeholder="name@coop.com"
                                                    type="email"
                                                    required
                                                />
                                                <InputError
                                                    message={errors.email}
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label
                                                    className="font-label-md text-label-md text-on-surface-variant"
                                                    htmlFor="password"
                                                >
                                                    Kata Sandi
                                                </Label>
                                                <PasswordInput
                                                    id="password"
                                                    name="password"
                                                    placeholder="••••••••"
                                                    required
                                                    className="bg-white"
                                                    passwordrules={
                                                        passwordRules
                                                    }
                                                />
                                                <InputError
                                                    message={errors.password}
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label
                                                    className="font-label-md text-label-md text-on-surface-variant"
                                                    htmlFor="password_confirmation"
                                                >
                                                    Konfirmasi Kata Sandi
                                                </Label>
                                                <PasswordInput
                                                    id="password_confirmation"
                                                    name="password_confirmation"
                                                    placeholder="••••••••"
                                                    required
                                                    className="bg-white"
                                                    passwordrules={
                                                        passwordRules
                                                    }
                                                />
                                                <InputError
                                                    message={
                                                        errors.password_confirmation
                                                    }
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className="glow-button mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-headline-sm text-headline-sm text-white transition-all hover:bg-primary/95"
                                            >
                                                {processing && (
                                                    <Spinner className="text-white" />
                                                )}
                                                Buat Akun
                                                <span className="material-symbols-outlined text-[20px]">
                                                    person_add
                                                </span>
                                            </Button>
                                        </>
                                    )}
                                </Form>
                            </div>

                            {/* Toggle Text */}
                            <div className="mt-8 text-center">
                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                    Sudah punya akun?
                                    <Link
                                        className="ml-1 font-label-md text-label-md text-primary hover:underline"
                                        href={login()}
                                    >
                                        Masuk
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Footer Links */}
                        <div className="animate-entrance mt-8 flex justify-center gap-6 delay-200">
                            <a
                                className="font-label-sm text-label-sm text-outline transition-colors hover:text-primary"
                                href="#"
                            >
                                Kebijakan Privasi
                            </a>
                            <a
                                className="font-label-sm text-label-sm text-outline transition-colors hover:text-primary"
                                href="#"
                            >
                                Syarat Layanan
                            </a>
                            <a
                                className="font-label-sm text-label-sm text-outline transition-colors hover:text-primary"
                                href="#"
                            >
                                Pusat Bantuan
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <PrototypeHud />
        </>
    );
}
