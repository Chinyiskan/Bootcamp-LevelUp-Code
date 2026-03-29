// La semana pasada construíamos objetos. Hoy los vamos a interrogar.

let catalogo = [
    { titulo: "Attack on Titan",   genero: "Acción",  rating: 9.1 },
    { titulo: "Your Name",         genero: "Romance", rating: 9.0 },
    { titulo: "Demon Slayer",      genero: "Acción",  rating: 8.7 },
    { titulo: "Violet Evergarden", genero: "Drama",   rating: 8.9 },
    { titulo: "Jujutsu Kaisen",    genero: "Acción",  rating: 8.6 }
];

// filter recorre el array y guarda solo los que pasan la prueba
let soloAccion = catalogo.filter(function(anime) {
    return anime.genero === "Acción";
});

console.log("Animes de acción:", soloAccion.length); // 3
console.log(soloAccion);

// También funciona con números
let mejorRating = catalogo.filter(function(anime) {
    return anime.rating >= 9.0;
});

console.log("Rating 9.0 o más:", mejorRating.length); // 2
console.log(mejorRating);

// 🪤 TRAMPA INTENCIONAL — ¿qué pasa con el array original?
console.log("El catálogo original sigue intacto:", catalogo.length); // 5

// 👆 Subrayar esto: filter NUNCA toca el array original.
// Crea uno nuevo con los que pasaron la criba.
// Preguntarles: si quisieran solo los de Acción con rating mayor a 8.8,
// ¿cómo lo harían? Que lo intenten: return anime.genero === "Acción" && anime.rating > 8.8