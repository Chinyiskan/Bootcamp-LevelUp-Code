// ================================================================
// Corral.js  –  Motor y UI del Corral de Animales
// Se integra con el juego existente leyendo estadoJuego de Juego.js
// ================================================================
// ⚠️  INSTRUCCIÓN ÚNICA PARA ESTE ARCHIVO:
//     Solo debes implementar la función renderizarTarjetaAnimal().
//     Todo lo demás ya está listo y funcionando.
// ================================================================

import { estadoJuego } from './Juego.js';
import { crearAnimal, CATALOGO_ANIMALES_VISUAL } from './Animales.js';

// ──────────────────────────────────────────────────────────────
// CONFIGURACIÓN DEL CORRAL
// ──────────────────────────────────────────────────────────────

const COSTO_DESBLOQUEO_CORRAL = 250;
const MAX_ANIMALES            = 4;
const CICLO_PRODUCCION        = 25; // segundos entre cada ronda de monedas

// ──────────────────────────────────────────────────────────────
// ESTADO INTERNO DEL CORRAL
// ──────────────────────────────────────────────────────────────

let corralEstado = {
  desbloqueado:             false,
  animales:                 [],   // instancias de Pollo o Vaca
  _ultimoTick:              null,
  _tiempoDesdeProduccion:   0,
  // posición libre de cada sprite en el corral (px)
  _posiciones:              [],
  // dirección y velocidad de cada animal
  _movimientos:             [],
};

// ──────────────────────────────────────────────────────────────
// ACCIONES (expuestas globalmente para los onclick del HTML)
// ──────────────────────────────────────────────────────────────

/**
 * desbloquearCorral()
 * Descuenta oro y activa el corral si el jugador tiene suficiente.
 */
window.desbloquearCorral = function () {
  if (estadoJuego.oro < COSTO_DESBLOQUEO_CORRAL) {
    mostrarToastCorral('❌ Necesitas ' + COSTO_DESBLOQUEO_CORRAL + ' 🪙 para desbloquear el corral.');
    return;
  }
  estadoJuego.oro -= COSTO_DESBLOQUEO_CORRAL;
  corralEstado.desbloqueado = true;
  actualizarOroEnHUD();
  reconstruirCorral();
  mostrarToastCorral('🐄 ¡Corral desbloqueado! Ya puedes comprar animales.');
};

/**
 * comprarAnimal()
 * Intenta comprar un animal del tipo indicado.
 * @param {string} tipo - 'pollo' o 'vaca'
 */
window.comprarAnimal = function (tipo) {
  if (corralEstado.animales.length >= MAX_ANIMALES) {
    mostrarToastCorral('🚫 El corral está lleno. Máximo ' + MAX_ANIMALES + ' animales.');
    return;
  }

  let info = CATALOGO_ANIMALES_VISUAL[tipo];
  if (!info) return;

  if (estadoJuego.oro < info.costoCompra) {
    mostrarToastCorral('❌ Necesitas ' + info.costoCompra + ' 🪙 para comprar un ' + info.nombre + '.');
    return;
  }

  try {
    let nuevoAnimal = crearAnimal(tipo);
    estadoJuego.oro -= info.costoCompra;
    corralEstado.animales.push(nuevoAnimal);

    // Inicializar posición y movimiento aleatorio para el nuevo animal
    const pasto = document.getElementById('corral-pasto');
    const anchoMax = pasto ? pasto.clientWidth - 64 : 400;
    corralEstado._posiciones.push({
      x: Math.random() * anchoMax,
      y: Math.random() * 40, // variación vertical ligera dentro del pasto
    });
    corralEstado._movimientos.push({
      vx: (Math.random() * 30 + 15) * (Math.random() < 0.5 ? 1 : -1),
      flipX: false,
    });

    actualizarOroEnHUD();
    reconstruirCorral();           // reconstruye el DOM de sprites
    actualizarSprites();           // pinta las posiciones iniciales
    mostrarToastCorral('🐣 ¡' + info.nombre + ' comprado! Cuídalo bien.');
  } catch (e) {
    mostrarToastCorral('⚠️ ' + info.nombre + ': clase aún no implementada. ¡Es tu tarea!');
  }
};

