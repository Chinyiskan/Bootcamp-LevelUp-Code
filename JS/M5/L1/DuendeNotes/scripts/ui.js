// ============================================================
//  DuendeNotes — ui.js  [ PIXEL ART EDITION ]
//  Capa de presentación: renderiza el DOM, gestiona modales e imágenes
// ============================================================

// ── SVG Icons inline (sin emojis) ───────────────────────────
const SVG_STAR_EMPTY = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
const SVG_STAR_FULL  = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
const SVG_TRASH      = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M9 6V4h6v2"/></svg>`;

// ────────────────────────────────────────────────────────────
//  Renderizar la lista de notas
// ────────────────────────────────────────────────────────────
function renderizarNotas(notasFiltradas) {
    let lista = document.getElementById('listaNotas');
    lista.innerHTML = '';

    if (notasFiltradas.length === 0) {
        let vacio = document.createElement('div');
        vacio.className = 'estado-vacio';
        vacio.innerHTML = `
            <img src="images/duende_duerme.webp" alt="El duende duerme, no hay notas" class="duende-duerme-img" />
            <p class="vacio-titulo">SIN_NOTAS.txt</p>
            <p class="vacio-sub">El duende duerme. Pulsa [+] para crear una nota.</p>
        `;
        lista.appendChild(vacio);
        return;
    }

    notasFiltradas.forEach(function(nota) {
        let card = document.createElement('article');
        card.className = 'nota-card' + (nota.favorita ? ' nota-favorita' : '');
        card.dataset.id = nota.id;

        card.innerHTML = `
            <div class="nota-header">
                <h2 class="nota-titulo">${escaparHTML(nota.titulo)}</h2>
                <div class="nota-acciones">
                    <button
                        class="btn-fav${nota.favorita ? ' activa' : ''}"
                        data-id="${nota.id}"
                        title="${nota.favorita ? 'Quitar favorita' : 'Favorita'}"
                        aria-label="${nota.favorita ? 'Quitar de favoritos' : 'Marcar como favorita'}"
                    >${nota.favorita ? SVG_STAR_FULL : SVG_STAR_EMPTY}</button>
                    <button
                        class="btn-eliminar"
                        data-id="${nota.id}"
                        title="Eliminar nota"
                        aria-label="Eliminar nota"
                    >${SVG_TRASH}</button>
                </div>
            </div>
            <p class="nota-contenido">${escaparHTML(nota.contenido)}</p>
            <time class="nota-fecha" datetime="${nota.id}">${nota.fecha}</time>
        `;

        lista.appendChild(card);
    });
}

// ────────────────────────────────────────────────────────────
//  Contador del header
// ────────────────────────────────────────────────────────────
function actualizarContador(total) {
    document.getElementById('contadorNotas').textContent = total;
}

// ────────────────────────────────────────────────────────────
//  Feedback dentro del modal de creación
// ────────────────────────────────────────────────────────────
function mostrarFeedback(mensaje, tipo) {
    let el = document.getElementById('feedbackMsg');
    el.textContent = '> ' + mensaje;
    el.className = 'pixel-feedback ' + tipo;
    el.style.display = 'block';
    clearTimeout(el._timer);
    el._timer = setTimeout(function() {
        el.style.display = 'none';
        el.className = 'pixel-feedback';
    }, 3000);
}

// ────────────────────────────────────────────────────────────
//  Modal CREAR nota
// ────────────────────────────────────────────────────────────
function abrirModalCrear() {
    let modal = document.getElementById('modalCrear');
    modal.removeAttribute('hidden');
    document.getElementById('inputTitulo').focus();
}

function cerrarModalCrear() {
    document.getElementById('modalCrear').setAttribute('hidden', '');
    limpiarFormulario();
}

function limpiarFormulario() {
    document.getElementById('inputTitulo').value    = '';
    document.getElementById('inputContenido').value = '';
    let fb = document.getElementById('feedbackMsg');
    fb.style.display = 'none';
    fb.className = 'pixel-feedback';
    ocultarDuendeEscritor();
}

// ────────────────────────────────────────────────────────────
//  Duende escritor
// ────────────────────────────────────────────────────────────
function mostrarDuendeEscritor() {
    document.getElementById('duendeEscritor').classList.add('visible');
}

function ocultarDuendeEscritor() {
    document.getElementById('duendeEscritor').classList.remove('visible');
}

// ────────────────────────────────────────────────────────────
//  Modal ELIMINAR nota
// ────────────────────────────────────────────────────────────
function abrirModalEliminar(titulo) {
    let modal = document.getElementById('modalEliminar');
    let tituloEl = document.getElementById('modalEliminarTitulo');
    tituloEl.textContent = titulo ? '[ BORRAR: ' + titulo.substring(0, 18) + ' ]' : '[ BORRAR TODO ]';
    modal.removeAttribute('hidden');
    document.getElementById('btnConfirmarEliminar').focus();
}

function cerrarModalEliminar() {
    document.getElementById('modalEliminar').setAttribute('hidden', '');
}

// ────────────────────────────────────────────────────────────
//  Explosión
// ────────────────────────────────────────────────────────────
function mostrarExplosion(callback) {
    let overlay = document.getElementById('overlayExplosion');
    overlay.removeAttribute('hidden');
    setTimeout(function() {
        overlay.setAttribute('hidden', '');
        if (typeof callback === 'function') callback();
    }, 1500);
}

// ────────────────────────────────────────────────────────────
//  Utilidad anti-XSS
// ────────────────────────────────────────────────────────────
function escaparHTML(texto) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(texto));
    return div.innerHTML;
}
