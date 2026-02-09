import { useState, useEffect } from 'react';

/**
 * Hook personalizado para fetching y caché de productos
 * @param {string} apiEndpoint - Endpoint de la API
 * @param {string} cacheKey - Clave para sessionStorage
 * @returns {Object} { productos, loading, error, refetch }
 */
export const useProductFetch = (apiEndpoint, cacheKey) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProductos = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(apiEndpoint);
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            const data = await response.json();
            setProductos(data);
            sessionStorage.setItem(cacheKey, JSON.stringify(data));
        } catch (err) {
            console.error('Error leyendo productos:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const productosGuardados = sessionStorage.getItem(cacheKey);
        if (productosGuardados) {
            try {
                setProductos(JSON.parse(productosGuardados));
                setLoading(false);
            } catch (err) {
                console.error('Error parseando productos del caché:', err);
                fetchProductos();
            }
        } else {
            fetchProductos();
        }
    }, [apiEndpoint, cacheKey]);

    return { productos, loading, error, refetch: fetchProductos };
};