/**
 * alimentarAnimal()
 * Alimenta al animal en la posición indicada.
 * @param {number} indice - Posición del animal en el array
 */
window.alimentarAnimal = function (indice) {
  let animal = corralEstado.animales[indice];
  if (!animal) return;
  animal.alimentar();                   // recarga hambre a 100
  actualizarEstadisticas();             // actualiza solo las stats, sin destruir sprites
  mostrarToastCorral('🌽 ¡' + animal.nombre + ' alimentado!');
};

// ──────────────────────────────────────────────────────────────
// CICLO PRINCIPAL DEL CORRAL
// ──────────────────────────────────────────────────────────────

/**
 * tickCorral()
 * Se ejecuta en cada fotograma vía requestAnimationFrame.
 * Actualiza el estado de todos los animales.
 *
 * @param {DOMHighResTimeStamp} tiempoActual
 */
function tickCorral(tiempoActual) {
  if (!corralEstado.desbloqueado || corralEstado.animales.length === 0) {
    requestAnimationFrame(tickCorral);
    return;
  }

  if (!corralEstado._ultimoTick) {
    corralEstado._ultimoTick = tiempoActual;
  }

  let delta = (tiempoActual - corralEstado._ultimoTick) / 1000;
  corralEstado._ultimoTick = tiempoActual;

  // Limitar delta para evitar saltos grandes tras pestaña oculta
  if (delta > 0.2) delta = 0.2;

  // Actualizar lógica de cada animal
  corralEstado.animales.forEach(function (animal) {
    animal.crecer(delta);
    animal.tenerHambre(delta);
    animal.revisarEstado();
  });

  // Mover sprites libremente por el pasto
  moverAnimales(delta);

  // Actualizar solo las estadísticas flotantes (sin reconstruir el DOM)
  actualizarEstadisticas();

  // Ciclo de producción / penalización
  corralEstado._tiempoDesdeProduccion += delta;
  if (corralEstado._tiempoDesdeProduccion >= CICLO_PRODUCCION) {
    ejecutarCicloProduccion();
    corralEstado._tiempoDesdeProduccion = 0;
  }

  requestAnimationFrame(tickCorral);
}

/**
 * ejecutarCicloProduccion()
 * Suma o resta oro según el estado de cada animal adulto.
 */
function ejecutarCicloProduccion() {
  let oroGanado  = 0;
  let oroPerdido = 0;

  corralEstado.animales.forEach(function (animal) {
    oroGanado  += animal.producirMonedas();
    oroPerdido += animal.penalizacionTriste();
  });

  if (oroGanado > 0) {
    estadoJuego.oro += oroGanado;
    mostrarToastCorral('🪙 Corral generó +' + oroGanado + ' monedas.');
  }
  if (oroPerdido > 0) {
    estadoJuego.oro = Math.max(0, estadoJuego.oro - oroPerdido);
    mostrarToastCorral('😢 Animales tristes... -' + oroPerdido + ' monedas.');
  }

  actualizarOroEnHUD();
}

// ──────────────────────────────────────────────────────────────
// MOVIMIENTO LIBRE EN EL PASTO
// ──────────────────────────────────────────────────────────────

