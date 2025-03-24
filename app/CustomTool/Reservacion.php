<?php

namespace App\CustomTool;
use App\Models\Posada;
use Closure;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;
use Illuminate\Http\Request;
use App\Models\Reservacion as ModelReservacion;
use App\Models\FichaRegistroHuespe;

class Reservacion
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    /*
      determinar posada segun capacidad y agrupar por capacidad
       @param $posadas

    */
    public static function posadaPorCapacidad($posadas = null): ?Collection
    {
        $groupCapcity = Posada::select('capacidad', DB::raw('count(*) as total'))
            ->groupBy('capacidad')
            ->orderBy('capacidad', 'asc')
            ->get();
        if ($groupCapcity->count() == 0)
            return null;

        return $groupCapcity;
    }

    /**
     * determinar posada segun capacidad y agrupar por capacidad
     * @param $posadas
     */
    public static function totalCabana($posadas = null): int
    {
        $totalcabana = Posada::count();
        if ($totalcabana == 0)
            return 0;

        return $totalcabana;


    }

    /**
     * determinar si si el huespede se le puede asignar una cabana
     * @param $request
     * @param 
     * @param
     */

    public static function asignarCabana(\Closure $callback, Request $request ): bool
    {
        $validatea = $request->validate([
            'nombre' => 'required',
            'apellido' => 'required',
            'cedula' => 'required',
            'telefono' => 'required',
            'email' => 'required',
            'fecha_entrada' => 'required',
            'fecha_salida' => 'required',
            'posada_id' => 'required',
            'cabana_id' => 'required',
            'precio_id' => 'required',
            'user_id' => 'required',
        ]);


        return true;

    }



    /**
     * Verifica la disponibilidad de cabañas para las fechas proporcionadas.
     *
     * @param string $fechaEntrada Fecha de entrada en formato 'Y-m-d'.
     * @param string $fechaSalida Fecha de salida en formato 'Y-m-d'.
     * @param \Illuminate\Database\Eloquent\Builder $reservacion Instancia del modelo de reservación.
     * @param int $cantidadCabana Cantidad de cabañas que se desean reservar.
     * @return bool Retorna true si hay disponibilidad de cabañas, de lo contrario false.
     */
    public function verificarDisponibilidad($fechaEntrada, $fechaSalida, $reservacion, $cantidadCabana)
    {
        $reservaciones = $reservacion->where(function (Builder $query) use ($fechaEntrada, $fechaSalida) {
            $query->whereBetween('fecha_entrada', [$fechaEntrada, $fechaSalida])
                ->orWhereBetween('fecha_salida', [$fechaEntrada, $fechaSalida])
                ->orWhere(function ($query) use ($fechaEntrada, $fechaSalida) {
                    $query->where('fecha_entrada', '<=', $fechaEntrada)
                        ->where('fecha_salida', '>=', $fechaSalida);
                });
        })->sum("cantidad_cabana_reservadas");
        /* //--------------------------------
        * Se debe tomar en cuenta las ocupadas 
        * para la fecha solicitante 
        * en la base de datos ficha_registro_huespes
        //- */
        $ocupada=FichaRegistroHuespe::where('estatus','A')
        ->where(function (Builder $query) use ($fechaEntrada, $fechaSalida) {
            $query->whereBetween('fechaEntrada', [$fechaEntrada, $fechaSalida])
                ->orWhereBetween('fechaSalida', [$fechaEntrada, $fechaSalida])
                ->orWhere(function ($query) use ($fechaEntrada, $fechaSalida) {
                    $query->where('fechaEntrada', '<=', $fechaEntrada)
                        ->where('fechaSalida', '>=', $fechaSalida);
                });
        })->count();

        info('disponibilidad',['resultado'=>"reservaciones $reservaciones , solicita nro de cabana:$cantidadCabana , ocupada: $ocupada"]);
        $disponibilidad = $this->totalCabana() - ($reservaciones + $cantidadCabana+$ocupada);
        info('disponibilidad', ["total" => $disponibilidad, "reservaciones" => $reservaciones]);
        return $disponibilidad > 0 && $disponibilidad <= $this->totalCabana();


    }




    /**
     * Obtiene las reservaciones dentro de un rango de fechas especificado.
     *
     * @param string $fecha_entrada La fecha de entrada para el rango de búsqueda.
     * @param string $fecha_salida La fecha de salida para el rango de búsqueda.
     * @param mixed $reservacion (Opcional) Información adicional de la reservación.
     * @return \Illuminate\Pagination\LengthAwarePaginator Paginador con las reservaciones encontradas.
     */
    public function reservacionesEnRangoFecha($fecha_entrada, $fecha_salida, $reservacion = null)
    {
        $reservaciones = ModelReservacion::where(function ($query) use ($fecha_entrada, $fecha_salida) {
            $query->whereBetween('fecha_entrada', [$fecha_entrada, $fecha_salida])
                ->orWhereBetween('fecha_salida', [$fecha_entrada, $fecha_salida])
                ->orWhere(function ($query) use ($fecha_entrada, $fecha_salida) {
                    $query->where('fecha_entrada', '<=', $fecha_entrada)
                        ->where('fecha_salida', '>=', $fecha_salida);
                });

        })
          ->where('cargado_pago_huespede', 'no')
          ->with('huespede')
          ->paginate(10);
        info("claseCustom", [
            "data" => $reservaciones

        ]);
        return $reservaciones ? $reservaciones:null;
    }

    public function reservacionesEnFechaActual($fecha_entrada, $fecha_salida, $reservacion = null)
    {
        $reservaciones = ModelReservacion::where(function ($query) use ($fecha_entrada, $fecha_salida) {
            $query->whereBetween('fecha_entrada', [$fecha_entrada, $fecha_salida])
                ->orWhereBetween('fecha_salida', [$fecha_entrada, $fecha_salida])
                ->orWhere(function ($query) use ($fecha_entrada, $fecha_salida) {
                    $query->where('fecha_entrada', '<=', $fecha_entrada)
                        ->where('fecha_salida', '>=', $fecha_salida);
                });

        })
            ->where('cargado_pago_huespede', 'no')
            ->with('huespede')
            ->get();


        return $reservaciones ;
    }

    /**
     * Carga el pago de una reservación a un hospedaje.
     *
     * @param int $reservacion_id El ID de la reservación.
     * @param int $posada_id El ID de la posada.
     * @return reservacion
     */
    public function findReservacionHuespede(int $reservacion_id)
    {
        $reservacion = ModelReservacion::find($reservacion_id);
        return $reservacion instanceof ModelReservacion ? $reservacion : null;



    }



}
