// ============================================================
//  DuendeNotes — app.js  [ PIXEL ART EDITION ]
//  Controlador principal: conecta modelo (notas.js) y vista (ui.js)
// ============================================================

// ── Estado del controlador ───────────────────────────────────
let notaIdPendienteEliminar = null;
let terminoBusqueda         = '';

// ────────────────────────────────────────────────────────────
//  Boot al cargar la página
// ────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
    inicializarNotas();
    refrescarVista();
    registrarEventos();
});

// ────────────────────────────────────────────────────────────
//  Refrescar vista completa
// ────────────────────────────────────────────────────────────
function refrescarVista() {
    let filtradas = obtenerNotas(terminoBusqueda);
    renderizarNotas(filtradas);
    actualizarContador(totalNotas());
}

// ────────────────────────────────────────────────────────────
//  Registrar todos los eventos
// ────────────────────────────────────────────────────────────
function registrarEventos() {

    // ── FAB: abrir modal de creación ─────────────────────────
    document.getElementById('btnNuevaNota').addEventListener('click', function() {
        abrirModalCrear();
    });

    // ── Modal crear: cerrar con X y cancelar ─────────────────
    document.getElementById('btnCerrarModal').addEventListener('click', cerrarModalCrear);
    document.getElementById('btnCancelarCrear').addEventListener('click', cerrarModalCrear);

    // Cerrar al hacer clic fuera del cuadro
    document.getElementById('modalCrear').addEventListener('click', function(e) {
        if (e.target === this) cerrarModalCrear();
    });

    // ── Duende escritor: aparece al enfocar cualquier campo ──
    let inputTitulo    = document.getElementById('inputTitulo');
    let inputContenido = document.getElementById('inputContenido');

    inputTitulo.addEventListener('focus', mostrarDuendeEscritor);
    inputContenido.addEventListener('focus', mostrarDuendeEscritor);

    inputTitulo.addEventListener('blur', function() {
        setTimeout(function() {
            let activo = document.activeElement;
            if (activo !== inputTitulo && activo !== inputContenido) {
                ocultarDuendeEscritor();
            }
        }, 100);
    });

    inputContenido.addEventListener('blur', function() {
        setTimeout(function() {
            let activo = document.activeElement;
            if (activo !== inputTitulo && activo !== inputContenido) {
                ocultarDuendeEscritor();
            }
        }, 100);
    });

    // ── Guardar nota ─────────────────────────────────────────
    document.getElementById('btnGuardar').addEventListener('click', function() {
        let titulo    = inputTitulo.value.trim();
        let contenido = inputContenido.value.trim();

        if (!titulo) {
            mostrarFeedback('ERROR: Se requiere un titulo.', 'error');
            inputTitulo.focus();
            return;
        }
        if (!contenido) {
            mostrarFeedback('ERROR: La nota no puede estar vacia.', 'error');
            inputContenido.focus();
            return;
        }

        crearNota(titulo, contenido);
        cerrarModalCrear();
        refrescarVista();
    });

    // Guardar con Ctrl+Enter
    inputContenido.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            document.getElementById('btnGuardar').click();
        }
    });

    // ── Búsqueda ─────────────────────────────────────────────
    document.getElementById('inputBuscar').addEventListener('input', function() {
        terminoBusqueda = this.value;
        refrescarVista();
    });

    // ── Borrar todo ──────────────────────────────────────────
    document.getElementById('btnBorrarTodo').addEventListener('click', function() {
        if (totalNotas() === 0) return;
        notaIdPendienteEliminar = 'TODAS';
        abrirModalEliminar(null);
    });

    // ── Delegación de eventos en la lista ────────────────────
    document.getElementById('listaNotas').addEventListener('click', function(e) {
        let btnEliminar = e.target.closest('.btn-eliminar');
        let btnFav      = e.target.closest('.btn-fav');

        if (btnEliminar) {
            let id = Number(btnEliminar.dataset.id);
            let nota = obtenerNotas('').find(function(n) { return n.id === id; });
            notaIdPendienteEliminar = id;
            abrirModalEliminar(nota ? nota.titulo : '');
        }

        if (btnFav) {
            let id    = Number(btnFav.dataset.id);
            let esFav = toggleFavorita(id);
            let card  = btnFav.closest('.nota-card');

            // Actualizar icono sin re-render completo
            let svgEmpty = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square" stroke-linejoin="miter"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
            let svgFull  = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
            btnFav.innerHTML = esFav ? svgFull : svgEmpty;
            btnFav.classList.toggle('activa', esFav);
            btnFav.title = esFav ? 'Quitar favorita' : 'Favorita';
            card.classList.toggle('nota-favorita', esFav);
        }
    });

    // ── Modal eliminar: cancelar ─────────────────────────────
    document.getElementById('btnCancelarEliminar').addEventListener('click', function() {
        cerrarModalEliminar();
        notaIdPendienteEliminar = null;
    });

    document.getElementById('modalEliminar').addEventListener('click', function(e) {
        if (e.target === this) {
            cerrarModalEliminar();
            notaIdPendienteEliminar = null;
        }
    });

    // ── Modal eliminar: confirmar → explosión ────────────────
    document.getElementById('btnConfirmarEliminar').addEventListener('click', function() {
        cerrarModalEliminar();

        mostrarExplosion(function() {
            if (notaIdPendienteEliminar === 'TODAS') {
                borrarTodasLasNotas();
            } else if (notaIdPendienteEliminar !== null) {
                eliminarNota(notaIdPendienteEliminar);
            }
            notaIdPendienteEliminar = null;
            terminoBusqueda = '';
            document.getElementById('inputBuscar').value = '';
            refrescarVista();
        });
    });

    // ── Cerrar modales con Escape ────────────────────────────
    document.addEventListener('keydown', function(e) {
        if (e.key !== 'Escape') return;
        let modalCrear    = document.getElementById('modalCrear');
        let modalEliminar = document.getElementById('modalEliminar');
        if (!modalCrear.hasAttribute('hidden'))    cerrarModalCrear();
        if (!modalEliminar.hasAttribute('hidden')) {
            cerrarModalEliminar();
            notaIdPendienteEliminar = null;
        }
    });
}
