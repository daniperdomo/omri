import React from 'react';
import { useParams, Link } from 'react-router-dom';
import CreateMarca from '../components/Admin/marcas/CreateMarca';
import UpdateMarca from '../components/Admin/marcas/UpdateMarca';
import DeleteMarca from '../components/Admin/marcas/DeleteMarca'
import CreateCategoria from '../components/Admin/categorias/CreateCategoria';
import UpdateCategoria from '../components/Admin/categorias/UpdateCategoria';
import DeleteCategoria from '../components/Admin/categorias/DeleteCategoria';
import CreateProducto from '../components/Admin/productos/CreateProducto';
import UpdateProducto from '../components/Admin/productos/UpdateProducto';
import DeleteProducto from '../components/Admin/productos/DeleteProducto';
import UpdateImagen from '../components/Admin/imagenes/UpdateImagen';


const AdminForm = () => {
    const { type } = useParams();
    const forms = [
        { type: 'createCategoria', comp: <CreateCategoria /> },
        { type: 'updateCategoria', comp: <UpdateCategoria /> },
        { type: 'deleteCategoria', comp: <DeleteCategoria /> },
        { type: 'createProducto', comp: <CreateProducto /> },
        { type: 'updateProducto', comp: <UpdateProducto /> },
        { type: 'deleteProducto', comp: <DeleteProducto /> },
        { type: 'createMarca', comp: <CreateMarca /> },
        { type: 'updateMarca', comp: <UpdateMarca /> },
        { type: 'deleteMarca', comp: <DeleteMarca /> },
        { type: 'updateImagen', comp: <UpdateImagen /> },
    ];

    const formToRender = forms.find(form => form.type === type);


    return (
        <>
            <div className="flex justify-center items-center m-4">
                <Link to="/zXyWvU3tS2rQ1pO9nM8lK7jH6gF5eD4cB3aA">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                        Regresar al menú de Admin
                    </button>
                </Link>
            </div>
            {formToRender ? (
                <div>
                    {formToRender.comp}
                </div>
            ) : (
                <h1>Error</h1>
            )}
        </>
    );
};

export default AdminForm;