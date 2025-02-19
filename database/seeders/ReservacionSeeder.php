<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
//--
use App\Models\Reservacion; // Importa tu modelo de Reservación
use App\Models\Huespede; // Importa tu modelo de Huesped
use App\Models\FormaPago; // Importa tu modelo de FormaPago
use Carbon\Carbon; // Para trabajar con fechas

class ReservacionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $huespedes = Huespede::all(); // Obtén todos los huéspedes
        $formasPago = FormaPago::all(); // Obtén todas las formas de pago

        for ($i = 0; $i < 100; $i++) {
            $huespede = $huespedes->random(); // Selecciona un huésped al azar
            $formaPago = $formasPago->random(); // Selecciona una forma de pago al azar

            $fechaEntrada = Carbon::createFromFormat('Y-m-d', $this->fechaAleatoria())->addDays(rand(0, 365)); // Fecha de entrada aleatoria en el último año
            $fechaSalida = $fechaEntrada->copy()->addDays(rand(1, 10)); // Fecha de salida aleatoria (entre 1 y 10 días después)

            Reservacion::create([
                'nro_reservacion' => str_pad($i + 1, 12, '0', STR_PAD_LEFT), // Número de reservación correlativo
                'huespede_id' => $huespede->id,
                'nro_personas' => rand(1, 5), // Número de personas aleatorio (entre 1 y 5)
                'fecha_entrada' => $fechaEntrada,
                'fecha_salida' => $fechaSalida,
                'estatuspago' => 'p', // Estatus de pago pendiente
                'observacion' => $this->observacionAleatoria(), // Observación aleatoria
                'monto' => rand(100, 1000), // Monto aleatorio (entre 100 y 1000)
                'formapago_id' => $formaPago->id,
                'cantidad_cabana_reservadas' => rand(1, 3), // Cantidad de cabañas reservadas aleatoria (entre 1 y 3)
            ]);
        }

        
    }

    private function fechaAleatoria()
    {
        $year = rand(2025, 2026); // Año aleatorio
        $month = rand(1, 12); // Mes aleatorio
        $day = rand(1, 28); // Día aleatorio (evita problemas con meses de 30/31 días)

        return sprintf('%04d-%02d-%02d', $year, $month, $day);
    }


    private function observacionAleatoria()
    {
        $observaciones = [
            'Llegada tarde',
            'Solicitud especial: cama extra',
            'Cliente frecuente',
            null, // Sin observación
        ];

        return $observaciones[array_rand($observaciones)];
    }


}
