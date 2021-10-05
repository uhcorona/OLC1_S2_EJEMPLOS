let TipoInstruccion = require('./tipos/tipo-instruccion').TipoInstruccion;
let ejecutarImprimir = require('./instrucciones/imprimir').ejecutarImprimir;
let ejecutarDeclaracion = require('./instrucciones/declaracion').ejecutarDeclaracion;
let procesarExpresion = require('./operaciones/operar').procesarExpresion;
let TS = require('./tabla-simbolos').TS;

function ejecutar(instrucciones, tss) {
    let salida = '';
    let ts = new TS(tss);

    instrucciones.forEach((instruccion) => {
        switch (instruccion.tipo) {
            case TipoInstruccion.Declaracion:
                ejecutarDeclaracion(instruccion, ts);
                break;
            case TipoInstruccion.Imprimir:
                salida += ejecutarImprimir(instruccion, ts);
                break;
            case TipoInstruccion.If:
                salida += ejecutarIf(instruccion, ts);
                break;
        }
    });
    return salida;
}

function ejecutarIf(instruccion, ts) {
    let valor = procesarExpresion(instruccion.expresion, ts);
    let salida = '';
    if (valor.valor == true) {
        salida += ejecutar(instruccion.cuerpoverdadero, ts)
    }
    else {
        salida += ejecutar(instruccion.cuerpofalso, ts)
    }
    return salida;
}

module.exports.ejecutar = ejecutar;