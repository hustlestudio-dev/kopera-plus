# Lokalisasi (100% Bahasa Indonesia)

Tujuan: seluruh teks antarmuka (frontend) dan pesan backend (Laravel) menggunakan
**Bahasa Indonesia 100%**.

Status saat ini: **PARSIAL** — masih terdapat teks berbahasa Inggris yang
ditampilkan ke pengguna di beberapa halaman frontend.

---

## Cara Verifikasi

Jalankan perintah berikut dari root proyek untuk mencari kata UI berbahasa Inggris
yang umum di seluruh berkas frontend:

```sh
grep -rEn "(Login|Register|Continue|Explore|Search|Nearby|Product|Dashboard|Settings|Profile|Save|Cancel|Submit|Loading|Welcome|Logout|Success|Error|Catalog|Organic|Perfect|Find)" resources/js --include="*.tsx"
```

> Catatan: perintah di atas juga akan menangkap identifier kode (nama variabel,
> nama rute, nama ikon). Filter manual diperlukan untuk memisahkan teks yang
> benar-benar **ditampilkan ke pengguna** dari nama simbol/internal.

---

## Daftar Sisa Teks Inggris (berdasar pemindaian repo)

Berikut teks Inggris yang **terlihat oleh pengguna** (terverifikasi):

### `resources/js/pages/onboarding.tsx`
- L67-71: `Perfect for people who want to learn about cooperatives, discover local products, and browse active member catalogs.`
- L76-78: `AI Search Catalog`
- L82-84: `Find Nearby Cooperative`
- L88-90: `Explore Organic Products`
- L141-143, L183-185: `Continue` (tombol)

### `resources/js/pages/dashboard.tsx`
- L170-172: `Dashboard` (label tombol nav)
- L240-242: `Profile` (label tombol nav)
- L253-255: `Settings` (label tombol nav)
- L263-265: `Logout` (label tombol nav)
- L432-440: `Continue Chat` (tombol)

### `resources/js/pages/admin-dashboard.tsx`
- L121-129: `Dashboard` (label tautan)

### `resources/js/pages/explorer-dashboard.tsx`
- L255-260: `Search AI` (tombol pencarian AI)

### `resources/js/pages/workspace.tsx`
- L164-172: `Dashboard` (label tautan nav)

### `resources/js/components/app-header.tsx`
- L74-78: `title: 'Dashboard'` (label nav header)

### `resources/js/pages/assistant.tsx`
- L72-75: teks balasan AI tiruan (mock) berbahasa Inggris:
  `I've registered your request for "...". I will query the catalog databases...`

### Item minor (aksesibilitas, opsional per aturan ketat)
- `resources/js/components/ui/spinner.tsx` L10: `aria-label="Loading"`
- `alt="Profile"` / `alt="Profile Avatar"` (dashboard.tsx, workspace.tsx)
- `alt="Member profile picture"` (assistant.tsx)

> `resources/js/pages/settings/*`, `resources/js/pages/auth/*`, dan komponen
> modal (create-team, delete-team, invite-member, dll.) telah menggunakan
> Bahasa Indonesia. Tidak ditemukan teks Inggris yang terlihat pengguna di sana.

---

## Catatan: `PrototypeHud.tsx`

Berkas `resources/js/components/PrototypeHud.tsx` masih ada di repositori. Saat ini
komponen tersebut mengembalikan `null` (tidak menampilkan apa pun), namun keberadaan
berkasnya harus ditangani sebelum submission:

- **Hapus** berkasnya, atau
- **Feature-flag** agar tidak ikut masuk ke build produksi.

---

## Rencana Penyelesaian

1. Terjemahkan seluruh teks di atas ke Bahasa Indonesia (lihat daftar per berkas).
2. Hapus atau feature-flag `PrototypeHud.tsx`.
3. Tambahkan gerbang pra-commit untuk mencegah regresi:
   `npx impeccable detect` (rujukan: `todolist.md` milestone **M14** — Lokalisasi
   100% Bahasa Indonesia).
4. Jalankan kembali perintah `grep` verifikasi di atas; pastikan tidak ada lagi
   teks Inggris yang terlihat pengguna.
