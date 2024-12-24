@php
 use Carbon\Carbon;
@endphp


@extends('layouts.layout')
@section("content")
   <div>
        <h6  class="fecha-impresion">Fecha de impresion:{{now()->format('d-m-Y')}}</h6>
   </div>

<h1>Reporte de Caja</h1>
<h5>{{'Desde:'.Carbon::parse($fechaInicial)->format('d-m-Y')}} / {{'Hasta:'. Carbon::parse($fechaFinal)->format('d-m-Y')}}</h5>
<table  
       style="width:100%;"  
>
    <thead>
        <tr>
            <th>Item</th>
            <th>Forma Pago</th>
            <th>Fecha</th>
            <th>Monto</th>
        </tr>

    </thead>   
    <tbody>
        @foreach($pagos as $item)
           <tr>
             <td>{{$item->id}}</td>
             <td> {{$item->hnombre}}.{{$item->hapellidos}}-{{$item->pnombre}}/{{$item->nombre}}</td>
             <td style="font-size:8px;">{{Carbon::parse($item->fechapago)->format('d-m-Y')}}</td>
             <td>{{$item->monto}}</td>


           </tr>

        @endforeach

MENSA
    </tbody>



</table>
<h2>{{"Total caja:".number_format($totalGeneral,2,',','.')}}</h2> 
@endsection 