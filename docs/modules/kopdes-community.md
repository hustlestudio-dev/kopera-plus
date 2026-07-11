# Modul: Kopdes Community (Jaringan Antar-Koperasi Desa/KUD)

Modul baru di PRD v1.2 (Fitur #4). Tujuan: hubungkan koperasi desa (Kopdes/KUD)
se-wilayah untuk belajar & kolaborasi. Scope MVP sengaja sempit — jangan
overclaim fitur Phase 2/3 saat demo (Catatan Verifikasi PRD).

## Objective

- Jadi jalur kolaborasi antar-Kopdes, mulai dari berbagi pengetahuan.
- Bantu pengurus adaptasi praktik baik Kopdes lain ke koperasinya.
- Insight lintas-Kopdes berbasis data publik, bukan data privat/transaksi.

## Scope (PRD Section 4)

| Fase | Cakupan | Status MVP |
|---|---|---|
| Phase 1 (MVP) | Direktori read-only + Knowledge Sharing Board + AI Insight terbatas (data publik) | Dibangun sekarang |
| Phase 2 | Marketplace UMKM lintas-Kopdes, data-sharing agreement formal, agregasi harga/pasar regional | Belum |
| Phase 3 | Integrasi SIMKOPDES, BI lintas-jaringan, keputusan kolektif berbasis data | Belum |

MVP realistis = **directory + knowledge board**. Fitur network-level penuh
(community member-to-member, marketplace) masuk Phase 2/3.

## Current Implementation (Mock / Static)

| File | Konten | Status |
|---|---|---|
| `resources/js/pages/explorer-dashboard.tsx` | Direktori koperasi & produk statis (`coops`, `products` array hardcoded, `CoopItem`/`ProductItem` interface) | `[~]` STATIC — stand-in untuk Kopdes directory, belum wired ke Postgres |

Halaman ini adalah prototype direktori; bukan sumber kebenaran data Kopdes.

## Data Mapping — Source Tables

Tabel SIMKOPDES reference (ada di `docs/backup-hackathon_*.sql`):

| Tabel | Pemakaian di Kopdes Community |
|---|---|
| `profil_koperasi` | Entri direktori Kopdes: nama, identitas, sektor, wilayah |
| `referensi_komoditas_desa` | Komoditas unggulan desa (insight & filter direktori) |
| `referensi_profil_desa` | Profil desa (lokasi, karakteristik) untuk konteks Kopdes |
| `referensi_wilayah` | Hirarki wilayah → filter "Kopdes di wilayah saya" |
| (`referensi_koperasi_wilayah`) | Relasi koperasi ↔ wilayah (join direktori) |

## Proposed MVP

### 1. Knowledge Sharing Board (Posts)

- Papan berbagi praktik baik antar-pengurus Kopdes (contoh: "Cara naikkan
  partisipasi RAT ke 80%").
- Anggota (pengurus) bisa baca & posting. Target: minimal 1 post per Kopdes
  aktif per bulan (Success Metrics PRD).
- Input: `dashboard.tsx` sudah punya pola `feedPosts` + `handleCreatePost`
  yang bisa dipakai sebagai basis UI board ini.

### 2. Cross-Kopdes Insight (Aggregate, AI Terbatas)

- AI rekomendasikan 1-3 praktik dari Kopdes lain yang relevan dengan kondisi
  koperasi user (Cross-Kopdes Insight Engine, PRD AI Components).
- **Hanya data publik/agregat**, bukan PII atau data transaksi privat.
- Contoh agregat yang aman:
  - Rata-rata SHU per `kategori_usaha` (dari ringkasan teks `rat_koperasi`,
    di-estimasi & di-label, bukan angka pasti).
  - Praktik baik populer di Knowledge Board per wilayah/sektor.
- **Jangan** tampilkan data anggota, simpanan, atau transaksi individu Kopdes
  lain. Agregat saja.

## User Flow (MVP)

Pengurus buka menu Kopdes Community -> lihat direktori Kopdes di wilayah ->
baca/posting praktik baik di Knowledge Board -> AI rekomendasikan insight
relevan dari kondisi Kopdes sendiri -> pengurus adaptasi ke koperasinya.

## Next Steps

1. Ganti `explorer-dashboard.tsx` direktori statis dengan list dari
   `profil_koperasi` + `referensi_wilayah` (filter wilayah/sektor).
2. Bangun Knowledge Sharing Board (pakai pola `feedPosts` di `dashboard.tsx`).
3. Cross-Kopdes Insight: agregat publik saja (avg SHU by `kategori_usaha`,
   best practices) — no PII.
4. Jaga scope: jangan klaim Phase 2/3 (marketplace, BI lintas-jaringan) sudah
   jalan.

Terhubung ke `todolist.md` **M11 — Kopdes Community** (Owner: agent-kopdes;
Glob: `resources/js/pages/explorer-dashboard.tsx` (board), `referensi_*`).
