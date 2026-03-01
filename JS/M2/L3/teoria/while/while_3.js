// continue NO rompe el bucle. Solo salta esa iteración y sigue.

let numero = 0;

while (numero < 10) {
  numero++;

  if (numero === 5) {
    console.log("⏭️ Saltando el 5...");
    continue; // Salta todo lo que viene después en esta vuelta
  }

  console.log("Procesando número: " + numero);
}
