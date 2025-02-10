<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservacion extends Model
{
    use HasFactory;

    protected $fillable = [
        'nro_reservacion',
        'huespede_id',
        'nro_personas',
        'fecha_entrada',
        'fecha_salida',
        'estatus',
        'observacion',
        'monto',
        'formapago_id',
    ];
}
