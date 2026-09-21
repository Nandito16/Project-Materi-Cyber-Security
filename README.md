# 🧱 Akademi Keamanan Siber Bloxy

Media belajar keamanan siber bertema Roblox untuk anak-anak.
Dibuat dengan HTML, CSS, dan JavaScript murni — tanpa framework, tanpa instalasi.

---

## 📁 Struktur File

```
bloxy-site/
├── index.html          <- Halaman utama (materi 1-6 + kuis)
├── web-scanning.html   <- Halaman khusus materi Web Scanning
├── port-scanning.html  <- Halaman khusus materi Port Scanning
├── css/
│   ├── base.css        <- Kerangka umum (SEMUA halaman)
│   ├── lab.css         <- Komponen simulasi (2 halaman praktik)
│   ├── index.css       <- Khusus beranda
│   ├── web-scanning.css   <- Khusus halaman Web Scanning
│   └── port-scanning.css  <- Khusus halaman Port Scanning
├── js/
│   ├── script.js       <- Demo + kuis halaman utama
│   ├── scanning.js     <- Simulasi WhatWeb & Gobuster + kuis
│   └── portscan.js     <- Simulasi Nmap + mini-game tembok api + kuis
└── README.md           <- File ini
```

Pemisahan ini mengikuti prinsip **separation of concerns**:

| File | Tugas | Analogi |
|------|-------|---------|
| `.html` | Kerangka & isi | Tulang |
| `.css` | Penampilan | Baju |
| `.js` | Aksi & interaksi | Otak |

---

## 🎨 Cara CSS Dibagi

Setiap halaman punya file CSS-nya sendiri, tapi bagian yang sama **tidak
ditulis dua kali**. Aturannya sederhana:

> Gaya yang dipakai lebih dari satu halaman → masuk file bersama.
> Gaya yang hanya dipakai satu halaman → masuk file halaman itu.

| File CSS | Dimuat oleh | Isinya |
|----------|-------------|--------|
| `base.css` | **ketiga** halaman | Variabel warna, navigasi, hero, kartu, tombol, kuis, footer |
| `lab.css` | web-scanning + port-scanning | Kotak aturan, terminal palsu, bilah kemajuan, tabel, daftar temuan |
| `index.css` | index.html | Avatar, kartu unggulan, skor kuis beranda |
| `web-scanning.css` | web-scanning.html | Tema ungu + penyesuaian terminal WhatWeb/Gobuster |
| `port-scanning.css` | port-scanning.html | Tema hijau, label status pintu, ilustrasi pintu, mini-game tembok api |

Urutan pemuatan di tiap halaman:

```html
<!-- index.html -->
<link rel="stylesheet" href="css/base.css" />
<link rel="stylesheet" href="css/index.css" />

<!-- web-scanning.html -->
<link rel="stylesheet" href="css/base.css" />
<link rel="stylesheet" href="css/lab.css" />
<link rel="stylesheet" href="css/web-scanning.css" />

<!-- port-scanning.html -->
<link rel="stylesheet" href="css/base.css" />
<link rel="stylesheet" href="css/lab.css" />
<link rel="stylesheet" href="css/port-scanning.css" />
```

File khusus halaman dimuat **paling akhir**, jadi ia bisa menimpa gaya bawaan
dari `base.css` bila perlu.

### Warna aksen tiap halaman

`base.css` menyediakan satu variabel `--page-accent`, lalu tiap halaman
menimpanya lewat file CSS-nya sendiri. Variabel ini mewarnai kubus logo dan
kata bersorot di judul, sehingga tiap halaman punya identitas:

| Halaman | Aksen |
|---------|-------|
| Beranda | 🔴 Merah |
| Web Scanning | 🟣 Ungu |
| Port Scanning | 🟢 Hijau |

Mau mengubah tema satu halaman saja? Cukup ubah satu baris `--page-accent`
di file CSS halaman itu.

---

## 🗺️ Alur Halaman

```
index.html
   │
   ├─ Materi 1: Web Scanning  ──[tombol]──>  web-scanning.html
   │                                               │
   ├─ Materi 2: Port Scanning ──[tombol]──>  port-scanning.html
   │                                               │
   ├─ Materi 3: SQL Injection                      │
   ├─ Materi 4: Email Injection                    │
   ├─ Materi 5: Command Injection                  │
   ├─ Materi 6: Kebocoran Informasi                │
   └─ Kuis Penjaga Digital        <──[kembali]─────┘
```

---

## ▶️ Cara Menjalankan

Klik dua kali `index.html` — selesai. Tidak perlu server.

Opsional, lewat server lokal:

```bash
cd bloxy-site
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000`.

---

## 🛡️ Catatan Keamanan (PENTING)

**Semua demo di website ini adalah SIMULASI dalam memori.**

- Tidak ada database, server, atau email sungguhan.
- **Tidak ada alat WhatWeb, Gobuster, atau Nmap yang benar-benar dijalankan.**
- **Tidak ada koneksi jaringan sama sekali, tidak ada port yang benar-benar
  diketuk, tidak ada soket yang dibuka.** Semua hasil pemindaian sudah ditulis
  lebih dulu (hardcoded) di dalam `js/scanning.js` dan `js/portscan.js`.
- Semua target berakhiran `.latihan` — domain fiktif yang tidak ada di internet.
- Tidak ada data yang dikirim, dikumpulkan, atau disimpan ke mana pun.

Tujuannya adalah **kesadaran keamanan (security awareness)**: anak belajar
mengenali bentuk serangan dan memahami cara melindungi diri — bukan belajar
menyerang sistem orang lain.

### ⚠️ Aturan yang ditekankan ke anak

Halaman Web Scanning dan Port Scanning sama-sama dibuka dengan kotak aturan
berwarna oranye **sebelum** materi teknis apa pun:

