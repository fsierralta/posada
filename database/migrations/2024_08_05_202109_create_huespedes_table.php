<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use phpDocumentor\Reflection\Types\Nullable;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('huespedes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("nombre");
            $table->string("apellidos");
            $table->string("cedula")->unique();
            $table->date("nacimiento");
            $table->string('nacionalidad',1)->default("V");
            $table->string('pasaporte')->nullable();
            $table->string("procedencia")->default("BARQUISIMETO");
            $table->string("destino")->default("BARQUISIMETO");
            $table->string("vehiculo")->nullable();
            $table->string("placa")->nullable();
            $table->string("direccion");
            $table->string("telefono")->nullable();
            $table->string("celular");
            $table->string("email");
            $table->string("profesion")->nullable();
         });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('huespedes');
    }
};