function moverAnimales(delta) {
  const pasto = document.getElementById('corral-pasto');
  if (!pasto) return;
  const anchoMax = pasto.clientWidth - 64;
  const altoMax  = pasto.clientHeight - 72; // margen para las stats flotantes

  corralEstado.animales.forEach(function (animal, i) {
    if (!corralEstado._posiciones[i] || !corralEstado._movimientos[i]) return;

    let pos = corralEstado._posiciones[i];
    let mov = corralEstado._movimientos[i];

    // Mover
    pos.x += mov.vx * delta;

    // Rebotar en los bordes horizontales
    if (pos.x < 0) {
      pos.x = 0;
      mov.vx = Math.abs(mov.vx);
    } else if (pos.x > anchoMax) {
      pos.x = anchoMax;
      mov.vx = -Math.abs(mov.vx);
    }

    // flip según dirección
    mov.flipX = mov.vx < 0;

    // Cambio de dirección/velocidad aleatorio cada ~3-6s
    if (Math.random() < delta * 0.15) {
      mov.vx = (Math.random() * 30 + 15) * (Math.random() < 0.5 ? 1 : -1);
    }
  });

  // Pintar posiciones actualizadas en el DOM
  actualizarSprites();
}

/**
 * actualizarSprites()
 * Mueve los elementos `.animal-sprite` sin reconstruir el DOM.
 */
function actualizarSprites() {
  corralEstado.animales.forEach(function (animal, i) {
    const sprite = document.getElementById('sprite-' + i);
    if (!sprite) return;

    const pos = corralEstado._posiciones[i];
    const mov = corralEstado._movimientos[i];
    if (!pos || !mov) return;

    sprite.style.left      = pos.x + 'px';
    sprite.style.bottom    = (10 + (pos.y || 0)) + 'px';
    sprite.style.transform = mov.flipX ? 'scaleX(-1)' : 'scaleX(1)';

    // Actualizar imagen si cambió de fase o estado
    const img = sprite.querySelector('.animal-sprite-img');
    if (img) {
      const nuevaSrc = animal.renderizar();
      if (img.src.indexOf(nuevaSrc) === -1) img.src = nuevaSrc;
    }
  });
}

// ──────────────────────────────────────────────────────────────
// RENDERIZADO  –  SEPARADO EN DOS CAPAS
// ──────────────────────────────────────────────────────────────

/**
 * reconstruirCorral()
 * Solo se llama cuando cambia la estructura (comprar/desbloquear).
 * NO se llama en cada tick.
 */
function reconstruirCorral() {
  let contenedor = document.getElementById('corral-terreno');
  if (!contenedor) return;

  if (!corralEstado.desbloqueado) {
    contenedor.innerHTML = renderizarCorralBloqueado();
    return;
  }

  // ── Layout: panel lateral izq (tienda) + pasto derecho ──────
  let html = `
    <h2 class="corral-terreno-titulo">🐄 Corral de Animales</h2>
    <div class="corral-layout">

      <!-- Panel lateral: tienda de animales -->
      <aside class="corral-panel-tienda">
        <p class="corral-tienda-titulo">🛒 Comprar</p>
        ${Object.keys(CATALOGO_ANIMALES_VISUAL).map(function (tipo) {
          const info = CATALOGO_ANIMALES_VISUAL[tipo];
          return `
            <button class="corral-btn-comprar" onclick="comprarAnimal('${tipo}')"
                    style="border-color: ${info.colorUI}">
              <img src="${info.rutaImagen}" class="corral-btn-img" alt="${info.nombre}" />
              <span class="corral-btn-nombre">${info.icono} ${info.nombre}</span>
              <span class="corral-costo">${info.costoCompra} 🪙</span>
              <span class="corral-descripcion-mini">${info.descripcion}</span>
            </button>`;
        }).join('')}
        <p class="corral-capacidad">${corralEstado.animales.length}/${MAX_ANIMALES} animales</p>
      </aside>

      <!-- Pasto: sprites libres + stats flotantes -->
      <div class="corral-pasto" id="corral-pasto">
        ${corralEstado.animales.length === 0
          ? '<p class="corral-vacio">¡Compra tu primer animal!</p>'
          : corralEstado.animales.map(function (animal, i) {
              return renderizarSpriteAnimal(animal, i);
            }).join('')
        }
      </div>

    </div>`;

  contenedor.innerHTML = html;
}

/**
 * actualizarEstadisticas()
 * Actualiza solo el HTML de las stats flotantes encima de cada sprite.
 * Se llama en cada tick — NO toca las posiciones ni las imágenes.
 */
