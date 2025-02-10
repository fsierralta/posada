<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservaciones', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('nro_reservacion', 12)->default('000000000000');
            $table->bigInteger('huespede_id')->unsigned();
            $table->integer('nro_personas');
            $table->dateTime('fecha_entrada');
            $table->dateTime('fecha_salida');
            $table->string('estatuspago',20)->default('p');//Confirmado,Ppendiente/pago
            $table->string('observacion')->nullable();
            $table->foreign('huespede_id')->references('id')->on('huespedes');
            $table->decimal('monto', 12, 2)->default(0.00);
            $table->bigInteger('formapago_id')->unsigned();
            $table->foreign('formapago_id')->references('id')->on('forma_pagos');
            $table->integer('cantidad_cabana_reservadas')->default(1);
            $table->string('cargado_pago_huespede',12)->default('no');//se actualiza al reegistrar huespede






        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservaciones');
    }
};
