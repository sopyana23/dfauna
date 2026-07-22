<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:6',
            'store_name' => 'required|string|max:255',
            'store_slug' => [
                'required',
                'string',
                'max:100',
                'regex:/^[a-zA-Z0-9\-]+$/',
                'unique:stores,slug'
            ]
        ], [
            'store_slug.regex' => 'Username toko hanya boleh berisi huruf, angka, dan tanda hubung (-).',
            'store_slug.unique' => 'Link toko sudah digunakan oleh pengguna lain.'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Create User
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_password_changed' => true
        ]);

        // Create Store with default configuration parameters
        $store = Store::create([
            'user_id' => $user->id,
            'slug' => Str::slug($request->store_slug),
            'plan' => 'free',
            'store_title' => $request->store_name,
            'store_slogan' => 'Memudahkan pelanggan menjelajahi produk dan informasi bisnis.',
            'whatsapp_number' => '628123456789',
            'enable_wa_direct' => true,
            'enable_wa_rekber' => true,
            'about_title' => 'Tentang ' . $request->store_name,
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
                ['platform' => 'Instagram', 'url' => 'https://instagram.com/' . $request->store_slug],
                ['platform' => 'Facebook', 'url' => 'https://facebook.com/' . $request->store_slug]
            ],
            'master_classes' => ['Elektronik', 'Pakaian & Aksesoris', 'Satwa Hias', 'Pakan & Perlengkapan', 'Produk General'],
            'master_habitats' => ['Baru (New)', 'Bekas (Used)', 'General'],
            'master_statuses' => ['Tersedia (Ready Stock)', 'Habis Terjual (Out of Stock)', 'Pre-Order'],
            'master_shipping_coverages' => ['Bisa Kirim se-Indonesia', 'Pulau Jawa Saja', 'Ambil Sendiri di Toko (Pickup)']
        ]);

        $token = $user->createToken('admin-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Registrasi berhasil!',
            'token' => $token,
            'is_password_changed' => true,
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'store_slug' => $store->slug,
                'store_title' => $store->store_title,
                'store_plan' => $store->plan
            ]
        ]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Email atau password salah.'
            ], 401);
        }

        $token = $user->createToken('admin-token')->plainTextToken;
        $store = $user->store;

        return response()->json([
            'success' => true,
            'message' => 'Login berhasil!',
            'token' => $token,
            'is_password_changed' => (bool)$user->is_password_changed,
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'store_slug' => $store ? $store->slug : null,
                'store_title' => $store ? $store->store_title : null,
                'store_plan' => $store ? ($store->plan ?? 'free') : 'free'
            ]
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout berhasil!'
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $user->name = $request->name;
        $user->email = $request->email;

        if (!empty($request->password)) {
            $user->password = Hash::make($request->password);
            $user->is_password_changed = true;
        }

        $user->save();
        $store = $user->store;

        return response()->json([
            'success' => true,
            'message' => 'Profil admin berhasil diperbarui!',
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'store_slug' => $store ? $store->slug : null,
                'store_title' => $store ? $store->store_title : null
            ]
        ]);
    }
}
