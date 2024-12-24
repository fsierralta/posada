<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;


class PagoHuespede extends Model
{
    use HasFactory;
    protected $fillable=[
           "formapago_id",
           "ficha_registro_huespe_id",
           "monto",
           'fechapago',
           'referencia',
           'observacion',
           'nroficha'


    ];


     protected function  monto():Attribute{

         return Attribute::make(
              get: fn ($number)=>number_format($number,2,",",'.'),
         );


     } 
     protected function fechapago():Attribute{

        return Attribute::make(

            get: fn($fecha)=>Carbon::parse($fecha)->format('d-m-Y'),
            
        );
    }
    
    public function totalabono(){
        
        
       $totalAbono=DB::table("pago_huespedes")
                      ->where('nroficha',$this->nroficha)
                       ->sum('monto');

       info("totalAbono",["monto"=>$totalAbono]);                

       if($totalAbono==null){
        return 0;
       }                
       return $totalAbono;                


    }

    public function formaPago():BelongsTo{
           
           return $this->belongsTo(FormaPago::class,"id","formapago_id");
    }


    public function pagosPorRango( Carbon $fechaInicial, Carbon $fechaFinal  ){

          $pagoPosada=DB::table("pago_huespedes")
                      ->whereBetween("fechapago",[$fechaInicial,$fechaFinal])
                      ->join("forma_pagos","forma_pagos.id","=",'pago_huespedes.formapago_id')
                      ->join("ficha_registro_huespes",  "ficha_registro_huespes.nroficha","=",'pago_huespedes.nroficha')
                      ->join('huespedes','huespedes.id','=','ficha_registro_huespes.huespede_id') 
                      ->join('posadas','posadas.id',"=",'ficha_registro_huespes.posada_id')
                      ->select('forma_pagos.nombre','pago_huespedes.*',
                                 'posadas.nombre as pnombre',
                                 'huespedes.nombre as hnombre',
                                 'huespedes.apellidos as hapellidos')
                      ->paginate(6);
                      return $pagoPosada ;             

         

    }


//---------------------
public function pagosPorRangoReporte( Carbon $fechaInicial, Carbon $fechaFinal  ){

    $pagoPosada=DB::table("pago_huespedes")
                ->whereBetween("fechapago",[$fechaInicial,$fechaFinal])
                ->join("forma_pagos","forma_pagos.id","=",'pago_huespedes.formapago_id')
                ->join("ficha_registro_huespes",  "ficha_registro_huespes.nroficha","=",'pago_huespedes.nroficha')
                ->join('huespedes','huespedes.id','=','ficha_registro_huespes.huespede_id') 
                ->join('posadas','posadas.id',"=",'ficha_registro_huespes.posada_id')
                ->select('forma_pagos.nombre','pago_huespedes.*',
                           'posadas.nombre as pnombre',
                           'huespedes.nombre as hnombre',
                           'huespedes.apellidos as hapellidos')
                ->get();
                return $pagoPosada ;             

   

}





    //--------
    public function totaLGeneralPorRango(Carbon $fechaInicial, Carbon $fechaFinal):float{

        $totalGeneral=DB::table('pago_huespedes')
        ->whereBetween("fechapago",[$fechaInicial,$fechaFinal])
        
        ->sum("monto");
         return $totalGeneral;

    }



}
