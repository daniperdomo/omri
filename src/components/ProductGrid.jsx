import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const ProductGrid = memo(({ productos }) => {
  // Función para determinar si la categoría es CARG, CABL o AUDIF
  const isSpecialCategory = (cod_categoria) => {
    return cod_categoria === "CARG" || cod_categoria === "CABL" || cod_categoria === "AUDIF" || cod_categoria === "HEP" || cod_categoria === "MEP" || cod_categoria === "UNI";
  };

  // Memoize expensive computations
  const productosAgrupados = useMemo(() => {
    // Ordenar los productos
    const productosOrdenados = [...productos].sort((a, b) => {
      if (isSpecialCategory(a.cod_categoria) && isSpecialCategory(b.cod_categoria)) {
        // Si ambos son de categorías especiales, ordenar por cod_marca y luego por cod_producto
        if (a.cod_marca < b.cod_marca) return -1;
        if (a.cod_marca > b.cod_marca) return 1;
        return a.cod_producto.localeCompare(b.cod_producto, undefined, { numeric: true, sensitivity: 'base' });
      }
      // Si solo a es de categoría especial
      if (isSpecialCategory(a.cod_categoria)) return -1;
      // Si solo b es de categoría especial
      if (isSpecialCategory(b.cod_categoria)) return 1;
      // Si ninguno es de categoría especial, ordenar solo por cod_producto
      return a.cod_producto.localeCompare(b.cod_producto, undefined, { numeric: true, sensitivity: 'base' });
    });

    // Agrupar productos por modelo, excepto para categorías CARG, CABL y AUDIF
    return productosOrdenados.reduce((acc, product) => {
      if (isSpecialCategory(product.cod_categoria)) {
        // Para categorías especiales, crear una entrada por cod_producto
        const key = product.cod_producto;
        acc[key] = [product];
      } else {
        // Para otras categorías, agrupar por modelo
        const key = `${product.cod_categoria}-${product.modelo}`;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(product);
      }
      return acc;
    }, {});
  }, [productos]);

  return (
    <div>
      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Object.keys(productosAgrupados).map((key) => {
          const productosDelGrupo = productosAgrupados[key];
          const primerProducto = productosDelGrupo[0];

          // Ordenar las imágenes del primer producto
          const productoConImagenesOrdenadas = {
            ...primerProducto,
            imagenes: primerProducto.imagenes.sort((a, b) => a.url.localeCompare(b.url))
          };

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <ProductCard
                product={productoConImagenesOrdenadas}
                allProducts={productosDelGrupo}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
});

ProductGrid.displayName = 'ProductGrid';

export default ProductGrid;
