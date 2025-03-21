import React, { useState, useEffect } from 'react';
import '../../../styles/estilosForm.css'

const DeleteMarca = () => {
    const [cod_marca, setCod_marca] = useState('')
    const [marcas, setMarcas] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);


    const handleCod_marca = (e) => setCod_marca(e.target.value.toUpperCase())


    useEffect(() => {
        fetch(`/api/marca`)
            .then(response => response.json())
            .then(data => setMarcas(data))
            .catch(error => console.error('Error leyendo Marcas:', error));
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`/api/deleteMarca`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({cod_marca})
            })

            if (response.ok) {
                setModalMessage('Marca eliminada con exito');
                setIsSuccess(true);
            } else {
                setModalMessage('Error eliminando Marca');
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
            <h1 className='text-center text-2xl'>Delete Marca</h1>
            <br />
            <div className="form-container" onSubmit={handleSubmit}>
                <form className="form">
                <div>
                        <label className="form-label">
                            Marca
                        </label>
                        <select onChange={handleCod_marca} className="form-input" required>
                            <option value="">Seleccione una marca</option>
                            {marcas.map((marca)=>(
                                <option key={`${marca.cod_marca}`}  value={`${marca.cod_marca}`}>
                                    {`${marca.cod_marca} - ${marca.descripcion}`}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className ="form-button">Eliminar marca</button>
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

export default DeleteMarca;