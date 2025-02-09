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
        Schema::table('reservaciones', function (Blueprint $table) {
            //
            if (!Schema::hasColumn('reservaciones', 'cantidad_cabana_reservadas')) {
                $table->integer('cantidad_cabana_reservadas')->default(1);
            }

            if(!Schema::hasColumn('reservaciones','cargado_pago_huespede')){
                $table->string('cargado_pago_huespede',12)->default('no');//se actualiza al reegistrar huespede

            }
            if(!Schema::hasColumn('reservaciones','posada_id')){
                $table->bigInteger('posada_id')->unsigned()->default(0);
                $table->foreign('posada_id')->references('id')->on('posadas');
                

            }


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reservaciones', function (Blueprint $table) {
            //
        });
    }
};
