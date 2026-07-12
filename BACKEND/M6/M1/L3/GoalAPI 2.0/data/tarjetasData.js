// Este es el almacén de datos de las tarjetas.
// Igual que registros.js, vive en memoria por ahora.
let tarjetas = [
  { id: 1, jugador: "Casemiro", seleccion: "Brasil", tipo: "amarilla", minuto: 15 },
  { id: 2, jugador: "Ramos",    seleccion: "España",  tipo: "roja",     minuto: 52 },
  { id: 3, jugador: "Kanté",    seleccion: "Francia", tipo: "amarilla", minuto: 33 }
];
 
// Exportamos el array para que routes/tarjetas.js pueda usarlo
module.exports = tarjetas;