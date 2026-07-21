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
            'email' => 'admin@dfauna.com',
            'password' => Hash::make('password123'),
            'is_password_changed' => true
        ]);

        // 2. Create matching default Store profile for admin
        $store = Store::create([
            'user_id' => $user->id,
            'slug' => 'dfauna',
            'store_title' => 'DFauna',
            'store_slogan' => 'Galeri Satwa Hias Premium & Pengiriman Seluruh Indonesia',
            'whatsapp_number' => '628123456789',
            'about_title' => 'Tentang DFauna',
            'about_slogan' => 'Premium Quality Pet & Aquatic Gallery',
            'about_description' => 'Kami berkomitmen menyediakan satwa hias berkualitas tinggi. Setiap satwa melewati proses karantina ketat sebelum dipasarkan.',
            'about_location' => 'Bandung, Jawa Barat, Indonesia',
            'about_hours' => '08:00 - 21:00 WIB (Setiap Hari)',
            'about_disclaimer' => 'Komitmen pelestarian lingkungan: Kami tidak pernah dan tidak akan melayani transaksi jual-beli untuk jenis satwa liar atau hewan langka yang dilindungi undang-undang.',
            'about_cards' => [
                ['title' => 'Garansi Kesehatan', 'content' => 'Setiap satwa melewati proses karantina ketat dan pemeriksaan kesehatan berkala.', 'icon' => 'shield'],
                ['title' => 'Transaksi Aman', 'content' => 'Mendukung sistem pembayaran aman secara langsung maupun transfer terpercaya.', 'icon' => 'lock'],
                ['title' => 'Konsultasi Care', 'content' => 'Tim ahli kami siap membantu konsultasi pakan, wadah, dan perawatan jangka panjang.', 'icon' => 'message']
            ],
            'social_links' => [
                ['platform' => 'Instagram', 'url' => 'https://instagram.com/dfauna'],
                ['platform' => 'Facebook', 'url' => 'https://facebook.com/dfauna']
            ],
            'master_classes' => ['Ikan Hias', 'Mamalia', 'Mamalia Kecil', 'Reptil'],
            'master_habitats' => ['Air Tawar', 'Air Laut', 'Darat'],
            'master_statuses' => ['Tersedia (For Sale)', 'Habis Terjual (Sold Out)', 'Terbatas (Limited)'],
            'master_shipping_coverages' => ['Bisa Kirim se-Indonesia', 'Pulau Jawa Saja', 'Ambil Sendiri di Toko (No Shipping)']
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
            'value' => 'Galeri Satwa Hias Premium & Pengiriman Seluruh Indonesia'
        ]);
    }
}
