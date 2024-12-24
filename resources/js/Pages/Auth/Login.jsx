import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import Mensaje from '@/Components/Mensaje';
import { useState,useEffect } from 'react';



export default function Login({ status,flash, canResetPassword }) {
    const [mostrar,setMostrarMessage]=useState(false)
    const [mensaje,setMensaje]=useState('')
    
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
        verificationcode:""
    });
    
    
    
    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password','verificationcode'),
        });
    };
    const getCode=async (e)=>{
        e.preventDefault()
      let  response=await axios.get(route('codeverification.get',data))
        if(response.status===200){
            setMensaje(response.data.message)
            setMostrarMessage(true)

        }else{
            setMensaje(response.data.message)
            setMostrarMessage(true)
        }


      

    }

    useEffect(()=>{
           const mostrar=()=>{
             setMensaje(flash.message)
             setMostrarMessage(true)
             flash.message=null
           }
            flash?.message && mostrar()      
    },[flash.message])
    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <div className="w-full h-6 my-6">
                  { mostrar ?(
                  <Mensaje
                     mensaje={mensaje}
                     setMostrar={setMostrarMessage}
                     setMensaje={setMensaje}
                   />
                  ): (<h1 className="bg-green-500 rounded-lg  text-2xl block w-full my-4">Solicite su codigo de acceso</h1>)
                  }
            </div>  

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="verificationcode" value="Codigo" />

                    <TextInput
                        id="verificationcode"
                        type="text"
                        name="verificationcode"
                        value={data.verificationcode}
                        className="mt-1 block w-full"
                         placeholder={"Escribir codigo solicitado"}
                        onChange={(e) => setData('verificationcode', e.target.value)}
                    />

                    <InputError message={errors.verificationcode} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>


                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Olvido  password?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>

                    <PrimaryButton className='ms-4 bg-green-400'
                      name="btncode"
                      value="getcode"
                      disabled={processing} 
                      onClick={getCode}
                    >
                       Codigo
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
