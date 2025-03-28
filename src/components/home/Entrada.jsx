import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import '../../styles/styles.css';

const Entrada = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [lowResLoaded, setLowResLoaded] = useState(false);

  const slide = {
    id: 1,
    title: "¡Bienvenido a la web de Omri!",
    subtitle: "Consulta la disponibilidad e información de todos los productos.",
    image: "/images/home/slider/prueba2.webp",
    lowResImage: "/images/home/slider/prueba2-lowres.webp" // Añade una versión baja resolución
  };

  // Precargar la imagen
  useEffect(() => {
    const img = new Image();
    img.src = slide.image;
    img.onload = () => {
      setImageLoaded(true);
    };

    // Precargar también la imagen de baja resolución
    const lowResImg = new Image();
    lowResImg.src = slide.lowResImage;
    lowResImg.onload = () => {
      setLowResLoaded(true);
    };

    return () => {
      img.onload = null;
      lowResImg.onload = null;
    };
  }, [slide.image, slide.lowResImage]);

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
      className="flex justify-center items-center w-full pt-4 px-4 bg-gray-100"
    >
      <div className="w-full h-80 md:h-96 relative rounded-lg overflow-hidden shadow-lg">
        {/* Mostrar placeholder de carga */}
        {!lowResLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
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
            <div className="absolute inset-0 bg-black bg-opacity-25"></div>
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
            <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 style={{ fontFamily: 'Amblas, sans-serif' }} className="text-3xl md:text-4xl font-bold">
                  {slide.title}
                </h1>
                <p className="mt-2 text-lg md:text-xl">
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