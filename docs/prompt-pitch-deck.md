# PROMPT — Pitch Deck PDF (KOPERA AI / KOPERA-PLUS)

Salin seluruh isi di bawah ini dan berikan ke agent lain. Prompt sudah lengkap dan mandiri; agent dijalankan dengan akses tool baca-file, tulis-file, dan shell di working directory repo ini.

---

## PERAN & TUJUAN

Kamu adalah agent pembuat pitch deck untuk kompetisi. Tugasmu: menghasilkan satu file **`docs/pitch-deck.pdf`** — pitch deck 10–12 slide, Bahasa Indonesia, untuk **Hackathon Digital Cooperatives Expo 2026 — Kementerian Koperasi RI, Tema 3: Peningkatan Keterlibatan Masyarakat dalam Berkoperasi**. Deck harus bisa **disampaikan tuntas dalam 5 menit** (rata-rata 25–30 detik per slide). Kamu tidak boleh mengklaim fitur yang belum jadi sebagai sudah jadi (anti-overclaim, ada catatan verifikasi di bawah).

## LANGKAH WAJIB SEBELUM MENULIS

1. Baca sumber kebenaran repo ini dulu (jangan mengarang isi):
   - `README.md`, `docs/prd.md`, `docs/architecture.md`, `docs/data-model.md`, `docs/ai-disclosure.md`
   - `docs/modules/ai-member-assistant.md`, `docs/modules/e-rat-governance.md`, `docs/modules/kopdes-community.md`, `docs/modules/gamification-loyalty.md`
   - `todolist.md` (status modul M1–M16, milestone CUKUP/BAIK/SEMPURNA)
   - `app/Services/HackathonData.php` (sumber KPI nyata), `app/Http/Controllers/AdminDashboardController.php`, `routes/web.php`, `database/seeders/UserSeeder.php` (kredensial demo)
2. Kalau ada koneksi PostgreSQL live, jalankan query KPI dari `docs/data-model.md` untuk mendapat **angka nyata** (total koperasi, anggota, transaksi selesai + sum, partisipasi RAT). Jika DB tidak tersedia, tulis KPI sebagai placeholder berlabel jelas `[isi dari query live]` — JANGAN karang angka seperti `4.821` atau `Rp24.8M`.

## FAKTA PRODUK (pakai ini, jangan menyimpang)

- Nama produk: **KOPERA AI** (repo: KOPERA-PLUS). Tagline inti: *AI-Powered Cooperative Engagement Platform*.
- Masalah: (a) masyarakat kurang paham & sulit menemukan koperasi, minat generasi muda rendah; (b) anggota pasif setelah bergabung, partisipasi RAT rendah (jarak/waktu/agenda rumit); (c) pengurus sulit menaikkan engagement & minim insight; (d) Kopdes/KUD bekerja terisolasi, tidak ada jaringan berbagi praktik baik.
- Solusi 4 pilar + 1 lapisan:
  1. **AI Member Assistant** (chat, onboarding, rekomendasi, FAQ, + AI Commerce Assistant: cek stok/harga, validasi jumlah, antar/pick up, konfirmasi pesanan).
  2. **Gamification & Loyalty** (poin; level Bronze→Silver→Gold→Platinum→Village Hero; badge First Transaction/Active Member/Community Hero/Top Contributor/Early Supporter; reward voucher/diskon/sembako/bibit/pupuk).
  3. **Smart Governance Dashboard + e-RAT** (KPI transparan + fasilitasi RAT digital).
  4. **Kopdes Community** (direktori antar-Kopdes + knowledge sharing board + cross-Kopdes insight, MVP terbatas).
  5. **AI End-to-End Journey Layer** (AI hadir di tiap tahap: Awareness→Onboarding→Aktivasi→Engagement→Tata kelola→Antar-koperasi).
