import React, { memo } from 'react';

/**
 * Componente reutilizable para mostrar grid de categorías
 */
const CategoryGrid = memo(({
    categories,
    selectedCategory,
    onCategoryClick,
    loadedImages
}) => {
    return (
        <>
            {/* Título de categorías */}
            <h2 className="text-sm font-light tracking-widest uppercase text-gray-900 mb-8">
                Categorías
            </h2>

            {/* Contenedor de categorías */}
            <div className="overflow-x-auto scrollbar-hide mb-16">
                <div className="flex gap-4 lg:gap-6 flex-nowrap">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => onCategoryClick(category.cod_categoria)}
                            className={`group flex-none w-32 h-32 md:w-40 md:h-40 relative overflow-hidden transition-all duration-300 ${selectedCategory === category.cod_categoria
                                    ? 'ring-2 ring-gray-900'
                                    : ''
                                }`}
                            disabled={!loadedImages[category.id]}
                        >
                            {/* Loading placeholder */}
                            {!loadedImages[category.id] && (
                                <div className="absolute inset-0 bg-gray-100 animate-pulse" />
                            )}

                            {/* Imagen de categoría */}
                            <img
                                src={category.image}
                                alt={category.title}
                                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${!loadedImages[category.id] ? 'opacity-0' : 'opacity-100'
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
        </>
    );
});

CategoryGrid.displayName = 'CategoryGrid';

export default CategoryGrid;
