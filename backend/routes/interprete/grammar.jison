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
"si"                    return 'iff';
"sino"                  return 'elsee';
"{"                     return 'llavea';
"}"                     return 'llavec';
"("                     return 'parentesisa';
")"                     return 'parentesisc';

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
    : CUERPO DECLARACION            { $1.push($2); $$ =$1; }
    | CUERPO IMPRIMIR               { $1.push($2); $$ =$1; }
    | CUERPO IF                     { $1.push($2); $$ =$1; }
    | DECLARACION                   { $$ = [$1]; }
    | IMPRIMIR                      { $$ = [$1]; }
    | IF                            { $$ = [$1]; };

DECLARACION
    : TIPO identificador menor menos EXP pcoma              { $$ = Instrucciones.nuevaDeclaracion($1, $2, $5); }
    | TIPO identificador pcoma                              { $$ = Instrucciones.nuevaDeclaracion($1, $2, undefined);};

TIPO
    : decimal           { $$ = TipoDato.Decimal; }
    | cadena            { $$ = TipoDato.Cadena; }
    | bandera           { $$ = TipoDato.Bandera; };

IMPRIMIR
    : imprimir menor menor EXP pcoma           { $$ = Instrucciones.nuevoImprimir($4); };

EXP
    : EXP mas EXP                   { $$ = Instrucciones.nuevaOperacionBinaria(TipoOperacion.Suma, $1, $3); }
    | EXP por EXP                   { $$ = Instrucciones.nuevaOperacionBinaria(TipoOperacion.Multiplicacion, $1, $3); }
    | EXP menor EXP                 { $$ = Instrucciones.nuevaOperacionBinaria(TipoOperacion.Menor, $1, $3); }
    | decimall                      { $$ = Instrucciones.nuevoValor(TipoValor.Decimal, Number($1)); }
    | identificador                 { $$ = Instrucciones.nuevoValor(TipoValor.Identificador, $1)};

IF
    : iff parentesisa EXP parentesisc llavea CUERPO llavec                                  { $$ = Instrucciones.nuevoIf($3, $6, []); }
    | iff parentesisa EXP parentesisc llavea CUERPO llavec elsee llavea CUERPO llavec       { $$ = Instrucciones.nuevoIf($3, $6, $10); };
