<?php

namespace App\Http\Controllers;

use App\CustomTool\Email\CodeSendEmailUser;
use App\CustomTool\Reservacion as CustomReservacion;
use App\Models\FichaRegistro;
use App\Models\FormaPago;
use App\Models\Huespede;
use App\Models\Precio;
use App\Models\Reservacion;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservacionController extends Controller
{
    public $customReservacion;

    public function __construct()
    {
        $this->customReservacion = new CustomReservacion;
    }

    public function index(Request $request)
    {
        // info('reservacion index',['request'=>$request->all()]);

        if (! $request->has('fecha_entrada') || ! $request->has('fecha_salida')) {
            $fecha_entrada = now()->toDateString();
            $fecha_salida = now()->endOfMonth()->toDateString();

        } else {
            $fecha_entrada = Carbon::parse($request->fecha_entrada)->toDateString();
            $fecha_salida = Carbon::parse($request->fecha_salida)->toDateString();
            $request->merge(['fecha_entrada' => $fecha_entrada]);
            $request->merge(['fecha_salida' => $fecha_salida]);

        }

        $reservaciones = $this->customReservacion->reservacionesEnRangoFecha($fecha_entrada, $fecha_salida, new Reservacion);
        $nroCabana = $reservaciones ? $reservaciones->sum('cantidad_cabana_reservadas') : 0;
        info($reservaciones);

        return Inertia::render('Reservacion/ReservacionIndex', ['reservaciones' => $reservaciones,
            'precios' => Precio::all(),
            'formaPagos' => FormaPago::all(),
            'rangoFechas' => [$fecha_entrada, $fecha_salida],
            'nroCabana' => $nroCabana,

        ]);

    }

    public function create(Request $request)
    {

        $fecha_entrada = Carbon::now()->toDateString();
        $fecha_salida = Carbon::now()->endOfMonth()->toDateString();

        return Inertia::render('Reservacion/ReservacionHuespede', ['precios' => Precio::all(),
            'formaPagos' => FormaPago::all(),
            'rangoFechas' => [$fecha_entrada, $fecha_salida],
            'backRangoFechas' => [$request->rangoFechas[0], $request->rangoFechas[1]],

        ]);
    }

    public function store(Request $request)
    {
        // info("store",['data'=>$request]) ;
        return $this->saveReservacion($request);

    }

    public function edit(Request $request, Reservacion $reservacion)
    {
        info('dataResevacion', ['data' => $reservacion->huespede]);
        try {
            if ($reservacion) {
                return Inertia::render('Reservacion/ReservacionEdit', [
                    'reservacion' => $reservacion,
                    'precios' => Precio::all(),
                    'formaPagos' => FormaPago::all(),

                ]);

            }

        } catch (\Throwable $th) {
            info('', ['error' => $th->getMessage()]);

            return back()->with('message', $th->getMessage());

        }

    }

    public function update(Request $request, Reservacion $reservacion)
    {

        return $this->saveReservacion($request, $reservacion);

    }

    // ----------------
    
    private function saveReservacion(Request $request, ?Reservacion $reservacion = null)
    {
        $validate = $request->validate([
            'fecha_entrada' => 'required|date',
            'fecha_salida' => 'required|date|after_or_equal:fecha_entrada',
            'dias_estadias' => 'required|min:1|integer',
            'precio_id' => 'required|exists:precios,id',
            'nro_personas' => 'required|min:1|integer',
            'cantidad_cabana_reservadas' => 'required|min:1|max:9|integer',
            'totalPagar' => 'required|numeric|min:1',
            'pago_id' => 'required|exists:forma_pagos,id',
            'observacion' => 'nullable|string|max:255',
            'huespede_id' => 'nullable|min:0|integer',
            'nacionalidad' => 'required|string|in:V,E',
            'cedula' => 'required|string|max:20',
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'nacimiento' => 'required|date|before_or_equal:'.now()->subYears(18)->toDateString(),
            'email' => 'required|email|max:255',
            'celular' => 'required|string|max:20',
            'procedencia' => 'required|string|max:255',
            'profesion' => 'required|string|max:255',
        ]);

        try {
            $precio = Precio::findOrFail($request->precio_id);
            $totalPagar = intval($request->nro_personas) * intval($request->dias_estadias) * floatval($precio->precio);

            if ($totalPagar != $request->totalPagar) {
                throw new Exception('Revise el total a pagar');
            }

            $huespede = $this->findOrCreateHuespede($request);

            $disponible = $this->customReservacion->verificarDisponibilidad(
                $request->fecha_entrada,
                $request->fecha_salida,
                $reservacion ?? new Reservacion,
                intval($request->cantidad_cabana_reservadas)
            );

            if (! $disponible) {
                throw new Exception('No hay disponibilidad para las fechas seleccionadas');
            }

            $data = [
                'huespede_id' => $huespede->id,
                'nro_personas' => $request->nro_personas,
                'fecha_entrada' => Carbon::parse($request->fecha_entrada),
                'fecha_salida' => Carbon::parse($request->fecha_salida),
                'estatuspago' => 'C', // confirmado pago
                'monto' => $totalPagar, // cambia segun los pagos
                'monto_original' => $totalPagar, // se agrego para el control del monto original
                'formapago_id' => $request->pago_id,
                'precio_id' => $precio->id,
                'cantidad_cabana_reservadas' => $request->cantidad_cabana_reservadas,
                'observacion' => $request->observacion,
            ];

            if ($reservacion) {
                // se debe puede modificar si la reservacion no tiene pagos
                if ($reservacion->pagoHuespedes()->count() > 0) {
                    throw new Exception('No se puede modificar la reservación, ya tiene pagos asociados');
                }

                $reservacion->update($data);
                $message = 'Reservación actualizada nro: '.$reservacion->nro_reservacion;
            } else {
                $nroReservacion = FichaRegistro::find(1)->mostrarNroReservacion();
                $data['nro_reservacion'] = $nroReservacion;
                $reservacion = Reservacion::create($data);
                $message = 'Reservación registrada nro: '.$reservacion->nro_reservacion;
            }
            // -----------------------

            $this->enviarCorreoReservacion($request, $huespede, $reservacion);

            return redirect(route('reservaciones.index'))->with('message', $message);
        } catch (\Throwable $th) {
            info('Error', ['error' => $th->getMessage()]);

            return back()->with('message', $th->getMessage());
        }
    }

    private function findOrCreateHuespede(Request $request)
    {
        $huespede = Huespede::where('nacionalidad', $request->nacionalidad)
            ->where('cedula', $request->cedula)
            ->first();

        if (! $huespede) {
            $huespede = Huespede::create([
                'nombre' => $request->nombre,
                'apellidos' => $request->apellidos,
                'cedula' => $request->cedula,
                'nacimiento' => Carbon::parse($request->nacimiento),
                'nacionalidad' => strtoupper($request->nacionalidad),
                'procedencia' => $request->procedencia,
                'profesion' => $request->profesion,
                'email' => $request->email,
                'celular' => $request->celular,
                'direccion' => 'al registrarse',
            ]);
        }

        return $huespede;
    }

    // -------
    /**
     * Sends a reservation confirmation email to the specified recipient.
     *
     * This function is responsible for composing and sending an email
     * to confirm a reservation. It typically includes details such as
     * reservation date, time, and other relevant information.
     *
     * @param  string  $email  The recipient's email address.
     * @param  array  $reservationDetails  An associative array containing reservation details.
     *                                     Example keys: 'date', 'time', 'name', etc.
     * @return bool Returns true if the email was sent successfully, false otherwise.
     */
    public function enviarCorreoReservacion(Request $request, Huespede $huespede, Reservacion $reservacion)
    {
        $codeSendMail = new CodeSendEmailUser($request);
        $fechaActual = Carbon::now()->format('d-m-Y');
        $cabezera = [
            'fechaActual' => $fechaActual,
            'nombreCliente' => $huespede->nombre.' '.$huespede->apellidos,
            'cedula' => $huespede->nacionalidad.$huespede->cedula,
            'telefonos' => $huespede->telefono,
            'direccion' => $huespede->direccion,
            'fechaEntrada' => Carbon::parse($request->fecha_entrada)->format('d-m-Y'),
            'fechaSalida' => Carbon::parse($request->fecha_salida)->format('d-m-Y'),
            'nroPersonas' => $request->nro_personas,
            'observacion' => $request->observacion,
            'monto' => $reservacion->monto_original,
            'cantidad_cabana_reservadas' => $reservacion->cantidad_cabana_reservadas,
        ];
        $codeSendMail->sendEmailReservacionToHuespede($cabezera, $reservacion);

    }

    public function destroy(Reservacion $reservacion)
    {
        try {
            $reservacion->delete();

            return redirect(route('reservaciones.index'))->with('message', 'Reservación eliminada correctamente');
        } catch (\Throwable $th) {
            info('Error', ['error' => $th->getMessage()]);

            return back()->with('message', 'Error al eliminar la reservación: '.$th->getMessage());
        }

    }

    public function reservacionesConfirmadas(Request $request)
    {
        try {
            $fecha_inicio = $request->has('fecha_inicio') ? Carbon::parse($request->fecha_inicio)->toDateString()
                         : Carbon::now()->startOfMonth()->toDateString();

            $fecha_final = $request->has('fecha_final') ? Carbon::parser($request->fecha_final)->toDateString()
                         : Carbon::now()->endOfMonth()->toDateString();

            info('fecha', ['fi' => $fecha_inicio, 'ff' => $fecha_final]);

            // code...
            $reservaciones = $this->customReservacion->reservacionesConfirmadas($fecha_inicio, $fecha_final);

            return Inertia::render('Reservacion/ReservacionesConfirmadas', ['reservaciones' => $reservaciones]);

            return response()->json($reservaciones);
        } catch (\Throwable $th) {
            // throw $th;
            return response()->json($th->getMessage());
        }

        // return Inertia::render('Reservacion/ReservacionConfirmada', ['reservaciones' => $reservaciones]);
    }
}
