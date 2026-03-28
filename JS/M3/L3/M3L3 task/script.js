// ══════════════════════════════════════════════════════════════
//  GameVault — Panel de Inventario  |  script.js  ✅ SOLUCIÓN
//  M3L3 · LevelUp Code Bootcamp 2026
// ══════════════════════════════════════════════════════════════


// ────────────────────────────────────────────────────────────
//  SECCIÓN 1 — CATÁLOGO ✅
// ────────────────────────────────────────────────────────────

let catalogo = [
    { titulo: "Elden Ring",       genero: "RPG",       plataforma: "PC",  precio: 59.99,  rating: 9.5, stock: 4,  disponible: true,  imagen: "images/eldenring.jpg" },
    { titulo: "FIFA 25",          genero: "Deportes",  plataforma: "PS5", precio: 69.99,  rating: 7.8, stock: 2,  disponible: true,  imagen: "images/fifa25.jpg" },
    { titulo: "Hollow Knight",    genero: "Aventura",  plataforma: "PC",  precio: 14.99,  rating: 9.3, stock: 0,  disponible: false, imagen: "images/hollowknight.jpg" },
    { titulo: "Call of Duty MW3", genero: "FPS",       plataforma: "PS5", precio: 69.99,  rating: 7.2, stock: 6,  disponible: true,  imagen: "images/callofduty.jpg" },
    { titulo: "Stardew Valley",   genero: "Indie",     plataforma: "PC",  precio: 14.99,  rating: 9.4, stock: 1,  disponible: true,  imagen: "images/stardewvalley.jpg" },
    { titulo: "Tekken 8",         genero: "Pelea",     plataforma: "PS5", precio: 59.99,  rating: 8.9, stock: 3,  disponible: true,  imagen: "images/tekken.webp" },
    { titulo: "Hades",            genero: "RPG",       plataforma: "PC",  precio: 24.99,  rating: 9.6, stock: 0,  disponible: false, imagen: "images/hades.jpg" },
    { titulo: "Spider-Man 2",     genero: "Aventura",  plataforma: "PS5", precio: 69.99,  rating: 9.1, stock: 2,  disponible: true,  imagen: "images/spiderman2.jpg" },
    { titulo: "NBA 2K25",         genero: "Deportes",  plataforma: "PC",  precio: 59.99,  rating: 8.5, stock: 10, disponible: true,  imagen: "images/nba2k25.jpg" },
    { titulo: "Baldur's Gate 3",  genero: "RPG",       plataforma: "PC",  precio: 59.99,  rating: 9.8, stock: 1,  disponible: true,  imagen: "images/baldurs.jpg" },
    { titulo: "Dawn of War 4",    genero: "Estrategia",plataforma: "PC",  precio: 39.99,  rating: 9.8, stock: 1,  disponible: true,  imagen: "images/dawnofwar.jpg" },
    { titulo: "Rimworld",         genero: "Simulacion",plataforma: "PC",  precio: 34.99,  rating: 9.8, stock: 1,  disponible: true,  imagen: "images/rimwolrd.png" },
];


// ────────────────────────────────────────────────────────────
//  SECCIÓN 2 — FUNCIONES DE UI (ya implementadas ✅)
// ────────────────────────────────────────────────────────────

