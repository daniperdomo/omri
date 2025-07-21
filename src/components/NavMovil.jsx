import React, { useState, useRef, useEffect } from 'react'
import { FaTimes, FaBars, FaSearch, FaChevronRight, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Importa la imagen que deseas usar en el mini footer
import logoImage from '/images/isotipofondoblanco.webp' // Cambia esto por la ruta correcta

const NavMovil = ({ 
    searchTerm, 
    setSearchTerm, 
    searchResults, 
    setSearchResults, 
    showSearch, 
    setShowSearch, 
    handleSearchChange, 
    click, 
    setClick 
}) => {
    const searchRef = useRef(null)
    const menuRef = useRef(null)
    const location = useLocation()

    const handleClick = () => {
        setClick(!click) 
        setShowSearch(false)
    }

    const handleSearchClick = () => {
        setShowSearch(!showSearch)
        setClick(false) // Cerrar el menú hamburguesa al abrir la lupa
    }

    const menuVariants = {
        hidden: { x: '100%' },
        visible: { x: 0 },
    }

    const searchVariants = {
        hidden: { x: '100%' },
        visible: { x: 0 },
    }

    // Deshabilitar el desplazamiento del fondo cuando el menú está abierto
    useEffect(() => {
        if (click || showSearch) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [click, showSearch])

    // URLs de Instagram y WhatsApp
    const instagramUrl = "https://www.instagram.com/omrivzla/" // Cambia esto por tu URL de Instagram
    const whatsappNumber = "+5804249370299"
    const whatsappMessage = `¡Hola!, quisiera saber más información acerca de los productos.`

    return (
        <>
            {/* Botones de búsqueda y menú burger */}
            <div className="block lg:hidden items-center">
                <button
                    className="text-2xl mr-4"
                    onClick={handleSearchClick}
                >
                    <motion.div
                        animate={showSearch ? { rotate: 90 } : { rotate: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        {showSearch ? <FaTimes /> : <FaSearch />}
                    </motion.div>
                </button>
                <button
                    className="transition text-2xl"
                    onClick={handleClick} // Usar handleClick para alternar el menú
                >
                    <motion.div
                        animate={click ? { rotate: 90 } : { rotate: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        {click ? <FaTimes /> : <FaBars />}
                    </motion.div>
                </button>
            </div>

            {/* Barra de búsqueda para móviles */}
            <AnimatePresence>
                {showSearch && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={searchVariants}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed top-20 right-0 h-[calc(100vh-5rem)] w-full bg-white shadow-lg z-50 overflow-y-auto"
                    >
                        <div className="relative w-full px-4 py-4">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-color-hover text-black w-full"
                            />
                            <FaSearch className="absolute right-7 top-7 text-gray-400" />
                            {searchTerm && searchResults.length > 0 && (
                                <div className="mt-4 w-full">
                                    <ul className="w-full space-y-2">
                                        {searchResults.slice(0, 4).map(product => (
                                            <li key={product.cod_producto} className="w-full">
                                                <Link
                                                    to={`/producto/${product.cod_producto}`}
                                                    onClick={() => {
                                                        setSearchTerm('')
                                                        setSearchResults([])
                                                        setShowSearch(false) // Cerrar la lupa al seleccionar un producto
                                                    }}
                                                    className="w-full"
                                                >
                                                    <div className="flex items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                                        <img 
                                                            src={product.imagenes[0]?.url} 
                                                            alt={product.nombre} 
                                                            className="h-16 w-16 object-cover rounded-lg"
                                                        />
                                                        <div className="ml-4 flex-1 min-w-0">
                                                            <span className="text-lg font-medium truncate">{product.nombre}</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Menú Burger con animación */}
            <AnimatePresence>
                {click && (
                    <motion.div
                        ref={menuRef}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={menuVariants}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed top-20 right-0 h-[calc(100vh-5rem)] w-full bg-white shadow-lg z-50 overflow-y-auto"
                    >
                        <ul className="flex flex-col items-start p-6 gap-6">
                            <Link to="/" onClick={() => { setClick(false) }} className="w-full">
                                <li className={`relative group transition cursor-pointer flex justify-between items-center w-full p-3 rounded-lg ${
                                    location.pathname === '/' ? 'bg-color-hover bg-opacity-20' : 'hover:bg-color-hover hover:bg-opacity-20'
                                }`}>
                                    <span className="text-xl">Inicio</span>
                                    <FaChevronRight className="text-xl text-gray-400" />
                                </li>
                            </Link>
                            <Link to="/cubitt" onClick={() => { setClick(false) }} className="w-full">
                                <li className={`relative group transition cursor-pointer flex justify-between items-center w-full p-3 rounded-lg ${
                                    location.pathname === '/cubitt' ? 'bg-color-hover bg-opacity-20' : 'hover:bg-color-hover hover:bg-opacity-20'
                                }`}>
                                    <span className="text-xl">Cubitt</span>
                                    <FaChevronRight className="text-xl text-gray-400" />
                                </li>
                            </Link>
                            <Link to="/perfumes" onClick={() => { setClick(false) }} className="w-full">
                                <li className={`relative group transition cursor-pointer flex justify-between items-center w-full p-3 rounded-lg ${
                                    location.pathname === '/perfumes' ? 'bg-color-hover bg-opacity-20' : 'hover:bg-color-hover hover:bg-opacity-20'
                                }`}>
                                    <span className="text-xl">Perfumes</span>
                                    <FaChevronRight className="text-xl text-gray-400" />
                                </li>
                            </Link>
                            <Link to="/accesorios" onClick={() => { setClick(false) }} className="w-full">
                                <li className={`relative group transition cursor-pointer flex justify-between items-center w-full p-3 rounded-lg ${
                                    location.pathname === '/accesorios' ? 'bg-color-hover bg-opacity-20' : 'hover:bg-color-hover hover:bg-opacity-20'
                                }`}>
                                    <span className="text-xl">Accesorios</span>
                                    <FaChevronRight className="text-xl text-gray-400" />
                                </li>
                            </Link>
                            <Link to="/nosotros" onClick={() => { setClick(false) }} className="w-full">
                                <li className={`relative group transition cursor-pointer flex justify-between items-center w-full p-3 rounded-lg ${
                                    location.pathname === '/nosotros' ? 'bg-color-hover bg-opacity-20' : 'hover:bg-color-hover hover:bg-opacity-20'
                                }`}>
                                    <span className="text-xl">Nosotros</span>
                                    <FaChevronRight className="text-xl text-gray-400" />
                                </li>
                            </Link>
                        </ul>

                        {/* Mini Footer con íconos de Instagram, WhatsApp y una imagen */}
                        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 flex justify-center items-center gap-6">
                            {/* Imagen a la izquierda */}
                            <img
                                src={logoImage} // Ruta de la imagen
                                alt="Logo"
                                className="h-8 w-8 object-cover" // Ajusta el tamaño según sea necesario
                            />
                            <a
                                href={instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-2xl text-black hover:text-color-hover transition"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-2xl text-black hover:text-color-hover transition"
                            >
                                <FaWhatsapp />
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default NavMovil