import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import PantallaCarga from "../components/PantallaCarga";
import ProductRecomendado from "../components/ProductRecomendado";
import SeccionExpandible from "../components/SeccionExpandible";

const ProductDetail = () => {
  const { cod_producto } = useParams();
  const [producto, setProducto] = useState(null);
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [availability, setAvailability] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  const isAccesorio = producto && (
    producto.cod_categoria === "CARG" || 
    producto.cod_categoria === "CABL" || 
    producto.cod_categoria === "AUDIF"
  );

  useEffect(() => {
    fetch(`/api/productos/${cod_producto}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
      })
      .then((data) => {
        setProducto(data);
        if (data.imagenes && data.imagenes.length > 0) {
          const sortedImages = data.imagenes.sort((a, b) => a.url.localeCompare(b.url));
          setCurrentImage(sortedImages[0].url);
          setAllImages(sortedImages);
          setAvailability(data.cantidad > 0);
          setSelectedColor(data.color);
        }
        return fetch(`/api/productos/categoria/${data.cod_categoria}/marca/${data.cod_marca}`);
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
      })
      .then((data) => {
        setProductosRelacionados(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error obteniendo detalles del producto:", error);
        setLoading(false);
      });
  }, [cod_producto]);

  const handleColorClick = (productoRelacionado) => {
    const sortedImages = productoRelacionado.imagenes.sort((a, b) => a.url.localeCompare(b.url));
    setCurrentImage(sortedImages[0]?.url || "");
    setAllImages(sortedImages);
    setAvailability(productoRelacionado.cantidad > 0);
    setSelectedColor(productoRelacionado.color);
    setProducto(productoRelacionado);
  };

  if (loading) {
    return <PantallaCarga />;
  }

  if (!producto) {
    return <div className="text-center py-8">Producto no encontrado</div>;
  }

  const whatsappNumber = "+5804249370299";
  const whatsappMessage = `¡Hola!, quisiera saber más información acerca del producto: ${producto.nombre}.`;

  const coloresDisponibles = productosRelacionados.filter(
    (prod) => prod.modelo === producto.modelo
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={cod_producto}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="py-6 bg-gray-100 min-h-screen relative overflow-hidden"
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contenedor principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              {/* Columna izquierda: Imagen principal y miniaturas */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col md:flex-row items-start"
              >
                {/* En escritorio: Miniaturas a la izquierda */}
                {allImages.length > 1 && (
                  <div className="hidden md:flex flex-col space-y-3 mr-5">
                    {allImages.map((img, index) => (
                      <button
                        key={index}
                        className={`flex-shrink-0 w-20 h-20 border-2 focus:outline-none transition-all duration-200 ${
                          currentImage === img.url
                            ? "border-color-hover scale-110 z-10"
                            : "border-gray-300 hover:border-color-hover-50 hover:scale-105"
                        }`}
                        onClick={() => setCurrentImage(img.url)}
                      >
                        <img
                          src={img.url}
                          alt={`Imagen ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Imagen principal */}
                <div className="w-full max-w-[600px] h-[300px] md:h-[600px] flex justify-center items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <img
                    src={currentImage}
                    alt={producto.nombre}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* En móvil: Miniaturas centradas debajo de la imagen principal */}
                {allImages.length > 1 && (
                  <div className="flex md:hidden w-full justify-center space-x-3 mt-5 overflow-x-auto">
                    {allImages.map((img, index) => (
                      <button
                        key={index}
                        className={`flex-shrink-0 w-16 h-16 border-2 focus:outline-none transition-colors duration-200 ${
                          currentImage === img.url
                            ? "border-color-hover"
                            : "border-gray-300 hover:border-color-hover-50"
                        }`}
                        onClick={() => setCurrentImage(img.url)}
                      >
                        <img
                          src={img.url}
                          alt={`Imagen ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Columna derecha: Detalles del producto */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="space-y-6"
              >
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900">{producto.nombre}</h1>
                <p className="text-2xl md:text-4xl font-semibold text-gray-800">
                  ${producto.precio.toFixed(2)}
                </p>
                <div className="flex items-center space-x-2">
                  {availability ? (
                    <span className="text-lg md:text-xl font-semibold text-green-600">Disponible</span>
                  ) : (
                    <span className="text-lg md:text-xl font-semibold text-red-600">No disponible</span>
                  )}
                </div>
                {/* Descripción del producto */}
                <div className="text-gray-700 text-lg">
                  <p><strong>Descripción:</strong> {producto.descripcion}</p>
                </div>
                {!isAccesorio && (
                  <div className="space-y-5">
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Colores:</h3>
                    <div className="flex space-x-4">
                      {coloresDisponibles.map((prod, index) => (
                        <button
                          key={index}
                          className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 focus:outline-none transition-all duration-200 ${
                            selectedColor === prod.color
                              ? "border-color-hover scale-110 z-10"
                              : "border-gray-300 hover:scale-105"
                          }`}
                          style={{ backgroundColor: prod.color }}
                          onClick={() => handleColorClick(prod)}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="m-4 flex justify-center mt-8 md:pt-16"
                >
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 md:px-10 md:py-5 bg-green-500 text-white font-semibold rounded-full shadow-md hover:bg-green-600 transition duration-300 w-full max-w-sm md:max-w-lg md:h-20"
                  >
                    <FaWhatsapp style={{ color: "#ffffff", fontSize: "30px" }} className="mr-3" />
                    <span className="text-lg md:text-2xl">
                      Contactar por WhatsApp
                    </span>
                  </a>
                </motion.div>
              </motion.div>
            </div>

            {/* Secciones expandibles para Características y Especificaciones */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="p-6 border-t border-gray-200"
            >
              <SeccionExpandible
                titulo="Características"
                contenido={producto.caracteristicas}
              />
              <SeccionExpandible
                titulo="Especificaciones"
                contenido={producto.especificaciones}
              />
            </motion.div>
          </motion.div>

          {/* Componente de productos recomendados */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <ProductRecomendado 
              productos={productosRelacionados} 
              categoria={producto.cod_categoria} 
              modeloSeleccionado={producto.modelo} 
              marca={producto.cod_marca}
              cod_producto={producto.cod_producto}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductDetail;