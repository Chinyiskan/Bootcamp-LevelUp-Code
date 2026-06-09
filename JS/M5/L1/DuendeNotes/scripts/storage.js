// ============================================================
//  DuendeNotes — storage.js
//  M5L1 · JavaScript Bootcamp 2026
// ============================================================
//  Este archivo es el escudo contra el duende.
//  Aquí viven las dos funciones que convierten nuestros objetos
//  en texto (para guardarlos) y el texto de vuelta en objetos
//  (para recuperarlos). Sin esto, el duende se lleva todo al recargar.
// ============================================================


// La clave que usamos para identificar nuestros datos en localStorage.
// Es como la etiqueta en una caja del cuarto de archivo — si la cambias,
// localStorage no encuentra los datos anteriores.
let CLAVE_NOTAS = "duendeNotes_notas";


// ────────────────────────────────────────────────────────────
//  🎫 TICKET 1 — guardarNotas(notas)
//
//  Recibe el array completo de notas y lo persiste en localStorage.
//  JSON.stringify convierte el array de objetos en un string de texto
//  porque localStorage solo sabe guardar texto — no objetos.
//
//  Sin esta función: al recargar la página, el duende gana.
//  Con esta función: los datos sobreviven al reload.
// ────────────────────────────────────────────────────────────
function guardarNotas(notas) {
    // JSON.stringify convierte: [{id:1, titulo:"Hola"}] → '[{"id":1,"titulo":"Hola"}]'
    // Puedes verlo en DevTools → Application → localStorage después de guardar una nota
    localStorage.setItem(CLAVE_NOTAS, JSON.stringify(notas));
}


// ────────────────────────────────────────────────────────────
//  🎫 TICKET 2 — cargarNotas()
//
//  Lee el string guardado en localStorage y lo convierte de vuelta
//  a un array de objetos usando JSON.parse. Si no existe nada
//  (primera vez que el usuario entra), retorna un array vacío
//  para que el resto de la app arranque sin errores.
// ────────────────────────────────────────────────────────────
function cargarNotas() {
    let datos = localStorage.getItem(CLAVE_NOTAS);

    // Si nunca se ha guardado nada, localStorage devuelve null
    // En ese caso arrancamos con un array limpio — el duende no llegó todavía
    if (datos === null) {
        return [];
    }

    // JSON.parse hace el proceso inverso al stringify:
    // '[{"id":1,"titulo":"Hola"}]' → [{id:1, titulo:"Hola"}]
    return JSON.parse(datos);
}


// ────────────────────────────────────────────────────────────
//  🔥 BONUS HOMEWORK — limpiarStorage()
//
//  Borra completamente la entrada de localStorage.
//  A diferencia de guardar un array vacío, removeItem
//  elimina la clave por completo — como si nunca hubiera existido.
//  La usamos en el botón "El duende gana" (borrar todo).
// ────────────────────────────────────────────────────────────
function limpiarStorage() {
    localStorage.removeItem(CLAVE_NOTAS);
}