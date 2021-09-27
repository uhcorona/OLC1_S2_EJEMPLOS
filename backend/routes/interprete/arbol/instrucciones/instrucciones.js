let TipoInstruccion = require('../tipos/tipo-instruccion').TipoInstruccion;

let Instrucciones = {
    nuevaOperacionBinaria: (tipo, operandoIzquierdo, operandoDerecho/*, linea, columna*/) => {
        return {
            tipo: tipo,
            operandoIzquierdo: operandoIzquierdo,
            operandoDerecho: operandoDerecho,
            /*error: undefined,
            linea: linea,
            columna: columna*/
        }
    },
    nuevaOperacionUnaria: (tipo, operandoIzquierdo) => {
        return {
            tipo: tipo,
            operandoIzquierdo: operandoIzquierdo,
            operandoDerecho: undefined
        }
    },
    nuevoValor: (tipo, valor) => {
        return {
            tipo: tipo,
            valor: valor
        }
    },
    nuevaDeclaracion: (tipo, id, expresion) => {
        return {
            tipo: TipoInstruccion.Declaracion,
            tipo_dato: tipo,
            id: id,
            expresion: expresion
        }
    },
    nuevoImprimir: (expresion) => {
        return {
            tipo: TipoInstruccion.Imprimir,
            expresion: expresion
        }
    }
}

module.exports.Instrucciones = Instrucciones;