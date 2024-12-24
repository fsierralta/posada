@extends('layouts.layout')

@section("content")

    <h2>Barquisimeto,{{now()->format('d-m-Y')}}</h2>
    <hr/>
    <h1>Opticas My Optic</h1>
    <hr/>
    <p>
        Nos complace que te hallas registrado,
        Por lo cual recibiras un {{env("VITE_INSTAGRAM_DESCUENTO")}} porciento  de DESCUENTO
        por la compra en monturas de lentes.
     </p>
     <hr/>
     <p >
        <span style="color:red;">
            Este descuento aplica solo para pagos 
            en Divisas(dolares)
        </span>
     </p>
      <hr/>
     <h1>  
           Reg Nro:{{$sendDataMail['id']}}
           Nombre:{{$sendDataMail['nombre']}}
        Apellidos:{{$sendDataMail['apellidos']}}
         Telefono:{{$sendDataMail['celular']}}


     </h1>
     <hr/>
     <p>
        <h2>Tiendas donde puedes aplicar tu descuento</h2>
        <hr/>
            Centro óptico valcast cabudare c.a
            RIF: J303333320
            Correo :valcastcabudare_2@hotmail.com
            Dirección: Cabudare Av Libertador CC La Candelaria 
            Teléfono:+58 424 5142739
         <hr/>   
          Myoptic centro 
          Carrera 19 entre 25 y 26 Boulevard del teatro Juárez 
          Correo:Myoptic2019@hotmail.com
          Teléfono: +58 4140547561
          <hr/>
           Myoptic Cabudare 
           Dirección: cabudare,centro comercial palmera plaza 
           Teléfono :+58 4140547561
           Correo: Myoptic2019@hotmail.com

     </p>
     
@endsection

    
