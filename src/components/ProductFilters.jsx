import React, { memo } from 'react';

/**
 * Componente reutilizable para filtros de productos
 */
const ProductFilters = memo(({
    // Categorías
    categories,
    categoriaSeleccionada,
    onCategoriaChange,

    // Marcas (opcional)
    showBrandFilter = false,
    marcas = [],
    marcaSeleccionada = '',
    onMarcaChange,

    // Precios
    precioMin,
    precioMax,
    onPrecioMinChange,
    onPrecioMaxChange,
    onPrecioBlur,
    errorPrecio = '',
}) => {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12 pb-8 border-b border-gray-200">
            <h2 className="text-sm font-light tracking-widest uppercase text-gray-900">
                Filtrar por:
            </h2>

            {/* Select de categorías */}
            <select
                value={categoriaSeleccionada}
                onChange={(e) => onCategoriaChange(e.target.value)}
                className="w-full md:w-40 h-11 bg-white border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors px-4 text-sm"
            >
                <option value="">Todas las categorías</option>
                {categories.map((category) => (
                    <option key={category.cod_categoria} value={category.cod_categoria}>
                        {category.title}
                    </option>
                ))}
            </select>

            {/* Select de marcas (opcional) */}
            {showBrandFilter && (
                <select
                    value={marcaSeleccionada}
                    onChange={(e) => onMarcaChange(e.target.value)}
                    className="w-full md:w-32 h-11 bg-white border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors px-4 text-sm"
                >
                    <option value="">Todas las marcas</option>
                    {marcas.map((marca) => (
                        <option key={marca} value={marca}>
                            {marca}
                        </option>
                    ))}
                </select>
            )}

            {/* Inputs de precio */}
            <div className="flex flex-col gap-2">
                <div className="flex gap-3">
                    <input
                        type="number"
                        placeholder="Precio mín."
                        value={precioMin}
                        onChange={(e) => onPrecioMinChange(e.target.value)}
                        onBlur={onPrecioBlur}
                        min="0"
                        className="w-28 h-11 bg-white border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors px-4 text-sm"
                    />
                    <input
                        type="number"
                        placeholder="Precio máx."
                        value={precioMax}
                        onChange={(e) => onPrecioMaxChange(e.target.value)}
                        onBlur={onPrecioBlur}
                        min="0"
                        className="w-28 h-11 bg-white border border-gray-300 focus:border-gray-900 focus:outline-none transition-colors px-4 text-sm"
                    />
                </div>
                {errorPrecio && (
                    <p className="text-red-600 text-xs">{errorPrecio}</p>
                )}
            </div>
        </div>
    );
});

ProductFilters.displayName = 'ProductFilters';

export default ProductFilters;
