<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Precio extends Model
{
    use HasFactory;

    protected $fillable = [
        'precio',
        'descripcion',
        'tipo',

    ];

    public function movimientoHuespedes(): HasMany
    {
        return $this->hasMany(MovimientoHuespede::class);

    }
}
