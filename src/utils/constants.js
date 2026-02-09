// Categorías especiales que no se agrupan por modelo
export const SPECIAL_CATEGORIES = ['CARG', 'CABL', 'AUDIF', 'HEP', 'MEP', 'UNI'];

// Categorías de accesorios
export const ACCESSORY_CATEGORIES = ['CARG', 'CABL', 'AUDIF', 'HEP', 'MEP', 'UNI'];

// Categorías que no muestran precio
export const NO_PRICE_CATEGORIES = ['MEP', 'HEP', 'UNI'];

// Endpoints de la API
export const API_ENDPOINTS = {
    CUBITT: '/api/productos/cubitt',
    PERFUMES: '/api/productos/perfumes',
    ACCESORIOS: '/api/productos/accesorios',
};

// Claves para sessionStorage
export const CACHE_KEYS = {
    CUBITT: 'productosCubitt',
    PERFUMES: 'productosPerfumes',
    ACCESORIOS: 'productosAccesorios',
};

// Verificar si una categoría es especial
export const isSpecialCategory = (cod_categoria) => {
    return SPECIAL_CATEGORIES.includes(cod_categoria);
};

// Verificar si una categoría es de accesorio
export const isAccessoryCategory = (cod_categoria) => {
    return ACCESSORY_CATEGORIES.includes(cod_categoria);
};

// Verificar si una categoría debe mostrar precio
export const shouldShowPrice = (cod_categoria) => {
    return !NO_PRICE_CATEGORIES.includes(cod_categoria);
};
