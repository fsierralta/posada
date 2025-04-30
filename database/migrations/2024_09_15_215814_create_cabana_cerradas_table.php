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
        Schema::create('cabana_cerradas', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('ficha_registro_huespe_id')->constrained('ficha_registro_huespes', 'id');
            $table->string('nroficharegistro')->index();
            $table->bigInteger('posada_id');
            $table->decimal('totalabono', 12, 2);
            $table->decimal('totalcargo', 12, 2);
            $table->date('fechacierre');
            $table->decimal('igtf', 12, 2)->default(0);
            $table->decimal('iva', 12, 0)->default(16);
            $table->unsignedBigInteger('user_id');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cabana_cerradas');
    }
};
