import React, { useState, useEffect } from "react";
import categoriasPerfumes from "../jsons/categoriasPerfumes.json";
import ProductGrid from "../components/ProductGrid";
import PantallaCarga from "../components/PantallaCarga";

const Perfumes = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});

  // Precargar imágenes de categorías
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = categoriasPerfumes.map((category) => {
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

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/productos/perfumes`);
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      const data = await response.json();
      setProductos(data);
      sessionStorage.setItem("productosPerfumes", JSON.stringify(data));
    } catch (error) {
      console.error("Error leyendo productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const productosGuardados = sessionStorage.getItem("productosPerfumes");
    if (productosGuardados) {
      setProductos(JSON.parse(productosGuardados));
      setLoading(false);
    } else {
      fetchProductos();
    }
  }, []);

  const marcasUnicas = [...new Set(productos.map((producto) => producto.cod_marca))];

  const productosFiltrados = productos.filter((producto) => {
    const cumpleCategoria = !categoriaSeleccionada ||
      producto.cod_categoria === categoriaSeleccionada ||
      (
        (categoriaSeleccionada === "HEP" || categoriaSeleccionada === "MEP") &&
        producto.cod_categoria === "UNI"
      );

    const cumpleMarca = !marcaSeleccionada || producto.cod_marca === marcaSeleccionada;
    const cumplePrecio =
      (!precioMin || producto.precio >= parseFloat(precioMin)) &&
      (!precioMax || producto.precio <= parseFloat(precioMax));
    return cumpleCategoria && cumpleMarca && cumplePrecio;
  });

  // Ordenar productos filtrados por marca
  const productosOrdenados = [...productosFiltrados].sort((a, b) => {
    if (a.cod_marca < b.cod_marca) return -1;
    if (a.cod_marca > b.cod_marca) return 1;
    return 0;
  });

  const handleCategoriaClick = (cod_categoria) => {
    setCategoriaSeleccionada((prev) => (prev === cod_categoria ? "" : cod_categoria));
  };

  // Calcular si todas las imágenes de categorías están cargadas
  const allCategoryImagesLoaded = imagesLoaded &&
    categoriasPerfumes.every(category => loadedImages[category.id]);

  return (
    <div className="py-12 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header más limpio */}
        <header className="text-center mb-16">
          <h1 className="text-4xl font-light tracking-widest uppercase text-gray-900">Perfumes</h1>
        </header>

        {/* Título de categorías */}
        <h2 className="text-sm font-light tracking-widest uppercase text-gray-900 mb-8">Categorías</h2>

        {/* Contenedor de categorías modernizado */}
        <div className="overflow-x-auto scrollbar-hide mb-16">
          <div className="flex gap-4 lg:gap-6 flex-nowrap">
            {categoriasPerfumes.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoriaClick(category.cod_categoria)}
                className={`group flex-none w-32 h-32 md:w-40 md:h-40 relative overflow-hidden transition-all duration-300 ${categoriaSeleccionada === category.cod_categoria ? "ring-2 ring-gray-900" : ""
                  }`}
                disabled={!loadedImages[category.id]}
              >
                {!loadedImages[category.id] && (
                  <div className="absolute inset-0 bg-gray-100 animate-pulse" />
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

          <select
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            className="w-full md:w-40 h-11 bg-white border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors px-4 text-sm"
          >
            <option value="">Todas las categorías</option>
            {categoriasPerfumes.map((category) => (
              <option key={category.cod_categoria} value={category.cod_categoria}>
                {category.title}
              </option>
            ))}
          </select>

          <select
            value={marcaSeleccionada}
            onChange={(e) => setMarcaSeleccionada(e.target.value)}
            className="w-full md:w-32 h-11 bg-white border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors px-4 text-sm"
          >
            <option value="">Todas las marcas</option>
            {marcasUnicas.map((marca) => (
              <option key={marca} value={marca}>
                {marca}
              </option>
            ))}
          </select>

          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Precio mín."
              value={precioMin}
              onChange={(e) => setPrecioMin(e.target.value)}
              min="0"
              className="w-28 h-11 bg-white border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors px-4 text-sm"
            />
            <input
              type="number"
              placeholder="Precio máx."
              value={precioMax}
              onChange={(e) => setPrecioMax(e.target.value)}
              min="0"
              className="w-28 h-11 bg-white border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors px-4 text-sm"
            />
          </div>
        </div>

        {/* Mostrar contenido solo cuando todo esté listo */}
        {(!allCategoryImagesLoaded || loading) ? (
          <PantallaCarga />
        ) : (
          <ProductGrid productos={productosOrdenados} />
        )}
      </div>
    </div>
  );
};

export default Perfumes;