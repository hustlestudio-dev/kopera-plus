# Product Requirements Document (PRD)

# KOPERA AI
### AI-Powered Cooperative Engagement Platform

**Version:** 1.2 (Hackathon MVP — Revisi: e-RAT Depth, Kopdes Community, AI End-to-End)

> **Revisi stack (2026-07-11):** Bagian *Technology Stack* di bawah diperbarui agar mencerminkan implementasi nyata (Laravel 13 + Inertia React + PostgreSQL). Draft v1.2 sebelumnya mencantumkan Flutter / Next.js / FastAPI yang tidak terpakai. Komponen AI saat ini masih berupa *illustration* client-side (belum terhubung ke model tertentu); lihat `docs/ai-disclosure.md`.

---

# Changelog dari v1.1

| Area | Perubahan |
|---|---|
| e-RAT | Tetap sub-fitur di bawah Smart Governance Dashboard, ditambah kedalaman: tahapan proses, jenis agenda, mekanisme kuorum, dan status hukum yang jelas (advisory/facilitation tool, bukan sistem voting yang menggantikan keabsahan hukum RAT konvensional) |
| Kopdes Community | Fitur baru — jaringan antar-koperasi desa/KUD se-wilayah. Scope MVP dibatasi (direktori + knowledge sharing), fitur network-level penuh masuk Phase 2 |
| AI End-to-End | AI touchpoint dipetakan eksplisit di setiap tahap member journey, dari onboarding sampai governance — bukan hanya di AI Chat Assistant |

**Catatan kepastian hukum:** Status hukum e-voting untuk RAT koperasi (apakah bisa menggantikan RAT tatap muka secara sah menurut UU Perkoperasian/Permenkop terkini) **perlu verifikasi lebih lanjut** sebelum PRD ini dipakai di luar konteks hackathon demo. Dokumen ini menulis e-RAT sebagai *facilitation & transparency tool*, bukan pengganti legal RAT konvensional, kecuali ada dasar hukum spesifik yang memvalidasinya.

---

# Executive Summary

KOPERA AI merupakan platform digital berbasis Artificial Intelligence yang dirancang untuk meningkatkan keterlibatan masyarakat dalam ekosistem koperasi.

Platform berfokus pada empat aspek utama:

- Meningkatkan minat masyarakat untuk bergabung menjadi anggota koperasi.
- Meningkatkan engagement anggota secara berkelanjutan.
- Meningkatkan transparansi dan partisipasi anggota dalam pengambilan keputusan (termasuk RAT).
- Menghubungkan koperasi desa (Kopdes/KUD) dalam satu jaringan untuk saling belajar dan berkolaborasi.

Berbeda dengan aplikasi koperasi konvensional, KOPERA AI menghadirkan pengalaman yang lebih personal melalui AI yang hadir di **seluruh member journey** — bukan hanya sebagai chatbot terpisah — didukung Gamification & Loyalty System, Smart Governance Dashboard dengan e-RAT yang lebih dalam, dan Kopdes Community sebagai jaringan antar-koperasi.

---

# Problem Statement

## Bagi Masyarakat
- Kurangnya pemahaman mengenai manfaat koperasi.
- Sulit menemukan koperasi yang sesuai.
- Rendahnya minat generasi muda bergabung.

## Bagi Anggota
- Aktivitas anggota menurun setelah bergabung.
- Motivasi mengikuti kegiatan koperasi rendah.
- Partisipasi RAT masih rendah — sering karena kendala jarak, waktu, atau pemahaman agenda yang rumit.

## Bagi Pengurus
- Sulit meningkatkan engagement anggota.
- Kurangnya transparansi.
- Sulit memperoleh insight dari data anggota.
- Minim akses ke praktik baik dari koperasi desa lain (tidak ada jaringan antar-Kopdes yang terstruktur).

