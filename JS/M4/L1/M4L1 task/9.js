// Ejercicio 9: Sucesión de Fibonacci

let a = 0;
let b = 1;

// Ahora guardaremos los números en un arreglo en lugar de sumar poco a poco un texto largo
let numerosFibonacci = [];

for (let i = 1; i <= 50; i++) {
  // Añadimos el número actual a nuestra lista con el método push de Array
  numerosFibonacci.push(a);

  // Preparamos para el siguiente ciclo
  let siguienteNumero = a + b;
  a = b;
  b = siguienteNumero;
}

console.log("Aquí están los 50 primeros números de la secuencia de Fibonacci:");

// Usamos el método join() para convertir nuestro Array gigante
// devolviendo todos los números unidos en un texto separado por comas
console.log(numerosFibonacci.join(", "));
