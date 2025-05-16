<?php

use App\Http\Controllers\FichaRegistroHuespeController;
use App\Http\Controllers\HuespedeController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth', 'verified')->group(function () {
    Route::get('/huespede', [HuespedeController::class, 'index'])->name('huespede.get');
    Route::post('/huespede', [HuespedeController::class, 'store'])->name('huespede.store');
    Route::get('/huespede/create', [HuespedeController::class, 'create'])->name('huespede.create');
    Route::get('/huespede/{id}', [HuespedeController::class, 'show'])->name('huespede.show');
    Route::put('/huespede', [HuespedeController::class, 'update'])->name('huespede.put');

    Route::get('/registrohuespede/{id}', [FichaRegistroHuespeController::class, 'verificaEstatusPosada'])->name('registrohuespede.get');
    Route::get('huespede/dato/{cedula}', [FichaRegistroHuespeController::class, 'dataHuespede'])->name('registrohuespedecedula.get');
    Route::post('/huespedes', [FichaRegistroHuespeController::class, 'store'])->name('registrohuespede.store');
    Route::get('/registrohuespedepago/{id}', [FichaRegistroHuespeController::class, 'formulariopago'])->name('registrohuespedepago.show');
    Route::post('/registrohuespedepago', [FichaRegistroHuespeController::class, 'storepago'])->name('registrohuespedepago.store');
    Route::get('/huespedecargoabono/{id}', [FichaRegistroHuespeController::class, 'estadocta'])->name('estadocta.show');
    Route::get('/huespedecargoconsumo/{id}', [FichaRegistroHuespeController::class, 'cargarConsumo'])->name('cargoconsumo.get');
    Route::post('/huespedecargoconsumo', [FichaRegistroHuespeController::class, 'storeConsumo'])->name('cargoconsumo.store');
    Route::patch('/huespededardealta/{id}', [FichaRegistroHuespeController::class, 'darDeAlta'])->name('dardealta.patch');
    Route::get('/huespedenotafactura/{id}', [FichaRegistroHuespeController::class, 'notaFactura'])->name('notafactura.get');
    Route::get('/huespedecambiofechasalida/{id}',[FichaRegistroHuespeController::class,'llamarcargoConsumo'])
    ->name('huespedecambiofechasalida.get');

});
