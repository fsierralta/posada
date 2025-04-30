<?php

namespace App\Http\Controllers;

use App\CustomTool\Email\CodeSendEmailUser;
use App\CustomTool\RegistroLibroPolicial;
use App\CustomTool\Reservacion as CustomReservacion;
use App\Models\FichaRegistro;
use App\Models\FichaRegistroHuespe;
use App\Models\FormaPago;
use App\Models\Huespede;
use App\Models\MovimientoHuespede;
use App\Models\PagoHuespede;
use App\Models\Posada;
use App\Models\Precio;
use Carbon\Carbon;
use Exception;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use InvalidArgumentException;

class FichaRegistroHuespeController extends Controller
{
    //
    public $customReservacion;

    public function __construct(CustomReservacion $reservacion)
    {
        $this->customReservacion = $reservacion;

    }

    public function verificaEstatusPosada($id)
    {
          

          try {
            // code...

            $posada = Posada::find($id);
            if ($posada != null) {

                if ($posada->estatus == 'D') {
                    //  info("paso",["posada"=>$posada]) ;
                    $dataRegistro = ['posada' => $posada,
                        'fechaEntrada' => Carbon::now()->format('Y-m-d'),
                        'fechaSalida' => Carbon::now()->addDay()->format('Y-m-d'),
                        'estatus' => 'A', // abriendo ficha,
                        'nroficha' => '',
                        'cedula' => '',
                        'precios' => Precio::all(),
                        'reservaciones' => $this->customReservacion
                            ->reservacionesEnFechaActual(Carbon::now(),
                                Carbon::now(), new CustomReservacion),
                    ];

                    return Inertia::render('Alquiler/Posada/RegistroHuespede', ['dataRegistro' => $dataRegistro]);
                    //  return Inertia::render("Alquiler/Posada/TabsHuespedeConAcompanante",["dataRegistro"=>$dataRegistro]);

                } else {
                    return redirect()->route('dashboard')->with('message', 'cabaña no esta disponible, Ocupada');
                }
            }

            return redirect()->route('dashboard')->with('message', 'cabaña No existe');
        } catch (\Throwable $th) {
            // throw $th;
            return redirect()->route('dashboard')->with('message', 'Ha ocurrido un error:'.$th->getMessage());
        }
    }
    // ---------------

    public function dataHuespede($cedula)
    {

        try {
            // code...
            $huespede = Huespede::where(['nacionalidad' => substr($cedula, 0, 1),
                'cedula' => substr($cedula, 1),
            ])->first();
            if ($huespede) {
                return response()->json(['dataHuespede' => $huespede, 200]);
            } else {
                return response()->json(['dataHuespede' => 'Cedula No existe'], 404);
            }

        } catch (\Throwable $th) {
            // throw $th;
            return response()->json('Error:'.$th->getMessage(), 500);
        }
    }

