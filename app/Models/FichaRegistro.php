<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FichaRegistro extends Model
{
    use HasFactory;
    protected $fillable=[
        "nro",
        'nro_factura',
        'nro_reservacion'

    ];
    private $nroActual ;
    private $nroFactura;
    private $nroReservacion;

    private function despachador(){
     
       $this->nroActual=str_pad(str(intval($this->nro)+1),12,"0",STR_PAD_LEFT);
       $this->nro=str_pad(strval($this->nroActual),12,"0",STR_PAD_LEFT);
       $this->save();
       return $this->nroActual;

    }
    public function mostrarNroFicha(){
       return $this->despachador();
       
      

    }
    
    private function despachadorNroFactura(){
        $this->nroFactura=str_pad(str(intval($this->nro_factura)+1),12,"0",STR_PAD_LEFT);
        $this->nro_factura=str_pad(str($this->nroFactura),12,"0",STR_PAD_LEFT);
        $this->save();
        return $this->nroFactura;

    }
    private function despachadorNroReservacion(){
        $this->nroReservacion = str_pad(str(intval($this->nro_reservacion)+1), 12, "0", STR_PAD_LEFT);
        $this->nro_reservacion = str_pad(strval($this->nroReservacion), 12, "0", STR_PAD_LEFT);
        $this->save();
        return $this->nroReservacion;
    }

    public function mostrarNroReservacion(){
        return $this->despachadorNroReservacion();
    }

    public function mostrarNroFactura() {

        return $this->despachadorNroFactura();
    }

}
