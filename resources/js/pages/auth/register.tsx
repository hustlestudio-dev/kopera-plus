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
};

export default function Register({ passwordRules }: Props) {
    return (
        <>
            <Head title="Buat Akun | KOPERA-PLUS" />

            <main className="min-h-screen flex flex-col md:flex-row font-sans bg-background text-on-surface">
                {/* Left Side: Branding Panel (45%) */}
                <section className="w-full md:w-[45%] bg-gradient-to-br from-[#F8FAFC] to-[#EFF6FF] p-8 md:p-16 flex flex-col justify-between items-start relative overflow-hidden min-h-[400px] md:min-h-screen">
                    {/* Brand Identity */}
                    <div className="z-10 w-full animate-entrance">
                        <Link href="/" className="flex items-center gap-2 mb-12 group">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
                            </div>
                            <span className="font-headline-lg text-headline-sm font-black tracking-tight text-primary">KOPERA-PLUS</span>
                        </Link>
                        <h1 className="font-headline-lg text-display-sm text-on-surface mb-4 leading-tight">
                            Selamat datang di <span className="ai-gradient-text">KOPERA AI</span>
                        </h1>
                        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
                            Memberdayakan komunitas melalui pengalaman koperasi yang cerdas.
                        </p>
                    </div>

                    {/* AI Illustration */}
                    <div className="z-10 w-full flex justify-center py-6 md:py-12 animate-entrance delay-100">
                        <div className="relative w-full max-w-xs md:max-w-md aspect-square flex justify-center">
                            <img alt="KOPERA AI Illustration" className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANFZUBvSPEBzuY_lnYbbAEvun86U4ANjFNJtwlF7_uAzdx9qTtlji-q3wotLNk22oziQf7YzxKvy6I3TMNvy5JcChkKR2j4oV_-lKr_mAmNZlh5aTBlnX6un3Pl6jUNp7liXrOpk03H8CXTmZyQqt17gN9c9Sr91FIElmN6otZ8dS_mRPdC6p1O70MffIG3Omf3Sd1Vsgk6e4UWu_ZE3phYs-4Z3RhYJr_iuZlg0K7Z-Nk6BKUWQI7ymeLYuK2H6a349GVj57jZHs" />
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="z-10 w-full grid grid-cols-1 gap-4 animate-entrance delay-200">
                        <div className="flex items-center gap-3 bg-surface/50 backdrop-blur-sm p-4 rounded-xl border border-outline-variant/30">
                            <div className="w-8 h-8 rounded-full bg-tertiary-container/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-tertiary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                            </div>
                            <span className="font-label-md text-label-md text-on-surface">Autentikasi Aman</span>
                        </div>
                        <div className="flex items-center gap-3 bg-surface/50 backdrop-blur-sm p-4 rounded-xl border border-outline-variant/30">
                            <div className="w-8 h-8 rounded-full bg-secondary-container/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                            </div>
                            <span className="font-label-md text-label-md text-on-surface">Pengalaman AI Personal</span>
                        </div>
                    </div>

                    {/* Background Decorative Elements */}
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute top-1/4 -right-24 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] pointer-events-none"></div>
                </section>

                {/* Right Side: Auth Card (55%) */}
                <section className="w-full md:w-[55%] flex items-center justify-center p-6 md:p-12 bg-surface-bright relative min-h-screen">
                    <div className="w-full max-w-[520px] animate-entrance delay-100">

                        {/* Authentication Card */}
                        <div className="bento-card p-8 md:p-10 border border-outline-variant/20 shadow-xl" id="auth-card">
                            {/* Journey Indicator */}
                            <div className="flex items-center justify-between mb-8 pb-6 border-b border-outline-variant/20">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></div>
                                    <span className="font-label-sm text-label-sm text-on-surface-variant">Anda mendaftar sebagai <strong className="text-on-surface">Anggota Koperasi</strong></span>
                                </div>
                            </div>

                            {/* Register Form Container */}
                            <div id="register-container">
                                <div className="mb-8">
                                    <h2 className="font-headline-md text-white mb-2">Buat Akun</h2>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">Bergabunglah dengan komunitas KOPERA-PLUS hari ini.</p>
                                </div>

                                <Form
                                    {...store.form()}
                                    resetOnSuccess={['password', 'password_confirmation']}
                                    className="space-y-4"
                                >
                                    {({ processing, errors }) => (
                                        <>
                                            <div className="space-y-1.5">
                                                <Label className="font-label-md text-label-md text-on-surface-variant" htmlFor="name">Nama Lengkap</Label>
                                                <Input
                                                    className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md text-on-surface bg-white"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Nama Lengkap Anda"
                                                    type="text"
                                                    required
                                                    autoFocus
                                                />
                                                <InputError message={errors.name} />
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label className="font-label-md text-label-md text-on-surface-variant" htmlFor="email">Alamat Email</Label>
                                                <Input
                                                    className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md text-on-surface bg-white"
                                                    id="email"
                                                    name="email"
                                                    placeholder="name@coop.com"
                                                    type="email"
                                                    required
                                                />
                                                <InputError message={errors.email} />
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label className="font-label-md text-label-md text-on-surface-variant" htmlFor="password">Kata Sandi</Label>
                                                <PasswordInput
                                                    id="password"
                                                    name="password"
                                                    placeholder="••••••••"
                                                    required
                                                    className="bg-white"
                                                    passwordrules={passwordRules}
                                                />
                                                <InputError message={errors.password} />
                                            </div>

                                            <div className="space-y-1.5">
                                                <Label className="font-label-md text-label-md text-on-surface-variant" htmlFor="password_confirmation">Konfirmasi Kata Sandi</Label>
                                                <PasswordInput
                                                    id="password_confirmation"
                                                    name="password_confirmation"
                                                    placeholder="••••••••"
                                                    required
                                                    className="bg-white"
                                                    passwordrules={passwordRules}
                                                />
                                                <InputError message={errors.password_confirmation} />
                                            </div>

                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className="w-full mt-4 py-4 bg-primary text-white font-headline-sm text-headline-sm rounded-xl glow-button flex items-center justify-center gap-2 hover:bg-primary/95 transition-all"
                                            >
                                                {processing && <Spinner className="text-white" />}
                                                Buat Akun
                                                <span className="material-symbols-outlined text-[20px]">person_add</span>
                                            </Button>
                                        </>
                                    )}
                                </Form>
                            </div>

                            {/* Toggle Text */}
                            <div className="mt-8 text-center">
                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                    Sudah punya akun?
                                    <Link className="text-primary font-label-md text-label-md hover:underline ml-1" href={login()}>
                                        Masuk
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Footer Links */}
                        <div className="mt-8 flex justify-center gap-6 animate-entrance delay-200">
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
