<?php

use Carbon\Carbon;
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
        Schema::create('pago_huespedes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId("formapago_id")
                    ->constrained("forma_pagos","id");
            $table->foreignId("ficha_registro_huespe_id")
                   ->constrained("ficha_registro_huespes","id");
            $table->decimal("monto",12,2);
            $table->date("fechapago")->default(Carbon::now()->format("Y-m-d"));
            $table->string("referencia");
            $table->string("observacion");
            $table->string("nroficha",12);


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pago_huespedes');
    }
};