- Peran pengguna: **Explorer** (masyarakat), **Member** (anggota), **Administrator** (pengurus). Kredensial demo: `explorer@mail.com`, `member@mail.com`, `administrator@mail.com`, password `HustleJuara#123`.
- Tech stack nyata: Laravel 13 (PHP 8.3), Inertia v3 + React 19 + TS, Tailwind v4, Fortify (auth+2FA), Spatie Permission (RBAC), Wayfinder, `kstmostofa/laravel-whatsapp` (engagement), PostgreSQL (data referensi SIMKOPDES ~30 tabel via `koperasi_ref`), SQLite dev. Aplikasi sudah live di hosting mandiri.
- UVP: **AI-Driven Cooperative Growth Loop** — AI di seluruh member journey + e-RAT yang mempermudah tata kelola tanpa mengklaim menggantikan legalitas RAT + Kopdes Community sebagai jalur kolaborasi antar-koperasi desa.
- Success metrics (target): Anggota Baru +30%, Anggota Aktif +40%, Partisipasi RAT >70%, Transaksi +25%, Kepuasan >90%.

## CATATAN VERIFIKASI / ANTI-OVERCLAIM (WAJIB dipatuhi di deck)

- Komponen AI di MVP masih **heuristic client-side / mock**; integrasi LLM **direncanakan, belum live**. Slide AI harus jujur: sebut "peta AI end-to-end + MVP heuristik, integrasi LLM roadmap".
- **e-RAT = facilitation & transparency tool**, BUKAN pengganti sah RAT konvensional. Status hukum e-voting perlu verifikasi UU Perkoperasian/Permenkop. Tampilkan disclaimer singkat di slide governance.
- **Kopdes Community** scope MVP sempit (direktori + knowledge board + insight agregat publik). Jangan klaim marketplace/BI lintas-jaringan (itu Phase 2/3).
- **SHU tidak punya kolom numerik** di data dump — jangan tampilkan angka SHU palsu; kalau perlu, sebut "estimasi berlabel".
- Privasi: hanya tampilkan agregat, tidak ada PII (NIK/HP/email) di deck.
- AI disclosure (TOR Aturan J): ide inti karya tim; AI generatif dipakai sebagai alat bantu kode/dokumentasi. Sertakan 1 baris disclosure di slide penutup.

## STRUKTUR SLIDE (10–12 slide, ± detik untuk total 5 menit)

1. **Cover** (~15s): logo/nama KOPERA AI, tagline, "Hackathon Digital Cooperatives Expo 2026 — Tema 3", nama tim. 
2. **Masalah** (~35s): 3–4 poin masalah nyata (masyarakat/anggota/pengurus/Kopdes) — konkret, angka bila ada.
3. **Solusi & UVP** (~30s): 1 kalimat besar (AI-Driven Cooperative Growth Loop) + 4 pilar sebagai ikon/kata kunci.
4. **AI End-to-End Journey** (~35s): diagram 6 tahap journey + peran AI tiap tahap (jujur: sebagian mock).
5. **Fitur 1 — AI Member & Commerce Assistant** (~30s): 3 bullet + 1 sample chat mini.
6. **Fitur 2 — Gamification & Loyalty** (~25s): poin/level/badge/reward, kenapa naikkan engagement.
7. **Fitur 3 — Smart Governance + e-RAT** (~35s): KPI transparan + tahapan e-RAT + disclaimer facilitation-only.
8. **Fitur 4 — Kopdes Community** (~25s): direktori + knowledge board + insight agregat (scope MVP jelas).
9. **Arsitektur & Data** (~30s): diagram ringkas 3 role → Laravel/Inertia → PostgreSQL SIMKOPDES + WhatsApp; sebut stack utama.
10. **Traksi/Status & KPI Target** (~30s): status implementasi jujur (apa yang sudah jalan vs roadmap) + tabel success metrics; angka KPI live bila ada.
11. **Roadmap & Dampak** (~20s): Phase 1/2/3 ringkas + dampak ke ekosistem koperasi.
12. **Penutup + CTA + Disclosure** (~15s): ajakan (demo live + kredensial 3 role), 1 baris AI disclosure, kontak/repo.

