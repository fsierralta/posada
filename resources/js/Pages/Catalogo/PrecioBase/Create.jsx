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
    const {data,setData,processing,errors,reset,post}=useForm({
        precio:0,
        descripcion:"",
        tipo:"C",
      })
         
      const submit=(e)=>{
        console.log('enviando')
          e.preventDefault()
        
        post(route('precio.store',data),{
            onBefore:()=>confirm('Desea enviar') ,
            onError:(error)=>console.log(error) 
        })
        
        
         
  
  
      }   
      const onBack=(e) =>{
          e.preventDefault()
         router.get(route('precio.get'))
  
  
      } 
      

  return (
    <Authenticated
    user={auth.user}
    header={"Create"}
  >
  <MainHtml>
        <Head title='PrecioCreate'/>
        
         <div className='mb-2'>
         <PrimaryButton className='bg-blue-600 '
                    onClick={(e)=>onBack(e)}            
                        >Regresar</PrimaryButton>
         </div>
         <form onSubmit={submit}>
                  <div>
                     <InputLabel
                       htmlFor="precio"
                       value="Precio $"
                     />
                      <TextInput
                        id="precio"
                         className="mt-1 block w-full"
                        value={data.precio}
                        autoComplete="precio"
                        isFocused={true}
                        type="number"
                        min="1"
                        max="9999"
                        step="0.01"
                        onChange={(e)=>setData("precio",e.target.value) }
                        required

                      />
                       <InputError message={errors.precio} className="mt-2" />
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
