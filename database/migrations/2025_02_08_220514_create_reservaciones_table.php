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
            $table->date('fecha_entrada');
            $table->date('fecha_salida');
            $table->string('estatus', 20)->default('pendiente');//confirmado,pendiente/pago
            $table->string('observacion', 100)->nullable();
            $table->foreign('huespede_id')->references('id')->on('huespedes');
            $table->decimal('monto', 12, 2)->default(0.00);
            $table->bigInteger('formapago_id')->unsigned();
            $table->foreign('formapago_id')->references('id')->on('forma_pagos');




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
