<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\DB;

class Posada extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'descripcion',
        'capacidad',
        'foto_url',
    ];

    public function obtenerHuespede()
    {
        // Aqui se indica quien es el huespede registrado en la cabaña
        // a una ficha de registro le pertene a un huespde
        $fichaRegistro = FichaRegistroHuespe::where('estatus', 'A')
            ->where('posada_id', $this->id)
            ->first();

        return $fichaRegistro;  // que contiene la relacion con huespede

    }

    public function estatus()
    {
        return $this->estatus == 'D' ? true : false;

    }

    public function fichaRegistroHuespedes(): HasMany
    {
        return $this->hasMany(FichaRegistroHuespe::class);

    }

    public function obtenerHuespedes()
    {
        $huespedesRegistrado = DB::table('posadas')
            ->where('posadas.estatus', 'O')
            ->join('ficha_registro_huespes', function (JoinClause $join) {
                $join->on('posadas.id', '=', 'ficha_registro_huespes.posada_id')
                    ->join('huespedes', 'huespedes.id', '=', 'ficha_registro_huespes.huespede_id')
                    ->where('ficha_registro_huespes.estatus', '=', 'A');
            })
            ->get();

        return $huespedesRegistrado;

    }

    /*
     * The roles that belong to the Posada
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function reservaciones(): BelongsToMany
    {
        return $this->belongsToMany(Reservacion::class, 'posada_reservacion', 'posada_id', 'reservacion_id');
    }
}
