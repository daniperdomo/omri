import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Menu = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const items = [
    {
      id: 1,
      title: "Catalogo Cubitt",
      description: "Descubre los productos Cubitt que ofrecemos para ti.",
      image: "/images/home/menu/menucubi.webp",
      link: "/cubitt",
    },
    {
      id: 2,
      title: "Perfumes Arabes",
      description: "¡Adquiere tus perfumes arabes favoritos!",
      image: "/images/home/menu/menuarabe.webp",
      link: "/perfumes",
    },
    {
      id: 3,
      title: "Accesorios Samsung",
      description: "Accesorios originales de la marca Samsung disponibles para ti.",
      image: "/images/home/menu/menusamsung.webp",
      link: "/accesorios",
    },
    {
      id: 4,
      title: "Accesorios Apple",
      description: "Ven y busca cargadores, cables y audífonos para tus dispositivos Apple.",
      image: "/images/home/menu/menuapple.webp",
      link: "/accesorios",
    },
  ];

  // Precargar imágenes
  useEffect(() => {
    const loadImages = async () => {
      const promises = items.map(item => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = item.image;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      await Promise.all(promises);
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 py-6 px-4 bg-white">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: index * 0.1, ease: "easeInOut" }}
          className="group relative flex items-center justify-center h-96 md:h-[500px] text-white text-center overflow-hidden border border-gray-200 transition-all duration-300"
        >
          {/* Placeholder de carga */}
          {!imagesLoaded && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
          )}

          {/* Imagen */}
          {imagesLoaded && (
            <div
              className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300"></div>
            </div>
          )}

          {/* Contenido del cuadro */}
          <div className="relative z-10 p-8 max-w-lg">
            <h2 className="text-2xl md:text-4xl font-light tracking-widest uppercase mb-6">
              {item.title}
            </h2>
            <p className="text-sm md:text-base font-light tracking-wide mb-8 leading-relaxed">
              {item.description}
            </p>
            {item.link && (
              <Link to={item.link}>
                <button className="px-8 py-3 bg-white text-black text-sm font-medium tracking-widest uppercase hover:bg-gray-100 transition-colors duration-300">
                  Ver más
                </button>
              </Link>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Menu;