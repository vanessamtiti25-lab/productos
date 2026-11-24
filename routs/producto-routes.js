var router = require('express').Router()
var { producto } = require ('../conexion')

//ruta raiz
router.get('/',(req, res) => {
    res.render('pages/index')

})

// ruta para la pagina de insertar
router.get('/insertarProducto', (req,res) => {
    res.render('pages/insertarProducto')
})

//ruta o petición para insertar un registro (producto nuevo)
router.post('/guardarProducto', (req,res) => {
    producto.create(req.body)
    .then(() =>{
        console.log('Se insertó correctamente')
        res.redirect('/listarProductos')
    })
    .catch ((e) => {
        console.log('Error al insertar: '+e)
    })
})

//ruta o peticion para obtener todos los productos
router.get('/listarProductos', (req,res) => {
    producto.findAll()  // este es un select 
    .then((data) => {
        res.render('pages/listarProductos', {productos: data})
    })
    .catch((e) => {
        console.log('Error en la consulta: '+e)
    })
})

// buscar por id o sun solo elemento
//ruta o peticion para obtener un producto por su id 
router.get('/buscarProducto/:idProducto', (req,res) => {
    producto.findOne({
        where: {
            idProducto: req.params.idProducto
        }
    })
    .then((data) => {
        if (!data) {
            return res.redirect('/listarProductos')
        }
        res.render('pages/modificarProducto', {producto: data})
        // data es una sola fila (findOne)
    })
    .catch ((e) => {
        console.log('Error en la consulta: '+e)
        res.status(500).send('Error en la consulta: '+e)
    })
})

//ruta o peticion para modificar un producto existente
router.post('/modificarProducto', (req,res) => {
    var idProducto = req.body.idProducto;
    const ProductoModificado = {
        nombreProducto: req.body.nombreProducto,
        marcaProducto: req.body.marcaProducto, 
        precioProducto: req.body.precioProducto
    }
    producto.update(ProductoModificado, {
        where:{
            idProducto: idProducto
        }
    })
    .then((data) => {
        console.log('Se modifico correctamente el producto')
        res.redirect('/listarProductos')
    })
    .catch ((e) => {
        console.log('Error al modificar: '+e)
        res.status(500).send('Error al modificar: '+e)
    })
})

//ruta o peticion para eliminar un producto
router.get('/eliminarProducto/:idProducto', (req,res) => {
    producto.destroy({
        where: {
            idProducto: req.params.idProducto
        }
    })
    .then((data) => {
        console.log('Se eliminó correctamente el producto')
        res.redirect('/listarProductos')
    })
    .catch ((e) => {
        console.log('Error al eliminar: '+e)
    })
})

module.exports = router;


