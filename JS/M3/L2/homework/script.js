// ============================================================
//  PokéDev — TrainerCard v2.0  |  script.js  — SOLUCIÓN
//  M3L2 · LevelUp Code Bootcamp 2026
// ============================================================


// ────────────────────────────────────────────────────────────
//  SECCIÓN 1 — FUNCIONES DE UI  (ya implementadas ✅)
// ────────────────────────────────────────────────────────────

function mostrarError(mensaje) {
  let elError = document.getElementById("mensajeError");
  let elExito = document.getElementById("mensajeExito");

  elExito.style.display = "none";
  elError.textContent = "⚠️ " + mensaje;
  elError.style.display = "block";
}

function mostrarExito(mensaje) {
  let elError = document.getElementById("mensajeError");
  let elExito = document.getElementById("mensajeExito");

  elError.style.display = "none";
  elExito.textContent = "✅ " + mensaje;
  elExito.style.display = "block";
}

function limpiarMensajes() {
  document.getElementById("mensajeError").style.display = "none";
  document.getElementById("mensajeExito").style.display = "none";
}

function renderizarTarjeta(entrenador) {

  let claseRegion = "region-" + entrenador.region.toLowerCase();
  let inicial = entrenador.nombre.charAt(0).toUpperCase();
  let idFicticio = "ID-" + Date.now().toString().slice(-6);

  document.getElementById("cardAvatar").textContent = inicial;
  document.getElementById("cardNombre").textContent = entrenador.nombre;
  document.getElementById("cardRegion").textContent = "📍 Región: " + entrenador.region;
  document.getElementById("cardTipo").textContent = entrenador.tipo;
  document.getElementById("cardPokemon").textContent = entrenador.pokemon;
  document.getElementById("cardFrase").textContent = "\"" + entrenador.frase + "\"";
  document.getElementById("cardId").textContent = idFicticio;

  let tarjeta = document.getElementById("trainerCard");
  tarjeta.className = "trainer-card " + claseRegion;

  // Si el objeto tiene el método obtenerInsignia lo usamos —
  // si no existe mostramos el default
  if (entrenador.obtenerInsignia) {
    document.getElementById("cardInsignia").textContent = entrenador.obtenerInsignia();
  } else {
    document.getElementById("cardInsignia").textContent = "🏅";
  }

  // Imprimimos en consola para ver el resultado del método
  console.log(entrenador.presentarse());

  document.getElementById("formSection").style.display = "none";
  document.getElementById("cardSection").style.display = "block";
}


// ────────────────────────────────────────────────────────────
//  SECCIÓN 2 — MANEJADOR DEL SUBMIT  ✅ SOLUCIÓN
// ────────────────────────────────────────────────────────────

document.getElementById("formTrainer").addEventListener("submit", function (evento) {

  evento.preventDefault();
  limpiarMensajes();


  // ── PASO 1: LEER LOS CAMPOS ──────────────────────────────
  let nombre  = document.getElementById("inputNombre").value;
  let region  = document.getElementById("inputRegion").value;
  let tipo    = document.getElementById("inputTipo").value;
  let pokemon = document.getElementById("inputPokemon").value;
  let frase   = document.getElementById("inputFrase").value;


  // ── PASO 2: VALIDAR ──────────────────────────────────────
  // Cada campo se revisa por separado — si falla, cortamos con return
  if (nombre.trim() === "") {
    mostrarError("El nombre del entrenador no puede estar vacío.");
    return;
  }

  if (region === "") {
    mostrarError("Debes seleccionar tu región de origen.");
    return;
  }

  if (tipo === "") {
    mostrarError("Debes seleccionar tu tipo Pokémon favorito.");
    return;
  }

  if (pokemon.trim() === "") {
    mostrarError("El nombre de tu Pokémon estrella no puede estar vacío.");
    return;
  }

  if (frase.trim() === "") {
    mostrarError("Tu frase de batalla no puede estar vacía.");
    return;
  }


  // ── PASO 3: CONSTRUIR EL OBJETO ──────────────────────────
  // Los 5 datos sueltos se convierten en una identidad con comportamiento propio

  let entrenador = {
    nombre:  nombre,
    region:  region,
    tipo:    tipo,
    pokemon: pokemon,
    frase:   frase,

    // presentarse() usa "this" para hablar de sus propias propiedades
    presentarse: function () {
      return "Soy " + this.nombre + ", entrenador de la región " + this.region + ".";
    },

    // obtenerInsignia() devuelve un símbolo según la región del entrenador
    obtenerInsignia: function () {
      if (this.region === "Kanto") {
        return "🔴";
      } else if (this.region === "Johto") {
        return "✨";
      } else if (this.region === "Hoenn") {
        return "🌊";
      } else if (this.region === "Sinnoh") {
        return "💎";
      } else if (this.region === "Unova") {
        return "⚫";
      } else if (this.region === "Kalos") {
        return "🌸";
      } else {
        return "🏅";
      }
    }
  };


  // ── PASO 4: ENTREGAR EL OBJETO A LA FÁBRICA ─────────────
  renderizarTarjeta(entrenador);

  // También reseteamos el equipo por si el usuario ya había
  // construido uno antes en la misma sesión
  equipoPokemon = [];
  renderizarEquipo();
});