function crearTarjeta(juego) {
    let precioTexto = juego.precio === 0 ? "GRATIS" : "$" + juego.precio.toFixed(2);

    let claseStock = "stock-ok";
    let textoStock = juego.stock + " uds";
    let iconStock = '<i class="fa-solid fa-circle-check"></i>';
    if (juego.stock === 0) {
        claseStock = "stock-cero";
        textoStock = "Agotado";
        iconStock = '<i class="fa-solid fa-ban"></i>';
    } else if (juego.stock <= 2) {
        claseStock = "stock-bajo";
        textoStock = "¡Últimas!";
        iconStock = '<i class="fa-solid fa-fire"></i>';
    }

    let claseCard = juego.disponible ? "juego-card" : "juego-card sin-stock";
    let imgSrc = juego.imagen || "images/placeholder.jpg";

    return `
        <div class="${claseCard}">
            <div class="card-img-wrap">
                <img class="card-img" src="${imgSrc}" alt="${juego.titulo}" loading="lazy" />
                <span class="card-stock ${claseStock}">${iconStock} ${textoStock}</span>
            </div>
            <div class="card-body">
                <p class="card-genero">${juego.genero}</p>
                <p class="card-titulo">${juego.titulo}</p>
                <p class="card-plataforma"><i class="fa-solid fa-desktop"></i> ${juego.plataforma}</p>
                <div class="card-footer">
                    <span class="card-precio"><i class="fa-solid fa-tag"></i> ${precioTexto}</span>
                    <span class="card-rating"><i class="fa-solid fa-star"></i> ${juego.rating}</span>
                </div>
            </div>
        </div>
    `;
}

function renderizarLista(lista) {
    let grid = document.getElementById("gridJuegos");
    let estadoVacio = document.getElementById("estadoVacio");

    grid.innerHTML = "";

    if (lista.length === 0) {
        estadoVacio.classList.remove("oculto");
        document.getElementById("statTotal").textContent = "0 resultados";
        return;
    }

    estadoVacio.classList.add("oculto");

    lista.forEach(function (juego) {
        grid.innerHTML += crearTarjeta(juego);
    });

    document.getElementById("statTotal").textContent = lista.length + " juego" + (lista.length !== 1 ? "s" : "");
}

function mostrarDetalle(juego) {
    let precioTexto = juego.precio === 0 ? "GRATIS" : "$" + juego.precio.toFixed(2);
    let estadoTexto = juego.disponible
        ? '<i class="fa-solid fa-circle-check" style="color:#4ade80"></i> Disponible'
        : '<i class="fa-solid fa-circle-xmark" style="color:#f87171"></i> No disponible';

    document.getElementById("contenidoDetalle").innerHTML = `
        <div class="detalle-grid">
            <div class="detalle-item"><p class="d-label">Título</p>     <p class="d-valor">${juego.titulo}</p></div>
            <div class="detalle-item"><p class="d-label">Género</p>     <p class="d-valor">${juego.genero}</p></div>
            <div class="detalle-item"><p class="d-label">Plataforma</p> <p class="d-valor">${juego.plataforma}</p></div>
            <div class="detalle-item"><p class="d-label">Precio</p>     <p class="d-valor">${precioTexto}</p></div>
            <div class="detalle-item"><p class="d-label">Rating</p>     <p class="d-valor">⭐ ${juego.rating}</p></div>
            <div class="detalle-item"><p class="d-label">Stock</p>      <p class="d-valor">${juego.stock} unidades</p></div>
            <div class="detalle-item"><p class="d-label">Estado</p>     <p class="d-valor">${estadoTexto}</p></div>
        </div>
    `;

    document.getElementById("panelDetalle").classList.remove("oculto");
}

function mostrarAlertaStock(hay) {
    let alerta = document.getElementById("alertaStock");
    if (hay) {
        alerta.classList.remove("oculto");
    } else {
        alerta.classList.add("oculto");
    }
}

function mostrarDestacado(juego) {
    let banner = document.getElementById("bannerDestacado");
    if (juego) {
        banner.innerHTML = '<i class="fa-solid fa-trophy"></i> Top del filtro actual: <strong>' + juego.titulo + '</strong> &mdash; <i class="fa-solid fa-star"></i> ' + juego.rating;
        banner.classList.remove("oculto");
    } else {
        banner.classList.add("oculto");
    }
}


// ────────────────────────────────────────────────────────────
//  SECCIÓN 3 — FUNCIONES DE CONSULTA ✅ SOLUCIÓN
// ────────────────────────────────────────────────────────────

