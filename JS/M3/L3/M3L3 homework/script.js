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
            <div class="detalle-item"><p class="d-label">Rating</p>     <p class="d-valor"><i class="fa-solid fa-star" style="color:var(--warn)"></i> ${juego.rating}</p></div>
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
//  🎫 TICKET A — Filtro por plataforma
// ────────────────────────────────────────────────────────────
// Es exactamente el mismo patrón que filtrarPorGenero:
// recibo la lista y el valor del select, y devuelvo solo
// los juegos cuya propiedad 'plataforma' coincide con lo
// que el usuario eligió. Si es string vacío, no lo llamo.
function filtrarPorPlataforma(lista, plataforma) {
    return lista.filter(function (juego) {
        return juego.plataforma === plataforma;
    });
}


// ────────────────────────────────────────────────────────────
//  🎫 TICKET B — Filtro por precio máximo
// ────────────────────────────────────────────────────────────
// Number() convierte el string del input a número real.
// La condición especial: si el precio es 0 (juego gratis)
// siempre pasa el filtro sin importar lo que escribió el usuario.
function filtrarPorPrecio(lista, precioMax) {
    return lista.filter(function (juego) {
        if (juego.precio === 0) return true;   // GRATIS siempre aparece
        return juego.precio <= precioMax;
    });
}


// ────────────────────────────────────────────────────────────
//  🎫 TICKET C — Top 3 del filtro
// ────────────────────────────────────────────────────────────
// Estrategia: encontrar el mejor (forEach + find), sacarlo
// de la lista con filter, y repetir el proceso dos veces más.
// Así obtenemos los 3 mejores sin modificar el array original.
function obtenerTop3(lista) {
    let top = [];                  // aquí guardaremos los 3 ganadores
    let restante = lista;          // copia de trabajo que vamos reduciendo

    // repetimos 3 veces (o menos si la lista tiene menos de 3 juegos)
    for (let i = 0; i < 3; i++) {
        if (restante.length === 0) break;

        // Paso 1: encontrar el rating más alto de lo que queda
        let mejorRating = 0;
        restante.forEach(function (juego) {
            if (juego.rating > mejorRating) {
                mejorRating = juego.rating;
            }
        });

        // Paso 2: atrapar el objeto con ese rating
        let ganador = restante.find(function (juego) {
            return juego.rating === mejorRating;
        });

        top.push(ganador);   // lo añadimos al podio

        // Paso 3: quitamos al ganador para que no gane de nuevo
        restante = restante.filter(function (juego) {
            return juego !== ganador;
        });
    }

    return top;
}

// Dibuja las tarjetas del Top 3 en la sección especial del HTML
function renderizarTop3(top3) {
    let seccion = document.getElementById("seccionTop3");
    let grid    = document.getElementById("top3Grid");

    if (top3.length === 0) {
        seccion.classList.add("oculto");
        return;
    }

    seccion.classList.remove("oculto");
    grid.innerHTML = "";

    // Clases CSS para cada posición del podio (oro, plata, bronce)
    let clasesMedalla = ["top3-medalla medalla-1", "top3-medalla medalla-2", "top3-medalla medalla-3"];
    let numerosMedalla = ["1", "2", "3"];

    top3.forEach(function (juego, indice) {
        grid.innerHTML += `
            <div class="top3-card">
                <span class="${clasesMedalla[indice]}">${numerosMedalla[indice]}</span>
                <img class="top3-img" src="${juego.imagen}" alt="${juego.titulo}" />
                <p class="top3-nombre">${juego.titulo}</p>
                <p class="top3-rating"><i class="fa-solid fa-star"></i> ${juego.rating}</p>
            </div>
        `;
    });
}


// ────────────────────────────────────────────────────────────
//  SECCIÓN 4 — ORQUESTADOR Y EVENTOS ✅ SOLUCIÓN
// ────────────────────────────────────────────────────────────