    // --------------------------
    public function store(Request $request)
    {
        // /se modifica para tomar las reservacion
        // se ingresaa el monto a la abono
        // cuenta
        info('data', ['request' => $request]);
        $validate = $request->validate([
            'precio_id' => ['required'],
            'nrodias' => ['required', 'min:1', 'integer', 'max:365'],
            'nropersonas' => ['required', 'min:1'],
            'fechaEntrada' => ['required', 'date_equals:today'],
            'fechaSalida' => ['required', 'date', 'after_or_equal:fechaEntrada'],
            'cedula' => ['required'],
            'montoTotal' => ['required', 'min:1', 'max:999999'],
            'descripcion' => ['required'],
            'reservacion_id' => ['required', 'min:0'],
        ]);

        // Se hace ajuste para los nrodias, y las fecha de salida sean iguales
        // return response()->json($request->posada['id']);
        $fechaEntrada = new Carbon($validate['fechaEntrada']);
        $fechaSalida = new Carbon($validate['fechaSalida']);
        $diferenciaDias = $fechaEntrada->diffInDays($fechaSalida);
        if ($diferenciaDias != $validate['nrodias']) {
            if ($diferenciaDias == 0 && $fechaEntrada != $fechaSalida) {
                return back()->with(['message' => 'El número de días no coincide con la diferencia entre las fechas'.$diferenciaDias]);
            }

        }

        try {
            // code...
            $posada_id = $request->posada['id'];
            $cedula = $request->cedula;
            $precio_id = $request->precio_id;
            $huespede = Huespede::where(['nacionalidad' => substr($cedula, 0, 1),
                'cedula' => substr($cedula, 1),
            ])->first();

            if ($huespede == null) {
                throw new Exception('Error:Huespede No xiste');
            }
            $posada = Posada::find($posada_id);
            if ($posada == null) {
                throw new Exception('Error:Posada No xiste');
            }

            $ficharegistro = new FichaRegistro;
            $nroRegistro = $ficharegistro->find(1)->mostrarNroFicha();
            $precio = Precio::find($precio_id);
            $totalVerificado = ($precio->precio * $request->nrodias * $request->nropersonas);
            if ($totalVerificado != $request->montoTotal) {
                throw new InvalidArgumentException('El total calculado no coincide con total enviado del arquiler');
            }
            $posada->estatus = 'O';
            $posada->save();
            $fichaRegistroHuespe = FichaRegistroHuespe::create([
                'huespede_id' => $huespede->id,
                'posada_id' => $posada->id,
                'fechaEntrada' => $request->fechaEntrada,
                'fechaSalida' => $request->fechaSalida,
                'estatus' => 'A',
                'nroficha' => $nroRegistro,
            ]);

            $movimientoHuespede = MovimientoHuespede::create([
                'ficha_registro_huespe_id' => $fichaRegistroHuespe->id,
                'precio_id' => $precio_id,
                'cantidad' => $request->nrodias,
                'nropersonas' => $request->nropersonas,
                'totalitem' => $request->montoTotal,
                'nroficharegistro' => $nroRegistro,
                'fecharegistro' => Carbon::now()->format('Y-m-d'),
                'descripcion' => $request->descripcion,
                'precio' => $precio->precio,

            ]);

            // Se incluye el registro policial
            $rp = new RegistroLibroPolicial($request, $fichaRegistroHuespe);
            $insert = $rp->insert();
            info('acompanante', ['exito' => $insert]);

            // -----------------
            $sendDataMail = ['posada' => $posada,
                'movimientoHuespede' => $movimientoHuespede,
            ];

            // -----------------se carga el monto de la reservacion/

            $findReservacionHuespede = $this->customReservacion->findReservacionHuespede((int) $request->reservacion_id);
            if ($findReservacionHuespede != null) {
                return $this->procesarReservacion($request,
                    $totalVerificado,
                    $posada,
                    $huespede,
                    $fichaRegistroHuespe,
                    $sendDataMail);
            }

            //       $ ->merge([
            //         "posada_id"=>$posada->id,
            //         'nroficha' =>$fichaRegistroHuespe->nroficha,
            //         'monto'=>$findReservacionHuespede->monto,
            //         "formaPago_id"=>$findReservacionHuespede->formapago_id,
            //         "referencia"=>$findReservacionHuespede->nro_reservacion,
            //         "observacion"=>$findReservacionHuespede->observacion,
            //         'huespede_id'=>$huespede->id
            //         ])  ;
            //        $findReservacionHuespede->cargado_pago_huespede="si";
            //        $findReservacionHuespede->save();
            //        $findReservacionHuespede->posadas()->attach($posada_id);

            //        $codeSendEmailUser=new CodeSendEmailUser($request);
            //        $codeSendEmailUser->sendNotificacionAlquiler($sendDataMail);
            //    //se envia al pago
            //    return  $this->storepago($request);//se realiza el pago

            //  }

            // se va a crear un classe despachadora de mail
            $codeSendEmailUser = new CodeSendEmailUser($request);
            $codeSendEmailUser->sendNotificacionAlquiler($sendDataMail);

            return redirect()->route('dashboard')->with('message', 'Cliente registrado, Recuerda registrar el pago');

        } catch (\Throwable $th) {
            // throw $th;
            info('error', ['error' => $th->getMessage().'Linea'.$th->getLine()]);

            return redirect()->route('dashboard')->with('message', $th->getMessage().' Linea:'.$th->getLine());
        }

    }

