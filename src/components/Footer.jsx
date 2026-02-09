import React, { memo } from 'react';
import { FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = memo(() => {
  return (
    <footer className='bg-black text-white'>
      <div className='max-w-[1600px] mx-auto px-6 lg:px-12 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16'>
          {/* Logo Section */}
          <div className='flex flex-col items-start justify-center'>
            <img
              src='/images/isotipoblanco.webp'
              alt='Logo de la empresa'
              className='h-40 w-auto'
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Ubicación Section */}
          <div className='flex flex-col items-start'>
            <h3 className='text-lg font-normal tracking-widest uppercase text-color-hover mb-6'>
              Ubicación
            </h3>
            <ul className='space-y-4 text-lg text-gray-300'>
              <li className='flex items-start'>
                <FaMapMarkerAlt className='mt-1 mr-3 text-gray-400 flex-shrink-0' size={18} />
                <span>C. C. Orinokia Mall<br />Santo Tome IV, Piso 1, Local 01</span>
              </li>
            </ul>
          </div>

          {/* Contacto Section */}
          <div className='flex flex-col items-start'>
            <h3 className='text-lg font-normal tracking-widest uppercase text-color-hover mb-6'>
              Contacto
            </h3>
            <ul className='space-y-4 text-lg text-gray-300'>
              <li className='flex items-center'>
                <FaEnvelope className='mr-3 text-gray-400' size={18} />
                <a href='mailto:omrivzla@gmail.com' className='hover:text-white transition'>
                  omrivzla@gmail.com
                </a>
              </li>
              <li className='flex items-center'>
                <FaPhone className='mr-3 text-gray-400' size={18} />
                <a href='tel:+584249370299' className='hover:text-white transition'>
                  0424-9370299
                </a>
              </li>
            </ul>
          </div>

          {/* Redes Sociales Section */}
          <div className='flex flex-col items-start'>
            <h3 className='text-lg font-normal tracking-widest uppercase text-color-hover mb-6'>
              Síguenos
            </h3>
            <ul className='space-y-4'>
              <li>
                <a
                  className='flex items-center text-lg text-gray-300 hover:text-white transition group'
                  href='https://www.instagram.com/omrivzla/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FaInstagram size={22} className="mr-3 group-hover:scale-110 transition-transform" />
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className='mt-16 pt-8 border-t border-gray-800'>
          <p className='text-base text-gray-400 text-center'>
            © {new Date().getFullYear()} Omri. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;

