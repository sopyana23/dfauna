# DFauna - Galeri Fauna Hias Premium & Sistem Manajemen Inventaris

DFauna adalah aplikasi galeri fauna hias premium berbasis web yang dirancang dengan antarmuka modern, elegan, dan berfokus pada foto beresolusi tinggi layaknya *online shop* modern. Aplikasi ini dibagi menjadi dua versi tampilan (Desktop & Mobile) yang dilayani secara cerdas oleh satu backend monolith berbasis Laravel.

---

## 🚀 Fitur Utama

1. **Desain Solid Dark Nature (Premium)**:
   * Menggunakan skema warna gelap dengan kontras tinggi (solid dark nature, tanpa transparansi blur) untuk keterbacaan teks yang maksimal baik di layar komputer maupun HP.
2. **Multi-Image Upload (Maksimal 5 Foto)**:
   * Mendukung input foto hewan via **Tautan URL** maupun **Unggah Langsung dari Perangkat**.
   * **Optimasi Gambar (GD Library)**: Gambar yang diunggah akan otomatis di-resize (maksimal 1200px) dan dikompresi ke **kualitas 80%** untuk menghemat penyimpanan server dan mempercepat pemuatan halaman tanpa pecah/blur.
3. **Galeri Interaktif Pengunjung**:
   * Halaman detail produk menampilkan navigasi thumbnail foto. Pengunjung dapat mengeklik thumbnail untuk mengganti foto utama secara interaktif.
4. **Keamanan Login Administrator Ketat**:
   * Akses halaman `/admin` selalu mewajibkan form login bersih terlebih dahulu.
   * **First-Time Password Change**: Pengguna bawaan seeder wajib mengganti password default mereka saat pertama kali login sebelum diizinkan mengakses menu dashboard.
   * **Fast Logout**: Tombol keluar tanpa konfirmasi dialog yang lambat, langsung menghapus sesi dan token secara instan.
5. **Optimasi Tampilan HP (Mobile Web App)**:
   * Layout bottom sheet detail fauna yang mulus.
   * **Scrollbar-Free**: Seluruh indikator visual garis scrollbar dihilangkan secara global pada versi mobile demi tampilan menyerupai aplikasi *native* (*app-like experience*).
6. **Hubungi via WhatsApp**:
   * Tombol CTA WhatsApp terintegrasi dinamis dengan pesan otomatis berisi nama satwa dan harga yang dituju.

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
git clone https://github.com/sopyana23/dfauna.git
cd dfauna
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
*Catatan: Proses seeding akan membuat akun admin default:*
* **Email**: `admin@dfauna.com`
* **Password**: `password123`

### 4. Setup & Build Frontend
Proyek ini menyediakan file script otomatis di root untuk melakukan kompilasi kedua aplikasi React secara instan:
* Buka terminal di folder root (`dfauna/`) dan jalankan:
```powershell
# Windows PowerShell
powershell -ExecutionPolicy Bypass -File .\build-all.ps1
```
Script tersebut akan mengompilasi kode React Desktop dan Mobile, lalu memindahkannya langsung ke folder `backend/public/` agar siap dijalankan oleh Laravel.

### 5. Jalankan Server Lokal
Di dalam folder `backend/`, jalankan:
```bash
php artisan serve
```
Buka **`http://localhost:8000`** untuk melihat katalog, dan **`http://localhost:8000/admin`** untuk masuk ke panel administrator.

---

## 🌐 Panduan Deploy ke Shared Hosting (cPanel)

Aplikasi ini sudah dirancang sangat ringan sehingga **100% kompatibel dengan hosting bulanan murah** tanpa perlu sewa VPS.

1. **Ekspor Database**: Ekspor database lokal Anda ke file `.sql` dan impor di cPanel phpMyAdmin.
2. **Pemisahan Folder Keamanan (Best Practice)**:
   * Buat folder baru di luar folder `public_html` cPanel Anda, misalnya beri nama `dfauna_core`.
   * Unggah seluruh folder proyek Anda ke dalam `dfauna_core` **kecuali** isi dari folder `backend/public`.
3. **Unggah Folder Publik**:
   * Unggah semua isi file dari folder `backend/public` lokal Anda langsung ke dalam folder `public_html` cPanel Anda (termasuk folder `desktop`, `mobile`, `storage`, file `index.php`, dan `.htaccess`).
4. **Sesuaikan Path index.php**:
   * Edit file `public_html/index.php` di cPanel, ubah baris load autoloader untuk mengarah ke folder `dfauna_core`:
     ```php
     require __DIR__.'/../dfauna_core/vendor/autoload.php';
     $app = require_once __DIR__.'/../dfauna_core/bootstrap/app.php';
     ```
5. **Sesuaikan File `.env`**:
   * Sesuaikan koneksi database MySQL, `APP_URL` ke domain Anda, dan `APP_ENV=production` pada file `.env` di dalam folder `dfauna_core`.

---

## 📝 Lisensi
Proyek ini dirilis di bawah lisensi MIT.
