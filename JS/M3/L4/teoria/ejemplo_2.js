let biblioteca = [
    { titulo: "Cien años de soledad", genero: "Novela",        precio: 45.00, paginas: 471 },
    { titulo: "El principito",        genero: "Infantil",      precio: 22.00, paginas: 96  },
    { titulo: "1984",                 genero: "Ciencia ficción", precio: 38.00, paginas: 328 },
    { titulo: "Sapiens",              genero: "No ficción",    precio: 52.00, paginas: 443 },
    { titulo: "El alquimista",        genero: "Novela",        precio: 29.00, paginas: 208 }
];

// slice() sin argumentos crea una copia del array completo.
// Ordenamos la copia — el original queda intacto.
let ordenado = biblioteca.slice().sort(function(a, b) {
    return b.precio - a.precio;
});

console.log("Copia ordenada, primero:", ordenado[0].titulo);    // Sapiens
console.log("Original intacto, primero:", biblioteca[0].titulo); // Cien años de soledad ✅

// 🪤 TRAMPA INTENCIONAL — sort sin función de comparación
let precios = [45, 22, 100, 38, 9];
console.log("Sin función:", precios.sort());
// [ 100, 22, 38, 45, 9 ] — convierte a texto y compara caracteres 🤡
// "100" viene antes que "22" porque "1" < "2" en texto

console.log("Con función:", precios.sort(function(a, b) { return a - b; }));
// [ 9, 22, 38, 45, 100 ] — ahora sí ✅

// 👆 Este es el error más común con sort.
// Nunca usarlo sin función cuando hay números.
// Preguntarles: ¿qué pasaría si los precios fueran strings en vez de números?
// Que cambien precio: 45.00 por precio: "45.00" en un objeto y vean qué pasa.