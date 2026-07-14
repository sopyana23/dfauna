<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FaunaController;
use App\Http\Controllers\SightingController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\AuthController;

// Public Endpoints
Route::get('/fauna', [FaunaController::class, 'index']);
Route::get('/fauna/{id}', [FaunaController::class, 'show']);
Route::get('/settings', [SettingController::class, 'index']);
Route::post('/sightings', [SightingController::class, 'store']); // kept for compatibility

// Authentication Endpoint
Route::post('/login', [AuthController::class, 'login']);

// Guarded Admin Endpoints (Require Sanctum token)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/profile', [AuthController::class, 'updateProfile']);
    
    // CRUD postings
    Route::post('/upload-image', [FaunaController::class, 'uploadImage']);
    Route::post('/fauna/delete-master-option', [FaunaController::class, 'deleteMasterOption']);
    Route::post('/fauna/add-master-option', [FaunaController::class, 'addMasterOption']);
    Route::post('/fauna', [FaunaController::class, 'store']);
    Route::put('/fauna/{id}', [FaunaController::class, 'update']);
    Route::delete('/fauna/{id}', [FaunaController::class, 'destroy']);
    
    // Manage Settings
    Route::post('/settings', [SettingController::class, 'store']);
});
