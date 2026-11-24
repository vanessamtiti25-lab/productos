var sequelize = require('sequelize')

// para poder poner las rutas 
module.exports = (conexion) => {

    const ProductoSchema = conexion.define('producto', {
        // aqui van los atributos de nuestra tyabla con las especificaciones
        idProducto: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
////////////////////////////////////////////////////////////
        nombreProducto:{
            type: sequelize.STRING
        },
////////////////////////////////////////////////////////////
        marcaProducto:{
            type: sequelize.STRING
        },
////////////////////////////////////////////////////////////
        precioProducto: {
            type: sequelize.DOUBLE
        }
    });
    // retornamos para que haga referencia a este esquema cuando lo ocupemos
    return ProductoSchema;

}