# Data Model KOPERA-PLUS

## Tujuan

Dokumen ini memetakan tabel PostgreSQL dari panitia (`docs/backup-hackathon_2026-202607101855.sql`, referensi SIMKOPDES) ke fitur PRD / layar UI. Dump berisi ~30 tabel yang di-*join* melalui **`koperasi_ref`** (kunci rujukan koperasi).

> Sumber kebenaran: `docs/prd.md` (modul #1 AI Member Assistant, #2 Gamification, #3 Smart Governance Dashboard / e-RAT, #4 Kopdes Community) dan `docs/modules/sidebar-navigation.md` (penamaan fitur PRD-aligned).

## Tabel Hub: `profil_koperasi`

Semua tabel anggota/transaksi/RAT di-*join* ke `profil_koperasi` via `koperasi_ref`. Kolom kunci (terverifikasi):

| Kolom | Arti |
|-------|------|
| `koperasi_ref` | PK rujukan koperasi (hub join) |
| `nama_koperasi` | Nama koperasi |
| `status_registrasi` | Status registrasi (nilai ditemukan lewat `GROUP BY` di bawah) |
| `bentuk_koperasi` | Bentuk hukum koperasi |
| `kategori_usaha` | Kategori usaha |
| `nik_koperasi` | NIK koperasi (sudah di-mask) |
| `alamat_lengkap`, `kode_pos` | Alamat |
| `koordinat` | Koordinat (lokasi peta) |
| `tentang_koperasi` | Deskripsi singkat |

`koperasi_ref` adalah *foreign key logis* antar tabel; tidak ada constraint FK di dump, jadi join lakukan eksplisit di query.

## Pemetaan Tabel -> Fitur PRD / Layar

| Tabel dump | Fitur PRD / Layar | Catatan |
|------------|-------------------|---------|
| `profil_koperasi` | Direktori Kopdes, Profil Koperasi, Off-Taker (lokasi) | Hub `koperasi_ref`; sumber nama/lokasi/koordinat |
| `anggota_koperasi` | Anggota + Gamifikasi, Formulir Onboarding-AI | `anggota_ref`, `nama`, `nik` (MASK), `kode_wilayah`, `jenis_kelamin`, `status_keanggotaan`, `tanggal_terdaftar`, `status_akun`, `pekerjaan` |
| `pengurus_koperasi` | Smart Governance Dashboard (pengurus) | `nama`, `jabatan`, `status`, `no_hp`, `nik`, `email` (MASK) |
| `pengajuan_domain` | Formulir Permohonan (AI onboarding) | Form pengajuan domain koperasi |
| `pengajuan_kemitraan` | Formulir Permohonan | Form kemitraan (`nik`, `penanggung_jawab`, MASK) |
| `pengajuan_pembiayaan` | Formulir Permohonan | Form pembiayaan |
| `pengajuan_rekening_bank` | Formulir Permohonan | Form rekening bank |
| `transaksi_penjualan` | Penjualan (AI Commerce) | `nama_pelanggan`, `tanggal_dibuat`, `total_pembayaran` numeric, `status_transaksi`, `metode_pembayaran` |
| `barang_keluar_produk` | Penjualan / inventaris | `jumlah_keluar`, `harga`, `total_nilai`, `status_transaksi`, `tanggal_keluar` |
| `barang_masuk_produk` | Inventaris / harga pokok | `harga_beli`, `harga_jual`, `jumlah_masuk`, `total_biaya` |
| `inventaris_produk` | Inventaris (stok) | `stok` numeric |
| `produk_koperasi` | Katalog (AI Commerce) | `nama_produk`, `kode_barcode`, `unit` |
| `rat_koperasi` | e-RAT (Smart Governance) | `jenis_sektor_koperasi`, `urutan_rat`, `tahun_buku`, `jumlah_peserta_rat`, `status_rat`, `tahap_rat`, `laporan_posisi_keuangan`, `laporan_hasil_usaha`, `rapb_*` — **teks, tanpa kolom SHU numerik** |
| `simpanan_anggota` | Laporan Keuangan / SHU-AI Explainer | `anggota_ref`, `koperasi_ref`, `periode_pembayaran`, `jumlah_simpanan`, `status`, `dibayar_pada` |
| `modal_koperasi` | Laporan Keuangan | `jumlah` numeric, `tipe_modal`, `tanggal_diterima` |
| `referensi_komoditas_desa` | Off-Taker / Explorer insight | `nama_komoditas`, `nilai_potensi_desa`, `volume`, `luas_area` |
| `referensi_profil_desa` | Off-Taker / Explorer insight | `total_penduduk`, `anggaran_dana_desa`, `tahun_populasi` |
| `referensi_wilayah` | Off-Taker (filter wilayah), Explorer | `provinsi`, `kab_kota`, `kecamatan`, `desa_kelurahan`, `kode_wilayah` |
| `referensi_koperasi_wilayah` | Kopdes Community (penetapan wilayah) | `koperasi_ref`, `kode_wilayah` |
| `kbli_koperasi` | Profil Koperasi (jenis usaha) | `kode_kbli`, `nama_kbli`, `tipe_izin_usaha` |
| `dokumen_koperasi` | Profil Koperasi (dokumen) | `nama_dokumen` |
| `karyawan_koperasi` | Back-office (bukan MVP) | `nama`, `jabatan`, `nik`, `email` (MASK) |
| `akun_bank_koperasi` | Back-office (bukan MVP) | `nama_rekening`, `nama_bank` |
| `gerai_koperasi` | Back-office (bukan MVP) | Data gerai fisik |
| `aset_koperasi` | Back-office (bukan MVP) | `nama_aset`, `tipe_aset`, `status` |

## Query KPI PostgreSQL (Siap Jalan)

Jalankan di koneksi PostgreSQL live (bukan SQLite dev). Ganti `public.` bila ada *schema* berbeda.

```sql
-- 1) Total koperasi per status_registrasi
SELECT status_registrasi, COUNT(*) AS jumlah
FROM public.profil_koperasi
GROUP BY status_registrasi
ORDER BY jumlah DESC;

-- 2) DISCOVER dulu nilai aktual status_keanggotaan, lalu aggregasi
SELECT status_keanggotaan, COUNT(*) AS jumlah
FROM public.anggota_koperasi
GROUP BY status_keanggotaan
ORDER BY jumlah DESC;

-- 3) Transaksi selesai: count + SUM total_pembayaran
SELECT
    COUNT(*)                                              AS jumlah_transaksi,
    SUM(total_pembayaran)                                 AS total_pembayaran
FROM public.transaksi_penjualan
WHERE status_transaksi = 'Selesai';

-- 4) Tren pendapatan bulanan
SELECT
    date_trunc('month', tanggal_dibuat) AS bulan,
    COUNT(*)                            AS jumlah_transaksi,
    SUM(total_pembayaran)               AS pendapatan
FROM public.transaksi_penjualan
WHERE status_transaksi = 'Selesai'
GROUP BY date_trunc('month', tanggal_dibuat)
ORDER BY bulan;

-- 5) Partisipasi e-RAT (kolom rat_koperasi)
SELECT
    status_rat,
    tahap_rat,
    COUNT(*)                                            AS jumlah_rat,
    SUM(jumlah_peserta_rat)                             AS total_peserta,
    AVG(jumlah_peserta_rat)                             AS rata_peserta
FROM public.rat_koperasi
GROUP BY status_rat, tahap_rat
ORDER BY jumlah_rat DESC;
```

> Query #2 wajib dijalankan dulu untuk mengetahui nilai literal `status_keanggotaan` (mis. `Aktif`/`Nonaktif`) sebelum filter dipakai di UI — jangan asumsikan string.

## Catatan Penting (CAVEATS)

- **SHU tidak punya kolom numerik.** `rat_koperasi` hanya menyimpan ringkasan teks keuangan (`laporan_posisi_keuangan`, `laporan_hasil_usaha`, `rapb_posisi_keuangan`, `rapb_hasil_usaha`). Untuk fitur SHU-AI Explainer: **estimasi / dalami dari `simpanan_anggota.jumlah_simpanan` + `modal_koperasi.jumlah`**, jangan *hardcode* angka fiktif.
- **Field `rating` pada Explorer tidak ada di dump.** Di UI saat ini nilai rating di-*hardcode*. Ganti dengan **proksi** (volume `transaksi_penjualan`, jumlah `anggota_koperasi`, atau `nilai_potensi_desa` dari `referensi_komoditas_desa`) atau hapus kolom tersebut.
- **Gamifikasi (poin / level / badge) tidak ada di dump.** Semua data *loyalty* (badge: First Transaction, Active Member, Community Hero, Top Contributor, Early Supporter) adalah **data sisi aplikasi** — butuh migrasi tabel baru (`gamification_*`). Tidak bisa diisi dari SIMKOPDES.
- **Privasi (PII).** NIK, no HP, dan email sudah di-*mask* di dump. **Jangan tampilkan PII mentah** di mana pun — hanya tampilkan agregat (count, sum, avg) dan label non-identitas.
- **Tanpa FK.** Join lintas tabel harus eksplisit via `koperasi_ref` / `anggota_ref` / `kode_wilayah`; dump tidak mendefinisikan constraint.
