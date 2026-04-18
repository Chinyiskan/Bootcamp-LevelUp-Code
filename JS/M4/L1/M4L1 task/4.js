// Ejercicio 4: Marco de texto

function marcoDeTexto(texto) {
  let palabras = texto.split(" ");
  
  // Usamos métodos de array para encontrar la longitud máxima más fácil
  // map transforma el array de palabras en un array de números (las longitudes)
  let longitudes = palabras.map(palabra => palabra.length);
  // Math.max con el spread operator (...) nos dice cuál es el número mayor
  let maxLong = Math.max(...longitudes);

  let anchoMarco = maxLong + 4;
  
  // Podemos usar el método repeat de los strings para multiplicar el símbolo
  let borde = "*".repeat(anchoMarco);

  console.log(borde);

  // Usamos forEach (método de array) para recorrer la lista de palabras
  palabras.forEach(palabra => {
    let espaciosFaltantes = maxLong - palabra.length;
    let espacios = " ".repeat(espaciosFaltantes);
    
    // Podemos usar los template literals (las comillas invertidas ``) 
    // para inyectar variables en textos más cómodamente
    console.log(`* ${palabra}${espacios} *`);
  });

  console.log(borde);
}

marcoDeTexto("¿Qué te parece el reto?");
