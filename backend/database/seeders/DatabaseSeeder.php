<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Setting;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(FaunaSeeder::class);

        // Seed default admin user
        \App\Models\User::create([
            'name' => 'Administrator',
            'email' => 'admin@dfauna.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password123'),
            'is_password_changed' => false
        ]);

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
