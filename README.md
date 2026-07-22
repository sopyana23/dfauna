# Catavor - Platform Katalog Usaha Digital Interaktif & Galeri SaaS Premium

**Catavor** adalah platform katalog usaha digital interaktif berbasis web (*Multi-Tenant SaaS*) yang dirancang dengan antarmuka modern, elegan, dan berfokus pada foto beresolusi tinggi layaknya *online shop* modern. Catavor memungkinkan pemilik bisnis untuk membuat dan mengelola katalog produk digital dengan mudah dalam versi Desktop & Mobile.

---

## 🚀 Fitur Utama

1. **Sistem Multi-Tenant & Berlangganan SaaS (Plan Free & Plan Pro)**:
   * **Plan Free**: Gratis selamanya, hingga 10 postingan produk.
   * **Plan Pro**: Produk unlimited, Halaman Tentang Kami kustom, kontrol domain, dan akses fitur eksklusif.
2. **Dukungan Kupon Dinamis & Aktivasi Instan**:
   * **Kupon 100% Gratis** (seperti `CATAVOR100` / `GRATISPRO`): Prosedur pembayaran (QRIS/Bank) otomatis di-hide dan akun Plan Pro langsung aktif instan 1-klik tanpa perlu menunggu verifikasi admin.
   * **Kupon Diskon** (seperti `DISKON10K`): Potongan harga otomatis yang dihitung secara real-time pada halaman checkout.
3. **Google Single Sign-On (SSO) & Form Pendaftaran Instan**:
   * Pendaftaran akun cepat dengan **Google SSO** tanpa alur pendaftaran yang rumit.
4. **Pusat Notifikasi Dashboard Admin & Status Verifikasi Pembayaran**:
   * **Notifikasi Dinamis**: Notifikasi selamat datang, informasi tier, diskon kupon, dan status verifikasi pembayaran disesuaikan otomatis untuk tiap skenario pendaftaran.
   * **Header Bell Badge**: Ikon lonceng notifikasi di dashboard admin dengan badge pesan belum dibaca.
   * **Pending Verification Banner**: Informasi status verifikasi pembayaran Plan Pro (Est. 1x24 Jam) yang hanya tampil di dalam halaman Admin Dashboard.
5. **Perlindungan Pembatalan Checkout (Anti-Abandoned Account)**:
   * Pembuatan akun Plan Pro ditahan (*deferred*) hingga checkout diselesaikan. Menekan "Kembali ke Halaman Utama" akan membersihkan draft tanpa membuat akun di database.
6. **Navigasi & Layout Mobile Executive Dark Slate (Responsive)**:
   * Header konsisten, rapih horizontal padding (1rem), serta **Floating Promotional Banner SaaS** pada toko tier gratisan untuk mengarahkan pengunjung membuat katalog digital mereka sendiri di Catavor.
7. **Multi-Image Upload & Optimasi Otomatis (GD Library)**:
   * Gambar otomatis di-resize (maksimal 1200px) dan dikompresi ke kualitas 80% WEBP/JPG untuk penghematan memori server dan kecepatan pemuatan halaman.
8. **Integrasi Chat WhatsApp**:
   * Tombol CTA WhatsApp terintegrasi dinamis dengan pesan otomatis berisi detail produk dan harga.

---

## 🛠️ Tech Stack

* **Backend**: Laravel 12, Laravel Sanctum (Token-based Auth), SQLite/MySQL, GD Library (Image Optimization).
* **Frontend (Desktop)**: React, Vite, TypeScript, Lucide Icons, Vanilla CSS.
* **Frontend (Mobile)**: React, Vite, TypeScript, Lucide Icons, Vanilla CSS.

---

## 💻 Panduan Instalasi Lokal

### 1. Prasyarat
* PHP >= 8.2 (Pastikan ekstensi `gd` telah diaktifkan di `php.ini`)
* Composer
* Node.js >= 20.19.0
* Git

### 2. Kloning Repositori
```bash
git clone https://github.com/sopyana23/catavor.git
cd catavor
```

### 3. Setup Backend Laravel
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
```
*Catatan: Proses seeding akan membuat data awal seeder:*
* **Email Admin**: `admin@catavor.com`
* **Password**: `password123`

### 4. Setup & Build Frontend
Proyek ini menyediakan file script otomatis di root untuk melakukan kompilasi kedua aplikasi React (Desktop & Mobile) secara instan:
```powershell
# Windows PowerShell
powershell -ExecutionPolicy Bypass -File .\build-all.ps1
```
Script ini akan mengompilasi kode React Desktop dan Mobile, lalu memindahkannya langsung ke folder `backend/public/` agar siap dijalankan oleh Laravel.

### 5. Jalankan Server Lokal
Di dalam folder `backend/`, jalankan:
```bash
php artisan serve
```
Buka **`http://localhost:8000`** untuk melihat katalog, dan **`http://localhost:8000/admin`** untuk masuk ke panel administrator.

---

## 🌐 Panduan Deploy ke Shared Hosting (cPanel)

Aplikasi ini dirancang ringan dan **100% kompatibel dengan shared hosting murah** tanpa perlu VPS.

1. **Ekspor Database**: Ekspor database lokal ke file `.sql` dan impor via cPanel phpMyAdmin.
2. **Pemisahan Folder Keamanan (Best Practice)**:
   * Buat folder baru di luar folder `public_html` cPanel Anda, misalnya `catavor_core`.
   * Unggah seluruh folder proyek Anda ke dalam `catavor_core` **kecuali** isi dari folder `backend/public`.
3. **Unggah Folder Publik**:
   * Unggah semua isi file dari folder `backend/public` lokal Anda langsung ke dalam folder `public_html` cPanel Anda (termasuk folder `desktop`, `mobile`, `storage`, file `index.php`, dan `.htaccess`).
4. **Sesuaikan Path index.php**:
   * Edit file `public_html/index.php` di cPanel, ubah baris load autoloader untuk mengarah ke folder `catavor_core`:
     ```php
     require __DIR__.'/../catavor_core/vendor/autoload.php';
     $app = require_once __DIR__.'/../catavor_core/bootstrap/app.php';
     ```
5. **Sesuaikan File `.env`**:
   * Sesuaikan koneksi database MySQL, `APP_URL` ke domain Anda, dan `APP_ENV=production` pada file `.env` di dalam folder `catavor_core`.

---

## 📝 Lisensi
Proyek ini dirilis di bawah lisensi MIT.
