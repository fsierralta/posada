<?php

use App\Http\Controllers\PagoHuespedeController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth', 'verified')->group(function () {
    Route::get('/cajashow', [PagoHuespedeController::class, 'show'])->name('caja.show');
    Route::get('/libromensual', [PagoHuespedeController::class, 'showInformePolicial'])->name('libromensual.show');
    Route::get('/libromensua//fechainicial/{fechaInicial}/fechafinal/{fechaFinal}', [PagoHuespedeController::class, 'showInformePolicialRango'])->name('libromensual.get');
    Route::get('/cajamovimientopagos/fechainicial/{fechainicial}/fechafinal/{fechafinal}', [PagoHuespedeController::class, 'movimientoPagos'])->name('cajamovimientopagos.get');
});