    public function procesarReservacion($request, $totalVerificado, $posada,
        $huespede, $fichaRegistroHuespe, $sendDataMail)
    {

        $findReservacionHuespede = $this->customReservacion->findReservacionHuespede((int) $request->reservacion_id);
        if ($findReservacionHuespede != null) {
            // se carga el monto de la reservacion/
            if (isset($findReservacionHuespede->monto) && $findReservacionHuespede->monto >= $totalVerificado) {

                $findReservacionHuespede->monto = $findReservacionHuespede->monto - $totalVerificado;
            } else {
                $totalVerificado = $findReservacionHuespede->monto;
                $findReservacionHuespede->monto = 0;
            }

            $request->merge([
                'posada_id' => $posada->id,
                'nroficha' => $fichaRegistroHuespe->nroficha,
                'monto' => $totalVerificado,
                'formaPago_id' => $findReservacionHuespede->formapago_id,
                'referencia' => $findReservacionHuespede->nro_reservacion,
                'observacion' => $findReservacionHuespede->observacion ?
                                    $findReservacionHuespede->observacion
                                    :
                                    'Sin observacion',

                'huespede_id' => $huespede->id,
            ]);
            // se carga el monto de la reservacion/

            $findReservacionHuespede->cargado_pago_huespede = 'si';
            $findReservacionHuespede->save();
            $findReservacionHuespede->posadas()->attach($posada->id);

            $codeSendEmailUser = new CodeSendEmailUser($request);
            $codeSendEmailUser->sendNotificacionAlquiler($sendDataMail);
            // se envia al pago
            $pagoPorReservacion = true;

            return $this->storepago($request, $pagoPorReservacion); // se realiza el pago

        }

    }

    // ------------------------------
    // Formulario de pago
    // ------------------------------

    public function formularioPago($posada_id)
    {

        try {
            // code...
            // se envia el monto de la diferencia para ayudar al recepcionista
            //

            $posada = Posada::find($posada_id);
            if ($posada == null) {
                return back()->with('message', 'cabaña No existe');
            }

            if ($posada->estatus != 'O') {
                return back()
                    ->with('message', 'No se puede cargar un pago  a esta posada, no tiene huespede ');
            }

            // Obteniendo la posada asignada al huespede//
            $fichaRegistroHuespe = FichaRegistroHuespe::where('posada_id', $posada->id)
                ->where('estatus', 'A')->first();

            $huespede = $fichaRegistroHuespe->huespede;
            if ($huespede == null) {
                return back()
                    ->with('message', 'No se puede cargar un pago  a esta posada, no tiene huespede asignado');
            }
            // Formas de pago:
            // $ficharegistro=

            $movimientoHuespede = MovimientoHuespede::where('nroficharegistro', $fichaRegistroHuespe->nroficha)
                ->first();
            if ($movimientoHuespede) {
                $montoPagar = $movimientoHuespede->montoPagoPendiente($fichaRegistroHuespe->nroficha);
            } else {
                $montoPagar = 0;
            }

            $fpagos = FormaPago::all();

            return Inertia::render('Catalogo/Huespede/Pago/FormularioPago', [
                'dataPago' => [
                    'posada' => $posada,
                    'huespede' => $huespede,
                    'fichaRegistroHuespe' => $fichaRegistroHuespe,
                    'fpago' => $fpagos,
                    'montoPagar' => $montoPagar],
            ]);

        } catch (\Throwable $th) {
            // throw $th;
            return back()
                ->with('message', 'Ha ocurrido un error:'.$th->getMessage());

        }

    }

