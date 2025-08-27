import React, { useState, useEffect } from "react";
import categoriasCubitt from "../jsons/categoriasCubitt.json";
import ProductGrid from "../components/ProductGrid";
import { debounce } from "lodash";
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

  const aplicarFiltros = () => {
    const productosFiltrados = productos.filter((producto) => {
      const cumpleCategoria = !categoriaSeleccionada || producto.cod_categoria === categoriaSeleccionada;
      const cumplePrecio =
        (!precioMin || producto.precio >= parseFloat(precioMin)) &&
        (!precioMax || producto.precio <= parseFloat(precioMax));
      return cumpleCategoria && cumplePrecio;
    });

    return productosFiltrados;
  };

  const aplicarFiltrosDebounced = debounce(aplicarFiltros, 300);

  useEffect(() => {
    aplicarFiltrosDebounced();
  }, [categoriaSeleccionada, precioMin, precioMax]);

  const productosFiltrados = aplicarFiltros();

  const handleCategoriaClick = (cod_categoria) => {
    setCategoriaSeleccionada((prev) => (prev === cod_categoria ? "" : cod_categoria));
  };

  // Calcular si todas las imágenes de categorías están cargadas
  const allCategoryImagesLoaded = imagesLoaded && 
    categoriasCubitt.every(category => loadedImages[category.id]);

  return (
    <div className="py-8 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-6">
          <img
            src="/images/cubitt/logocubitt.webp"
            alt="Logo de Cubitt"
            className="mx-auto w-48 h-auto"
            loading="eager" // Cargar inmediatamente al ser importante
          />
        </header>

        <h2 style={{ fontFamily: 'Amblas, sans-serif' }} className="text-2xl text-gray-700 mb-6 text-left">Categorías</h2>

        {/* Contenedor de categorías con placeholders de carga */}
        <div className="overflow-x-auto scrollbar-hide whitespace-nowrap mb-12 lg:overflow-x-visible lg:whitespace-normal">
          <div className="inline-flex space-x-4 lg:flex lg:flex-nowrap lg:space-x-4">
            {categoriasCubitt.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoriaClick(category.cod_categoria)}
                className={`flex-none w-32 h-32 md:w-48 md:h-48 relative rounded-lg overflow-hidden shadow-md transform transition-all duration-300 md:hover:scale-105 hover:shadow-lg hover:z-20 ${
                  categoriaSeleccionada === category.cod_categoria ? "ring-4 ring-color-hover z-10" : "z-0"
                }`}
                disabled={!loadedImages[category.id]} // Deshabilitar botón mientras carga
              >
                {!loadedImages[category.id] && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                )}
                <img
                  src={category.image}
                  alt={category.title}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    !loadedImages[category.id] ? "opacity-0" : "opacity-100"
                  }`}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-center">
                  <h3 
                    style={{ fontFamily: 'Amblas, sans-serif' }} 
                    className="text-sm md:text-lg font-bold text-white text-center"
                  >
                    {category.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
          <h2 className="text-xl text-gray-700">Filtrar por:</h2>

          {/* Select de categorías */}
          <select
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            className="w-full md:w-32 h-10 bg-white border border-black rounded-lg shadow-md px-2"
          >
            <option value="">Categoría</option>
            {categoriasCubitt.map((category) => (
              <option key={category.cod_categoria} value={category.cod_categoria}>
                {category.title}
              </option>
            ))}
          </select>

          {/* Inputs de precio */}
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="$-Min"
              value={precioMin}
              onChange={(e) => setPrecioMin(e.target.value)}
              onBlur={validarPrecio}
              min="0"
              className="w-24 h-10 bg-white border border-black rounded-lg shadow-md px-2"
            />
            <input
              type="number"
              placeholder="$-Max"
              value={precioMax}
              onChange={(e) => setPrecioMax(e.target.value)}
              onBlur={validarPrecio}
              min="0"
              className="w-24 h-10 bg-white border border-black rounded-lg shadow-md px-2"
            />
          </div>
          {errorPrecio && <p className="text-red-500 text-sm">{errorPrecio}</p>}
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