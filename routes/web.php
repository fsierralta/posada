<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SendGetCodeController;

//----------------------------------------------------------
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
//----------------------------
Route::get("/codeverification",[SendGetCodeController::class,"senderCode"])
       ->name("codeverification.get");
 //------------------      

Route::get('/dashboard', [DashboardController::class,"index"])
      ->middleware(['auth', 'verified'])
      ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
//require aqui huespede.php
require __DIR__.'/huespede.php';
//requirre aqui posada.php 
require __DIR__.'/posada.php';
//requirre aqui precio.php
require __DIR__.'/precio.php';
//requirre aqui contacto.php
require __DIR__.'/contacto.php';
//requirre aqui reporte.php
require __DIR__.'/reporte.php';
//require aqui pago 
require __DIR__.'/pago.php';
//  requirre aqui auth.php
require __DIR__.'/auth.php';