    // ----------------------------------------
    // Se registran los pago                  -
    // ----------------------------------------
    public function storepago(Request $request, $pagoPorReservacion = false)
    {

        // Se procesa el pago del huespede
        $validate = $request->validate([
            'posada_id' => ['required'],
            'nroficha' => ['required'],
            'formaPago_id' => ['required'],
            'monto' => ['required', 'min:0.5', 'max:999999'],
            'referencia' => ['required'],
            'observacion' => ['required'],
            'huespede_id' => ['required'],

        ]);
        try {
            // code...el huespede debe presentar el primer movimiento de registro
            $totalCargo = 0;
            $movimientohuespede = MovimientoHuespede::where('nroficharegistro', $request->nroficha)
                ->first();
            if ($movimientohuespede) {
                $totalCargo = $movimientohuespede->totalcargos();
            } else {
                throw new Exception('El huespde no registra el primer movimiento');
            }

            // Si se registra el primer pago entonces no existe el abono//
            $totalAbono = 0;
            $diferencia = 0;
            $pagohuespede = PagoHuespede::where('nroficha', $request->nroficha)
                ->first();

            if ($pagohuespede) {
                $totalAbono = $pagohuespede->totalabono() + $request->monto;
            } else {
                $totalAbono = $request->monto;
            }

            if ($totalAbono > $totalCargo) {
                if (! $pagoPorReservacion) {
                    return redirect()
                        ->route('dashboard')
                        ->with('message', 'Este abono:'.$request->monto.' $ Supera los cargo, Revise bien:'.$totalCargo);
                }

            }
            $pagoHuespede = PagoHuespede::create([
                'formapago_id' => $request->formaPago_id,
                'ficha_registro_huespe_id' => $movimientohuespede->ficha_registro_huespe_id,
                'monto' => $request->monto,
                'fechapago' => Carbon::now()->format('Y-m-d'),
                'referencia' => $request->referencia,
                'observacion' => $request->observacion,
                'nroficha' => $request->nroficha,

            ]);
            if ($pagoHuespede != null) {
                return redirect()->route('dashboard')->with('message', 'Abono a la ficha:'
                                          .$request->nroficha.' por:'.$request->monto);

            } else {
                if ($totalAbono > $totalCargo) {
                    return redirect()
                        ->route('dashboard')
                        ->with('message', 'No se pudo realizar el cargo.. Envie de nuevo');
                }

            }

        } catch (\Throwable $th) {
            // throw $th;
            return redirect()->route('dashboard')->with('message', 'Ha ocurrido un error:'
            .$th->getMessage());

        }

    }

    // Estado de cuenta //-

    public function estadocta($posada_id)
    {

        try {
            // code...
            $posada = Posada::find($posada_id);

            if ($posada->estatus != 'O') {
                return redirect()->route('dashboard')->with('message', 'La cabaña no esta ocupada.. sin huespede');
            }
            $ficharegistroHuespede = $posada->obtenerHuespede(); // ficharegistro link huespede
            $huespede = $ficharegistroHuespede->huespede;
            $detalleCargos = DB::table('movimiento_huespedes')
                ->where('nroficharegistro', $ficharegistroHuespede->nroficha)
                ->join('precios', 'movimiento_huespedes.precio_id', '=', 'precios.id')
                ->select('movimiento_huespedes.*',
                    'precios.descripcion as pvpdescripcion',
                    'precios.precio as pvpprecio',
                    'precios.id as pvpid')
                ->get();
            info('detalleCargos', ['data' => $detalleCargos]);

            $detalleAbonos = DB::table('pago_huespedes')
                ->where('nroficha', $ficharegistroHuespede->nroficha)
                ->join('forma_pagos', 'pago_huespedes.formapago_id', '=', 'forma_pagos.id')
                ->select('pago_huespedes.*', 'forma_pagos.nombre as fpagonombre')
                ->get();

            info('detalleAbonos', ['data' => $detalleAbonos]);

            return Inertia::render('Catalogo/Huespede/EstadoCta/EstadoCta', ['dataEstadoCuenta' => ['posada' => $posada,
                'fichaRegistro' => $ficharegistroHuespede,
                'detalleCargo' => $detalleCargos,
                'detalleAbono' => $detalleAbonos,
            ],
            ]);

        } catch (\Throwable $th) {
            // throw $th;
            return back()->with('message', 'Ha ocurrido un error:'.$th->getMessage());
        }

    }

