<?php

use App\CustomTool\RegistroLibroPolicial;
use App\Http\Controllers\ContactoController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FichaRegistroController;
use App\Http\Controllers\HuespedeController;
use App\Http\Controllers\PosadaController;
use App\Http\Controllers\PrecioController;
use App\Http\Controllers\ProfileController;
use App\Models\Posada;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Carbon\Carbon;

//---------------------------------
//use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;
use App\Http\Controllers\FichaRegistroHuespeController;
use App\Http\Controllers\PagoHuespedeController;
use App\Http\Controllers\ReporteController;
//use Illuminate\Support\Facades\Mail;
use  App\Http\Controllers\MailController;
use App\Http\Controllers\SendGetCodeController;
//----------------------------------------------------------
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
//----------------------------
Route::get("/codeverification",[SendGetCodeController::class,"senderCode"])
       ->name("codeverification.get");
 //------------------      


Route::get('/dashboard', [DashboardController::class,"index"])
      ->middleware(['auth', 'verified'])
      ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
//-Definiendo las rutas para las posada crud---------------
//
//
//
// Route::get("/posada",[PosadaController::class,"index"])
// ->middleware('auth','verified')
// ->name("posada.get");

// Route::get("/posada/create",[PosadaController::class,"create"]
// )
// ->middleware('auth','verified')
// ->name('posada.create');

// Route::post('/posada',[PosadaController::class,'store'])
// ->middleware('auth','verified')
// ->name('posada.store');

// Route::get("/posada/{id}",function($id){
//    $posada=Posada::find($id);
//    $controller=new PosadaController();
//    return $controller->edit($posada);
//    //return Route::get("posada/{posada}",[PosadaController::class,"edit"]);
// })->middleware('auth','verified')
// ->name("posada.edit");

// Route::put('/posada/put',[PosadaController::class,"update"])
// ->middleware('auth','verified')
// ->name('posada.put');

// Route::delete("/posada/destroy/{id}",[PosadaController::class,"destroy"])
// ->middleware('auth','verified')
// ->name('posada.destroy');


//-------Precio Base//---------------
// Route::get("/precio",[PrecioController::class,'index'])
// ->middleware('auth','verified')
// ->name('precio.get');

// Route::get("/precio/create",[PrecioController::class,'create'])
// ->middleware('auth','verified')
// ->name('precio.create');

// Route::post("/precio",[PrecioController::class,'store'])
// ->middleware('auth','verified')
// ->name('precio.store');

// Route::get("/precio/{id}",[PrecioController::class,'show'])
// ->middleware('auth','verified')
// ->name('precio.show');

// Route::put("/precio",[PrecioController::class,'update'])
// ->middleware('auth','verified')
// ->name('precio.put');

// Route::delete("/precio/destroy/{id}",[PrecioController::class,'destroy'])
// ->middleware('auth','verified')
// ->name('precio.destroy');
//-------------------------------------------------