## Bagi Ekosistem Koperasi Desa (Kopdes/KUD)
- Setiap koperasi desa bekerja secara terisolasi — tidak ada mekanisme berbagi data pasar, harga, atau praktik terbaik antar-Kopdes.
- Duplikasi masalah operasional yang sebenarnya sudah pernah dipecahkan koperasi lain di wilayah berbeda.

---

# Product Vision

Mewujudkan koperasi digital yang cerdas, transparan, dan berorientasi pada anggota — sekaligus menjadi simpul dari jaringan koperasi desa yang saling terhubung — melalui Artificial Intelligence.

---

# Goals

## Business Goals
- Meningkatkan anggota baru.
- Meningkatkan anggota aktif.
- Meningkatkan transaksi koperasi.
- Meningkatkan partisipasi RAT.
- Meningkatkan transparansi.
- Membangun jaringan Kopdes yang saling terhubung sebagai basis ekspansi Phase 2.

## User Goals
- Mudah bergabung dengan koperasi.
- Mendapat informasi secara cepat.
- Mendapat reward atas aktivitas.
- Berpartisipasi dalam keputusan koperasi (termasuk RAT) tanpa kendala jarak/waktu.
- (Pengurus) Terhubung dengan koperasi desa lain untuk belajar dan berkolaborasi.

---

# Target Users

## Primary
- Masyarakat
- Calon anggota
- Anggota koperasi

## Secondary
- Pengurus
- Admin koperasi
- Pengurus Kopdes/KUD lain dalam jaringan (kontributor & konsumen Kopdes Community)

---

# Core Features

1. AI Member Assistant (dengan AI Commerce Assistant)
2. Gamification & Loyalty System
3. Smart Governance Dashboard (termasuk e-RAT diperdalam)
4. **Kopdes Community** *(baru)*
5. **AI End-to-End Journey Layer** *(kerangka lintas fitur, bukan fitur berdiri sendiri)*

---

# AI End-to-End: Peta AI di Seluruh Member Journey

Ini bukan fitur tunggal, melainkan prinsip desain: AI hadir sebagai lapisan yang menyertai anggota dari titik pertama sentuh sampai partisipasi governance. Tabel berikut memetakan *di mana* dan *apa peran* AI pada tiap tahap, supaya tidak ada tahap yang "AI-nya cuma tempelan".

| Tahap Journey | Peran AI | Output ke User |
|---|---|---|
| **Awareness** | AI Recommendation — profiling minat & lokasi awal | Rekomendasi koperasi yang relevan |
| **Onboarding** | AI Onboarding — menjelaskan konsep koperasi, SHU, hak-kewajiban anggota | Panduan personal step-by-step |
| **Aktivasi (transaksi pertama)** | AI Commerce Assistant — validasi stok, harga, opsi antar/pick up | Konfirmasi pesanan real-time |
| **Engagement harian** | Engagement Analytics — deteksi pola aktivitas menurun, trigger notifikasi/reward | Rekomendasi aktivitas, reminder poin |
| **Partisipasi tata kelola** | e-RAT AI Summary — merangkum agenda RAT jadi bahasa sederhana, estimasi dampak keputusan ke anggota | Ringkasan agenda, simulasi dampak SHU |
| **Governance & keputusan** | Governance Insight — analisis partisipasi, deteksi anggota pasif untuk di-follow up pengurus | Insight ke pengurus, bukan ke anggota langsung |
| **Antar-koperasi (Kopdes Community)** | Cross-Kopdes Insight Engine — mencocokkan praktik baik dari Kopdes lain yang relevan dengan kondisi koperasi user | Rekomendasi praktik/kebijakan dari Kopdes lain |

**Prinsip desain:** setiap tahap di atas wajib punya minimal satu AI touchpoint yang terukur (bisa displayed ke user atau insight ke pengurus). Kalau tidak ada, tahap tersebut dianggap belum "AI end-to-end" dan perlu direvisi sebelum rilis.

---

# 1. AI Member Assistant

## Objective

