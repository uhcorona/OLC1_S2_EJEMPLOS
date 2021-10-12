let procesarExpresion = require('../operaciones/operar').procesarExpresion;

function ejecutarImprimir(instruccion, ts) {
    let valor = procesarExpresion(instruccion.expresion, ts);
    console.log(valor);
    let salida = valor.valor + '\n';
    return salida;
}

module.exports.ejecutarImprimir = ejecutarImprimir;