import React, { useState } from 'react';
import '../../../styles/estilosForm.css'

const CreateCategoria = () => {
    const [cod_categoria, setCod_categoria] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [modelo, setModelo] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleCod_categoria = (e) => setCod_categoria(e.target.value.toUpperCase())
    const handleDescripcion = (e) => setDescripcion(e.target.value.toLowerCase())
    const handleModelo = (e) => setModelo(e.target.value.toLowerCase())

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`/api/categoria`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({cod_categoria, descripcion, modelo})
            })

            if (response.ok) {
                setModalMessage('Categoria registrada con exito');
                setIsSuccess(true);
            } else {
                setModalMessage('Error registrando Categoria');
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
            <h1 className='text-center text-2xl'>Create Categoria</h1>
            <br />
            <div className="form-container">
                <form className="form" onSubmit={handleSubmit}>
                    <div>
                        <label className="form-label">
                            Código de la Categoría
                        </label>
                        <input type="text" value={cod_categoria} onChange={handleCod_categoria} className="form-input" maxLength={10} required/>
                    </div>
                    <div>
                        <label htmlFor="" className="form-label">
                            Descripcion
                        </label>
                        <input type="text" value={descripcion} onChange={handleDescripcion} className='form-input' maxLength={100} required/>
                    </div>
                    <div>
                        <label htmlFor="" className="form-label">
                            Modelo
                        </label>
                        <input type="text" value={modelo} onChange={handleModelo} className='form-input' maxLength={100} required/>
                    </div>
                    <button type="submit" className="form-button">
                        Registrar Categoria
                    </button>
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

export default CreateCategoria;