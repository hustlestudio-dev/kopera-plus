# Rencana Implementasi Detail (Wajib Tuntas 100%)

## Tujuan Utama
Menjadikan aplikasi benar-benar siap produksi dengan 4 fokus:
1. Route tidak lagi bernuansa demo, tetapi merepresentasikan alur nyata (real case).
2. Seluruh teks aplikasi 100% Bahasa Indonesia (tanpa sisa Bahasa Inggris, termasuk toast, error, helper text, CTA, judul, label, placeholder).
3. Menghapus elemen prototipe (`Prototype HUD` dan floating action terkait), lalu memastikan halaman menjadi versi produksi.
4. Menambahkan git hook agar commit diblokir jika `npx impeccable detect` masih menghasilkan temuan.

---

## Checklist Eksekusi Per Item

### 1) Refactor Route dari Demo ke Real Case

#### 1.1 Audit route saat ini
- [ ] Inventaris seluruh route yang masih bernama/bernuansa demo (contoh: `/demo/auth`, nama route `demo-*`, CTA yang mengarah ke route demo).
- [ ] Petakan route yang sudah real case vs yang masih placeholder.

#### 1.2 Definisikan route final produksi
- [ ] Tetapkan path final yang konsisten, contoh:
  - `/masuk` untuk login
  - `/daftar` untuk register
  - `/beranda` atau `/{current_team}/dashboard` sesuai arsitektur tim
  - path onboarding/workspace/assistant/admin/explorer tanpa kata “demo”
- [ ] Tetapkan penamaan route (`name`) yang konsisten dan mudah dipakai di frontend.

#### 1.3 Implementasi route backend
- [ ] Ubah definisi route di file route utama agar tidak ada endpoint `/demo/*`.
- [ ] Tambahkan redirect kompatibilitas (sementara) dari path lama ke path baru jika diperlukan.
- [ ] Pastikan middleware (`auth`, `verified`, membership) tetap benar setelah perpindahan route.

#### 1.4 Sinkronisasi seluruh pemanggilan route
- [ ] Perbarui link dan navigasi frontend yang masih menunjuk path demo.
- [ ] Perbarui helper route/wayfinder bila ada file route ter-generate atau helper typed route.
- [ ] Perbarui test yang bergantung pada path lama.

#### 1.5 Verifikasi item #1
- [ ] `grep` tidak menemukan path `/demo/` lagi di kode produksi.
- [ ] Semua halaman utama bisa diakses sesuai role/otorisasi.
- [ ] Redirect lama (jika dipakai) berjalan benar.

---

### 2) Lokalisasi Penuh: 100% Bahasa Indonesia

#### 2.1 Audit teks statis & dinamis
- [ ] Pindai semua komponen UI untuk teks Inggris:
  - halaman (`resources/js/pages/**`)
  - komponen (`resources/js/components/**`)
  - toast/alert/modal
  - validasi dan flash message dari backend (`app/**`)
- [ ] Klasifikasikan teks per konteks: tombol, judul, deskripsi, state kosong, error, success, notifikasi.

#### 2.2 Standarisasi gaya bahasa Indonesia
- [ ] Tentukan gaya bahasa konsisten (formal-produksi, singkat, mudah dipahami).
- [ ] Tetapkan padanan istilah produk agar seragam (contoh: “Masuk”, “Daftar”, “Beranda”, “Pengaturan”, “Berhasil”, “Gagal”).

#### 2.3 Implementasi perubahan teks
- [ ] Ganti seluruh string Inggris di frontend menjadi Bahasa Indonesia.
- [ ] Ganti seluruh flash/toast message backend menjadi Bahasa Indonesia.
- [ ] Ganti pesan validasi/error yang masih Inggris (termasuk default message jika masih muncul).
- [ ] Pastikan tidak ada label/konten Inggris pada data dummy, kartu, tooltip, atau status badge.

#### 2.4 Verifikasi item #2
- [ ] `grep` kata-kata Inggris umum (contoh: `Login`, `Register`, `Dashboard`, `Success`, `Error`, `Prototype`, `Upgrade`, dll.) menghasilkan 0 untuk konteks UI produksi.
- [ ] Uji manual alur penting (auth, dashboard, settings, team) dan cek semua toast/pesan tampil Bahasa Indonesia.
- [ ] Tidak ada fallback message bahasa Inggris saat validasi gagal.

