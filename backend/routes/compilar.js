var express = require('express');
var router = express.Router();
var parser = require('../routes/interprete/grammar');
let ejecutar = require('./interprete/arbol/interprete').ejecutar;

router.post('/', function (req, res, next) {
    let cadenaDeEntrada = req.body.entrada;
    let instrucciones = parser.parse(cadenaDeEntrada);
    let salida = ejecutar(instrucciones,[]);

    res.json({
        salida: salida
    });
});

module.exports = router;
