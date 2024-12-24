import {useState,useEffect}from 'react'

export default  function SliderImg() {
            const [currentImage, setCurrentImage] = useState(0);
            const images =["posada_01",
                            "posada_02",
                            "posada_03",
                            "posada_04",
                            "posada_05",
                            "posada_06",
                            "posada_07",
                            "posada_08"
                ]
            const url="/imagenes/posada"
            const extension="jpg"
           
      
        // Efecto para cambiar la imagen automáticamente (opcional)
        useEffect(() => {
           const interval = setInterval(() => {
            setCurrentImage((prevImage) => (Math.floor(Math.random() * 8)));
          }, 3000); // Cambia cada 3 segundos
      
          return () => clearInterval(interval); 
        }, []);
      
        // ... resto del componente
      
  return (
        <div className="mx-auto flex items-center justify-center">
               <div className="relative  md:w-96 md:h-80 sm:w-full sm:h-full">
                    {images.map((image, index) => (
                        <a key={index}
                          href={import.meta.env.VITE_INSTAGRAM_POSADA}
                          target="_blank"
                        >
                        <img
                            
                            src={`${url}/${image}.${extension}`}
                            alt="Imagen"
                            className="absolute w-full h-full object-cover transition-opacity duration-1000"
                            style={{ opacity: currentImage === index ? 1 : 0 }}
                        
                        />
                         
                        </a>
       
                    ))}
               </div>
        </div>
      );
 
    }
