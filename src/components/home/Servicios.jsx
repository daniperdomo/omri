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
    <div className="w-full py-8 px-4 bg-white border-t border-gray-200">
      <div className="mx-auto">
        {/* Contenedor de servicios */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
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
                className="text-center w-full md:w-auto max-w-md"
                onViewportEnter={() => setInView(true)}
              >
                <h3 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-gray-900 mb-4">
                  {servicio.title}
                </h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  {servicio.description}
                </p>
              </motion.div>

              {/* Separador optimizado */}
              {index < servicios.length - 1 && (
                <>
                  <div className="w-40 h-px bg-gray-300 my-8 md:hidden"></div>
                  <motion.div
                    className="h-32 w-px bg-gray-300 hidden md:block"
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