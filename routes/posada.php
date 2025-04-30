<?php

use App\Http\Controllers\PosadaController;
use App\Models\Posada;
use Illuminate\Support\Facades\Route;

Route::get('/posada', [PosadaController::class, 'index'])
    ->middleware('auth', 'verified')
    ->name('posada.get');

Route::get('/posada/create', [PosadaController::class, 'create'])
    ->middleware('auth', 'verified')
    ->name('posada.create');

Route::post('/posada', [PosadaController::class, 'store'])
    ->middleware('auth', 'verified')
    ->name('posada.store');

Route::get('/posada/{id}', function ($id) {
    $posada = Posada::find($id);
    $controller = new PosadaController;

    return $controller->edit($posada);
})->middleware('auth', 'verified')
    ->name('posada.edit');

Route::put('/posada/put', [PosadaController::class, 'update'])
    ->middleware('auth', 'verified')
    ->name('posada.put');

Route::delete('/posada/destroy/{id}', [PosadaController::class, 'destroy'])
    ->middleware('auth', 'verified')
    ->name('posada.destroy');