1. Selalu minta izin sebelum memindai website atau komputer apa pun.
2. Hanya pindai milik sendiri atau target latihan resmi.
3. Jangan pindai Wi-Fi sekolah, kantor, atau warnet — jaringan itu bukan milikmu.
4. Kalau menemukan lubang keamanan, **laporkan** — jangan diutak-atik.
5. Ilmu ini untuk melindungi, bukan merusak.

---

## 📚 Materi yang Diajarkan

| No | Topik | Yang dipelajari anak |
|----|-------|----------------------|
| 1 | **Web Scanning** | WhatWeb (mengenali teknologi) & Gobuster (mencari halaman tersembunyi) |
| 2 | **Port Scanning** | Nmap (mengecek pintu terbuka) & cara kerja tembok api |
| 3 | SQL Injection | "Kata ajaib" bisa menipu pintu login yang tidak aman |
| 4 | Email Injection | Baris tersembunyi bisa menambah penerima rahasia |
| 5 | Command Injection | Perintah ekstra bisa menyuruh robot berbuat jahat |
| 6 | Information Leakage | Pesan error bisa membocorkan rahasia |

Setiap halaman ditutup dengan **kuis** yang menekankan etika: temuan harus
**dilaporkan**, bukan disalahgunakan.

---

## 🔎 Detail Materi Web Scanning

| Alat | Pertanyaan yang dijawab | Analogi untuk anak |
|------|-------------------------|--------------------|
| **WhatWeb** | "Website ini terbuat dari apa?" | Membaca label di baju |
| **Gobuster** | "Pintu tersembunyinya di mana?" | Tukang pos mengetuk tiap pintu |

**Simulasi WhatWeb** menyediakan dua target untuk dibandingkan:
- `toko-bloxy.latihan` — website ceroboh (versi server & program lama terlihat)
- `blog-bloxy.latihan` — website rapi (versi disembunyikan, HSTS & CSP aktif)

**Simulasi Gobuster** menampilkan animasi pencarian 18 kata dengan bilah
kemajuan, lalu menjelaskan temuan berbahaya seperti `/backup` dan `/.git`.

Arti kode status yang diajarkan: **200** ada & terbuka, **301** dialihkan,
**403** dilarang masuk, **404** tidak ada.

---

## 🚪 Detail Materi Port Scanning

Konsep intinya: **port = pintu bernomor**. Satu komputer melakukan banyak tugas
sekaligus, jadi tiap tugas diberi pintu sendiri (443 untuk website, 25 untuk
email, 3306 untuk database).

**Simulasi Nmap** punya dua target dan dua mode:

| Target | Kondisi |
|--------|---------|
| `server-ceroboh.latihan` | 9 pintu terbuka, termasuk `telnet`, `mysql`, dan `rdp` |
| `server-rapi.latihan` | Hanya `80` & `443` terbuka, sisanya tertutup/tersaring |

| Mode | Perintah yang disimulasikan |
|------|-----------------------------|
| Cepat | `nmap target` |
| Lengkap | `nmap -sV target` (sekalian menampilkan versi layanan) |

Tiga status yang diajarkan: **terbuka** (ada yang menjawab), **tertutup**
(pintunya ada tapi sepi), dan **tersaring** (dihalau tembok api).

### 🧱 Mini-game "Jadi Tembok Api"

Anak diberi 6 pintu terbuka lalu memutuskan mana yang ditutup. Jawaban benar:
tutup `21`, `23`, `3306`, `3389`; biarkan terbuka `80` dan `443`.

Pelajaran pentingnya: **menutup semua pintu itu juga salah** — websitenya jadi
tidak bisa dikunjungi siapa pun. Penjaga yang baik tahu mana yang perlu.

---

## 🔧 Cara Mengubah

**Ganti warna tema keseluruhan** — buka `css/base.css`, ubah blok `:root` di
paling atas. Semua halaman ikut berubah.

**Ganti warna satu halaman saja** — ubah `--page-accent` di file CSS halaman
tersebut (`index.css`, `web-scanning.css`, atau `port-scanning.css`).

**Tambah soal kuis** — buka `js/script.js` (halaman utama), `js/scanning.js`,
atau `js/portscan.js`, tambahkan objek ke array `quiz` / `quizScan` / `quizPort`:

```js
{
  q:'Pertanyaan barumu?',
  o:['Pilihan A','Pilihan B','Pilihan C'],
  a:1   // indeks jawaban benar, mulai dari 0
}
```

**Tambah target WhatWeb baru** — di `js/scanning.js`, tambahkan entri pada objek
`targetWhatWeb`, lalu tambahkan `<option>` di `web-scanning.html`.

**Ubah wordlist Gobuster** — di `js/scanning.js`, edit array `kamus`
(format: `['/nama-folder', kode-status]`) dan tambahkan penjelasannya di
objek `artiTemuan`.

**Tambah target Nmap baru** — di `js/portscan.js`, tambahkan entri pada objek
`targetPort` dengan format `[nomor, layanan, status, catatan]`, lalu tambahkan
`<option>` di `port-scanning.html`.

**Ubah mini-game tembok api** — di `js/portscan.js`, edit array `pintuGame`
(format: `[nomor, layanan, harusTutup, alasan]`).

**Tambah modul pelajaran baru** — salin satu blok `<section>` di `index.html`,
ganti `id`-nya, lalu buat fungsi barunya di `js/script.js`.

---

## ⚖️ Lisensi & Disclaimer

Website ini **tidak berafiliasi dengan Roblox Corporation**. Tema visual dibuat
sendiri sepenuhnya dengan CSS (tidak memakai aset atau logo resmi Roblox).

Gunakan hanya untuk tujuan edukasi.
