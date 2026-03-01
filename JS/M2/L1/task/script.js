/* ============================================
   🏥 FARMAPLUS - SISTEMA DE TURNOS
   *** SOLUCIÓN COMPLETA - SOLO PARA EL PROFESOR ***
   ============================================ */

// Contador de turnos
let contadorTurnos = 0;

// Seleccionar elementos del DOM - INPUTS
let inputNombre = document.querySelector("#nombreCliente");
let inputEdad = document.querySelector("#edadCliente");
let selectServicio = document.querySelector("#tipoServicio");
let checkboxPrioridad = document.querySelector("#prioridadEspecial");
let botonGenerar = document.querySelector("#btnGenerarTurno");

// Seleccionar elementos del DOM - TICKET
let mensajeInicial = document.querySelector("#mensajeInicial");
let ticketGenerado = document.querySelector("#ticketGenerado");
let badgeTipoTurno = document.querySelector("#badgeTipoTurno");
let numeroTurnoElemento = document.querySelector("#numeroTurno");
let nombreTicket = document.querySelector("#nombreTicket");
let seccionAsignada = document.querySelector("#seccionAsignada");
let nombreSeccion = document.querySelector("#nombreSeccion");
let ventanillasInfo = document.querySelector("#ventanillasInfo");

// Agregar evento al botón
botonGenerar.addEventListener("click", function () {

    // Capturar datos del formulario
    let nombre = inputNombre.value;
    let edad = Number(inputEdad.value);
    let servicio = selectServicio.value;
    let tienePrioridad = checkboxPrioridad.checked;

    console.log("=== DATOS CAPTURADOS ===");
    console.log("Nombre:", nombre);
    console.log("Edad:", edad);
    console.log("Servicio:", servicio);
    console.log("Prioridad Especial:", tienePrioridad);

    // Determinar si es turno prioritario
    let esPrioritario = edad >= 65 || tienePrioridad === true;

    let tipoTurno = "";
    if (esPrioritario === true) {
        tipoTurno = "PRIORITARIO";
    } else {
        tipoTurno = "NORMAL";
    }

    console.log("Turno Prioritario:", esPrioritario);
    console.log("Tipo de Turno:", tipoTurno);

    // Asignar sección según servicio
    let letraSeccion = "";
    let ventanillas = "";

    if (servicio === "medicamentos") {
        letraSeccion = "A";
        ventanillas = "1-3";
    } else if (servicio === "inyectologia") {
        letraSeccion = "B";
        ventanillas = "4-5";
    } else if (servicio === "cosmeticos") {
        letraSeccion = "C";
        ventanillas = "6-8";
    }

    console.log("Sección:", letraSeccion);
    console.log("Ventanillas:", ventanillas);

    // Generar número de turno
    contadorTurnos = contadorTurnos + 1;
    let numeroFormateado = contadorTurnos.toString().padStart(3, "0");
    let numeroTurnoCompleto = letraSeccion + "-" + numeroFormateado;

    console.log("Número de Turno:", numeroTurnoCompleto);

    // Mostrar ticket en pantalla
    badgeTipoTurno.textContent = tipoTurno;
    numeroTurnoElemento.textContent = numeroTurnoCompleto;
    nombreTicket.textContent = nombre;
    nombreSeccion.textContent = "Sección " + letraSeccion;
    ventanillasInfo.textContent = "Ventanillas " + ventanillas;

    // Aplicar estilos según prioridad
    if (esPrioritario === true) {
        ticketGenerado.classList.remove("turno-normal");
        ticketGenerado.classList.add("turno-prioritario");
    } else {
        ticketGenerado.classList.remove("turno-prioritario");
        ticketGenerado.classList.add("turno-normal");
    }

    // Mostrar/Ocultar elementos
    mensajeInicial.style.display = "none";
    ticketGenerado.style.display = "block";
    ticketGenerado.classList.add("ticket-aparece");

    // Limpiar formulario
    inputNombre.value = "";
    inputEdad.value = "";
    selectServicio.value = "";
    checkboxPrioridad.checked = false;

    console.log("✅ ¡Turno generado exitosamente!");
    console.log("========================\n");
});
