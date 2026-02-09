import { useState, useMemo, useCallback } from 'react';

/**
 * Hook personalizado para filtrado de productos
 * @param {Array} productos - Array de productos
 * @param {Object} options - Opciones de configuración
 * @returns {Object} Estado y funciones de filtrado
 */
export const useProductFilters = (productos, options = {}) => {
    const { enableBrandFilter = false, customCategoryFilter = null } = options;

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
    const [precioMin, setPrecioMin] = useState('');
    const [precioMax, setPrecioMax] = useState('');
    const [errorPrecio, setErrorPrecio] = useState('');

    // Validar rango de precios
    const validarPrecio = useCallback(() => {
        if (precioMin && precioMax && parseFloat(precioMin) > parseFloat(precioMax)) {
            setErrorPrecio('El precio mínimo no puede ser mayor que el máximo.');
            return false;
        }
        if ((precioMin && isNaN(precioMin)) || (precioMax && isNaN(precioMax))) {
            setErrorPrecio('Los precios deben ser números válidos.');
            return false;
        }
        setErrorPrecio('');
        return true;
    }, [precioMin, precioMax]);

    // Obtener marcas únicas
    const marcasUnicas = useMemo(() => {
        if (!enableBrandFilter) return [];
        return [...new Set(productos.map((producto) => producto.cod_marca))];
    }, [productos, enableBrandFilter]);

    // Filtrar productos
    const productosFiltrados = useMemo(() => {
        return productos.filter((producto) => {
            // Filtro de categoría
            let cumpleCategoria = !categoriaSeleccionada;
            if (categoriaSeleccionada) {
                if (customCategoryFilter) {
                    cumpleCategoria = customCategoryFilter(producto, categoriaSeleccionada);
                } else {
                    cumpleCategoria = producto.cod_categoria === categoriaSeleccionada;
                }
            }

            // Filtro de marca
            const cumpleMarca = !marcaSeleccionada || producto.cod_marca === marcaSeleccionada;

            // Filtro de precio
            const cumplePrecio =
                (!precioMin || producto.precio >= parseFloat(precioMin)) &&
                (!precioMax || producto.precio <= parseFloat(precioMax));

            return cumpleCategoria && cumpleMarca && cumplePrecio;
        });
    }, [productos, categoriaSeleccionada, marcaSeleccionada, precioMin, precioMax, customCategoryFilter]);

    // Ordenar productos por marca
    const productosOrdenados = useMemo(() => {
        return [...productosFiltrados].sort((a, b) => {
            if (a.cod_marca < b.cod_marca) return -1;
            if (a.cod_marca > b.cod_marca) return 1;
            return 0;
        });
    }, [productosFiltrados]);

    // Handler para click en categoría
    const handleCategoriaClick = useCallback((cod_categoria) => {
        setCategoriaSeleccionada((prev) => (prev === cod_categoria ? '' : cod_categoria));
    }, []);

    // Reset de filtros
    const resetFilters = useCallback(() => {
        setCategoriaSeleccionada('');
        setMarcaSeleccionada('');
        setPrecioMin('');
        setPrecioMax('');
        setErrorPrecio('');
    }, []);

    return {
        // Estados
        categoriaSeleccionada,
        marcaSeleccionada,
        precioMin,
        precioMax,
        errorPrecio,
        marcasUnicas,
        productosFiltrados: productosOrdenados,

        // Setters
        setCategoriaSeleccionada,
        setMarcaSeleccionada,
        setPrecioMin,
        setPrecioMax,

        // Funciones
        validarPrecio,
        handleCategoriaClick,
        resetFilters,
    };
};
