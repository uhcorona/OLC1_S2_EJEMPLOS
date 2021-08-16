/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package aplicacion;

/**
 *
 * @author rc
 */
public class nodo {

    public int id;
    public nodo hizq;
    public nodo hder;
    public String tipoOperacion;
    public Double valor;

    public nodo(int id, String tipoOperacion, nodo hizq, nodo hder) {
        this.id = id;
        this.tipoOperacion = tipoOperacion;
        this.hizq = hizq;
        this.hder = hder;
    }

    public nodo(int id, String tipoOperacion, Double valor) {
        this.id = id;
        this.tipoOperacion = tipoOperacion;
        this.valor = valor;
    }

    public Double operar(nodo nodoActual) {
        if ("VALOR".equals(nodoActual.tipoOperacion)) {
            return nodoActual.valor;
        } else {
            Double resultado1 = operar(nodoActual.hizq);
            Double resultado2 = operar(nodoActual.hder);
            Double resultadoFinal = 0.0;

            switch (nodoActual.tipoOperacion) {
                case "SUMA":
                    resultadoFinal = resultado1 + resultado2;
                    nodoActual.valor = resultadoFinal;
                    return resultadoFinal;
                case "RESTA":
                    resultadoFinal = resultado1 - resultado2;
                    nodoActual.valor = resultadoFinal;
                    return resultadoFinal;
                case "MULTIPLICACION":
                    resultadoFinal = resultado1 * resultado2;
                    nodoActual.valor = resultadoFinal;
                    return resultadoFinal;
                case "DIVISION":
                    resultadoFinal = resultado1 / resultado2;
                    nodoActual.valor = resultadoFinal;
                    return resultadoFinal;
            }
        }
        return -1.0;
    }

}
