<?php

namespace App\Http\Controllers;

use App\CustomTool\Email\CodeSendEmailUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SendGetCodeController extends Controller
{
    //
    public function senderCode(Request $request)
    {
        info('code', ['datacode' => $request->email]);

        try {
            // code...
            $validate = $request->validate(

                ['email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
                    'password' => ['required'],
                    'nombre',

                ]);

            $codeSendEmail = new CodeSendEmailUser($request);

            return $codeSendEmail->sendVerificationCode();

        } catch (\Exception $th) {
            // throw $th;
            Log::error('Error en sendcodeEmail'.$th->getMessage());
        }

    }
}
