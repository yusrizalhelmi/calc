# Kalkulator HPP — Harga Pokok Penjualan

Kalkulator HPP online berbasis **HTML statis tunggal** (self-contained: HTML + CSS + JS dalam satu file). Desain mengikuti referensi *Compound Interest Calculator* (dua kartu: putih + biru, aksen oranye gradient, input pill, tombol gradient). Data riwayat perhitungan **disimpan di perangkat pengguna** memakai `localStorage` — tidak ada server, tidak ada database eksternal. Hanya statistik kunjungan anonim tanpa cookie (GoatCounter).

## Fitur

### Kalkulator HPP
- **3 Mode kalkulator:**
  - **Produksi / Manufaktur** — HPP per unit = (Bahan Baku + BTK + Overhead Pabrik) ÷ jumlah unit.
  - **Produk Dagang** — HPP per unit = (Harga Beli + Angkut & Asuransi + Penyimpanan) ÷ jumlah unit.
  - **Jasa / Proyek** — HPP per unit = (Tenaga Kerja + Material + Operasional) ÷ jumlah pengerjaan.
- **Margin keuntungan** dihitung *dari HPP* (markup) atau *dari harga jual* (margin on sales).
- **Biaya tambahan (opsional):** fee marketplace/payment (%), diskon (%), dan biaya kemasan per unit — masuk ke perhitungan harga bersih & profit bersih.
- **Hasil lengkap:** HPP per unit, total HPP, harga jual, profit per unit, **harga bersih** (setelah diskon & fee), **profit bersih**, **margin bersih**, **BEP (Break Even Unit)**, total keuntungan, dan rincian komponen.
- **Validasi input:** unit 0 → dianggap 1 dengan peringatan; margin dari harga jual ≥ 100% → peringatan; angka negatif otomatis di-strip saat mengetik.

### Perencanaan Target Omset 🎯
- Input target omset total + periode (Hari/Minggu/Bulan/Tahun) + hari operasional/minggu + **hari libur** dalam periode.
- Menghitung: omset per hari/minggu/bulan (konsisten berbasis harian), profit total & harian, **jumlah unit harus terjual** total & per hari, **BEP unit**, HPP total estimasi.
- Field **HPP per unit** & **harga jual** bisa auto-isi dari hasil HPP lewat tombol **↻ Pakai Hasil HPP** (juga ambil dari riwayat terakhir jika halaman di-refresh).
- Field **kapasitas produksi/hari** untuk cek apakah target melebihi kapasitas.
- Profit dihitung dari `(harga jual − HPP per unit) × unit`, bukan dari margin diketik — konsisten dengan struktur biaya.
- Penilaian kelayakan otomatis (realistis / ringan / melebihi kapasitas / rugi).

### Riwayat & Backup
- **Tombol Hitung & Simpan terpisah** — HITUNG hanya menghitung (tidak otomatis simpan); 💾 Simpan menyimpan ke riwayat (cegah duplikat berturut-turut).
- **Riwayat** tersimpan di `localStorage` (hingga 200 entri) dengan kolom: Waktu, Mode, Nama, Unit, Total HPP, HPP/Unit, Harga Jual, **Profit/Unit**, Margin.
- **Pencarian** (cari nama produk) + **filter mode** (Semua/Manufaktur/Dagang/Jasa).
- **Undo hapus** — entri yang baru dihapus bisa dikembalikan dengan satu klik.
- **Export CSV** + **Backup JSON** (format lengkap, bisa dipindah antar perangkat) + **Import JSON** dengan **validasi tiap entri** (mode harus valid, angka finite) — entri tidak valid ditolak, bukan menampilkan "undefined".
- **💬 Bagikan hasil** ke WhatsApp (ringkasan HPP atau rencana target).
- **Draft otomatis** — input HPP & perencanaan tersimpan saat refresh (tidak hilang).

### Antarmuka
- **Format ribuan otomatis** saat mengetik (`5.000.000`, bukan `5000000`) — pakai `type="text" inputmode="numeric"`, menghindari masalah `type=number` (huruf "e", scroll mouse).
- **Navbar sticky** 4 menu: HPP, Perencanaan, Panduan, Riwayat (smooth-scroll + auto-highlight; hamburger di mobile dengan `aria-expanded`).
- **📘 Section Panduan** — langkah penggunaan (1–5) + tabel penjelasan tiap isian.
- **Fokus keyboard** jelas (`:focus-within` ring oranye); **label terhubung ke input** (`for`/`id`) untuk screen reader.
- **Responsif** 375px–1920px; di mobile form muncul lebih dulu (ilustrasi disembunyikan).
- **Footer CTA + sosial** — order aplikasi/web/platform (WhatsApp 0855-3636-2553), QRIS traktir kopi, Instagram @id.ratakiri, blog ratakiriblog.vercel.app.

### Teknis
- **SEO:** `og:title/description/image`, `theme-color`, `twitter:card`, favicon SVG.
- **PWA:** `manifest.json` + service worker (`sw.js`) untuk caching offline.
- **Keamanan:** semua output riwayat di-escape (cegah XSS via import JSON yang dimodifikasi).
- **Tanpa dependensi runtime** — file HTML statis + `qris.jpg` + `favicon.svg` + `manifest.json` + `sw.js`. Hanya font Google Fonts (Nunito) yang diambil dari luar.

