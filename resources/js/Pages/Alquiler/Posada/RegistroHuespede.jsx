import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import MainHtml from "@/Components/MainHtml";
import Mensaje from "@/Components/Mensaje";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm,Link,router } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import {toISOStringDate}   from "@/Pages/Helper/help"
//------ -----------------------------------------
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


export default function RegistroHuespede({auth,flash,dataRegistro}) {
  const {data,setData,post,processing,errors}=useForm({
    ...dataRegistro,
    precio_id:0,
    nrodias:0,
    nropersonas:0,
    montoTotal:0,
    descripcion:"Hospedaje para",
    reservacion_id:0

     
})
  // console.log("entrada data",data)
  const [nombreApellido,setNombreApellidos]=useState("");
  const [mostrar,setMostrar]=useState(false)
  const [mensaje,setMensaje]=useState("")
  const [cedula,setCedula]=useState("")
  const [acompanante,setAcompanante]=useState([])
  //
 const {reservaciones}=dataRegistro
  //console.log(reservaciones)
  const [tieneReservacion,setTieneReservacion]=useState("N")

//manejo de operaciones del acompante

 const findItem=(cedula)=>{
      const id=acompanante.findIndex( item=>item.cedula===cedula)
      return id;
 }  
  


 
  const buscarAcom=async(e)=>{
    e.preventDefault()
    const cedulaGet=e.target.value
    
     if(data.nropersonas<2){
          setMensaje("Debe indicar el nro de personas, mayor a uno, para agrear acompañante")
          setMostrar(true)
          return 
     }

    if(acompanante.length==data.nropersonas-1){
      setMensaje("el registro de acompañantes esta completado")
      setMostrar(true)
      return 
     }

     const id=findItem(cedulaGet)

      
     if(id>-1){
      setMensaje("el registro de acompañantes ya existe")
      setMostrar(true)
      return 

     }
  
    try {
    
        let response=await axios.get(route('registrohuespedecedula.get',cedulaGet))
        if(response.status===200){
      
        const dataHuespede={cedula:response.data.dataHuespede.nacionalidad.concat(response.data.dataHuespede.cedula),
                           nombre:`${response.data.dataHuespede.nombre}  ${response.data.dataHuespede.apellidos}`
                         }
       setAcompanante([...acompanante,dataHuespede])
     
     }else{
      setMensaje("cedula no existe ")
      setMostrar(true)

     }
    }
    catch(error){
       // console.log(error.response.data.dataHuespede) 
        setMensaje(error.response.data.dataHuespede)
        setMostrar(true)
     

    } 
    

  }

  //---------------------------------------------------

   const delAcompanante=(getcedula)=>{
  
     let dataAcom=acompanante
    
     dataAcom=dataAcom.splice(findItem(getcedula),0)
     if(dataAcom.length===0){
        setAcompanante([])
     }else{
       setAcompanante(dataAcom)
     }

   //console.log(dataAcom)                    

}

//-----------------------------------fin de operaciones de acompante 



  
  

    const getDataHuespede=async(e)=>{
         e.preventDefault()
         try {
             let response=await axios.get(route('registrohuespedecedula.get',cedula.toUpperCase()))
             if (response.status===200){
             // console.log(response)
              const {nombre,apellidos}=response.data.dataHuespede
              setMensaje("Registro Encontrado")
              setMostrar(true)
              setNombreApellidos(nombre.concat(" ", apellidos));
              setData('cedula',cedula);
           }
           //console.log(response)
            
        } catch (error) {
          console.log(error.response.data.dataHuespede) 
          setMensaje(error.response.data.dataHuespede)
          setMostrar(true)
           
        }
      }

     //-------------------------------
      const onSubmitHuespede=(e)=>{
          e.preventDefault()
          //Puede pasar que salga el mismo dia / por varias razones 
         /*  if(data.nrodias!==nroDiasEstadia()) {
            setMensaje("Los dias de estadias , no concuerdan con la fecha de salida")
            setMostrar(true)
            return true //si se va el mismo dia 
             
     
     
         } */
         if(data.montoTotal===0){
          setMensaje("Debe calcular el monto de la la estadia del huespede")
          setMostrar(true)
          return

         }
         try {
           setData({...data,cedula});
        post(route("registrohuespede.store"),
                          {data,acompanante},
                                                     {
                onBefore:()=>window.confirm("Desea Enviar"),
                onError:(error)=>console.log("eror:",error)
            })
         } catch (error) {
            console.log
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
   

     const onChangeReservacion=(e)=>{
            e.preventDefault()
            const id=parseInt(parseInt(e.target.value))
            console.log(id)
            const reserva=reservaciones.filter(item=> item.id===id)
            if (Array.isArray(reserva) && reserva.length>0){
                 const cedula=reserva[0].huespede.nacionalidad.concat(reserva[0].huespede.cedula)
                const nombreApellido=reserva[0].huespede.nombre.concat(reserva[0].huespede.apellidos)
              // const fechaEntrada= toISOStringDate(reserva[0].fecha_entrada,1) //el segun parametro es para que nos reste anos 
                const fechaSalida= toISOStringDate(reserva[0].fecha_salida,1)
                const montoTotal=reserva[0].monto
                const precio_id=reserva[0].formapago_id
                const nropersonas=reserva[0].nro_personas
                const reservacion_id=id
                setCedula(cedula)
                setNombreApellidos(nombreApellido)
                setData({...data,
                          fechaSalida,
                           cedula,
                           montoTotal,
                           precio_id,
                           nropersonas,
                           reservacion_id
                           
                          }
                        )
       }   
        
        }

    
        //--------useEffect 
     
     useEffect(()=>{
           
      data.fechaSalida!=null && nroDiasEstadia()


   },[data.fechaSalida])



   

   useEffect(()=>{
    console.log("id",data.reservacion_id)
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
                             px-2 py-2" >
                              Regresar
                 </Link>
          </div>
        <main>
            <Tabs>
                <TabList className='flex flex-wrap gap-4'>
                    <Tab>Registro Huespedes</Tab>
                    <Tab>Registro Acompañante</Tab>
                </TabList>

                <TabPanel className='border p-2'>
                    <form onSubmit={onSubmitHuespede} className="mt-4">
                        {/* Agrupa los campos principales en grid responsivo */}
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="flex-1 min-w-[180px]">
                                <InputLabel value={"Nombre Posada"} />
                                <TextInput
                                    type="text"
                                    value={data.posada.nombre}
                                    name='posadanombre'
                                    disabled={true}
                                />
                            </div>
                            <div className="flex-1 min-w-[220px]">
                                <InputLabel value={'Reservaciones'} />
                                <select
                                    name="reservaciones"
                                    defaultValue={data.reservacion_id}
                                    className="rounded-md border-green-500 w-full"
                                    onChange={onChangeReservacion}
                                >
                                    <option value={"0"}>Selecciones una reservacion</option>
                                    {reservaciones.length > 0 ? (
                                        reservaciones.map(item => (
                                            <option
                                                key={item.id}
                                                value={item.id}
                                            >{`Id:${item.id}|Nro:${item.nro_reservacion}|${item.huespede.nombre} ${item.huespede.apellidos} |Cedula:${item.huespede.cedula}|Monto:${item.monto}`}</option>
                                        ))
                                    ) : <option>No hay reservaciones este día</option>}
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
                            <div>
                                <InputLabel htmlFor="cedula" value={"Cedula"} />
                                <TextInput
                                    type="text"
                                    value={cedula}
                                    name='cedula'
                                    onChange={e => setCedula(e.target.value.toUpperCase())}
                                    className="font-bold w-full"
                                    placeholder={"cedula comienza con V o E"}
                                    required
                                />
                                <InputError message={errors.cedula} className="mt-2" />
                            </div>
                            <div className="flex items-end">
                                <div className="w-full">
                                    <InputLabel value={"Buscar "} />
                                    <PrimaryButton
                                        name="btnBuscar"
                                        value={data.cedula}
                                        onClick={getDataHuespede}
                                        className="w-full"
                                    >Cedula</PrimaryButton>
                                </div>
                            </div>
                            <div>
                                <InputLabel htmlFor="nombrehuespedes" value={"Nombre Huespede"} />
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-6">
                            <div>
                                <InputLabel value={"Fecha Entrada"} />
                                <TextInput
                                    type="date"
                                    required
                                    name="fechaEntrada"
                                    value={data.fechaEntrada}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setData("fechaEntrada", e.target.value)}
                                    disabled
                                    className="w-full"
                                />
                                <InputError message={errors.fechaEntrada} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel value={"Fecha Salida"} />
                                <TextInput
                                    type="date"
                                    required
                                    name="fechaSalida"
                                    value={data.fechaSalida}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setData("fechaSalida", e.target.value)}
                                    className="w-full"
                                />
                                <InputError message={errors.fechaSalida} className="mt-2" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                            <div>
                                <InputLabel value={'Asignar Cargo Inicial '} />
                                <select className="w-full mt-2 rounded-lg"
                                    name="precio_id"
                                    value={data.precio_id}
                                    onChange={(e) => setData("precio_id", e.target.value)}
                                >
                                    <option>{`|id|Descripcion|Precio $|`}</option>
                                    {data.precios.map((item, idx) => (
                                        <option value={item.id} key={item.id}>
                                            {`|${item.id}|${item.descripcion}|${item.precio}$|`}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.precio_id} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="descripcion" value={"Descripcion"} />
                                <TextInput
                                    className="mt-2 w-full"
                                    type="text"
                                    required
                                    name="descripcion"
                                    value={data.descripcion}
                                    onChange={(e) => setData("descripcion", e.target.value)}
                                />
                                <InputError message={errors.descripcion} className="mt-2" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-2">
                            <div>
                                <InputLabel htmlFor="nrodias" value={"Dias de Estadias"} />
                                <TextInput
                                    className="mt-2 w-full"
                                    type="number"
                                    step="1"
                                    required
                                    min="1"
                                    name="nrodias"
                                    value={data.nrodias}
                                    disabled
                                    onChange={(e) => setData("nrodias", e.target.value)}
                                />
                                <InputError message={errors.nrodias} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="nropersonas" value={"Nro de Personas"} />
                                <TextInput
                                    className="mt-2 w-full"
                                    type="number"
                                    step="1"
                                    required
                                    min="1"
                                    name="nropersonas"
                                    value={data.nropersonas}
                                    onChange={(e => setData("nropersonas", e.target.value))}
                                />
                                <InputError message={errors.nropersonas} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="montoTotal" value={"Total"} />
                                <TextInput
                                    className="mt-2 w-full"
                                    type="text"
                                    step="1"
                                    required
                                    name="montoTotal"
                                    disabled={true}
                                    value={data.montoTotal}
                                />
                                <InputError message={errors.montoTotal} className="mt-2" />
                            </div>
                            <div className="flex items-end">
                                <PrimaryButton
                                    className="mt-2 py-3 w-full"
                                    onClick={calcularTotal}
                                    name="btnCalcular"
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
                </TabPanel>

                <TabPanel className='border p-2'>
                    <div className="flex flex-col md:flex-row gap-4 mt-6">
                        <div className="flex-1">
                            <InputLabel htmlFor="cedula" value="Cedula" />
                            <TextInput
                                name="cedula"
                                value={cedula}
                                onChange={e => setCedula(e.target.value.toUpperCase())}
                                className="w-full"
                            />
                        </div>
                        <div className="flex-1 flex items-end">
                            <div className="w-full">
                                <InputLabel value={"Buscar "} />
                                <PrimaryButton
                                    name="btnBuscar"
                                    value={cedula}
                                    onClick={buscarAcom}
                                    className="py-3 w-full"
                                >Cedula</PrimaryButton>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto mt-4">
                        <table className="border-collapse border border-slate-400 w-full min-w-[600px]">
                            <thead>
                                <tr>
                                    <th className="border border-slate-400 bg-green-400">Item</th>
                                    <th className="border border-slate-400 bg-green-400">Cedula</th>
                                    <th className="border border-slate-400 bg-green-400">Nombre y Apellidos</th>
                                    <th className="border border-slate-400 bg-green-400">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {acompanante.length > 0 && (acompanante.map((item_a, idx_a) => (
                                    <tr key={`a_${idx_a}`}>
                                        <td className="border border-slate-400">{idx_a}</td>
                                        <td className="border border-slate-400">{item_a.cedula} </td>
                                        <td className="border border-slate-400">{item_a.nombre} </td>
                                        <td className="border border-slate-400 text-center">
                                            <PrimaryButton
                                                name="btnBuscarAcom"
                                                value={cedula}
                                                onClick={e => delAcompanante(e.target.value)}
                                            >Eliminar</PrimaryButton>
                                        </td>
                                    </tr>
                                )))}
                            </tbody>
                        </table>
                    </div>
                </TabPanel>
            </Tabs>
        </main>
         

        </MainHtml>
    </Authenticated>
  )
}
