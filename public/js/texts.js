const frases = [
    "El rápido zorro marrón saltó sobre el perro perezoso.",
    "La vida es como una caja de chocolates, nunca sabes lo que te va a tocar.",
    "Los tres tristes tigres tragan trigo en un trigal.",
    "Un pequeño paso para el hombre, un gran salto para la humanidad.",
    "La única forma de hacer un gran trabajo es amar lo que haces.",
    "En un lugar de la Mancha, de cuyo nombre no quiero acordarme..."
];

// Obtén una frase aleatoria
export const obtenerFraseAleatoria = () =>  {
    /**
     * Math.random() genera un número decimal aleatorio entre 0 y 1 (por ejemplo, 0.123456789).
     * Multiplicamos este número por la longitud del arreglo 'frases' para obtener un número entre 0 y la longitud del arreglo.
     * Math.floor() redondea el número a un entero, lo que nos da un índice válido para el arreglo.
     */
    const indice = Math.floor(Math.random() * frases.length);
  
    /**
     * Usamos el índice para acceder a una frase en el arreglo 'frases'.
     * Esto nos da una frase aleatoria del arreglo.
     */
    const fraseAleatoria = frases[indice];
  
    // Finalmente, devolvemos la frase aleatoria para que pueda ser utilizada en otro lugar.
    return fraseAleatoria;
}

  