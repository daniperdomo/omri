import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useImagePreloader } from "../../hooks/useImagePreloader";
import '../../styles/styles.css';

const Entrada = () => {
  const controls = useAnimation();
  const ref = useRef(null);

  const slide = {
    id: 1,
    title: "¡Bienvenido a la web de Omri!",
    subtitle: "Consulta la disponibilidad e información de todos los productos.",
    image: "/images/home/slider/prueba2.webp",
    lowResImage: "/images/home/slider/prueba2-lowres.webp"
  };

  // Usar el hook de precarga de imágenes
  const { loadedImages } = useImagePreloader([
    { id: 'main', image: slide.image },
    { id: 'lowRes', image: slide.lowResImage }
  ]);

  const imageLoaded = loadedImages['main'];
  const lowResLoaded = loadedImages['lowRes'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({ opacity: 1, y: 0 });
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex justify-center items-center w-full py-6 px-4 bg-white"
    >
      <div className="w-full h-96 md:h-[500px] relative overflow-hidden border border-gray-200">
        {/* Mostrar placeholder de carga */}
        {!lowResLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
        )}

        {/* Mostrar imagen de baja resolución primero */}
        {lowResLoaded && !imageLoaded && (
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${slide.lowResImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(2px)"
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
        )}

        {/* Mostrar imagen final cuando esté cargada */}
        {imageLoaded && (
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="text-center text-white px-6 max-w-3xl">
                <h1 className="text-3xl md:text-5xl font-light tracking-widest uppercase mb-4">
                  {slide.title}
                </h1>
                <p className="text-base md:text-lg font-light tracking-wide">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Entrada;