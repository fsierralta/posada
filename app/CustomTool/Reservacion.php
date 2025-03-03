<?php

namespace App\CustomTool;
use App\Models\Posada;
use Closure;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection ;
use Illuminate\Http\Request;


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
    public static function  posadaPorCapacidad($posadas=null):?Collection
    {
        $groupCapcity = Posada::select('capacidad',DB::raw('count(*) as total'))->groupBy('capacidad')
        ->orderBy('capacidad','asc')
        ->get();
        if($groupCapcity->count()==0)      return null;
        
        return $groupCapcity;


    
    }
 /**
     * determinar posada segun capacidad y agrupar por capacidad
     * @param $posadas
     */
    public static function  totalCabana($posadas=null):int
    {
        $totalcabana = Posada::count();
        if($totalcabana==0)      return 0;
               
        return $totalcabana;


    }

    /**
     * determinar si si el huespede se le puede asignar una cabana
     * @param $request
     * @param 
     * @param
     */

     public static function  asignarCabana(\Closure $callback,Request $request=null):bool
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
     
     public  function verificarDisponibilidad($fechaEntrada, $fechaSalida,$reservacion,$cantidadCabana)
     {
         $reservaciones = $reservacion->where(function ($query) use ($fechaEntrada, $fechaSalida) {
                                    $query->whereBetween('fecha_entrada', [$fechaEntrada, $fechaSalida])
                                        ->orWhereBetween('fecha_salida', [$fechaEntrada, $fechaSalida])
                                              ->orWhere(function ($query) use ($fechaEntrada, $fechaSalida) {
                                                                $query->where('fecha_entrada', '<=', $fechaEntrada)
                                                                      ->where('fecha_salida', '>=', $fechaSalida);
                   });
         })->sum("cantidad_cabana_reservadas");
         $disponibilidad=$this->totalCabana()-($reservaciones+$cantidadCabana);
         info('disponibilidad',["total"=>$disponibilidad,"reservaciones"=>$reservaciones]);
         return ($disponibilidad>0  && $disponibilidad<=$this->totalCabana());
         
     }

}
