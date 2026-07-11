# Modul: AI Member Assistant

KOPERA-PLUS — Platform Keterlibatan Koperasi Bertenaga AI (Theme 3 Hackathon).

## Objective

Berdasarkan PRD (v1.2) bagian 1:

> Membantu masyarakat memahami koperasi, menemukan koperasi yang sesuai, serta membantu proses transaksi anggota secara cerdas.

Tujuan lintas-fitur: AI hadir di sepanjang member journey (Awareness -> Governance) agar tidak ada tahap yang "AI-nya cuma tempelan".

## Features (dari PRD)

- AI Chat Assistant
- AI Onboarding (jelaskan konsep koperasi, SHU, hak & kewajiban anggota)
- AI Recommendation (profil minat & lokasi -> koperasi relevan)
- FAQ Otomatis
- Rekomendasi Program
- AI Commerce Assistant (cek stok, harga, validasi jumlah, pilihan Diantar/Pick Up, estimasi kirim, konfirmasi pesanan)

AI mampu menjawab (PRD AI Capabilities): apa itu koperasi, keuntungan anggota, sistem SHU, koperasi mana yang cocok, program yang tersedia.

## Implementasi Saat Ini di Repo

| Komponen | Status | Catatan |
|---|---|---|
| `resources/js/pages/assistant.tsx` | [~] mock | AI Commerce Assistant penuh UI: chat, cart (`addToCart`/`removeFromCart`), `subtotal`, `discount` (10%), `total`. Balasan AI disimulasikan via `setTimeout` (lihat `handleSend`, L58-79). Data produk keranjang statis. |
| `resources/js/pages/dashboard.tsx` | [~] mock | AI chat member hub (`handleSendChat`, L85-105) + community feed (posts/likes/comments) + voting proposal (`handleVote`, array `votes`). Semua STATIC, tidak ada call backend. |
| `resources/js/pages/onboarding.tsx` | [~] mock | 3-role picker (Explorer/Member/Administrator) + fitur bullets: AI Search Catalog, AI Member Assistant, AI Commerce & Checkout, Digital RAT Voting, Governance Dashboard, AI Insight Engine. "Ask AI" banner statis. |
| Profiling / rekomendasi koperasi otomatis | [ ] missing | Belum ada logika profiling minat & lokasi. |
| FAQ otomatis / rekomendasi program | [ ] missing | Belum ada di repo. |

Tanda: [x] real · [~] mock · [ ] missing.

Catatan arsitektur: AI saat ini 100% client-side heuristic/statis. Tidak ada integrasi LLM live, tidak ada pemanggilan API ke backend Laravel.

## AI End-to-End Touchpoints

Peta dari PRD "AI End-to-End" (L112-130). Status berdasar repo saat ini:

| Tahap Journey | Peran AI (PRD) | Output ke User | Status Repo |
|---|---|---|---|
| Awareness | AI Recommendation — profiling minat & lokasi | Rekomendasi koperasi relevan | [ ] missing |
| Onboarding | AI Onboarding — jelaskan koperasi, SHU, hak | Panduan personal step-by-step | [~] mock (role picker statis di onboarding.tsx) |
| Aktivasi (transaksi pertama) | AI Commerce Assistant — validasi stok, harga, antar/pick up | Konfirmasi pesanan real-time | [~] mock (assistant.tsx, tanpa stok real) |
| Engagement harian | Engagement Analytics — deteksi aktivitas menurun, trigger reward | Rekomendasi aktivitas, reminder poin | [ ] missing |
| Partisipasi tata kelola | e-RAT AI Summary — rangkum agenda RAT | Ringkasan agenda, simulasi dampak SHU | [~] mock (voting di dashboard.tsx statis) |
| Governance & keputusan | Governance Insight — analisis partisipasi, deteksi anggota pasif | Insight ke pengurus | [ ] missing |
| Antar-koperasi (Kopdes Community) | Cross-Kopdes Insight Engine — cocokkan praktik baik | Rekomendasi praktik Kopdes lain | [ ] missing |

Prinsip PRD: tiap tahap wajib punya >=1 AI touchpoint terukur. Dari 7 tahap, saat ini hanya Onboarding/Aktivasi/Partisipasi tersentuh (semua masih mock). Sisa butuh revisi sebelum rilis.

## Gaps & Next Steps

1. Wire ke data nyata — hubungkan chat & commerce ke model `anggota`/`transaksi` (Laravel Eloquent + Inertia props), bukan state React statis.
2. Sambungkan LLM API — ganti `setTimeout` simulasi di `handleSend` (assistant.tsx) & `handleSendChat` (dashboard.tsx) dengan endpoint Laravel yang memanggil LLM (lihat stack AI PRD L372-376).
3. Commerce mencerminkan inventory nyata — `addToCart`/`subtotal`/`discount` harus baca stok & harga dari database, validasi jumlah pesanan, opsi Diantar/Pick Up, estimasi kirim (sesuai PRD Capabilities).
4. Tambah profiling/rekomendasi koperasi (Awareness) dan Engagement Analytics harian (reminder poin) agar seluruh 7 tahap terpenuhi.
5. FAQ otomatis & rekomendasi program — modul terpisah di atas chat assistant.

Lihat juga: `docs/modules/gamification-loyalty.md` untuk reward points yang dipicu dari aktivitas di atas.
