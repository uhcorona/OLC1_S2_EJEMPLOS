let TipoInstruccion = require('./tipos/tipo-instruccion').TipoInstruccion;
let ejecutarImprimir = require('./instrucciones/imprimir').ejecutarImprimir;
let ejecutarDeclaracion = require('./instrucciones/declaracion').ejecutarDeclaracion;
let procesarExpresion = require('./operaciones/operar').procesarExpresion;
let ejecutarAsignacion = require('./instrucciones/asignacion').ejecutarAsigancion;
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
            case TipoInstruccion.Asignacion:
                ejecutarAsignacion(instruccion, ts);
                break;
            case TipoInstruccion.While:
                salida += ejecutarWhile(instruccion, ts);
                break;
        }
    });
    return salida;
}

function ejecutarIf(instruccion, ts) {
    let valor = procesarExpresion(instruccion.expresion, ts);
    let salida = '';
    if (valor.valor == true) {
        salida += ejecutar(instruccion.cuerpoverdadero, ts._simbolos)
    }
    else {
        salida += ejecutar(instruccion.cuerpofalso, ts._simbolos)
    }
    return salida;
}

function ejecutarWhile(instruccion, ts) {
    let condicion = procesarExpresion(instruccion.condicion, ts);
    let salida = '';

    let tsanterior = ts;

    while (condicion.valor == true) {

        //Empieza la creacion del nuevo ambito (Notar que se manda copias de cada simbolo y se crea una nuevo ambito en cada iteracino)
        let nuevossimbolos = [];
        for (let i = 0; i < ts._simbolos.length; i++) {
            nuevossimbolos.push(ts._simbolos[i]);
        }
        let tsnueva = new TS(nuevossimbolos);
        //Finaliza la creacion del nuevo ambito

        salida += ejecutar(instruccion.cuerpo, tsnueva._simbolos);
        condicion = procesarExpresion(instruccion.condicion, tsnueva);
    }


    ts = tsanterior;
    return salida;
}

module.exports.ejecutar = ejecutar;