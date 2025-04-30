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
        Schema::create('posada_reservacion', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('posada_id');
            $table->unsignedBigInteger('reservacion_id');
            $table->timestamps();
            $table->foreign('posada_id')->references('id')->on('posadas');
            $table->foreign('reservacion_id')->references('id')->on('reservaciones');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posada_reservacion');
    }
};
