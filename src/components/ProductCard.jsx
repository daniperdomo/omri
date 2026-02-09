import React, { useState, useCallback, memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { isAccessoryCategory, shouldShowPrice } from "../utils/constants";

const ProductCard = memo(({ product, allProducts }) => {
  const [currentImage, setCurrentImage] = useState(
    product.imagenes && product.imagenes.length > 0 ? product.imagenes[0].url : ""
  );
  const [availability, setAvailability] = useState(product.cantidad > 0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const navigate = useNavigate();

  // Manejar el cambio de imagen al seleccionar un color
  const handleColorClick = useCallback((image, quantity, index, e) => {
    e.stopPropagation();
    setCurrentImage(image);
    setAvailability(quantity > 0);
    setSelectedColorIndex(index);
  }, []);

  // Manejar clic en la tarjeta para redirigir a la página de detalles
  const handleCardClick = useCallback(() => {
    navigate(`/producto/${product.cod_producto}`);
  }, [navigate, product.cod_producto]);

  // Verificar si el producto pertenece a las categorías de accesorios (memoizado)
  const isAccesorio = useMemo(
    () => isAccessoryCategory(product.cod_categoria),
    [product.cod_categoria]
  );

  return (
    <div
      className="group relative bg-white overflow-hidden cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Imagen full-bleed con overlay */}
      <div className="relative aspect-square overflow-hidden bg-white">
        {currentImage ? (
          <>
            <img
              src={currentImage}
              alt={product.nombre}
              className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            {/* Overlay oscuro en hover */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

            {/* Badge de disponibilidad */}
            <div className="absolute top-4 left-4">
              {availability ? (
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-900 shadow-sm">
                  Disponible
                </span>
              ) : (
                <span className="px-3 py-1 bg-gray-900/90 backdrop-blur-sm rounded-full text-xs font-medium text-white shadow-sm">
                  Solicítalo
                </span>
              )}
            </div>

            {/* Botón "VER DETALLES" en hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="px-8 py-3 bg-white text-black text-sm font-medium tracking-widest uppercase hover:bg-gray-100 transition-colors duration-200">
                Ver Detalles
              </button>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-sm">Sin imagen</span>
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="p-6 space-y-3">
        {/* Nombre del producto */}
        <h3 className="text-sm font-light tracking-widest uppercase text-gray-900 truncate">
          {product.nombre}
        </h3>

        {/* Precio (oculto si no debe mostrarse) */}
        {shouldShowPrice(product.cod_categoria) && (
          <p className="text-lg font-medium text-gray-900">
            ${product.precio.toFixed(2)}
          </p>
        )}

        {/* Selector de colores mejorado (solo si no es un accesorio) */}
        {!isAccesorio && allProducts.length > 1 && (
          <div className="flex gap-2 pt-2">
            {allProducts.map((otherProduct, index) => (
              <button
                key={index}
                className={`w-8 h-8 rounded-full transition-all duration-200 hover:scale-110 ${index === selectedColorIndex
                  ? "ring-2 ring-offset-2 ring-gray-900"
                  : "ring-1 ring-gray-200 hover:ring-gray-300"
                  }`}
                style={{ backgroundColor: otherProduct.color }}
                onClick={(e) => handleColorClick(otherProduct.imagenes[0]?.url, otherProduct.cantidad, index, e)}
                aria-label={`Color ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
