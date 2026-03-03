// ══════════════════════════════════════════════════════════════
//  ANITRACK — Mi Lista de Animes
//  M2L4 · JavaScript Bootcamp 2026 · ✅ SOLUCIÓN
// ══════════════════════════════════════════════════════════════


// ────────────────────────────────────────────────────────────
//  LISTA DE ANIMES
// ────────────────────────────────────────────────────────────

let listaAnimes = [];


// ────────────────────────────────────────────────────────────
//  FUNCIONES DE APOYO (ya implementadas ✅)
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
    let imagenNombre = anime.genero.toLowerCase().replace("ó", "o").replace("í", "i") + ".png";
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

function renderizarLista() {
    let contenedor = document.getElementById("listaAnimes");

    if (listaAnimes.length > 0) {
        document.getElementById("estadoVacio").style.display = "none";
    }

    contenedor.innerHTML = "";
    for (let i = 0; i < listaAnimes.length; i++) {
        contenedor.innerHTML += crearTarjeta(listaAnimes[i]);
    }

    document.getElementById("statTotal").textContent = listaAnimes.length + " títulos";

    // BONUS — Acumulador para sumar todas las puntuaciones
    let sumaPuntuaciones = 0;
    for (let i = 0; i < listaAnimes.length; i++) {
        sumaPuntuaciones += listaAnimes[i].puntuacion;
    }

    // Dividimos entre el total para obtener el promedio
    let promedio = sumaPuntuaciones / listaAnimes.length;

    let statPromedio = document.getElementById("statPromedio");
    statPromedio.textContent = "⭐ " + promedio + " promedio";
    statPromedio.style.display = "inline-block";
}


// ════════════════════════════════════════════════════════════
//  SOLUCIÓN PARTE 1: ESCUCHAR EL FORMULARIO
// ════════════════════════════════════════════════════════════

// Le decimos al formulario que cuando el usuario haga submit,
// llame a manejarEnvio en lugar de recargar la página.
document.getElementById("formAnime").addEventListener("submit", manejarEnvio);


// ════════════════════════════════════════════════════════════
//  SOLUCIÓN PARTE 2: MANEJAR EL ENVÍO
// ════════════════════════════════════════════════════════════

function manejarEnvio(evento) {

    // Lo primero siempre: detener el comportamiento por defecto.
    // Sin esto, la página recarga y perdemos todo.
    evento.preventDefault();

    // Leemos los valores de los cuatro campos.
    // .trim() elimina espacios en blanco al inicio y al final.
    // Number() convierte el string del input a un número.
    let titulo = document.getElementById("titulo").value.trim();
    let genero = document.getElementById("genero").value;
    let episodios = Number(document.getElementById("episodios").value);
    let puntuacion = Number(document.getElementById("puntuacion").value);

    // Validaciones: si algo falla, mostramos el error y salimos con return.
    if (titulo === "") {
        mostrarError("El título no puede estar vacío.");
        return;
    }

    if (genero === "") {
        mostrarError("Debes seleccionar un género.");
        return;
    }

    if (episodios <= 0) {
        mostrarError("Los episodios deben ser un número mayor a 0.");
        return;
    }

    if (puntuacion < 1 || puntuacion > 10) {
        mostrarError("La puntuación debe estar entre 1 y 10.");
        return;
    }

    // Si llegamos aquí, todos los datos son válidos ✅
    // Creamos el objeto y lo agregamos a la lista.
    let nuevoAnime = {
        titulo: titulo,
        genero: genero,
        episodios: episodios,
        puntuacion: puntuacion
    };

    listaAnimes.push(nuevoAnime);

    // Avisamos al usuario y actualizamos la pantalla.
    mostrarExito("✅ " + titulo + " agregado a tu lista.");
    renderizarLista();

    // Limpiamos el formulario para el siguiente anime.
    evento.target.reset();
}