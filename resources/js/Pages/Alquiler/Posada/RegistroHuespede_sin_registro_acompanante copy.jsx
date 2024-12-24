import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import MainHtml from "@/Components/MainHtml";
import Mensaje from "@/Components/Mensaje";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm,Link } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";


export default function RegistroHuespede({auth,flash,dataRegistro}) {
  const [nombreApellido,setNombreApellidos]=useState("");
  const [mostrar,setMostrar]=useState(false)
  const [mensaje,setMensaje]=useState("")
   const {data,setData,post,processing,errors}=useForm({
        ...dataRegistro,
      
        precio_id:0,
        nrodias:0,
        nropersonas:0,
        montoTotal:0,
        descripcion:"Hospedaje para"

         
    })
    const getDataHuespede=async(e)=>{
         e.preventDefault()
         try {
             let response=await axios.get(route('registrohuespedecedula.get',data.cedula.toUpperCase()))
             if (response.status===200){
              console.log(response)
              const {nombre,apellidos}=response.data.dataHuespede
              setMensaje("Registro Encontrado")
              setMostrar(true)
              setNombreApellidos(nombre.concat(" ", apellidos));
           }
           console.log(response)
            
        } catch (error) {
          console.log(error.response.data.dataHuespede) 
          setMensaje(error.response.data.dataHuespede)
          setMostrar(true)
           
        }
      }
     //-------------------------------
      const onSubmitHuespede=(e)=>{
          e.preventDefault()
          if(data.nrodias!==nroDiasEstadia()) {
            setMensaje("Los dias de estadias , no concuerdan con la fecha de salida")
            setMostrar(true)
            return
             
     
     
         }
         if(data.montoTotal===0){
          setMensaje("Debe calcular el monto de la la estadia del huespede")
          setMostrar(true)
          return

         }
         try {
           
            post(route("registrohuespede.store",data),{
                onBefore:()=>window.confirm("Desea Enviar"),
                onError:(error)=>console.log(error)
            })
         } catch (error) {
            
         }


      }

   
     //------------------------------------
     const calcularTotal=(e)=>{
                e.preventDefault()
                const precios=data.precios;

                const objprecioEncontrado=precios.find((item)=>{
                    
                    if (item.id===parseInt(data.precio_id)){
                        console.log(`encontrado:${item.precio}`)
                        return item
                    }else {
                     //console.log(item)  
                    }

                })

                if(objprecioEncontrado?.precio>0) {
                    let total=data.nrodias*data.nropersonas*objprecioEncontrado.precio;
                    setData("montoTotal",total) 
                }else{
                    setMensaje("Precio no encotrando")
                    setMostrar(true);
                }
        }

  const nroDiasEstadia=()=>{
          const diasMilisegundos=new Date(data.fechaSalida)- new Date(data.fechaEntrada)
        // console.log(diasMilisegundos)
          const nroDias=Math.round(diasMilisegundos/(1000*60*60*24))
          if(nroDias===0){
          setData('nrodias',nroDias+1)
          }else(
           nroDias<0 ? setData('nrodias',0):  setData('nrodias',nroDias)
          )
          return nroDias;



           

      }
//calculando dias de estadia 
     useEffect(()=>{
           
             data.fechaSalida!=null &&nroDiasEstadia()


     },[data.fechaSalida])
     
   useEffect(()=>{
        const mostrar=()=>{
           if (flash?.message!==null){
               setMensaje(flash.message)
               setMostrar(true)
           }

        }

     flash?.message && mostrar()

   },[flash])
  return (
    <Authenticated
        user={auth.user}
        header={"Registro Huespede"}

    >
        <Head title={"Registro huespede"}/>
        <MainHtml>
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
             </div>
             <form onSubmit={onSubmitHuespede}>
                  <div>
                     <InputLabel
                       htmlFor="posadanombre"                       
                         value={"Nombre Posada"}
                        
                     />
                     <TextInput
                        type="text"
                        value={data.posada.nombre}
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
                        value={data.cedula}
                        name='cedula'
                        onChange={(e)=>setData("cedula",e.target.value.toUpperCase())}
                        className="font-bold"
                        placeholder={"cedula comienza con V o E"}
                        required
                     />
                     <InputError message={errors.cedula} className="mt-2" />
                     
                     </div>
                     <div>
                     <InputLabel
                       htmlFor=""                       
                         value={"Buscar "}
                        
                     />
                     <PrimaryButton
                      name="btnBuscar"
                      value={data.cedula}
                      onClick={getDataHuespede}
                     
                     >Cedula</PrimaryButton>
                     </div>  
                     
                     
                     <div className="block w-full" >
                            <InputLabel
                            htmlFor="nombreHuespedes"                       
                                value={"Nombre Huespede"}
                                
                            />
                            <TextInput
                                type="text"
                                value={`${nombreApellido}`}
                                name='nombrehuespedes'
                                className="w-full font-bold"
                                disabled={true}
                                
                                
                            />
                            <InputError message={errors.nombrehuespedes} className="mt-2" />

                     </div>


                   



                   </div>
                   <div className="mt-2 grid-cols-2 flex   space-x-2  ">
                            <div className="w-full">
                                    <InputLabel
                                        htmlFor="fechaEntrada"
                                        value={"Fecha Entrada"}

                                    
                                    />
                                    <TextInput
                                        type="date"
                                        required
                                        name="fechaEntrada"
                                        value={data.fechaEntrada}
                                        min={new Date().toISOString().split('T')[0]}
                                        onChange={(e)=>setData("fechaEntrada",e.target.value)}
                                        disabled
                                    
                                    />
                                       <InputError message={errors.fechaEntrada} className="mt-2" />
                            </div>

                        
                            <div className="w-full">
                                    <InputLabel
                                            htmlFor="fechaSalida"
                                            value={"Fecha Salida"}

                                        
                                        />
                                        <TextInput
                                            type="date"
                                            required
                                            name="fechaSalida"
                                            value={data.fechaSalida}
                                            min={new Date().toISOString().split('T')[0]}
                                            onChange={(e)=>setData("fechaSalida",e.target.value)}
                                        
                                        />
                                        <InputError message={errors.fechaSalida} className="mt-2" />
                            </div>

                   </div>
                   <div className="mt-2 flex  space-x-2">
                       <div className="w-full">
                            <InputLabel
                                value={'Asignar Cargo Inicial '}

                            />
                            <select className="w-full mt-2 rounded-lg "
                                name="precio_id"
                                value={data.precio_id}
                                onChange={(e)=>setData("precio_id",e.target.value)}
                            >
                                <option>{`|id|Descripcion|Precio $|`}</option>
                                {data.precios.map((item,idx)=>(
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
                    <div className="flex mt-2 space-x-2 sm:flex-wrap md:flex-wrap">   
                       <div>
                                <InputLabel
                                    htmlFor="nrodias" 
                                    value={"Dias de Estadias"}
                                />
                                <TextInput
                                 className="mt-2"
                                 type="number"
                                 step="1"
                                 required
                                 min="1"
                                 name="nrodias"
                                 value={data.nrodias}
                                 disabled
                                 onChange={(e)=>setData("nrodias",e.target.value)}

                                />
                                <InputError message={errors.nrodias} className="mt-2" />
                       </div>
                       <div>
                                <InputLabel
                                    htmlFor="nropersonas" 
                                    value={"Nro de Personas"}
                                />
                                <TextInput
                                 className="mt-2"
                                 type="number"
                                 step="1"
                                 required
                                 min="1"
                                 name="nropersonas"
                                 value={data.nropersonas}
                                 onChange={(e=>setData("nropersonas",e.target.value))}
                                 
                                />
                                   <InputError message={errors.nropersonas} className="mt-2" />
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
                       <div>
                          <InputLabel
                            htmlFor="btnCalcular"
                            value="Calcular"
                          />

                          <PrimaryButton
                            className="mt-2 py-3"
                            onClick={calcularTotal}
                          >Calcular</PrimaryButton>
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
  )
}
