const express = require("express")
const path = require("path")
const app = express()
const cors = require("cors")
const port = process.env.PORT || 8081
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const corsOptions = {
    origin: ["https://omri-six.vercel.app/"]
}

app.use(cors(corsOptions))
app.use(express.json())

app.post('/api/marca', async (req, res) => {
    const { cod_marca, descripcion } = req.body

    const { data, error } = await supabase
        .from('Marcas')
        .insert([
            { cod_marca, descripcion }
        ])

    if (error) {
        console.log('Error registrando Marca: ', error)
        return res.status(500).send('Error registrando Marca')
    }

    res.status(201).send('Marca registrada con éxito')
})

app.post('/api/categoria', async (req, res) => {
    const { cod_categoria, descripcion, modelo } = req.body

    const { data, error } = await supabase
        .from('Categorias')
        .insert([
            { cod_categoria, descripcion, modelo }
        ])

    if (error) {
        console.log('Error registrando Categoria: ', error)
        return res.status(500).send('Error registrando Categoria')
    }

    res.status(201).send('Categoria registrada con éxito')
})

app.post('/api/producto', async (req, res) => {
    const { cod_producto, cod_categoria, modelo, cod_marca, descripcion_marca, nombre, caracteristicas, precio, cantidad, estatus, color, especificaciones } = req.body
    const { data: productoData, error: productoError } = await supabase
        .from('Productos')
        .insert([
            {
                cod_producto,
                cod_categoria,
                modelo,
                cod_marca,
                nombre,
                caracteristicas,
                precio,
                cantidad,
                estatus,
                color,
                especificaciones,
                descripcion
            }
        ])

    if (productoError) {
        console.log('Error registrando Producto: ', productoError)
        return res.status(500).send('Error registrando Producto')
    }

    res.status(201).send('Producto registrado con éxito')
})

app.get('/api/productos', async (req, res) => {
    const { data, error } = await supabase
        .from('Productos')
        .select(`
            cod_producto,
            cod_categoria,
            modelo,
            cod_marca,
            nombre,
            caracteristicas,
            especificaciones,
            precio,
            cantidad,
            estatus,
            color,
            descripcion,
            Imagenes (url)
        `)
        .order('cod_categoria', { ascending: true })
        .order('modelo', { ascending: true })        
        .order('cod_producto', { ascending: true }) 

    if (error) {
        console.log('Error obteniendo productos:', error)
        return res.status(500).send('Error obteniendo productos')
    }

    const productosConImagenesOrdenadas = data.map(producto => ({
        ...producto,
        Imagenes: producto.Imagenes.sort((a, b) => a.url.localeCompare(b.url))
    }))

    const productos = productosConImagenesOrdenadas.map(producto => ({
        cod_producto: producto.cod_producto,
        cod_categoria: producto.cod_categoria,
        modelo: producto.modelo,
        cod_marca: producto.cod_marca,
        nombre: producto.nombre,
        caracteristicas: producto.caracteristicas,
        precio: producto.precio,
        cantidad: producto.cantidad,
        estatus: producto.estatus,
        color: producto.color,
        especificaciones: producto.especificaciones,
        descripcion : producto.descripcion,
        imagenes: producto.Imagenes ? producto.Imagenes.map(imagen => ({ url: imagen.url })) : []
    }))

    res.status(200).json(productos)
})

