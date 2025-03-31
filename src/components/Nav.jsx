import React, { useState, useEffect, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import NavMovil from './NavMovil'

const Nav = () => {
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
                console.error('Error fetching products:', error)
            })

        fetch(`/api/categoria`)
            .then(response => response.json())
            .then(data => {
                setCategories(data)
            })
            .catch(error => {
                console.error('Error fetching categorias:', error)
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
        <nav className="bg-white shadow-lg top-0 left-0 w-full z-50">
            <div className="h-20 flex justify-between items-center z-50 text-black lg:py-5 px-10 sm:px-6">
                <div className="flex items-center flex-1">
                    <Link to="/" onClick={handleLogoClick}>
                        <img
                            src="/images/logofondoblanco.webp"
                            alt="Logo"
                            className="h-24 w-auto md:h-20 lg:h-32 cursor-pointer"
                        />
                    </Link>
                </div>

                <div className="flex items-center justify-end font-normal">
                    {/* Navbar para PC */}
                    <div className="hidden lg:flex">
                        <ul className="flex gap-8 mr-16 text-lg">
                            <Link to="/" onClick={handleLogoClick}>
                                <li className="relative group hover:text-color-hover transition cursor-pointer">
                                    <span>Inicio</span>
                                    <span className="absolute left-0 bottom-[-26px] w-full h-0.5 bg-color-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </li>
                            </Link>
                            <Link to="/cubitt" onClick={handleLogoClick}>
                                <li className="relative group hover:text-color-hover transition cursor-pointer">
                                    <span>Cubitt</span>
                                    <span className="absolute left-0 bottom-[-26px] w-full h-0.5 bg-color-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </li>
                            </Link>
                            <Link to="/accesorios" onClick={handleLogoClick}>
                                <li className="relative group hover:text-color-hover transition cursor-pointer">
                                    <span>Accesorios</span>
                                    <span className="absolute left-0 bottom-[-26px] w-full h-0.5 bg-color-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </li>
                            </Link>
                            <Link to="/nosotros" onClick={handleLogoClick}>
                                <li className="relative group hover:text-color-hover transition cursor-pointer">
                                    <span>Nosotros</span>
                                    <span className="absolute left-0 bottom-[-26px] w-full h-0.5 bg-color-hover transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </li>
                            </Link>
                        </ul>
                    </div>

                    {/* Barra de búsqueda para PC */}
                    <div className="hidden lg:flex items-center ml-4 mr-4" ref={searchRef}>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-color-hover text-black w-48 md:w-64"
                            />
                            <FaSearch className="absolute right-3 top-3 text-gray-400" />
                            {searchTerm && searchResults.length > 0 && (
                                <div className="absolute z-50 bg-white border border-gray-300 mt-1 w-full rounded-lg shadow-lg">
                                    <ul>
                                        {searchResults.slice(0, 4).map(product => (
                                            <li key={product.cod_producto} className="p-4 hover:bg-gray-100 flex items-center">
                                                <Link
                                                    to={`/producto/${product.cod_producto}`}
                                                    onClick={() => {
                                                        setSearchTerm('')
                                                        setSearchResults([])
                                                    }}
                                                >
                                                    <div className="flex items-center">
                                                        <img 
                                                            src={product.imagenes[0]?.url} 
                                                            alt={product.nombre} 
                                                            className="h-16 w-16 mr-4 object-cover rounded-lg" 
                                                        />
                                                        <span className="text-lg">{product.nombre}</span>
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
}

export default Nav