let procesarExpresion = require('../operaciones/operar').procesarExpresion;

function ejecutarAsignacion(instruccion, ts) {
    let valor = procesarExpresion(instruccion.expresion, ts);
    ts.modificar(instruccion.id, valor);
}

module.exports.ejecutarAsigancion = ejecutarAsignacion;