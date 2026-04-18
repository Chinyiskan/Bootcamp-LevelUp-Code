// Ejercicio 6: Los ejércitos

class Raza {
  constructor(nombre, bando, valor, integrantes) {
    this.nombre = nombre;
    this.bando = bando;
    this.valor = valor;
    this.integrantes = integrantes;
  }
}

function calcularResultadoBatalla(ejercitoBien, ejercitoMal) {
  // Usamos el método reduce() de los arrays para sumar todas las fuerzas fácilmente
  // reduce tiene un "acumulador" (suma) y un elemento iterado (tropa)
  let fuerzaBien = ejercitoBien.reduce((suma, tropa) => {
    return suma + (tropa.valor * tropa.integrantes);
  }, 0); // Este 0 es donde empieza el total de la suma

  let fuerzaMal = ejercitoMal.reduce((suma, tropa) => {
    return suma + (tropa.valor * tropa.integrantes);
  }, 0);

  console.log("Fuerza total del Bien: " + fuerzaBien);
  console.log("Fuerza total del Mal: " + fuerzaMal);

  if (fuerzaBien > fuerzaMal) {
    console.log("¡Han ganado las fuerzas del Bien!");
  } else if (fuerzaMal > fuerzaBien) {
    console.log("¡Han ganado las fuerzas del Mal!");
  } else {
    console.log("¡Es un empate! Todos se retiran por hoy...");
  }
}

// Armamos los ejércitos
let ejercitoDelBien = [
  new Raza("Elfos", "Bien", 5, 100),
  new Raza("Enanos", "Bien", 3, 200),
  new Raza("Pelosos", "Bien", 1, 50)
];

let ejercitoDelMal = [
  new Raza("Orcos", "Mal", 2, 400),
  new Raza("Trolls", "Mal", 5, 40),
  new Raza("Huargos", "Mal", 3, 50)
];

calcularResultadoBatalla(ejercitoDelBien, ejercitoDelMal);
