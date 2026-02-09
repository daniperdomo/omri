import React from "react";
import categoriasAccesorios from "../jsons/categoriasAccesorios.json";
import ProductPage from "../components/ProductPage";
import { API_ENDPOINTS, CACHE_KEYS } from "../utils/constants";

const Accesorios = () => {
  return (
    <ProductPage
      title="Accesorios"
      categories={categoriasAccesorios}
      apiEndpoint={API_ENDPOINTS.ACCESORIOS}
      cacheKey={CACHE_KEYS.ACCESORIOS}
      showBrandFilter={true}
    />
  );
};

export default Accesorios;