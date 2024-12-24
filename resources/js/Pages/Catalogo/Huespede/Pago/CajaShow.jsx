import InputLabel from "@/Components/InputLabel"
import MainHtml from "@/Components/MainHtml"
import Pagination from "@/Components/Pagination"
import PrimaryButton from "@/Components/PrimaryButton"
import TextInput from "@/Components/TextInput"
import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Head, useForm, usePage,Link} from "@inertiajs/react"
import { fechaFormato_dmy } from "@/Pages/Helper/help"
import { useEffect, useState } from "react"


export default function CajaShow({fechaInicial,flash,fechaFinal,auth,pagos=null,totalGeneral=0}) {
    
    
   
   const [showData,setShowData]=useState(false)
    const {data,setData,errors,processing,get}=useForm({
        fechaInicial,
        fechaFinal,
        pagos,
        

    })
    let formatN=new Intl.NumberFormat('de-DE',{style:"decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 }) 
    

     //-------------------------------------
     const totalAbonoReduce=(data)=>{
           
            const total=data.reduce((total,item)=>total+ parseFloat(item.monto),0)  
             return total
     }
        
    //----------------------------------
    const onSubmit=(e)=>{
        e.preventDefault()
      
        try {
             
                    get(route("cajamovimientopagos.get",{
                    fechainicial:data.fechaInicial,
                    fechafinal:data.fechaFinal
                          }))
             
            
            
        } catch (error) {
            console.log('Error al recibir la data',error)
        }
            
     }

     //---------------
     
    useEffect(()=>{
       if(data.pagos?.data.length>0){
         setShowData(true)
        } 

 

    },[data.pagos])

  return (
    <Authenticated
     user={auth.user}
     header={"Caja "}
    >  
      <Head title="Caja"/>
         
          <MainHtml>
          <div className="mb-2">
            <Link 
                className="bg-slate-500 rounded-lg gap-2 text-white px-4 py-2 items-center"
                href={route("dashboard")}
            >Regresar</Link>
          </div>
           <form name="frmsubmit" 
                 onSubmit={onSubmit}
           >
                    <div className="flex space-x-4">
            
                            <div>
                                <InputLabel htmlFor="fechaInicial"
                                            value="Fecha Inicial"
                                />
                                <TextInput
                                type="date"
                                value={data.fechaInicial}
                                name="fechaInicial"
                                onChange={(e)=>setData("fechaInicial",e.target.value)}
                                required
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="fechaInicial"
                                            value="Fecha Final"
                                />
                                <TextInput
                                    type="date"
                                    value={data.fechaFinal}
                                    name="fechaFinal"
                                    onChange={(e)=>setData("fechaFinal",e.target.value)}
                                    required
                                />
                            </div>

                    </div>
                    <div>
                        {showData && (
                            <>
                            <table className="table-auto w-full border border-green-400 py-4 mt-4">
                                <thead className="border-collapse ">
                                    <tr>
                                        <th  className="border border-green-200 py-2 " >Item</th>
                                        <th    className="border border-green-200 py-2 ">Forma Pago</th>
                                        <th  className="border border-green-200 py-2 ">Fecha</th>
                                        <th  className="border border-green-200 py-2 ">Monto</th>
                                    </tr> 
                                </thead>
                                <tbody>
                                    {data.pagos!=null ? (
                                                       data.pagos?.data.map((item,idx)=>
                                                        <tr key={idx}
                                                            className="border-collapse "
                                                        >
                                                            <td  className="border border-green-200 py-2 text-center" >{item.id}</td>
                                                            <td  className="border border-green-200 py-2 text-center" > {item.hnombre}. {item.hapellidos}- {item.pnombre}/{item.nombre}</td>
                                                            <td  className="border border-green-200 py-2 text-center" >{` ${fechaFormato_dmy(item.fechapago)}`}</td>
                                                            <td  className="border border-green-200 py-2 text-center" >{formatN.format(item.monto)}</td>
                                                       </tr>
                                                       )) : (
                                                        <div>
                                                                <tr>
                                                                    <td colSpan="4">No hay Data</td>
                                                                </tr>
                                                        </div>  
                                                       )
                                    }
                                </tbody>
                                <tfoot>
                                    {showData &&

                                    <tr>
                                        <td colSpan={4} >
                                            <div className="justify-end flex w-full px-2 ">
                                                <div>
                                                    <p className="font-bold  ">Sub Total pagina:{formatN.format(totalAbonoReduce(data.pagos.data))}</p>  
                                                    <p className="font-bold  ">Total Caja:{formatN.format(parseFloat(totalGeneral))}</p>  
                                                    </div>   
                                             </div>       


                                        </td>
                                    </tr>}
                                </tfoot>
                            </table>
                            <div className="py-4">
                                <Pagination links={data.pagos.links}/>
                            </div>
                            </> 

                        )}
                        {!showData &&(
                             <div className="py-2 ">
                                <p className="font-bold ">No hay data.En el rango de fecha.haga la consulta</p>
                             </div>   

                        )}
                    </div>
                    <div className="py-4">
                        <PrimaryButton
                        disabled={processing}
                         
                        >
                            Consultar
                        </PrimaryButton>
                        <a href={route('repo.04',{fechainicial:data.fechaInicial,
                                                  fechafinal:data.fechaFinal
                        })}
                        className="bg-green-400 py-2 rounded-md ml-2 px-2 hover:bg-slate-400 "
                        >Imprimir Reporte</a>

                        

                    </div>
                      

            </form> 

          </MainHtml>

    </Authenticated>
    
  )
}

