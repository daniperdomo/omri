import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Importa Framer Motion
import '../../styles/styles.css'; // Importa el archivo CSS

const Menu = () => {
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
      title: "Accesorios Apple",
      description: "Ven y busca cargadores, cables y audífonos para tus dispositivos Apple.",
      image: "/images/home/menu/menuapple.webp",
      link: "/accesorios",
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
      title: "Perfumes Arabes",
      description: "Próximamente disponibles en Omri.",
      image: "/images/home/menu/menuarabe.webp",
      link: null,
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-100">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }} // Estado inicial: invisible y ligeramente desplazado hacia abajo
          whileInView={{ opacity: 1, y: 0 }} // Estado final: visible y en su posición original
          viewport={{ once: true, amount: 0.15 }} // La animación se activa cuando el 15% del elemento es visible
          transition={{ duration: 0.5, delay: index * 0.1, ease: "easeInOut" }} // Duración de 0.5 segundos con curva easeInOut
          className="relative flex items-center justify-center h-80 text-white text-center rounded-lg overflow-hidden shadow-lg hover:shadow-md transition-all duration-300 transform hover:scale-101"
          style={{
            backgroundImage: `url(${item.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay para oscurecer la imagen */}
          <div className="absolute inset-0 bg-black bg-opacity-25 transition-all duration-300"></div>

          {/* Contenido del cuadro */}
          <div className="relative z-10 p-6">
            <h2 style={{ fontFamily: 'Amblas, sans-serif' }} className="text-2xl md:text-4xl font-bold mb-4">
              {item.title}
            </h2>
            <p className="text-base md:text-lg mb-6"> {/* Reduje el tamaño del párrafo */}
              {item.description}
            </p>
            {/* Mostrar el botón solo si hay un enlace */}
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