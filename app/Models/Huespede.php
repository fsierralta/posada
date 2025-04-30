<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Huespede extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'apellidos',
        'cedula',
        'nacimiento',
        'nacionalidad',
        'pasaporte',
        'procedencia',
        'destino',
        'vehiculo',
        'placa',
        'direccion',
        'telefono',
        'celular',
        'email',
        'profesion',
        'estadocivil', // Soltero/Casado,Viudo/Divorciado
    ];
}