Membantu masyarakat memahami koperasi, menemukan koperasi yang sesuai, serta membantu proses transaksi anggota secara cerdas.

## Features

- AI Chat Assistant
- AI Onboarding
- AI Recommendation
- FAQ Otomatis
- Rekomendasi Program
- AI Commerce Assistant

## User Flow

Pengguna membuka aplikasi → Registrasi → AI melakukan profiling → AI memberikan rekomendasi koperasi → Pengguna bergabung menjadi anggota → Menggunakan layanan AI untuk informasi maupun transaksi

## AI Capabilities

AI mampu menjawab:
- Apa itu koperasi?
- Apa keuntungan menjadi anggota?
- Bagaimana sistem SHU?
- Koperasi mana yang cocok?
- Program apa yang tersedia?

---

## AI Commerce Assistant

Sub-fitur yang membantu anggota melakukan pembelian produk koperasi secara aman, cepat, dan transparan.

### Capabilities
- Mengecek stok produk secara real-time.
- Menampilkan harga produk.
- Memvalidasi jumlah pesanan.
- Memberikan pilihan **Diantar** atau **Pick Up**.
- Menghitung estimasi pengiriman.
- Memberikan rekomendasi produk alternatif apabila stok habis.
- Mengirim notifikasi saat stok kembali tersedia.
- Mengonfirmasi pesanan sebelum diteruskan ke pengurus.

### Sample Conversation

**User**
> Saya ingin membeli Beras Premium 5 Kg.

**AI**
> Produk tersedia.
> Stok: **24**
> Harga: **Rp75.000**
> Apakah ingin diantar ke rumah atau diambil di koperasi?

**User**
> Diantar ke rumah.

**AI**
> Estimasi tiba 30 menit.
> Total pembayaran Rp78.000.
> Konfirmasi pesanan?

### Benefits
- Mengurangi kekecewaan karena stok habis.
- Mengurangi pesanan gagal.
- Mempercepat proses transaksi.
- Meningkatkan kepuasan anggota.
- Membantu pengurus mengurangi konfirmasi manual.

---

# 2. Gamification & Loyalty System

## Objective
Meningkatkan engagement anggota.

### Point System
Poin diberikan untuk: Transaksi, Mengikuti RAT, Pelatihan, Mengajak anggota baru, Event, Melengkapi profil.

### Level
Bronze → Silver → Gold → Platinum → Village Hero

### Badge
First Transaction, Active Member, Community Hero, Top Contributor, Early Supporter

### Rewards
Voucher, Diskon, Produk UMKM, Sembako, Bibit, Pupuk

---

# 3. Smart Governance Dashboard

Menggabungkan Dashboard Transparansi dan **e-RAT (Digital Voting/RAT)** yang diperdalam.

## Dashboard
- Jumlah anggota
- Anggota aktif
- Transaksi
- SHU
- Statistik partisipasi
- Ringkasan keuangan

---

## e-RAT — Detail Kedalaman (Diperdalam dari v1.1)

**Status fitur:** e-RAT tetap merupakan sub-fitur di bawah Smart Governance Dashboard, bukan produk berdiri sendiri. Fokus kedalaman ada pada proses, bukan mengubah posisinya di arsitektur produk.

**Penting — batasan status hukum:** e-RAT dalam MVP ini diposisikan sebagai *facilitation & transparency tool* untuk mempermudah persiapan, penyampaian informasi, dan pencatatan preferensi anggota terkait RAT. Ini **belum tentu** menggantikan keabsahan hukum RAT konvensional sesuai AD/ART dan UU Perkoperasian — [Medium confidence, needs verification] status hukum e-voting koperasi harus dicek ke regulasi terbaru (UU Perkoperasian & Permenkop) sebelum diklaim sebagai pengganti sah RAT tatap muka.

### Tahapan Proses e-RAT

