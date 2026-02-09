import React, { useState, useEffect, useRef, memo } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import NavMovil from './NavMovil'

const Nav = memo(() => {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [showSearch, setShowSearch] = useState(false)
    const [categories, setCategories] = useState([])
    const searchRef = useRef(null)
    const [click, setClick] = useState(false)

    // Efecto para detectar clics fuera de la barra de búsqueda (solo escritorio)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (window.innerWidth >= 1024 &&
                searchRef.current &&
                !searchRef.current.contains(event.target)) {
                setSearchResults([])
                setSearchTerm('')
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        fetch(`/api/productos`)
            .then(response => response.json())
            .then(data => {
                sessionStorage.setItem('searchResults', JSON.stringify(data))
            })
            .catch(error => {
                // Error handling removed for production
            })

        fetch(`/api/categoria`)
            .then(response => response.json())
            .then(data => {
                setCategories(data)
            })
            .catch(error => {
                // Error handling removed for production
            })
    }, [])

    const handleSearchChange = (e) => {
        const value = e.target.value
        setSearchTerm(value)

        if (!value) {
            setSearchResults([])
            return
        }

        const cachedResults = sessionStorage.getItem('searchResults')
        if (cachedResults) {
            const results = JSON.parse(cachedResults)

            const filteredResults = results.filter(product =>
                product.nombre.toLowerCase().includes(value.toLowerCase()) ||
                product.modelo.toLowerCase().includes(value.toLowerCase())
            )

            const filteredCategories = categories.filter(category =>
                category.descripcion.toLowerCase().includes(value.toLowerCase())
            )

            const uniqueCategoryCodes = new Set(filteredCategories.map(category => category.cod_categoria))

            const productsFromCategories = results.filter(product =>
                uniqueCategoryCodes.has(product.cod_categoria)
            )

            const combinedResults = [...filteredResults, ...productsFromCategories]

            const uniqueResults = []
            const seenNames = new Set()

            combinedResults.forEach(product => {
                if (!seenNames.has(product.nombre)) {
                    seenNames.add(product.nombre)
                    uniqueResults.push(product)
                }
            })

            setSearchResults(uniqueResults)
        }
    }

    const handleLogoClick = () => {
        setShowSearch(false)
        setClick(false)
        setSearchResults([])
        setSearchTerm('')
    }

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between h-24">
                    {/* Logo - Izquierda */}
                    <div className="flex-shrink-0">
                        <Link to="/" onClick={handleLogoClick}>
                            <img
                                src="/images/logofondoblanco.webp"
                                alt="Logo"
                                className="h-24 w-auto cursor-pointer"
                                loading="eager"
                            />
                        </Link>
                    </div>

                    {/* Navegación - Centro (Desktop) */}
                    <div className="hidden lg:flex flex-1 justify-center">
                        <ul className="flex gap-8 text-lg font-normal text-gray-700">
                            <Link to="/" onClick={handleLogoClick}>
                                <li className="relative group hover:text-color-hover transition cursor-pointer">
                                    <span>Inicio</span>
                                    <span className="absolute left-0 bottom-[-34px] w-full h-0.5 bg-color-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </li>
                            </Link>
                            <Link to="/cubitt" onClick={handleLogoClick}>
                                <li className="relative group hover:text-color-hover transition cursor-pointer">
                                    <span>Cubitt</span>
                                    <span className="absolute left-0 bottom-[-34px] w-full h-0.5 bg-color-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </li>
                            </Link>
                            <Link to="/perfumes" onClick={handleLogoClick}>
                                <li className="relative group hover:text-color-hover transition cursor-pointer">
                                    <span>Perfumes</span>
                                    <span className="absolute left-0 bottom-[-34px] w-full h-0.5 bg-color-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </li>
                            </Link>
                            <Link to="/accesorios" onClick={handleLogoClick}>
                                <li className="relative group hover:text-color-hover transition cursor-pointer">
                                    <span>Accesorios</span>
                                    <span className="absolute left-0 bottom-[-34px] w-full h-0.5 bg-color-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </li>
                            </Link>
                            <Link to="/nosotros" onClick={handleLogoClick}>
                                <li className="relative group hover:text-color-hover transition cursor-pointer">
                                    <span>Nosotros</span>
                                    <span className="absolute left-0 bottom-[-34px] w-full h-0.5 bg-color-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </li>
                            </Link>
                        </ul>
                    </div>

                    {/* Búsqueda - Derecha (Desktop) */}
                    <div className="hidden lg:flex flex-shrink-0" ref={searchRef}>
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="pl-10 pr-4 py-2 bg-gray-100 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm text-gray-700 placeholder-gray-400 w-64"
                            />
                            {searchTerm && searchResults.length > 0 && (
                                <div className="absolute z-50 bg-white border border-gray-200 mt-2 w-full rounded-xl shadow-lg overflow-hidden">
                                    <ul>
                                        {searchResults.slice(0, 4).map(product => (
                                            <li key={product.cod_producto} className="hover:bg-gray-50 transition">
                                                <Link
                                                    to={`/producto/${product.cod_producto}`}
                                                    onClick={() => {
                                                        setSearchTerm('')
                                                        setSearchResults([])
                                                    }}
                                                >
                                                    <div className="flex items-center p-3">
                                                        <img
                                                            src={product.imagenes[0]?.url}
                                                            alt={product.nombre}
                                                            className="h-12 w-12 mr-3 object-contain rounded-lg"
                                                            loading="lazy"
                                                            decoding="async"
                                                        />
                                                        <span className="text-sm text-gray-700">{product.nombre}</span>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Navbar para móviles */}
                    <NavMovil
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        searchResults={searchResults}
                        setSearchResults={setSearchResults}
                        showSearch={showSearch}
                        setShowSearch={setShowSearch}
                        handleSearchChange={handleSearchChange}
                        click={click}
                        setClick={setClick}
                    />
                </div>
            </div>
        </nav>
    )
})

Nav.displayName = 'Nav'

export default Nav
