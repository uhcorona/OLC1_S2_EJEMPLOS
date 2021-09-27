%lex

%options case-insensitive

%%


\s+											// se ignoran espacios en blanco
"//".*                                      //Comentario unilinea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]         //Comentario multilinea

";"                     return 'pcoma';
"cadena"                return 'cadena';
"decimal"               return 'decimal';
"bandera"               return 'bandera';
"-"                     return 'menos';
"+"                     return 'mas';
"*"                     return 'por';
"/"                     return 'dividido';
"<="                    return 'menorigual';
">="                    return 'mayorigual';
"=="                    return 'igualigual';
"!="                    return 'noigual';
"<"                     return 'menor';
">"                     return 'mayor';
"="                     return 'igual';
"true"                  return 'truee';
"false"                 return 'falsee';
"cout"                  return 'imprimir';

\"[^\"]*\"                  { yytext = yytext.substr(1, yyleng-2); return 'cadenaa'; }
[0-9]+("."[0-9]+)?\b        return 'decimall';
\'[^\']?\'                  { yytext = yytext.substr(1, yyleng-2); return 'caracterr'; }
([a-zA-Z])[a-zA-Z0-9_]*     return 'identificador';

<<EOF>>                 return 'EOF';

.           {console.log('Error Lexico: '+yytext+' en la linea' + yylloc.first_line + ' en la columna '+yylloc.first_column); }

/lex

%{
    let TipoDato = require('./arbol/tipos/tipo-dato').TipoDato;
    let TipoValor = require('./arbol/tipos/tipo-valor').TipoValor;
    let Instrucciones = require('./arbol/instrucciones/instrucciones').Instrucciones;
    let TipoOperacion = require('./arbol/tipos/tipo-operacion').TipoOperacion;
%}

%left 'menor' 'menorigual' 'mayor' 'mayorigual' 'igualigual' 'noigual'
%left 'mas' 'menos'
%left 'por' 'dividido'
%left UMENOS

%start INICIO

%%

INICIO
    : CUERPO EOF                                            { console.log("Analisis Terminado"); return $1; };

CUERPO
    : CUERPO DECLARACION
    | CUERPO IMPRIMIR               { $1.push($2); $$ =$1; }
    | DECLARACION
    | IMPRIMIR                      { $$ = [$1]; };

DECLARACION
    : TIPO identificador menor menos EXP pcoma
    | TIPO identificador pcoma;

TIPO
    : decimal
    | cadena
    | bandera;

IMPRIMIR
    : imprimir menor menor EXP pcoma           { $$ = Instrucciones.nuevoImprimir($4); };

EXP
    : EXP mas EXP                   { $$ = Instrucciones.nuevaOperacionBinaria(TipoOperacion.Suma, $1, $3); }
    | EXP por EXP                   { $$ = Instrucciones.nuevaOperacionBinaria(TipoOperacion.Multiplicacion, $1, $3); }
    | decimall                      { $$ = Instrucciones.nuevoValor(TipoValor.Decimal, Number($1)); };