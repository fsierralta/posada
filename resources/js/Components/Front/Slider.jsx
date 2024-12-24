import { Link } from "@inertiajs/react"


export default function Slider() {
  return (
    
    <div className="w-1/4 border border-collapse rounded-lg border-black px-4  h-screen  my-auto py-5 "> {/* Sidebar */}
      <div> {/* Contenido superior del sidebar */}
          
          <h1 className='text-white  text-2xl text-center '>{`Obten el ${import.meta.env.VITE_INSTAGRAM_DESCUENTO} porciento de Descuento en todas Las Monturas para Lentes  `}
                          En las  Tiendas <span  className="text-white text-2xl font-bold">MY OPTIC</span>
           </h1>
          

        <h2 className="text-xl font-bold mb-2 text-center mt-4">Regístrate Aquí y</h2>
        <p className="mb-4 text-white">¡Únete a nuestra comunidad y descubre contenido exclusivo!</p>
        <Link className="bg-green-500 hover:bg-green-300 text-white font-bold py-2 px-4 rounded w-full mx-auto  block text-center"
              href={route('contacto.show')}
        >
          Registrarse
        </Link>
      </div>
      <div className="mt-4 text-xl"> {/* Contenido inferior del sidebar */}
        <a 
           href={` ${import.meta.env.VITE_INSTAGRAM_MYOPTIC}`}
           target="_blank"
           rel="noopener noreferrer" className="text-white hover:underline block text-center">Síguenos en Instagram MyOPTIC</a>
      </div>

      <div className="mt-4 text-xl"> {/* Contenido inferior del sidebar */}
        <a 
           href={`${import.meta.env.VITE_INSTAGRAM_POSADA}`}
           target="_blank"
           rel="noopener noreferrer" className="text-amber-500 hover:underline block text-center">Síguenos en Instagram Posada los Humacos</a>
      </div>
    </div>

  )
}
