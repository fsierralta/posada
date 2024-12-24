import { Link } from "@inertiajs/react";
import Modal from "../Modal";
import { useState } from "react";
import PrimaryButton from "../PrimaryButton";

const Navbar = ({auth}) => {
  
  return (
    <>
    <nav className="bg-gradient-to-r from-slate-800 to-slate-900 h-10   items-center justify-between px-4 flex">
      <div className="text-white font-bold"> {/* Logo o título */}
       {`${import.meta.env.VITE_NOMBRE_POSADA}`}
      </div>
      <div className="flex space-x-4"> {/* Menú principal */}
       {/*  <a href="#" className="text-gray-300 hover:text-white">Inicio</a>
        <a href="#" className="text-gray-300 hover:text-white">Servicios</a>
        <button onClick={onContacto} className="text-gray-300 hover:text-white">Contacto</button> */}
      </div>
      <div className="flex space-x-2"> {/* Login/Registro */}
      {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="text-gray-300 hover:text-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className='text-gray-300 hover:text-white'
                                                                 >
                                            Log in
                                        </Link>
                                        
                                    </>
                                )}
       
      </div>

    </nav>
    
    </>
  );
};

export default Navbar;
