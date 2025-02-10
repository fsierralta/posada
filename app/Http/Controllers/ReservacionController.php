<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservacion;

class ReservacionController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'fecha_entrada' => 'required|date',
            'fecha_salida' => 'required|date|after_or_equal:fecha_entrada',
            // ...validaciones adicionales...
        ]);

        $disponible = $this->verificarDisponibilidad($request->fecha_entrada, $request->fecha_salida);

        if (!$disponible) {
            return response()->json(['error' => 'No hay disponibilidad para las fechas seleccionadas.'], 400);
        }

        // ...código para crear la reservación...

        return response()->json(['message' => 'Reservación creada exitosamente.'], 201);
    }

    private function verificarDisponibilidad($fechaEntrada, $fechaSalida)
    {
        $reservaciones = Reservacion::where(function ($query) use ($fechaEntrada, $fechaSalida) {
            $query->whereBetween('fecha_entrada', [$fechaEntrada, $fechaSalida])
                  ->orWhereBetween('fecha_salida', [$fechaEntrada, $fechaSalida])
                  ->orWhere(function ($query) use ($fechaEntrada, $fechaSalida) {
                      $query->where('fecha_entrada', '<=', $fechaEntrada)
                            ->where('fecha_salida', '>=', $fechaSalida);
                  });
        })->count();

        return $reservaciones < 9;
    }
}