app.get('/api/productos/accesorios', async (req, res) => {
    const { data, error } = await supabase
        .from('Productos')
        .select(`
            cod_producto,
            cod_categoria,
            modelo,
            cod_marca,
            nombre,
            caracteristicas,
            especificaciones,
            precio,
            cantidad,
            estatus,
            color,
            descripcion,
            Imagenes (url)
        `)
        .in('cod_categoria', ['CARG', 'CABL', 'AUDIF'])
        .eq('estatus', 1)
        .order('cod_categoria', { ascending: true })
        .order('modelo', { ascending: true })        
        .order('cod_producto', { ascending: true }) 

    if (error) {
        console.log('Error obteniendo productos:', error)
        return res.status(500).send('Error obteniendo productos')
    }

    const productosConImagenesOrdenadas = data.map(producto => ({
        ...producto,
        Imagenes: producto.Imagenes.sort((a, b) => a.url.localeCompare(b.url))
    }))

    const productos = productosConImagenesOrdenadas.map(producto => ({
        cod_producto: producto.cod_producto,
        cod_categoria: producto.cod_categoria,
        modelo: producto.modelo,
        cod_marca: producto.cod_marca,
        nombre: producto.nombre,
        caracteristicas: producto.caracteristicas,
        precio: producto.precio,
        cantidad: producto.cantidad,
        estatus: producto.estatus,
        color: producto.color,
        especificaciones : producto.especificaciones,
        descripcion : producto.descripcion,
        imagenes: producto.Imagenes ? producto.Imagenes.map(imagen => ({ url: imagen.url })) : []
    }))

    res.status(200).json(productos)
})

app.get('/api/productos/cubitt', async (req, res) => {
    const { data, error } = await supabase
        .from('Productos')
        .select(`
            cod_producto,
            cod_categoria,
            modelo,
            cod_marca,
            nombre,
            caracteristicas,
            especificaciones,
            precio,
            cantidad,
            estatus,
            color,
            descripcion,
            Imagenes (url)
        `)
        .eq('cod_marca', 'CT')
        .eq('estatus', 1)
        .order('cod_categoria', { ascending: true })
        .order('modelo', { ascending: true })        
        .order('cod_producto', { ascending: true }) 

    if (error) {
        console.log('Error obteniendo productos:', error)
        return res.status(500).send('Error obteniendo productos')
    }

    const productosConImagenesOrdenadas = data.map(producto => ({
        ...producto,
        Imagenes: producto.Imagenes.sort((a, b) => a.url.localeCompare(b.url))
    }))

    const productos = productosConImagenesOrdenadas.map(producto => ({
        cod_producto: producto.cod_producto,
        cod_categoria: producto.cod_categoria,
        modelo: producto.modelo,
        cod_marca: producto.cod_marca,
        nombre: producto.nombre,
        caracteristicas: producto.caracteristicas,
        precio: producto.precio,
        cantidad: producto.cantidad,
        estatus: producto.estatus,
        color: producto.color,
        especificaciones : producto.especificaciones,
        descripcion : producto.descripcion,
        imagenes: producto.Imagenes ? producto.Imagenes.map(imagen => ({ url: imagen.url })) : []
    }))

    res.status(200).json(productos)
})

app.get('/api/productos/:cod_producto', async (req, res) => {
    const { cod_producto } = req.params

    const { data, error } = await supabase
        .from('Productos')
        .select(`
            cod_producto,
            cod_categoria,
            modelo,
            cod_marca,
            nombre,
            caracteristicas,
            precio,
            cantidad,
            estatus,
            color,
            especificaciones,
            descripcion,
            Imagenes (url)
        `)
        .eq('cod_producto', cod_producto)
        .single()

    if (error) {
        console.log('Error obteniendo detalles del producto:', error)
        return res.status(500).send('Error obteniendo detalles del producto')
    }

    if (!data) {
        return res.status(404).send('Producto no encontrado')
    }

    // Ordenar las imágenes del producto
    const productoConImagenesOrdenadas = {
        ...data,
        Imagenes: data.Imagenes.sort((a, b) => a.url.localeCompare(b.url))
    }

    const producto = {
        cod_producto: productoConImagenesOrdenadas.cod_producto,
        cod_categoria: productoConImagenesOrdenadas.cod_categoria,
        modelo: productoConImagenesOrdenadas.modelo,
        cod_marca: productoConImagenesOrdenadas.cod_marca,
        nombre: productoConImagenesOrdenadas.nombre,
        caracteristicas: productoConImagenesOrdenadas.caracteristicas,
        precio: productoConImagenesOrdenadas.precio,
        cantidad: productoConImagenesOrdenadas.cantidad,
        estatus: productoConImagenesOrdenadas.estatus,
        color: productoConImagenesOrdenadas.color,
        especificaciones: productoConImagenesOrdenadas.especificaciones,
        descripcion : productoConImagenesOrdenadas.descripcion,
        imagenes: productoConImagenesOrdenadas.Imagenes ? productoConImagenesOrdenadas.Imagenes.map(imagen => ({ url: imagen.url })) : []
    }

    res.status(200).json(producto)
})

