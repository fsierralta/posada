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
        'monto_original'

    ];
    /**
     * Clase Huespede
     *
     * Representa un huésped en el sistema, incluyendo información personal
     * y métodos relacionados con su gestión.
     *
     * Propiedades:
     * - $nombre: El nombre del huésped.
     * - $apellido: El apellido del huésped.
     * - $edad: La edad del huésped.
     * - $email: La dirección de correo electrónico del huésped.
     *
     * Métodos:
     * - __construct($nombre, $apellido, $edad, $email): Constructor para inicializar un huésped.
     * - getNombre(): Obtiene el nombre del huésped.
     * - setNombre($nombre): Establece el nombre del huésped.
     * - getApellido(): Obtiene el apellido del huésped.
     * - setApellido($apellido): Establece el apellido del huésped.
     * - getEdad(): Obtiene la edad del huésped.
     * - setEdad($edad): Establece la edad del huésped.
     * - getEmail(): Obtiene el correo electrónico del huésped.
     * - setEmail($email): Establece el correo electrónico del huésped.
     *
     * Uso:
     * Esta clase se utiliza para gestionar la información de los huéspedes
     * en un sistema de reservas o administración de alojamientos.
     */
    public function huespede(): BelongsTo
    {
        return $this->belongsTo(Huespede::class, 'huespede_id');
    }

    /**
     * Class Posadas
     *
     * This class is responsible for managing the operations related to "posadas" (lodging or inns).
     * It may include functionalities such as creating, updating, deleting, and retrieving information
     * about posadas.
     *
     * Methods:
     * - __construct(): Initializes the Posadas class.
     * - createPosada(array $data): Creates a new posada with the provided data.
     * - getPosada(int $id): Retrieves the details of a specific posada by its ID.
     * - updatePosada(int $id, array $data): Updates the information of an existing posada.
     * - deletePosada(int $id): Deletes a posada by its ID.
     * - listPosadas(): Retrieves a list of all posadas.
     *
     * Properties:
     * - $db: Database connection instance used for interacting with the database.
     *
     * Usage:
     * Instantiate the class and call the desired methods to manage posadas.
     */
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
