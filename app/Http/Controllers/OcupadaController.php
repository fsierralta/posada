<?php

namespace App\Http\Controllers;

use App\Models\Ocupada;
use Carbon\Carbon;
use Illuminate\Http\Request;

class OcupadaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Ocupada $ocupada)
    {
        // determinar si la habitacion esta ocupada donde estatus=ocupada
        // y la fecha de salida sea mayor a la fecha actual
        // si es asi devolver la habitacion ocupada
        $ocupada = Ocupada::where('estatus', 'ocupada')
            ->where('fecha_salida', '>', Carbon::now())
            ->get();

        return response()->json($ocupada);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ocupada $ocupada)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ocupada $ocupada)
    {
        //

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ocupada $ocupada)
    {
        //
    }
}
