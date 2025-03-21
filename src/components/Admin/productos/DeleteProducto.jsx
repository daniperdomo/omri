import React, { useState, useEffect } from 'react';
import '../../../styles/estilosForm.css'


const DeleteProducto = () => {
    const [cod_producto, setCod_producto] = useState('')
    const [productos, setProductos] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);


    const handleCod_producto = (e) => setCod_producto(e.target.value.toUpperCase())


    useEffect(() => {
        fetch(`/api/producto`)
            .then(response => response.json())
            .then(data => setProductos(data))
            .catch(error => console.error('Error leyendo productos:', error));
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`/api/deleteProducto`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({cod_producto})
            })

            if (response.ok) {
                setModalMessage('Producto eliminado con exito');
                setIsSuccess(true);
            } else {
                setModalMessage('Error eliminando Producto');
                setIsSuccess(false);
            }
        } catch (error) {
            console.error('Error de red:', error);
        } finally {
            setModalVisible(true);
        }
    }

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <br />
            <h1 className='text-center text-2xl'>Delete Producto</h1>
            <br />
            <div className="form-container" onSubmit={handleSubmit}>
                <form className="form">
                    <div>
                        <label className="form-label">
                            Producto
                        </label>
                        <select onChange={handleCod_producto} className="form-input" required>
                            <option value="">Seleccione un producto</option>
                            {productos.map((producto)=>(
                                <option key={`${producto.cod_producto}`}  value={`${producto.cod_producto}`}>
                                    {`${producto.cod_producto} - ${producto.nombre}`}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className ="form-button">Eliminar producto</button>
                </form>
                {modalVisible && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>&times;</span>
                            <p style={{ color: isSuccess ? 'green' : 'red' }}>{modalMessage}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default DeleteProducto;