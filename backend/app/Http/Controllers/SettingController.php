<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::all()->pluck('value', 'key');

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
