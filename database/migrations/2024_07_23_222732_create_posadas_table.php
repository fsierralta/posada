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
        Schema::create('posadas', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("nombre");
            $table->integer("capacidad");
            $table->string("descripcion");
            $table->string("foto_url")->nullable();
            $table->string("estatus")->default("D");
                });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posadas');
    }
};
