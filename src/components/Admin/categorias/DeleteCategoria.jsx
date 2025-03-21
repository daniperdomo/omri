import React, { useState, useEffect } from 'react'
import '../../../styles/estilosForm.css'

const DeleteCategoria = () => {
    const [cod_categoria, setCod_categoria] = useState('')
    const [modelo, setModelo] = useState('')
    const [categorias, setCategorias] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)

    const handleCod_categoria = (e) => {
        const [cod, model] = e.target.value.split('|')
        setCod_categoria(cod)
        setModelo(model)
    }

    useEffect(() => {
        fetch(`/api/categoria`)
            .then(response => response.json())
            .then(data => setCategorias(data))
            .catch(error => console.error('Error leyendo Categorias:', error))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`/api/deleteCategoria`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({cod_categoria, modelo})
            })

            if (response.ok) {
                setModalMessage('Categoria eliminada con exito')
                setIsSuccess(true)
            } else {
                setModalMessage('Error eliminando Categoria')
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
            <h1 className='text-center text-2xl'>Delete Categoria</h1>
            <br />
            <div className="form-container" onSubmit={handleSubmit}>
                <form className="form">
                    <div>
                        <label className="form-label">
                            Categoria
                        </label>
                        <select onChange={handleCod_categoria} className="form-input" required value={`${cod_categoria}|${modelo}`}>
                            <option value="">Seleccione una categoría</option>
                            {categorias.map((categoria) => (
                                <option key={`${categoria.cod_categoria}|${categoria.modelo}`} value={`${categoria.cod_categoria}|${categoria.modelo}`}>
                                    {`${categoria.cod_categoria} - ${categoria.descripcion} (${categoria.modelo})`}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className ="form-button">Eliminar Categoria</button>
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
    )
}

export default DeleteCategoria