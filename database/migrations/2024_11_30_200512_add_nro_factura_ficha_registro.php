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
        Schema::table('ficha_registros', function (Blueprint $table) {

           if(!Schema::hasColumn("ficha_registros",'nro_factura')) {
         
            $table->string('nro_factura',12)->default('000000000000')
                   ->nullable()    ;
           }         
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ficha_registros', function (Blueprint $table) {
            //
        });
    }
};
