<?php

namespace Database\Seeders;

use App\Models\Fauna;
use Illuminate\Database\Seeder;

class FaunaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faunas = [
            [
                'name' => 'Ikan Arwana Super Red',
                'scientific_name' => 'Scleropages formosus',
                'class' => 'Ikan Hias',
                'habitat' => 'Air Tawar',
                'diet' => 'Karnivora (Jangkrik/Katak)',
                'conservation_status' => 'Tersedia (For Sale)',
                'price' => 5500000,
                'video_url' => 'https://www.youtube.com/watch?v=kYJjZ3xT0-U',
                'is_shipping_available' => true,
                'description' => 'Ikan Arwana Super Red berkualitas tinggi dengan warna merah yang cerah, proporsi tubuh yang sempurna, dayung panjang, dan mata tidak juling. Dilengkapi dengan microchip dan sertifikat resmi keaslian.',
                'image_url' => 'https://images.unsplash.com/photo-1524704654690-b56c05c78a02?auto=format&fit=crop&w=800&q=80',
                'detailed_info' => [
                    'native_region' => 'Kalimantan Barat, Indonesia',
                    'lifespan' => '15-20 tahun',
                    'weight' => '1-2 kg',
                    'fun_facts' => [
                        'Arwana Super Red merupakan simbol keberuntungan dan kemakmuran bagi pemiliknya menurut feng shui.',
                        'Setiap ikan yang kami jual telah dipasang microchip steril di bawah kulitnya untuk pelacakan keaslian.'
                    ]
                ]
            ],
            [
                'name' => 'Ikan Cupang Halfmoon Red Dragon',
                'scientific_name' => 'Betta splendens',
                'class' => 'Ikan Hias',
                'habitat' => 'Air Tawar',
                'diet' => 'Omnivora (Jentik Nyamuk/Pelet)',
                'conservation_status' => 'Tersedia (For Sale)',
                'price' => 75000,
                'video_url' => 'https://www.youtube.com/watch?v=B7K04zO7N6M',
                'is_shipping_available' => true,
                'description' => 'Ikan Cupang Halfmoon dengan corak sisik naga putih (Red Dragon) yang sangat tebal kontras dengan ekor merah menyala. Sirip ekor lebar mengembang 180 derajat membentuk setengah lingkaran bulan sempurna saat mekrok.',
                'image_url' => 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
                'detailed_info' => [
                    'native_region' => 'Asia Tenggara',
                    'lifespan' => '2-3 tahun',
                    'weight' => '5-10 gram',
                    'fun_facts' => [
                        'Cupang memiliki organ labirin khusus yang memungkinkan mereka menghirup udara langsung dari permukaan air.',
                        'Corak sisik naga merupakan mutasi genetik yang menghasilkan lapisan metalik berkilau di atas warna dasar tubuhnya.'
                    ]
                ]
            ],
            [
                'name' => 'Sugar Glider Joey Classic Grey',
                'scientific_name' => 'Petaurus breviceps',
                'class' => 'Mamalia Kecil',
                'habitat' => 'Darat',
                'diet' => 'Omnivora (Bubur Bayi/Buah)',
                'conservation_status' => 'Tersedia (For Sale)',
                'price' => 350000,
                'video_url' => 'https://www.youtube.com/watch?v=zD_Yv36W3wU',
                'is_shipping_available' => false,
                'description' => 'Sugar Glider Joey (anak) varian Classic Grey umur 1.5 bulan. Karakter sangat jinak, tidak gigit, sudah mandiri belajar makan bubur, sehat walafiat tanpa cacat. Sangat cocok dipelihara untuk pemula yang ingin belajar melakukan bonding.',
                'image_url' => 'https://images.unsplash.com/photo-1607923432700-7a4c5f3f938f?auto=format&fit=crop&w=800&q=80',
                'detailed_info' => [
                    'native_region' => 'Papua & Australia',
                    'lifespan' => '10-12 tahun',
                    'weight' => '80-160 gram',
                    'fun_facts' => [
                        'Sugar Glider adalah hewan marsupial (memiliki kantung) dan termasuk hewan nokturnal yang aktif di malam hari.',
                        'Mereka dapat meluncur dari pohon ke pohon menggunakan patagium (selaput kulit tipis di antara kaki depan dan belakang).'
                    ]
                ]
            ],
            [
                'name' => 'Kucing Persia Medium Calico',
                'scientific_name' => 'Felis catus',
                'class' => 'Mamalia',
                'habitat' => 'Darat',
                'diet' => 'Karnivora (Makanan Kucing Basah/Kering)',
                'conservation_status' => 'Tersedia (For Sale)',
                'price' => 1200000,
                'video_url' => 'https://www.youtube.com/watch?v=Y1g0fB6a188',
                'is_shipping_available' => false,
                'description' => 'Anak Kucing Persia Medium dengan corak Calico (tiga warna keberuntungan) berumur 2.5 bulan. Bulu sangat lebat, gemuk, manja, sudah pandai buang air di litter box (bak pasir), serta sudah mendapatkan obat cacing rutin.',
                'image_url' => 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
                'detailed_info' => [
                    'native_region' => 'Persia (Iran)',
                    'lifespan' => '12-15 tahun',
                    'weight' => '3-5 kg',
                    'fun_facts' => [
                        'Kucing Calico hampir 99.9% dipastikan berjenis kelamin betina karena faktor gen kromosom X ganda.',
                        'Kucing persia terkenal dengan kepribadiannya yang tenang, lembut, dan lebih suka bersantai di sofa.'
                    ]
                ]
            ],
            [
                'name' => 'Landak Mini Albino Eksotis',
                'scientific_name' => 'Atelerix albiventris',
                'class' => 'Mamalia Kecil',
                'habitat' => 'Darat',
                'diet' => 'Insektivora (Ulat Hongkong/Cat Food)',
                'conservation_status' => 'Tersedia (For Sale)',
                'price' => 250000,
                'video_url' => 'https://www.youtube.com/watch?v=Gk6j89fK1u0',
                'is_shipping_available' => true,
                'description' => 'Landak Mini Albino dengan duri putih bersih dan mata merah eksotis yang mencolok. Berumur 2 bulan (siap adopsi), sehat tanpa kutu, lincah, tidak penakut, serta nafsu makan sangat tinggi (menyukai ulat hongkong kering maupun basah).',
                'image_url' => 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=800&q=80',
                'detailed_info' => [
                    'native_region' => 'Afrika Tengah',
                    'lifespan' => '4-6 tahun',
                    'weight' => '250-400 gram',
                    'fun_facts' => [
                        'Meskipun berduri tajam, duri landak mini tidak mengandung racun dan tidak bisa dilepaskan secara sengaja seperti landak hutan raksasa.',
                        'Ketika mencium bau baru yang menarik, mereka melakukan perilaku self-anointing (melumuri tubuh dengan air liur berbusa).'
                    ]
                ]
            ]
        ];

        foreach ($faunas as $fauna) {
            Fauna::create([
                'name' => $fauna['name'],
                'scientific_name' => $fauna['scientific_name'],
                'class' => $fauna['class'],
                'habitat' => $fauna['habitat'],
                'diet' => $fauna['diet'],
                'conservation_status' => $fauna['conservation_status'],
                'price' => $fauna['price'],
                'video_url' => $fauna['video_url'],
                'is_shipping_available' => $fauna['is_shipping_available'],
                'description' => $fauna['description'],
                'image_url' => $fauna['image_url'],
                'detailed_info' => $fauna['detailed_info'],
            ]);
        }
    }
}
