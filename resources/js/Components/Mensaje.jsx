import { useEffect } from "react"


export default function Mensaje({mensaje,setMostrar=()=>{},setMensaje=()=>{}}) {
   //console.log("el mensaje",mensaje)
    useEffect(()=>{
       const mostrar=()=>{
              
               setTimeout(() => {
                   setMensaje("")
                   setMostrar(false)
               }, 3000);

       }   
       mostrar()
      
    },[mensaje])
  return (
    <div>
       <span className="bg-red-500 rounded-lg  text-2xl block w-full mt-2 mb-2">{mensaje}</span>     
    </div>
  )
}
