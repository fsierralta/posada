<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactoController;

Route::get('contacto', [ContactoController::class, "show"])
    ->name("contacto.show");

Route::get('contactopublicidad', [ContactoController::class, 'index'])
    ->name('contato.index');

Route::get("contactoCode", [ContactoController::class, 'senderCode'])
    ->name('contactocode.get');

Route::post('contactoregisterstore', [ContactoController::class, 'registerContactoStore'])
    ->name('contacto.store');