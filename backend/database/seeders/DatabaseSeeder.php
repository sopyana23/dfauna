<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Store;
use App\Models\Fauna;
use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed default admin user
        $user = User::create([
            'name' => 'Administrator',
            'email' => 'admin@cataphor.com',
            'password' => Hash::make('password123'),
            'is_password_changed' => true
        ]);

        // 2. Create matching default Store profile for admin (Cataphor Pro Plan)
        $store = Store::create([
            'user_id' => $user->id,
            'slug' => 'cataphor',
            'plan' => 'pro',
            'store_title' => 'Cataphor',
            'store_slogan' => 'Memudahkan pelanggan menjelajahi produk dan informasi bisnis.',
            'whatsapp_number' => '628123456789',
            'enable_wa_direct' => true,
            'enable_wa_rekber' => true,
            'about_title' => 'Tentang Cataphor Store',
            'about_slogan' => 'Memudahkan pelanggan menjelajahi produk dan informasi bisnis.',
            'about_description' => 'Kami berkomitmen menyediakan produk dan barang berkualitas tinggi. Setiap barang melewati pemeriksaan kualitas sebelum dikirim.',
            'about_location' => 'Bandung, Jawa Barat, Indonesia',
            'about_hours' => '08:00 - 21:00 WIB (Setiap Hari)',
            'about_disclaimer' => 'Komitmen jaminan bisnis: Kami mengutamakan kepuasan pelanggan dan keamanan transaksi.',
            'about_cards' => [
                ['title' => 'Garansi Kualitas', 'content' => 'Setiap produk melewati pemeriksaan kualitas ketat sebelum dipasarkan.', 'icon' => 'shield'],
                ['title' => 'Transaksi Aman', 'content' => 'Mendukung sistem pembayaran aman secara langsung maupun marketplace terpercaya.', 'icon' => 'lock'],
                ['title' => 'Layanan Pelanggan', 'content' => 'Tim kami siap membantu konsultasi produk dan pemesanan dengan cepat.', 'icon' => 'message']
            ],
            'social_links' => [
                ['platform' => 'Instagram', 'url' => 'https://instagram.com/cataphor'],
                ['platform' => 'Facebook', 'url' => 'https://facebook.com/cataphor']
            ],
            'master_classes' => ['Elektronik', 'Pakaian & Aksesoris', 'Satwa Hias', 'Pakan & Perlengkapan', 'Produk General'],
            'master_habitats' => ['Baru (New)', 'Bekas (Used)', 'General'],
            'master_statuses' => ['Tersedia (Ready Stock)', 'Habis Terjual (Out of Stock)', 'Pre-Order'],
            'master_shipping_coverages' => ['Bisa Kirim se-Indonesia', 'Pulau Jawa Saja', 'Ambil Sendiri di Toko (Pickup)']
        ]);

        // 3. Call Fauna and Article Seeders
        $this->call(FaunaSeeder::class);
        $this->call(ArticleSeeder::class);

        // 4. Scoped all seeded faunas to the default admin store
        Fauna::whereNull('store_id')->update(['store_id' => $store->id]);

        // 5. Seed legacy fallback setting for safety
        Setting::create([
            'key' => 'whatsapp_number',
            'value' => '628123456789'
        ]);

        Setting::create([
            'key' => 'store_slogan',
            'value' => 'Memudahkan pelanggan menjelajahi produk dan informasi bisnis.'
        ]);
    }
}
