import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Mensaje from "@/Components/Mensaje";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import axios from "axios";
import { useState,useEffect } from "react";


export default function Contacto({flash}) {
    const [mostrar,setMostrarMessage]=useState(false)
    const [mensaje,setMensaje]=useState('')
    const [errorsAxios,setErrorsAxios]=useState([{}])

    const {data,setData,processing,post,errors}=useForm({
        'nombre':'',
        'apellidos':'',
        'nacionalidad':"V",
        'cedula':'',
        'nacimiento':'',
        'celular':'',
        'email':'',
        'direccion':'Barquisimeto-Lara',
        'verificationcode':''



    })

    //-------
     const onSubmitFrm=(e)=>{
        e.preventDefault();
        console.log('onsubmit')
        post(route('contacto.store',data));

     

     }

     //--------
     const  getCodigo= (e)=>{
        e.preventDefault();
        setErrorsAxios([{}])
        
        axios.get(route('contactocode.get',data))
        
        .then(response=>{
            console.log(response)
            setMensaje(response.data.message)
            setMostrarMessage(true)


        })
        .catch(error=>{
            //console.log(error.response.data)
            const {errors:arrayError}=error.response.data
           console.log(arrayError)
            if (Object.keys(arrayError)){
                setErrorsAxios(Object.values(arrayError))
              
                for(const [key,value] of Object.entries(arrayError)){
                    console.log(`key:${key} value:${value[0]}`)
                    errors[key]=value[0]

                }
              
            }
            

            

        })
        

     }

    //-----------
     useEffect(()=>{
        const mostrar=()=>{
          setMensaje(flash.message)
          setMostrarMessage(true)
          flash.message=null
        }
         flash?.message && mostrar()      
 },[flash?.message])


 


    
  return (
    <GuestLayout>
        <Head title="Registro de contacto"/>
         <h1 className="text-green-500 font-bold text-2xl text-center">Contacto</h1>
                    
           
            
        
        <div className="w-full h-6 my-6">
                  { mostrar ?(
                  <Mensaje
                     mensaje={mensaje}
                     setMostrar={setMostrarMessage}
                     setMensaje={setMensaje}
                   />
                  ): (<h1 className="bg-green-500 rounded-lg  text-2xl block w-full my-4">Solicite codigo de registro</h1>)
                  }
       </div>  
        <form onSubmit={onSubmitFrm}>
                <div className="mt-4">
                    <div className="flex gap-2">
                            <div>
                                    <InputLabel
                                    htmlFor='nombre'
                                    value={'Nombres'}

                                    />
                                    <TextInput
                                    name='nombre'
                                    className="w-full"
                                    value={data.nombre}
                                    required
                                    onChange={e=>setData('nombre',e.target.value)}
                                    />
                                    <InputError message={errors.nombre}/>
                        </div>  
                            <div >
                                    <InputLabel
                                    htmlFor='apellidos'
                                    value={'Apellidos'}
                                    />
                                    <TextInput
                                    name='apellidos'
                                    className="w-full"
                                    value={data.apellidos} 
                                    onChange={e=>setData('apellidos',e.target.value)}
                                    required
                                    />
                                    <InputError message={errors.apellidos}/>
                            </div>  
                    </div> 
                    <div className="flex gap-2 mt-2  ">
                 {/* 
                        <div>
                                    <InputLabel
                                    htmlFor='nacionalidad'
                                    value={'Nacionalidad'}

                                    />
                                    <select
                                    name='nacionalidad'
                                    className="w-full rounded-md"
                                    value={data.nacionalidad}
                                    onChange={e=>setData('nacionalidad',e.target.value)}
                                    >
                                        <option value="V">Venezolano</option>
                                        <option value="E">Extranjero</option>
                                    </select>

                            </div>
 */}
{/* 
                            <div className="w-full">
                                    <InputLabel
                                    htmlFor='cedula'
                                    value={'Nro Identificación'}

                                    />
                                    <TextInput
                                    name='cedula'
                                    className="w-full "
                                    value={data.cedula}
                                    onChange={e=>setData('cedula',e.target.value)}
                                    required
                                    />
                                       <InputError message={errors.cedula}/>
                            </div>
  */}

                    </div>  
 {/* 
  */}
                    <div className="mt-2 w-full">
                        <InputLabel
                        htmlFor="celular"
                        value={'Celular Nro'}
                        />
                        <TextInput
                        name='celular'
                        className="w-full"
                        value={data.celular}
                        onChange={e=>setData('celular',e.target.value)}
                        required

                        />
                        <InputError message={errors.celular}/>
                    </div>
                    <div className="w-full mt-2">
                        <InputLabel
                            htmlFor="email"
                            value="Email"
                        />
                        <TextInput
                        className="w-full"
                        name='email'
                        type="email"
                        value={data.email}
                        onChange={e=>setData('email',e.target.value)}
                        required 


                        />
                         <InputError message={errors.email}/>


                    </div>
                  {/*   <div className="w-full">
                        <InputLabel
                            htmlFor="direccion"
                            value={'Direccion'}
                        />
                        <TextInput
                        name="direccion"
                        value={data.direccion}
                        onChange={e=>setData('direccion',e.target.value)}
                        className="w-full"
                        />
                          <InputError message={errors.direccion}/>

                    </div> */}
                    <div>
                        <InputLabel 
                            htmlFor="codigo"
                            value={'Codigo'}
                        />
                        <TextInput
                        name='verificationcode'
                        value={data.verificationcode}
                        onChange={e=>setData('verificationcode',e.target.value)}
                        required
                        placeholder={'Ingrese el codigo enviado a su correo'}
                        className="w-full"
                        
                        
                        />
                    </div>
                    <div className="flex  gap-2 justify-center mt-4 border border-collapse border-black rounded-lg py-2 ">
                        <PrimaryButton
                        name="btnEnviar"
                        type="submit"
                        disabled={processing}
                        >Enviar</PrimaryButton>

                        <SecondaryButton
                          name='btnCodigo'
                          onClick={getCodigo}
                        className="bg-green-300 hover:bg-orange-400"
                        >
                        Solicitar Codigo 
                        </SecondaryButton>

                        <a
                            href="https://www.instagram.com/myopticc/"
                            target="_blank"
                           className="bg-red-400 rounded-md px-2 py-2 hover:bg-orange-400"
                        >MY OPTIC</a>
                    </div>

                </div>
        </form>
    </GuestLayout>
   
  )
}
