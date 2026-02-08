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
    producto.cod_categoria === "HEP" ||
    producto.cod_categoria === "MEP" ||
    producto.cod_categoria === "UNI" ||
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

  const ocultarEspecificaciones = ["HEP", "MEP", "UNI"].includes(producto.cod_categoria);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={cod_producto}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="py-12 bg-white min-h-screen relative overflow-hidden"
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="bg-white overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-12">
              {/* Imagen principal + miniaturas */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col md:flex-row items-start"
              >
                {allImages.length > 1 && (
                  <div className="hidden md:flex flex-col space-y-3 mr-6">
                    {allImages.map((img, index) => (
                      <button
                        key={index}
                        className={`flex-shrink-0 w-20 h-20 border focus:outline-none transition-all duration-200 ${currentImage === img.url
                            ? "border-gray-900 ring-2 ring-gray-900 ring-offset-2"
                            : "border-gray-200 hover:border-gray-400"
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

                <div className="w-full max-w-[700px] h-[400px] md:h-[700px] flex justify-center items-center border border-gray-200 overflow-hidden bg-gray-50">
                  <img
                    src={currentImage}
                    alt={producto.nombre}
                    className="w-full h-full object-contain"
                  />
                </div>

                {allImages.length > 1 && (
                  <div className="flex md:hidden w-full justify-center space-x-3 mt-5 overflow-x-auto">
                    {allImages.map((img, index) => (
                      <button
                        key={index}
                        className={`flex-shrink-0 w-16 h-16 border focus:outline-none transition-colors duration-200 ${currentImage === img.url
                            ? "border-gray-900"
                            : "border-gray-200 hover:border-gray-400"
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

              {/* Información del producto */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="space-y-8"
              >
                <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase text-gray-900">{producto.nombre}</h1>

                {/* Precio (oculto si es MEP, HEP o UNI) */}
                {!(producto.cod_categoria === "MEP" || producto.cod_categoria === "HEP" || producto.cod_categoria === "UNI") && (
                  <p className="text-3xl md:text-4xl font-medium text-gray-900">
                    ${producto.precio.toFixed(2)}
                  </p>
                )}

                <div className="flex items-center">
                  {availability ? (
                    <span className="px-4 py-2 bg-white border border-gray-300 text-sm font-medium tracking-wide uppercase text-gray-900">
                      Disponible
                    </span>
                  ) : (
                    <span className="px-4 py-2 bg-gray-900 text-sm font-medium tracking-wide uppercase text-white">
                      No disponible
                    </span>
                  )}
                </div>

                <div className="text-gray-700 text-base leading-relaxed">
                  <p className="text-sm font-light tracking-wide uppercase text-gray-500 mb-2">Descripción</p>
                  <p>{producto.descripcion}</p>
                </div>

                {/* Colores (solo si no es accesorio) */}
                {!isAccesorio && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-light tracking-wide uppercase text-gray-500">Colores disponibles</h3>
                    <div className="flex gap-3">
                      {coloresDisponibles.map((prod, index) => (
                        <button
                          key={index}
                          className={`w-10 h-10 md:w-12 md:h-12 rounded-full transition-all duration-200 ${selectedColor === prod.color
                              ? "ring-2 ring-offset-2 ring-gray-900"
                              : "ring-1 ring-gray-200 hover:ring-gray-400 hover:scale-110"
                            }`}
                          style={{ backgroundColor: prod.color }}
                          onClick={() => handleColorClick(prod)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Botón de WhatsApp */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="pt-8"
                >
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-8 py-4 bg-green-500 text-white text-sm font-medium tracking-widest uppercase hover:bg-green-600 transition-colors duration-300"
                  >
                    <FaWhatsapp className="mr-3 text-2xl" />
                    Contactar por WhatsApp
                  </a>
                </motion.div>
              </motion.div>
            </div>

            {/* Secciones expandibles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="py-12 border-t border-gray-200"
            >
              <SeccionExpandible
                titulo="Características"
                contenido={producto.caracteristicas}
              />
              {!ocultarEspecificaciones && (
                <SeccionExpandible
                  titulo="Especificaciones"
                  contenido={producto.especificaciones}
                />
              )}
            </motion.div>
          </motion.div>

          {/* Productos recomendados */}
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
