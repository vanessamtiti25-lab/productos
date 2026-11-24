var express = require ('express')
var productosRutas = require ('./routs/producto-routes')


var app = express()

//motor de vistas
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.use('/', productosRutas)

var port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Servidor corriendo en el puerto: '+port)
})