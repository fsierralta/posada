<?php

use Carbon\Carbon;
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
        Schema::create('movimiento_huespedes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('ficha_registro_huespe_id')->constrained('ficha_registro_huespes', 'id');
            $table->foreignId('precio_id')->constrained('precios', 'id');
            $table->decimal('cantidad', 12, 2)->default(0);
            $table->decimal('precio', 12, 2)->default(0);
            $table->string('descripcion')->nullable();
            $table->decimal('nropersonas')->default(0);
            $table->decimal('totalitem')->default(0);
            $table->string('nroficharegistro');
            $table->date('fecharegistro')->default(Carbon::now()->format('Y-m-d'));
            $table->string('estatus')->default('P'); // [P->Pendiente el pago, C->pago el item"]

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movimiento_huespedes');
    }
};
