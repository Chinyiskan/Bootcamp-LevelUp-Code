// Ejercicio 8: ¿Es número primo?

function esPrimo(numero) {
  // El 1 y los que están debajo no son primos, así es la regla matemática!
  if (numero <= 1) {
    return false;
  }

  // Comprobamos si tiene divisores escondidos entre el 2 y el numero-1
  for (let i = 2; i < numero; i++) {
    if (numero % i === 0) {
      // Como encontramos un divisor, ¡no es primo!
      return false; 
    }
  }

  // Si cruzó todo el bucle sin chocar con divisores, ¡es un número primo!
  return true;
}

// Probando con los números del ejemplo
console.log("¿El 2 es primo? " + esPrimo(2));
console.log("¿El 7 es primo? " + esPrimo(7));
console.log("¿El 10 es primo? " + esPrimo(10));
console.log("¿El 1 es primo? " + esPrimo(1));
console.log("¿El 97 es primo? " + esPrimo(97));
