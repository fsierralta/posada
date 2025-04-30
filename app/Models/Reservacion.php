<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Reservacion extends Model
{
    use HasFactory;

    protected $table = 'reservaciones';

    use SoftDeletes;

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
        'precio_id',
        'deleted_at',

    ];

    public function huespede(): BelongsTo
    {
        return $this->belongsTo(Huespede::class, 'huespede_id');
    }

    public function posadas()
    {
        return $this->belongsToMany(Posada::class, 'posada_reservacion', 'reservacion_id', 'posada_id');

    }
    /**
     * La función `pagoHuespedes` se encarga de gestionar los pagos realizados por los huéspedes.
     * Maneja el cálculo, validación y registro de los detalles de pago
     * para las personas que se hospedan en el establecimiento.
     *
     * @function pagoHuespedes
     * @return HasMany - Retorna una relación HasMany con los pagos asociados al huésped.
     */
    public function pagoHuespedes():HasMany {
        return $this->hasMany(PagoHuespede::class, 'referencia', 'nro_reservacion');
    }
    
    

    
}