// ────────────────────────────────────────────────────────────
//  BOTÓN RESET ✅
// ────────────────────────────────────────────────────────────

document.getElementById("btnReset").addEventListener("click", function () {
  document.getElementById("cardSection").style.display = "none";
  document.getElementById("formSection").style.display = "block";
  document.getElementById("formTrainer").reset();
  limpiarMensajes();

  // Resetea el texto visual de los custom selects —
  // el <select> nativo ya se limpió con reset() pero el trigger
  // visual es un div independiente que hay que limpiar a mano
  document.querySelector("#customRegion .custom-select-trigger span").textContent = "— Selecciona una región —";
  document.querySelector("#customTipo .custom-select-trigger span").textContent = "— Selecciona un tipo —";

  // Quita la marca visual de la opción seleccionada
  document.querySelectorAll(".custom-option").forEach(function (opt) {
    opt.classList.remove("selected");
  });

  // También limpiamos el equipo
  equipoPokemon = [];
  renderizarEquipo();
});


// ════════════════════════════════════════════════════════════
//  EXTRA BONUS — EQUIPO DE COMBATE  ✅ SOLUCIÓN
// ════════════════════════════════════════════════════════════

// Array global donde viven los Pokémon del equipo.
// Empieza vacío — cada push agrega uno al final.
let equipoPokemon = [];

// renderizarEquipo recorre el array con forEach y actualiza
// los 5 slots del HTML — uno por uno, en orden.
function renderizarEquipo() {
  // Recorremos los 5 slots posibles usando su índice
  for (let i = 0; i < 5; i++) {
    let slot = document.getElementById("slot-" + i);

    if (equipoPokemon[i]) {
      // Este slot tiene un Pokémon — lo mostramos
      let poke = equipoPokemon[i];
      slot.className = "equipo-slot lleno";
      slot.innerHTML =
        "<span class=\"slot-num\">" + (i + 1) + "</span>" +
        "<div class=\"slot-info\">" +
          "<p class=\"slot-nombre\">" + poke.nombre + "</p>" +
          "<p class=\"slot-detalle\">" + poke.tipo + " · Nv." + poke.nivel + " · " + poke.movimiento + "</p>" +
        "</div>";
    } else {
      // Este slot está vacío — lo reseteamos
      slot.className = "equipo-slot vacio";
      slot.innerHTML =
        "<span class=\"slot-num\">" + (i + 1) + "</span>" +
        "<span class=\"slot-texto\">Vacío</span>";
    }
  }
}

// El botón "Agregar al equipo" lee los campos, valida,
// construye el objeto y lo mete en el array con push
document.getElementById("btnAgregarPokemon").addEventListener("click", function () {
  let msgEquipo = document.getElementById("mensajeEquipo");

  // Si ya hay 5 Pokémon, mostramos el aviso y cortamos
  if (equipoPokemon.length >= 5) {
    msgEquipo.textContent = "⚠️ Tu equipo ya está completo. ¡A batallar!";
    msgEquipo.style.display = "block";
    return;
  }

  // Leer los cuatro campos del equipo
  let nombre     = document.getElementById("equipoNombre").value.trim();
  let tipo       = document.getElementById("equipoTipo").value;
  let nivelRaw   = document.getElementById("equipoNivel").value;
  let movimiento = document.getElementById("equipoMovimiento").value.trim();

  // Validar uno por uno — mismo patrón que el entrenador
  if (nombre === "") {
    msgEquipo.textContent = "⚠️ El nombre del Pokémon no puede estar vacío.";
    msgEquipo.style.display = "block";
    return;
  }

  if (tipo === "") {
    msgEquipo.textContent = "⚠️ Debes seleccionar un tipo.";
    msgEquipo.style.display = "block";
    return;
  }

  // Number() convierte el string a número para poder comparar
  let nivel = Number(nivelRaw);
  if (nivelRaw === "" || nivel < 1 || nivel > 100) {
    msgEquipo.textContent = "⚠️ El nivel debe ser un número entre 1 y 100.";
    msgEquipo.style.display = "block";
    return;
  }

  if (movimiento === "") {
    msgEquipo.textContent = "⚠️ El movimiento especial no puede estar vacío.";
    msgEquipo.style.display = "block";
    return;
  }

  // Todo válido — construimos el objeto del Pokémon
  let nuevoPoke = {
    nombre:     nombre,
    tipo:       tipo,
    nivel:      nivel,
    movimiento: movimiento
  };

  // push agrega el nuevo objeto al final del array
  equipoPokemon.push(nuevoPoke);

  // Ocultamos el error y limpiamos los campos
  msgEquipo.style.display = "none";
  document.getElementById("equipoNombre").value = "";
  document.getElementById("equipoTipo").value = "";
  document.getElementById("equipoNivel").value = "";
  document.getElementById("equipoMovimiento").value = "";

  // Redibujar los slots con el equipo actualizado
  renderizarEquipo();

  // Aviso cuando se completa el equipo
  if (equipoPokemon.length === 5) {
    msgEquipo.textContent = "✅ ¡Equipo completo! Ya tienes 5 Pokémon listos para combatir.";
    msgEquipo.style.display = "block";
  }
});