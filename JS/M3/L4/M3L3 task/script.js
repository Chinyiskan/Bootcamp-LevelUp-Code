// ══════════════════════════════════════════════════════════════
//  GameVault — Arsenal Completo  |  script.js  ✅ SOLUCIÓN
//  M3L4 · LevelUp Code Bootcamp 2026
// ══════════════════════════════════════════════════════════════


// ────────────────────────────────────────────────────────────
//  SECCIÓN 1 — CATÁLOGO ✅
// ────────────────────────────────────────────────────────────

let catalogo = [
    { titulo: "Elden Ring",       genero: "RPG",        plataforma: "PC",  precio: 59.99, rating: 9.5, stock: 4,  disponible: true,  imagen: "images/eldenring.jpg"     },
    { titulo: "FIFA 25",          genero: "Deportes",   plataforma: "PS5", precio: 69.99, rating: 7.8, stock: 2,  disponible: true,  imagen: "images/fifa25.jpg"        },
    { titulo: "Hollow Knight",    genero: "Aventura",   plataforma: "PC",  precio: 14.99, rating: 9.3, stock: 0,  disponible: false, imagen: "images/hollowknight.jpg"  },
    { titulo: "Call of Duty MW3", genero: "FPS",        plataforma: "PS5", precio: 69.99, rating: 7.2, stock: 6,  disponible: true,  imagen: "images/callofduty.jpg"    },
    { titulo: "Stardew Valley",   genero: "Indie",      plataforma: "PC",  precio: 14.99, rating: 9.4, stock: 1,  disponible: true,  imagen: "images/stardewvalley.jpg" },
    { titulo: "Tekken 8",         genero: "Pelea",      plataforma: "PS5", precio: 59.99, rating: 8.9, stock: 3,  disponible: true,  imagen: "images/tekken.webp"       },
    { titulo: "Hades",            genero: "RPG",        plataforma: "PC",  precio: 24.99, rating: 9.6, stock: 0,  disponible: false, imagen: "images/hades.jpg"         },
    { titulo: "Spider-Man 2",     genero: "Aventura",   plataforma: "PS5", precio: 69.99, rating: 9.1, stock: 2,  disponible: true,  imagen: "images/spiderman2.jpg"    },
    { titulo: "NBA 2K25",         genero: "Deportes",   plataforma: "PC",  precio: 59.99, rating: 8.5, stock: 10, disponible: true,  imagen: "images/nba2k25.jpg"       },
    { titulo: "Baldur's Gate 3",  genero: "RPG",        plataforma: "PC",  precio: 59.99, rating: 9.8, stock: 1,  disponible: true,  imagen: "images/baldurs.jpg"       },
    { titulo: "Dawn of War 4",    genero: "Estrategia", plataforma: "PC",  precio: 39.99, rating: 9.8, stock: 1,  disponible: true,  imagen: "images/dawnofwar.jpg"     },
    { titulo: "Rimworld",         genero: "Simulacion", plataforma: "PC",  precio: 34.99, rating: 9.8, stock: 1,  disponible: true,  imagen: "images/rimwolrd.png"      },
];


// ────────────────────────────────────────────────────────────
//  SECCIÓN 2 — FUNCIONES DE UI ✅ (no tocar)
// ────────────────────────────────────────────────────────────

