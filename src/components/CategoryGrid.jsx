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
            <h2 className="text-sm font-normal tracking-widest uppercase text-gray-500 mb-6">
                Categorías
            </h2>

            {/* Contenedor de categorías */}
            <div className="mb-16">
                <div className="flex gap-4 lg:gap-5 justify-center flex-wrap">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => onCategoryClick(category.cod_categoria)}
                            className={`group flex-none w-40 h-32 md:w-48 md:h-36 relative overflow-hidden rounded-xl transition-all duration-300 ${selectedCategory === category.cod_categoria
                                ? 'ring-2 ring-gray-900 ring-offset-2'
                                : 'hover:shadow-lg'
                                }`}
                            disabled={!loadedImages[category.id]}
                        >
                            {/* Loading placeholder */}
                            {!loadedImages[category.id] && (
                                <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-xl" />
                            )}

                            {/* Imagen de categoría */}
                            <img
                                src={category.image}
                                alt={category.title}
                                className={`w-full h-full object-cover transition-all duration-500 ${!loadedImages[category.id] ? 'opacity-0' : 'opacity-100'
                                    }`}
                                loading="lazy"
                                decoding="async"
                            />

                            {/* Overlay oscuro permanente */}
                            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-all duration-300" />

                            {/* Título centrado */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-sm md:text-base font-bold tracking-wider uppercase text-white text-center px-4">
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
