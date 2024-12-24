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
        Schema::create('ficha_registro_huespes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId("huespede_id")->constrained();
            $table->foreignId("posada_id")->constrained();
            $table->date("fechaEntrada")->default(Carbon::now()->format('Y-m-d'));
            $table->date('fechaSalida')->nullable();
            $table->date('fechacierre')->nullable();
            $table->string('estatus')->default("A"); //Abierto Cerrado
            $table->string("nroficha");




        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ficha_registro_huespes');
    }
};
