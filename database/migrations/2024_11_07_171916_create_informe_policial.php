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
        Schema::create('informe_policial', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId("huespede_id")->constrained("huespedes",'id');
            $table->foreignId("posada_id")->constrained("posadas","id");
            $table->foreignId('ficha_registro_huespe_id')->constrained('ficha_registro_huespes','id');
            $table->string('nroficha');
            $table->date("fechaRegistro");
           
           
     


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('informe_policial');
    }
};