function actualizarEstadisticas() {
  corralEstado.animales.forEach(function (animal, i) {
    const stats = document.getElementById('stats-' + i);
    if (!stats) return;
    stats.innerHTML = renderizarStatsFlotantes(animal);
  });
}

// ──────────────────────────────────────────────────────────────
// HELPERS DE HTML
// ──────────────────────────────────────────────────────────────

/**
 * renderizarCorralBloqueado()
 * Devuelve el HTML del estado "bloqueado" del corral.
 * @returns {string}
 */
function renderizarCorralBloqueado() {
  return `
    <h2 class="corral-terreno-titulo">🔒 Corral de Animales</h2>
    <div class="corral-terreno-valla">
      <div class="corral-bloqueo-card">
        <div class="corral-bloqueo-imagenes">
          <img src="images/vaca/vaca_bebe.webp" alt="Vaca bebé" class="corral-img" />
          <img src="images/pollo/pollo_huevo.webp" alt="Huevo" class="corral-img" />
        </div>
        <div class="corral-bloqueo-info">
          <p class="corral-bloqueo-desc">Desbloquea el corral para criar animales.</p>
          <p class="corral-bloqueo-desc">Los animales adultos generan monedas automáticamente.</p>
          <p class="corral-bloqueo-desc">¡Pero cuídalos! Un animal triste resta oro.</p>
          <button class="corral-btn-desbloquear btn-comprar-campo" onclick="desbloquearCorral()">
            <span class="bcc-icono">🔒</span>
            <div class="bcc-info">
              <span class="bcc-titulo">Desbloquear Corral</span>
              <span class="bcc-precio">${COSTO_DESBLOQUEO_CORRAL} 🪙</span>
            </div>
          </button>
        </div>
      </div>
    </div>`;
}


// ════════════════════════════════════════════════════════════════
//  🎫 TICKET 4 — renderizarTarjetaAnimal()
//
//  Esta función genera el HTML de una tarjeta individual de animal.
//  Es el único método que debes implementar en este archivo.
//
//  Recibe un objeto 'animal' (instancia de Pollo o Vaca) y el
//  índice de su posición en el array (necesario para el botón).
//
//  Propiedades disponibles en el objeto 'animal':
//    animal.nombre             → "Pollo" o "Vaca"
//    animal.icono              → "🐔" o "🐄"
//    animal.colorUI            → color en HEX para el borde
//    animal.fase               → número: 0, 1 o 2
//    animal.nombresFases       → array: ["Huevo", "Pollito", "Adulto"]
//    animal.hambre             → número 0–100
//    animal.progresoFase       → número 0–100 (solo si no es adulto)
//    animal.estaTriste         → true o false
//    animal.renderizar()       → ruta de imagen según estado actual
//    animal.esAdulto()         → true si fase === 2
//
//  La tarjeta debe mostrar:
//    ✅ Imagen del animal (usa animal.renderizar() como src)
//    ✅ Nombre + fase actual  (ej: "🐔 Pollito")
//    ✅ Barra de hambre con el porcentaje actual
//    ✅ Barra de progreso de fase (solo si NO es adulto)
//    ✅ Botón "Dar Comida 🌽" → onclick="alimentarAnimal([indice])"
//    ✅ Si está triste: alguna indicación visual (emoji, texto, estilo)
//
//  Pista: usa template literals — backticks ` ` — igual que
//         generarTarjeta() en los ejercicios de clase anteriores.
//
//  Clases CSS ya disponibles (en styles/main.css):
//    .animal-card        → contenedor de la tarjeta
//    .animal-imagen      → imagen del animal
//    .animal-nombre-fase → encabezado con nombre y fase
//    .barra-contenedor   → fondo gris de cualquier barra
//    .barra-relleno      → parte coloreada de la barra (usa 'width' en %)
//    .barra-hambre       → relleno específico de la barra de hambre
//    .barra-progreso     → relleno específico de la barra de progreso
//    .animal-btn-alimentar → estilo del botón de alimentar
//    .animal-triste-aviso  → aviso rojo de animal triste
// ════════════════════════════════════════════════════════════════

