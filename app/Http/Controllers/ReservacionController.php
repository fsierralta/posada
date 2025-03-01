<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservacion;
use Inertia\Inertia;
use App\Models\Precio;
use App\Models\FormaPago;
use Carbon\Carbon;
use Exception;
use App\Models\Huespede;
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
        $nroCabana=$reservaciones->sum('cantidad_cabana_reservadas');
        
        return Inertia::render('Reservacion/ReservacionIndex',["reservaciones"=>$reservaciones,
                                                                "precios"=>Precio::all(),
                                                                'formaPagos'=>FormaPago::all(),
                                                                'rangoFechas'=>[$fecha_entrada,$fecha_salida],
                                                                'nroCabana'=>$nroCabana,
                                                                
                                                                ]);


    }

    public function create(Request $request){
        
        $fecha_entrada = Carbon::now()->toDateString();
        $fecha_salida = Carbon::now()->endOfMonth()->toDateString();


        return Inertia::render('Reservacion/ReservacionHuespede',["precios"=>Precio::all(),
                                                                'formaPagos'=>FormaPago::all(),
                                                                'rangoFechas'=>[$fecha_entrada,$fecha_salida],
                                                                "backRangoFechas"=>[$request->rangoFechas[0],$request->rangoFechas[1]],
                                                                
                                                              ]);
    }
    

    public function store(Request $request)
    {
        info("store",['data'=>$request]) ;

         $validate=$request->validate([
            'fecha_entrada' => 'required|date',
            'fecha_salida' => 'required|date|after_or_equal:fecha_entrada',
            'dias_estadias'=>'required|min:1|',
            'precio_id' => 'required|exists:precios,id',
            "nro_personas"=>'required|min:1|integer',
            'cantidad_cabana_reservadas'=>'required|min:1|max:9|integer',
            'totalPagar' => 'required|numeric|min:1',
            'pago_id' => 'required|exists:forma_pagos,id',
            'observacion' => 'nullable|string|max:255',
            'huespede_id' => 'nullable|min:0|integer',
            'nacionalidad' => 'required|string|in:V,E',
            'cedula' => 'required|string|max:20',
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'nacimiento' => 'required|date|before_or_equal:' . now()->subYears(18)->toDateString(),
            'email' => 'required|email|max:255',
            'celular' => 'required|string|max:20',
            'procedencia' => 'required|string|max:255',
            'profesion' => 'required|string|max:255',

            // ...validaciones adicionales...
        ]);
        try {
            //code...
            $precio=Precio::findOrFail($request->precio_id);
            $totalPagar= intval($request->nro_personas)*intval($request->dias_estadias)*floatval($precio->precio);
            if($totalPagar!=$request->totalPagar){
                throw new Exception("Revise el total a pagar", 1);
                
            }
            $huespede=new Huespede();
            if (intval($request->huespede_id) != 0) {
                $huespede = Huespede::findOrFail($request->huespede_id);
                $request->merge(['huespede_id' => $huespede->id]);
            }
            
                



            


            



        } catch (\Throwable $th) {
            //throw $th;
        } 


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
