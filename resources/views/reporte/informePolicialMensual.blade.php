@php
  use Carbon\Carbon;
  function estadoCivil($edocivil){
    switch ($edocivil){
        case "S":
            return "Soltero(a)";
            break;
        case "C":
            return "Casado(a)";
            break;    
        case "V":
            return "Viudo(a)";
            break;    
        case "D":
            return "Divorciado(a)";
            break;    
        default:
        return "Soltero(a)";
        break;  

    };
  }
@endphp

@extends('layouts.layout')
      <div>
        <h6 class="fecha-impresion">Fecha de impresion:{{now()->format('d-m-Y')}}</h6>
     </div>
     @section("content")
        <h1>Reporte Policial</h1>
        <h6>{{"Del:".Carbon::parse($fechaInicial)->format('d-m-Y'). "  al: ".Carbon::parse($fechaFinal)->format('d-m-Y')}}</h6>
        <table style="font-size:small;">
            <thead>
                <tr>
                    <th>Nombre Huespede</th>
                    <th>CI:Pasaporte</th>
                    <th>Telefonos</th>
                    <th>Nacionalidad</th>
                    <th>Edad</th>
                    <th>Estado Civil</th>
                    <th>Vehiculo</th>
                    <th>Destino</th>
                    <th>Cabaña</th>
                    <th>F. Entrada  </th>
                    <th>F. Salida </th>
                </tr>

            </thead>
            <tbody>
                @foreach($huespedesMes as $huespe)
                       <tr >
                          <td>{{$huespe->nombre." ".$huespe->apellidos}}</td>
                          <td>{{$huespe->cedula}}</td>
                          <td>{{$huespe->celular}}</td>
                          <td>{{$huespe->nacionalidad=='V'? "VENEZOALANO":"EXTRANJERO"}}</td>
                          <td>{{round((Carbon::parse($huespe->nacimiento)->diffInYears(now())),0)}}</td>
                          <td>{{estadoCivil($huespe->estadocivil) }}</td>
                          <td>{{$huespe->vehiculo}}</td>
                          <td>{{$huespe->destino}}</td>
                          <td>{{$huespe->nombreposada}}</td>
                          <td>{{Carbon::parse($huespe->fechaEntrada)->format('d-m-Y')}}</td>
                          <td style="font-size: small;">{{Carbon::parse($huespe->fechaSalida)->format('d-m-Y')}}</td>
                          
                       </tr>
                @endforeach
                
            </tbody>
        </table>
     @endsection 

   
       
