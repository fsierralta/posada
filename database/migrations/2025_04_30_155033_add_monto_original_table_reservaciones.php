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
            $table->decimal('monto_original', 10, 2)->after('monto')->nullable()->default(0.00)->comment('Monto original de la reservacion');
            

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
