// La semana pasada interrogábamos el catálogo.
// Hoy lo vamos a ordenar.

let biblioteca = [
    { titulo: "Cien años de soledad", genero: "Novela",  precio: 45.00, paginas: 471 },
    { titulo: "El principito",        genero: "Infantil", precio: 22.00, paginas: 96  },
    { titulo: "1984",                 genero: "Ciencia ficción", precio: 38.00, paginas: 328 },
    { titulo: "Sapiens",              genero: "No ficción", precio: 52.00, paginas: 443 },
    { titulo: "El alquimista",        genero: "Novela",  precio: 29.00, paginas: 208 }
];

// sort recibe una función que compara dos elementos a la vez: a y b
// La resta decide el orden:
// · b - a → descendente (mayor primero)
// · a - b → ascendente (menor primero)

let porPrecioDesc = biblioteca.sort(function(a, b) {
    return b.precio - a.precio;
});

console.log("Más caro a más barato:");
porPrecioDesc.forEach(function(libro) {
    console.log("$" + libro.precio, "—", libro.titulo);
});
// $52.00 — Sapiens
// $45.00 — Cien años de soledad
// $38.00 — 1984
// $29.00 — El alquimista
// $22.00 — El principito

// 👆 Preguntarles: ¿cómo lo invertimos para ver el más barato primero?
// Que cambien b - a por a - b en vivo.

// 🪤 TRAMPA INTENCIONAL — mostrar esto DESPUÉS del sort
console.log("El primer libro del array original:", biblioteca[0].titulo);
// 👆 Ya no es "Cien años de soledad" — sort SÍ modifica el original.
// Subrayar la diferencia con filter: filter crea uno nuevo, sort reorganiza el mismo.
// Preguntarles: ¿cómo lo evitarían? Pista: slice()