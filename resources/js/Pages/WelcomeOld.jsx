import SliderImg from '@/Components/SliderImg';
import { Link, Head } from '@inertiajs/react';
import Publicidad from '../Components/Publicidad';

export default function Welcome({ auth, laravelVersion="", phpVersion="" }) {


    

    return (
        < >
            <Head title="Bienvenidos" />
           
               
                <header className="absolute top-0  w-full flex justify-end  -mx-1  mt-2 h-10 bg-green-500   "> 
                   
                        
                           
                            <nav>
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className=""
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className='text-2xl'
                                                                 >
                                            Log in
                                        </Link>
                                        
                                    </>
                                )}
                          </nav>
                
                   
                 </header>
            <div className=' flex flex-col  bg-green-200 bg-cover  w-full h-full' >
                <div name="cuerpo">
                <section className=' justify-center py-16 '>
                         <div >
                           <div>
                           <Publicidad/>  
                           </div> 
                           <div>
                            <SliderImg/>
                            </div> 
                          </div>    
                           <div className='text-center mt-4  '>
                                <section className='mt-2  text-orange-950'>
                                       <h1 className='text-2xl'>Disponemos de cabañas tradicionales</h1>
                                    <p className='text-xl'>
                                        rodeadas de un hermosos paisaje  
                                    </p>
                                </section> 
                           </div>
                      
                    
                </section>
                </div>
                <div name="footer">
                <footer  className='absolute bottom-0 justify-center w-full h-48 bg-green-200 '>
                   
                            <div className='text-center '>
                            
                                    <span className='text-amber-950 font-bold text-xl'> {import.meta.env.VITE_NOMBRE_POSADA}</span>
                                    <p>
                                    <span className='text-amber-950 font-bold text-xl'> 
                                           {`Reservaciones:${import.meta.env.VITE_CELULAR_POSADA} - email:${import.meta.env.VITE_EMAIL_POSADA} `}
                                           
                                      </span>    


                                     

                                </p>
                            
                            </div>      
                            <div className='text-center mt-2 font-bold bg-green-500'>
                                <p>{`Sistema desarrollado por: ${import.meta.env.VITE_NAME_PROGRAMER} Email:${import.meta.env.VITE_EMAIL_PROGRAMER} Phone:${import.meta.env.VITE_PHONE_PROGRAMER}` }</p>
                            </div>
                   
               </footer> 
               </div>
               
         </div>    
        
        </>
    );
}
