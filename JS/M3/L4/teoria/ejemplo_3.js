let biblioteca = [
    { titulo: "Cien años de soledad", genero: "Novela",        precio: 45.00, stock: 3 },
    { titulo: "El principito",        genero: "Infantil",      precio: 22.00, stock: 8 },
    { titulo: "1984",                 genero: "Ciencia ficción", precio: 38.00, stock: 2 },
    { titulo: "Sapiens",              genero: "No ficción",    precio: 52.00, stock: 5 },
    { titulo: "El alquimista",        genero: "Novela",        precio: 29.00, stock: 1 }
];

// reduce colapsa todo el array en un único valor.
// El acumulador empieza en 0 y crece vuelta a vuelta.

let valorInventario = biblioteca.reduce(function(acumulador, libro) {
    return acumulador + (libro.precio * libro.stock);
}, 0); // 👈 este 0 es el punto de partida

console.log("Valor total del inventario: $" + valorInventario.toFixed(2)); // $693.00

// 👆 Dibujar en pizarra la tabla vuelta a vuelta:
// Vuelta 1: acumulador=0   + (45 × 3) = 135
// Vuelta 2: acumulador=135 + (22 × 8) = 311
// Vuelta 3: acumulador=311 + (38 × 2) = 387
// Vuelta 4: acumulador=387 + (52 × 5) = 647
// Vuelta 5: acumulador=647 + (29 × 1) = 676  ← ese es el resultado final

// 🪤 TRAMPA INTENCIONAL — ¿qué pasa si no pones el valor inicial?
let sinInicial = biblioteca.reduce(function(acumulador, libro) {
    return acumulador + (libro.precio * libro.stock);
}); // sin el 0 al final

console.log("Sin valor inicial:", sinInicial);
// [object Object]135311...  — toma el primer objeto como acumulador inicial 🤡
// y concatena strings porque no sabe sumar un objeto con un número

// 👆 El valor inicial no es opcional cuando trabajas con objetos.
// Preguntarles: si quisieran contar solo el total de libros en stock
// sin multiplicar por precio, ¿qué cambiarían? Solo una parte — que lo intenten.