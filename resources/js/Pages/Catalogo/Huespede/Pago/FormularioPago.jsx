import InputError from "@/Components/InputError"
import InputLabel from "@/Components/InputLabel"
import MainHtml from "@/Components/MainHtml"
import NavLink from "@/Components/NavLink"
import PrimaryButton from "@/Components/PrimaryButton"
import TextInput from "@/Components/TextInput"
import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Head,useForm,Link, } from "@inertiajs/react"


export default function FormularioPago({auth,flash,dataPago}) {
  
  const{posada,huespede,fpago,fichaRegistroHuespe,montoPagar}=dataPago //destructurando datapago
  const {data,setData,errors,post,processing}=useForm({
         posada_id:posada.id,
         nroficha:fichaRegistroHuespe.nroficha,
         fechaEntrada:fichaRegistroHuespe.fechaEntrada,
         fechaSalida:fichaRegistroHuespe.fechaSalida,
         formaPago_id:fpago[5].id,
         monto:parseFloat(montoPagar)===0 ?0:parseFloat(montoPagar) ,
         referencia:'',
         observacion:'',
         huespede_id:huespede.id,


  })
 
  const onsubmit=(e)=>{
    e.preventDefault()
    post(route('registrohuespedepago.store'),{
         onBefore:e=>window.confirm(`Desea enviar este pago:${data.monto}`),
         onError:(error)=>console.log("Ha Ocurrido este Error:"+error)


    })



  }
  return (
    <Authenticated
      user={auth.user}
      header={"Registro Pago"}
       
    >
        <Head title="Pago"/>
        <MainHtml>
          
          <div className="mb-2">
            <Link 
                className="bg-slate-500 rounded-lg gap-2 text-white px-4 py-2 items-center"
                href={route("dashboard")}
            >Regresar</Link>
          </div>
           <form onSubmit={onsubmit} name="frmpago">
                <div className="flex space-x-2 " >
                  <div>
                    <InputLabel  htmlFor="posada"
                          value={"Cabaña"}
                    />
                    <TextInput
                        name={'posada'}
                        defaultValue={posada.nombre}
                        disabled={true}
                    />
                   
                  
                </div>  
                <div className="w-full">
                <InputLabel  htmlFor="ficharegistro"
                            value={"Nro Ficha"}
                      />
                      <TextInput
                          name={'nroficha'}
                          defaultValue={`${fichaRegistroHuespe.nroficha}`}
                          disabled={true}
                          className="w-full"
                      />

                </div>
                <div className="w-full block" >
                    <InputLabel  htmlFor="cedula"
                            value={"cedula"}
                      />
                      <TextInput
                          name={'cedula'}
                         defaultValue={`${huespede.nacionalidad}-${huespede.cedula}`}
                          disabled={true}
                          className="w-full"
                      />
                </div>

                <div className="w-full block" >
                <InputLabel  htmlFor="huespede"
                        value={"Huespede"}
                  />
                  <TextInput
                       name={'huesde'}
                      defaultValue={`${huespede.nombre} ${huespede.apellidos}`}
                       disabled={true}
                       className="w-full"
                  />
                </div>
                


                </div>

                {/*  Se agreggo la fecha salida y entrada        */}
                <div className="flex space-x-2 mt-2 ">
                    <div>
                        <InputLabel  htmlFor="fechaEntrada"
                              value={"Fecha Entrada"}
                        />
                        <TextInput
                            name={'fechaEntrada'}
                            type="date"
                            defaultValue={fichaRegistroHuespe.fechaEntrada}
                            disabled={true}
                        />
                      
                      
                    </div>  
                    <div>
                        <InputLabel  htmlFor="fechaSalida"
                              value={"Fecha Salida"}
                        />
                        <TextInput
                            name={'fechaSalida'}
                            type="date"
                            defaultValue={fichaRegistroHuespe.fechaEntrada}
                            disabled={true}
                        />
                      
                      
                    </div>  
          

                </div>
                {/* fin div fecha entrada y pago */}
                <div className="flex  space-x-2">
                    <div className="mt-2 w-full block">
                        <InputLabel   htmlFor="formapago"
                                    value={"Forma de pago"}
                        />
                        <select
                          name="pago_id"
                          className="rounded-lg w-full"
                          value={data.formaPago_id}
                          onChange={e=>setData("formaPago_id",e.target.value)}

                        >
                          { fpago.map((item,idx)=>(
                            <option
                                key={idx}
                                value={item.id}
                            >
                              {item.nombre}

                            </option>

                          ))

                          }

                        </select>
                        <InputError message={errors.formaPago_id} className="mt-2" />

                    </div>
                    <div className="mt-2 w-full block">
                       <InputLabel   htmlFor="monto"
                           value={"Monto"}
                       />
                       <TextInput  name="monto" 
                                   value={data.monto}
                                   type="number"
                                   step="0.01"
                                   min="0.1"
                                   max="999999"
                                   className="w-full"
                                   onChange={e=>setData("monto",e.target.value)}
                                   required

                            
                       />
                        
                        <InputError message={data.monto===0 ? errors.monto='no  hay pago pendiente ':errors.monto} className="mt-2" />
                       
                       
                       

                    </div>
                    <div className="mt-2 w-full block">
                       <InputLabel  htmlFor="referencia"
                                    value={'Referencia'}  
                       />
                       <TextInput   name='referencia' 
                                    value={data.referencia}
                                    required
                                    className="w-full"
                                    onChange={e=>setData('referencia',e.target.value)}
                        />
                         <InputError message={errors.referencia} className="mt-2" />

                    </div>
                    <div className="mt-2 w-full ">
                       <InputLabel  htmlFor="observacion"
                                    value={'Observación'}  
                       />
                       <TextInput   name='observacion' 
                                    value={data.observacion}
                                    required
                                    className="w-full"
                                    onChange={e=>setData('observacion',e.target.value)}
                        />
                         <InputError message={errors.observacion} className="mt-2" />

                    </div>

               </div>     
               <div className="mt-4">
                  <PrimaryButton
                    type="submit"
                    disabled={processing}
                  >Enviar</PrimaryButton>
                
                
                </div> 

          </form>


        </MainHtml>



    </Authenticated>

  )
}
