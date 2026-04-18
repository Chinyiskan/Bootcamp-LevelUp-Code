// Ejercicio 2: Cuadrado y triángulo

function dibujarFigura(lado, figura) {
  if (figura === "cuadrado") {
    // Dibujar un cuadrado
    for (let i = 0; i < lado; i++) {
      let fila = "";
      for (let j = 0; j < lado; j++) {
        fila += "*";
      }
      console.log(fila);
    }
  } else if (figura === "triangulo") {
    // Dibujar un triángulo
    for (let i = 1; i <= lado; i++) {
      let fila = "";
      for (let j = 0; j < i; j++) {
        fila += "*";
      }
      console.log(fila);
    }
  } else {
    console.log("Esa figura no la conozco");
  }
}

console.log("--- Cuadrado ---");
dibujarFigura(4, "cuadrado");

console.log("--- Triángulo ---");
dibujarFigura(4, "triangulo");
