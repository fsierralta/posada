<?php

namespace App\Http\Controllers;

use App\Models\Precio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;


class PrecioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $precio=Precio::orderByDesc("Id")->paginate(4);
        return Inertia::render("Catalogo/PrecioBase/Index",["data"=>$precio]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render("Catalogo/PrecioBase/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        info("data",[
            "precio"=>$request
        ]);
        $validate=$request->validate([
             "precio"=>['required',"min:1","max:9999"],
             'descripcion'=>['required'],
      ]);
    
       try {
        //code...
          $precio=Precio::create([
            "precio"=>$request->precio,
            "descripcion"=>$request->descripcion,
            "tipo"=>$request->tipo
          ]);
          return redirect()->route("precio.get")
          ->with('message',"Registro creado");

          

       } catch (\Throwable $th) {
        //throw $th;
        Log::info("error",["error"=>$th->getMessage()]);
        return back()->with("error",$th->getMessage());

       };
    }
    /**
     * Display the specified resource.
     */
    public function show(Request $request,Precio $precio)
    {
        
       
        try {
            //code...
            $precio=Precio::find($request->id);
            if($precio){
                 return Inertia::render("Catalogo/PrecioBase/Edit",["dataEdit"=>$precio]);

            }else{
               return back()->with("message","Registro no existe");
            }
            
            
        } catch (\Throwable $th) {
            //throw $th;
            return back()->with("message","Hubo un error:".$th->getMessage());
        }
       
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Precio $precio)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Precio $precio)
    {
        //
        
        $validate=$request->validate([
            "precio"=>['required',"min:1","max:9999"],
            'descripcion'=>['required'],
     ]);
     try {
        //code...
        $precio=Precio::find($request->id);
        if($precio){
            $precio->precio=$request->precio;
            $precio->descripcion=$request->descripcion;
            $precio->save();
            return redirect()->route("precio.get")
                   ->with("message","Registro actualizado:".$request->id);



        }
        return redirect()->route("precio.get")
        ->with("message","Registro no  actualizado:".$request->id);



     } catch (\Throwable $th) {
        //throw $th;
        return redirect()->route("precio.get")
        ->with("message","Ha ocurrido este error:".$th->getMessage());

     }
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request,Precio $precio)
    {
        //
        try {
            //code...
            $precio=Precio::find($request->id);
            if($precio){
                if($precio->movimientoHuespedes->count()==0){
                     $precio->delete();
                      return redirect()->route("precio.get")
                                 ->with("message","Registro eliminado:".$request->id);

                 }else{
                        return redirect()->route("precio.get")
                                ->with("message","Registro no se puede eliminar, tiene historial:".$request->id); 
                     }
                    }     

            return redirect()->route("precio.get")
            ->with("message","Registro No encontrado:".$request->id);

        } catch (\Throwable $th) {
            //throw $th;
            return redirect()->route("precio.get",)
            ->with("message","Ha ocurrido un error:".$th->getMessage());
        }

    }
}
