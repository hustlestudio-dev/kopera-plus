import { Head, Link } from '@inertiajs/react';

type Cooperative = {
    id: number;
    name: string;
    slug: string;
    city: string | null;
    province: string | null;
    whatsapp_number: string | null;
};

type Product = {
    id: number;
    name: string;
    stock: number;
    unit: string;
    price: number;
};

type Agenda = {
    id: number;
    title: string;
    scheduled_at: string;
    summary: string | null;
};

type Post = {
    id: number;
    title: string;
    content: string;
};

interface Props {
    cooperative: Cooperative | null;
    products: Product[];
    agenda: Agenda | null;
    posts: Post[];
    points: number;
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(value);
}

export default function AiDemo({ cooperative, products, agenda, posts, points }: Props) {
    return (
        <>
            <Head title="AI Demo | KOPERA-PLUS" />
            <div className="min-h-screen bg-gradient-to-br from-[#f7f3eb] via-white to-[#e7f0e8] text-slate-900">
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
                        <div>
                            <p className="text-sm uppercase tracking-[0.24em] text-emerald-700 font-semibold">KOPERA AI DEMO</p>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-2">Hasil setup AI koperasi</h1>
                            <p className="mt-3 max-w-2xl text-slate-600">
                                Halaman ini menampilkan seed demo, stok produk, agenda RAT, komunitas, dan state AI yang sudah tersambung ke database koperasi.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Link href="/" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold hover:bg-slate-50">
                                Home
                            </Link>
                            <Link href="/assistant" className="rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800">
                                Open Assistant
                            </Link>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                            <p className="text-sm text-slate-500">Koperasi</p>
                            <p className="mt-2 text-2xl font-bold">{cooperative?.name ?? 'Belum ada data'}</p>
                            <p className="mt-2 text-sm text-slate-600">{cooperative?.city ?? '-'}, {cooperative?.province ?? '-'}</p>
                        </div>
                        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                            <p className="text-sm text-slate-500">Poin Demo</p>
                            <p className="mt-2 text-2xl font-bold">{points} poin</p>
                            <p className="mt-2 text-sm text-slate-600">Terhubung ke points_ledger koperasi seed.</p>
                        </div>
                        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                            <p className="text-sm text-slate-500">Produk Aktif</p>
                            <p className="mt-2 text-2xl font-bold">{products.length}</p>
                            <p className="mt-2 text-sm text-slate-600">Stok dan harga dibaca dari tabel products.</p>
                        </div>
                        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                            <p className="text-sm text-slate-500">Agenda RAT</p>
                            <p className="mt-2 text-2xl font-bold">{agenda ? 'Ada' : 'Tidak ada'}</p>
                            <p className="mt-2 text-sm text-slate-600">Ringkasan agenda tersedia dari seed data.</p>
                        </div>
                    </div>

                    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr] mt-8">
                        <div className="rounded-3xl bg-slate-950 text-white p-6 shadow-xl">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold">Contoh Respons AI</h2>
                                <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em]">WhatsApp Ready</span>
                            </div>

                            <div className="space-y-4">
                                <div className="rounded-2xl bg-white/6 border border-white/10 p-4">
                                    <p className="text-sm text-emerald-300 font-semibold mb-2">Commerce</p>
                                    <p className="text-sm text-white/90">
                                        📦 Beras Premium 5 Kg tersedia!
                                        <br />
                                        Stok: {products[0]?.stock ?? '-'} {products[0]?.unit ?? 'karung'}
                                        <br />
                                        Harga: {products[0] ? formatCurrency(products[0].price) : '-'}
                                    </p>
                                </div>
                                <div className="rounded-2xl bg-white/6 border border-white/10 p-4">
                                    <p className="text-sm text-amber-300 font-semibold mb-2">Poin</p>
                                    <p className="text-sm text-white/90">
                                        🏆 Info Poin Kamu
                                        <br />
                                        Level: Silver
                                        <br />
                                        Total Poin: {points} poin
                                    </p>
                                </div>
                                <div className="rounded-2xl bg-white/6 border border-white/10 p-4">
                                    <p className="text-sm text-cyan-300 font-semibold mb-2">RAT</p>
                                    <p className="text-sm text-white/90">
                                        📋 {agenda?.title ?? 'Belum ada RAT'}
                                        <br />
                                        Ringkasan: {agenda?.summary ?? '-'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                                <h2 className="text-lg font-bold mb-4">Produk Seed</h2>
                                <div className="space-y-3">
                                    {products.map((product) => (
                                        <div key={product.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                                            <div>
                                                <p className="font-semibold">{product.name}</p>
                                                <p className="text-sm text-slate-500">{product.stock} {product.unit}</p>
                                            </div>
                                            <p className="font-bold text-emerald-700">{formatCurrency(product.price)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                                <h2 className="text-lg font-bold mb-4">Kopdes Community</h2>
                                <div className="space-y-4">
                                    {posts.map((post) => (
                                        <div key={post.id} className="rounded-2xl border border-slate-200 p-4">
                                            <p className="font-semibold">{post.title}</p>
                                            <p className="text-sm text-slate-600 mt-2">{post.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