// filter recorre la lista completa y guarda solo los juegos
// donde la función retorna true — el original nunca se toca
function filtrarPorGenero(lista, genero) {
    return lista.filter(function (juego) {
        return juego.genero === genero;
    });
}

// Mismo patrón que arriba — solo cambia la condición
function filtrarDisponibles(lista) {
    return lista.filter(function (juego) {
        return juego.disponible === true;
    });
}

// find para en el primer match y retorna el objeto directamente,
// no un array — si no encuentra nada, retorna undefined
function buscarJuego(titulo) {
    return catalogo.find(function (juego) {
        return juego.titulo === titulo;
    });
}

// some responde true en cuanto encuentra el primero que cumple —
// no sigue buscando, solo necesita saber si existe al menos uno
function hayStockCritico(lista) {
    return lista.some(function (juego) {
        return juego.stock <= 2;
    });
}


// ────────────────────────────────────────────────────────────
//  SECCIÓN 4 — ORQUESTADOR Y EVENTOS ✅ SOLUCIÓN
// ────────────────────────────────────────────────────────────

function aplicarFiltros() {
    let generoSeleccionado = document.getElementById("selectGenero").value;
    let soloDisponibles = document.getElementById("checkDisponible").checked;

    document.getElementById("panelDetalle").classList.add("oculto");
    document.getElementById("inputBuscar").value = "";

    // Empezamos con todo el catálogo y filtramos por capas —
    // cada filtro activo reduce el resultado del anterior
    let resultado = catalogo;

    if (generoSeleccionado !== "") {
        resultado = filtrarPorGenero(resultado, generoSeleccionado);
    }

    if (soloDisponibles) {
        resultado = filtrarDisponibles(resultado);
    }

    // some nos dice si hay stock crítico en el resultado actual —
    // true enciende la alerta, false la apaga
    let critico = hayStockCritico(resultado);
    mostrarAlertaStock(critico);

    renderizarLista(resultado);

    // BONUS — activo cuando obtenerMejorJuego() está implementado
    let mejor = obtenerMejorJuego(resultado);
    mostrarDestacado(mejor);
}

document.getElementById("selectGenero").addEventListener("change", function () {
    aplicarFiltros();
});

document.getElementById("checkDisponible").addEventListener("change", function () {
    aplicarFiltros();
});

document.getElementById("btnBuscar").addEventListener("click", function () {
    let titulo = document.getElementById("inputBuscar").value.trim();

    if (titulo === "") {
        aplicarFiltros();
        return;
    }

    let juego = buscarJuego(titulo);

    // find retorna undefined si no encuentra nada —
    // verificamos antes de intentar usar el resultado
    if (juego) {
        mostrarDetalle(juego);
    } else {
        alert("No se encontró ningún juego con ese título exacto.");
    }
});

document.getElementById("btnCerrarDetalle").addEventListener("click", function () {
    document.getElementById("panelDetalle").classList.add("oculto");
});

document.getElementById("btnLimpiar").addEventListener("click", function () {
    document.getElementById("selectGenero").value = "";
    document.getElementById("checkDisponible").checked = false;
    document.getElementById("inputBuscar").value = "";
    document.getElementById("panelDetalle").classList.add("oculto");
    aplicarFiltros();
});

aplicarFiltros();


// ════════════════════════════════════════════════════════════
//  🔥 EXTRA BONUS ✅ SOLUCIÓN
// ════════════════════════════════════════════════════════════

function obtenerMejorJuego(lista) {
    if (lista.length === 0) return null;

    // Paso 1 — recorremos la lista para encontrar el rating más alto
    let mejorRating = 0;
    lista.forEach(function (juego) {
        if (juego.rating > mejorRating) {
            mejorRating = juego.rating;
        }
    });

    // Paso 2 — ahora que sabemos el número exacto, find lo atrapa
    // directamente sin tener que recorrer todo el array de nuevo
    return lista.find(function (juego) {
        return juego.rating === mejorRating;
    });
}