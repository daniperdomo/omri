import React, { useEffect, useState } from 'react'
import '../../../styles/estilosForm.css'

const UpdateProducto = () => {
    const [cod_producto_original, setCod_producto_original] = useState('')
    const [cod_producto_nuevo, setCod_producto_nuevo] = useState('') 
    const [productos, setProductos] = useState([])
    const [cod_categoria, setCod_categoria] = useState('')
    const [modelo, setModelo] = useState('')
    const [cod_marca, setCod_marca] = useState('')
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

    const handleCod_producto_nuevo = (e) => setCod_producto_nuevo(e.target.value.toUpperCase())
    const handleCod_categoria = (e) => {
        const [cod, model] = e.target.value.split('|')
        setCod_categoria(cod)
        setModelo(model)
    }
    const handleCod_marca = (e) => setCod_marca(e.target.value.toUpperCase())
    const handleNombre = (e) => setNombre(e.target.value)
    const handleCaracteristicas = (e) => setCaracteristicas(e.target.value)
    const handleEspecificaciones = (e) => setEspecificaciones(e.target.value)
    const handlePrecio = (e) => setPrecio(parseFloat(e.target.value))
    const handleCantidad = (e) => setCantidad(parseInt(e.target.value, 10))
    const handleEstatus = (e) => {
        const value = Number(e.target.value)
        setEstatus(value)
    }

    useEffect(() => {
        fetch(`/api/producto`)
            .then(response => response.json())
            .then(data => setProductos(data))
            .catch(error => console.error(`Error leyendo productos:`, error))

        fetch(`/api/marca`)
            .then(response => response.json())
            .then(data => setMarcas(data))
            .catch(error => console.error('Error leyendo Marcas:', error))

        fetch(`/api/categoria`)
            .then(response => response.json())
            .then(data => setCategorias(data))
            .catch(error => console.error('Error leyendo Categorias:', error))
    }, [])

    const handleSelectedProducto = (cod_producto) => {
        setCod_producto_original(cod_producto)
        setCod_producto_nuevo(cod_producto)

        fetch(`/api/producto/${cod_producto}`)
            .then(response => response.json())
            .then(prod => {
                setCod_categoria(prod.cod_categoria)
                setModelo(prod.modelo)
                setCod_marca(prod.cod_marca)
                setNombre(prod.nombre)
                setCaracteristicas(prod.caracteristicas)
                setPrecio(prod.precio)
                setCantidad(prod.cantidad)
                setEstatus(prod.estatus)
                setColor(prod.color)
                setEspecificaciones(prod.especificaciones)
            })
            .catch(error => console.error('Error leyendo producto:', error))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`/api/producto`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    cod_producto_original,
                    cod_producto_nuevo, 
                    cod_categoria, 
                    modelo, 
                    cod_marca, 
                    descripcion, 
                    caracteristicas, 
                    precio, 
                    cantidad, 
                    estatus,
                    color,
                    especificaciones 
                })
            })

            if (response.ok) {
                setModalMessage('Producto actualizado con éxito')
                setIsSuccess(true)
            } else {
                setModalMessage('Error actualizando Producto')
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
            <h1 className='text-center text-2xl'>Update Producto</h1>
            <br />
            <div className="form-container">
                {cod_producto_original ? (
                    <form className="form" onSubmit={handleSubmit}>
                        <div>
                            <label className="form-label">Código Producto</label>
                            <input
                                type="text"
                                className="form-input"
                                value={cod_producto_nuevo}
                                onChange={handleCod_producto_nuevo}
                                required
                            />
                        </div>
                        <div>
                            <label className="form-label">Categoría</label>
                            <select className="form-input" value={`${cod_categoria}|${modelo}`} onChange={handleCod_categoria} required>
                                {categorias.map((categoria) => (
                                    <option key={`${categoria.cod_categoria}|${categoria.modelo}`} value={`${categoria.cod_categoria}|${categoria.modelo}`}>
                                        {`${categoria.cod_categoria} - ${categoria.descripcion} (${categoria.modelo})`}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="form-label">Marca</label>
                            <select onChange={handleCod_marca} value={cod_marca} className="form-input" required>
                                <option value="">Seleccione una marca</option>
                                {marcas.map((marca) => (
                                    <option key={`${marca.cod_marca}`} value={`${marca.cod_marca}`}>
                                        {`${marca.cod_marca} - ${marca.descripcion}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="form-label">Nombre</label>
                            <textarea
                                className="form-input"
                                value={nombre}
                                onChange={handleNombre}
                                required
                            />
                        </div>
                        <div>
                            <label className="form-label">Características</label>
                            <textarea
                                className="form-input"
                                value={caracteristicas}
                                onChange={handleCaracteristicas}
                                required
                            />
                        </div>
                        <div>
                            <label className="form-label">Especificaciones</label>
                            <textarea
                                className="form-input"
                                value={especificaciones}
                                onChange={handleEspecificaciones}
                                required
                            />
                        </div>
                        <div>
                            <label className="form-label">
                                Color (HEX)
                            </label>
                            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} className='form-input' maxLength={10} required />
                        </div>
                        <div>
                            <label className="form-label">Precio</label>
                            <input
                                type="number"
                                className="form-input"
                                value={precio}
                                onChange={handlePrecio}
                                required
                            />
                        </div>
                        <div>
                            <label className="form-label">Cantidad</label>
                            <input
                                type="number"
                                className="form-input"
                                value={cantidad}
                                onChange={handleCantidad}
                                required
                            />
                        </div>
                        <div>
                            <label className="form-label">Estatus</label>
                            <select className="form-input" value={estatus} onChange={handleEstatus} required>
                                <option value={0}>Inactivo</option>
                                <option value={1}>Activo</option>
                            </select>
                        </div>
                        <button type="submit" className="form-button">Actualizar Producto</button>
                    </form>
                ) : (
                    <form className="form">
                        <div>
                            <label className="form-label">Producto</label>
                            <select className="form-input" onChange={(e) => handleSelectedProducto(e.target.value.toUpperCase())} required>
                                <option value="">Seleccione un producto</option>
                                {productos.map((producto) => (
                                    <option key={`${producto.cod_producto}`} value={`${producto.cod_producto}`}>
                                        {`${producto.cod_producto} - ${producto.nombre}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </form>
                )}
                {modalVisible && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>&times</span>
                            <p style={{ color: isSuccess ? 'green' : 'red' }}>{modalMessage}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default UpdateProducto