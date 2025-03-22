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
        Schema::create('aliados', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('user_aliado_id');
            $table->foreign('user_aliado_id')->references('id')->on('user_aliados');
            $table->string('name');
            $table->string('rif')->nullable();
            $table->string('tipo')->default('J');
            $table->string('direccion');
            $table->string('ciudad');
            $table->string('estado');
            $table->string('telefono');
            $table->string('email')->unique();
            
            







        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aliados');
    }
};
