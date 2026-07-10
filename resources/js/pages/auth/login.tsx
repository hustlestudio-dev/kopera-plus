import { Form, Head, Link } from '@inertiajs/react';
import React from 'react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import PrototypeHud from '@/components/PrototypeHud';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Masuk Anggota | KOPERA-PLUS" />

            <main className="flex min-h-screen flex-col bg-background font-sans text-on-surface md:flex-row">
                <section className="relative flex min-h-[400px] w-full flex-col items-start justify-between overflow-hidden bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF] p-8 md:min-h-screen md:w-[45%] md:p-16">
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

                    <div className="animate-entrance z-10 flex w-full justify-center py-6 delay-100 md:py-12">
                        <div className="relative flex aspect-square w-full max-w-xs justify-center md:max-w-md">
                            <img
                                alt="KOPERA AI Illustration"
                                className="h-full w-full object-contain mix-blend-multiply drop-shadow-2xl"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuANFZUBvSPEBzuY_lnYbbAEvun86U4ANjFNJtwlF7_uAzdx9qTtlji-q3wotLNk22oziQf7YzxKvy6I3TMNvy5JcChkKR2j4oV_-lKr_mAmNZlh5aTBlnX6un3Pl6jUNp7liXrOpk03H8CXTmZyQqt17gN9c9Sr91FIElmN6otZ8dS_mRPdC6p1O70MffIG3Omf3Sd1Vsgk6e4UWu_ZE3phYs-4Z3RhYJr_iuZlg0K7Z-Nk6BKUWQI7ymeLYuK2H6a349GVj57jZHs"
                            />
                        </div>
                    </div>

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

                    <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/5 blur-[100px]"></div>
                    <div className="pointer-events-none absolute top-1/4 -right-24 h-64 w-64 rounded-full bg-secondary/5 blur-[80px]"></div>
                </section>

                <section className="relative flex min-h-screen w-full items-center justify-center bg-surface-bright p-6 md:w-[55%] md:p-12">
                    <div className="animate-entrance w-full max-w-[520px] delay-100">
                        {status && (
                            <div className="mb-6 rounded-xl border border-green-200/50 bg-green-50 p-4 text-sm font-medium text-green-700">
                                {status}
                            </div>
                        )}

                        <div
                            className="bento-card border border-outline-variant/20 p-8 shadow-xl md:p-10"
                            id="auth-card"
                        >
                            <div className="mb-8 flex items-center justify-between border-b border-outline-variant/20 pb-6">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 animate-pulse rounded-full bg-tertiary"></div>
                                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                                        Anda masuk sebagai{' '}
                                        <strong className="text-on-surface">
                                            Anggota Koperasi
                                        </strong>
                                    </span>
                                </div>
                            </div>

                            <div id="login-container">
                                <div className="mb-8">
                                    <h2 className="mb-2 font-headline-md text-headline-md text-on-surface">
                                        Masuk Anggota
                                    </h2>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                                        Masukkan kredensial Anda untuk mengakses
                                        dashboard.
                                    </p>
                                </div>

                                <Form
                                    {...store.form()}
                                    resetOnSuccess={['password']}
                                    className="space-y-5"
                                >
                                    {({ processing, errors }) => (
                                        <>
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
                                                    autoFocus
                                                />
                                                <InputError
                                                    message={errors.email}
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <div className="flex items-center justify-between">
                                                    <Label
                                                        className="font-label-md text-label-md text-on-surface-variant"
                                                        htmlFor="password"
                                                    >
                                                        Kata Sandi
                                                    </Label>
                                                    {canResetPassword && (
                                                        <Link
                                                            className="font-label-sm text-label-sm text-primary hover:underline"
                                                            href={request()}
                                                        >
                                                            Lupa Kata Sandi?
                                                        </Link>
                                                    )}
                                                </div>
                                                <PasswordInput
                                                    id="password"
                                                    name="password"
                                                    placeholder="••••••••"
                                                    required
                                                    className="bg-white"
                                                />
                                                <InputError
                                                    message={errors.password}
                                                />
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id="remember"
                                                    name="remember"
                                                />
                                                <Label
                                                    className="cursor-pointer font-body-sm text-body-sm text-on-surface-variant"
                                                    htmlFor="remember"
                                                >
                                                    Ingat saya selama 30 hari
                                                </Label>
                                            </div>

                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className="glow-button flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-headline-sm text-headline-sm text-white transition-all hover:bg-primary/95"
                                            >
                                                {processing && (
                                                    <Spinner className="text-white" />
                                                )}
                                                <span className="text-white">
                                                    Masuk
                                                </span>
                                                <span className="material-symbols-outlined text-[20px] text-white">
                                                    arrow_forward
                                                </span>
                                            </Button>
                                        </>
                                    )}
                                </Form>

                                <div className="relative my-8">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-outline-variant/30"></div>
                                    </div>
                                    <div className="relative flex justify-center text-label-sm">
                                        <span className="bg-white px-4 font-label-sm tracking-widest text-outline uppercase">
                                            atau lanjut dengan
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <button
                                        onClick={() =>
                                            (window.location.href =
                                                '/onboarding')
                                        }
                                        className="flex items-center justify-center gap-3 rounded-xl border border-outline-variant bg-white px-4 py-3 font-label-md text-label-md transition-colors hover:bg-surface-container-low"
                                    >
                                        <svg
                                            className="h-5 w-5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                fill="#4285F4"
                                            ></path>
                                            <path
                                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                fill="#34A853"
                                            ></path>
                                            <path
                                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                                fill="#FBBC05"
                                            ></path>
                                            <path
                                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                fill="#EA4335"
                                            ></path>
                                        </svg>
                                        Google
                                    </button>
                                    <button
                                        onClick={() =>
                                            (window.location.href =
                                                '/onboarding')
                                        }
                                        className="flex items-center justify-center gap-3 rounded-xl border border-outline-variant bg-white px-4 py-3 font-label-md text-label-md transition-colors hover:bg-surface-container-low"
                                    >
                                        <svg
                                            className="h-5 w-5"
                                            viewBox="0 0 23 23"
                                        >
                                            <path
                                                d="M0 0h23v23H0z"
                                                fill="#f3f3f3"
                                            ></path>
                                            <path
                                                d="M1 1h10v10H1z"
                                                fill="#f35325"
                                            ></path>
                                            <path
                                                d="M12 1h10v10H12z"
                                                fill="#81bc06"
                                            ></path>
                                            <path
                                                d="M1 12h10v10H1z"
                                                fill="#05a6f0"
                                            ></path>
                                            <path
                                                d="M12 12h10v10H12z"
                                                fill="#ffba08"
                                            ></path>
                                        </svg>
                                        Microsoft
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8 text-center">
                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                    Belum punya akun?
                                    <Link
                                        className="ml-1 font-label-md text-label-md text-primary hover:underline"
                                        href={register()}
                                    >
                                        Buat Akun
                                    </Link>
                                </p>
                            </div>
                        </div>

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