1. **Pra-RAT**
   - Pengurus mengunggah agenda, dokumen pendukung (laporan keuangan, rencana kerja).
   - AI menghasilkan ringkasan agenda dalam bahasa sederhana + estimasi dampak ke anggota (misal: proyeksi SHU per anggota jika opsi A vs opsi B dipilih).
   - Sistem mengirim notifikasi H-7, H-3, H-1 ke seluruh anggota terdaftar.

2. **Registrasi Kehadiran**
   - Anggota check-in digital (untuk RAT hybrid: online + tatap muka).
   - Sistem menghitung kuorum secara real-time berdasarkan jumlah anggota terdaftar vs yang hadir/check-in.
   - **Mekanisme kuorum:** kuorum dianggap tercapai jika memenuhi ambang batas sesuai AD/ART masing-masing koperasi (default umum: >50% anggota terdaftar, dapat dikonfigurasi per koperasi karena AD/ART bisa berbeda). Sistem menampilkan status kuorum secara live agar pengurus tahu kapan RAT bisa dimulai secara sah.

3. **Jenis Agenda yang Didukung**
   - Laporan pertanggungjawaban pengurus/pengawas.
   - Pengesahan rencana kerja & anggaran.
   - Pembagian SHU.
   - Perubahan AD/ART.
   - Pemilihan pengurus/pengawas.
   - Agenda lain sesuai kebutuhan koperasi (kustom).

   *Catatan:* Tidak semua jenis agenda di atas cocok untuk voting digital murni (misal perubahan AD/ART sering membutuhkan musyawarah mendalam, bukan sekadar klik). Sistem membedakan agenda **votable** (SHU, rencana kerja) vs agenda **discussion-only** (perubahan AD/ART) — untuk yang terakhir, e-RAT hanya memfasilitasi diskusi & pengumpulan input, keputusan akhir tetap lewat musyawarah/RAT formal.

4. **Voting**
   - Prinsip 1 anggota = 1 suara (sesuai prinsip dasar koperasi, bukan proporsional modal), kecuali AD/ART koperasi menentukan lain.
   - Anggota memilih via aplikasi; opsi voting terbuka atau rahasia (dikonfigurasi per agenda, misal pemilihan pengurus biasanya rahasia).
   - Sistem mencatat audit trail (siapa vote, kapan — bukan pilihannya jika rahasia) untuk keperluan legalitas dan audit internal.

5. **Hasil & Tindak Lanjut**
   - Hasil ditampilkan real-time setelah voting window ditutup.
   - AI menghasilkan ringkasan hasil + rekomendasi tindak lanjut ke pengurus (misal: partisipasi rendah dari anggota di wilayah X, perlu pendekatan khusus).
   - Hasil RAT diarsipkan otomatis sebagai dokumen resmi (untuk keperluan pelaporan ke Dinas Koperasi).

### AI Insight untuk e-RAT
- Prediksi partisipasi RAT berdasarkan histori (siapa yang cenderung tidak hadir, kapan waktu terbaik).
- Deteksi agenda yang berpotensi kontroversial berdasarkan pola respons awal, agar pengurus siap menjelaskan lebih detail.
- Ringkasan otomatis hasil RAT dalam bahasa non-teknis untuk disebarkan ke seluruh anggota (termasuk yang tidak hadir).

---

# 4. Kopdes Community *(Fitur Baru)*

## Objective
Menghubungkan koperasi desa (Kopdes/KUD) dalam satu jaringan regional untuk berbagi praktik baik, informasi pasar, dan kolaborasi — tanpa menghilangkan otonomi masing-masing koperasi.

## Konteks & Batasan Scope (Penting)

Ini adalah fitur dengan kompleksitas tertinggi di PRD ini karena mengubah produk dari aplikasi single-cooperative menjadi jaringan multi-koperasi. Untuk kelayakan hackathon/MVP, scope dibagi tegas:

