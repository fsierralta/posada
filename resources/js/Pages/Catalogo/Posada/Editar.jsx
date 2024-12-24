import React, { useEffect, useState } from 'react'
 import Authenticated from '@/Layouts/AuthenticatedLayout'
import MainHtml from '@/Components/MainHtml'
import { Head, router, useForm } from '@inertiajs/react'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import Modal from '@/Components/Modal'


export default function Create({auth,editData}) {
   const[show,setShow]=useState(true)
   
    const {data,setData,processing,errors,reset,put}=useForm({
           nombre:editData.nombre,
           capacidad:editData.capacidad,
           descripcion:editData.descripcion,
           id:editData.id
         })
    
    const submit=(e)=>{
      console.log('enviando')
        e.preventDefault()
      
     router.put(route('posada.put'),data,{
          onBefore:()=>window.confirm("Desea Enviar"),
          onError:(error)=>console.log(error) 
      })
      
      
       


    }   
    const onBack=(e) =>{
        e.preventDefault()
       router.get(route('posada.get'))


    } 
    const onClose=()=>setShow(false);
  return (
    <Authenticated
      user={auth.user}
      header={"Editar"}
    >
    <MainHtml>
          <Head title='Editar'/>
          
           <div className='mb-2'>
           <PrimaryButton className='bg-blue-600 '
                      onClick={(e)=>onBack(e)}            
                          >Regresar</PrimaryButton>
           </div>
           <form onSubmit={submit}>
           <div>
                       <InputLabel
                         htmlFor="id"
                         value="id"
                       />
                        <TextInput
                          id="Id"
                           className="mt-1 block w-full"
                          value={data.id}
                          
                          isFocused={false}
                          disabled

                        />
                         <InputError message={errors.nombre} className="mt-2" />
                     </div>
                    <div className='mt-2'>
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
                     <div>
                         <InputLabel
                           htmlFor="descripcion"
                           value={"Descripción"}
                           required
                           className='mt-2'
                          />
                           <TextInput
                          id="descripcion"
                          className="mt-1 block w-full"
                          value={data.descripcion}
                          autoComplete="descripcion"
                          onChange={(e)=>setData("descripcion",e.target.value) }
                          required

                        />
                         <InputError message={errors.descripcion} className="mt-2" />



                     </div>
                     <div>
                     <InputLabel
                           htmlFor="capacidad"
                           value={"Capacidad"}
                           required
                           className='mt-2'
                          />
                           <TextInput
                          id="capacidad"
                          type="number"
                          min={1}
                          max={100}
                          className="mt-1 block w-full"
                          value={data.capacidad}
                           onChange={(e)=>setData("capacidad",e.target.value) }
                          required

                        />
                         <InputError message={errors.capacidad} className="mt-2" />

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
