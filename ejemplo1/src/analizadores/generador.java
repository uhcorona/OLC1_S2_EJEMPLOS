/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package analizadores;

/**
 *
 * @author rc
 */
public class generador {
    
    public static void main(String[] args) 
    {
        generarAnalizadores();
    }
    
    private static void generarAnalizadores() 
    {
        try {
            String ruta = "src/analizadores/";
            String opcFlex[] = {ruta + "lexico.jflex", "-d", ruta};
            jflex.Main.generate(opcFlex);
            
            String opcCUP[] = {"-destdir", ruta, "-parser", "sintactico", ruta + "sintactico.cup"};
            java_cup.Main.main(opcCUP);
        } catch (Exception e) {
            e.printStackTrace();
            
        }
    }
    
}