function aplicarFiltros() {
    let generoSeleccionado    = document.getElementById("selectGenero").value;
    let soloDisponibles       = document.getElementById("checkDisponible").checked;
    // 🎫 TICKET A — leemos el valor del nuevo select de plataforma
    let plataformaSeleccionada = document.getElementById("selectPlataforma").value;
    // 🎫 TICKET B — leemos el número del input de precio máximo
    let valorPrecio           = document.getElementById("inputPrecioMax").value;

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

    // 🎫 TICKET A — nueva capa: filtro por plataforma
    if (plataformaSeleccionada !== "") {
        resultado = filtrarPorPlataforma(resultado, plataformaSeleccionada);
    }

    // 🎫 TICKET B — nueva capa: filtro por precio máximo
    // solo activamos si el campo no está vacío
    if (valorPrecio !== "") {
        let precioMax = Number(valorPrecio);   // convertir de string a número
        resultado = filtrarPorPrecio(resultado, precioMax);
    }

    // some nos dice si hay stock crítico en el resultado actual —
    // true enciende la alerta, false la apaga
    let critico = hayStockCritico(resultado);
    mostrarAlertaStock(critico);

    renderizarLista(resultado);

    // 🎫 TICKET C — calculamos y dibujamos el Top 3 del resultado actual
    let top3 = obtenerTop3(resultado);
    renderizarTop3(top3);

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

// 🎫 TICKET A — escuchamos el cambio en el nuevo select de plataforma
document.getElementById("selectPlataforma").addEventListener("change", function () {
    aplicarFiltros();
});

// 🎫 TICKET B — escuchamos cada vez que el usuario escribe en el input de precio
document.getElementById("inputPrecioMax").addEventListener("input", function () {
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
    // 🎫 TICKETS A y B — también limpiamos los filtros nuevos
    document.getElementById("selectPlataforma").value = "";
    document.getElementById("inputPrecioMax").value = "";
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


// ════════════════════════════════════════════════════════════
//  🔥 EXTRA BONUS — EL COMPARADOR ✅ SOLUCIÓN
// ════════════════════════════════════════════════════════════

// Esta función construye el HTML de una columna del comparador.
// Recibe el objeto del juego y tres booleanos que dicen si este
// juego ganó en cada categoría para poder resaltarlo visualmente.
function crearColumnaComparador(juego, ganaRating, ganaPrecio, ganaStock) {
    let precioTexto = juego.precio === 0 ? "GRATIS" : "$" + juego.precio.toFixed(2);

    // Elegimos la clase CSS 'ganador' o 'normal' para cada fila de stat
    let claseRating = ganaRating ? "comp-stat ganador" : "comp-stat";
    let clasePrecio = ganaPrecio ? "comp-stat ganador" : "comp-stat";
    let claseStock  = ganaStock  ? "comp-stat ganador" : "comp-stat";

    return `
        <div class="comp-columna">
            <img class="comp-img" src="${juego.imagen}" alt="${juego.titulo}" />
            <p class="comp-titulo">${juego.titulo}</p>
            <p class="comp-genero">${juego.genero} · ${juego.plataforma}</p>

            <div class="${claseRating}">
                <span class="comp-label"><i class="fa-solid fa-star"></i> Rating</span>
                <span class="comp-valor">${juego.rating}</span>
                ${ganaRating ? '<span class="comp-corona"><i class="fa-solid fa-crown"></i></span>' : ""}
            </div>
            <div class="${clasePrecio}">
                <span class="comp-label"><i class="fa-solid fa-tag"></i> Precio</span>
                <span class="comp-valor">${precioTexto}</span>
                ${ganaPrecio ? '<span class="comp-corona"><i class="fa-solid fa-crown"></i></span>' : ""}
            </div>
            <div class="${claseStock}">
                <span class="comp-label"><i class="fa-solid fa-boxes-stacking"></i> Stock</span>
                <span class="comp-valor">${juego.stock} uds</span>
                ${ganaStock ? '<span class="comp-corona"><i class="fa-solid fa-crown"></i></span>' : ""}
            </div>
        </div>
    `;
}

// Esta es la función principal del comparador.
// Usa find dos veces para buscar cada juego por su título exacto,
// luego compara con tres if simples y renderiza la tarjeta doble.
function comparar() {
    let titulo1 = document.getElementById("inputJuego1").value.trim();
    let titulo2 = document.getElementById("inputJuego2").value.trim();

    // Validación: si algún campo está vacío, avisamos y salimos
    if (titulo1 === "" || titulo2 === "") {
        alert("¡Escribe los dos títulos antes de comparar!");
        return;
    }

    // find busca en el catálogo global — retorna el objeto o undefined
    let juego1 = catalogo.find(function (j) { return j.titulo === titulo1; });
    let juego2 = catalogo.find(function (j) { return j.titulo === titulo2; });

    // Verificamos que ambos existan antes de intentar renderizar
    if (!juego1) {
        alert("\"" + titulo1 + "\" no existe en el catálogo. Revisa el título exacto.");
        return;
    }
    if (!juego2) {
        alert("\"" + titulo2 + "\" no existe en el catálogo. Revisa el título exacto.");
        return;
    }

    // ── 3 if simples para decidir el ganador de cada categoría ──

    // Ganador: rating más alto
    let ganaRating1 = juego1.rating > juego2.rating;
    let ganaRating2 = juego2.rating > juego1.rating;

    // Ganador: precio más bajo (menos = mejor para el comprador)
    let ganaPrecio1 = juego1.precio < juego2.precio;
    let ganaPrecio2 = juego2.precio < juego1.precio;

    // Ganador: mayor stock disponible
    let ganaStock1 = juego1.stock > juego2.stock;
    let ganaStock2 = juego2.stock > juego1.stock;

    // Construimos el HTML con las dos columnas lado a lado
    let contenedor = document.getElementById("comparadorCards");
    contenedor.innerHTML =
        crearColumnaComparador(juego1, ganaRating1, ganaPrecio1, ganaStock1) +
        '<div class="comp-separador">VS</div>' +
        crearColumnaComparador(juego2, ganaRating2, ganaPrecio2, ganaStock2);

    // Mostramos el panel de resultado
    document.getElementById("resultadoComparador").classList.remove("oculto");
}

// Botón principal del comparador
document.getElementById("btnComparar").addEventListener("click", function () {
    comparar();
});

// También funciona con Enter desde cualquier input del comparador
document.getElementById("inputJuego1").addEventListener("keydown", function (e) {
    if (e.key === "Enter") comparar();
});
document.getElementById("inputJuego2").addEventListener("keydown", function (e) {
    if (e.key === "Enter") comparar();
});

// Botón cerrar — oculta el resultado y limpia los inputs
document.getElementById("btnCerrarComparador").addEventListener("click", function () {
    document.getElementById("resultadoComparador").classList.add("oculto");
    document.getElementById("inputJuego1").value = "";
    document.getElementById("inputJuego2").value = "";
});