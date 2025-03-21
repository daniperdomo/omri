import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import '../../styles/styles.css'; // Importa el archivo CSS

const Entrada = () => {
  const controls = useAnimation(); // Controlador de animaciones
  const ref = useRef(null); // Referencia al contenedor

  const slide = {
    id: 1,
    title: "¡Bienvenido a la web de Omri!",
    subtitle: "Consulta la disponibilidad e información de los productos que amas.",
    image: "/images/home/slider/prueba2.webp", // Cambia esta ruta por la de tu imagen
  };

  useEffect(() => {
    // Verifica si el elemento está en la vista al cargar la página
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({ opacity: 1, y: 0 }); // Inicia la animación
        }
      },
      { threshold: 0.15 } // Umbral de visibilidad (15%)
    );

    if (ref.current) {
      observer.observe(ref.current); // Observa el elemento
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current); // Limpia el observer al desmontar
      }
    };
  }, [controls]);

  return (
    <motion.div
      ref={ref} // Asigna la referencia
      initial={{ opacity: 0, y: 20 }} // Estado inicial: invisible y ligeramente desplazado hacia abajo
      animate={controls} // Controla la animación con el hook useAnimation
      transition={{ duration: 0.5, ease: "easeInOut" }} // Duración de 0.5 segundos con curva easeInOut
      className="flex justify-center items-center w-full pt-4 px-4 bg-gray-100"
    >
      {/* Contenedor de la imagen */}
      <div className="w-full h-80 md:h-96 relative rounded-lg overflow-hidden shadow-lg">
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            {/* Texto centrado */}
            <div className="text-center text-white px-4">
              <h1 style={{ fontFamily: 'Amblas, sans-serif' }} className="text-3xl md:text-4xl font-bold">
                {slide.title}
              </h1>
              <p className="mt-2 text-lg md:text-xl"> {/* Subí un poco el tamaño del párrafo */}
                {slide.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Entrada;