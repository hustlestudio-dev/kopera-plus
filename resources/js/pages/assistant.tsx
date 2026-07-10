import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Send, Sparkles, Clock3 } from 'lucide-react';

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

export default function Assistant() {
    const [messages, setMessages] = useState<Message[]>([
        {
            sender: 'ai',
            text: 'Halo, saya KOPERA. Saya balas langsung dari backend AI. Tanya stok, poin, RAT, komunitas, atau daftar koperasi.',
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = async (textToSend = input) => {
        const message = textToSend.trim();

        if (!message || isTyping) {
            return;
        }

        setMessages((current) => [...current, { sender: 'user', text: message }]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch('/assistant/chat', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '',
                },
                body: JSON.stringify({ message }),
            });

            const data = (await response.json()) as { message?: string };

            if (!response.ok) {
                throw new Error(data.message ?? 'Gagal menghubungi backend AI.');
            }

            setMessages((current) => [
                ...current,
                {
                    sender: 'ai',
                    text: data.message ?? 'Maaf, data sedang tidak tersedia. Coba beberapa saat lagi atau hubungi pengurus.',
                },
            ]);
        } catch (error) {
            setMessages((current) => [
                ...current,
                {
                    sender: 'ai',
                    text: error instanceof Error ? error.message : 'Maaf, data sedang tidak tersedia. Coba beberapa saat lagi atau hubungi pengurus.',
                },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            <Head title="KOPERA AI Assistant" />
            <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#e7f0e8,_white_40%,_#f6f0e7_100%)] text-slate-900">
                <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mb-5 flex items-center justify-between rounded-3xl border border-white/70 bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">Real-time AI</p>
                            <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">KOPERA AI Assistant</h1>
                            <p className="mt-1 text-sm text-slate-600">
                                Balasan datang dari backend AI, tanpa campur tangan manusia.
                            </p>
                        </div>
                        <div className="hidden items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 sm:flex">
                            <Sparkles className="h-4 w-4" />
                            24 jam aktif selama server berjalan
                        </div>
                    </div>

                    <div className="grid flex-1 gap-5 lg:grid-cols-[1fr_280px]">
                        <section className="flex min-h-[70vh] flex-col overflow-hidden rounded-[32px] border border-white/70 bg-white/85 shadow-xl backdrop-blur">
                            <div className="border-b border-slate-200 px-5 py-4">
                                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                    <Clock3 className="h-4 w-4 text-emerald-700" />
                                    Respons otomatis dari backend AI
                                </div>
                            </div>

                            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm ${
                                                message.sender === 'user'
                                                    ? 'rounded-br-md bg-emerald-700 text-white'
                                                    : 'rounded-bl-md border border-slate-200 bg-slate-50 text-slate-900'
                                            }`}
                                        >
                                            {message.text}
                                        </div>
                                    </div>
                                ))}

                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="rounded-3xl rounded-bl-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                                            Sedang memproses jawaban dari backend AI...
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-slate-200 px-4 py-4">
                                <div className="flex items-end gap-3 rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
                                    <textarea
                                        className="min-h-[56px] flex-1 resize-none rounded-2xl border-0 bg-transparent px-3 py-3 text-sm outline-none focus:ring-0"
                                        placeholder='Coba: "mau beli beras premium 2 antar ke Desa Suka Maju"'
                                        value={input}
                                        onChange={(event) => setInput(event.target.value)}
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter' && !event.shiftKey) {
                                                event.preventDefault();
                                                void sendMessage();
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => void sendMessage()}
                                        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-white transition hover:bg-emerald-800 disabled:opacity-50"
                                        disabled={isTyping}
                                    >
                                        <Send className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </section>

                        <aside className="space-y-4">
                            <div className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-sm">
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Mode</p>
                                <p className="mt-2 text-lg font-black">Real-time backend AI</p>
                                <p className="mt-2 text-sm text-slate-600">
                                    Endpoint chat yang sama dipakai oleh website dan WhatsApp webhook.
                                </p>
                            </div>
                            <div className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-sm">
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Scope</p>
                                <p className="mt-2 text-sm text-slate-700">
                                    Jawaban otomatis mengikuti `cooperative_id`, role user, stok produk, poin, RAT, dan community.
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}