    /*  -------------------------------------------------------
      Se registra un consumo al huespde
      posada_id:inter


  */

    public function cargarConsumo($posada_id)
    {

        try {
            // code...
            $posada = Posada::find($posada_id);
            if ($posada->estatus == 'O') {

                $fichaRegistroH = FichaRegistroHuespe::where('estatus', 'A')
                    ->where('posada_id', $posada_id)
                    ->first();
                $huespede = $fichaRegistroH->huespede;
                $precios = Precio::all();

                return Inertia::render('Catalogo/Huespede/Consumo/Consumo', ['dataPago' => ['posada' => $posada,
                    'fichaRegistroH' => $fichaRegistroH,
                    'huespede' => $huespede,
                    'precios' => $precios,

                ],

                ]);

            } else {
                return redirect(route('dashboard'))->with('message', 'No se puede realizar un consumo a una cabaña desocupada');

            }
        } catch (\Throwable $th) {
            // throw $th;
            return redirect(route('dashboard'))->with('message', 'Ha ocurrido un error:'.$th->getMessage());

        }

    }

    /* -------------------------------------------------
     * StoreConsumo recibe los
     * datos del consumo
     * y se carga a su registro de cuenta
     *
     */
    public function storeConsumo(Request $request)
    {
        info('store', ['data' => $request]);
        $validate = $request->validate([
            'precio_id' => ['required'],
            'descripcion' => ['required'],
            'nrodias' => ['required'], // para efecto del consumo es uno se trabaja cantidad y precio / total
            'cantidad' => ['required'],
            'montoTotal' => ['required', 'min:1', 'max:999999'],
            'precio' => ['required', 'min:1', 'max:999999'],
            'nroficha' => ['required'],
            'posada_id' => [' required'],
            'huespede_id' => ['required'],

        ]);
        try {
            // code...
            $posada = Posada::where('estatus', 'O')
                ->where('id', $request->posada_id)
                ->first();
            if ($posada == null) {
                return redirect(route('dashboard'))->with('message', 'Cabaña no esta asignada..');
            }
            $fichaRegistroHuespe = FichaRegistroHuespe::where('nroficha', $request->nroficha)
                ->where('posada_id', $request->posada_id)
                ->first();
            if ($fichaRegistroHuespe == null) {
                return redirect(route('dashboard'))->with('message', 'Este huespde no esta registrado');
            }
            $precio = Precio::find($request->precio_id);
            if ($precio == null) {
                return redirect(route('dashboard'))->with('message', 'Este precio  no esta registrado');
            }

            $movimientoHuespede = MovimientoHuespede::create([
                'ficha_registro_huespe_id' => $fichaRegistroHuespe->id,
                'precio_id' => $request->precio_id,
                'cantidad' => $request->cantidad,
                'precio' => $request->precio,
                'descripcion' => $request->descripcion,
                'nropersonas' => 1,
                'totalitem' => $request->montoTotal,
                'nroficharegistro' => $request->nroficha,
                'fecharegistro' => Carbon::now()->format('Y-m-d'),
                'created_at' => Carbon::now()->format('Y-m-d'),
            ]);

            // return redirect()(["id"=>$movimientoHuespede->id],200)->back();

            return response()->json(['id' => $movimientoHuespede->id]);

            //  return redirect(route("dashboard"))->with("message","Consumo Registrado..");

        } catch (\Throwable $th) {
            // throw $th;
            return redirect(route('dashboard'))->with('message', 'Ha OCURRIDO UN ERROR:'.$th->getMessage());
        }

    }

