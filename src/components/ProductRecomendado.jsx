import React from "react";
import { motion } from "framer-motion"; // Importa Framer Motion
import ProductCard from "../components/ProductCard";

const ProductRecomendado = ({ productos, categoria, modeloSeleccionado, marca, cod_producto }) => {
  const modelosVistos = new Set();
  const productosLimitados = [];

  const categoriasEspecificas = ['CARG', 'CABL', 'AUDIF', 'HEP', 'MEP', 'UNI'];
  const esCategoriaEspecifica = categoriasEspecificas.includes(categoria);

  if (esCategoriaEspecifica) {
    // Filtrar productos del mismo modelo y marca
    const productosDelMismoModeloYMarca = productos.filter(
      (producto) => 
        producto.modelo === modeloSeleccionado && 
        producto.cod_marca === marca && 
        producto.cod_producto !== cod_producto
    );

    // Agregar productos del mismo modelo y marca a la lista de recomendados
    for (const producto of productosDelMismoModeloYMarca) {
      productosLimitados.push(producto);
      if (productosLimitados.length >= 4) {
        break;
      }
    }

    // Si hay menos de 4, completar con productos de la misma marca
    if (productosLimitados.length < 4) {
      const productosPorMarca = productos.filter(
        (producto) => 
          producto.cod_marca === marca && 
          producto.cod_producto !== cod_producto
      );

      for (const producto of productosPorMarca) {
        if (!productosLimitados.includes(producto)) {
          productosLimitados.push(producto);
        }
        if (productosLimitados.length >= 4) {
          break;
        }
      }
    }
  } else {
    // Para categorías no específicas
    const productosPorCategoria = productos.filter(
      (producto) => 
        producto.cod_categoria === categoria && 
        producto.modelo !== modeloSeleccionado && 
        producto.cod_producto !== cod_producto
    );

    for (const producto of productosPorCategoria) {
      if (!modelosVistos.has(producto.modelo)) {
        modelosVistos.add(producto.modelo);
        productosLimitados.push(producto);
      }
      if (productosLimitados.length >= 4) {
        break;
      }
    }

    // Si hay menos de 4, completar con productos de la misma marca
    if (productosLimitados.length < 4) {
      const productosPorMarca = productos.filter(
        (producto) => 
          producto.cod_marca === marca && 
          producto.modelo !== modeloSeleccionado && 
          producto.cod_producto !== cod_producto
      );

      for (const producto of productosPorMarca) {
        if (!modelosVistos.has(producto.modelo)) {
          modelosVistos.add(producto.modelo);
          productosLimitados.push(producto);
        }
        if (productosLimitados.length >= 4) {
          break;
        }
      }
    }
  }

  // Ordenar productosLimitados por cod_producto alfanuméricamente
  productosLimitados.sort((a, b) => a.cod_producto.localeCompare(b.cod_producto, undefined, { numeric: true, sensitivity: 'base' }));

  return (
    <div className="mt-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }} // Estado inicial: invisible y ligeramente desplazado hacia abajo
        whileInView={{ opacity: 1, y: 0 }} // Estado final: visible y en su posición original
        viewport={{ once: true, amount: 0.2 }} // La animación se activa cuando el 20% del elemento es visible
        transition={{ duration: 0.3 }} // Duración rápida (0.3 segundos)
        className="text-2xl font-bold text-gray-900 mb-4"
      >
        Productos Recomendados
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productosLimitados.map((producto, index) => {
          const coloresDisponibles = productos.filter(
            (prod) => prod.modelo === producto.modelo
          );

          // Ordenar las imágenes del producto de manera alfanumérica
          const productoConImagenesOrdenadas = {
            ...producto,
            imagenes: producto.imagenes.sort((a, b) => a.url.localeCompare(b.url, undefined, { numeric: true, sensitivity: 'base' }))
          };

          return (
            <motion.div
              key={producto.cod_producto}
              initial={{ opacity: 0, y: 20 }} // Estado inicial: invisible y ligeramente desplazado hacia abajo
              whileInView={{ opacity: 1, y: 0 }} // Estado final: visible y en su posición original
              viewport={{ once: true, amount: 0.2 }} // La animación se activa cuando el 20% del elemento es visible
              transition={{ duration: 0.3, delay: index * 0.1 }} // Duración rápida (0.3 segundos) con retardo escalonado
            >
              <ProductCard 
                product={productoConImagenesOrdenadas} 
                allProducts={coloresDisponibles}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductRecomendado;