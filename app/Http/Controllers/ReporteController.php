<?php

namespace App\Http\Controllers;

use App\CustomTool\RegistroLibroPolicial;
use App\Models\FichaRegistroHuespe;
use App\Models\MovimientoHuespede;
use App\Models\PagoHuespede;
use App\Models\Posada;
use App\Models\Reservacion;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ReporteController extends Controller
{
    // recibe el ticket a imprimir
    public function ticketConsumo($movimientoHuespede_id)
    {

        // Obtener los datos del cliente y los items
        $datacliente = MovimientoHuespede::find($movimientoHuespede_id);
        $fichaRegistro = FichaRegistroHuespe::where('nroficha', $datacliente->nroficharegistro)
            ->first();
        //  info("consumo",["data"=>$datacliente]);
        /*  return response()->json(["data"=>[
                                   "ficha"=>$fichaRegistro,
                                   "mov"=>$datacliente
                                   ]])               ; */
        $posada = $fichaRegistro->posada;
        $huespede = $fichaRegistro->huespede;

        $total = $datacliente->totalitem;
        $fechaActual = Carbon::now()->format('d-m-Y');
        $cabezera = [
            'nombrePosada' => $posada->nombre,
            'fechaActual' => $fechaActual,
            'nombreCliente' => $huespede->nombre.' '.$huespede->apellidos,
            'cedula' => $huespede->nacionalidad.$huespede->cedula,

        ];
        // info("cabezera",["data"=>$cabezera["fechaActual"]
        // ]);
        // return response()->json($cabezera);

        $data = ['cabezera' => $cabezera,
            'datacliente' => $datacliente,
            'total' => $total,
            'datacliente' => $datacliente,
        ];
        /*      return view("reporte.ticketconsumo",['cabezera'=>$cabezera,
                                                           'datacliente'=>$datacliente,
                                                           'total'=>$total,
                                                            'datacliente'=>$datacliente
                                                          ]
                                                       );   */

        $name = $huespede->nacionalidad.$huespede->cedula.'_'.$movimientoHuespede_id.'.pdf';

        $pdf = Pdf::loadView('reporte.ticketconsumo', $data);

        return $pdf->download($name);

    }

    /*
       Procedimiento:Ticket de Consumo
               parametro:huespde_id
               return: pdf->consumo
    */
    public function nroticketConsumo($movimientoHuespede_id)
    {
        // return view("reporte.linkticket",["data"=>$movimientoHuespede_id]);

    }

    public function estadoCta($posada_id)
    {
        info('id', ['id' => $posada_id]);
        $posada = Posada::find($posada_id);
        if ($posada->estatus == 'D') {
            return redirect(route('dashboard'))->with('message', 'Posada debe estar ocupada');
        }
        $fichaRegistro = FichaRegistroHuespe::where('estatus', 'A')
            ->where('posada_id', $posada->id)
            ->first();

        if ($fichaRegistro == null) {
            return redirect(route('dashboard'))->with('message', 'No existe ficha de registro');
        }
        $huespede = $fichaRegistro->huespede;
        $dataCargo = MovimientoHuespede::where('nroficharegistro', $fichaRegistro->nroficha)
            ->get();
        $totalCargo = MovimientoHuespede::where('nroficharegistro', $fichaRegistro->nroficha)
            ->first()->totalcargos();
        $dataAbono = PagoHuespede::where('nroficha', $fichaRegistro->nroficha)
            ->get();
        $totalAbono = PagoHuespede::where('nroficha', $fichaRegistro->nroficha)
            ->first()->totalabono();
        // cabezera

        $fechaActual = Carbon::now()->format('m-d-Y');
        $cabezera = [
            'nombrePosada' => $posada->nombre,
            'fechaActual' => $fechaActual,
            'nombreCliente' => $huespede->nombre.' '.$huespede->apellidos,
            'cedula' => $huespede->nacionalidad.$huespede->cedula,

        ];
        $data = ['cargos' => $dataCargo,
            'abonos' => $dataAbono,
            'cabezera' => $cabezera,
            'totalcargo' => number_format($totalCargo, 2, ',', '.'),
            'totalabono' => number_format($totalAbono, 2, ',', '.'),

        ];

        // return view("reporte.estadocta",$data);
        $name = $huespede->nacionalidad.$huespede->cedula.'_'.now()->format('dmy').'.pdf';
        /* $htm=view("reporte.estadocta",$data);
        $pdf=new pdf();
        $pdf->setPaper("A4",'landscape');
        $pdf->loadHTML($htm);
        return $pdf->stream($name); */

        $pdf = Pdf::loadView('reporte.estadocta', $data);

        return $pdf->download($name);

    }

    public function notaFactura($posada_id)
    {
        info('id', ['id' => $posada_id]);
        $posada = Posada::find($posada_id);
        if ($posada->estatus == 'D') {
            return redirect(route('dashboard'))->with('message', 'Posada debe estar ocupada');
        }
        $fichaRegistro = FichaRegistroHuespe::where('estatus', 'A')
            ->where('posada_id', $posada->id)
            ->first();

        if ($fichaRegistro == null) {
            return redirect(route('dashboard'))->with('message', 'No existe ficha de registro');
        }
        $huespede = $fichaRegistro->huespede;
        $dataCargo = MovimientoHuespede::where('nroficharegistro', $fichaRegistro->nroficha)
            ->get();
        $totalCargo = MovimientoHuespede::where('nroficharegistro', $fichaRegistro->nroficha)
            ->first()->totalcargos();
        $dataAbono = PagoHuespede::where('nroficha', $fichaRegistro->nroficha)
            ->get();
        $totalAbono = PagoHuespede::where('nroficha', $fichaRegistro->nroficha)
            ->first()->totalabono();
        // cabezera

        $fechaActual = Carbon::now()->format('d-m-Y');
        $cabezera = [
            'nombrePosada' => $posada->nombre,
            'fechaActual' => $fechaActual,
            'nombreCliente' => $huespede->nombre.' '.$huespede->apellidos,
            'cedula' => $huespede->nacionalidad.$huespede->cedula,
            'telefonos' => $huespede->celular.'/'.$huespede->telefono,
            'direccion' => $huespede->direccion,
        ];
        $data = ['cargos' => $dataCargo,
            'cabezera' => $cabezera,
            'totalcargo' => number_format($totalCargo, 2, ',', '.'),

        ];

        // return view("reporte.estadocta",$data);
        $name = $huespede->nacionalidad.$huespede->cedula.'_'.Str::random(6).'.pdf';
        $pdf = Pdf::loadView('reporte.notadefactura', $data);

        return $pdf->download($name);

    }

    public function movimientosPagos(Request $request)
    {

        try {
            // code...
            $pagoHuespede = new PagoHuespede;
            $totalGeneral = $pagoHuespede->totaLGeneralPorRango(Carbon::parse($request->fechainicial), Carbon::parse($request->fechafinal));
            $pagosPorRango = $pagoHuespede->pagosPorRangoReporte(Carbon::parse($request->fechainicial), Carbon::parse($request->fechafinal));

            $name = 'repocaja.pdf';
            $pdf = Pdf::loadView('reporte.movimientosPagos', [
                'fechaInicial' => $request->fechainicial,
                'fechaFinal' => $request->fechafinal,
                'pagos' => $pagosPorRango,
                'totalGeneral' => $totalGeneral,
            ]);

            return $pdf->download($name);
            // return $pdf->stream($name);

        } catch (\Throwable $th) {
            // throw $th;
            info('error', ['message' => $th->getMessage()]);

            return back()->with('message', $th->getMessage());

        }

    }

    public function informepolicialmensual(Request $request)
    {

        try {
            // code...
            info('repo05', ['data' => $request->fechainicial]);
            $rp = new RegistroLibroPolicial;
            $fechaInicial = Carbon::parse($request->fechainicial);
            $fechaFinal = Carbon::parse($request->fechafinal);
            $huespedesMes = $rp->getAllReporte($fechaInicial, $fechaFinal);
            // return response()->json($huespedesMes);

            /* return view('reporte.informePolicialMensual',["fechaInicial"=>$fechaInicial->format('d-m-Y'),
                                                          "fechaFinal" =>$fechaFinal->format('d-m-Y')   ,
                                                         "huespedesMes"=>$huespedesMes
                                                        ]
                                                     );  */
            $name = 'repoInformeMes_'.$fechaInicial->month.'_'.$fechaInicial->year.'.pdf';
            $pdf = Pdf::loadView('reporte.informePolicialMensual', ['fechaInicial' => $fechaInicial->format('d-m-Y'),
                'fechaFinal' => $fechaFinal->format('d-m-Y'),
                'huespedesMes' => $huespedesMes,
            ]);
            $pdf->set_paper('A3', 'landscape');

            return $pdf->download($name);
        } catch (\Throwable $th) {
            // throw $th;
            info('error', ['message' => $th->getMessage()]);

            return back()->with('message', $th->getMessage());
        }

    }

    /**
     * Genera un reporte PDF del informe policial mensual
     *
     * Este método genera un reporte PDF con los registros de huéspedes para un período específico.
     * Utiliza la clase RegistroLibroPolicial para obtener los datos y genera un archivo PDF en formato A3 horizontal.
     *
     * @param  Request  $request  Contiene los parámetros fechainicial y fechafinal para el período del reporte
     * @return \Illuminate\Http\Response Descarga el archivo PDF generado
     *
     * @throws \Throwable Si ocurre algún error durante la generación del reporte
     */
    public function reservacionPdf(Request $request, $id)
    {
        try {
            $reservacion = Reservacion::with(['huespede', 'posadas'])->find($id);

            if (! $reservacion) {
                return back()->with('message', 'Reservación no encontrada');
            }

            $fechaActual = Carbon::now()->format('d-m-Y');

            $cabezera = [
                'fechaActual' => $fechaActual,
                'nombreCliente' => $reservacion->huespede->nombre.' '.$reservacion->huespede->apellidos,
                'cedula' => $reservacion->huespede->nacionalidad.$reservacion->huespede->cedula,
                'telefonos' => $reservacion->huespede->telefono,
                'direccion' => $reservacion->huespede->direccion,
                'fechaEntrada' => Carbon::parse($reservacion->fecha_entrada)->format('d-m-Y'),
                'fechaSalida' => Carbon::parse($reservacion->fecha_salida)->format('d-m-Y'),
                'nroPersonas' => $reservacion->nro_personas,
                'observacion' => $reservacion->observacion,
                'monto' => $reservacion->monto_original,
                'cantidad_cabana_reservadas' => $reservacion->cantidad_cabana_reservadas,
            ];

            $name = 'r'.$reservacion->nro_reservacion.'.pdf';

            // Limpiamos cualquier salida previa

            // ob_end_clean();

            $pdf = Pdf::loadView('reservaciones.reservacion', [
                'cabezera' => $cabezera,
                'reservacion' => $reservacion->only('nro_reservacion'),
            ]);
            $pdf->setPaper('a4');
            $pdf->setOption('isHtml5ParserEnabled', true);

            return $pdf->download($name);

        } catch (\Throwable $th) {
            info('error', ['message' => $th->getMessage()]);
            Log::

            return back()->with('message', 'Error al generar el PDF: '.$th->getMessage());
        }
    }
}
