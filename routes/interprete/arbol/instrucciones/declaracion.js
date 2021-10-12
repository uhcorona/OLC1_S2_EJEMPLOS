let procesarExpresion = require('../operaciones/operar').procesarExpresion;
let TipoDato = require('../tipos/tipo-dato').TipoDato;

function ejecutarDeclaracion(instruccion, ts) {
    if (instruccion.expresion != undefined) {
        let valor = procesarExpresion(instruccion.expresion, ts);
        ts.agregar(instruccion.tipo_dato, instruccion.id, valor);
    }
    else {
        let valor;
        switch (instruccion.tipo_dato) {
            case TipoDato.Decimal:
                valor = {
                    tipo: TipoDato.Decimal,
                    valor: 0
                }
                break;
            case TipoDato.Cadena:
                valor = {
                    tipo: TipoDato.Cadena,
                    valor: ""
                }
                break;
            case TipoDato.Bandera:
                valor = {
                    tipo: TipoDato.Bandera,
                    valor: false
                }
                break;
        }
        ts.agregar(instruccion.tipo_dato, instruccion.id, valor);
    }
}

module.exports.ejecutarDeclaracion = ejecutarDeclaracion;