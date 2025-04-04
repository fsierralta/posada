<?php
namespace App\CustomTool\Email;

use App\Mail\EmailAquiler;
use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Carbon;
use Nette\Utils\Random;
use Illuminate\Support\Facades\Mail;
use App\Mail\SenderVerifCodeEmail;
use Illuminate\Support\Facades\Log;
use App\Models\Contacto;
use App\Mail\EmailPromocion;
use PhpParser\Node\Stmt\TryCatch;
use App\Mail\ReservacionMail;

class CodeSendEmailUser{

     //Se recibe los datos del usuario 
     //Email
     //password
     //Model de User
     //Axios envia el request
     //-----------------------
     private $request;
     private $evalueIn; //para determinar si en en contacto /o user del Sistema
     public function __construct(Request $request, string $evalueIn="User" ) //Contacto
     {
        $this->request=$request;
        $this->evalueIn=$evalueIn;
     }


    public function sendVerificationCode(){
        
        info('clase',['clase'=>class_exists($this->evalueIn,false)]);
         try {

            
        
            
            $modelInstancia= new ("App\\Models\\".$this->evalueIn);
             
            $user=$modelInstancia::where("email",$this->request->email)->first();

            if(!$user){
                return response()->json(['message'=>"Usuario no registrado"],400);

            }
            //se graba el codigo en el usuario solicitante
            info("userEmail",["user"=>$user]);
            $verificacionCode=Random::generate(6);
            $user->verification_code=$verificacionCode;
            $user->verification_code_expire_at=Carbon::now()->addMinutes(5);
            $user->save();
            info("codegen",['codigo'=>$user->verification_code]);
            //----------------------------
               Mail::to($user->email)
                    ->send(new  SenderVerifCodeEmail($user->verification_code));
                return response()->json(['message'=>"Revise su correo,codigo enviado",200]);





            
         } catch (\Exception $th) {
            //throw $th;
            Log::error('error en instancia:'.$modelInstancia.":".$th->getMessage());
            return response()->json(['error:'=>$th->getMessage()]);
         }



    }

    /* 
     * Se verifica que correspodan los codigo 
     * de acceso al sistema
     */
    public function verifiCodeSender(){
        try {
            //code...
            //info("email",["email"=>$this->request->email.''.$this->request->verificationcode]);
            $modelInstancia='App\\Models\\'.$this->evalueIn;
            $user=$modelInstancia::where('email',$this->request->email)->first();
            if(!$user){
                session(["codeemail"=>"Usuario no existe"]);
                return false;

            }

            if($user->verification_code!==$this->request->verificationcode){
                session(["codeemail"=>'Codigo no concuerdan']);
                return false;
            }


            if(Carbon::parse($user->verification_code_expire_at)->isPast()){
                session(["codeemail"=>"Codigo ha expirado"]);
                return false;

            }  

            //info("finalverificacion",["email"=>$this->request->email.''.$this->request->verificationcode]);
            session(["codeemail"=>"validado codigo"]);
            return true;



        } catch (\Throwable $th) {
            //throw $th;
            session("codeemail",$th->getMessage());
            return false;

        }


    }
      
    /* 
      funcion que permite 
      notificacion de 
      alquiler de la posada 
      a la gerencia 
     params:senDataMail -> datos del alquiler 


     */
    public function sendNotificacionAlquiler($sendDataMail){
           
                   
          try {
          
                    
                $emails=['gerencia@posadaloshumacos.com',
                        "sistema@posadaloshumacos.com" ,          
                        'yeli__30@hotmail.com' ,
                        "sierralta.freddy@gmail.com"
                
               ];
               Log::info('emailsentro',['data'=>$sendDataMail]);  
                foreach($emails as $email) {
                         Log::info('emails',['data'=>$sendDataMail, 
                                              'correo'=>$email  ]);
                         try {
                            //code...
                            Mail::to($email)
                          ->send(new EmailAquiler($sendDataMail)); 

                         } catch (\Exception $th) {
                            //throw $th;
                            Log::error("Error al enviar correo a: ".$email.": ".$th->getMessage());
                         }
                                              
                         

                } ;
           
         
          } catch (\Exception $th) {
            //throw $th;
            info("emailSend",["error"=>$th->getMessage()]);
          }
                



    }

/* -----------
   se envia el correo 
   con la promocion

 */
 public function SendNotificacionPromocion($sendDataMail,$toemail){
     try {
        //code...
        Mail::to($toemail)
        ->send(new EmailPromocion($sendDataMail));

        foreach(['valcastcabudare_2@hotmail.com' ,
                 'myoptic2019@hotmail.com',
                 'gerencia@posadaloshumacos.com',
                 "sistema@posadaloshumacos.com" ,          
                 'yeli__30@hotmail.com' ,
                 ] as $email){
            Mail::to($email)
            ->send(new EmailPromocion($sendDataMail));
        }
        
        

        

     } catch (\Exception $th) {
        //throw $th;
        Log::error("Error al enviar correo a: ".$toemail.": ".$th->getMessage());
     }
   

 }
 function sendEmailReservacionToHuespede($cabezera,$reservacion){
    try {
        //code...
        $toemail=$reservacion->huespede->email;
        info("email",["emailReservacion"=>$toemail]);
        Mail::to($toemail)
       ->cc(env('MAIL_FROM_ADDRESS'))
       ->send(new ReservacionMail($reservacion,$cabezera));
        //se envia a la gerencia
    } catch (\Exception $th) {
        //throw $th;
        Log::error("Error al enviar correo a: ".$toemail.": ".$th->getMessage());
    }


}
}