/*
Route::get('/huespede',[HuespedeController::class,'index'])
->middleware('auth','verified')
->name('huespede.get');

Route::post('/huespede',[HuespedeController::class,'store'])
->middleware('auth','verified')
->name('huespede.store');

Route::get('/huespede/create',[HuespedeController::class,'create'])
->middleware('auth','verified')
->name('huespede.create');

Route::get('/huespede/{id}',[HuespedeController::class,'show'])
->middleware('auth','verified')
->name('huespede.show');

Route::put('/huespede',[HuespedeController::class,'update'])
->middleware('auth','verified')
->name('huespede.put');

//----------Ruta de alquiler 

Route::get("/registrohuespede/{id}",[FichaRegistroHuespeController::class,'verificaEstatusPosada']
)->middleware('auth','verified')
->name('registrohuespede.get');

Route::get("huespede/dato/{cedula}",[FichaRegistroHuespeController::class,'dataHuespede'])
->middleware('auth','verified')
->name('registrohuespedecedula.get');

Route::post("/huespedes",[FichaRegistroHuespeController::class,'store'])
->middleware('auth','verified')
->name('registrohuespede.store');

Route::get("/registrohuespedepago/{id}",[FichaRegistroHuespeController::class,'formulariopago'])
->middleware('auth','verified')
->name('registrohuespedepago.show');

Route::post("/registrohuespedepago",[FichaRegistroHuespeController::class,'storepago'])
->middleware('auth','verified')
->name('registrohuespedepago.store');

Route::get("/huespedecargoabono/{id}",[FichaRegistroHuespeController::class,'estadocta'])
->middleware('auth','verified')
->name('estadocta.show');

Route::get("/huespedecargoconsumo/{id}",[FichaRegistroHuespeController::class,'cargarConsumo'])
->middleware('auth','verified')
->name('cargoconsumo.get');

Route::post("/huespedecargoconsumo",[FichaRegistroHuespeController::class,'storeConsumo'])
->middleware('auth','verified')
->name('cargoconsumo.store');

Route::patch("/huespededardealta/{id}",[FichaRegistroHuespeController::class,'darDeAlta'])
->middleware('auth','verified')
->name('dardealta.patch');

Route::get("/huespedenotafactura/{id}",[FichaRegistroHuespeController::class,'notaFactura'])
->middleware('auth','verified')
->name('notafactura.get');
*/
//------------------Caja 

// Route::get("/cajashow",[PagoHuespedeController::class,"show"])
// ->middleware('auth','verified')
// ->name('caja.show');  

// Route::get('/libromensual',[PagoHuespedeController::class,'showInformePolicial'])
// ->middleware('auth','verified')
// ->name('libromensual.show');  

// Route::get('/libromensua//fechainicial/{fechaInicial}/fechafinal/{fechaFinal}',[PagoHuespedeController::class,'showInformePolicialRango'])
// ->middleware('auth','verified')
// ->name('libromensual.get');  


// //----------------------------

// Route::get("/cajamovimientopagos/fechainicial/{fechainicial}/fechafinal/{fechafinal}",[PagoHuespedeController::class,"movimientoPagos"])
// ->middleware('auth','verified')
// ->name('cajamovimientopagos.get');   


// Rutas para reportes
/* Route::prefix("reporte")->group(function (){
    // Recibe el nro del ticket/ que el id en la tabla de movimiento huespede
    Route::get('/ticketconsumo/{id}',[ReporteController::class,"ticketConsumo"])
    ->middleware('auth','verified')
    ->name("repo.01");

    Route::get('/estadocta/{id}',[ReporteController::class,"estadoCta"])
    ->middleware('auth','verified')
    ->name("repo.02");

    Route::get('/notafactura/{id}',[ReporteController::class,"notaFactura"])
    ->middleware('auth','verified')
    ->name("repo.03");
    
    Route::get('caja',[ReporteController::class,'movimientosPagos'])
    ->middleware('auth','verified')
    ->name("repo.04");

    Route::get("/informepolicialmensual/fechainicial/{fechainicial}/fechafinal/{fechafinal}",
    [ReporteController::class,"informepolicialmensual"])
    ->middleware('auth','verified')
    ->name('repo.05');   
}); */

//------------------------
//Route de Publicidad

// Route::get('contacto',[ContactoController::class,"show"]
// )->name("contacto.show");

// Route::get('contactopublicidad',[ContactoController::class,'index'])
// ->name('contato.index');

// Route::get("contactoCode",[ContactoController::class,'senderCode'])
// ->name('contactocode.get');

// Route::post('contactoregisterstore',[ContactoController::class,'registerContactoStore'])
// ->name('contacto.store');


//------------------
//Ensayo: Front
//require aqui huespede.php
require __DIR__.'/huespede.php';
//requirre aqui posada.php 
require __DIR__.'/posada.php';
//requirre aqui precio.php
require __DIR__.'/precio.php';
//requirre aqui contacto.php
require __DIR__.'/contacto.php';
//requirre aqui reporte.php
require __DIR__.'/reporte.php';
//require aqui pago 
require __DIR__.'/pago.php';

//  requirre aqui auth.php

require __DIR__.'/auth.php';
