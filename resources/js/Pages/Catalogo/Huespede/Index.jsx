
import MainHtml from "@/Components/MainHtml"
import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Head, Link, router, usePage } from "@inertiajs/react"
import Pagination from "@/Components/Pagination"
import PrimaryButton from "@/Components/PrimaryButton"
import NavLink from "@/Components/NavLink"
import SecondaryButton from "@/Components/SecondaryButton"
import { useEffect } from "react"


export default function Index({auth,dataHuespede,flash}) {
  const {data,links}=dataHuespede
  
  const editaritem=(e)=>{
     e.preventDefault()
    let id=e.target.value
     console.log(e.target.value)
     router.get(route('huespede.show',id))
}  
  let alertaclass=""
  const createItem=(e)=>{
    e.preventDefault()
    router.get(route("huespede.create"))
  }
  const destroyItem=(e)=>{
       e.preventDefault();
       let id=e.target.value
      /*  router.delete(route("posada.destroy",id),{
         onBefore:()=>window.confirm("Desea eliminar este item"),
         onSuccess:()=>console.log(flash?.message),
         onError:(error)=>{console.log(error)}
       })
 */

      
  }
  useEffect(()=>{
    if(flash.message){
       let span=document.querySelector("#mensaje")
       alertaclass="bg-red-500 rounded-lg block w-full space-y-2 text-2xl"
       span.textContent=`${flash.message} `
       span.className=alertaclass
       setTimeout(() => {
            span.textContent=""   
            flash.message=""
       }, 3000);

    }


  },[flash])
  return (
    <Authenticated
       user={auth.user}
       header={"Catalogo Huespedes"}

    >  
      <Head title="Huespede"/>
      <MainHtml>
        <div className="mt-2 my-2">
          <PrimaryButton
              onClick={(e)=>createItem(e)}
           >Crear item</PrimaryButton>
        </div>
        { flash?.message &&
        <div id="alerta" className={`mt-2  mb-2`}>
           <span id="mensaje" className={`${alertaclass}`}></span>

        </div>
       } 
         {data.length>0 ?
           <table className="table-auto  border border-green-700
                            border-separate border-spacing-2 w-full" >
              <thead>
                 <tr className="bg-green-300">
                    <th className="border border-green-700 rounded-lg  ">Id</th>
                    <th className="border border-green-700 rounded-lg">Nombres</th>
                    <th className="border border-green-700 rounded-lg">Apellidos</th>
                    <th className="border border-green-700 rounded-lg">Cedula</th>
                    <th className="border border-green-700 rounded-lg">Celular</th>
                    <th className="border border-green-700 rounded-lg">email</th>
                    <th className="border border-green-700 rounded-lg">Editar</th>
                    <th className="border border-green-700 rounded-lg">Eliminar</th>
                 </tr>
              </thead>
                <tbody>

                    {data.map((item,idx)=>(

                  <tr key={idx}>
                      <td className="border border-green-700">{item.id}</td>
                      <td className="border border-green-700">{item.nombre}</td>
                      <td className="border border-green-700">{item.apellidos}</td> 
                      <td className="border border-green-700">{item.cedula}</td>
                      <td className="border border-green-700">{item.celular}</td>
                      <td className="border border-green-700">{item.email}</td>
                      <td className="border border-green-700">
                        <PrimaryButton
                          name="btnEditar"
                          value={item.id}
                          onClick={(e)=>editaritem(e)}
                        >
                          Editar
                        </PrimaryButton></td>
                        <td className="border border-green-700">
                        <SecondaryButton
                          name="btnDestroy"
                          value={item.id}
                          className="bg-red-500"
                          onClick={(e)=>destroyItem(e)}
                        >
                         Eliminar
                        </SecondaryButton></td>
                  </tr>
                    ))
                }
              </tbody>  
             </table>  
          : <h1>No hay Data</h1>
         
         }         
         
         <div><Pagination links={links} /></div>  
         
      </MainHtml>
        

    </Authenticated>
  )
}
