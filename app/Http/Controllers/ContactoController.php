<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\CustomTool\Email\CodeSendEmailUser;
use App\Models\Contacto;
use App\Models\ContactoRegistrado;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Rules\FechaNacimientoRule;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;



class ContactoController extends Controller
{

   public function index(){
      
      return Inertia::render('Publicidad/Publicidad');   
   }
   
    public function show (Request $request){
    
     
    
      try {
         //code...
         return Inertia::render('Publicidad/Contacto');   
      } catch (\Exception $th){
         info('error:'.$th->getMessage());

      }
      


    }
    public function senderCode(Request $request){
      
        
           //code...
         
           $validate=$request->validate(
             [ "email"=>['required','string','lowercase', 'email', 'max:255'],
               'nombre'=>['required'],
               'apellidos'=>['required'],
               'nacionalidad'=>['required','in:V,E'],
               'cedula'=>['required'],
               'nacimiento'=>['required','date',new FechaNacimientoRule],
               'celular'=>['required'],
               'direccion'=>['required']
               
       

               
               
     
             ]) ;
             info('validate',["validate"=>$validate]);
            try{    

             $contactoExist=Contacto::where('email',$request->email)->first();
            
             if($contactoExist==null){
                $contactoExist=Contacto::create([
                     'email'=>$request->email,
                     'created_at'=>now(),
                     'updated_at'=>now(),



                ]);
                info('contactoNull',['contacto'=>$contactoExist]);
             }
             info('contacto',['contacto'=>$contactoExist->id]);
             $contactoRegistrado=DB::table('contacto_registrados')
                                 ->where('contacto_id',"=",$contactoExist->id)
                                 ->get(); //se puede utilizar first()
              info('contactoRegistrao',['data'=>$contactoRegistrado->count()])   ;                
              if($contactoRegistrado->count()>0)  {                
                       return response()->json(['message'=>'Ya usted esta registrado'],200)  ;
               }
             


            
            $codeSendEmail=new CodeSendEmailUser($request,"Contacto");
           return  $codeSendEmail->sendVerificationCode();
     
         } catch (\Exception $th) {
           //throw $th;
           Log::error('Error en sendcodeEmail'.$th->getMessage());
           return response()->json($th->getMessage(),500);
         }
 
 
         
        
 
 
     }
    //
    public function registerContactoStore (Request $request ):RedirectResponse{
      //  info('storeContacto',["data"=>$request]);
        $validate=$request->validate(
            [ "email"=>['required','string','lowercase', 'email', 'max:255'],
              'nombre'=>['required'],
              'apellidos'=>['required'],
              'nacionalidad'=>['required','in:V,E'],
              'cedula'=>['required'],
              'nacimiento'=>['required','date',new FechaNacimientoRule],
              'celular'=>['required'],
              'direccion'=>['required'],
              'verificationcode'=>['required']
              
      

              
              
    
            ]) ;
         try {
            //code...
             $codeSendEmailUser=new CodeSendEmailUser($request,'Contacto');
             $passcode=$codeSendEmailUser->verifiCodeSender();
             info("passcode",["code"=>$passcode ]);
             if($passcode){
                $contacto=Contacto::where('email',$request->email)->first();
                $contacto->email_verified_at=Carbon::now();
                $contacto->save();
                $contactoRegistrado=ContactoRegistrado::create([
                    "nombre"=>$request->nombre,
                    'apellidos'=>$request->apellidos,
                    'nacionalidad'=>$request->nacionalidad,
                    'cedula'=>$request->cedula,
                    'nacimiento'=>$request->nacimiento,
                    'celular'=>$request->celular,
                    'direccion'=>$request->direccion,
                    'contacto_id'=>$contacto->id



                ]);
                $codeSendEmailUser->SendNotificacionPromocion($contactoRegistrado,$contacto->email);
                return back()->with("message","Felicitaciones usted se ha registrado, revise su correo");





             }else{
                return back()->with("message",session('codeemail'));
             }
             

            
         } catch (\Exception $th) {
            //throw $th;
            Log::error('Ha ocurrido un error en store Contacto:'.$th->getMessage());
         }   


      return redirect()->route('/') ;



    }
}
