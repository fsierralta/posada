import InputError from "@/Components/InputError"
import InputLabel from "@/Components/InputLabel"
import MainHtml from "@/Components/MainHtml"
import Mensaje from "@/Components/Mensaje"
import PrimaryButton from "@/Components/PrimaryButton"
import TextInput from "@/Components/TextInput"
import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Head, Link, useForm } from "@inertiajs/react"
import axios from "axios"
import { useEffect, useState } from "react"


function Consumo({auth,flash,dataPago}) {
  
  const {posada,huespede,fichaRegistroH,precios}=dataPago 
  
  const [mostrar,setMostrar]=useState(false)
  const [mensaje,setMensaje]=useState("")
  const [urlTicket,setUrlTicket]=useState({
        id:0 ,
        url:"repo.01",
        activate:true,
  })
  const {data,setData,processing,pos,errors,post,reset}=useForm({
      
       precio_id:0,
       descripcion:"",
       nrodias:1 , // para efecto del consumo es uno se trabaja cantidad y precio / total
       cantidad:0,
       montoTotal:0,
       nroficha:fichaRegistroH.nroficha,
       posada_id:posada.id,
       huespede_id:huespede.id,
       precio:0
       
       

  })


  //---------------------------
  const onSubmitHuespede=async(e)=>{
    e.preventDefault()
    if(data.precio_id===0 || data.montoTotal===0 ||
       data.descripcion.length===0  
    ){
       setMensaje("Debe indicar el precio/Descripcion/montoTotal" )
       setMostrar(true)
       return


    }
    /* post(route('cargoconsumo.store'),{
        onBefore:()=>window.confirm("Desea enviar el consumo"),
        onError:(error)=>console.log(error),
        onSuccess:(id)=>console.log(id),

    }) */
     let ok=window.confirm("Desea Enviar?")
      if(!ok){
        return 
      } 

    console.log(data)
    let response=await axios.post(route('cargoconsumo.store',data));
 
    try {
        if(response.status===200){
           console.log(response)  
           let urlprevio=urlTicket
             urlprevio.id=response.data.id;
             urlprevio.activate=true
            setUrlTicket(urlprevio);
            console.log(urlprevio) 
            setMensaje("Ticket listo para imprimir ")
            setMostrar(true);
            reset('cantidad','montoTotal','precio','precio_id')


            //-------------------------------------------------------------------
            /* let rresponseticke=await axios.get(route("repo.01",response.data.id),{
                responseType:"blob"
            })
            const url=window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download','mi_archivo.pdf');
            document.body.appendChild(link);
            link.click();
            //console.log(rresponseticke)

            if(rresponseticke.status===200){
                console.log(rresponseticke.statusText);
            }else(
                console.log(rresponseticke)
            ) */


        }
    } catch (error) {
        console.log(error)
    }
  }

  //---------------------------------------
  const calcularTotal=()=>{
        console.log(data)
        const objprecioEncontrado=precios.find((item)=>{
        
        if (item.id===parseInt(data.precio_id)){
            
            return item
        }else {
            console.log(item)
        }

        })

        if(objprecioEncontrado?.precio>0) {
            let total=data.nrodias*data.cantidad*data.precio;
            setData("montoTotal",total) 
         
            
        }else{
            setMensaje("Precio no encotrando")
            setMostrar(true);
        }

    }
  useEffect(()=>{
    
    (data.cantidad>0 ) && calcularTotal() 
     
  },[data.cantidad,data.precio])

  useEffect(()=>{
     const objePrecio=(precio_id)=>{
                let itemprecio= precios.find(item=>item.id===precio_id)
                console.log(itemprecio)
                const previodata=data
                previodata.descripcion=itemprecio?.descripcion
                previodata.precio=itemprecio?.precio
                setData( previodata)
                
                itemprecio?.id>0 ? setData('precio',parseInt(itemprecio.precio)):setData("precio",0)
           }
     (data.precio_id>=0) &&objePrecio(data.precio_id);
    
  },[data.precio_id])

  return (
    <Authenticated
       user={auth.user}
       header={'Consumos Cliente'}
    >
        <MainHtml> 
           <Head title={"ConsumoCliente"} />
           <div>
               { mostrar &&
                <Mensaje mensaje={mensaje}
                         setMostrar={setMostrar} 
                         setMensaje={setMensaje}
                />}
                         
             </div>
        <div className="mb-2">
               <Link href={route("dashboard")}
                  
                 className="bg-gray-900 text-white rounded-md space-y-2 hover:bg-slate-600
                             px-2 py-2
                 "

               >Regresar</Link>

               { urlTicket.id>0 &&( 
                    <a href={urlTicket.id===0 ?"#":route(urlTicket.url,urlTicket.id)}
                        disabled={urlTicket.activate}
                        target="_blank"
                        className="bg-blue-900 ml-2 text-white rounded-md space-y-2 hover:bg-slate-600
                                    px-2 py-2
                        "

                    >ticket</a>
                )}

             </div>
        <form onSubmit={onSubmitHuespede}>
                  <div>
                     <InputLabel
                       htmlFor="posadanombre"                       
                         value={"Nombre Posada"}
                        
                     />
                     <TextInput
                        type="text"
                        defaultValue={posada.nombre}
                        name='posadanombre'
                        disabled={true}
                     />
                   </div>
                   <div className=" flex grid-cols-3 space-x-2 mt-2">
                    <div>
                   <InputLabel
                       htmlFor="cedula"                       
                         value={"Cedula"}
                        
                     />
                     <TextInput
                        type="text"
                        defaultValue={`${huespede.nacionalidad}${huespede.cedula}`}
                        name='cedula'
                        className="font-bold"
                        disabled
                     />
                    
                     
                     </div>
                     <div className="block w-full" >
                            <InputLabel
                            htmlFor="nroficha"                       
                                value={"Nro Ficha"}
                                
                            />
                            <TextInput
                                type="text"
                                defaultValue={`${fichaRegistroH.nroficha}`}
                                name='nroficha'
                                className="w-full font-bold"
                                disabled={true}
                                
                                
                            />
                           

                     </div>
                     
                                        
                     <div className="block w-full" >
                            <InputLabel
                            htmlFor="nombreHuespedes"                       
                                value={"Nombre Huespede"}
                                
                            />
                            <TextInput
                                type="text"
                                defaultValue={`${huespede.nombre}${huespede.apellidos}`}
                                name='nombrehuespedes'
                                className="w-full font-bold"
                                disabled={true}
                                
                                
                            />
                           

                     </div>

                   </div>
                   <div className="mt-2 flex   space-x-2  ">
                            <div className="">
                                    <InputLabel
                                        htmlFor="fechaEntrada"
                                        value={"Fecha Entrada"}

                                    
                                    />
                                    <TextInput
                                        type="date"
                                        required
                                        name="fechaEntrada"
                                       defaultValue={fichaRegistroH.fechaEntrada}
                                       disabled
                                      
                                    
                                    />
                                       
                            </div>

                        
                            <div className="">
                                    <InputLabel
                                            htmlFor="fechaSalida"
                                            value={"Fecha Salida"}
                                            

                                        
                                        />
                                        <TextInput
                                            type="date"
                                            required
                                            name="fechaSalida"
                                            defaultValue={`${fichaRegistroH.fechaSalida}`}
                                            disabled
                                            
                                        
                                        />
                                        
                            </div>

                   </div>
                   <div className="mt-2 flex  space-x-2">
                       <div className="w-full">
                            <InputLabel
                                value={'Asignar Consumo '}

                            />
                            <select className="w-full mt-2 rounded-lg "
                                name="precio_id"
                                value={data.precio_id}
                                onChange={(e)=>setData("precio_id",parseInt(e.target.value))}
                            >
                                <option key={0}
                                 value={0}
                                >{`|id|Descripcion|Precio $|`}</option>
                                {precios.map((item,idx)=>(
                                        <option value={item.id}
                                        key={item.id}
                                        >{`|${item.id}|${item.descripcion}|${item.precio}$|`}</option>

                                ))
                                }


                            </select>
                            <InputError message={errors.precio_id} className="mt-2" />

                       </div>  
                    </div>
                     <div className="w-full ">
                     <InputLabel
                                    htmlFor="descripcion" 
                                    value={"Descripcion"}
                                />
                                <TextInput
                                 className="mt-2 w-full"
                                 type="text"
                                 required
                                 name="descripcion"
                                 value={data.descripcion}
                                 onChange={(e)=>setData("descripcion",e.target.value)}

                                />
                                <InputError message={errors.descripcion} className="mt-2" />


                     </div>
                    <div className="flex mt-2 space-x-2">   
                    <div>
                                <InputLabel
                                    htmlFor="precio" 
                                    value={"precio"}
                                />
                                <TextInput
                                 className="mt-2"
                                 type="number"
                                 required
                                 step="0.01"
                                 min="0.1"
                                 name="precio"
                                 value={data.precio}
                                 onChange={(e)=>setData('precio',e.target.value)
                                             

                                                
                                }
                                 
                                />
                                   <InputError message={errors.precio} className="mt-2" />
                       </div>
                       <div>
                                <InputLabel
                                    htmlFor="cantidad" 
                                    value={"Cantidad"}
                                />
                                <TextInput
                                 className="mt-2"
                                 type="number"
                                 step="1"
                                 required
                                 min="1"
                                 name="cantidad"
                                 value={data.cantidad}
                                 onChange={(e)=>setData('cantidad',e.target.value)
                                             

                                                
                                }
                                 
                                />
                                   <InputError message={errors.cantidad} className="mt-2" />
                       </div>
                       <div>
                                <InputLabel
                                    htmlFor="montoTotal" 
                                    value={"Total"}
                                />
                                <TextInput
                                 className="mt-2"
                                 type="text"
                                 step="1"
                                 required
                                 name="montoTotal"
                                 disabled={true}
                                 value={data.montoTotal}
                                 
                                />
                                   <InputError message={errors.montoTotal} className="mt-2" />
                       </div>
                      
                   </div>
                   <div className="mt-2">
                     <PrimaryButton
                      type="submit"
                      name="btnSumit"
                      disabled={processing}
                     >Enviar</PrimaryButton>
                   </div>




             </form>

        </MainHtml>
    </Authenticated>
  )}

export default Consumo
