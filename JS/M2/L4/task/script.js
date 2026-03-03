// ══════════════════════════════════════════════════════════════
//  ANITRACK — Mi Lista de Animes
//  M2L4 · JavaScript Bootcamp 2026
//
//  INSTRUCCIONES:
//  → Este es el único archivo que debes editar.
//  → El HTML y CSS ya están listos. Tu trabajo es JavaScript.
//  → No borres nada de lo que ya existe.
// ══════════════════════════════════════════════════════════════


// ────────────────────────────────────────────────────────────
//  LISTA DE ANIMES (ya definida — no la modifiques)
//  Cada anime es un objeto con: titulo, genero, episodios, puntuacion
// ────────────────────────────────────────────────────────────

let listaAnimes = [];


// ────────────────────────────────────────────────────────────
//  FUNCIONES DE APOYO (ya implementadas ✅ — no las modifiques)
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
    // Normalizar el género para que coincida con el nombre de la imagen
    let imagenNombre = anime.genero.toLowerCase().replace("ó", "o").replace("í", "i") + ".png";
    return `
        <div class="anime-card">
            <img src="static/images/${imagenNombre}" alt="${anime.genero}" class="card-img" />
            <div class="card-info">
                <p class="card-titulo">${anime.titulo}</p>
                <p class="card-meta">${anime.genero} · ${anime.episodios} eps</p>
            </div>
            <div class="card-score">
                ${anime.puntuacion} <span>/ 10</span>
            </div>
        </div>
    `;
}

// Recorre listaAnimes y renderiza todas las tarjetas. (ya implementada ✅)
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
}


// ════════════════════════════════════════════════════════════
//  🎫 TU TICKET — PARTE 1: ESCUCHAR EL FORMULARIO
// ════════════════════════════════════════════════════════════
//
//  El formulario tiene id "formAnime".
//  Agrégale un addEventListener para el evento "submit".
//  Cuando se dispare, debe llamar a la función manejarEnvio.
//
//  ⚠️ Recuerda: el listener va en el <form>, no en el botón.

// TODO 1 — Conecta el evento submit del formulario a manejarEnvio.



// ════════════════════════════════════════════════════════════
//  🎫 TU TICKET — PARTE 2: MANEJAR EL ENVÍO
// ════════════════════════════════════════════════════════════

function manejarEnvio(evento) {

    // TODO 2 — Detén el comportamiento por defecto del formulario.



    // TODO 3 — Lee los valores de los cuatro campos:
    //   titulo     → input #titulo      (usa .trim())
    //   genero     → select #genero
    //   episodios  → input #episodios   (conviértelo a Number)
    //   puntuacion → input #puntuacion  (conviértelo a Number)



    // TODO 4 — Valida los datos. Si algo falla, llama a mostrarError()
    //   y usa return para detener la función. Reglas:
    //   · título no puede estar vacío
    //   · género debe estar seleccionado (no puede ser "")
    //   · episodios debe ser un número mayor a 0
    //   · puntuación debe estar entre 1 y 10



    // TODO 5 — Si todo es válido:
    //   · Crea un objeto con los cuatro datos y agrégalo a listaAnimes
    //   · Llama a mostrarExito() con un mensaje
    //   · Llama a renderizarLista() para actualizar la pantalla
    //   · Limpia el formulario con evento.target.reset()



}


// ════════════════════════════════════════════════════════════
//  🔥 EXTRA BONUS: PROMEDIO DE PUNTUACIÓN
// ════════════════════════════════════════════════════════════
//
//  Agrega lógica al final de renderizarLista() para calcular
//  el promedio de puntuación de todos los animes de la lista.
//
//  Pistas:
//   · Usa un for con un acumulador para sumar todas las puntuaciones
//   · Divide entre listaAnimes.length para obtener el promedio
//   · Muéstralo en el elemento id "statPromedio"
//     y quítale el display:none para que aparezca
//   · Formato esperado: "⭐ 8.3 promedio"