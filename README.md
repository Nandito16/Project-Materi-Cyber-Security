# Basic Cyber Security Learning Platform
Website edukasi interaktif yang dirancang untuk membantu pemula mempelajari dasar-dasar Cyber Security, khususnya mengenai teknik pemindaian website dan beberapa jenis serangan yang umum ditemukan dalam keamanan aplikasi web.
Platform ini menyediakan materi pembelajaran, simulasi serangan berbasis terminal, penjelasan cara pencegahan dan mitigasi, serta quiz interaktif untuk menguji pemahaman pengguna terhadap setiap materi.

## Tujuan Project
Project ini bertujuan untuk:
- Memperkenalkan konsep dasar Cyber Security kepada pemula.
- Memberikan pemahaman mengenai teknik dan metode serangan pada aplikasi web.
- Menghadirkan simulasi interaktif agar pengguna dapat memahami bagaimana suatu serangan bekerja.
- Memberikan pengetahuan mengenai langkah-langkah pencegahan dan mitigasi terhadap kerentanan keamanan.
- Mengukur pemahaman pengguna melalui quiz pada setiap materi.

## Materi Pembelajaran
Terdapat empat materi utama yang dapat dipelajari:

### 1. Web Scanning
Mempelajari teknik pemindaian website untuk mengidentifikasi informasi, teknologi, konfigurasi, serta potensi kerentanan pada suatu website.
**Materi meliputi:**
- Pengertian Web Scanning.
- Tujuan dan cara kerja Web Scanning.
- Informasi yang dapat diperoleh melalui proses scanning.
- Simulasi Web Scanning menggunakan terminal.
- Cara mengamankan website dari pemindaian dan pengumpulan informasi yang tidak diinginkan.
- Quiz Web Scanning.

### 2. Directory Scanning
Mempelajari teknik pencarian direktori dan file tersembunyi pada sebuah web server yang tidak selalu dapat diakses melalui navigasi website.
**Materi meliputi:**
- Pengertian Directory Scanning.
- Cara kerja Directory Scanning.
- Fungsi dan penggunaan wordlist.
- Risiko direktori atau file sensitif yang terekspos.
- Simulasi Directory Scanning menggunakan terminal.
- Cara mengamankan direktori dan file pada web server.
- Quiz Directory Scanning.

### 3. SQL Injection
Mempelajari salah satu jenis serangan pada aplikasi web yang memanfaatkan kelemahan dalam pemrosesan query SQL sehingga penyerang dapat memanipulasi interaksi aplikasi dengan database.
**Materi meliputi:**
- Pengertian SQL Injection.
- Cara kerja SQL Injection.
- Penyebab terjadinya kerentanan SQL Injection.
- Contoh kasus SQL Injection.
- Cara mencegah SQL Injection menggunakan Prepared Statements dan Parameterized Queries.
- Quiz SQL Injection.

### 4. Brute Force Attack
Mempelajari metode serangan yang dilakukan dengan mencoba berbagai kombinasi username dan password secara berulang untuk memperoleh akses ke suatu akun atau sistem.
**Materi meliputi:**
- Pengertian Brute Force Attack.
- Cara kerja Brute Force Attack.
- Perbedaan Brute Force dan Dictionary Attack.
- Faktor yang memengaruhi keberhasilan serangan.
- Simulasi Brute Force menggunakan terminal.
- Cara mencegah Brute Force melalui Rate Limiting, Account Lockout, CAPTCHA, dan Multi-Factor Authentication (MFA).
- Quiz Brute Force.

## Fitur Utama
| Fitur | Deskripsi |
| Learning Materials | Materi pembelajaran Cyber Security yang disusun secara terstruktur. |
| Terminal Simulation | Simulasi interaktif berbasis terminal untuk memahami cara kerja beberapa teknik scanning dan serangan. |
| Attack Demonstration | Demonstrasi konsep serangan dalam lingkungan simulasi yang aman. |
| Security Prevention | Penjelasan metode pencegahan dan mitigasi terhadap setiap jenis serangan. |
| Interactive Quiz | Quiz pada setiap materi untuk menguji pemahaman pengguna. |

## Terminal Simulation
Salah satu fitur utama website ini adalah simulasi berbasis terminal yang memungkinkan pengguna memahami bagaimana beberapa teknik scanning dan serangan dilakukan.
Simulasi tersedia pada materi:
- **Web Scanning:** Memperlihatkan proses pemindaian informasi website.
- **Directory Scanning:** Memperlihatkan proses pencarian direktori dan file pada web server.
- **Brute Force:** Memperlihatkan proses percobaan kombinasi username dan password.
Simulasi dibuat untuk tujuan edukasi dan demonstrasi konsep Cyber Security, bukan untuk melakukan serangan terhadap sistem nyata tanpa izin.

## Security Awareness
Selain mempelajari bagaimana serangan bekerja, pengguna juga akan mempelajari bagaimana cara melindungi sistem dari berbagai ancaman keamanan.
Pendekatan pembelajaran menggunakan dua perspektif:
1. **Attacker Perspective:** Memahami bagaimana teknik scanning dan serangan bekerja.
2. **Defender Perspective:** Memahami bagaimana mengidentifikasi, mencegah, dan mengurangi risiko keamanan.

## Quiz & Evaluation
Setiap materi dilengkapi dengan quiz interaktif untuk mengevaluasi pemahaman pengguna.
Quiz mencakup:
- Pemahaman konsep dasar.
- Identifikasi metode serangan.
- Analisis penyebab kerentanan.
- Pemilihan metode pencegahan yang tepat.

## Technology Stack
Bagian ini dapat disesuaikan dengan teknologi yang digunakan dalam pengembangan project.
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Laravel / PHP
- **Database:** MySQL
- **Development Environment:** XAMPP

## Project Scope
Project ini difokuskan pada pembelajaran dasar Cyber Security untuk pemula dengan pendekatan teori dan praktik melalui simulasi.
Seluruh simulasi dirancang dalam lingkungan pembelajaran yang terkontrol dan tidak ditujukan untuk melakukan pengujian terhadap website atau sistem pihak ketiga tanpa izin.
