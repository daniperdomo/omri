import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../styles/styles.css';

const Menu = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedItems, setLoadedItems] = useState({});

  const items = [
    {
      id: 1,
      title: "Catalogo Cubitt",
      description: "Descubre los productos Cubitt que ofrecemos para ti.",
      image: "/images/home/menu/menucubi.webp",
      lowResImage: "/images/home/menu/menucubi-lowres.webp",
      link: "/cubitt",
    },
    {
      id: 2,
      title: "Accesorios Apple",
      description: "Ven y busca cargadores, cables y audífonos para tus dispositivos Apple.",
      image: "/images/home/menu/menuapple.webp",
      lowResImage: "/images/home/menu/menuapple-lowres.webp",
      link: "/accesorios",
    },
    {
      id: 3,
      title: "Accesorios Samsung",
      description: "Accesorios originales de la marca Samsung disponibles para ti.",
      image: "/images/home/menu/menusamsung.webp",
      lowResImage: "/images/home/menu/menusamsung-lowres.webp",
      link: "/accesorios",
    },
    {
      id: 4,
      title: "Perfumes Arabes",
      description: "Próximamente disponibles en Omri.",
      image: "/images/home/menu/menuarabe.webp",
      lowResImage: "/images/home/menu/menuarabe-lowres.webp",
      link: null,
    },
  ];

  // Precargar imágenes
  useEffect(() => {
    const loadImages = async () => {
      const promises = items.map(item => {
        return new Promise((resolve) => {
          // Precargar imagen de baja resolución
          const lowResImg = new Image();
          lowResImg.src = item.lowResImage;
          lowResImg.onload = () => {
            setLoadedItems(prev => ({ ...prev, [item.id]: 'lowres' }));
            resolve();
          };
          lowResImg.onerror = resolve;

          // Precargar imagen de alta resolución
          const img = new Image();
          img.src = item.image;
          img.onload = () => {
            setLoadedItems(prev => ({ ...prev, [item.id]: 'highres' }));
            resolve();
          };
          img.onerror = resolve;
        });
      });

      await Promise.all(promises);
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-100">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: index * 0.1, ease: "easeInOut" }}
          className="relative flex items-center justify-center h-80 text-white text-center rounded-lg overflow-hidden shadow-lg hover:shadow-md transition-all duration-300 transform hover:scale-101"
        >
          {/* Placeholder de carga */}
          {!loadedItems[item.id] && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          )}

          {/* Imagen de baja resolución */}
          {loadedItems[item.id] === 'lowres' && (
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${item.lowResImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(2px)"
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-25"></div>
            </div>
          )}

          {/* Imagen de alta resolución */}
          {loadedItems[item.id] === 'highres' && (
            <div 
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-25"></div>
            </div>
          )}

          {/* Contenido del cuadro */}
          <div className="relative z-10 p-6">
            <h2 style={{ fontFamily: 'Amblas, sans-serif' }} className="text-2xl md:text-4xl font-bold mb-4">
              {item.title}
            </h2>
            <p className="text-base md:text-lg mb-6">
              {item.description}
            </p>
            {item.link && (
              <Link to={item.link}>
                <button className="px-6 py-2 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200 transition duration-300">
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