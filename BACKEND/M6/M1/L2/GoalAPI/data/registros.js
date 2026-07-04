// Este archivo es el almacén de datos.
// Por ahora los guardamos en memoria — más adelante usaremos una base de datos real.
let goles = [
{ id: 1, jugador: "Messi",   seleccion: "Argentina", minuto: 23 },
{ id: 2, jugador: "Mbappé",  seleccion: "Francia",   minuto: 37 },
{ id: 3, jugador: "Vini Jr", seleccion: "Brasil",    minuto: 61 },
{ id: 4, jugador: "Yamal",   seleccion: "España",    minuto: 44 }
];

// Exportamos el array para que otros archivos puedan usarlo
module.exports = goles;