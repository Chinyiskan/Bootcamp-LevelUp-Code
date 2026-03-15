// Antes: una variable por dato 😫
let nombre1 = "Sara";
let nombre2 = "Luis";
let nombre3 = "Valeria";

// Ahora: todos juntos en una caja 📦
let nombres = ["Sara", "Luis", "Valeria"];

console.log(nombres);    // El array completo
console.log(nombres[0]); // "Sara"
console.log(nombres[1]); // "Luis"
console.log(nombres[2]); // "Valeria"

// 🪤 TRAMPA INTENCIONAL — ¿qué pasa aquí?
console.log(nombres[3]);