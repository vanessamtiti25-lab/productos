var sequelize = require('sequelize')
var productoModelo = require('./models/producto.js')

//4RdjomRlS4zjXewx
//conexion con la Bd
const conexion = new sequelize('productos', '3GqVPtu7192L1G9.root', '4RdjomRlS4zjXewx', {
   host: 'gateway01.us-west-2.prod.aws.tidbcloud.com',
   port: '4000',
    dialect: 'mysql', 
    dialectOptions :{
      ssl:{
         minVersion: 'TLSv1.2',
         rejectUnauthorized: true
      }
    }

});
//genera la tabla o comprueba que este
const producto = productoModelo(conexion);

//
conexion.sync({force:false})
 .then(() => {
    console.log('Conexion exitosa con la BD');
 })
 .catch((e) => {
    console.log('Error en la conexion: '+e)
 });

 //exportar el modulo
 module.exports = {
    producto
 }
