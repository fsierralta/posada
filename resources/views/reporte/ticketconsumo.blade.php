<!DOCTYPE html>
<html>
<head>
    <title>Ticket de Pago</title>
    <link rel="stylesheet" href="{{resource_path('css/reporte.css')}}">
</head>
<body>
    <div >
                <p></p>
                <h1>{{env("VITE_NOMBRE_POSADA")}}</h1>
                <h2 >Ticket de Pago</h2>
                <h3> {{'Nro:'.$datacliente['id']}}
                <p><hr/></p>   
                <p>Fecha: {{ $cabezera['fechaActual'] }}</p>
                <p>Cliente: {{$cabezera['nombreCliente']}}</p>
                <p>RIF:{{$cabezera['cedula']}}</p>
                <p>Cabaña:{{$cabezera['nombrePosada']}}</p>
                 <p><hr/></p>

                <table style="width: 100%">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            <tr>
                                <td>{{$datacliente['id']}}</td>
                                <td>{{$datacliente['descripcion']}}</td>
                                <td>{{$datacliente['precio']}}</td>
                                <td>{{$datacliente['cantidad']* $datacliente["nropersonas"]}}</td>
                                <td>{{$datacliente['totalitem']}}</td>
                                
                            </tr>
                        
                    </tbody>
                </table>
                <div class="pagar">
                                <p>Total a pagar: {{ $total }}</p>
                                <p><hr/></p>
                    
                </div>    
    </div>
</body>
</html>