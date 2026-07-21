<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    protected $fillable = [
        'user_id',
        'slug',
        'store_title',
        'store_slogan',
        'store_logo_url',
        'whatsapp_number',
        'promo_banner',
        'about_title',
        'about_slogan',
        'about_description',
        'about_location',
        'about_hours',
        'about_disclaimer',
        'about_cards',
        'social_links',
        'master_classes',
        'master_habitats',
        'master_statuses',
        'master_shipping_coverages'
    ];

    protected $casts = [
        'about_cards' => 'array',
        'social_links' => 'array',
        'master_classes' => 'array',
        'master_habitats' => 'array',
        'master_statuses' => 'array',
        'master_shipping_coverages' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function faunas()
    {
        return $this->hasMany(Fauna::class);
    }
}
