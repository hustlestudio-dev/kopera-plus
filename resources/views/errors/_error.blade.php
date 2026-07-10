@php
    /** @var \Symfony\Component\HttpKernel\Exception\HttpExceptionInterface $exception */
    $status = $exception->getStatusCode();

    $map = [
        400 => [
            'title' => 'Permintaan tidak dapat diproses',
            'desc' => 'Sebagian informasi yang dikirim tidak sesuai format. Periksa kembali lalu coba lagi.',
            'tone' => '#b45309',
        ],
        401 => [
            'title' => 'Kamu belum masuk',
            'desc' => 'Halaman ini hanya bisa diakses setelah masuk. Silakan login untuk melanjutkan.',
            'tone' => '#0284c7',
        ],
        403 => [
            'title' => 'Akses ditolak',
            'desc' => 'Kamu tidak memiliki izin untuk membuka halaman ini. Jika merasa ini salah, hubungi tim kami.',
            'tone' => '#be123c',
        ],
        404 => [
            'title' => 'Halaman tidak ditemukan',
            'desc' => 'Tautan yang kamu buka mungkin sudah dipindahkan atau belum tersedia. Coba cari dari beranda.',
            'tone' => '#0284c7',
        ],
        405 => [
            'title' => 'Aksi tidak diizinkan',
            'desc' => 'Metode yang digunakan untuk membuka halaman ini tidak didukung. Coba kembali ke halaman sebelumnya.',
            'tone' => '#b45309',
        ],
        419 => [
            'title' => 'Sesi telah berakhir',
            'desc' => 'Demi keamanan, sesi kamu telah berakhir. Muat ulang halaman ini untuk kembali melanjutkan.',
            'tone' => '#b45309',
        ],
        429 => [
            'title' => 'Terlalu banyak permintaan',
            'desc' => 'Kamu melakukan terlalu banyak permintaan dalam waktu singkat. Tarik napas sejenak, lalu coba lagi.',
            'tone' => '#b45309',
        ],
        409 => [
            'title' => 'Sesi telah berakhir',
            'desc' => 'Demi keamanan, sesi kamu telah berakhir. Muat ulang halaman ini untuk kembali melanjutkan.',
            'tone' => '#b45309',
        ],
        500 => [
            'title' => 'Ada gangguan di sistem',
            'desc' => 'Sistem sedang mengalami kendala sementara. Tim kami sudah mengetahuinya dan sedang menanganinya.',
            'tone' => '#be123c',
        ],
        503 => [
            'title' => 'Sedang dalam pemeliharaan',
            'desc' => 'Kami sedang memperbarui sistem agar lebih baik untukmu. Silakan kembali beberapa saat lagi.',
            'tone' => '#0284c7',
        ],
    ];

    $c = $map[$status] ?? $map[500];
@endphp
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $status }} – {{ $c['title'] }}</title>
    <style>
        :root { color-scheme: light dark; }
        * { box-sizing: border-box; }
        body {
            margin: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
            background: linear-gradient(180deg, #ffffff, #f8fafc);
            color: #0f172a;
        }
        .card {
            width: 100%;
            max-width: 28rem;
            text-align: center;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.06);
        }
        .brand {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 600;
            letter-spacing: -0.01em;
            color: #334155;
            margin-bottom: 1.75rem;
        }
        .brand .mark {
            width: 2rem;
            height: 2rem;
            border-radius: 0.5rem;
            background: #4f46e5;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-weight: 700;
            font-size: 0.875rem;
        }
        .badge {
            width: 3.5rem;
            height: 3.5rem;
            border-radius: 9999px;
            margin: 0 auto 1.25rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1.25rem;
            color: #fff;
            background: {{ $c['tone'] }};
        }
        .code {
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: {{ $c['tone'] }};
        }
        h1 {
            font-size: 1.375rem;
            margin: 0.25rem 0 0.5rem;
            font-weight: 600;
            letter-spacing: -0.01em;
        }
        p {
            margin: 0;
            font-size: 0.9rem;
            line-height: 1.55;
            color: #64748b;
        }
        .actions {
            margin-top: 1.75rem;
            display: flex;
            gap: 0.5rem;
            justify-content: center;
            flex-wrap: wrap;
        }
        a.btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            font-weight: 500;
            text-decoration: none;
            transition: background 0.15s ease, border-color 0.15s ease;
        }
        .btn-primary { background: #4f46e5; color: #fff; }
        .btn-primary:hover { background: #4338ca; }
        .btn-ghost { background: #fff; color: #334155; border: 1px solid #e2e8f0; }
        .btn-ghost:hover { background: #f8fafc; }
        .foot {
            margin-top: 1.5rem;
            font-size: 0.75rem;
            color: #94a3b8;
        }
    </style>
</head>
<body>
    <main class="card">
        <div class="brand">
            <span class="mark">K</span>
            <span>KOPERA-PLUS</span>
        </div>

        <div class="badge">{{ $status }}</div>
        <div class="code">Kode {{ $status }}</div>

        <h1>{{ $c['title'] }}</h1>
        <p>{{ $c['desc'] }}</p>

        <div class="actions">
            <a class="btn btn-ghost" href="javascript:history.back()">Kembali</a>
            <a class="btn btn-primary" href="/">Ke beranda</a>
        </div>

        <p class="foot">Butuh bantuan? Tim kami siap membantu jika kendala berlanjut.</p>
    </main>
</body>
</html>
