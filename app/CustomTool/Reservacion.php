<?php

namespace App\CustomTool;
use App\Models\Posada;
use Illuminate\Support\Facades\DB;
use PhpParser\ErrorHandler\Collecting;

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
    public static function  posadaPorCapacidad($posadas=null):?Collecting
    {
        $groupCapcity = Posada::select('capacidad',DB::raw('count(*) as total'))->groupBy('capacidad')
        ->orderBy('capacidad','asc')
        ->get();
        if($groupCapcity->count()==0)      return null;
        
        return $groupCapcity;


    
    }
    

}
