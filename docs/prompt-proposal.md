# PROMPT — Proposal PDF (KOPERA AI / KOPERA-PLUS)

Salin seluruh isi di bawah ini dan berikan ke agent lain. Prompt sudah lengkap dan mandiri; agent dijalankan dengan akses tool baca-file, tulis-file, dan shell di working directory repo ini.

---

## PERAN & TUJUAN

Kamu adalah agent penyusun proposal teknis-produk. Tugasmu: menghasilkan satu file **`docs/proposal.pdf`** — dokumen proposal formal, Bahasa Indonesia, untuk **Hackathon Digital Cooperatives Expo 2026 — Kementerian Koperasi RI, Tema 3: Peningkatan Keterlibatan Masyarakat dalam Berkoperasi**. Proposal harus lengkap tapi tetap ringkas & terstruktur, sehingga **inti isinya bisa dipresentasikan/di-skim tuntas dalam 5 menit** (ringkasan eksekutif + heading yang bisa dibaca cepat). Dokumen wajib jujur dan tidak overclaim.

## LANGKAH WAJIB SEBELUM MENULIS

1. Baca sumber kebenaran repo ini (jangan mengarang):
   - `README.md`, `docs/prd.md` (PRD v1.2 — paling utama), `docs/architecture.md`, `docs/data-model.md`, `docs/ai-disclosure.md`, `docs/quality-gate.md`
   - `docs/modules/ai-member-assistant.md`, `docs/modules/e-rat-governance.md`, `docs/modules/kopdes-community.md`, `docs/modules/gamification-loyalty.md`, dan modul lain di `docs/modules/`
   - `todolist.md` (status M1–M16, aturan verifikasi, milestone CUKUP/BAIK/SEMPURNA)
   - Kode: `app/Services/HackathonData.php`, `app/Http/Controllers/AdminDashboardController.php`, `routes/web.php`, `database/seeders/UserSeeder.php`, `composer.json`, `package.json`
2. Jika ada koneksi PostgreSQL live, jalankan query KPI di `docs/data-model.md` untuk angka nyata. Jika tidak, tandai `[isi dari query live]` — jangan karang angka.

## FAKTA & BATASAN (identik dengan sumber kebenaran, patuhi ketat)

- Produk: **KOPERA AI** (KOPERA-PLUS), platform engagement koperasi berbasis AI. 3 peran: Explorer/Member/Administrator. Kredensial demo: `explorer@mail.com` / `member@mail.com` / `administrator@mail.com`, password `HustleJuara#123`.
- Empat pilar + AI End-to-End layer (lihat detail di `docs/prd.md`): AI Member & Commerce Assistant; Gamification & Loyalty; Smart Governance + e-RAT; Kopdes Community.
- Tech stack nyata: Laravel 13/PHP 8.3, Inertia v3 + React 19 + TS, Tailwind v4, Fortify, Spatie Permission (RBAC), Wayfinder, `kstmostofa/laravel-whatsapp`, PostgreSQL (data referensi SIMKOPDES ~30 tabel via `koperasi_ref`), SQLite dev. Sudah live di hosting mandiri.
- Anti-overclaim WAJIB:
  - AI MVP masih heuristic/mock; integrasi LLM = roadmap.
  - e-RAT = facilitation & transparency tool, BUKAN pengganti sah RAT; status hukum e-voting perlu verifikasi UU Perkoperasian/Permenkop; kuorum >50% hanya default, per-AD/ART.
  - Kopdes Community MVP = direktori + knowledge board + insight agregat publik; marketplace/BI lintas-jaringan = Phase 2/3.
  - SHU tidak ada kolom numerik di dump → jangan angka SHU palsu; estimasi harus berlabel.
  - Privasi: hanya agregat, tanpa PII mentah.
- AI Disclosure (TOR Aturan J): ide inti karya tim; AI generatif = alat bantu kode/riset/dokumentasi/UI copy. Wajib ada bab disclosure.

## STRUKTUR PROPOSAL (bab, urut)

1. **Halaman Judul**: nama produk KOPERA AI, subjudul (AI-Powered Cooperative Engagement Platform), nama hackathon & Tema 3, nama tim, tanggal, versi.
2. **Ringkasan Eksekutif** (1 halaman, INTI 5 menit): masalah → solusi (4 pilar + AI end-to-end) → UVP (AI-Driven Cooperative Growth Loop) → status singkat → dampak/KPI target. Ditulis agar cukup dibaca sendiri untuk paham keseluruhan.
3. **Latar Belakang & Rumusan Masalah**: masalah per stakeholder (masyarakat, anggota, pengurus, ekosistem Kopdes/KUD). Kaitkan ke Tema 3 (keterlibatan masyarakat).
4. **Tujuan & Sasaran**: Business Goals + User Goals (dari PRD).
5. **Solusi yang Diusulkan**:
   - 5.1 AI Member & Commerce Assistant (fitur + sample flow + status MVP/roadmap).
   - 5.2 Gamification & Loyalty (poin/level/badge/reward + cara memicu engagement).
   - 5.3 Smart Governance + e-RAT (tahapan proses, jenis agenda votable vs discussion-only, kuorum, + disclaimer status hukum facilitation-only).
   - 5.4 Kopdes Community (direktori + knowledge board + cross-Kopdes insight; scope MVP vs Phase 2/3).
   - 5.5 AI End-to-End Journey (tabel tahap → peran AI → output; status jujur tiap tahap).