app.get('/api/productos/categoria/:categoria/marca/:marca', async (req, res) => {
    const { categoria, marca } = req.params

    const { data, error } = await supabase
        .from('Productos')
        .select(`
            cod_producto,
            cod_categoria,
            modelo,
            cod_marca,
            nombre,
            caracteristicas,
            precio,
            cantidad,
            estatus,
            color,
            descripcion,
            especificaciones,
            Imagenes (url)
        `)
        .or(`cod_categoria.eq.${categoria},cod_marca.eq.${marca}`)

    if (error) {
        console.log('Error obteniendo productos relacionados:', error)
        return res.status(500).send('Error obteniendo productos relacionados')
    }

    // Ordenar los productos en el código
    const productosOrdenados = data.sort((a, b) => {
        if (a.cod_categoria < b.cod_categoria) return -1
        if (a.cod_categoria > b.cod_categoria) return 1
        if (a.modelo < b.modelo) return -1
        if (a.modelo > b.modelo) return 1
        if (a.cod_producto < b.cod_producto) return -1
        if (a.cod_producto > b.cod_producto) return 1
        return 0
    })

    const productos = productosOrdenados.map(producto => ({
        cod_producto: producto.cod_producto,
        cod_categoria: producto.cod_categoria,
        modelo: producto.modelo,
        cod_marca: producto.cod_marca,
        nombre: producto.nombre,
        caracteristicas: producto.caracteristicas,
        precio: producto.precio,
        cantidad: producto.cantidad,
        estatus: producto.estatus,
        color: producto.color,
        descripcion: producto.descripcion,
        especificaciones : producto.especificaciones,
        imagenes: producto.Imagenes ? producto.Imagenes.map(imagen => ({ url: imagen.url })) : []
    }))

    res.status(200).json(productos)
})

app.get('/api/marca', async (req, res) => {
    const { data, error } = await supabase
        .from('Marcas')
        .select('*')

    if (error) {
        console.log("Error leyendo Marcas:", error)
        return res.status(500).send('Error leyendo Marcas')
    }

    res.json(data)
})

app.get('/api/categoria', async (req, res) => {
    const { data, error } = await supabase
        .from('Categorias')
        .select('*') 
    if (error) {
        console.log("Error leyendo Categorias:", error)
        return res.status(500).send('Error leyendo Categorias')
    }

    res.json(data)
})

app.get('/api/producto', async (req, res) => {
    const { data, error } = await supabase
        .from('Productos')
        .select('*')
        .order('cod_categoria', { ascending: true }) // Ordenar por categoría
        .order('modelo', { ascending: true })        // Luego por modelo
        .order('cod_producto', { ascending: true }) // Finalmente por código de producto

    if (error) {
        console.log("Error leyendo Productos:", error)
        return res.status(500).send('Error leyendo Productos')
    }

    res.json(data)
})

app.post('/api/deleteCategoria', async (req, res) => {
    const { cod_categoria, modelo } = req.body

    const { error } = await supabase
        .from('Categorias')
        .delete()
        .match({ cod_categoria, modelo })

    if (error) {
        console.log('Error borrando Categoria: ', error)
        return res.status(500).send('Error borrando Categoria')
    }

    res.status(200).send('Categoria borrada con éxito')
}) 

app.post('/api/deleteMarca', async (req, res) => {
    const { cod_marca } = req.body

    const { error } = await supabase
        .from('Marcas')
        .delete()
        .match({ cod_marca })
    if (error) {
        console.log('Error borrando Marca: ', error)
        return res.status(500).send('Error borrando Marca')
    }

    res.status(200).send('Marca borrada con éxito')
})

app.post('/api/deleteProducto', async (req, res) => {
    const { cod_producto } = req.body

    const { error } = await supabase
        .from('Productos')
        .delete()
        .match({ cod_producto })

    if (error) {
        console.log('Error borrando Producto: ', error)
        return res.status(500).send('Error borrando Producto')
    }

    res.status(200).send('Producto borrado con éxito')
})

