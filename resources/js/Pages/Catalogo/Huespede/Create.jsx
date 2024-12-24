import React, { useEffect, useState } from 'react'
 import Authenticated from '@/Layouts/AuthenticatedLayout'
import MainHtml from '@/Components/MainHtml'
import { Head, router, useForm } from '@inertiajs/react'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import Modal from '@/Components/Modal'


export default function Create({auth,flash}) {
   const[show,setShow]=useState(true)
   
    const {data,setData,processing,errors,reset,post}=useForm({
        nombre:"",
        apellidos:"",
        cedula:'',
        nacimiento:'',
        nacionalidad:'V',
        pasaporte:'',
        procedencia:'BARQUISIMETO',
        destino:'HUMOCARO',
        vehiculo:'',
        placa:'',
        direccion:'',
        telefono:'',
        celular:'',
        email:'',
        profesion:'',
        estadocivil:"S"
         })
       
    const submit=(e)=>{
      console.log('enviando')
        e.preventDefault()
      
      post(route('huespede.store'),{
          onBefore:()=>confirm('Desea enviar') ,
          onError:(error)=>console.log(error) 
      })
      
      
       


    }   
    const onBack=(e) =>{
        e.preventDefault()
       router.get(route('huespede.get'))


    } 
    const onClose=()=>setShow(false);
  return (
    <Authenticated
      user={auth.user}
      header={"Create"}
    >
    <MainHtml>
          <Head title='Create'/>
          
           <div className='mb-2'>
           <PrimaryButton className='bg-blue-600 '
                      onClick={(e)=>onBack(e)}            
                          >Regresar</PrimaryButton>
           </div>
           <form onSubmit={submit}>
                  <div className='flex space-x-2'>
                                <div className='block w-full'>
                                <InputLabel
                                    htmlFor="nombre"
                                    value="Nombre"
                                />
                                    <TextInput
                                    id="nombre"
                                    className="mt-1 block w-full"
                                    value={data.nombre}
                                    autoComplete="nombre"
                                    isFocused={true}
                                    onChange={(e)=>setData("nombre",e.target.value) }
                                    required

                                    />
                                    <InputError message={errors.nombre} className="mt-2" />
                                </div>
                                <div className='w-full'>
                                    <InputLabel
                                    htmlFor="apellidos"
                                    value={"Apellidos"}
                                    required
                                    
                                    />
                                    <TextInput
                                    id="apellidos"
                                    className="mt-1 block w-full"
                                    value={data.apellidos}
                                    autoComplete="apellidos"
                                    onChange={(e)=>setData("apellidos",e.target.value) }
                                    required

                                    />
                                    <InputError message={errors.apellidos} className="mt-2" />



                                </div>
                                <div className='w-full'>
                                    <InputLabel
                                    htmlFor="nacimiento"
                                    value={"Fecha Nacimiento"}
                                    required
                                    
                                    />
                                    <TextInput
                                    id="nacimiento"
                                    className="mt-1 block w-full"
                                    value={data.nacimiento}
                                    autoComplete="nacimiento"
                                    type="date"
                                    onChange={(e)=>setData("nacimiento",e.target.value) }
                                    required

                                    />
                                    <InputError message={errors.nacimiento} className="mt-2" />



                                </div>
                                
                   </div>

                   <div className='flex gap-2 mt-2 '>
                          <div className='w-full    '>
                                    <InputLabel
                                    htmlFor="nacionalidad"
                                    value={'Nacionalidad'}
                                    className='mt-1'
                                    />
                                    <select className='rounded-lg block w-full'
                                       value={data.nacionalidad}
                                       onChange={(e)=>setData("nacionalidad",e.target.value)}
                                    >
                                        <option value="V">Venezolano</option>
                                        <option value="E">Extranjero</option> 

                                    </select>
                          </div>
                          <div className='w-full'>
                                <InputLabel
                                    htmlFor="cedula"
                                    value={"Cedula"}
                                    required
                                    className=''
                                  
                                    />
                                    <TextInput
                                    id="cedula"
                                    type="number"
                                    className="mt-1 block w-full"
                                    
                                    value={data.cedula}
                                    onChange={(e)=>setData("cedula",e.target.value) }
                                    required

                                    />
                                    <InputError message={errors.cedula} className="mt-2" />
                         </div>
                         <div className='w-full'>
                                <InputLabel
                                    htmlFor="pasaporte"
                                    value={"Pasaporte"}
                                    required
                                    className=''
                                    />
                                    
                                    <TextInput
                                    id="pasaporte"
                                    type="number"
                                     className="mt-1 block w-full"
                                    value={data.pasaporte}
                                    onChange={(e)=>setData("pasaporte",e.target.value) }
                                    

                                    />
                                    <InputError message={errors.pasaporte} className="mt-2" />
                         </div>

                         <div className='w-full' >
                                <InputLabel
                                    htmlFor="estadocivil"
                                    value={"Estado Civil"}
                                    required
                                    className='mt-1'
                                    
                                    
                                    />
                                    <select className='w-full rounded-md'
                                      value={data.estadocivil}
                                      name='estadocivil'
                                      onChange={e=>setData('estadocivil',e.target.value)}
                                       
                                    >
                                       <option value="S">Soltero</option>
                                       <option value="C">Casado</option>
                                       <option value="D">Divorciado</option>
                                       <option value="V">Viudo</option>

                                    </select>
                                    
                                    <InputError message={errors.estadocivil} className="mt-2" />
                         </div>


                   </div>
                   <div className='mt-2'>
                   <InputLabel
                                    htmlFor="profesion"
                                    value={"Profesion"}
                                    
                                    className=''
                                    />
                                    <TextInput
                                    id="profesion"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.profesion}
                                    onChange={(e)=>setData("profesion",e.target.value) }
                                    

                                    />
                                    <InputError message={errors.profesion} className="mt-2" />
                   </div>

                   <div className='flex space-x-2 mt-2'>
                       <div className='w-full'>
                       <InputLabel
                                    htmlFor="procencia"
                                    value={"Procedencia"}
                                    required
                                    className=''
                                    />
                                    <TextInput
                                    id="procedencia"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.procedencia}
                                    onChange={(e)=>setData("procedencia",e.target.value) }
                                    

                                    />
                                    <InputError message={errors.procedencia} className="mt-2" />

                       </div>
                       <div className='w-full'>
                       <InputLabel
                                    htmlFor="destino"
                                    value={"Destino"}
                                    required
                                    className=''
                                    />
                                    <TextInput
                                    id="destino"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.destino}
                                    onChange={(e)=>setData("destino",e.target.value) }
                                    

                                    />
                                    <InputError message={errors.pasaporte} className="mt-2" />
                       </div>

                   </div>
                   <div className='flex space-x-2  mt-2'>
                      <div className='w-full'>
                      <InputLabel
                                    htmlFor="telefono"
                                    value={"Telefono Local"}
                                    
                                    className=''
                                    />
                                    <TextInput
                                    id="telefono"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.telefono}
                                    onChange={(e)=>setData("telefono",e.target.value) }
                                    

                                    />
                                    <InputError message={errors.telefono} className="mt-2" />

                      </div>
                      <div className='w-full'>
                     <InputLabel
                                    htmlFor="celular"
                                    value={"Telefono Celular "}
                                    
                                    className=''
                                    />
                                    <TextInput
                                    id="celular"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.celular}
                                    onChange={(e)=>setData("celular",e.target.value) }
                                    

                                    />
                                    <InputError message={errors.celular} className="mt-2" />


                     </div>
                     <div className='w-full'>
                     <InputLabel
                                    htmlFor="email"
                                    value={"Email"}
                                    
                                    className=''
                                    />
                                    <TextInput
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    value={data.email}
                                    onChange={(e)=>setData("email",e.target.value) }
                                    required
                                    

                                    />
                                    <InputError message={errors.email} className="mt-2" />


                     </div>
                   </div>
                   <div className='mt-2'>
                   <InputLabel
                                    htmlFor="direccion"
                                    value={"Dirección"}
                                    
                                    className=''
                                    />
                                    <TextInput
                                    id="direccion"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.direccion}
                                    onChange={(e)=>setData("direccion",e.target.value) }
                                    

                                    />
                                    <InputError message={errors.direccion} className="mt-2" />
                   </div>

                   <div className='flex space-x-2 mt-2'>
                       <div className='w-full'>
                       <InputLabel
                                    htmlFor="vehiculo"
                                    value={"Vehiculo"}
                                    
                                    className=''
                                    />
                                    <TextInput
                                    id="vehiculo"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.vehiculo}
                                    onChange={(e)=>setData("vehiculo",e.target.value) }
                                    

                                    />
                                    <InputError message={errors.vehiculo} className="mt-2" />

                       </div>
                       <div className='w-full'>
                       <InputLabel
                                    htmlFor="placa"
                                    value={"Placa"}
                                    
                                    className=''
                                    />
                                    <TextInput
                                    id="placa"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.placa}
                                    onChange={(e)=>setData("placa",e.target.value) }
                                    

                                    />
                                    <InputError message={errors.placa} className="mt-2" />



                       </div>


                   </div>



                    <div className='mt-4'>
                        <PrimaryButton
                          disabled={processing}
                        >Enviar</PrimaryButton>
                        

                    </div>



           </form>
    </MainHtml>   


    </Authenticated>
  )
}
