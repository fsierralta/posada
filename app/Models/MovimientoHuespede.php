<?php

namespace App\Models;

use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class MovimientoHuespede extends Model
{
    use HasFactory;
    protected $fillable=[
        "ficha_registro_huespe_id",
         'precio_id',
         'cantidad' ,
         'precio'   ,
         'descripcion'  ,
         'nropersonas'  ,
         'totalitem',
         'fecharegistro',
         'nroficharegistro',
         'estatus'



        
         
        


    ];
     protected $cast=[
          "totalitem"=>'decimal:2'
     ];
     
    protected function totalitem():Attribute{
        return Attribute::make(
            get:fn($number)=>number_format($number,2,',','.'),
        );

    }
    protected function fecharegistro():Attribute{

        return Attribute::make(

            get: fn($fecha)=>Carbon::parse($fecha)->format('d-m-Y'),
            
        );

    }

    public function totalcargos(){
        $totalCargo=DB::table('movimiento_huespedes')
                        ->where('nroficharegistro',$this->nroficharegistro)
                        ->sum("totalitem");
       // info("totalCargo",["monto"=>$totalCargo]);                

          
        if($totalCargo==null){
            return 0;
        }else {        
        return $totalCargo;
        }

    }
    public function detallesCargos(){
        //coleccion de datos
        $detalleCargos=DB::table('movimiento_huespedes')
                        ->where('nroficharegistro',$this->nroficharegistro)
                        ->get();
        


                
        return $detalleCargos;

          

    }

    public function montoPagoPendiente($nroficha){
        
          //code...el huespede debe presentar el primer movimiento de registro 
          $totalCargo=0;
          $movimientohuespede=MovimientoHuespede::where('nroficharegistro',$nroficha)
                                       ->first();
          if($movimientohuespede){
            $totalCargo=$movimientohuespede->totalcargos();
          }else {
           throw new Exception("El huespde no registra el primer movimiento en cargo de habitacion/u otro");
          }
                               
       //Si se registra el primer pago entonces no existe el abono// 
       $totalAbono=0;
       $pagohuespede=PagoHuespede::where('nroficha',$nroficha)
                                   ->first();
      
       if($pagohuespede){                           
            $totalAbono=$pagohuespede->totalabono();
        }else{
            $totalAbono=0;
        }

       if($totalAbono!=null){
        return $totalCargo-$totalAbono;
       }else{
        return $totalCargo;
       }
       
    }
    

}
