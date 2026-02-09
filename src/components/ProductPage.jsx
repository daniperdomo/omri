import React, { memo } from 'react';
import { useProductFetch } from '../hooks/useProductFetch';
import { useImagePreloader } from '../hooks/useImagePreloader';
import { useProductFilters } from '../hooks/useProductFilters';
import CategoryGrid from './CategoryGrid';
import ProductFilters from './ProductFilters';
import ProductGrid from './ProductGrid';
import PantallaCarga from './PantallaCarga';

/**
 * Componente genérico para páginas de productos
 * Elimina la duplicación de código entre Cubitt, Perfumes y Accesorios
 */
const ProductPage = memo(({
    // Configuración de la página
    title,
    logoSrc,
    categories,
    apiEndpoint,
    cacheKey,

    // Opciones de filtros
    showBrandFilter = false,
    customCategoryFilter = null,
}) => {
    // Fetch de productos
    const { productos, loading } = useProductFetch(apiEndpoint, cacheKey);

    // Precarga de imágenes de categorías
    const { loadedImages, allImagesLoaded } = useImagePreloader(categories);

    // Filtros de productos
    const {
        categoriaSeleccionada,
        marcaSeleccionada,
        precioMin,
        precioMax,
        errorPrecio,
        marcasUnicas,
        productosFiltrados,
        setCategoriaSeleccionada,
        setMarcaSeleccionada,
        setPrecioMin,
        setPrecioMax,
        validarPrecio,
        handleCategoriaClick,
    } = useProductFilters(productos, { enableBrandFilter: showBrandFilter, customCategoryFilter });

    return (
        <div className="py-12 bg-white">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
                {/* Header */}
                <header className="text-center mb-16">
                    {logoSrc ? (
                        <img
                            src={logoSrc}
                            alt={`Logo de ${title}`}
                            className="mx-auto w-56 h-auto"
                            loading="eager"
                        />
                    ) : (
                        <h1 className="text-4xl font-light tracking-widest uppercase text-gray-900">
                            {title}
                        </h1>
                    )}
                </header>

                {/* Grid de categorías */}
                <CategoryGrid
                    categories={categories}
                    selectedCategory={categoriaSeleccionada}
                    onCategoryClick={handleCategoriaClick}
                    loadedImages={loadedImages}
                />

                {/* Filtros */}
                <ProductFilters
                    categories={categories}
                    categoriaSeleccionada={categoriaSeleccionada}
                    onCategoriaChange={setCategoriaSeleccionada}
                    showBrandFilter={showBrandFilter}
                    marcas={marcasUnicas}
                    marcaSeleccionada={marcaSeleccionada}
                    onMarcaChange={setMarcaSeleccionada}
                    precioMin={precioMin}
                    precioMax={precioMax}
                    onPrecioMinChange={setPrecioMin}
                    onPrecioMaxChange={setPrecioMax}
                    onPrecioBlur={validarPrecio}
                    errorPrecio={errorPrecio}
                />

                {/* Contenido */}
                {!allImagesLoaded || loading ? (
                    <PantallaCarga />
                ) : (
                    <ProductGrid productos={productosFiltrados} />
                )}
            </div>
        </div>
    );
});

ProductPage.displayName = 'ProductPage';

export default ProductPage;
