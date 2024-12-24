<?php

namespace App\CustomTool;

use App\Models\FichaRegistroHuespe;
use App\Models\Huespede;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Json;
use phpDocumentor\Reflection\Types\Null_;

class RegistroLibroPolicial
{
    /**
     * Create a new class instance.
     */
    
    private $acompanante;
    private $posada;
    private $fichaRegistroHuespe;

    public function __construct( $request=null, $fichaRegistroHuespe=null)
    {
        //
        $this->acompanante=$request==null ?null: $request->acompanante ;
        $this->posada=     $request==null ?null: $request->posada;
        $this->fichaRegistroHuespe=$fichaRegistroHuespe==null ?null :$fichaRegistroHuespe;
      
    }

    public function  existe(){
       
     $existe= count($this->acompanante)>0 ?true:false;
     return $existe;



    }

    public function insert(){

        try {
              //Insertando el registro principal
              info('dataAcom',["posada"=>$this->posada,
                               'acompanante'=>$this->acompanante]);
                    $insertIntem=DB::table('informe_policial')
                             ->insert([
                                'created_at'=>now(),
                                'updated_at'=>now(),
                                'huespede_id'=>$this->fichaRegistroHuespe->huespede_id,
                                'posada_id'=>$this->posada['id'],
                                'ficha_registro_huespe_id'=>$this->fichaRegistroHuespe->id,
                                'nroficha'=>$this->fichaRegistroHuespe->nroficha,
                                'fechaRegistro'=>now()
                             ]);
                             
                 //Insertando acompanante----------------------------------------//si hay
                 iF($this->acompanante!==null){
                        foreach($this->acompanante as $acom){
                            $huespede=Huespede::where('nacionalidad',substr($acom['cedula'],0,1))
                                                ->where('cedula',substr($acom['cedula'],1))
                                                ->first();

                            if($huespede) {
                                $insertIntem=DB::table('informe_policial')
                                ->insert([
                                'created_at'=>now(),
                                'updated_at'=>now(),
                                'huespede_id'=>$huespede->id,
                                'posada_id'=>$this->posada['id'],
                                'ficha_registro_huespe_id'=>$this->fichaRegistroHuespe->id,
                                'nroficha'=>$this->fichaRegistroHuespe->nroficha,
                                'fechaRegistro'=>now()
                                ]);
                            } 
                         }            
                    }     
                  return true;    
                         
        }
        catch (\Throwable $th) {
            info("errorACom",["error"=>$th->getMessage()]);
            return false;
            
        }



    }

public function getAll(Carbon $fechaInicial,Carbon $fechaFinal){
   
        try {
              //code...
              
            $getData=DB::table('informe_policial') 
            ->whereBetween('fechaRegistro',[$fechaInicial,$fechaFinal])
            ->join('huespedes','informe_policial.huespede_id','=','huespedes.id')
            ->join('posadas',  'informe_policial.posada_id','=','posadas.id')
            ->join('ficha_registro_huespes','informe_policial.ficha_registro_huespe_id','=','ficha_registro_huespes.id')
            ->select("huespedes.*","posadas.nombre as nombreposada",
                     "ficha_registro_huespes.fechaEntrada","ficha_registro_huespes.fechaSalida")
           ->paginate(5);
           session("message","Relizar su consulta");
             return $getData;
             


            
        //  return ['data'=>$getData];
                   

        } catch (\Throwable $th) {
            //throw $th;
          info('data',['get'=>$th->getMessage()]);
          session('message',"Ha ocurrido un error:".$th->getMessage());
          $getData=null;
           return redirect(route('libromensual.get'))->with('message','Ha ocurrido un error:'.$th->getMessage());
        }
      

    }

    public function getAllReporte(Carbon $fechaInicial,Carbon $fechaFinal)    {

         try {
              //code...
              
            $getData=DB::table('informe_policial') 
            ->whereBetween('fechaRegistro',[$fechaInicial,$fechaFinal])
            ->join('huespedes','informe_policial.huespede_id','=','huespedes.id')
            ->join('posadas',  'informe_policial.posada_id','=','posadas.id')
            ->join('ficha_registro_huespes','informe_policial.ficha_registro_huespe_id','=','ficha_registro_huespes.id')
            ->select("huespedes.*","posadas.nombre as nombreposada",
                     "ficha_registro_huespes.fechaEntrada","ficha_registro_huespes.fechaSalida")
            ->get()     ;
             session("message","Relizar su consulta");
             return $getData;
             


            
        //  return ['data'=>$getData];
                   

        } catch (\Throwable $th) {
            //throw $th;
          info('data',['get'=>$th->getMessage()]);
          session('message',"Ha ocurrido un error:".$th->getMessage());
          $getData=null;
           return redirect(route('libromensual.get'))->with('message','Ha ocurrido un error:'.$th->getMessage());
        }




    }
     



    /**
     * Invoke the class instance.
     */
    public function __invoke(): void
    {

    }
}
