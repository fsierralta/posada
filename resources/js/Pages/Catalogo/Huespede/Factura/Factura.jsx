import DatoHuespedes from "@/Components/DatoHuespedes"
import MainHtml from "@/Components/MainHtml"
import Modal from "@/Components/Modal"
import PrimaryButton from "@/Components/PrimaryButton"
import SecondaryButton from "@/Components/SecondaryButton"
import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Head,Link} from "@inertiajs/react"
import {useForm } from "@inertiajs/react"
import { useState } from "react"

function Factura({auth,flash,datahuespede}) {
  const [show,setShow]=useState(false)
  const {posada,huespede}=datahuespede.ficharegistro
  const {ficharegistro}=datahuespede
  const{data,setData,patch,processing}=useForm({
    id:posada.id
  })
  const darDeAlta=(e)=>{
      e.preventDefault()
      patch(route("dardealta.patch",posada.id),{
        onError:(error)=>console.log(error),
        onSuccess:()=>oncloseModal()

      })     
  
  }
  const oncloseModal=()=>{
       setShow(false);
  }

  return (
    <Authenticated
       user={auth.user}
       header={'Nota de Factura'}
    >
        <Head title="NotaFactura"/>
    <MainHtml>
      <div className="flex  space-x-2 ">
              <div className="mb-2">
                <Link 
                    className="bg-slate-500 rounded-lg gap-2 text-white px-4 py-2 items-center"
                    href={route("dashboard")}
                >Regresar</Link>
             </div>
             <div>
                <a href={route('repo.03',posada.id)} target="_blank"
                className="bg-green-500 rounded-lg gap-2 text-white px-4 py-2 items-center"
                >Imprimir Nota factura</a>
              </div>
     </div>
       
             {show && (<Modal 
                         show={show}
                         onClose={oncloseModal}
                     >
                      <form onSubmit={darDeAlta}>
                         <div>
                                <p className="text-red-600 text-xl font-bold text-center py-4">
                                  Debe haber impreso la Nota de factura, Asegurese de haber la imprimido?</p>
                               <div className="flex px-2 py-4 space-x-4 justify-center">
                                    <div>
                                        <PrimaryButton
                                            name="btndarDeAlta"
                                            onClick={oncloseModal}
                                            >Cancelar </PrimaryButton>
                                    </div>
                                    <div>
                                        <SecondaryButton
                                                name="btndarDeAlta"
                                                disabled={processing}
                                                type="submit"
                                                >Dar de Alta 
                                        </SecondaryButton>
                                    </div>
                              </div>    
                         </div>   
                      </form>     

                      
              </Modal>)}

      
          <DatoHuespedes
              posada={posada}
              huespede={huespede}
              fichaRegistroH={ficharegistro}
          />

          <div className="flex mt-4">
           <div>
                    <PrimaryButton
                        name="btndarDeAlta"
                        onClick={()=>setShow(true)}
                    >Dar de alta</PrimaryButton>
           </div>
     </div>  




    </MainHtml>


    </Authenticated>
  )
}

export default Factura
