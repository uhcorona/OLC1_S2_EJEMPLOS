let TipoInstruccion = require('./tipos/tipo-instruccion').TipoInstruccion;
let ejecutarImprimir = require('./instrucciones/imprimir').ejecutarImprimir;

function ejecutar(instrucciones) {
    let salida = '';
    let ts = [];
    
    instrucciones.forEach((instruccion) => {
        switch (instruccion.tipo) {
            case TipoInstruccion.Declaracion:
                break;
            case TipoInstruccion.Imprimir:
                salida += ejecutarImprimir(instruccion, ts);
                break;
        }
    });
    return salida;
}

module.exports.ejecutar = ejecutar;