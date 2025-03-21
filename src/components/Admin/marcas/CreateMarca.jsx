import React, { useState } from 'react';
import '../../../styles/estilosForm.css'


const CreateMarca = () => {
    const [cod_marca, setCod_marca] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleCod_marca = (e) => setCod_marca(e.target.value.toUpperCase())
    const handleDescripcion = (e) => setDescripcion(e.target.value.toLowerCase())

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const response = await fetch(`/api/marca`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({cod_marca, descripcion})
            })

            if (response.ok) {
                setModalMessage('Marca registrada con exito');
                setIsSuccess(true);
            } else {
                setModalMessage('Error registrando Marca');
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
            <h1 className='text-center text-2xl'>Create Marca</h1>
            <br />
            <div className="form-container">
                <form className="form" onSubmit={handleSubmit}>
                    <div>
                        <label className="form-label">
                            Codigo Marca
                        </label>
                        <input type="text" value={cod_marca} onChange={handleCod_marca} className='form-input' maxLength={10} required />
                    </div>
                    <div>
                        <label htmlFor="" className="form-label">
                            Descripcion
                        </label>
                        <input type="text" value={descripcion} onChange={handleDescripcion} className='form-input' maxLength={100} required/>
                    </div>
                    <button type="submit" className="form-button">
                        Registrar Marca
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

export default CreateMarca;