import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    BookOpen,
    Globe,
    MessageSquare,
    Plus,
    ThumbsUp,
    Users,
    X,
} from 'lucide-react';
import { useState } from 'react';

interface CommunityPostItem {
    id: number;
    title: string;
    content: string;
    category: string;
    likes: number;
    comments_count: number;
    created_at: string;
    user?: { name: string };
}

interface DirectoryItem {
    koperasi_ref: string;
    nama_koperasi: string | null;
    bentuk_koperasi: string | null;
    kategori_usaha: string | null;
}

interface CommunityProps {
    posts: {
        data: CommunityPostItem[];
        current_page: number;
        last_page: number;
        total: number;
    };
    directory: DirectoryItem[];
}

type TabKey = 'knowledge' | 'directory';

const CATEGORY_STYLES: Record<string, { bg: string; text: string; label: string }> = {
    praktik_baik: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Praktik Baik' },
    pertanyaan: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Pertanyaan' },
    insight: { bg: 'bg-purple-50', text: 'text-purple-700', label: 'Insight' },
};

function CategoryBadge({ category }: { category: string }) {
    const style = CATEGORY_STYLES[category] ?? {
        bg: 'bg-slate-50',
        text: 'text-slate-700',
        label: category,
    };

    return (
        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${style.bg} ${style.text}`}>
            {style.label}
        </span>
    );
}

function PostCard({ post }: { post: CommunityPostItem }) {
    const like = useForm({});

    const handleLike = () => {
        like.post(`/community/${post.id}/like`, { preserveScroll: true });
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                        {post.user?.name?.charAt(0) ?? '?'}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-900">{post.user?.name ?? 'Anonim'}</p>
                        <p className="text-[10px] text-slate-400">{post.created_at}</p>
                    </div>
                </div>
                <CategoryBadge category={post.category} />
            </div>

            <h3 className="mt-3 text-base font-bold text-slate-900">{post.title}</h3>
            <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-slate-600">{post.content}</p>

            <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-3">
                <button
                    type="button"
                    onClick={handleLike}
                    disabled={like.processing}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition-colors hover:text-indigo-600"
                >
                    <ThumbsUp className="h-4 w-4" />
                    {post.likes}
                </button>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <MessageSquare className="h-4 w-4" />
                    {post.comments_count}
                </span>
            </div>
        </div>
    );
}

function NewPostForm({ onClose }: { onClose: () => void }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
        category: 'praktik_baik',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/community', {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">Bagikan Praktik Baik</h3>
                <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
                    <X className="h-5 w-5" />
                </button>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">Judul</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                        placeholder="Judul postingan..."
                    />
                    {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">Kategori</label>
                    <select
                        value={data.category}
                        onChange={(e) => setData('category', e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                    >
                        <option value="praktik_baik">Praktik Baik</option>
                        <option value="pertanyaan">Pertanyaan</option>
                        <option value="insight">Insight</option>
                    </select>
                    {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-700">Konten</label>
                    <textarea
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        rows={4}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
                        placeholder="Tulis konten Anda di sini..."
                    />
                    {errors.content && <p className="mt-1 text-xs text-red-600">{errors.content}</p>}
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 disabled:opacity-50"
                    >
                        Kirim
                    </button>
                </div>
            </form>
        </div>
    );
}

export default function Community({ posts, directory }: CommunityProps) {
    const [activeTab, setActiveTab] = useState<TabKey>('knowledge');
    const [showForm, setShowForm] = useState(false);

    const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
        { key: 'knowledge', label: 'Papan Pengetahuan', icon: <BookOpen className="h-4 w-4" /> },
        { key: 'directory', label: 'Direktori Kopdes', icon: <Globe className="h-4 w-4" /> },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <Head title="Komunitas Kopdes | KOPERA-PLUS" />

            <div className="mx-auto max-w-4xl px-4 py-8">
                <Link
                    href="/dashboard"
                    className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-800"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Dashboard
                </Link>

                <header className="mb-8">
                    <div className="flex items-center gap-2 text-indigo-700">
                        <Users className="h-6 w-6" />
                        <h1 className="text-2xl font-bold text-slate-900">Kopdes Community</h1>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                        Berbagi pengetahuan dan terhubung dengan koperasi desa lainnya.
                    </p>
                </header>

                <div className="mb-6 flex gap-1 rounded-xl border border-slate-200 bg-white p-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                                activeTab === tab.key
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : 'text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {activeTab === 'knowledge' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500">{posts.total} postingan</p>
                            <button
                                type="button"
                                onClick={() => setShowForm(!showForm)}
                                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700"
                            >
                                <Plus className="h-4 w-4" />
                                Bagikan Praktik Baik
                            </button>
                        </div>

                        {showForm && <NewPostForm onClose={() => setShowForm(false)} />}

                        {posts.data.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                                <BookOpen className="mx-auto h-10 w-10 text-slate-300" />
                                <p className="mt-3 text-sm font-medium text-slate-500">
                                    Belum ada postingan. Jadilah yang pertama berbagi praktik baik!
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {posts.data.map((post) => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                            </div>
                        )}

                        {posts.last_page > 1 && (
                            <div className="flex items-center justify-center gap-2 pt-2">
                                {Array.from({ length: posts.last_page }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        type="button"
                                        onClick={() => router.get('/community', { page }, { preserveScroll: true })}
                                        className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                                            page === posts.current_page
                                                ? 'bg-indigo-600 text-white'
                                                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'directory' && (
                    <div>
                        {directory.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                                <Globe className="mx-auto h-10 w-10 text-slate-300" />
                                <p className="mt-3 text-sm font-medium text-slate-500">Belum ada data koperasi</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {directory.map((item) => (
                                    <div
                                        key={item.koperasi_ref}
                                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                                    >
                                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                            <Globe className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-sm font-bold text-slate-900">
                                            {item.nama_koperasi ?? item.koperasi_ref}
                                        </h3>
                                        {item.bentuk_koperasi && (
                                            <p className="mt-1 text-xs text-slate-500">{item.bentuk_koperasi}</p>
                                        )}
                                        {item.kategori_usaha && (
                                            <span className="mt-2 inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-600">
                                                {item.kategori_usaha}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
