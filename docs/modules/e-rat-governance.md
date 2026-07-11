# Modul: Smart Governance + e-RAT (Digital Voting/RAT Facilitation)

Modul ini berada di bawah Smart Governance Dashboard (PRD v1.2, Fitur #3).
e-RAT tetap sub-fitur, bukan produk berdiri sendiri. Tujuan: partisipasi RAT
yang transparan dan ber-friksi rendah melalui AI.

## Objective

- Turunkan hambatan anggota ikut RAT (informasi jelas, suara terekam).
- Fasilitasi persiapan, penyampaian informasi, dan pencatatan preferensi anggota.
- Beri pengurus insight partisipasi (siapa pasif) untuk tindak lanjut.

## Kedalaman e-RAT (dari PRD Section 3)

### Tahapan Proses e-RAT

| Tahap | Penjelasan |
|---|---|
| 1. Persiapan | Susun agenda RAT, lampirkan laporan keuangan & rencana kerja/anggaran. |
| 2. Publikasi | Sampaikan agenda + ringkasan ke anggota via app/WhatsApp. |
| 3. Jenis Agenda | Tentukan agenda votable vs discussion-only (lihat bawah). |
| 4. Voting | Anggota beri preferensi (yes/no) pada agenda votable. |
| 5. Rekapitulasi | Hitung partisipasi & kuorum; hasil hanya fasilitasi, bukan keputusan sah. |
| 6. Tindak Lanjut | Pengurus bawa hasil ke RAT formal tatap muka. |

### Jenis Agenda yang Didukung

- Laporan pertanggungjawaban pengurus/pengawas.
- Pengesahan rencana kerja & anggaran.
- Pembagian SHU.
- Perubahan AD/ART.
- Pemilihan pengurus/pengawas.
- Agenda kustom lain sesuai kebutuhan koperasi.

Sistem membedakan:

- **Votable** (cocok voting digital): SHU, rencana kerja/anggaran.
- **Discussion-only** (musyawarah mendalam): perubahan AD/ART, pemilihan
  pengurus. e-RAT hanya fasilitasi diskusi & kumpul input; keputusan akhir
  tetap lewat musyawarah / RAT formal.

### Mekanisme Kuorum

- PRD asumsikan kuorum tercapai bila partisipasi `>50%` dari anggota.
- **Asumsi ini belum final**: tiap koperasi punya AD/ART sendiri dengan ambang
  kuorum berbeda. Nilai `>50%` hanya default sementara untuk demo, bukan
  aturan universal. Harus dikonfigurasi per koperasi saat produksi.

## [!] Status Hukum — Penting (Baca Sebelum Presentasi)

> e-RAT dalam MVP ini adalah **facilitation & transparency tool**, BUKAN
> pengganti sah RAT konvensional.

- Belum tentu menggantikan keabsahan hukum RAT tatap muka menurut AD/ART dan
  UU Perkoperasian.
- Status hukum e-voting koperasi (apakah sah gantikan RAT fisik) **perlu
  verifikasi** ke UU Perkoperasian & Permenkop terkini sebelum dipakai di luar
  konteks hackathon demo.
- Saat demo ke juri: jangan klaim e-RAT sebagai voting legal yang menggantikan
  RAT. Posisikan sebagai alat bantu persiapan & transparansi (lihat Catatan
  Verifikasi PRD, poin legal).

## AI Insight untuk e-RAT

| Insight | Masukan | Keluaran ke User |
|---|---|---|
| Agenda Summarization | Teks agenda RAT (laporan posisi keuangan, hasil usaha) | Ringkasan bahasa sederhana per agenda |
| SHU Impact Simulation | Keputusan agenda SHU + ringkasan hasil usaha (teks) | Estimasi dampak ke anggota, bahasa awam |
| Governance Insight (pengurus) | Partisipasi `jumlah_peserta_rat` | Deteksi anggota pasif untuk di-follow up |

Catatan: simulasi SHU pakai ringkasan teks, bukan angka pasti (lihat data).

## Current Implementation (Mock / Static)

| File | Konten | Status |
|---|---|---|
| `resources/js/pages/dashboard.tsx` | Member hub: proposal voting (`handleVote`, state `votes` yes/no/null), array statis; community feed (`feedPosts`) | `[~]` STATIC mock, belum wired ke Postgres |
| `resources/js/pages/admin-dashboard.tsx` | Governance KPI (Anggota Aktif, Baru Bulan Ini, Transaksi, Pendapatan) + AI recommendations | `[~]` STATIC hardcoded, belum wired ke Postgres |

Keduanya belum terhubung ke database. Ini UI pendahulu (prototype), bukan
sumber kebenaran data.

## Data Mapping — `rat_koperasi`

Tabel `rat_koperasi` (SIMKOPDES reference, di `docs/backup-hackathon_*.sql`):

| Kolom | Tipe | Pemakaian di UI |
|---|---|---|
| `rat_sample_id` | text | ID unik RAT (key) |
| `koperasi_ref` | text | Relasi ke koperasi (foreign key logis) |
| `jenis_sektor_koperasi` | text | Filter/badge sektor |
| `urutan_rat` | text | Urutan RAT ke-berapa |
| `tahun_buku` | smallint | Label periode |
| `tahun_rencana_kerja` | smallint | Agenda rencana kerja |
| `tahun_rencana_anggaran` | smallint | Agenda rencana anggaran |
| `tanggal_rat` | date | Jadwal RAT |
| `jumlah_peserta_rat` | integer | Hitung partisipasi / tingkat kehadiran |
| `status_rat` | text | Status (terlaksana/batal/draft) |
| `tahap_rat` | text | Tahap proses (persiapan→rekapitulasi) |
| `laporan_posisi_keuangan` | text | Tampil sebagai ringkasan teks (AI summary) |
| `laporan_hasil_usaha` | text | Tampil sebagai ringkasan teks (AI summary) |
| `rapb_posisi_keuangan` | text | RAPB posisi keuangan (teks) |
| `rapb_hasil_usaha` | text | RAPB hasil usaha (teks) |

### Catatan SHU (Kritis)

- **SHU TIDAK punya kolom numerik** di `rat_koperasi`. Hanya ringkasan teks
  (`laporan_hasil_usaha`, `rapb_hasil_usaha`).
- Jangan pernah reka angka SHU. Tampilkan teks asli, atau buat **estimasi
  eksplisit berlabel** dari ringkasan teks via AI ("estimasi") — bukan fakta.
- Simulasi dampak SHU olah dari teks, bukan nilai pasti.

## Next Steps (Menuju Implementasi Nyata)

1. **List RAT** dari `rat_koperasi` (filter by `koperasi_ref` + `tahap_rat`).
2. **AI Summary UI**: tampilkan ringkasan agenda dari kolom teks laporan/RAPB.
3. **Tingkat partisipasi** = `jumlah_peserta_rat` / jumlah anggota (butuh count
   dari `anggota_koperasi` per koperasi). Validasi terhadap kuorum `>50%`
   (konfigurable per AD/ART).
4. **Simulasi SHU** berbasis teks, berlabel "estimasi" (jangan fake number).
5. **Jaga status hukum**: selalu tampilkan disclaimer facilitation tool di UI.

Terhubung ke `todolist.md` **M9 — e-RAT** (list RAT, ringkasan AI, simulasi
SHU, status `tahap_rat`; dengan blocker: posisikan FACILITATION, bukan
pengganti sah RAT).
