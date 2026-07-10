import { Form, Head, Link } from '@inertiajs/react';
import React, { useState } from 'react';
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
    const [selectedRole, setSelectedRole] = useState<'anggota' | 'masyarakat'>('anggota');
    const selectedRoleLabel = selectedRole === 'anggota' ? 'Anggota koperasi' : 'Masyarakat';
    const loginTitle = selectedRole === 'anggota' ? 'Masuk Anggota' : 'Masuk Masyarakat';

    return (
        <>
            <Head title="Masuk Anggota | KOPERA-PLUS" />

            <main className="min-h-screen flex flex-col md:flex-row font-sans bg-background text-on-surface">
                <section className="w-full md:w-[45%] bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF] p-8 md:p-16 flex flex-col justify-between items-start relative overflow-hidden min-h-[400px] md:min-h-screen">
                    <div className="z-10 w-full animate-entrance">
                        <p className="mb-8 font-headline-lg text-headline-sm font-black tracking-tight text-primary">
                            Selamat datang di KOPERA-PLUS
                        </p>
                        <h1 className="font-headline-lg text-display-sm text-on-surface mb-4 leading-tight">
                            Platform cerdas untuk anggota koperasi modern
                        </h1>
                        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
                            Memberdayakan komunitas melalui pengalaman koperasi yang cerdas.
                        </p>
                    </div>

                    <div className="z-10 w-full py-6 md:py-10 animate-entrance delay-100">
                        <div className="mx-auto w-full max-w-md space-y-2">
                            <div className="flex flex-wrap items-center justify-center gap-1.5">
                                <span className="inline-flex items-center justify-center rounded-full border border-outline-variant/30 bg-surface px-2 py-1 text-center text-[10px] font-medium text-on-surface sm:text-xs">
                                    Autentifikasi Aman
                                </span>
                                <span className="inline-flex items-center justify-center rounded-full border border-outline-variant/30 bg-surface px-2 py-1 text-center text-[10px] font-medium text-on-surface sm:text-xs">
                                    Pengalaman AI Personal
                                </span>
                            </div>

                            <div className="rounded-2xl border border-outline-variant/30 bg-surface/70 p-4 shadow-lg backdrop-blur-md md:p-5">
                                <p className="mb-3 text-center font-label-sm text-label-sm text-on-surface-variant">Pilih role untuk login</p>
                                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                <button
                                    type="button"
                                    onClick={() => setSelectedRole('anggota')}
                                    className={`rounded-full border px-3 py-2 text-xs font-medium transition-all sm:px-4 sm:text-sm ${selectedRole === 'anggota'
                                        ? 'border-primary bg-primary text-white'
                                        : 'border-outline-variant/40 bg-surface text-on-surface hover:border-primary/40'
                                        }`}
                                >
                                    Anggota
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSelectedRole('masyarakat')}
                                    className={`rounded-full border px-3 py-2 text-xs font-medium transition-all sm:px-4 sm:text-sm ${selectedRole === 'masyarakat'
                                        ? 'border-primary bg-primary text-white'
                                        : 'border-outline-variant/40 bg-surface text-on-surface hover:border-primary/40'
                                        }`}
                                >
                                    Masyarakat
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute top-1/4 -right-24 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] pointer-events-none"></div>
                </section>

                <section className="w-full md:w-[55%] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-surface-bright relative min-h-[auto] md:min-h-screen">
                    <div className="w-full max-w-[460px] animate-entrance delay-100">
                        {status && (
                            <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-xl border border-green-200/50 text-sm font-medium">
                                {status}
                            </div>
                        )}

                        <div className="bento-card p-4 sm:p-6 md:p-7 border border-outline-variant/20 shadow-xl" id="auth-card">
                            <div className="flex items-center justify-between mb-5 pb-4 border-b border-outline-variant/20">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></div>
                                    <span className="font-label-sm text-label-sm text-on-surface-variant">Anda masuk sebagai <strong className="text-on-surface">{selectedRoleLabel}</strong></span>
                                </div>
                            </div>

                            <div id="login-container">
                                <div className="mb-5">
                                    <h2 className="font-headline-md text-headline-md text-on-surface mb-2">{loginTitle}</h2>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">Masukkan kredensial Anda untuk mengakses dashboard.</p>
                                </div>

                                <Form
                                    {...store.form()}
                                    resetOnSuccess={['password']}
                                    className="space-y-4"
                                >
                                    {({ processing, errors }) => (
                                        <>
                                            <div className="space-y-1.5">
                                                <Label className="font-label-md text-label-md text-on-surface-variant" htmlFor="email">Alamat Email</Label>
                                                <Input
                                                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md text-on-surface bg-white"
                                                    id="email"
                                                    name="email"
                                                    placeholder="name@coop.com"
                                                    type="email"
                                                    required
                                                    autoFocus
                                                />
                                                <InputError message={errors.email} />
                                            </div>

                                            <div className="space-y-1.5">
                                                <div className="flex justify-between items-center">
                                                    <Label className="font-label-md text-label-md text-on-surface-variant" htmlFor="password">Kata Sandi</Label>
                                                    {canResetPassword && (
                                                        <Link className="font-label-sm text-label-sm text-primary hover:underline" href={request()}>
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
                                                <InputError message={errors.password} />
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Checkbox id="remember" name="remember" />
                                                <Label className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer" htmlFor="remember">Ingat saya selama 30 hari</Label>
                                            </div>

                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className="w-full py-3 bg-primary text-white font-headline-sm text-headline-sm rounded-lg glow-button flex items-center justify-center gap-2 hover:bg-primary/95 transition-all"
                                            >
                                                {processing && <Spinner className="text-white" />}
                                                <span className="text-white">Masuk</span>
                                                <span className="material-symbols-outlined text-[20px] text-white">arrow_forward</span>
                                            </Button>
                                        </>
                                    )}
                                </Form>

                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-outline-variant/30"></div>
                                    </div>
                                    <div className="relative flex justify-center text-label-sm">
                                        <span className="bg-white px-4 text-outline font-label-sm uppercase tracking-widest">atau lanjut dengan</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                    <button onClick={() => (window.location.href = '/onboarding')} className="flex items-center justify-center gap-3 px-4 py-3 border border-outline-variant rounded-xl hover:bg-surface-container-low transition-colors font-label-md text-label-md bg-white">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                                        </svg>
                                        Google
                                    </button>
                                    <button onClick={() => (window.location.href = '/onboarding')} className="flex items-center justify-center gap-3 px-4 py-3 border border-outline-variant rounded-xl hover:bg-surface-container-low transition-colors font-label-md text-label-md bg-white">
                                        <svg className="w-5 h-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M20.52 3.48A11.84 11.84 0 0 0 12.01 0C5.39 0 .01 5.38.01 12c0 2.11.55 4.17 1.6 6L0 24l6.19-1.62A11.95 11.95 0 0 0 12 24c6.62 0 12-5.38 12-12 0-3.2-1.25-6.21-3.48-8.52Zm-8.51 18.5c-1.8 0-3.56-.48-5.1-1.39l-.37-.22-3.67.96.98-3.58-.24-.37A9.93 9.93 0 0 1 2.01 12c0-5.51 4.49-10 10-10 2.67 0 5.18 1.04 7.07 2.93A9.94 9.94 0 0 1 22.01 12c0 5.51-4.49 9.98-10 9.98Zm5.49-7.49c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.41-1.49-.89-.8-1.49-1.79-1.67-2.09-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.8.37s-1.04 1.02-1.04 2.49 1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.1 4.48.71.31 1.27.49 1.7.62.72.23 1.37.2 1.88.12.57-.08 1.77-.72 2.02-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
                                        </svg>
                                        WhatsApp
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                    Belum punya akun?
                                    <Link className="text-primary font-label-md text-label-md hover:underline ml-1" href={register()}>
                                        Buat Akun
                                    </Link>
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center gap-6 animate-entrance delay-200">
                            <a className="font-label-sm text-label-sm text-outline hover:text-primary transition-colors" href="#">Kebijakan Privasi</a>
                            <a className="font-label-sm text-label-sm text-outline hover:text-primary transition-colors" href="#">Syarat Layanan</a>
                            <a className="font-label-sm text-label-sm text-outline hover:text-primary transition-colors" href="#">Pusat Bantuan</a>
                        </div>
                    </div>
                </section>
            </main>

            <PrototypeHud />
        </>
    );
}
