<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{resource_path('css/reporte.css')}}">
    <title>{{env("VITE_NOMBRE_POSADA")}}</title>
</head>
<body>
    <header>
       <hr/>
       <p>
        <h1>{{env("VITE_NOMBRE_POSADA")}}</h1>
        <h5>{{env("VITE_RIF_POSADA")}}</h5>
       </p>
       <hr/>

    </header>
    <div>   
      @yield("content")
          
    </div>
       

    <footer>
         <hr/>
         <h6>Email:{{env("VITE_EMAIL_POSADA")}}</h6>
         <h6>Celular:{{env("VITE_CELULAR_POSADA")}}</h6>
         <hr/>
    </footer>
    
   
     
</body>
</html>