<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FichaRegistroHuespe extends Model
{
    use HasFactory;

    protected $fillable = [
        'huespede_id',
        'posada_id',
        'fechaEntrada',
        'fechaSalida',
        'fechacierre',
        'estatus',
        'nroficha',

    ];

    public function huespede(): BelongsTo
    {
        return $this->belongsTo(Huespede::class);

    }

    public function posada(): BelongsTo
    {
        return $this->belongsTo(Posada::class, 'posada_id', 'id');

    }
}