6. **Arsitektur Sistem**: diagram alur request (3 role → middleware auth+role+team → dashboard → PostgreSQL + WhatsApp), breakdown layer (frontend/backend/data/AI), role-gating server+client. Ambil dari `docs/architecture.md`.
7. **Model Data**: peran data referensi SIMKOPDES, hub `koperasi_ref`, pemetaan tabel→fitur, contoh query KPI, caveat (SHU teks, tanpa rating, tanpa FK, PII di-mask). Ambil dari `docs/data-model.md`.
8. **Kualitas & Keamanan**: quality gate (Pint, PHPStan, PHPUnit, ESLint/Prettier/tsc, react-doctor), RBAC, privasi/PII, validasi. Ambil dari `docs/quality-gate.md`.
9. **Status Implementasi (jujur)**: tabel modul M1–M16 dengan status `[x]/[~]/[ ]` ringkas + milestone CUKUP/BAIK/SEMPURNA. Ambil dari `todolist.md`.
10. **KPI & Metrik Keberhasilan**: tabel target (Anggota Baru +30%, Aktif +40%, RAT >70%, Transaksi +25%, Kepuasan >90%) + KPI live bila ada.
11. **Roadmap**: Phase 1/2/3.
12. **Pengungkapan Penggunaan AI (Aturan J)**: ringkas `docs/ai-disclosure.md`.
13. **Catatan Verifikasi & Risiko**: legal e-RAT, kuorum, scope Kopdes, ketiadaan kolom SHU — daftar hal yang perlu diverifikasi sebelum klaim.
14. **Penutup**: rekap nilai + ajakan (demo live + kredensial 3 role + repo).
15. **Lampiran (opsional)**: daftar rute, kredensial demo, tautan dokumen pendukung.

## GAYA DOKUMEN (STYLE PROPOSAL)

- **Format akhir: PDF A4 portrait**, margin nyaman (± 2–2.5 cm), rapi untuk dibaca & dicetak.
- Nada: **formal, teknis, ringkas, kredibel** — bahasa pemerintahan/koperasi yang profesional namun tetap jelas. Kalimat aktif, tidak bertele-tele.
- **Struktur bernomor** (bab & sub-bab), ada **daftar isi** dengan nomor halaman. Heading konsisten, hierarki jelas.
- **Palet**: aksen hijau koperasi + emas hangat untuk heading/garis; teks hitam/abu gelap di atas putih. Konsisten dengan tema pitch deck agar satu identitas.
- **Tipografi**: heading sans-serif tegas (Instrument Sans/Inter), body serif atau sans yang enak dibaca panjang, ukuran body 10–11pt, line-height nyaman.
- Gunakan **tabel** untuk pemetaan data & status, **diagram** untuk arsitektur & journey (boleh render mermaid/gambar), **kotak catatan** untuk disclaimer legal/verifikasi.
- Header/footer tiap halaman: nama produk + nomor halaman. Halaman judul tanpa header.
- Bahasa: 100% Bahasa Indonesia. **Tanpa emoji** (aturan repo). Istilah teknis (Laravel, Inertia, PostgreSQL) tetap apa adanya.
- Panjang wajar: fokus padat berisi; hindari mengulang. Ringkasan eksekutif harus mandiri.

## CARA MEMBANGUN PDF (pilih jalur paling andal)

- Opsi berurutan:
  1. Tulis sumber **Markdown** lengkap di `docs/proposal.md` (dengan front-matter/heading/tabel/mermaid), lalu render ke PDF (mis. Pandoc bila tersedia, atau HTML+CSS A4 → headless Chromium/Playwright `pdf()` dengan `format: 'A4'`, `printBackground: true`, margin & header/footer template).
  2. Jika mermaid tidak ter-render oleh renderer, pra-render diagram ke gambar lalu sematkan.
- Simpan sumber (MD/HTML/CSS) di `docs/` agar bisa diedit ulang; output final **`docs/proposal.pdf`**.
- Jangan menambah dependency berat baru bila tool render sudah ada.

## VERIFIKASI SEBELUM SELESAI (WAJIB, bukti nyata)

- `ls -la docs/proposal.pdf` (ada, > 0 byte) dan cek jumlah halaman (`pdfinfo` atau sejenis) — sebutkan jumlahnya.
- Pastikan **daftar isi** dan **penomoran halaman** muncul.
- `grep -RniE "4[.,]821|24[.,]8M|Rp24" docs/proposal.md` (atau sumber) → kosong (tidak ada angka mock), kecuali dari query live yang didokumentasikan.
- Pastikan bab-bab wajib hadir: Ringkasan Eksekutif, e-RAT disclaimer facilitation-only, scope Kopdes MVP, AI status mock/roadmap, AI Disclosure (Aturan J), Catatan Verifikasi.
- Uji "5 menit": Ringkasan Eksekutif + daftar isi + heading cukup untuk memahami keseluruhan tanpa membaca detail. Tulis konfirmasi ini di handoff.

## HANDOFF (yang kamu laporkan di akhir)

- Path file: `docs/proposal.pdf` + file sumber.
- Jumlah halaman + garis besar isi (daftar bab).
- KPI yang dipakai (nyata/placeholder) + sumbernya.
- Daftar klaim yang ditahan agar tidak overclaim + catatan verifikasi yang disertakan.
- Perintah verifikasi yang dijalankan beserta output nyatanya (paste, bukan "lulus").
