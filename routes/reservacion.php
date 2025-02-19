<?php
use App\Http\Controllers\ReservacionController;
use Illuminate\Support\Facades\Route;

/**
 * Ruta de reservaciones
 * 
 * Estas rutas manejan las operaciones CRUD para las reservaciones.
 * El controlador utilizado es ReservacionController.
 */

Route::group(['middleware' => ['auth','verified']], function () {


    Route::post('/reservaciones', [ReservacionController::class, 'store'])
    ->name('reservaciones.store');
    Route::get('/reservaciones/create', [ReservacionController::class, 'create'])
    ->name('reservaciones.create');
    Route::get('/reservaciones/{reservacion}', [ReservacionController::class, 'show'])
    ->name('reservaciones.show');
    Route::get('/reservaciones/{reservacion}/edit', [ReservacionController::class, 'edit'])
    ->name('reservaciones.edit');
    Route::put('/reservaciones/{reservacion}', [ReservacionController::class, 'update'])
    ->name('reservaciones.update');
    Route::delete('/reservaciones/{reservacion}', [ReservacionController::class, 'destroy'])
    ->name('reservaciones.destroy');
    Route::get('/reservaciones', [ReservacionController::class, 'index'])
    ->name('reservaciones.index');

    Route::get('/reservaciones/{reservacion}/pdf', [ReservacionController::class, 'pdf']);


});