## Menjalankan secara lokal

Buka file `index.html` langsung di browser (double-click). Tidak perlu server, tidak perlu `npm install`, tidak perlu build step.

## Deploy ke GitHub Pages

1. **Buat repository baru** di GitHub (mis. `kalkulator-hpp`). Jangan centang "Initialize with README" jika Anda akan meng-upload file manual.

2. **Upload file** ke root repository. Anda bisa:
   - Drag-and-drop lewat web GitHub, **atau**
   - Clone repo lalu salin file:
     ```bash
     git clone https://github.com/<username>/kalkulator-hpp.git
     cd kalkulator-hpp
     cp ../index.html ../qris.jpg ../favicon.svg .
     cp ../icon-192.png ../icon-512.png ../apple-touch-icon.png ../og-image.png .
     cp ../manifest.json ../sw.js ../README.md .
     git add .
     git commit -m "Tambah kalkulator HPP"
     git push origin main
     ```
   > **Penting:** GitHub Pages mencari `index.html` di root — nama file sudah `index.html` (jangan rename jadi `kalkulator-hpp.html`). Sertakan semua aset (`qris.jpg`, `favicon.svg`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `og-image.png`, `manifest.json`, `sw.js`) agar footer, favicon, PWA, dan preview sosial media berfungsi.

3. **Aktifkan GitHub Pages:**
   - Buka tab **Settings** → **Pages** (menu kiri).
   - Pada section **Build and deployment**, pilih:
     - **Source:** `Deploy from a branch`
     - **Branch:** `main` (atau `master`) → folder: `/(root)`
   - Klik **Save**.

4. **Tunggu 1–3 menit.** URL publik Anda akan muncul di bagian atas halaman Pages, formatnya:
   ```
   https://<username>.github.io/kalkulator-hpp/
   ```

5. **Selesai.** Buka URL tersebut di browser. Kalkulator siap dipakai. Setiap kali Anda push perubahan ke `main`, GitHub Pages akan otomatis re-deploy dalam 1–3 menit.

### Catatan teknis GitHub Pages

- GitHub Pages menyajikan **file statis saja** — HTML/CSS/JS, gambar, font. Tidak ada backend. Kalkulator ini cocok 100%.
- `localStorage` terikat pada **origin** (protokol + domain + path). Jadi data pengguna hanya bisa diakses dari URL Pages yang sama. Ganti repo/URL = data tidak ikut pindah (gunakan fitur Export CSV / Import JSON untuk backup).
- HTTPS otomatis aktif di `*.github.io`.

## Struktur file

```
kalkulator-hpp/
├── index.html            ← file kalkulator (HTML+CSS+JS, self-contained)
├── qris.jpg              ← gambar QRIS untuk traktir kopi (footer)
├── favicon.svg           ← favicon SVG
├── icon-192.png          ← ikon PWA 192×192 (any)
├── icon-512.png          ← ikon PWA 512×512 (any + maskable)
├── apple-touch-icon.png  ← ikon iOS 180×180 (PNG, karena iOS tak dukung SVG)
├── og-image.png          ← banner Open Graph 1200×630 (untuk preview sosial media)
├── manifest.json         ← manifest PWA (installable, standalone)
├── sw.js                 ← service worker (network-first navigasi + cache offline + cache font Google)
└── README.md             ← file ini
```

> **Catatan:** Semua file harus berada di folder yang sama, dirujuk via path relatif. `index.html` adalah nama final (bukan `kalkulator-hpp.html`) agar URL bersih dan `start_url` PWA cukup `./`.

> **Update PWA:** Service worker memakai strategi **network-first untuk navigasi** dengan **batas 3 detik** (`fetchTimeout`) agar di sinyal lemah cepat fallback ke cache (pengguna selalu dapat versi terbaru saat online, fallback cache saat offline/timeout) + **cache font Google** agar Nunito tetap tersedia offline. Hanya respons `ok` (status 200) yang di-cache. Naikkan `CACHE_VERSION` di `sw.js` setiap rilis agar cache lama dibersihkan.

> **URL OG/canonical:** `og:image`, `og:url`, `twitter:image`, dan `canonical` di `index.html` memakai URL absolut `https://ratakiri.github.io/kalkulator-hpp/` (ganti dengan domain Anda yang sebenarnya sebelum deploy) agar pratinjau WhatsApp/Facebook menampilkan gambar dan tautan dengan benar.

## Privasi data

