// El while no sabe cuántas vueltas va a dar. Solo sabe cuándo parar.

let combustible = 100;

while (combustible > 0) {
  console.log("🚗 Viajando... Combustible: " + combustible);
  combustible -= 25;
}

console.log("⛽ Se acabó el combustible. Parado.");
// 👆 Key insight: el for es para cuando SABES cuántas veces.
// El while es para cuando dependes de una CONDICIÓN que puede cambiar.