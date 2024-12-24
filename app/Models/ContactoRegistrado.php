<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactoRegistrado extends Model
{
    use HasFactory;
    protected $table="contacto_registrados";
    protected $fillable=[
         "email",
        'nombre',
        'apellidos',
        'nacionalidad',
        'cedula',
        'nacimiento',
        'celular',
        'direccion',
        'contacto_id'
      
    ];

}
