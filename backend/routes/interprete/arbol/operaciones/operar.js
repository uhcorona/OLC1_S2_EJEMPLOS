let TipoOperacion = require('../tipos/tipo-operacion').TipoOperacion;
let TipoDato = require('../tipos/tipo-dato').TipoDato;
let TipoValor = require('../tipos/tipo-valor').TipoValor;

function procesarExpresion(expresion, ts) {
    /*if(expresion.error) {
        return expresion;
    }*/
    let valorIzq;
    let valorDer;
    let resultado;
    switch (expresion.tipo) {
        case TipoOperacion.Suma:
            valorIzq = procesarExpresion(expresion.operandoIzquierdo, ts);
            valorDer = procesarExpresion(expresion.operandoDerecho, ts);
            resultado = procesarSuma(valorIzq, valorDer);
            return resultado;
        case TipoOperacion.Resta:
            break;
        case TipoOperacion.Multiplicacion:
            valorIzq = procesarExpresion(expresion.operandoIzquierdo, ts);
            valorDer = procesarExpresion(expresion.operandoDerecho, ts);
            resultado = procesarMultiplicacion(valorIzq, valorDer);
            return resultado;
        case TipoOperacion.Division:
            break;
        case TipoValor.Bandera:
            break;
        case TipoValor.Decimal:
            return { tipo: TipoDato.Decimal, valor: expresion.valor }
        case TipoValor.Cadena:
            break;
        case TipoValor.Identificador:
            break;
    }
}

function procesarSuma(valorIzq, valorDer) {
    //Seccion de casteos suma
    switch (valorIzq.tipo) {
        case TipoDato.Decimal:
            switch (valorDer.tipo) {
                case TipoDato.Decimal:
                    return {
                        tipo: TipoDato.Decimal,
                        valor: valorIzq.valor + valorDer.valor
                    }
                case TipoDato.Bandera:
                    // Error
                    /*return {
                        error: 'No se puede sumar un decimal con una bandera',
                        linea: expresion.linea,
                        columna: expresion.columna
                    }*/
                    break;
                case TipoDato.Cadena:
                    return {
                        tipo: TipoDato.Cadena,
                        valor: String(valorIzq.valor) + String(valorDer.valor)
                    }
            }
            break;
        case TipoDato.Bandera:
            switch (valorDer.tipo) {
                case TipoDato.Decimal:
                    //Operacion no realizable
                    break;
                case TipoDato.Bandera:
                    //Operacion no realizable
                    break;
                case TipoDato.Cadena:
                    //Operacio no realizable
                    break;
            }
            break;
        case TipoDato.Cadena:
            switch (valorDer.tipo) {
                case TipoDato.Decimal:
                    break;
                case TipoDato.Bandera:
                    //Operacion no realizable
                    break;
                case TipoDato.Cadena:
                    break;
            }
            break;
    }
}

function procesarMultiplicacion(valorIzq, valorDer) {
    //Seccion de casteos suma
    switch (valorIzq.tipo) {
        case TipoDato.Decimal:
            switch (valorDer.tipo) {
                case TipoDato.Decimal:
                    return {
                        tipo: TipoDato.Decimal,
                        valor: valorIzq.valor * valorDer.valor
                    }
                case TipoDato.Bandera:
                    // Error
                    /*return {
                        error: 'No se puede sumar un decimal con una bandera',
                        linea: expresion.linea,
                        columna: expresion.columna
                    }*/
                    break;
                case TipoDato.Cadena:
                    //Error
                    break;
            }
            break;
        case TipoDato.Bandera:
            switch (valorDer.tipo) {
                case TipoDato.Decimal:
                    //Operacion no realizable
                    break;
                case TipoDato.Bandera:
                    //Operacion no realizable
                    break;
                case TipoDato.Cadena:
                    //Operacio no realizable
                    break;
            }
            break;
        case TipoDato.Cadena:
            switch (valorDer.tipo) {
                case TipoDato.Decimal:
                    break;
                case TipoDato.Bandera:
                    //Operacion no realizable
                    break;
                case TipoDato.Cadena:
                    break;
            }
            break;
    }
}

module.exports.procesarExpresion = procesarExpresion;