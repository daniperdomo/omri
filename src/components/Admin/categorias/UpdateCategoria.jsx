import React, { useEffect, useState } from 'react'
import '../../../styles/estilosForm.css'

const UpdateCategoria = () => {
    const [cod_categoria_original, setCod_categoria_original] = useState('')
    const [modelo_original, setModelo_original] = useState('')
    const [modelo, setModelo] = useState('')
    const [cod_categoria_nuevo, setCod_categoria_nuevo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [categorias, setCategorias] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        // Cargar las categorías al inicio
        fetch(`/api/categoria`)
            .then(response => response.json())
            .then(data => setCategorias(data))
            .catch(error => console.error('Error leyendo categorías:', error))
    }, [])

    const handleSelectedCategoria = (cod_categoria, modelo) => {
        setCod_categoria_original(cod_categoria)
        setModelo_original(modelo)
        setCod_categoria_nuevo(cod_categoria)
        setModelo(modelo)

        // Cargar los datos de la categoría seleccionada
        fetch(`/api/categoria/${cod_categoria}/${modelo}`)
            .then(response => response.json())
            .then(prod => {
                setDescripcion(prod.descripcion)
            })
            .catch(error => console.error('Error leyendo categoría:', error))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`/api/categoria`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cod_categoria: cod_categoria_nuevo,
                    modelo: modelo,
                    cod_categoria_original: cod_categoria_original,
                    modelo_original: modelo_original,
                    descripcion,
                })
            })

            if (response.ok) {
                setModalMessage('Categoría actualizada con éxito')
                setIsSuccess(true)
            } else {
                setModalMessage('Error actualizando Categoría')
                setIsSuccess(false)
            }
        } catch (error) {
            console.error('Error de red:', error)
            setModalMessage('Error de red al actualizar la categoría')
            setIsSuccess(false)
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
            <h1 className='text-center text-2xl'>Update Categoria</h1>
            <br />
            <div className="form-container">
                {cod_categoria_original ? (
                    <form className="form" onSubmit={handleSubmit}>
                        <div>
                            <label className="form-label">Código Categoría</label>
                            <input
                                type="text"
                                className="form-input"
                                value={cod_categoria_nuevo}
                                onChange={(e) => setCod_categoria_nuevo(e.target.value.toUpperCase())}
                                required
                            />
                        </div>
                        <div>
                            <label className="form-label">Modelo</label>
                            <input
                                type="text"
                                className="form-input"
                                value={modelo}
                                onChange={(e) => setModelo(e.target.value)}
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
                        <button type="submit" className="form-button">Actualizar Categoría</button>
                    </form>
                ) : (
                    <form className="form">
                        <div>
                            <label className="form-label">Seleccionar Categoría</label>
                            <select className="form-input" onChange={(e) => {
                                const [cod_categoria, modelo] = e.target.value.split('|')
                                handleSelectedCategoria(cod_categoria, modelo)
                            }} required>
                                <option value="">Seleccione una categoría</option>
                                {categorias.map((categoria) => (
                                    <option key={`${categoria.cod_categoria}|${categoria.modelo}`} value={`${categoria.cod_categoria}|${categoria.modelo}`}>
                                        {`${categoria.cod_categoria} - ${categoria.descripcion} (${categoria.modelo})`}
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

export default UpdateCategoria