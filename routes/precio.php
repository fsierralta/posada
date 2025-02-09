<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PrecioController;

Route::middleware('auth', 'verified')->group(function () {
    Route::get("/precio", [PrecioController::class, 'index'])->name('precio.get');
    Route::get("/precio/create", [PrecioController::class, 'create'])->name('precio.create');
    Route::post("/precio", [PrecioController::class, 'store'])->name('precio.store');
    Route::get("/precio/{id}", [PrecioController::class, 'show'])->name('precio.show');
    Route::put("/precio", [PrecioController::class, 'update'])->name('precio.put');
    Route::delete("/precio/destroy/{id}", [PrecioController::class, 'destroy'])->name('precio.destroy');
});