- Semua input, draft, riwayat HPP, dan rencana target **hanya disimpan di browser pengguna** (`localStorage`). Key: `kalkulator_hpp_history_v2`, `kalkulator_hpp_draft_hpp_v1`, `kalkulator_hpp_plans_v2`, `kalkulator_hpp_plan_last_v1`.
- **Data perhitungan tidak dikirim ke server mana pun.** Request keluar hanya: statistik kunjungan anonim GoatCounter (tanpa cookie; hanya jumlah kunjungan dan nama aksi tombol, bukan isi input) dan font Google Fonts (Nunito) saat halaman dimuat — opsional, bisa dihapus dengan menghapus `<link>` Google Fonts untuk 100% offline (font fallback ke system-ui). Dengan service worker, setelah kunjungan pertama halaman juga dapat dibuka offline.
- Pengguna dapat menghapus data kapan saja lewat tombol **🗑 Hapus Semua** (riwayat HPP & rencana target terpisah), atau **Undo** untuk mengembalikan entri yang baru dihapus.

## Rumus HPP yang dipakai

**Manufaktur (per unit):**
```
HPP/unit = (Biaya Bahan Baku + Biaya Tenaga Kerja Langsung + Biaya Overhead Pabrik) / Jumlah Unit
```

**Dagang (per unit):**
```
HPP/unit = (Harga Beli + Biaya Angkut & Asuransi + Biaya Penyimpanan & Lainnya) / Jumlah Unit
```

**Jasa / Proyek (per unit):**
```
HPP/unit = (Biaya Tenaga Kerja + Biaya Material + Biaya Operasional & Overhead) / Jumlah Unit
```

**Harga jual:**
- Margin *dari HPP* (markup): `Harga Jual = HPP × (1 + margin%)`
- Margin *dari harga jual*: `Harga Jual = HPP / (1 − margin%)`

**Harga bersih (setelah diskon & fee marketplace):**
```
Setelah diskon = Harga Jual × (1 − diskon%)
Harga bersih    = Setelah diskon × (1 − fee%)
Profit bersih  = Harga bersih − HPP per unit
Margin bersih  = Profit bersih / Harga bersih × 100%
```

**BEP (Break Even Unit) — pemisahan biaya tetap & variabel:**
```
Biaya TETAP:
  - Manufaktur: Overhead pabrik
  - Dagang: Angkut & asuransi + penyimpanan
  - Jasa: Operasional & overhead
Biaya VARIABEL per unit:
  - Manufaktur: (Bahan baku + BTK)/unit + kemasan
  - Dagang: Harga beli/unit + kemasan
  - Jasa: (Tenaga kerja + material)/unit

Kontribusi margin = Harga bersih − Biaya variabel per unit
BEP unit = Biaya TETAP / Kontribusi margin   (dibulatkan ke atas)
```
BEP = jumlah unit minimum yang harus terjual agar biaya tetap tertutup (impas). Di atas BEP, mulai untung. Pemisahan tetap/variabel menghindari penghitungan ganda (HPP per unit sudah mengandung biaya tetap).

> **Catatan:** BEP hanya dihitung di kalkulator HPP (berdasar biaya tetap aktual). Di Perencanaan, BEP tidak ditampilkan karena nilainya bergantung pada target omset, bukan struktur biaya.

**Harga jual agar margin bersih tercapai (tombol 🎯 Harga Target):**
```
Harga target = HPP per unit / grossMargin / ((1 − diskon) × (1 − fee))
  grossMargin (dari HPP)  = 1 / (1 + margin%)
  grossMargin (dari jual) = 1 − margin%
```
Berguna jika Anda menjual via marketplace dengan diskon & potongan fee, dan ingin margin bersih tertentu tercapai.

## Rumus Perencanaan Target Omset

```
Total hari kalender  = periode × (1 hari | 7 minggu | 30 bulan | 365 tahun)
Total minggu         = total hari / 7
Hari kerja           = round(total minggu × hari operasional/minggu) − hari libur

Omset per hari kerja = target omset / hari kerja
Omset per minggu     = omset per hari × hari operasional/minggu
Omset per bulan      = omset per hari × (hari operasional/minggu × 52 / 12)

Profit per unit      = harga jual − HPP per unit
Unit harus terjual   = target omset / harga jual
Profit total         = profit per unit × unit harus terjual
Profit per hari      = profit total / hari kerja
HPP total estimasi   = HPP per unit × unit harus terjual
```

> **Catatan estimasi:** 1 bulan ≈ 52/12 minggu ≈ 30,4 hari (estimasi). Omset mingguan & bulanan dihitung dari omset harian × faktor konversi, sehingga konsisten untuk periode apa pun (mis. target 10 hari tidak akan tampil sebagai "omset per bulan = target penuh").

**Contoh:** Target Rp 2.500.000 dalam 3 bulan, 6 hari kerja/minggu, harga jual Rp 110.500, HPP per unit Rp 85.000.
- Hari kerja = round((90/7) × 6) = 77 hari
- Omset/hari = 2.500.000 ÷ 77 = **Rp 32.468**
- Omset/minggu = 32.468 × 6 = **Rp 194.808**
- Omset/bulan = 32.468 × (6×52/12) = 32.468 × 26 = **Rp 844.168**
- Profit/unit = 110.500 − 85.000 = Rp 25.500
- Unit harus terjual = 2.500.000 ÷ 110.500 = **23 unit** (≈ 1 unit/hari)
- Profit total = 25.500 × 22,62 = **Rp 576.923**

## Lisensi

Bebas dipakai, dimodifikasi, dan didistribusikan ulang.
