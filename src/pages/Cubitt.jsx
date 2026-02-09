import React from "react";
import categoriasCubitt from "../jsons/categoriasCubitt.json";
import ProductPage from "../components/ProductPage";
import { API_ENDPOINTS, CACHE_KEYS } from "../utils/constants";

const Cubitt = () => {
  return (
    <ProductPage
      title="Cubitt"
      logoSrc="/images/cubitt/logocubitt.webp"
      categories={categoriasCubitt}
      apiEndpoint={API_ENDPOINTS.CUBITT}
      cacheKey={CACHE_KEYS.CUBITT}
      showBrandFilter={false}
    />
  );
};

export default Cubitt;