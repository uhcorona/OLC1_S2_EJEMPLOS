const { TipoDato } = require("./tipos/tipo-dato");

class TS {
    constructor(simbolos) {
        this._simbolos = simbolos;
    }
    agregar(tipo, id, valor) {
        var simbolo = this._simbolos.filter((simbolo) => simbolo.id == id);
        if (simbolo.length) {
            //variable existente
            console.log(`La variable ${id} ya existe`);
        }
        else {

            //Casteo Implicito
            if(tipo == valor.tipo){
                this._simbolos.push({
                    tipo: tipo,
                    id: id,
                    valor: valor.valor
                });
            }
            else{
                //Aca ponen sus casteos
                switch(tipo){
                    case TipoDato.Bandera:
                        switch(valor.tipo){
                            case TipoDato.Decimal:
                                if(valor.valor==0){
                                    this._simbolos.push({
                                        tipo: tipo,
                                        id: id,
                                        valor: false
                                    });
                                }
                                else {
                                    this._simbolos.push({
                                        tipo: tipo,
                                        id: id,
                                        valor: true
                                    });
                                }
                                break;
                        }
                        break;
                }
            }
        }
    }
    obtener(id) {
        var simbolo = this._simbolos.filter((simbolo) => simbolo.id == id);
        if (simbolo.length) {
            return simbolo[0];
        }
        else {
            //Variable inexistente
            console.log(`La variable ${id} no existe`);
            return {};
        }
    }
    modificar(id, valor){
        for(let i=0; i<this._simbolos.length;i++){
            if(this._simbolos[i].id == id){
                //Casteos
                this._simbolos[i].valor = valor.valor;
                break;
            }
        }
    }
    //GetSimbolos, esto es para el manejo de ambitos
}

module.exports.TS = TS;