### MVP (Phase 1) — yang realistis dibangun sekarang
- **Direktori Kopdes**: daftar koperasi desa lain dalam jaringan (nama, lokasi, jumlah anggota, jenis usaha/komoditas utama) — read-only, tanpa transaksi lintas koperasi.
- **Knowledge Sharing Board**: forum/papan berbagi praktik baik antar-pengurus Kopdes (misal: "Bagaimana Kopdes kami menaikkan partisipasi RAT jadi 80%").
- **Cross-Kopdes Insight (AI, terbatas)**: AI merekomendasikan 1-3 praktik dari Kopdes lain yang relevan dengan kondisi koperasi user, berdasarkan data yang **secara eksplisit dibagikan secara publik** oleh Kopdes lain (bukan data privat/transaksi).

### Eksplisit BUKAN scope MVP (masuk Phase 2/3, butuh kerja tambahan signifikan)
- Transaksi lintas-koperasi (misal anggota Kopdes A beli produk dari Kopdes B).
- Agregasi data pasar/harga real-time antar-Kopdes (butuh data-sharing agreement formal antar entitas hukum berbeda).
- Keputusan bersama/governance lintas-Kopdes.
- Integrasi dengan sistem pemerintah (SIMKOPDES) untuk data resmi jaringan.

**Alasan pembatasan ini:** setiap poin di atas melibatkan isu non-teknis yang tidak bisa diselesaikan dalam siklus hackathon — perjanjian data antar entitas hukum terpisah, model bisnis siapa yang menanggung biaya infrastruktur jaringan, dan tata kelola data agregat. Menjanjikan ini sebagai "sudah ada" ke juri berisiko overselling sesuatu yang tidak dibangun.

## User Flow (MVP)

Pengurus Kopdes membuka menu Kopdes Community → Melihat direktori Kopdes lain di wilayah → Membaca/memposting praktik baik di Knowledge Sharing Board → AI merekomendasikan insight relevan berdasarkan kondisi Kopdes sendiri → Pengurus mengadaptasi praktik ke koperasinya

## Roadmap Kopdes Community

| Phase | Cakupan |
|---|---|
| Phase 1 (MVP) | Direktori read-only + Knowledge Sharing Board + AI Insight terbatas (data publik saja) |
| Phase 2 | Marketplace UMKM lintas-Kopdes, data-sharing agreement formal, agregasi harga/pasar regional |
| Phase 3 | Integrasi SIMKOPDES, business intelligence lintas-jaringan, keputusan kolektif berbasis data |

---

# User Journey (Diperbarui)

Masyarakat → Download KOPERA AI → AI Member Assistant → Menjadi Anggota → Bertanya mengenai produk → AI Commerce Assistant memvalidasi stok → Pilih antar/pick up → Konfirmasi pesanan → Mendapat reward → Naik level → Mengikuti e-RAT (dengan AI ringkasan agenda & simulasi dampak) → Melihat dashboard transparansi → Menjadi anggota aktif

*(Jalur khusus Pengurus)*
Pengurus → Mengelola e-RAT (agenda, kuorum, hasil) → Membuka Kopdes Community → Melihat/berbagi praktik baik dengan Kopdes lain → Mengadaptasi insight ke koperasi sendiri

---

# AI Components

- AI Chat Assistant
- Recommendation Engine
- Engagement Analytics
- Governance Insight (termasuk e-RAT AI Summary & prediksi partisipasi)
- AI Commerce Assistant
- **Cross-Kopdes Insight Engine** *(baru — untuk Kopdes Community)*

---

# Success Metrics

| KPI | Target |
|---|---|
| Anggota Baru | +30% |
| Anggota Aktif | +40% |
| Partisipasi RAT | >70% |
| Kuorum e-RAT tercapai tepat waktu | >90% dari RAT yang dijadwalkan |
| Transaksi | +25% |
| Kepuasan Pengguna | >90% |
| Jumlah Kopdes bergabung ke jaringan (MVP) | Target ditentukan sesuai wilayah pilot |
| Praktik baik dibagikan di Knowledge Sharing Board | Minimal 1 post per Kopdes aktif/bulan |

