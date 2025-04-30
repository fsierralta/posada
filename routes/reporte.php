<?php

use App\Http\Controllers\ReporteController;
use Illuminate\Support\Facades\Route;

Route::prefix('reporte')->middleware('auth', 'verified')->group(function () {
    Route::get('/ticketconsumo/{id}', [ReporteController::class, 'ticketConsumo'])->name('repo.01');
    Route::get('/estadocta/{id}', [ReporteController::class, 'estadoCta'])->name('repo.02');
    Route::get('/notafactura/{id}', [ReporteController::class, 'notaFactura'])->name('repo.03');
    Route::get('caja', [ReporteController::class, 'movimientosPagos'])->name('repo.04');
    Route::get('/informepolicialmensual/fechainicial/{fechainicial}/fechafinal/{fechafinal}', [ReporteController::class, 'informepolicialmensual'])->name('repo.05');
    Route::get('/reservacion/{id}', [ReporteController::class, 'reservacionPdf'])->name('repo.06');
});
