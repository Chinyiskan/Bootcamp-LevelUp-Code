// ============================================================
//  PokéDev — TrainerCard  |  script.js  — SOLUCIÓN
//  Misión 10 · LevelUp Code Bootcamp 2026
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
  // si no existe (estudiante no hizo el bonus) mostramos el default
  if (entrenador.obtenerInsignia) {
    document.getElementById("cardInsignia").textContent = entrenador.obtenerInsignia();
  } else {
    document.getElementById("cardInsignia").textContent = "🏅";
  }

  console.log(entrenador.presentarse());

  document.getElementById("formSection").style.display = "none";
  document.getElementById("cardSection").style.display = "block";
}


// ────────────────────────────────────────────────────────────
//  SECCIÓN 2 — MANEJADOR DEL SUBMIT  ✅ SOLUCIÓN COMPLETA
// ────────────────────────────────────────────────────────────

document.getElementById("formTrainer").addEventListener("submit", function (evento) {

  evento.preventDefault();
  limpiarMensajes();


  // ── PASO 1: LEER LOS CAMPOS ──────────────────────────────
  // Los selects custom escriben su valor en el <select> nativo oculto,
  // así que document.getElementById sigue funcionando exactamente igual

  let nombre  = document.getElementById("inputNombre").value;
  let region  = document.getElementById("inputRegion").value;
  let tipo    = document.getElementById("inputTipo").value;
  let pokemon = document.getElementById("inputPokemon").value;
  let frase   = document.getElementById("inputFrase").value;


  // ── PASO 2: VALIDAR ──────────────────────────────────────
  // Cada campo se revisa por separado — si falla, cortamos con return
  // para que el usuario sepa exactamente qué campo le falta

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

    // 🔥 BONUS — obtenerInsignia() con if/else if por región
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

});


// ────────────────────────────────────────────────────────────
//  BOTÓN RESET — ya implementado ✅
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

  // Quita la marca visual de la opción seleccionada en ambos selects
  document.querySelectorAll(".custom-option").forEach(function (opt) {
    opt.classList.remove("selected");
  });
});