app.get('/api/producto/:cod_producto', async (req, res) => {
    const { cod_producto } = req.params

    const { data, error } = await supabase
        .from('Productos')
        .select('*')
        .eq('cod_producto', cod_producto) 
        .single() 

    if (error) {
        console.log("Error leyendo Productos:", error)
        return res.status(500).send('Error leyendo Productos')
    }

    if (!data) {
        return res.status(404).send('Producto no encontrado')
    }

    res.json(data)
})

app.put('/api/producto', async (req, res) => { 
    const { cod_producto_original, cod_producto_nuevo, cod_categoria, modelo, cod_marca, descripcion, caracteristicas, precio, cantidad, estatus, color, especificaciones } = req.body

    const { error } = await supabase
        .from('Productos')
        .update({
            cod_producto: cod_producto_nuevo,
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
        .eq('cod_producto', cod_producto_original) 

    if (error) {
        console.log('Error actualizando Producto: ', error)
        return res.status(500).send('Error actualizando Producto')
    }

    res.status(200).send('Producto actualizado con éxito')
})

app.get('/api/marca/:cod_marca', async (req, res) => {
    const { cod_marca } = req.params

    const { data, error } = await supabase
        .from('Marcas')
        .select('*')
        .eq('cod_marca', cod_marca)
        .single()

    if (error) {
        console.log("Error leyendo Marcas:", error)
        return res.status(500).send('Error leyendo Marcas')
    }

    if (!data) {
        return res.status(404).send('Marca no encontrada')
    }

    res.json(data)
})

app.put('/api/marca', async (req, res) => {
    const { cod_marca_original, cod_marca_nuevo, descripcion } = req.body

    const { error } = await supabase
        .from('Marcas')
        .update({
            cod_marca: cod_marca_nuevo,
            descripcion
        })
        .eq('cod_marca', cod_marca_original)

    if (error) {
        console.log('Error actualizando Marca: ', error)
        return res.status(500).send('Error actualizando Marca')
    }

    res.status(200).send('Marca actualizada con éxito')
})

app.get('/api/categoria/:cod_categoria/:modelo', async (req, res) => {
    const { cod_categoria, modelo } = req.params

    const { data, error } = await supabase
        .from('Categorias')
        .select('*')
        .eq('cod_categoria', cod_categoria)
        .eq('modelo', modelo)
        .single()

    if (error) {
        console.log("Error leyendo Categorias:", error)
        return res.status(500).send('Error leyendo Categorias')
    }

    if (!data) {
        return res.status(404).send('Categoria no encontrada')
    }

    res.json(data)
})

app.put('/api/categoria', async (req, res) => {
    const { cod_categoria, modelo, cod_categoria_original, modelo_original, descripcion } = req.body

    const { error } = await supabase
        .from('Categorias')
        .update({
            cod_categoria,
            modelo,
            descripcion
        })
        .eq('cod_categoria', cod_categoria_original)
        .eq('modelo', modelo_original)

    if (error) {
        console.log('Error actualizando Categoría: ', error)
        return res.status(500).send('Error actualizando Categoría')
    }

    res.status(200).send('Categoría actualizada con éxito')
})

app.get('/api/imagenes', async (req, res) => {
    const { data, error } = await supabase
        .from('Imagenes')
        .select('*')

    if (error) {
        console.log("Error leyendo Imagenes:", error)
        return res.status(500).send('Error leyendo Imagenes')
    }

    res.json(data)
})

app.put('/api/imagenes', async (req, res) => {
    const { cod_producto, url_nueva } = req.body

    const { error } = await supabase
        .from('Imagenes')
        .update({ url: url_nueva })
        .eq('cod_producto', cod_producto)

    if (error) {
        console.log("Error actualizando la imagen:", error)
        return res.status(500).send('Error actualizando la imagen')
    }

    res.status(200).send('Imagen actualizada con éxito')
})

app.use(express.static(path.join(__dirname, '../dist')))

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
});

app.listen(port, () => {
    console.log("Server started on port", port)
})