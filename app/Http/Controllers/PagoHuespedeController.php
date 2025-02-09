<?php

namespace App\Http\Controllers;

use App\Models\PagoHuespede;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use App\CustomTool\RegistroLibroPolicial;
class PagoHuespedeController extends Controller
{
    //
    //Carga la vista  para el rango de fecha de pago
    /**
     * Muestra la vista de la caja de pagos para huéspedes.
     *
     * Este método renderiza el componente "CajaShow" dentro del directorio "Catalogo/Huespede/Pago"
     * utilizando el framework Inertia.js. Pasa la fecha actual como fecha inicial y final a la vista.
     *
     * @return \Inertia\Response La vista renderizada con las fechas inicial y final.
     */
    public function show(){
       
        return Inertia::render("Catalogo/Huespede/Pago/CajaShow",[
            "fechaInicial"=>now()->format("Y-m-d"),
            "fechaFinal"  =>now()->format("Y-m-d")
            
        ]);

    

    }

    public function movimientoPagos(Request $request){
      info("pago",["data"=>$request->fechainicial]);
      try {
        //code...
      $pagoHuespede=new PagoHuespede();
      $totalGeneral=$pagoHuespede->totaLGeneralPorRango(Carbon::parse($request->fechainicial),Carbon::parse($request->fechafinal));                   
      $pagosPorRango=$pagoHuespede->pagosPorRango(Carbon::parse($request->fechainicial),Carbon::parse($request->fechafinal));
     
      return Inertia::render("Catalogo/Huespede/Pago/CajaShow",[
                                                                "fechaInicial"=>$request->fechainicial,
                                                                "fechaFinal"  =>$request->fechafinal,
                                                                "pagos"=>$pagosPorRango,
                                                                "totalGeneral"=>$totalGeneral
                                                                    ]);
     

    } catch (\Throwable $th) {
         //throw $th;
         info("error",["message"=>$th->getMessage()]);
         return back()->with("message",$th->getMessage());

         }                                                                






 

    }


    //Se registra para solictar el informe policial
    public function showInformePolicial(Request $request){
      
        return Inertia::render('InformePolicial/InformeMensual',["fechaInicial"=>now()->startOfMonth()->format('d-m-Y'),
                                                                 "fechaFinal" =>now()->endOfMonth()->format('d-m-Y') ]
                              );


        

        


    }

    public function showInformePolicialRango(Request $request){
        $rp=new RegistroLibroPolicial();
        $fechaInicial=Carbon::parse($request->fechaInicial) ;
        $fechaFinal=  Carbon::parse($request->fechaFinal);
        $huespedesMes=$rp->getAll($fechaInicial,$fechaFinal);
        info("paginate",["data"=>['fechainicial'=>$fechaInicial,"fechaFinal"=>$fechaFinal]]);
        return Inertia::render('InformePolicial/InformeMensual',["fechaInicial"=>$fechaInicial->format('d-m-Y'),
                                                               "fechaFinal" =>$fechaFinal->format('d-m-Y')   ,
                                                               "huespedesMes"=>$huespedesMes]);


        

        


    }


}