/**
 * renderizarSpriteAnimal()
 * Genera el HTML del sprite libre en el pasto (con stats flotantes encima).
 * El sprite en sí no se regenera en cada tick; solo las stats internas.
 *
 * @param {import('./Animal.js').Animal} animal
 * @param {number} indice
 * @returns {string}
 */
function renderizarSpriteAnimal(animal, indice) {
  // Solución Ticket 4
  return `
    <div class="animal-sprite" id="sprite-${indice}"
         style="border-color: ${animal.colorUI}">
      <!-- Stats flotantes: se actualizan en cada tick sin reconstruir el sprite -->
      <div class="animal-stats-flotantes" id="stats-${indice}">
        ${renderizarStatsFlotantes(animal)}
      </div>
      <img class="animal-sprite-img" src="${animal.renderizar()}" alt="${animal.nombre}" />
      <button class="animal-btn-alimentar" onclick="alimentarAnimal(${indice})">
        🌽
      </button>
    </div>`;
}

/**
 * renderizarStatsFlotantes()
 * Genera el HTML de las barras de hambre y progreso que aparecen
 * flotando encima del sprite del animal.
 *
 * @param {import('./Animal.js').Animal} animal
 * @returns {string}
 */
function renderizarStatsFlotantes(animal) {
  // Solución Ticket 4 – stats
  const hambre      = Math.round(animal.hambre);
  const hambreColor = hambre < 30 ? '#e53935' : hambre < 60 ? '#e67e22' : '#43a047';
  const nombreFase  = animal.nombresFases[animal.fase];

  let barraFase = '';
  if (!animal.esAdulto()) {
    const progreso = Math.round(animal.progresoFase);
    barraFase = `
      <div class="stats-label">📈 ${progreso}%</div>
      <div class="stats-barra">
        <div class="stats-barra-fill stats-barra-progreso" style="width:${progreso}%"></div>
      </div>`;
  }

  const triste = animal.estaTriste
    ? '<div class="stats-triste">😢 ¡Hambre!</div>'
    : '';

  return `
    <div class="stats-nombre">${animal.icono} ${nombreFase}</div>
    <div class="stats-label">🍖 ${hambre}%</div>
    <div class="stats-barra">
      <div class="stats-barra-fill stats-barra-hambre"
           style="width:${hambre}%; background:${hambreColor}"></div>
    </div>
    ${barraFase}
    ${triste}`;
}

// ──────────────────────────────────────────────────────────────
// UTILIDADES
// ──────────────────────────────────────────────────────────────

/**
 * actualizarOroEnHUD()
 * Actualiza el contador de oro en el HUD superior del juego.
 */
function actualizarOroEnHUD() {
  let elemento = document.getElementById('hud-oro');
  if (elemento) elemento.textContent = estadoJuego.oro;
}

/**
 * mostrarToastCorral()
 * Muestra un mensaje breve en el toast existente del juego.
 * @param {string} mensaje
 */
function mostrarToastCorral(mensaje) {
  let toast   = document.getElementById('toast-feedback');
  let textoEl = document.getElementById('toast-texto');
  if (!toast || !textoEl) return;

  textoEl.textContent = mensaje;
  toast.classList.remove('oculto');
  setTimeout(function () {
    toast.classList.add('oculto');
  }, 2500);
}

// ──────────────────────────────────────────────────────────────
// ARRANQUE
// ──────────────────────────────────────────────────────────────

/**
 * inicializarCorral()
 * Punto de entrada. Hace el primer render y arranca el bucle.
 */
function inicializarCorral() {
  reconstruirCorral();
  requestAnimationFrame(tickCorral);
  console.log('[Corral] Módulo de animales iniciado.');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarCorral);
} else {
  inicializarCorral();
}