import React from 'react';
import { FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-black text-white lg:px-48 px-4 py-4'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 items-start'>
        {/* Logo Section */}
        <div className='mb-4 md:mb-0 flex flex-col items-start'>
          {/* Imagen del logo */}
          <img 
            src='/images/isotipoblanco.webp' 
            alt='Logo de la empresa'
            className='w-32 h-auto' // Ajusta el tamaño de la imagen con Tailwind
          />
        </div>

        {/* Ubicación Section */}
        <div className='flex flex-col items-start'>
          <h2 style={{ fontFamily: 'Amblas, sans-serif' }} className='text-[22px] font-semibold py-2 text-color-hover uppercase'>
            Ubicación
          </h2>
          <ul className='text-[16px] my-4'>
            <li className='my-2'>C. C. Orinokia Mall</li>
            <li className='my-2'>Santo Tome IV, Piso 1, Local 01</li>
          </ul>
        </div>

        {/* Contacto Section */}
        <div className='mb-4 md:mb-0 flex flex-col items-start'>
          <h2 style={{ fontFamily: 'Amblas, sans-serif' }} className='text-[22px] font-semibold py-2 text-color-hover uppercase'>
            Contacto
          </h2>
          <ul className='text-[16px] my-4'>
            <li className='my-2'>E-mail: omrivzla@gmail.com</li>
            <li className='my-2'>Teléfono: 0424-9370299</li>
          </ul>
        </div>

        {/* Redes Sociales Section */}
        <div className='flex flex-col items-start'>
          <h2 style={{ fontFamily: 'Amblas, sans-serif' }} className='text-[22px] font-semibold py-2 text-color-hover uppercase'>
            Síguenos
          </h2>
          <ul className='text-[16px] my-4'>
            <li className='my-2'>
              <a
                className='text-white hover:text-fuchsia-600 transition-all duration-150 ease-in-out flex items-center'
                href='https://www.instagram.com/omrivzla/'
                target='blank'
              >
                <FaInstagram size={24} className="mr-2" /> {/* Ícono de Instagram */}
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;