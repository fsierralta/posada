
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estado de Cuenta </title>
    <link rel="stylesheet" href="{{resource_path('css/reporte.css')}}">

   
</head>
<body>
    <div>
               <div>
                        <p><hr/></p>
                        <h1>{{env("VITE_NOMBRE_POSADA")}}</h1>
                        <h2 >Estado De Cuenta</h2>
                        <p><hr/></p>   
                        <p>Fecha: {{$cabezera['fechaActual'] }}</p>
                        <p>Cliente: {{$cabezera['nombreCliente']}}</p>
                        <p>RIF:{{$cabezera['cedula']}}</p>
                        <p>Cabaña:{{$cabezera['nombrePosada']}}</p>
                        <p><hr/></p>
                </div>
                <div>
                    <table style="width: 100%;">
                        <tr>
                            <th>Item</th>
                            <th>Cargo/Abono</th>
                            <th>Fecha</thead>
                            <th>Descripcion</th>
                            <th>Monto</th>
                            
                        </tr>
                        <tbody>
                             @foreach ($cargos as $item )
                                <tr>
                                    <th>{{$item->id}}</th>
                                    <th>{{"Cargo"}}</th>
                                    <th>{{$item['fecharegistro']}}</th>
                                    <th>{{$item["descripcion"]  }}  </th>
                                    <th>{{$item->totalitem}}    </th>
                                  </tr>
                                 
                                 
                             @endforeach




                        </tbody>
                        <tfoot>
                            
                          <tr>
                              <td colspan="5" class="pagar"><p>Total Cargo:{{$totalcargo}}</p> </td>
                            </tr>
                            <tr>
                                <td colspan="5" class="cabezeraAbono">ABONOS </td>
                            </tr>
                        @foreach ($abonos as $item )
                                <tr>
                                    <th>{{$item->id}}</th>
                                    <th>{{"Abono"}}</th>
                                    <th>{{$item['fechapago']}}</th>
                                    <th>{{$item->referencia}}  </th>
                                    <th>{{$item->monto}}    </th>
                                  </tr>
                                 
                                 
                             @endforeach


                        </tfoot>
                    </table>  
                </div>  
                <div class="pagar">
                        <p >Total Abonos: {{ $totalabono }}</p>
                        <p><hr/><hr/></p>
                <p><hr/></p>  
                

                </div>



    </div>
    
</body>
</html>

