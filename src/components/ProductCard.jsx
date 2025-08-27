import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, allProducts }) => {
  const [currentImage, setCurrentImage] = useState(
    product.imagenes && product.imagenes.length > 0 ? product.imagenes[0].url : ""
  );
  const [availability, setAvailability] = useState(product.cantidad > 0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [shouldScroll, setShouldScroll] = useState(false);
  const navigate = useNavigate();
  const textRef = useRef(null);

  // Manejar el cambio de imagen al seleccionar un color
  const handleColorClick = (image, quantity, index) => {
    setCurrentImage(image);
    setAvailability(quantity > 0);
    setSelectedColorIndex(index);
  };

  // Manejar clic en la tarjeta para redirigir a la página de detalles
  const handleCardClick = () => {
    navigate(`/producto/${product.cod_producto}`);
  };

  // Verificar si el producto pertenece a las categorías de accesorios
  const isAccesorio =
    product.cod_categoria === "CARG" ||
    product.cod_categoria === "CABL" ||
    product.cod_categoria === "AUDIF" ||
    product.cod_categoria === "HEP" ||
    product.cod_categoria === "MEP" ||
    product.cod_categoria === "UNI";

  // Efecto para verificar si el texto excede el ancho disponible
  useEffect(() => {
    if (textRef.current) {
      const textElement = textRef.current;
      const isOverflowing = textElement.scrollWidth > textElement.clientWidth;
      setShouldScroll(isOverflowing);
    }
  }, [product.nombre]);

  return (
    <div
      className="group bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer border-2 border-gray-200 hover:border-color-hover"
      onClick={handleCardClick}
    >
      {/* Contenedor de tamaño fijo para la imagen */}
      <div className="w-full h-64 overflow-hidden p-2">
        {currentImage ? (
          <img
            src={currentImage}
            alt={product.nombre}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No hay imagen disponible</span>
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Nombre del producto */}
        <div className="overflow-hidden">
          <h3
            ref={textRef}
            className={`text-lg font-bold text-gray-900 whitespace-nowrap overflow-hidden ${
              shouldScroll ? "group-hover:animate-scroll-text group-hover:text-clip group-hover:overflow-visible" : ""
            }`}
          >
            {product.nombre}
          </h3>
        </div>

        {/* Precio (oculto si es MEP, HEP o UNI) */}
        {!(product.cod_categoria === "MEP" || product.cod_categoria === "HEP" || product.cod_categoria === "UNI") && (
          <p className="text-gray-700">${product.precio.toFixed(2)}</p>
        )}

        {/* Disponibilidad */}
        {availability ? (
          <span className="text-sm font-semibold text-green-600">Disponible</span>
        ) : (
          <span className="text-sm font-semibold text-red-600">¡Solicítalo!</span>
        )}

        {/* Círculos de colores (solo si no es un accesorio) */}
        {!isAccesorio && (
          <div className="flex space-x-2 mt-2">
            {allProducts.map((otherProduct, index) => (
              <button
                key={index}
                className={`w-6 h-6 rounded-full border-2 focus:outline-none ${
                  index === selectedColorIndex ? "border-color-hover shadow-lg" : "border-gray-300"
                }`}
                style={{ backgroundColor: otherProduct.color }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleColorClick(otherProduct.imagenes[0]?.url, otherProduct.cantidad, index);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
