import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../../styles/styles.css';

const Servicios = () => {
  const [inView, setInView] = useState(false);

  const servicios = [
    {
      id: 2,
      title: "Atencion Personalizada",
      description: "Nuestro equipo está siempre disponible para brindarte la mejor experiencia.",
    },
    {
      id: 3,
      title: "Productos Originales",
      description: "Trabajamos con productos de alta calidad para asegurar tu satisfacción.",
    },
  ];

  return (
    <div className="w-full py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contenedor de servicios */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-8">
          {servicios.map((servicio, index) => (
            <React.Fragment key={servicio.id}>
              {/* Contenido del servicio */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1, 
                  ease: "easeInOut" 
                }}
                className="text-center w-full md:w-auto"
                onViewportEnter={() => setInView(true)}
              >
                <h3 
                  style={{ fontFamily: 'Amblas, sans-serif' }} 
                  className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                >
                  {servicio.title}
                </h3>
                <p className="text-base md:text-lg text-gray-600 px-4 md:px-0">
                  {servicio.description}
                </p>
              </motion.div>

              {/* Separador optimizado */}
              {index < servicios.length - 1 && (
                <>
                  <div className="w-60 h-1 bg-black my-6 md:hidden"></div>
                  <motion.div 
                    className="h-24 w-1 bg-black mx-4 hidden md:block"
                    initial={{ scaleY: 0 }}
                    animate={inView ? { scaleY: 1 } : {}}
                    transition={{ 
                      duration: 0.5,
                      delay: 0.3 + (index * 0.1),
                      ease: "easeInOut"
                    }}
                  />
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Servicios;