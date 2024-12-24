<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contacto extends Model
{
    use HasFactory;
    protected $table="contactos";
    protected $fillable=['email',
    'email_verified_at',
    'verification_code',
    'verification_code_expire_at'


];
    
}
