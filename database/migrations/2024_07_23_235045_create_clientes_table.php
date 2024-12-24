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
        Schema::create('clientes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("nombre");
            $table->string("apellidos");
            $table->string("cedula")->unique();
            $table->date("nacimiento");
            $table->string("email");
            $table->string("nrocelular");
            $table->string("nrolocal");
            $table->string("direccion");
            $table->bigInteger("estado_id");
            $table->bigInteger("municipio_id");

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clientes');
    }
};
