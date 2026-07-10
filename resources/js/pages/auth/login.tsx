import React from 'react';
import { Form, Head, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import PrototypeHud from '@/components/PrototypeHud';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Member Login | KOPERA-PLUS" />

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
                            Welcome to <span className="ai-gradient-text">KOPERA AI</span>
                        </h1>
                        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
                            Empowering communities through intelligent cooperative experiences.
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
                            <span className="font-label-md text-label-md text-on-surface">Secure Authentication</span>
                        </div>
                        <div className="flex items-center gap-3 bg-surface/50 backdrop-blur-sm p-4 rounded-xl border border-outline-variant/30">
                            <div className="w-8 h-8 rounded-full bg-secondary-container/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                            </div>
                            <span className="font-label-md text-label-md text-on-surface">AI Personalized Experience</span>
                        </div>
                    </div>

                    {/* Background Decorative Elements */}
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute top-1/4 -right-24 w-64 h-64 bg-secondary/5 rounded-full blur-[80px] pointer-events-none"></div>
                </section>

                {/* Right Side: Auth Card (55%) */}
                <section className="w-full md:w-[55%] flex items-center justify-center p-6 md:p-12 bg-surface-bright relative min-h-screen">
                    <div className="w-full max-w-[520px] animate-entrance delay-100">

                        {/* Status Message */}
                        {status && (
                            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl border border-green-200/50 text-sm font-medium">
                                {status}
                            </div>
                        )}

                        {/* Authentication Card */}
                        <div className="bento-card p-8 md:p-10 border border-outline-variant/20 shadow-xl" id="auth-card">
                            {/* Journey Indicator */}
                            <div className="flex items-center justify-between mb-8 pb-6 border-b border-outline-variant/20">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></div>
                                    <span className="font-label-sm text-label-sm text-on-surface-variant">You're signing in as <strong className="text-on-surface">Cooperative Member</strong></span>
                                </div>
                            </div>

                            {/* Login Form Container */}
                            <div id="login-container">
                                <div className="mb-8">
                                    <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Member Login</h2>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">Enter your credentials to access your dashboard.</p>
                                </div>

                                <Form
                                    {...store.form()}
                                    resetOnSuccess={['password']}
                                    className="space-y-5"
                                >
                                    {({ processing, errors }) => (
                                        <>
                                            <div className="space-y-1.5">
                                                <Label className="font-label-md text-label-md text-on-surface-variant" htmlFor="email">Email Address</Label>
                                                <Input
                                                    className="w-full px-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-md text-on-surface bg-white"
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
                                                    <Label className="font-label-md text-label-md text-on-surface-variant" htmlFor="password">Password</Label>
                                                    {canResetPassword && (
                                                        <Link className="font-label-sm text-label-sm text-primary hover:underline" href={request()}>
                                                            Forgot Password?
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
                                                <Checkbox
                                                    id="remember"
                                                    name="remember"
                                                />
                                                <Label className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer" htmlFor="remember">Remember me for 30 days</Label>
                                            </div>

                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className="w-full py-4 bg-primary text-white font-headline-sm text-headline-sm rounded-xl glow-button flex items-center justify-center gap-2 hover:bg-primary/95 transition-all"
                                            >
                                                {processing && <Spinner className="text-white" />}
                                                <span className='text-white'>
                                                    Login
                                                </span>
                                                <span className="material-symbols-outlined text-[20px] text-white">arrow_forward</span>
                                            </Button>
                                        </>
                                    )}
                                </Form>

                                <div className="relative my-8">
                                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant/30"></div></div>
                                    <div className="relative flex justify-center text-label-sm"><span className="bg-white px-4 text-outline font-label-sm uppercase tracking-widest">or continue with</span></div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <button onClick={() => window.location.href = '/onboarding'} className="flex items-center justify-center gap-3 px-4 py-3 border border-outline-variant rounded-xl hover:bg-surface-container-low transition-colors font-label-md text-label-md bg-white">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                                        </svg>
                                        Google
                                    </button>
                                    <button onClick={() => window.location.href = '/onboarding'} className="flex items-center justify-center gap-3 px-4 py-3 border border-outline-variant rounded-xl hover:bg-surface-container-low transition-colors font-label-md text-label-md bg-white">
                                        <svg className="w-5 h-5" viewBox="0 0 23 23">
                                            <path d="M0 0h23v23H0z" fill="#f3f3f3"></path>
                                            <path d="M1 1h10v10H1z" fill="#f35325"></path>
                                            <path d="M12 1h10v10H12z" fill="#81bc06"></path>
                                            <path d="M1 12h10v10H1z" fill="#05a6f0"></path>
                                            <path d="M12 12h10v10H12z" fill="#ffba08"></path>
                                        </svg>
                                        Microsoft
                                    </button>
                                </div>
                            </div>

                            {/* Toggle Text */}
                            <div className="mt-8 text-center">
                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                    Don't have an account?
                                    <Link className="text-primary font-label-md text-label-md hover:underline ml-1" href={register()}>
                                        Create Account
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Footer Links */}
                        <div className="mt-8 flex justify-center gap-6 animate-entrance delay-200">
                            <a className="font-label-sm text-label-sm text-outline hover:text-primary transition-colors" href="#">Privacy Policy</a>
                            <a className="font-label-sm text-label-sm text-outline hover:text-primary transition-colors" href="#">Terms of Service</a>
                            <a className="font-label-sm text-label-sm text-outline hover:text-primary transition-colors" href="#">Help Center</a>
                        </div>
                    </div>
                </section>
            </main>

            <PrototypeHud />
        </>
    );
}
