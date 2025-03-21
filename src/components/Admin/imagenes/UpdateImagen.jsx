import React, { useEffect, useState } from 'react';
import '../../../styles/estilosForm.css';

const UpdateImagen = () => {
    const [cod_producto, setCod_producto] = useState('');
    const [url_nueva, setUrl_nueva] = useState('');
    const [imagenes, setImagenes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        // Cargar las imágenes al inicio
        fetch(`/api/imagenes`)
            .then(response => response.json())
            .then(data => setImagenes(data))
            .catch(error => console.error('Error leyendo imágenes:', error));
    }, []);

    const handleSelectedImagen = (cod_producto, url) => {
        setCod_producto(cod_producto);
        setUrl_nueva(url); // Inicialmente, la nueva URL es la misma que la original
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/imagenes`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cod_producto,
                    url_nueva,
                }),
            });

            if (response.ok) {
                setModalMessage('Imagen actualizada con éxito');
                setIsSuccess(true);
            } else {
                setModalMessage('Error actualizando la imagen');
                setIsSuccess(false);
            }
        } catch (error) {
            console.error('Error de red:', error);
        } finally {
            setModalVisible(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <br />
            <h1 className='text-center text-2xl'>Actualizar Imagen</h1>
            <br />
            <div className="form-container">
                {cod_producto ? (
                    <form className="form" onSubmit={handleSubmit}>
                        <div>
                            <label className="form-label">Nueva URL</label>
                            <input
                                type="text"
                                className="form-input"
                                value={url_nueva}
                                onChange={(e) => setUrl_nueva(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="form-button">Actualizar Imagen</button>
                    </form>
                ) : (
                    <form className="form">
                        <div>
                            <label className="form-label">Seleccionar Imagen</label>
                            <select className="form-input" onChange={(e) => {
                                const [cod, url] = e.target.value.split(',');
                                handleSelectedImagen(cod, url);
                            }} required>
                                <option value="">Seleccione una imagen</option>
                                {imagenes.map((imagen) => (
                                    <option key={`${imagen.cod_producto},${imagen.url}`} value={`${imagen.cod_producto},${imagen.url}`}>
                                        {`${imagen.cod_producto} - ${imagen.url}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </form>
                )}
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

export default UpdateImagen;