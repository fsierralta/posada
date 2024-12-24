@php
Use Carbon\Carbon;
 use App\Models\FichaRegistro;
 $fr=FichaRegistro::find(1);
 
@endphp

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NOTA DE FACTURA</title>
    <link rel="stylesheet" href="{{resource_path('css/reporte.css')}}">
</head>
<body>
<div >
                <div >
                        <p></p>
                        <h1>{{env("VITE_NOMBRE_POSADA")}}</h1>
                         <h5>{{env("VITE_RIF_POSADA")}}</h5>
                        <h2 >NOTA DE FACTURA</h2>
                        <h3> {{'Nro:'.$fr->mostrarNroFactura()}}
                        <p><hr/></p>   
                        <p>Fecha: {{ $cabezera['fechaActual'] }}</p>
                        <p>Cliente: {{$cabezera['nombreCliente']}}</p>
                        <p>RIF:{{$cabezera['cedula']}}</p>
                        <p>Telefono:{{$cabezera['telefonos']}}
                        <p>Dirección:{{$cabezera['direccion']}}</p>    
                        <p>Cabaña:{{$cabezera['nombrePosada']}}</p>
                        
                 </div>  

                <table style="width:100%;">
                    <thead style="border-radius:25px;">
                        <tr style="border-radius:25px;">
                            <th>Item</th>
                            <th>Fecha</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                           @foreach($cargos as $item)
                            <tr style="border-radius:25px;">
                                <td>{{$item->id}}</td>
                                <td style="font-size:8px">{{Carbon::parse($item->created_at)->format('d-m-Y')}}</td>
                                <td>{{$item->descripcion}}</td>
                                <td>{{$item->precio}}</td>
                                <td>{{$item->cantidad*$item->nropersonas}}</td>
                                <td>{{$item->totalitem}}</td>
                                
                            </tr>
                           @endforeach 
                        
                    </tbody>
                    <tfoot>
                    <tr>
                          <td colspan="5" class="pagar"><p>Total A Pagar:{{$totalcargo}}</p> </td>
                     </tr>
                       


                    </tfoot>
                </table>
                
    </div>
</body>
</html>