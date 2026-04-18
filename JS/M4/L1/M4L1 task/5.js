// Ejercicio 5: Daño Pokémon

class Pokemon {
  constructor(nombre, tipo, ataque, defensa) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.ataque = ataque;
    this.defensa = defensa;
  }
}

function calcularDanio(atacante, defensor) {
  // En lugar de muchos if/else, usamos un objeto literal como diccionario
  // Las llaves principales son el tipo del atacante, dentro hay otro objeto con el tipo de defensor y la efectividad
  const tablaEfectividad = {
    "Fuego": { "Planta": 2, "Agua": 0.5 },
    "Agua": { "Fuego": 2, "Planta": 0.5, "Eléctrico": 0.5 },
    "Planta": { "Agua": 2, "Fuego": 0.5 },
    "Eléctrico": { "Agua": 2 }
  };

  let efectividad = 1; // Valor por defecto

  // Si existe ese atacante en nuestra tabla y además existe ese atacante contra el defensor...
  if (tablaEfectividad[atacante.tipo] && tablaEfectividad[atacante.tipo][defensor.tipo]) {
    // ... entonces sacamos el valor desde nuestro objeto
    efectividad = tablaEfectividad[atacante.tipo][defensor.tipo];
  }

  let danio = 50 * (atacante.ataque / defensor.defensa) * efectividad;
  
  console.log(`${atacante.nombre} ataca a ${defensor.nombre} causando ${danio} de daño!`);
  return danio;
}

// Creamos los Pokémon
let pikachu = new Pokemon("Pikachu", "Eléctrico", 55, 40);
let squirtle = new Pokemon("Squirtle", "Agua", 48, 65);
let bulbasaur = new Pokemon("Bulbasaur", "Planta", 49, 49);
let charmander = new Pokemon("Charmander", "Fuego", 52, 43);

// Batallas!
calcularDanio(pikachu, squirtle); // Eléctrico a Agua -> x2
calcularDanio(squirtle, bulbasaur); // Agua a Planta -> x0.5
calcularDanio(charmander, bulbasaur); // Fuego a Planta -> x2
