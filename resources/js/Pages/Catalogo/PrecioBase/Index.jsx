import MainHtml from "@/Components/MainHtml";
import Mensaje from "@/Components/Mensaje";
import Pagination from "@/Components/Pagination";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head,Link,router,useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";



export default function Index({auth,data,flash}) {
 const[mostrar,setMostrar]=useState(false)
  const {data:dataPrecio,links}=data
 const {delete:destroy}=useForm()
  const createItem=(e)=>{
    e.preventDefault()
    router.get(route('precio.create'))
    


  }
  const editarItem=(e)=>{
    e.preventDefault()
    let id=e.target.value
    router.get(route("precio.show",{id}))

  }
 const eliminarItem=(e)=>{
    e.preventDefault();
    let id=e.target.value
    destroy(route("precio.destroy",{id}),{
      onBefore:()=>window.confirm(`Desea eliminar este item:${id}`)


    })


 }
  useEffect(()=>{
      const MostrarMensaje=()=>{
        setMostrar(true)
         setTimeout( () => {
            setMostrar(false)
            flash.message=null
            
         }, 3000);
         
      


      }       
      flash.message && MostrarMensaje();
      

  },[flash])
  
  return (
    <Authenticated
        user={auth.user}
        header={"Precio base"}

    >
        <MainHtml>
            <Head title="Precio Base" />
            <div>
                <PrimaryButton
                   onClick={createItem}
                
                >Create</PrimaryButton>
            </div>

            {mostrar && <Mensaje mensaje={flash.message}/>}
        
            <div className="mt-2">
                {dataPrecio.length>0 ?(
                    <table className="table-auto  border border-green-700
                                     border-separate border-spacing-2 w-full" >
                         <thead>
                            <tr className="bg-green-300">
                                <th className="border border-green-700 rounded-lg">id</th>
                                <th className="border border-green-700 rounded-lg">precio</th>
                                <th className="border border-green-700 rounded-lg">Descipción</th>
                                <th className="border border-green-700 rounded-lg">Tipo</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                                
                            </tr>
                         </thead>
                         <tbody>
                            { dataPrecio.length>0 && dataPrecio.map((item,idx)=>(
                                 <tr key={item.id}>
                                    <td className="border border-green-700"> {item.id}</td>
                                    <td className="border border-green-700">{item.precio}</td>
                                    <td className="border border-green-700">{item.descripcion}</td>
                                    <td className="border border-green-700">{item.tipo}</td>
                                    <td><PrimaryButton 
                                          name="btnEditar"
                                          value={item.id}
                                          onClick={editarItem}
                                    >Editar</PrimaryButton> </td>
                                    <td><SecondaryButton 
                                         name="btnEliminar"
                                         value={item.id}
                                         onClick={eliminarItem}
                                  >Eliminar</SecondaryButton></td>
                                    
                                 </tr>
                             ))
                        }


                         </tbody>



                   </table>
                ):(
                    <span>No  hay datos</span>
                ) }
               <div className="mt-2"><Pagination  links={links}
               /> </div> 
               
                
           </div> 

          

        </MainHtml>




    </Authenticated>
  )
}

