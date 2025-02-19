<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reservacion extends Model
{
    use HasFactory;
    protected $table = 'reservaciones';
    
    protected $fillable = [
        'nro_reservacion',
        'huespede_id',
        'nro_personas',
        'fecha_entrada',
        'fecha_salida',
        'estatuspago',
        'observacion',
        'monto',
        'formapago_id',
        'cantidad_cabana_reservadas',
        'cargado_pago_huespede',
        'created_at',
        'updated_at',
         
    ];

    public function huespede():BelongsTo
    {
        return $this->belongsTo(Huespede::class, 'huespede_id');
    }





    
}
