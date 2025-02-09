<?php

namespace App\Http\Controllers;

use App\Models\Huespede;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rules\In;

class HuespedeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * This method retrieves a paginated list of Huespede records ordered by descending ID
     * and returns an Inertia response to render the "Catalogo/Huespede/Index" view with the data.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        //
        $huespedes=Huespede::orderByDesc("id")->paginate(10);
        return Inertia::render("Catalogo/Huespede/Index",["dataHuespede"=>$huespedes]);


    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Catalogo/Huespede/Create');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validate=$request->validate([
            "nombre"=>["required","max:190"]  ,
            "apellidos"=>["required","max:190"],
            "cedula"=>["required","unique:".Huespede::class],
            "nacimiento"=>['required','date','before:'.Carbon::now()->subYear(18)],
            "nacionalidad"=>['required','string','in:V,E'],
            'pasaporte'=>['string','nullable'],
            'procedencia'=>['required','string'],
            'destino'=>['required','string'],
            'vehiculo'=>['string','nullable'],
             'placa'=>['string','nullable'],
             'direccion'=>['required','string',"max:250"],
             'telefono'=>['string','nullable'],
             'celular'=>['string','required'],
             'email'=>['email','required'],
             'profesion'=>['string','nullable'],
             'estadocivil'=>['required',new IN(['S','C','D','V'])]

            ]);
            try {
                //code...
                $huespede=Huespede::create($request->all());
                if($huespede){
                   return redirect()->route("huespede.get")->with("message","Registro creado:".$huespede->id);

                } 
                return redirect()->route("huespede.get")->with("message","Registro no se pudo creado:".$huespede->id);

            } catch (\Throwable $th) {
                //throw $th;
                return redirect()->route("huespede.get")->with("message","Ha ocurrido un error::".$th->getMessage());
            }
    }

    /**
     * Display the specified resource.
     */
    public function show( $id,Huespede $huespede)
    {
        //
        try {
            //code...
            $huespede=Huespede::findOrFail($id);
            return Inertia::render("Catalogo/Huespede/Edit",["dataHuespede"=>$huespede]);


        } catch (\Throwable $th) {
            //throw $th;
            return redirect()->route("huespede.get")->with("message","Huespede no encontrado");
        }
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Huespede $huespede)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Huespede $huespede)
    {
        //
        $validate=$request->validate([
            "nombre"=>["required","max:190"]  ,
            "apellidos"=>["required","max:190"],
            "cedula"=>["required","exists:huespedes,cedula"],
            "nacimiento"=>['required','date','before:'.Carbon::now()->subYear(18)],
            "nacionalidad"=>['required','string','in:V,E'],
            'pasaporte'=>['string','nullable'],
            'procedencia'=>['required','string'],
            'destino'=>['required','string'],
            'vehiculo'=>['string','nullable'],
             'placa'=>['string','nullable'],
             'direccion'=>['required','string',"max:250"],
             'telefono'=>['string','nullable'],
             'celular'=>['string','required'],
             'email'=>['email','required'],
             'profesion'=>['string','nullable'],
             'estadocivil'=>['required',new IN(['S','C','D','V'])]


            ]);
        try {
            //code...
            if ($request->has('id')){
               $huespede=Huespede::find($request->id);
               $huespede->update($request->except('id'));

               return redirect()->route("huespede.get")->with("message","Registro Actualizado");
                               


            }else  return redirect()->route("huespede.get")->with("message","Registro Sin Id, No se actualizo");

            
        } catch (\Throwable $th) {
            //throw $th;
            return redirect()->route("huespede.get")->with("message","Ha ocurrido un error:".$th->getMessage());
        }
        

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Huespede $huespede)
    {
        //
    }
}
