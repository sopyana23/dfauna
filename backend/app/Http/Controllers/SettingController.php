<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::all()->pluck('value', 'key')->toArray();

        $defaults = [
            'master_classes' => json_encode(['Ikan Hias', 'Mamalia', 'Mamalia Kecil', 'Reptil']),
            'master_habitats' => json_encode(['Air Tawar', 'Air Laut', 'Darat']),
            'master_statuses' => json_encode(['Tersedia (For Sale)', 'Habis Terjual (Sold Out)', 'Terbatas (Limited)']),
            'master_shipping_coverages' => json_encode(['Bisa Kirim se-Indonesia', 'Pulau Jawa Saja', 'Ambil Sendiri di Toko (No Shipping)']),
            'about_title' => 'Tentang DFauna',
            'about_slogan' => 'Premium Quality Pet & Aquatic Gallery',
            'about_description' => 'DFauna adalah galeri satwa hias premium terpercaya yang berkomitmen menyediakan satwa hias berkualitas tinggi, mulai dari ikan hias eksotis, reptil unik, hingga mamalia kecil yang lucu. Kami berdedikasi menjaga kesehatan prima setiap satwa demi kepuasan dan kebahagiaan para pecinta satwa di Indonesia.',
            'about_location' => 'Bandung, Jawa Barat, Indonesia',
            'about_hours' => '08:00 - 21:00 WIB (Setiap Hari)',
            'about_disclaimer' => 'DFauna berkomitmen penuh terhadap pelestarian lingkungan dan kepatuhan hukum. Kami tidak pernah dan tidak akan melayani transaksi jual-beli untuk jenis satwa liar atau hewan langka yang dilindungi oleh undang-undang.',
            'about_cards' => json_encode([
                ['title' => 'Garansi Kesehatan', 'content' => 'Setiap satwa melewati proses karantina ketat dan pemeriksaan kesehatan berkala sebelum dipasarkan.', 'icon' => 'shield'],
                ['title' => 'Transaksi Aman & Terpercaya', 'content' => 'Kami mendukung sistem pembayaran aman secara langsung maupun menggunakan jasa Rekber Syariah.', 'icon' => 'lock'],
                ['title' => 'Konsultasi Purna Jual', 'content' => 'Tim ahli kami siap membantu Anda berkonsultasi seputar pakan, akuarium, dan perawatan jangka panjang.', 'icon' => 'message']
            ])
        ];

        foreach ($defaults as $key => $defaultValue) {
            if (!isset($settings[$key])) {
                Setting::updateOrCreate(['key' => $key], ['value' => $defaultValue]);
                $settings[$key] = $defaultValue;
            }
        }

        return response()->json([
            'success' => true,
            'data' => $settings
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'settings' => 'required|array',
            'settings.whatsapp_number' => 'required|string|max:50',
            'settings.store_slogan' => 'required|string|max:255',
            'settings.promo_banner' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $inputSettings = $request->input('settings');

        foreach ($inputSettings as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        $updatedSettings = Setting::all()->pluck('value', 'key');

        return response()->json([
            'success' => true,
            'message' => 'Pengaturan toko berhasil diperbarui!',
            'data' => $updatedSettings
        ]);
    }
}
