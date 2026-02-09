import React from "react";
import categoriasPerfumes from "../jsons/categoriasPerfumes.json";
import ProductPage from "../components/ProductPage";
import { API_ENDPOINTS, CACHE_KEYS } from "../utils/constants";

const Perfumes = () => {
  // Filtro personalizado para manejar la categoría UNI
  const customCategoryFilter = (producto, categoriaSeleccionada) => {
    return (
      producto.cod_categoria === categoriaSeleccionada ||
      ((categoriaSeleccionada === "HEP" || categoriaSeleccionada === "MEP") &&
        producto.cod_categoria === "UNI")
    );
  };

  return (
    <ProductPage
      title="Perfumes"
      categories={categoriasPerfumes}
      apiEndpoint={API_ENDPOINTS.PERFUMES}
      cacheKey={CACHE_KEYS.PERFUMES}
      showBrandFilter={true}
      customCategoryFilter={customCategoryFilter}
    />
  );
};

export default Perfumes;