---

### 3) Hapus Prototype HUD & Floating Prototype Elements

#### 3.1 Identifikasi komponen prototipe
- [ ] Identifikasi semua impor/pemakaian `PrototypeHud`.
- [ ] Identifikasi tombol/fab floating yang bersifat demo/prototipe pada tiap halaman.

#### 3.2 Implementasi pembersihan
- [ ] Hapus pemakaian `PrototypeHud` dari semua halaman.
- [ ] Hapus file komponen `PrototypeHud` jika sudah tidak dipakai.
- [ ] Hapus floating action button yang sifatnya demo, gantikan dengan komponen halaman produksi (inline action/toolbar/header action) sesuai konteks.

#### 3.3 Hardening siap produksi
- [ ] Pastikan tidak ada elemen debug/prototype marker (badge “Prototype”, HUD switcher, quick jump demo).
- [ ] Pastikan layout tetap rapi setelah elemen floating dihapus.

#### 3.4 Verifikasi item #3
- [ ] `grep` untuk `PrototypeHud`, `Prototype`, `floating` (yang bukan komponen desain sistem sah) sudah bersih.
- [ ] Tidak ada error TypeScript/React akibat impor yang sudah dihapus.
- [ ] UI tetap responsif dan tidak ada area kosong mengambang.

---

### 4) Git Hook Wajib: `npx impeccable detect` Harus Kosong

#### 4.1 Tentukan mekanisme hook
- [ ] Cek apakah proyek sudah memakai Husky.
- [ ] Jika belum, pilih pendekatan:
  - Husky (direkomendasikan untuk konsistensi tim), atau
  - `.git/hooks/pre-commit` dengan dokumentasi setup manual.

#### 4.2 Implementasi pre-commit hook
- [ ] Tambahkan hook `pre-commit` yang menjalankan: `npx impeccable detect`.
- [ ] Hook harus gagal (`exit 1`) jika output masih ada temuan.
- [ ] Commit hanya boleh lanjut jika hasil benar-benar kosong/bersih.

#### 4.3 DX & dokumentasi
- [ ] Tambahkan dokumentasi singkat pada `README` atau dokumen kontribusi:
  - cara instal hook
  - cara menjalankan pengecekan manual
  - arti kegagalan dan cara memperbaiki

#### 4.4 Verifikasi item #4
- [ ] Simulasi commit dengan kondisi masih ada temuan => commit ditolak.
- [ ] Simulasi commit setelah temuan nol => commit diizinkan.
- [ ] Pastikan command berjalan konsisten di environment tim.

---

## Urutan Eksekusi yang Disarankan
1. Refactor route dulu (item #1) agar fondasi navigasi stabil.
2. Lanjut lokalisasi total (item #2) karena menyentuh hampir semua tampilan/pesan.
3. Bersihkan elemen prototipe (item #3) setelah navigasi dan bahasa sudah final.
4. Pasang guard kualitas via git hook (item #4) sebagai pengunci akhir.

---

## Final Verification Gate (Wajib Sebelum Selesai)
- [ ] Jalankan pengecekan statis/lint/typecheck yang tersedia di proyek.
- [ ] Jalankan tes terkait route/auth/settings jika ada.
- [ ] Uji manual minimal alur: masuk, navigasi utama, aksi penting, toast sukses/gagal.
- [ ] Pastikan tidak ada teks Inggris tersisa di UI maupun pesan backend.
- [ ] Pastikan tidak ada jejak route demo dan komponen HUD prototipe.
- [ ] Pastikan pre-commit hook aktif dan memblokir commit saat `impeccable detect` belum bersih.

---

## Catatan Pelaksanaan
- Semua perubahan harus minimal, presisi, dan tidak mengubah perilaku di luar scope.
- Setiap item ditutup hanya jika checklist verifikasi item tersebut lulus 100%.
- Jika ada blocker (dependensi, hak akses, atau konfigurasi), blocker harus dicatat dan ditindaklanjuti sebelum item dianggap selesai.
