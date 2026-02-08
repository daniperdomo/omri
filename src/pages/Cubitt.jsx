import React, { useState, useEffect, useMemo, useCallback } from "react";
import categoriasCubitt from "../jsons/categoriasCubitt.json";
import ProductGrid from "../components/ProductGrid";
import { debounce } from "../utils/debounce";
import PantallaCarga from "../components/PantallaCarga";

const Cubitt = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [errorPrecio, setErrorPrecio] = useState("");
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});

  // Precargar imágenes de categorías
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = categoriasCubitt.map((category) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = category.image;
          img.onload = () => {
            setLoadedImages((prev) => ({ ...prev, [category.id]: true }));
            resolve();
          };
          img.onerror = resolve; // Continuar aunque falle una imagen
        });
      });

      await Promise.all(imagePromises);
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  // Función para obtener productos desde la API
  const fetchProductos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/productos/cubitt`);
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      const data = await response.json();
      setProductos(data);
      sessionStorage.setItem("productosCubitt", JSON.stringify(data));
    } catch (error) {
      console.error("Error leyendo productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const productosGuardados = sessionStorage.getItem("productosCubitt");
    if (productosGuardados) {
      setProductos(JSON.parse(productosGuardados));
      setLoading(false);
    } else {
      fetchProductos();
    }
  }, []);

  const validarPrecio = () => {
    if (precioMin && precioMax && parseFloat(precioMin) > parseFloat(precioMax)) {
      setErrorPrecio("El precio mínimo no puede ser mayor que el máximo.");
      return false;
    }
    if (isNaN(precioMin) || isNaN(precioMax)) {
      setErrorPrecio("Los precios deben ser números válidos.");
      return false;
    }
    setErrorPrecio("");
    return true;
  };

  // Memoize filtered products computation
  const productosFiltrados = useMemo(() => {
    return productos.filter((producto) => {
      const cumpleCategoria = !categoriaSeleccionada || producto.cod_categoria === categoriaSeleccionada;
      const cumplePrecio =
        (!precioMin || producto.precio >= parseFloat(precioMin)) &&
        (!precioMax || producto.precio <= parseFloat(precioMax));
      return cumpleCategoria && cumplePrecio;
    });
  }, [productos, categoriaSeleccionada, precioMin, precioMax]);

  const handleCategoriaClick = useCallback((cod_categoria) => {
    setCategoriaSeleccionada((prev) => (prev === cod_categoria ? "" : cod_categoria));
  }, []);

  // Calcular si todas las imágenes de categorías están cargadas
  const allCategoryImagesLoaded = imagesLoaded &&
    categoriasCubitt.every(category => loadedImages[category.id]);

  return (
    <div className="py-12 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header más limpio */}
        <header className="text-center mb-16">
          <img
            src="/images/cubitt/logocubitt.webp"
            alt="Logo de Cubitt"
            className="mx-auto w-56 h-auto"
            loading="eager"
          />
        </header>

        {/* Título de categorías */}
        <h2 className="text-sm font-light tracking-widest uppercase text-gray-900 mb-8">Categorías</h2>

        {/* Contenedor de categorías modernizado */}
        <div className="overflow-x-auto scrollbar-hide mb-16">
          <div className="flex gap-4 lg:gap-6 flex-nowrap">
            {categoriasCubitt.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoriaClick(category.cod_categoria)}
                className={`group flex-none w-32 h-32 md:w-40 md:h-40 relative overflow-hidden transition-all duration-300 ${categoriaSeleccionada === category.cod_categoria ? "ring-2 ring-gray-900" : ""
                  }`}
                disabled={!loadedImages[category.id]}
              >
                {!loadedImages[category.id] && (
                  <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
                )}
                <img
                  src={category.image}
                  alt={category.title}
                  className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${!loadedImages[category.id] ? "opacity-0" : "opacity-100"
                    }`}
                  loading="lazy"
                  decoding="async"
                />
                {/* Overlay en hover */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                {/* Título */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-xs md:text-sm font-light tracking-widest uppercase text-white text-center">
                    {category.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Filtros modernizados */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12 pb-8 border-b border-gray-200">
          <h2 className="text-sm font-light tracking-widest uppercase text-gray-900">Filtrar por:</h2>

          {/* Select de categorías */}
          <select
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            className="w-full md:w-40 h-11 bg-white border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors px-4 text-sm"
          >
            <option value="">Todas las categorías</option>
            {categoriasCubitt.map((category) => (
              <option key={category.cod_categoria} value={category.cod_categoria}>
                {category.title}
              </option>
            ))}
          </select>

          {/* Inputs de precio */}
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Precio mín."
              value={precioMin}
              onChange={(e) => setPrecioMin(e.target.value)}
              onBlur={validarPrecio}
              min="0"
              className="w-28 h-11 bg-white border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors px-4 text-sm"
            />
            <input
              type="number"
              placeholder="Precio máx."
              value={precioMax}
              onChange={(e) => setPrecioMax(e.target.value)}
              onBlur={validarPrecio}
              min="0"
              className="w-28 h-11 bg-white border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors px-4 text-sm"
            />
          </div>
          {errorPrecio && <p className="text-red-600 text-xs">{errorPrecio}</p>}
        </div>

        {/* Mostrar contenido solo cuando todo esté listo */}
        {(!allCategoryImagesLoaded || loading) ? (
          <PantallaCarga />
        ) : (
          <ProductGrid productos={productosFiltrados} />
        )}
      </div>
    </div>
  );
};

export default Cubitt;