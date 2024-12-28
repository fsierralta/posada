import React, { useState, useRef, useEffect } from 'react';
import Slider from './Slider';
import Footer from "@/Components/Front/Footer"

const Body = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const carouselRef = useRef(null);
  const images = [
    '/imagenes/posada/posada_01.jpg', // Reemplaza con tus rutas de imágenes
    '/imagenes/posada/posada_02.jpg',
    '/imagenes/posada/posada_03.jpg',
    '/imagenes/posada/posada_04.jpg',
    '/imagenes/posada/posada_05.jpg',
    '/imagenes/posada/posada_06.jpg',
    '/imagenes/posada/posada_07.jpg',
    '/imagenes/posada/posada_08.jpg',
    '/imagenes/posada/posada_09.jpg',
    // ... más imágenes
  ];
   const gradiente=()=>{
    return "bg-gradient-to-r  from-gray-100 via-green-600 to-slate-600"
  }
    
   
  useEffect(() => {
    const intervalId = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
      }, 5000); // Cambia de imagen cada 5 segundos
      return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, [images.length]);

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

  return (
   <>
  {/*  
     se define la cabezera principal l 
    para alinear body  con footer 

  */} 
  <div className='w-full justify-items-center flex  '> 
    
           <div>
            <a 
            href="https://www.instagram.com/loshumacosposada/"
            target="_blank"
            rel="noopener noreferrer" className="hover:underline block text-center"
            >
              <img src="imagenes/posada/logo_02.jpg" alt="humacos" />
            </a>
           </div> 
           <div className='w-full  justify-items-center'>
           <a 
            href="https://www.instagram.com/loshumacosposada/"
            target="_blank"
            rel="noopener noreferrer" className="hover:underline block text-center"
            >
            <img src='imagenes/posada/servicios.jpg' alt='servicios'/>
            </a>
            </div> 
    
  </div>

   {/*  
     se define el body principal como flex flex-col 
    para alinear body  con footer 

  */} 
   <div className='flex flex-col '>
          <div className=" md:flex md:flex-row sm:flex   sm:flex-col 
                        bg-gradient-to-r
                        from-gray-100
                          via-green-600 to-slate-600  "> {/* Contenedor principal */}
            
              
                <div className={`md:w-3/4 p-4 sm:w-full h-screen
                             justify-items-center relative `}
                             > {/* Sección principal (carrusel) */}
              
                              {/* Encabezado/Leyenda */}
                              <div className="text-center  mb-6 pt-4   "> {/* Contenedor del encabezado */}
                                  <div className='w-full'>
                                      <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mr-2"> {/* Título */}
                                        <p> Disponemos de cabañas</p>
                                        tradicionales
                                      </h2>
                                    <div className='md:text-2xl sm:text-sm' >
                                      <h1 >{`Reservaciones:${import.meta.env.VITE_EMAIL_POSADA}`}</h1>
                                      <h1>{`Telefonos ${import.meta.env.VITE_CELULAR_POSADA}`}</h1>
                                    </div> 
                                
                                </div> 
                              </div>

                               {/* Carrusel */}

                            <div className="relative w-96 h-96 overflow-hidden  ">
                                  <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentImage * 100}%)` }} ref={carouselRef}>
                                          {images.map((image, index) => (
                                              <div key={index} className="w-full shrink-0 ">
                                                  <img src={image} alt={`Imagen ${index + 1}`} className="object-fill w-full "  />
                                              </div>
                                          ))}
                                  </div>
                              
                                  <button onClick={prevImage} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-70 hover:opacity-100">
                                      {'<'}
                                  </button>
                                  <button onClick={nextImage} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full opacity-70 hover:opacity-100">
                                  {'>'}
                                </button>
                              
                          </div>
                          <div className='mt-8'>
                                <p className="text-2xl md:text-3xl font-bold text-white leading-tight mx-auto ml-2 text-center"> {/* Subtítulo */}
                                    Rodeadas de un hermoso <span>paisaje</span>
                                </p>
                                
                          </div>  
               </div>  
                {/* SLIDER                   */}
               <div className="md:w-1/4 md:flex
                        md:border 
                        md:border-collapse 
                        md:rounded-lg md:border-black px-4 
                          bg-gradient-to-r
                        from-gray-100
                        via-green-600 to-slate-600 
                          py-12" 
                >{/* slider */}
                   <Slider/>

                </div>
        
          
         </div>
         <div>
            <Footer/>
         </div>
   </div>
   
    
    
    
    </>   
  );
};

export default Body;