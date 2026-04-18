// Ejercicio 3: Años bisiestos

function bisiestos(anioInicio) {
  let contador = 0;
  let anio = anioInicio;

  while (contador < 30) {
    // Condición para saber si es bisiesto
    if ((anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0)) {
      console.log(anio);
      contador++;
    }
    anio++; // Pasamos al siguiente año
  }
}

// Probando con el 2024
console.log("Próximos 30 años bisiestos desde 2024:");
bisiestos(2024);