---

# Technology Stack (Revisi — implementasi nyata)

## Frontend
- Inertia.js v3 + React 19 + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Flux UI (Livewire v4) untuk admin / WhatsApp
- Komponen gaya shadcn (Radix UI), ikon Lucide, toast Sonner

## Backend
- Laravel 13 (PHP 8.3)
- Laravel Fortify (auth: login, register, 2FA, verifikasi email)
- Spatie Laravel Permission (RBAC platform) + enum `UserRole` / `TeamRole`
- Laravel Wayfinder (route ter-strong-typed ke frontend)
- `kstmostofa/laravel-whatsapp` (kabar/engagement via WhatsApp: Meta Cloud API + whatsapp-web.js)
- Laravel Boost MCP + Chisel (tooling developer)

## Database
- PostgreSQL (produksi / live) —restore dari `docs/backup-hackathon_*.sql`
- SQLite (dev lokal, fallback)
- Eloquent ORM; ~30 tabel referensi SIMKOPDES (`koperasi_ref` sebagai kunci hub)

## AI
- AI Member Assistant & Insight: saat ini *heuristic* client-side (mock); desain touchpoint ada di peta AI End-to-End
- Integrasi LLM API direncanakan (lihat `docs/ai-disclosure.md`) — belum live di MVP

## Cloud / Hosting
- Hosting mandiri + PostgreSQL (aplikasi sudah live)
- Tidak wajib Docker; setup di `README.md` (dev lokal tanpa deploy)

---

# Roadmap

## Phase 1
- AI Member Assistant (dengan AI Commerce Assistant)
- Loyalty System
- Smart Governance Dashboard + e-RAT (versi diperdalam, facilitation-only)
- Kopdes Community (direktori + knowledge sharing, scope terbatas)

## Phase 2
- Marketplace UMKM (termasuk lintas-Kopdes)
- Community Platform (anggota-ke-anggota, terpisah dari Kopdes Community yang antar-pengurus)
- AI Engagement Prediction
- QRIS
- Data-sharing agreement formal antar-Kopdes

## Phase 3
- SIMKOPDES Integration
- Predictive Analytics
- Business Intelligence lintas-jaringan Kopdes

---

# Unique Value Proposition

KOPERA AI menghadirkan **AI-Driven Cooperative Growth Loop** — siklus peningkatan engagement melalui AI yang hadir di seluruh member journey (bukan sekadar chatbot terpisah), e-RAT yang memperjelas dan mempermudah proses tata kelola tanpa mengklaim menggantikan legalitas RAT konvensional, serta Kopdes Community yang membuka jalur kolaborasi antar-koperasi desa — dimulai dari berbagi pengetahuan sebelum melangkah ke integrasi data yang lebih dalam.

---

# Closing

KOPERA AI bukan sekadar aplikasi digital koperasi, tetapi platform yang membantu masyarakat bergabung, aktif berpartisipasi (termasuk dalam RAT), bertransaksi dengan nyaman, dan membangun koperasi yang transparan serta terhubung dengan jaringan koperasi desa lain — melalui Artificial Intelligence yang hadir di setiap tahap perjalanan anggota.

---

# Catatan Verifikasi (untuk dibaca sebelum presentasi)

1. **[Perlu verifikasi]** Status hukum e-voting untuk RAT koperasi — cek UU Perkoperasian & Permenkop terbaru sebelum mengklaim e-RAT sebagai pengganti sah RAT tatap muka di depan juri atau pihak regulator.
2. **[Perlu verifikasi]** Ambang kuorum yang ditulis (>50%) adalah asumsi umum, bukan angka pasti — tiap koperasi punya AD/ART sendiri, sebaiknya dikonfirmasi ke koperasi mitra pilot.
3. Kopdes Community sengaja ditulis dengan scope MVP yang sempit — saat presentasi ke juri, jangan overclaim fitur Phase 2/3 sebagai sudah berfungsi.
