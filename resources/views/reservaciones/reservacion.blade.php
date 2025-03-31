
@extends('layouts.layout')

@section("content")
    <h1>Fecha Impresion:{{ $cabezera["fechaActual"] }}  
    <h1>Reservacion</h1>
    <hr/>
    <h3> {{'Nro:'.$reservacion["nro_reservacion"]}}
    <p><hr/></p>   
    <p>Cliente: {{$cabezera['nombreCliente']}}</p>
    <p>RIF-Cedula:{{$cabezera['cedula']}}</p>
    <p>Telefono:{{$cabezera['telefonos']}}
    <p>Dirección:{{$cabezera['direccion']}}</p>   
    <p>Fecha Entrada: {{$cabezera['fechaEntrada']}}</p>
    <p>Fecha Salida: {{$cabezera['fechaSalida']}}</p>
    <p>Nro Personas: {{$cabezera['nroPersonas']}}</p>
    <p>Observación: {{$cabezera['observacion']}}</p>
    <p><hr/></p>
    <p>Cantida de Cabaña:{{ $cabezera["cantidad_cabana_reservadas"] }}</p>
    <p>Monto Total: {{number_format($cabezera['monto'],2,',','.')}}</p>



@endsection
