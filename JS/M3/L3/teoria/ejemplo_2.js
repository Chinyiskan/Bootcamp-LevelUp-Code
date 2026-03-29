let catalogo = [
    { titulo: "Attack on Titan",   genero: "Acción",  rating: 9.1 },
    { titulo: "Your Name",         genero: "Romance", rating: 9.0 },
    { titulo: "Demon Slayer",      genero: "Acción",  rating: 8.7 },
    { titulo: "Violet Evergarden", genero: "Drama",   rating: 8.9 },
    { titulo: "Jujutsu Kaisen",    genero: "Acción",  rating: 8.6 }
];

// find retorna el OBJETO directamente, no un array
let encontrado = catalogo.find(function(anime) {
    return anime.titulo === "Your Name";
});

console.log(encontrado);          // el objeto completo
console.log(encontrado.rating);   // 9.0 — ya puedo usar sus propiedades

// 🪤 TRAMPA INTENCIONAL — ¿qué pasa si no existe?
let noExiste = catalogo.find(function(anime) {
    return anime.titulo === "Dragon Ball";
});

console.log(noExiste); // undefined — no explota, pero tampoco encontró nada

// 👆 Preguntarles: ¿qué pasaría si intentaran noExiste.rating?
// Que lo escriban en vivo — van a ver el TypeError.
// Esa es la razón del if(resultado) antes de usarlo.

// ─────────────────────────────────────────────

// some solo responde true o false — ¿existe alguno que cumpla?
let hayRomance = catalogo.some(function(anime) {
    return anime.genero === "Romance";
});

console.log("¿Hay Romance?", hayRomance); // true

let hayTerror = catalogo.some(function(anime) {
    return anime.genero === "Terror";
});

console.log("¿Hay Terror?", hayTerror); // false

// 👆 Conectar con los guardianes de M2L4:
// "some es como preguntarle al guardia: ¿hay alguien adentro?
// No te da la lista — solo te dice sí o no."
// Diferencia clave para mostrar en pizarra:
// filter → retorna array | find → retorna objeto | some → retorna boolean