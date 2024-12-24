import { Link } from "@inertiajs/react";


export default function Publicidad() {
  const url="/imagenes/publicidad"
  const images =["p1"]
  const extension=".jpg"
    

  return (
    
    < div className='mb-10 text-center'>
            <h1 className='text-center text-amber-800 text-2xl font-bold '>Obten el 20% de Descuento en todas Las Monturas para Lentes  </h1>
            <h1>En las  Tiendas <span  className="text-amber-800 text-2xl font-bold">MY OPTIC</span> </h1>

            <h1><span>Registrate
                <span className="text-red-500 font-bold text-2xl"><Link
                   href={route('contacto.show')}
                >Aqui</Link></span> para participar</span>
                </h1>
       <div className="justify-center place-items-center py-2 inline-block">
         <a  
           href="https://www.instagram.com/myopticc/"
           target="_blank"
           
         >
    <img  
           src={`${url}/${images}${extension}`} 
           width={'40px'}
           height={'40px'}
           alt="Myoptic"
           className="py-2 hover:object-scale-down"
          
         
    />
    </a> 
    </div>

   
   

    </div>
  


  )
}
