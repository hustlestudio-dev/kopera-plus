# Pengungkapan Penggunaan AI (AI Disclosure)

Dokumen ini memenuhi kewajiban transparansi menurut **TOR Aturan J** (Pengungkapan
Penggunaan AI / Kekayaan Intelektual) untuk hackathon Kementerian Koperasi
(Tema 3: Pemberdayaan Komunitas). Tim wajib mengungkapkan penggunaan AI generatif;
menyembunyikannya berisiko diskualifikasi. Pengungkapan ini tidak mengurangi skor
selama ide inti tetap merupakan karya tim.

---

## Ide Inti (Core Idea)

Ide dan konsep dasar KOPERA-PLUS adalah **karya tim sendiri**, tidak dihasilkan oleh
AI generatif.

- **Masalah yang diangkat:** Partisipasi anggota koperasi rendah, transparansi
  pembagian SHU (Sisa Hasil Usaha) lemah, dan jaringan Koperasi Desa (Kopdes) belum
  terhubung secara efektif.
- **Solusi yang dirancang tim:** Platform berbasis AI untuk
  - *Onboarding* anggota baru yang dibantu AI,
  - Gamifikasi partisipasi (poin, pencapaian, loyalitas),
  - e-RAT (Rapat Anggota Tahunan) yang transparan dan terdigitalisasi,
  - Jaringan Kopdes lintas wilayah.

Perumusan masalah, pemilihan solusi, dan pilar produk di atas murni hasil diskusi,
riset lapangan, dan keputusan produk tim.

---

## Penggunaan AI (Di mana AI generatif dipakai sebagai alat bantu)

AI generatif digunakan **hanya sebagai alat bantu teknis**, bukan untuk menciptakan
ide produk. Area penggunaan:

- **(a) Bantuan penulisan kode & debugging** — penyelesaian bug, penulisan
  potongan kode, dan penjelasan error pada kode Laravel/Inertia/React.
- **(b) Riset & referensi** — pencarian referensi dokumentasi, pola arsitektur,
  dan praktik terbaik framework.
- **(c) Penyusunan dokumentasi** — draf dokumen seperti README, PRD
  (`docs/prd.md`), dan dokumen ini.
- **(d) Salinan UI (UI copy)** — usulan teks label/tombol untuk antarmuka.

> Catatan kepatuhan: alat spesifik yang digunakan (mis. Claude, Gemini, ChatGPT,
> Cursor) dicatat oleh tim pada saat pengembangan. Jika daftar alat belum final,
> sebutkan secara umum sebagai **"asisten kode berbasis LLM"**. Isian ini wajib
> dilengkapi sebelum submit agar sesuai Aturan J.

---

## Yang TIDAK dihasilkan oleh AI

Berikut adalah bagian yang sepenuhnya merupakan karya dan keputusan tim, bukan
keluaran AI:

- Konsep dan perumusan masalah (low participation, transparansi SHU).
- Ide solusi dan fitur utama (onboarding AI, gamifikasi, e-RAT, jaringan Kopdes).
- Keputusan produk dan prioritas pilar (lihat `docs/prd.md`).
- Desain arsitektur bisnis dan target pengguna.

---

## Status Komponen AI di Aplikasi

Pada tahap **MVP saat ini**, komponen yang disebut "AI" masih berupa
** heuristics sisi-klien / mock (dummy)**. Belum ada panggilan langsung ke model
LLM (large language model) secara live:

- **AI Member Assistant** — jawaban bersifat statis/terpola (mock), belum terhubung
  ke model nyata.
- **AI Commerce** — rekomendasi dan katalog menggunakan data tiruan (dummy),
  bukan hasil inferensi model.
- **AI Insight** — ringkasan/insight merupakan ilustrasi demonstrai, bukan keluaran
  LLM.

Integrasi ke API LLM (mis. endpoint model bahasa) **direncanakan namun belum
diimplementasikan**. Peta alur AI end-to-end dirancang di `docs/prd.md`
(bagian *"AI End-to-End: Peta AI di Seluruh Member Journey"*). Kami menyatakan
status ini secara transparan agar tidak menyesatkan juri mengenai tingkat
kematangan AI di dalam aplikasi.

---

## Kepatuhan (Compliance)

- Pengungkapan penggunaan AI **tidak mengurangi penilaian** selama ide inti tetap
  karya tim (sesuai Aturan J).
- Menyembunyikan penggunaan AI generatif **berisiko diskualifikasi**.
- Dokumen ini dibuat agar tim dapat menunjukkannya sewaktu-waktu sebagai bukti
  kepatuhan.
