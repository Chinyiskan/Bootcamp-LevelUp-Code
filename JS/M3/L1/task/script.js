// ══════════════════════════════════════════════════════════════
//  ANITRACK — Mi Lista de Animes
//  M3L1 · JavaScript Bootcamp 2026 · ✅ SOLUCIÓN
// ══════════════════════════════════════════════════════════════


// ────────────────────────────────────────────────────────────
//  SECCIÓN 1 — FUNCIONES DE APOYO
// ────────────────────────────────────────────────────────────

function mostrarError(mensaje) {
    let el = document.getElementById("mensajeForm");
    el.textContent = mensaje;
    el.className = "mensaje error";
}

function mostrarExito(mensaje) {
    let el = document.getElementById("mensajeForm");
    el.textContent = mensaje;
    el.className = "mensaje exito";
}

function crearTarjeta(anime) {
    let imagenNombre = anime.genero.toLowerCase().replace("ó", "o").replace("í", "i").replace(/ /g, "-") + ".webp";
    return `
        <div class="anime-card">
            <img src="static/images/${imagenNombre}" alt="${anime.genero}" class="card-img" />
            <div class="card-overlay"></div>
            <span class="card-badge">${anime.genero}</span>
            <div class="card-body">
                <div class="card-info">
                    <p class="card-titulo">${anime.titulo}</p>
                    <p class="card-meta">${anime.episodios} eps vistos</p>
                </div>
                <div class="card-score">
                    ${anime.puntuacion} <span>/ 10</span>
                </div>
            </div>
        </div>
    `;
}

// El formulario ya estaba conectado y validado
document.getElementById("formAnime").addEventListener("submit", function (evento) {
    evento.preventDefault();

    let titulo = document.getElementById("titulo").value.trim();
    let genero = document.getElementById("genero").value;
    let episodios = Number(document.getElementById("episodios").value);
    let puntuacion = Number(document.getElementById("puntuacion").value);

    if (titulo === "") { mostrarError("El título no puede estar vacío."); return; }
    if (genero === "") { mostrarError("Debes seleccionar un género."); return; }
    if (episodios <= 0) { mostrarError("Los episodios deben ser un número mayor a 0."); return; }
    if (puntuacion < 1 || puntuacion > 10) { mostrarError("La puntuación debe estar entre 1 y 10."); return; }

    let nuevoAnime = {
        titulo: titulo,
        genero: genero,
        episodios: episodios,
        puntuacion: puntuacion
    };

    // push() agrega el nuevo objeto al final del array
    listaAnimes.push(nuevoAnime);

    mostrarExito("✅ " + titulo + " agregado a tu lista.");
    renderizarLista();
    evento.target.reset();
});


// ────────────────────────────────────────────────────────────
//  SECCIÓN 2 — ARRAY Y MÉTODOS
// ────────────────────────────────────────────────────────────

// El array donde viven todos los animes de la lista
let listaAnimes = [];


function renderizarLista() {
    let contenedor = document.getElementById("listaAnimes");

    if (listaAnimes.length > 0) {
        document.getElementById("estadoVacio").style.display = "none";
    }

    // Limpiamos antes de volver a pintar para no duplicar tarjetas
    contenedor.innerHTML = "";

    // forEach recorre cada elemento del array y ejecuta la función por cada uno
    listaAnimes.forEach(function (anime) {
        contenedor.innerHTML += crearTarjeta(anime);
    });

    document.getElementById("statTotal").textContent = listaAnimes.length + " títulos";

    // BONUS — acumulador que suma todas las puntuaciones
    let acumulador = 0;

    listaAnimes.forEach(function (anime) {
        acumulador += anime.puntuacion;
    });

    // Dividimos entre el total para obtener el promedio
    let promedio = acumulador / listaAnimes.length;

    let statPromedio = document.getElementById("statPromedio");
    statPromedio.textContent = "⭐ " + promedio + " promedio";
    statPromedio.style.display = "inline-block";
}


// Botón eliminar — pop() quita el último elemento del array
document.getElementById("btnEliminar").addEventListener("click", function () {

    listaAnimes.pop();

    // Si el array quedó vacío volvemos a mostrar el estado vacío
    if (listaAnimes.length === 0) {
        document.getElementById("estadoVacio").style.display = "block";
    }

    renderizarLista();
});