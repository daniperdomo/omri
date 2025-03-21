import React, { useEffect, useState, useRef } from 'react'
import '../../../styles/estilosForm.css'

const CreateProducto = () => {
    const [cod_producto, setCod_producto] = useState('')
    const [cod_categoria, setCod_categoria] = useState('')
    const [modelo, setModelo] = useState('')
    const [cod_marca, setCod_marca] = useState('')
    const [descripcion_marca, setDescripcionMarca] = useState('')
    const [nombre, setNombre] = useState('')
    const [caracteristicas, setCaracteristicas] = useState('')
    const [especificaciones, setEspecificaciones] = useState('')
    const [precio, setPrecio] = useState(0.00)
    const [cantidad, setCantidad] = useState(0)
    const [estatus, setEstatus] = useState(0)
    const [marcas, setMarcas] = useState([])
    const [categorias, setCategorias] = useState([])
    const [color, setColor] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [images, setImages] = useState([])

    const fileInputRef = useRef(null)

    const handleCod_producto = (e) => setCod_producto(e.target.value.toUpperCase())
    const handleCod_categoria = (e) => {
        const [cod, model] = e.target.value.split('|')
        setCod_categoria(cod)
        setModelo(model)
    }
    const handleCod_marca = (e) => {
        const [cod, nombre] = e.target.value.split('|')
        setCod_marca(cod.toUpperCase()) 
        setDescripcionMarca(nombre) 
    }
    const handleDescripcion = (e) => setNombre(e.target.value)
    const handleCaracteristicas = (e) => setCaracteristicas(e.target.value)
    const handleEspecificaciones = (e) => setEspecificaciones(e.target.value)
    const handlePrecio = (e) => setPrecio(e.target.value)
    const handleCantidad = (e) => setCantidad(e.target.value)
    const handleEstatus = (e) => {
        const value = Number(e.target.value)
        setEstatus(value)
    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files)
        if (files.length > 3) {
            alert('Solo puedes subir un máximo de 3 imágenes')
            return
        }
        setImages(files)
    }

    useEffect(() => {
        fetch(`/api/marca`)
            .then(response => response.json())
            .then(data => setMarcas(data))
            .catch(error => console.error('Error leyendo Marcas:', error))

        fetch(`/api/categoria`)
            .then(response => response.json())
            .then(data => setCategorias(data))
            .catch(error => console.error('Error leyendo Categorias:', error))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const formData = new FormData()
        formData.append('cod_producto', cod_producto)
        formData.append('cod_categoria', cod_categoria)
        formData.append('modelo', modelo)
        formData.append('cod_marca', cod_marca)
        formData.append('descripcion_marca', descripcion_marca)
        formData.append('nombre', nombre)
        formData.append('caracteristicas', caracteristicas)
        formData.append('especificaciones', especificaciones)
        formData.append('precio', precio)
        formData.append('cantidad', cantidad)
        formData.append('estatus', estatus)
        formData.append('color', color)
        
        images.forEach((image) => {
            formData.append('images', image)
        })
    
        try {
            const response = await fetch(`/api/producto`, {
                method: 'POST',
                body: formData,
            })
    
            if (response.ok) {
                setModalMessage('Producto registrado con éxito')
                setIsSuccess(true)
    
                setImages([])
    
                if (fileInputRef.current) {
                    fileInputRef.current.value = ''
                }
            } else {
                setModalMessage('Error registrando Producto')
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
            <h1 className='text-center text-2xl'>Create Producto</h1>
            <br />
            <div className="form-container">
                <form className="form" onSubmit={handleSubmit}>
                    <div>
                        <label className="form-label">
                            Codigo Producto
                        </label>
                        <input type="text" value={cod_producto} onChange={handleCod_producto} className='form-input' maxLength={100} required />
                    </div>
                    <div>
                        <label className="form-label">
                            Categoria
                        </label>
                        <select onChange={handleCod_categoria} className="form-input" required>
                            <option value="">Seleccione una categoría</option>
                            {categorias.map((categoria) => (
                                <option key={`${categoria.cod_categoria}|${categoria.modelo}`} value={`${categoria.cod_categoria}|${categoria.modelo}`}>
                                    {`${categoria.cod_categoria} - ${categoria.descripcion} (${categoria.modelo})`}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="form-label">
                            Marca
                        </label>
                        <select onChange={handleCod_marca} className="form-input" required>
                            <option value="">Seleccione una marca</option>
                            {marcas.map((marca) => (
                                <option key={`${marca.cod_marca}|${marca.descripcion}`} value={`${marca.cod_marca}|${marca.descripcion}`}>
                                    {`${marca.cod_marca} - ${marca.descripcion}`}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="" className="form-label">
                            Nombre
                        </label>
                        <input type="text" value={nombre} onChange={handleDescripcion} className='form-input' maxLength={100} required />
                    </div>
                    <div>
                        <label className="form-label">
                            Caracteristicas
                        </label>
                        <input type="text" value={caracteristicas} onChange={handleCaracteristicas} className='form-input' required />
                    </div>
                    <div>
                        <label className="form-label">
                            Especificaciones
                        </label>
                        <input type="text" value={especificaciones} onChange={handleEspecificaciones} className='form-input' required />
                    </div>
                    <div>
                        <label className="form-label">
                            Color (HEX)
                        </label>
                        <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className='form-input' maxLength={10} required />
                    </div>
                    <div>
                        <label className="form-label">
                            Precio
                        </label>
                        <input type="number" step="0.01" value={precio} onChange={handlePrecio} className='form-input' min="0.00" required />
                    </div>
                    <div>
                        <label className="form-label">
                            Cantidad
                        </label>
                        <input type="number" step="1" value={cantidad} onChange={handleCantidad} className='form-input' min="0" required />
                    </div>
                    <div>
                        <label className="form-label">
                            Estatus
                        </label>
                        <select onChange={handleEstatus} className="form-input" required>
                            <option value="">Seleccione un estatus</option>
                            <option value="1">Activo</option>
                            <option value="0">Inactivo</option>
                        </select>
                    </div>
                    <div>
                        <label className="form-label">
                            Imágenes (Máximo 3)
                        </label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className='form-input'
                            multiple
                            accept="image/*"
                            ref={fileInputRef}
                        />
                    </div>
                    <button type="submit" className="form-button">Registrar Producto</button>
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

export default CreateProducto