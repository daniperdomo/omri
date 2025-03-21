import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
    const [selectedType, setSelectedType] = useState(null);

    const options = {
        producto: [
            { id: 1, title: 'Create Producto', link: '/zXyWvU3tS2rQ1pO9nM8lK7jH6gF5eD4cB3aA/createProducto' },
            { id: 2, title: 'Update Producto', link: '/zXyWvU3tS2rQ1pO9nM8lK7jH6gF5eD4cB3aA/updateProducto' },
            { id: 3, title: 'Delete Producto', link: '/zXyWvU3tS2rQ1pO9nM8lK7jH6gF5eD4cB3aA/deleteProducto' },
            { id: 10, title: 'Update Imagen', link: '/zXyWvU3tS2rQ1pO9nM8lK7jH6gF5eD4cB3aA/updateImagen' }
        ],
        marca: [
            { id: 4, title: 'Create Marca', link: '/zXyWvU3tS2rQ1pO9nM8lK7jH6gF5eD4cB3aA/createMarca' },
            { id: 5, title: 'Update Marca', link: '/zXyWvU3tS2rQ1pO9nM8lK7jH6gF5eD4cB3aA/updateMarca' },
            { id: 6, title: 'Delete Marca', link: '/zXyWvU3tS2rQ1pO9nM8lK7jH6gF5eD4cB3aA/deleteMarca' },
        ],
        categoria: [
            { id: 7, title: 'Create Categoria', link: '/zXyWvU3tS2rQ1pO9nM8lK7jH6gF5eD4cB3aA/createCategoria' },
            { id: 8, title: 'Update Categoria', link: '/zXyWvU3tS2rQ1pO9nM8lK7jH6gF5eD4cB3aA/updateCategoria' },
            { id: 9, title: 'Delete Categoria', link: '/zXyWvU3tS2rQ1pO9nM8lK7jH6gF5eD4cB3aA/deleteCategoria' },
        ]
    };

    const handleCardClick = (type) => {
        setSelectedType(type);
    };

    return (
        <div className="p-4">
            <div className="flex space-x-4 mb-4 justify-center">
                {Object.keys(options).map((type) => (
                    <div
                        key={type}
                        className="cursor-pointer p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        onClick={() => handleCardClick(type)}
                    >
                        <h2 className="text-xl font-bold capitalize">{type}</h2>
                    </div>
                ))}
            </div>

            {selectedType && (
                <div className="flex flex-wrap justify-center space-x-4">
                    {options[selectedType].map((option) => (
                        <div key={option.id} className="p-4 bg-white rounded-lg shadow-md mb-4 w-full max-w-xs text-center">
                            <h3 className="text-lg font-semibold">{option.title}</h3>
                            <Link to={option.link}>
                                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                                    Seleccionar
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminHome;