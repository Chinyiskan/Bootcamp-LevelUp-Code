// Antes: datos sueltos sin relación 😫
let nombre = "Camila";
let edad = 24;
let ciudad = "Bogotá";

// Ahora: todo junto con identidad propia 🎯
let usuario = {
  nombre: "Camila",
  edad:   24,
  ciudad: "Bogotá"
};

// Acceder con punto
console.log(usuario.nombre);
console.log(usuario.edad);

// Modificar una propiedad
usuario.ciudad = "Medellín";
console.log("Ciudad actualizada:", usuario.ciudad);

// 🪤 TRAMPA INTENCIONAL — ¿qué devuelve esto?
console.log(usuario.telefono);

// 👆 Igual que con arrays: undefined.
// No es error, es "busqué esa propiedad y no existe".
