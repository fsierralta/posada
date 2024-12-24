import React, { useState, useRef, useEffect } from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4 px-4 ">
      <div className="flex justify-between items-center ">
        <div>
          <p>&copy; {new Date().getFullYear()}  Todos los derechos reservados.{`${import.meta.env.VITE_NAME_PROGRAMER} ${import.meta.env.VITE_PHONE_PROGRAMER}`}</p>
        </div>
        <div className="flex space-x-4">
          <p  className="hover:text-white">{`email:${import.meta.env.VITE_EMAIL_PROGRAMER}`}</p>
          
        </div>
        <div className="flex space-x-4">
          <a href={`${import.meta.env.VITE_INSTAGRAM_PROGRAMER}`} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.463 12.553a2.5 2.5 0 01-2.5 2.5 2.5 2.5 0 01-2.5-2.5 2.5 2.5 0 012.5-2.5 2.5 2.5 0 012.5 2.5zm-5.228 0a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};



export default Footer