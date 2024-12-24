import InputLabel from "@/Components/InputLabel";
import MainHtml from "@/Components/MainHtml"
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Head, Link } from "@inertiajs/react"
import { useMemo } from "react";


export default function EstadoCta({auth,flash,dataEstadoCuenta}) {
    
   
    const {fichaRegistro,posada,detalleCargo,detalleAbono}=dataEstadoCuenta;
    const {huespede}=fichaRegistro
    let formatN=new Intl.NumberFormat('de-DE',{style:"decimal",
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2 }) 
   // console.log(fichaRegistro.huespede)
     const totalCargo=detalleCargo.reduce((totalItem,item)=>{
              return totalItem+parseFloat(item.totalitem)

    },0) 

    let totalAbono=detalleAbono.reduce((totalItem,item)=>
        {
           
            return totalItem+parseFloat(item.monto )
        },0)

               
   
  return (
        <Authenticated
          user={auth.user}
          header={"Estado de Cuenta"}
          
        >
        <Head title="Estado de Cuenta"    />
        <MainHtml>
            <div className="flex space-x-2">
                        <div>
                            <Link href={route("dashboard")}
                            className="bg-gray-800 text-white py-2 px-2 rounded-md hover:bg-slate-500"
                            >Regresar</Link>
                        </div>
                        <div>
                            <a href={route('repo.02',posada.id)}
                             target="_blank"
                             className="bg-blue-900 px-4 py-2 text-white rounded-lg hover:bg-slate-300"
                            >Imprimir</a>

                        </div>
          </div>
                <div className="flex space-x-2 py-4 ">
                            <div>
                                <InputLabel
                                htmlFor="posada"
                                    value={"Cabaña"}
                                />
                                <TextInput
                                    name="posada"
                                    value={posada.nombre}
                                    disabled

                                />
                             </div>
                             


                </div>  
                <div className="flex space-x-2 mt-2">
                            <div>
                             <InputLabel
                                 value={'Ficha Registro'}
                             />
                             <TextInput
                                  value={fichaRegistro.nroficha}
                                  disabled
                             
                             />
                            </div> 
                            <div className="w-full ">
                             <InputLabel
                                 value={'Huespede'}
                             />
                             <TextInput
                                  value={`${huespede.nombre} ${huespede.apellidos}`}
                                  disabled
                                  className="w-full"
                             
                             />
                            </div> 
                            <div>
                             <InputLabel
                                 value={'Cedula'}
                             />
                             <TextInput
                                  value={`${huespede.nacionalidad}${huespede.cedula}`}
                                  disabled
                             
                             />
                            </div> 

                           
                            <div>
                             <InputLabel
                                 value={'Entrada'}
                             />
                             <TextInput
                                 type="date"
                                  value={fichaRegistro.fechaEntrada}
                                  disabled
                             
                             />
                            </div> 
                            <div>
                             <InputLabel
                                 value={'Salidad'}
                             />
                             <TextInput
                                  value={fichaRegistro.fechaSalida}
                                  type="date"
                                  disabled={true}
                             
                             />
                            </div> 


                </div>
                <div className="flex space-x-2 py-2 overflow-auto h-96">
                    <div className="bg-green-300 rounded-lg w-full  h-96 overflow-auto ">
                            <h1 className="font-bold text-xl">Cargos</h1>
                            <div className="py-2">
                                    <hr/>
                            </div>
                        
                        {detalleCargo.map((item,idx)=>(
                            <li key={`carg${idx}`}  
                            >  
                                    <span>
                                        {`|Nro:${item.id}`} Fecha:<input type="date"  value={item.fecharegistro} disabled={true}
                                                                    className="rounded-lg  text-sm bg-green-300 border-none"
                                                                    />
                                        <br/>
                                        {`|${item.pvpdescripcion} |$:${item.precio} 
                                                    |NroPerso:${item.nropersonas} |Cantidad:${item.cantidad}
                                                    |Total:${item.totalitem}|
                                    `}
                                    </span>                  
                        </li>
                                


                        ))}
                        <div>
                            <hr/>
                        </div>
                        <h1 className="">
                            <span className="text-green-900 font-bold text-xl">
                                {`Total Cargos:${formatN.format(totalCargo)}`}
                                </span>
                        </h1>
                    </div>

                    <div className="bg-blue-300 rounded-lg w-full h-96 overflow-auto ">
                            <h1 className="font-bold text-xl ">Abonos</h1>
                                <div className="py-2">
                                        <hr/>
                                </div>
                        {detalleAbono.map((item,idx)=>(
                            <li key={`abn${idx}`}>
                                <span>
                                    {`|Nro:${item.id}| Fecha:`}  <input value={item.fechapago} type="date"
                                                                        className="border-none bg-blue-300"
                                                                        disabled={true} 
                                                                        />
                                    <br/>
                                    {`| Referencia:${item.referencia}|Forma:${item.fpagonombre}
                                |Observación:${item.observacion}| Monto:${item.monto}$|`}
                            </span>   
                            </li>
                        ))}

                        <div>
                            <hr/>
                        </div>
                        <h1 className="w-full block justify-end content-end">
                            <span className="text-blue-900 font-bold text-xl justify-end 
                                            w-full bock"
                                
                        >{`Total  Abonos:${formatN.format(totalAbono)}`}</span></h1>

                    </div>
            </div>

            <div>
               {totalCargo-totalAbono==0 ?(
                   <span className="bg-green-400 w-full block rounded-lg text-xl mt-2 ">
                      Saldos Encontrados 
                     
                    </span>

               ) :(
                <span className="bg-red-400 w-full block rounded-lg text-xl mt-2  ">
                    
                   Hay una Diferencia:Revises:{formatN.format(totalCargo-totalAbono)} 
                </span>
               )  } 
               
            </div>
            
       </MainHtml>


        </Authenticated>
  )
}
