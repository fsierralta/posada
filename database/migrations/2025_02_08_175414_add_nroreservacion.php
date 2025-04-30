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
            //
            if (! Schema::hasColumn('ficha_registro', 'nro_reservacion')) {
                $table->string('nro_reservacion', 12)->default('000000000000');
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
