<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservacion;
use Inertia\Inertia;
use App\Models\Precio;
use App\Models\FormaPago;
use Carbon\Carbon;
class ReservacionController extends Controller
{
    
    public function index(Request $request)
    {
       info('reservacion index',['request'=>$request->all()]);


        if (!$request->has('fecha_entrada') || !$request->has('fecha_salida')) {
            $fecha_entrada = now()->toDateString();
            $fecha_salida = now()->endOfMonth()->toDateString();

          
        }else {
            $fecha_entrada =Carbon::parse($request->fecha_entrada)->toDateString();
            $fecha_salida = Carbon::parse($request->fecha_salida)->toDateString();
            $request->merge(['fecha_entrada'=>$fecha_entrada]);
            $request->merge(['fecha_salida'=>$fecha_salida]);


        }
        

        $reservaciones = Reservacion::where(function ($query) use ($fecha_entrada, $fecha_salida) {
                                        $query->whereBetween('fecha_entrada', [$fecha_entrada, $fecha_salida])
                                              ->orWhereBetween('fecha_salida', [$fecha_entrada, $fecha_salida])
                                              ->orWhere(function ($query) use ($fecha_entrada, $fecha_salida) {
                                                  $query->where('fecha_entrada', '<=', $fecha_entrada)
                                                        ->where('fecha_salida', '>=', $fecha_salida);
                                              });   

                                        })
                                    ->where('cargado_pago_huespede','no')
                                    ->with('huespede')
                                    ->paginate(10);
        
        return Inertia::render('Reservacion/ReservacionIndex',["reservaciones"=>$reservaciones,
                                                                "precios"=>Precio::all(),
                                                                'formaPagos'=>FormaPago::all(),
                                                                'rangoFechas'=>[$fecha_entrada,$fecha_salida],
                                                                
                                                                ]);


    }

    public function store(Request $request)
    {
        $request->validate([
            'fecha_entrada' => 'required|date',
            'fecha_salida' => 'required|date|after_or_equal:fecha_entrada',
            // ...validaciones adicionales...
        ]);

        $disponible = $this->verificarDisponibilidad($request->fecha_entrada, $request->fecha_salida);

        if (!$disponible) {
            return response()->json(['error' => 'No hay disponibilidad para las fechas seleccionadas.'], 400);
        }

        // ...código para crear la reservación...

        return response()->json(['message' => 'Reservación creada exitosamente.'], 201);
    }

    private function verificarDisponibilidad($fechaEntrada, $fechaSalida)
    {
        $reservaciones = Reservacion::where(function ($query) use ($fechaEntrada, $fechaSalida) {
            $query->whereBetween('fecha_entrada', [$fechaEntrada, $fechaSalida])
                  ->orWhereBetween('fecha_salida', [$fechaEntrada, $fechaSalida])
                  ->orWhere(function ($query) use ($fechaEntrada, $fechaSalida) {
                      $query->where('fecha_entrada', '<=', $fechaEntrada)
                            ->where('fecha_salida', '>=', $fechaSalida);
                  });
        })->count();

        return $reservaciones < 9;
    }
}
