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
use App\CustomTool\Reservacion as CustomReservacion;
use App\Models\FichaRegistro;
class ReservacionController extends Controller
{
   public $customReservacion;
       

    public function __construct(){
        $this->customReservacion = new CustomReservacion();
    }

   
    public function index(Request $request)
    {
      // info('reservacion index',['request'=>$request->all()]);


        if (!$request->has('fecha_entrada') || !$request->has('fecha_salida')) {
            $fecha_entrada = now()->toDateString();
            $fecha_salida = now()->endOfMonth()->toDateString();

          
        }else {
            $fecha_entrada =Carbon::parse($request->fecha_entrada)->toDateString();
            $fecha_salida = Carbon::parse($request->fecha_salida)->toDateString();
            $request->merge(['fecha_entrada'=>$fecha_entrada]);
            $request->merge(['fecha_salida'=>$fecha_salida]);


        }
        

        
        
        //info($reservaciones);
        $reservaciones = $this->customReservacion->
                         reservacionesEnRangoFecha($fecha_entrada, $fecha_salida,new Reservacion());
        /*  Reservacion::where(function ($query) use ($fecha_entrada, $fecha_salida) {
                                        $query->whereBetween('fecha_entrada', [$fecha_entrada, $fecha_salida])
                                              ->orWhereBetween('fecha_salida', [$fecha_entrada, $fecha_salida])
                                              ->orWhere(function ($query) use ($fecha_entrada, $fecha_salida) {
                                                  $query->where('fecha_entrada', '<=', $fecha_entrada)
                                                        ->where('fecha_salida', '>=', $fecha_salida);
                                              });   

                                        })
                                    ->where('cargado_pago_huespede','no')
                                    ->with('huespede')
                                    ->paginate(10);  */
      // info($reservaciones);
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
        //info("store",['data'=>$request]) ;

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
            } else {
                //para crear el huespde si es null
                 $huespede= $huespede->where("nacionalidad", '=', $request->nacionalidad)  
                                ->where('cedula', '=', $request->cedula)
                                ->first();
            }
            //--------calculado disponibilidad 
            $disponible = $this->customReservacion->verificarDisponibilidad($request->fecha_entrada, 
                                                                           $request->fecha_salida,
                                                                           new Reservacion(),
                                                                           intval($request->input('cantidad_cabana_reservadas'))
           
            );
            if (!$disponible) {
                throw new Exception('No hay disponibilidad para las fechas seleccionadas');
            }
            //
            if($huespede==null){
                $huespede=Huespede::create([
                    'nombre'=>$request->nombre,
                    'apellidos'=>$request->apellidos,
                    'cedula'=>$request->cedula,
                    'nacimiento'=>Carbon::parse($request->nacimiento),
                    'nacionalidad' => strtoupper($request->nacionalidad),
                    'procedencia'=>$request->procedencia,
                    'profesion'=>$request->profesion,
                    'email'=>$request->email,
                    'celular'=>$request->celular,
                    'direccion'=>"al registrarse"
                ]);

            }
            $nroResevacion=FichaRegistro::find(1);
            //info($nroResevacion->mostrarNroReservacion());
            $newReservacion=Reservacion::create([
                "nro_reservacion"=>$nroResevacion->mostrarNroReservacion(),
                'huespede_id'=>$huespede->id,
                'nro_personas'=>$request->nro_personas,
                'fecha_entrada'=>Carbon::parse($request->fecha_entrada),
                "fecha_salida"=>Carbon::parse($request->fecha_salida),
                'estatuspago'=>'C',
                 'monto'=>$totalPagar,
                 'formapago_id'=>$request->pago_id,
                 'precio_id'=>$precio->id,
                 'cantidad_cabana_reservadas'=>$request->cantidad_cabana_reservadas,
                 'created_at'=>Carbon::now(),
                 'updated_a'=>Carbon::now(),
                 'observacion'=>$request->observacion
                 
               ]);
               
              return redirect(route('reservaciones.index'))->with('message','Reservacion registrada nro:'.$newReservacion->nro_reservacion);


                                

            } catch (\Throwable $th) {
            //throw $th;
            info('errr',['error'=>$th->getMessage()]);
             return back()->with('message',$th->getMessage());

        } 


       


        
        

    }



    public function edit(Request $request, Reservacion $reservacion)
    {
        info("dataResevacion",["data"=>$reservacion->huespede]);
       try {
        if($reservacion){
            return Inertia::render('Reservacion/ReservacionEdit', [
                'reservacion' => $reservacion,
                'precios' => Precio::all(),
                'formaPagos' => FormaPago::all(),
               
            ]);

        }


        
    }
    catch (\Throwable $th) {
         info('',['error'=>$th->getMessage()]);
         return back()->with('message',$th->getMessage());

    }
   
}

public function update(Request $request, Reservacion $reservacion){
    info('update',["reservacion"=>$reservacion]);
    return back()->with("message","update ");


}

}
