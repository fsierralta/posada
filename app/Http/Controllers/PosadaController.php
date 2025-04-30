<?php

namespace App\Http\Controllers;

use App\Models\Posada;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PosadaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    private $currenUser;

    public function __construct(

    ) {}

    public function index()
    {
        //
        $data = Posada::orderByDesc('id')->paginate(4);
        // $huespedesRegistrados=(new Posada())->obtenerHuespedes();

        return Inertia::render('Catalogo/Posada/Index', ['data' => $data]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // -----------------------------
        return Inertia::render('Catalogo/Posada/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        // Log::info("paso",["data"=>$request]);

        $validate = $request->validate(
            ['nombre' => ['required'],
                'descripcion' => ['required', 'max:200'],
                'capacidad' => ['required', 'numeric', 'min:1', 'max:100'],
            ]
        );
        try {
            // code...
            $posada = Posada::create([
                'nombre' => $request->nombre,
                'descripcion' => $request->descripcion,
                'capacidad' => $request->capacidad,
            ]);

            return redirect()->route('posada.get')
                ->with('message', 'Registro creado:'.$posada->id);
            // return $this->index();

        } catch (\Throwable $th) {
            // throw $th;
            Log::info('error', ['error' => $th->getMessage()]);

            return back()->with($th->getMessage());
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(Posada $posada)
    {
        //

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Posada $posada)
    {
        //
        Log::info('edit', ['data' => $posada]);

        return Inertia::render('Catalogo/Posada/Editar', ['editData' => $posada]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {

        Log::info('update', ['data' => $request,
        ]);
        $validate = $request->validate(
            ['nombre' => ['required'],
                'descripcion' => ['required', 'max:200'],
                'capacidad' => ['required', 'numeric', 'min:1', 'max:100'],
                'id' => ['required'],
            ]
        );
        try {
            // code...

            $posada = Posada::find($request->id);

            if ($posada === null) {
                Log::info('grabo', ['posada' => $posada]);
                throw new Exception('No existe registro');
            } else {
                $posada->nombre = $request->nombre;
                $posada->descripcion = $request->descripcion;
                $posada->capacidad = $request->capacidad;
                $posada->save();

                return redirect()->route('posada.get', $absulute = true)
                    ->with('message', 'Registro Actulizado:'.$request->id);
            }
        } catch (\Exception $th) {
            // throw $th;
            return back()->with('message', $th->getMessage().$th->getLine());
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //

        try {
            // code...
            $posada = Posada::find($id);
            if ($posada != null) {
                $fregsitros = $posada->fichaRegistroHuespedes
                    ->count();
                if ($fregsitros == 0) {

                    $posada->delete();

                    return back()->with('message', 'Registro eliminado');

                } else {
                    return back()->with('message', 'Esta cabaña tiene historial.. no se puede eliminar');
                }

            } else {
                throw new Exception('Registro no existe esta cabaña...');
            }

        } catch (\Throwable $th) {
            // throw $th;
            return back()->with('message', $th->getMessage());
        }

    }
}
