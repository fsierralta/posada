import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import MainHtml from '@/Components/MainHtml';
import { useEffect, useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import Mensaje from '@/Components/Mensaje';
//import CajaShow from './Catalogo/Huespede/Pago/CajaShow';
import { fechaFormato_dmy } from './Helper/help';

export default function Dashboard({ auth,flash,dataPosada,huespedesRegistrados }) {
  const [selectPosada,setSelectPosada]=useState(0)
  const [show,setshow]=useState(false)
  const [enviar,setEnviar]=useState(false)
  const [mostrar,setMostrarMessage]=useState(false)
  const [mensaje,setMensaje]=useState('')
  //console.log(huespedesRegistrados)
  const onClose=(e)=>{
      let onSumit=e.target.value 
      setEnviar(onSumit)
      setshow(false)

  }
  /* 
    Funcion para determinar si la posada esta selecciona
    @param id -> posada 
   */
  const estatusPosada=(posada_id)=>{
       const posada=dataPosada.find((item,id)=>{
            if (item.id===posada_id){
                return item
            }
         
       })
      return posada.estatus    


  }
   
   const seleccionada=(id)=>{
      
       return id===selectPosada ? 'border-collapse border-green-400 shadow-black bg-blue-100 cursor-pointer' :
       'border-collapse border-blue-400 shadow-black bg-green-100  cursor-pointer'
     
   }
   const onSelectPosada=(id)=>{
       setSelectPosada(id)
       seleccionada(id)
       onHoverMouseCabana(id)
       
   }

   const onHoverMouseCabana=(id)=>{
       if(estatusPosada(id)==="O")  { 
         const huespede=huespedesRegistrados.find((item)=> item.posada_id==id )
         if(huespede){
            //console.log(`huespede encontrado:${huespede}`)
            flash.message=`Huespede :${huespede.nombre} Entrada:${fechaFormato_dmy(huespede.fechaEntrada)} Salida:${fechaFormato_dmy(huespede.fechaSalida)}`
            setMostrarMessage(true)
           
         }

       }
     

   }
    const urlImg=(estatus)=>{
       return  estatus==="D" ? "/imagenes/circulo_verde.jpg" :"/imagenes/circulo_rojo.jpg"

    }
    
    const alquilarPosada=(e)=>{
        e.preventDefault();
        if(selectPosada && estatusPosada(selectPosada)==="D") {
            router.get(route("registrohuespede.get",selectPosada));
        }else{
          flash.message="Cabaña ocupada.. no se puede alquilar"
           setMostrarMessage(true)
        }
    }  

    const registrarPago=(e)=>{
        e.preventDefault();
       if(selectPosada && estatusPosada(selectPosada)==="O") {
        selectPosada && router.get(route("registrohuespedepago.show",selectPosada));
       }else{
        flash.message="Cabaña Desocupada.. no se puede registrar pago"
        setMostrarMessage(true)

       }

        

    }

   //----------------------- 
    const estadoCta=(e)=>{
        e.preventDefault();
        if(selectPosada && estatusPosada(selectPosada)==="O") {
            selectPosada && router.get(route("estadocta.show",selectPosada));
        }else{
             flash.message="Cabaña Desocupada.. no se puede emitir estado cta"
             setMostrarMessage(true)
        }  

    }
  //----------------------------
   const registrarConsumo=(e)=>{
     e.preventDefault()
     if(selectPosada && estatusPosada(selectPosada)==="O") { 
        selectPosada && router.get(route('cargoconsumo.get',selectPosada));
     }else{
        flash.message="Cabaña Desocupada.. no se puede registrar consumo"
        setMostrarMessage(true)

     }  


   }
//----------------------------------
   const darDeAlta=(e)=>{
        e.preventDefault()
        if(selectPosada && estatusPosada(selectPosada)==="O") { 
            selectPosada && router.get(route('notafactura.get',selectPosada))
        
        }else{
            flash.message="Cabaña Desocupada.. no se puede dar de alta"
            setMostrarMessage(true)

        }  
     }
   //---------------------------------------
   const CajaShow=()=>{
    router.get(route("caja.show"))
    
 }

    //-----------------------------------------
    useEffect(()=>{
        
      if( flash?.message){
       // console.log(flash?.message)
        setMostrarMessage(true);
      
      } 

    },[flash])
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <MainHtml> 
                <div className="w-full h-6 my-6">
                  { mostrar ?(
                  <Mensaje
                     mensaje={flash.message}
                     setMostrar={setMostrarMessage}
                     setMensaje={setMensaje}
                   />
                  ): (<h1 className="bg-green-500 rounded-lg  text-2xl block w-full my-4">Seleccione una Operación</h1>)
                  }
                </div>  
                  {show &&
                  <Modal show={show}
                                 onClose={onClose}
                           >
                      <div className='space-x-2'>
                          <div className='w-full'> 
                                <span className='font-bold text-xl text-center block w-full bg-green-300'>Desea </span>
                          </div>
                          <div className='flex justify-center space-x-2 py-6' >
                            <div>
                                <PrimaryButton
                            name="enviar"
                            value={true}
                            onClick={onClose}
                                >Enviar</PrimaryButton>
                            </div>
                            <div>
                                <SecondaryButton
                                name="cancelar"
                                value={false}
                                onClick={onClose}
                                >Cancelar</SecondaryButton>
                            </div>
                         </div>   
                     </div>
                  </Modal>}

                       
                        <div className=' justify-center mx-auto
                                         flex flex-wrap 
                                         gap-2 py-2 
                                         sm:mb-14 
                                         rounded-lg my-3 space-x-2
                                         md:bg-slate-300
                                         sm:bg-white'>
                            
                            <PrimaryButton  className='bg-green-400 '
                                    id="btnAlquilar"
                                    name="btnAlquilar"
                                    onClick={alquilarPosada}
                            >Alquilar</PrimaryButton>


                            <PrimaryButton className='bg-green-500 '
                            id="btnPago"
                                    name="btnPago"
                                    onClick={registrarPago}
                                    >
                                            Registrar Pago
                              </PrimaryButton>


                             <PrimaryButton 
                                className='bg-green-600 '
                                onClick={registrarConsumo}
                                name="btnConsumo"
                            >Cargar un consumo</PrimaryButton>
                            <PrimaryButton
                                className='bg-green-700'
                                name="btnEstadoCta"
                                id="btnEstadoCta"
                                onClick={estadoCta}
                            >Estado Cta</PrimaryButton>
                            <PrimaryButton
                                className='bg-green-800'
                            >Cambiar de Cabaña</PrimaryButton>
                             <PrimaryButton
                                className='bg-green-800'
                            >F. Salida</PrimaryButton>

                            <PrimaryButton
                                className='bg-green-900'
                                name={"btnDarDeAlta"}
                                onClick={darDeAlta}
                            > Dar de Alta </PrimaryButton>
                            <PrimaryButton
                                className='bg-green-400'
                                name={"btnCaja"}
                                onClick={CajaShow}
                            > Caja </PrimaryButton>
                           
                        </div> 
                  
                {dataPosada.length>0 ?(
                    <div className='grid md:grid-cols-3 gap-4 sm:grid sm:grid-cols-1   '>
                        {dataPosada.map((item,idx)=>(
                             <div className={seleccionada(item.id)}
                                  key={item.id}
                                  onClick={()=>onSelectPosada(item.id)


                                  }
                                  
                              >
                               <div >
                                        <div>{ (<img src={urlImg(item.estatus)} alt="posada"
                                                     width={"20"}
                                                      height={"20"}
                                                 />)
                                              }
                                    
                                        </div>
                                         <div>
                                                <img src="/imagenes/logo.png" alt="posada"
                                                    className='bg-green-50 object-fill rounded-lg'
                                                    width={"100"}
                                                    height={"100"}
                                                />
                                          </div>
                                    
                                          <div className='font-bold text-center text-amber-800 text-lg '>{`${item.nombre}`}

                                          </div>
                                         <div>
                                         <div className='text-center font-bold'><span>{`Capacidad:${item.capacidad}`}</span>
                                         </div>
                                         <div className='text-center font-bold '><span>{item.descripcion}</span>
                                        </div>  
                                </div>
                               </div>
                                
                                

                            </div>
                        ))}

                    </div>
                    ) :(<p>sin data</p>)

                }


            </MainHtml>
        </AuthenticatedLayout>
    );
}