function crearTarjeta(juego) {
    let precioTexto = juego.precio === 0 ? "GRATIS" : "$" + juego.precio.toFixed(2);

    let claseStock = "stock-ok";
    let textoStock = juego.stock + " uds";
    let iconStock  = '<i class="fa-solid fa-circle-check"></i>';
    if (juego.stock === 0) {
        claseStock = "stock-cero";
        textoStock = "Agotado";
        iconStock  = '<i class="fa-solid fa-ban"></i>';
    } else if (juego.stock <= 2) {
        claseStock = "stock-bajo";
        textoStock = "¡Últimas!";
        iconStock  = '<i class="fa-solid fa-fire"></i>';
    }

    let claseCard = juego.disponible ? "juego-card" : "juego-card sin-stock";
    let imgSrc    = juego.imagen || "images/placeholder.jpg";

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
    let grid        = document.getElementById("gridJuegos");
    let estadoVacio = document.getElementById("estadoVacio");

    grid.innerHTML = "";

    if (lista.length === 0) {
        estadoVacio.classList.remove("oculto");
        document.getElementById("statTotal").textContent = "0 resultados";
        return;
    }

    estadoVacio.classList.add("oculto");
    lista.forEach(function(juego) {
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

function renderizarTop3(top3) {
    let seccion = document.getElementById("seccionTop3");
    let grid    = document.getElementById("top3Grid");

    if (top3.length === 0) {
        seccion.classList.add("oculto");
        return;
    }

    seccion.classList.remove("oculto");
    grid.innerHTML = "";

    let clasesMedalla  = ["top3-medalla medalla-1", "top3-medalla medalla-2", "top3-medalla medalla-3"];
    let numerosMedalla = ["1", "2", "3"];

    top3.forEach(function(juego, indice) {
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
//  SECCIÓN 3 — FUNCIONES DE CONSULTA ✅ (semana pasada)
// ────────────────────────────────────────────────────────────

function filtrarPorGenero(lista, genero) {
    return lista.filter(function(juego) { return juego.genero === genero; });
}

function filtrarDisponibles(lista) {
    return lista.filter(function(juego) { return juego.disponible === true; });
}

function filtrarPorPlataforma(lista, plataforma) {
    return lista.filter(function(juego) { return juego.plataforma === plataforma; });
}

function filtrarPorPrecio(lista, precioMax) {
    return lista.filter(function(juego) {
        if (juego.precio === 0) return true;
        return juego.precio <= precioMax;
    });
}

function buscarJuego(titulo) {
    return catalogo.find(function(juego) { return juego.titulo === titulo; });
}

function hayStockCritico(lista) {
    return lista.some(function(juego) { return juego.stock <= 2; });
}

function obtenerMejorJuego(lista) {
    if (lista.length === 0) return null;
    let mejorRating = 0;
    lista.forEach(function(juego) {
        if (juego.rating > mejorRating) mejorRating = juego.rating;
    });
    return lista.find(function(juego) { return juego.rating === mejorRating; });
}


// ════════════════════════════════════════════════════════════
//  SECCIÓN 4 — TICKETS DE HOY ✅ SOLUCIÓN
// ════════════════════════════════════════════════════════════


// ────────────────────────────────────────────────────────────
//  🎫 TICKET 1 — Ordenar por rating ✅
// ────────────────────────────────────────────────────────────
// slice() sin argumentos crea una copia del array completo.
// Trabajamos sobre la copia porque sort sí modifica el array
// original — sin la copia estaríamos reordenando el resultado
// de los filtros y rompiendo la cadena si alguien vuelve a filtrar.
function ordenarPorRating(lista) {
    let listaCopia = lista.slice();

    // b.rating - a.rating da descendente (mayor rating primero).
    // Ejemplo: a=9.1, b=9.8 → 9.8 - 9.1 = positivo → b va antes ✅
    listaCopia.sort(function(a, b) {
        return b.rating - a.rating;
    });

    return listaCopia;
}


// ────────────────────────────────────────────────────────────
//  🎫 TICKET 2 — Calcular valor total del inventario ✅
// ────────────────────────────────────────────────────────────
// reduce recorre toda la lista y colapsa todos los valores
// en un único número. El acumulador arranca en 0 y en cada
// vuelta crece con el valor de ese juego (precio × stock).
// Cuando la lista termina, el acumulador final ES el resultado.
function calcularValorInventario(lista) {
    return lista.reduce(function(acumulador, juego) {
        return acumulador + (juego.precio * juego.stock);
    }, 0);
}


// ════════════════════════════════════════════════════════════
//  ORQUESTADOR ✅
// ════════════════════════════════════════════════════════════

function aplicarFiltros() {
    let generoSeleccionado     = document.getElementById("selectGenero").value;
    let soloDisponibles        = document.getElementById("checkDisponible").checked;
    let plataformaSeleccionada = document.getElementById("selectPlataforma").value;
    let valorPrecio            = document.getElementById("inputPrecioMax").value;

    document.getElementById("panelDetalle").classList.add("oculto");
    document.getElementById("inputBuscar").value = "";

    let resultado = catalogo;

    if (generoSeleccionado !== "") {
        resultado = filtrarPorGenero(resultado, generoSeleccionado);
    }
    if (soloDisponibles) {
        resultado = filtrarDisponibles(resultado);
    }
    if (plataformaSeleccionada !== "") {
        resultado = filtrarPorPlataforma(resultado, plataformaSeleccionada);
    }
    if (valorPrecio !== "") {
        resultado = filtrarPorPrecio(resultado, Number(valorPrecio));
    }

    // 🎫 TICKET 3 — Paso A ✅
    // Ordenamos después de filtrar, no antes — así el orden
    // siempre refleja el resultado real de los filtros activos.
    resultado = ordenarPorRating(resultado);

    let critico = hayStockCritico(resultado);
    mostrarAlertaStock(critico);

    renderizarLista(resultado);

    let top3 = obtenerTop3(resultado);
    renderizarTop3(top3);

    let mejor = obtenerMejorJuego(resultado);
    mostrarDestacado(mejor);

    // 🎫 TICKET 3 — Paso B ✅
    // toFixed(2) garantiza dos decimales aunque el número sea redondo.
    // Se ejecuta cada vez que cambia cualquier filtro, así el stat
    // siempre muestra el valor real del inventario visible en pantalla.
    let valorTotal = calcularValorInventario(resultado);
    document.getElementById("statValor").textContent = "Valor: $" + valorTotal.toFixed(2);
}


// ════════════════════════════════════════════════════════════
//  🔥 BONUS — El Refactor ✅ SOLUCIÓN
// ════════════════════════════════════════════════════════════
// La versión anterior usaba un for con forEach + find + filter
// anidados para sacar los 3 mejores uno por uno — ~20 líneas.
// Con sort + slice hacemos exactamente lo mismo en 2 líneas.
// El resultado del panel Top 3 es idéntico — esa es la prueba
// de que el refactor fue limpio: misma salida, menos ruido.
function obtenerTop3(lista) {
    if (lista.length === 0) return [];

    // slice() copia para no tocar el original, sort ordena descendente,
    // luego slice(0, 3) recorta los tres primeros — si hay menos de 3
    // devuelve lo que haya sin explotar.
    return lista.slice().sort(function(a, b) {
        return b.rating - a.rating;
    }).slice(0, 3);
}


// ────────────────────────────────────────────────────────────
//  EVENTOS ✅ (no tocar)
// ────────────────────────────────────────────────────────────

document.getElementById("selectGenero").addEventListener("change", function() {
    aplicarFiltros();
});

document.getElementById("checkDisponible").addEventListener("change", function() {
    aplicarFiltros();
});

document.getElementById("selectPlataforma").addEventListener("change", function() {
    aplicarFiltros();
});

document.getElementById("inputPrecioMax").addEventListener("input", function() {
    aplicarFiltros();
});

document.getElementById("btnBuscar").addEventListener("click", function() {
    let titulo = document.getElementById("inputBuscar").value.trim();
    if (titulo === "") {
        aplicarFiltros();
        return;
    }
    let juego = buscarJuego(titulo);
    if (juego) {
        mostrarDetalle(juego);
    } else {
        alert("No se encontró ningún juego con ese título exacto.");
    }
});

document.getElementById("btnCerrarDetalle").addEventListener("click", function() {
    document.getElementById("panelDetalle").classList.add("oculto");
});

document.getElementById("btnLimpiar").addEventListener("click", function() {
    document.getElementById("selectGenero").value      = "";
    document.getElementById("checkDisponible").checked = false;
    document.getElementById("inputBuscar").value       = "";
    document.getElementById("selectPlataforma").value  = "";
    document.getElementById("inputPrecioMax").value    = "";
    document.getElementById("panelDetalle").classList.add("oculto");
    aplicarFiltros();
});

document.getElementById("btnComparar").addEventListener("click", function() {
    comparar();
});

document.getElementById("inputJuego1").addEventListener("keydown", function(e) {
    if (e.key === "Enter") comparar();
});

document.getElementById("inputJuego2").addEventListener("keydown", function(e) {
    if (e.key === "Enter") comparar();
});

document.getElementById("btnCerrarComparador").addEventListener("click", function() {
    document.getElementById("resultadoComparador").classList.add("oculto");
    document.getElementById("inputJuego1").value = "";
    document.getElementById("inputJuego2").value = "";
});

aplicarFiltros();


// ────────────────────────────────────────────────────────────
//  COMPARADOR ✅ (semana pasada, no tocar)
// ────────────────────────────────────────────────────────────

function crearColumnaComparador(juego, ganaRating, ganaPrecio, ganaStock) {
    let precioTexto = juego.precio === 0 ? "GRATIS" : "$" + juego.precio.toFixed(2);

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

function comparar() {
    let titulo1 = document.getElementById("inputJuego1").value.trim();
    let titulo2 = document.getElementById("inputJuego2").value.trim();

    if (titulo1 === "" || titulo2 === "") {
        alert("¡Escribe los dos títulos antes de comparar!");
        return;
    }

    let juego1 = catalogo.find(function(j) { return j.titulo === titulo1; });
    let juego2 = catalogo.find(function(j) { return j.titulo === titulo2; });

    if (!juego1) { alert('"' + titulo1 + '" no existe en el catálogo. Revisa el título exacto.'); return; }
    if (!juego2) { alert('"' + titulo2 + '" no existe en el catálogo. Revisa el título exacto.'); return; }

    let ganaRating1 = juego1.rating > juego2.rating;
    let ganaRating2 = juego2.rating > juego1.rating;
    let ganaPrecio1 = juego1.precio < juego2.precio;
    let ganaPrecio2 = juego2.precio < juego1.precio;
    let ganaStock1  = juego1.stock  > juego2.stock;
    let ganaStock2  = juego2.stock  > juego1.stock;

    document.getElementById("comparadorCards").innerHTML =
        crearColumnaComparador(juego1, ganaRating1, ganaPrecio1, ganaStock1) +
        '<div class="comp-separador">VS</div>' +
        crearColumnaComparador(juego2, ganaRating2, ganaPrecio2, ganaStock2);

    document.getElementById("resultadoComparador").classList.remove("oculto");
}