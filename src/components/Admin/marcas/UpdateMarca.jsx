import React, { useEffect, useState } from 'react'
import '../../../styles/estilosForm.css'

const UpdateMarca = () => {
    const [cod_marca_original, setCod_marca_original] = useState('')
    const [cod_marca_nuevo, setCod_marca_nuevo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [marcas, setMarcas] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        // Cargar las marcas al inicio
        fetch(`/api/marca`)
            .then(response => response.json())
            .then(data => setMarcas(data))
            .catch(error => console.error('Error leyendo marcas:', error))
    }, [])

    const handleSelectedMarca = (cod_marca) => {
        setCod_marca_original(cod_marca)
        setCod_marca_nuevo(cod_marca)

        // Cargar los datos de la marca seleccionada
        fetch(`/api/marca/${cod_marca}`)
            .then(response => response.json())
            .then(prod => {
                setDescripcion(prod.descripcion)
            })
            .catch(error => console.error('Error leyendo marca:', error))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`/api/marca`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cod_marca_original,
                    cod_marca_nuevo, 
                    descripcion,
                })
            })

            if (response.ok) {
                setModalMessage('Marca actualizada con éxito')
                setIsSuccess(true)
            } else {
                setModalMessage('Error actualizando Marca')
                setIsSuccess(false)
            }
        } catch (error) {
            console.error('Error de red:', error)
        } finally {
            setModalVisible(true)
        }
    }

    const closeModal = () => {
        setModalVisible(false)
    }

    return (
        <>
            <br />
            <h1 className='text-center text-2xl'>Update Marca</h1>
            <br />
            <div className="form-container">
                {cod_marca_original ? (
                    <form className="form" onSubmit={handleSubmit}>
                        <div>
                            <label className="form-label">Código Marca</label>
                            <input
                                type="text"
                                className="form-input"
                                value={cod_marca_nuevo}
                                onChange={(e) => setCod_marca_nuevo(e.target.value.toUpperCase())}
                                required
                            />
                        </div>
                        <div>
                            <label className="form-label">Descripción</label>
                            <input
                                type="text"
                                className="form-input"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value.toLowerCase())}
                                required
                            />
                        </div>
                        <button type="submit" className="form-button">Actualizar Marca</button>
                    </form>
                ) : (
                    <form className="form">
                        <div>
                            <label className="form-label">Seleccionar Marca</label>
                            <select className="form-input" onChange={(e) => handleSelectedMarca(e.target.value)} required>
                                <option value="">Seleccione una marca</option>
                                {marcas.map((marca) => (
                                    <option key={marca.cod_marca} value={marca.cod_marca}>
                                        {`${marca.cod_marca} - ${marca.descripcion}`}
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
    )
}

export default UpdateMarca