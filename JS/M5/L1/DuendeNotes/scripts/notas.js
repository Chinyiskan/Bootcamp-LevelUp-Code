// ============================================================
//  DuendeNotes — notas.js
//  Modelo de datos: lógica pura de notas (sin DOM)
// ============================================================

// Array en memoria — fuente de verdad durante la sesión
let notas = [];

// ────────────────────────────────────────────────────────────
//  Inicializar desde localStorage
// ────────────────────────────────────────────────────────────
function inicializarNotas() {
    notas = cargarNotas();
}

// ────────────────────────────────────────────────────────────
//  Crear nota nueva
// ────────────────────────────────────────────────────────────
function crearNota(titulo, contenido) {
    let nota = {
        id:        Date.now(),
        titulo:    titulo.trim(),
        contenido: contenido.trim(),
        fecha:     new Date().toLocaleDateString('es-ES', {
                       day: '2-digit', month: 'short', year: 'numeric'
                   }),
        favorita:  false
    };
    notas.unshift(nota); // Las nuevas van al principio
    guardarNotas(notas);
    return nota;
}

// ────────────────────────────────────────────────────────────
//  Eliminar nota por ID
// ────────────────────────────────────────────────────────────
function eliminarNota(id) {
    notas = notas.filter(function(n) { return n.id !== id; });
    guardarNotas(notas);
}

// ────────────────────────────────────────────────────────────
//  Togglear favorita
// ────────────────────────────────────────────────────────────
function toggleFavorita(id) {
    let nota = notas.find(function(n) { return n.id === id; });
    if (nota) {
        nota.favorita = !nota.favorita;
        guardarNotas(notas);
        return nota.favorita;
    }
    return false;
}

// ────────────────────────────────────────────────────────────
//  Obtener notas (con filtro de búsqueda opcional)
// ────────────────────────────────────────────────────────────
function obtenerNotas(filtro) {
    if (!filtro || filtro.trim() === '') {
        return notas;
    }
    let q = filtro.toLowerCase();
    return notas.filter(function(n) {
        return n.titulo.toLowerCase().includes(q) ||
               n.contenido.toLowerCase().includes(q);
    });
}

// ────────────────────────────────────────────────────────────
//  Borrar todas las notas
// ────────────────────────────────────────────────────────────
function borrarTodasLasNotas() {
    notas = [];
    limpiarStorage();
}

// ────────────────────────────────────────────────────────────
//  Total de notas
// ────────────────────────────────────────────────────────────
function totalNotas() {
    return notas.length;
}