Jika terpaksa 10 slide, gabungkan (5+6) dan (11+12). Total durasi bicara harus ≤ 5 menit.

## GAYA VISUAL (STYLE PITCH DECK)

- **Format akhir: PDF landscape 16:9** (1920×1080 atau setara). Satu ide besar per slide.
- Estetika: bersih, modern, "koperasi + teknologi terpercaya". Hindari kesan AI-slop/generik.
- **Palet**: hijau koperasi sebagai warna utama (misal hijau daun/emerald), aksen emas/kuning hangat untuk highlight, netral abu gelap untuk teks di atas putih/off-white. Konsisten di semua slide.
- **Tipografi**: sans-serif tegas untuk heading (mis. Instrument Sans/Inter), body readable, ukuran cukup besar untuk proyeksi (heading ≥ 40pt, body ≥ 20pt). Maksimal ~6 baris teks per slide.
- **Data**: pakai kartu KPI besar + grafik sederhana (bar/line/donut). Angka dominan, label kecil. Gunakan data nyata; beri catatan sumber kecil.
- **Ikon**: gaya garis konsisten (Lucide-like). Tanpa emoji.
- **Diagram**: journey (horizontal 6 langkah) dan arsitektur (3 role → app → DB) dibuat rapi, panah jelas.
- **Footer** tiap slide: nama produk + nomor slide. Slide fitur yang masih mock diberi label kecil jujur ("MVP: heuristik", "roadmap: LLM").
- Bahasa: 100% Bahasa Indonesia, ringkas, kata kerja aktif, tanpa jargon berlebih. Tanpa emoji (aturan repo).

## CARA MEMBANGUN PDF (pilih jalur paling andal di environment)

- Utamakan jalur yang menghasilkan PDF vektor rapi. Opsi berurutan:
  1. Buat HTML/CSS satu file per slide (atau satu file multi-section 16:9) lalu render ke PDF via headless Chromium (mis. skill/tool Playwright yang tersedia: buka file → `pdf({ landscape: true, printBackground: true, width/height 16:9 })`).
  2. Alternatif: Markdown → deck (mis. Marp) bila tersedia, tetap 16:9 dengan tema warna di atas.
- Simpan sumber (HTML/MD) di `docs/` agar bisa diedit ulang, dan output final **`docs/pitch-deck.pdf`**.
- Jangan menambahkan dependency berat baru bila tool render sudah tersedia. Pakai yang paling sederhana yang menghasilkan PDF benar.

## VERIFIKASI SEBELUM SELESAI (WAJIB, bukan "sudah saya cek")

- Jalankan dan tunjukkan output: `ls -la docs/pitch-deck.pdf` (file ada, ukuran wajar > 0).
- Hitung jumlah halaman PDF dan pastikan **10–12** (mis. via `pdfinfo docs/pitch-deck.pdf` atau tool sejenis; jika tak ada, buka & hitung).
- Grep sumber deck untuk memastikan **tidak ada angka fiktif** yang biasa dipakai mock: `grep -RniE "4[.,]821|24[.,]8M|Rp24" docs/` → harus kosong (kecuali memang dari query live yang didokumentasikan).
- Pastikan disclaimer e-RAT (facilitation-only) dan status AI (mock/roadmap) muncul di deck.
- Konfirmasi estimasi durasi bicara ≤ 5 menit (tulis rincian detik per slide di ringkasan handoff).

## HANDOFF (yang kamu laporkan di akhir)

- Path file: `docs/pitch-deck.pdf` + file sumber.
- Jumlah slide + rincian alokasi detik (total ≤ 5:00).
- KPI yang dipakai (nyata dari query, atau placeholder berlabel) + sumbernya.
- Daftar klaim yang sengaja ditahan agar tidak overclaim.
- Perintah verifikasi yang dijalankan beserta output nyatanya (paste, bukan "lulus").
