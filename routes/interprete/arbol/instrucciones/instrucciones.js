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
    },
    nuevoIf: (expresion, cuerpoverdadero, cuerpofalso) => {
        return {
            tipo: TipoInstruccion.If,
            expresion: expresion,
            cuerpoverdadero: cuerpoverdadero,
            cuerpofalso: cuerpofalso
        }
    },
    nuevaAsignacion: (id, expresion) => {
        return {
            tipo: TipoInstruccion.Asignacion,
            id: id,
            expresion: expresion
        }
    },
    nuevoWhile: (condicion, cuerpo) => {
        return {
            tipo: TipoInstruccion.While,
            condicion: condicion,
            cuerpo: cuerpo
        }
    }
}

module.exports.Instrucciones = Instrucciones;