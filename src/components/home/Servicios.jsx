import React from 'react';
import { motion } from 'framer-motion'; // Importa Framer Motion
import '../../styles/styles.css'; // Importa el archivo CSS

const Servicios = () => {
  const servicios = [
    {
      id: 2,
      title: "Atencion Personalizada",
      description: "Nuestro equipo está siempre disponible para brindarte la mejor experiencia.",
    },
    {
      id: 3,
      title: "Productos Originales",
      description: "Trabajamos con productos de alta calidad para asegurar tu satisfaccion.",
    },
  ];

  return (
    <div className="w-full py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título y descripción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} // Estado inicial: invisible y ligeramente desplazado hacia abajo
          whileInView={{ opacity: 1, y: 0 }} // Estado final: visible y en su posición original
          viewport={{ once: true, amount: 0.15 }} // La animación se activa cuando el 15% del elemento es visible
          transition={{ duration: 0.5, ease: "easeInOut" }} // Duración de 0.5 segundos con curva easeInOut
          className="text-center"
        >
          <h2 style={{ fontFamily: 'Amblas, sans-serif' }} className="text-2xl md:text-4xl font-bold text-gray-900">
            Nuestros Servicios
          </h2>
        </motion.div>

        {/* Contenedor de servicios con separador vertical */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-8">
          {servicios.map((servicio, index) => (
            <React.Fragment key={servicio.id}>
              {/* Contenido del servicio */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} // Estado inicial: invisible y ligeramente desplazado hacia abajo
                whileInView={{ opacity: 1, y: 0 }} // Estado final: visible y en su posición original
                viewport={{ once: true, amount: 0.15 }} // La animación se activa cuando el 15% del elemento es visible
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeInOut" }} // Duración de 0.5 segundos con curva easeInOut
                className="text-center"
              >
                <h3 style={{ fontFamily: 'Amblas, sans-serif' }} className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                  {servicio.title}
                </h3>
                <p className="text-base md:text-lg text-gray-600"> {/* Tamaño consistente con "Menu" */}
                  {servicio.description}
                </p>
              </motion.div>

              {/* Separador vertical (solo entre las dos secciones) */}
              {index < servicios.length - 1 && (
                <div className="h-24 w-1 bg-black mx-4 hidden md:block"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Servicios;