    /*
      Procedmientopara para dar de alta a la cabaña
      /se verifican los estatus
        posada->estatus->"O" ="D"
        ficha_registro-estatus="A"="C"
        Saldo de pago-contra cargos=0

     */
    public function darDeAlta($posada_id)
    {
        try {

            info('dardealta', ['id' => $posada_id]);

            $posada = Posada::find($posada_id);
            if ($posada == null) {
                return redirect(route('dashboard'))->with('message', 'Cabaña no existe');

            }
            // Cabana esta disponible "D"
            if ($posada->estatus()) {
                return redirect(route('dashboard'))->with('message', 'Cabaña no se da de alta , debe estar ocupada');

            }
            // Se carga la ficha de registrodel huespede
            $fichaRegistroHuespe = FichaRegistroHuespe::where('estatus', 'A')
                ->where('posada_id', $posada->id)
                ->first();
            if ($fichaRegistroHuespe == null) {
                return redirect(route('dashboard'))->with('message', 'huespede no esta asignado a ninguna cabaña');

            }
            $huespede = $fichaRegistroHuespe->huespede;
            $movimientoHuespede = MovimientoHuespede::where('nroficharegistro', $fichaRegistroHuespe->nroficha)
                ->first();
            if ($movimientoHuespede == null) {
                return redirect(route('dashboard'))->with('message', 'huespede no esta asignado a ningun cargo');
            }
            $totalCargo = $movimientoHuespede->totalcargos();
            $detalleCargos = $movimientoHuespede->detallesCargos();
            $pagohuespede = PagoHuespede::where('nroficha', $fichaRegistroHuespe->nroficha)
                ->first();
            if ($pagohuespede == null) {
                return redirect(route('dashboard'))->with('message', 'huespede no esta asignado a ningun abono');

            }
            $totalAbono = $pagohuespede->totalabono();

            if ($totalCargo != $totalAbono) {
                return redirect(route('dashboard'))->with('message', 'Hay una diferencia entre caergo y abono'.strval($totalCargo - $totalAbono));
            }

            // code...
            DB::transaction(function () use ($posada, $fichaRegistroHuespe, $totalAbono, $totalCargo) {
                DB::table('posadas')
                    ->where('id', $posada->id)
                    ->update(['estatus' => 'D']);

                DB::table('ficha_registro_huespes')
                    ->where('nroficha', $fichaRegistroHuespe->nroficha)
                    ->where('estatus', 'A')
                    ->update(['estatus' => 'C',
                        'fechacierre' => now()->format('Y-m-d')]);
                // Control de cabaña  cerradas
                DB::table('cabana_cerradas')
                    ->insert(['ficha_registro_huespe_id' => $fichaRegistroHuespe->id,
                        'nroficharegistro' => $fichaRegistroHuespe->nroficha,
                        'posada_id' => $posada->id,
                        'totalabono' => $totalAbono,
                        'totalcargo' => $totalCargo,
                        'fechacierre' => now()->format('Y-m-d'),
                        'igtf' => 0,  // Se tiene pendiente a futuro
                        'iva' => env('VITE_IVA'),
                        'user_id' => Auth::id(),
                    ]);

            }, 5);

            return redirect(route('dashboard'))->with('message', 'Cabaña esta disponible alquilar');

        } catch (\Throwable $th) {
            // throw $th;
            return redirect(route('dashboard'))->with('message', 'No se dio de alta , ha ocurrido un error'.$th->getMessage());
        }
        /* return response()->json([
           'huespede'=>$huespede,
           "posada"=>$posada,
           'ficha'=>$fichaRegistroHuespe,
           "totalc"=>$totalCargo,
           "cargo"=>$detalleCargos,
           'abono'=>$totalAbono


        ]);  */

    }

    public function notaFactura($posada_id)
    {

        $fichaRegistroHuespe = FichaRegistroHuespe::where('estatus','A')
            ->where('posada_id',$posada_id)
            ->first();
        $posada = $fichaRegistroHuespe->posada;
        $huespede = $fichaRegistroHuespe->huespede;
        
        return Inertia::render('Catalogo/Huespede/Factura/Factura',['datahuespede' => [
            'ficharegistro' => $fichaRegistroHuespe]]);

    }
}
