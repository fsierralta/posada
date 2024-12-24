<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reservaciones Posada los Humacos</title>
</head>
<body>
    <h1>{{env("VITE_NOMBRE_POSADA")}}  </h1>
    <hr/>
    <h1>{{"Ocupación  hoy: ".now()->format('d-m-Y')}}</h1>
    <hr/>
    <h3>Cabaña:{{$sendDataMail['posada']['nombre']}}
    <h3>Por $:{{$sendDataMail['movimientoHuespede']['totalitem']}}

</body>
</html>