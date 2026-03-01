// Variables globales
let modoEco = false;

// Elementos del DOM
let inputKm = document.querySelector("#inputKm");
let inputBateria = document.querySelector("#inputBateria");
let selectTerreno = document.querySelector("#selectTerreno");
let toggleEcoBtn = document.querySelector("#toggleEco");
let textoEco = document.querySelector("#textoEco");

let formulario = document.querySelector("#formulario");
let resultados = document.querySelector("#resultados");
let mensajeError = document.querySelector("#mensajeError");

let iconoResultado = document.querySelector("#iconoResultado");
let textoResultado = document.querySelector("#textoResultado");
let consumoEstimado = document.querySelector("#consumoEstimado");
let bateriaRestante = document.querySelector("#bateriaRestante");
let kmSobra = document.querySelector("#kmSobra");
let tiempoEstimado = document.querySelector("#tiempoEstimado");
let co2Ahorrado = document.querySelector("#co2Ahorrado");

let advertencia = document.querySelector("#advertencia");
let textoAdvertencia = document.querySelector("#textoAdvertencia");
let sugerencia = document.querySelector("#sugerencia");
let textoSugerencia = document.querySelector("#textoSugerencia");


// ========================
// FUNCIONES PURAS
// ========================

// Calcula cuánta batería se consume según km y terreno
// Plano = 1% por km, Subida = 2%, Montaña = 3%
function calcularConsumo(km, terreno) {
    let consumoPorKm = 1;

    if (terreno === "subida") {
        consumoPorKm = 2;
    } else if (terreno === "montaña") {
        consumoPorKm = 3;
    }

    let consumoTotal = km * consumoPorKm;
    return consumoTotal;
}

// Verifica si la batería alcanza para la ruta
// Retorna true si alcanza, false si no
function verificarAutonomia(cargaActual, consumoEstimado) {
    if (cargaActual >= consumoEstimado) {
        return true;
    } else {
        return false;
    }
}

// Genera texto de advertencia si la carga es baja
function mostrarAdvertencia(carga) {
    if (carga < 0) {
        return "🔴 ¡No llegarás! Te faltan " + Math.abs(carga) + "% de batería.";
    } else if (carga < 20) {
        return "🟡 ¡Cuidado! Llegarías con solo " + carga + "% de batería.";
    } else {
        return "";
    }
}

// Aplica el modo Eco que reduce el consumo en un 20%
function aplicarModoEco(consumo) {
    let consumoReducido = consumo * 0.80;
    return consumoReducido;
}

// Calcula el tiempo estimado de viaje en minutos
// Velocidad promedio: Plano = 20km/h, Subida = 12km/h, Montaña = 8km/h
function calcularTiempo(km, terreno) {
    let velocidad = 20;

    if (terreno === "subida") {
        velocidad = 12;
    } else if (terreno === "montaña") {
        velocidad = 8;
    }

    let horas = km / velocidad;
    let minutos = Math.round(horas * 60);
    return minutos;
}

// Calcula el CO₂ ahorrado comparado con un auto
// Un auto emite aprox 120g de CO₂ por km
function calcularCO2(km) {
    let co2Auto = km * 120;
    return co2Auto;
}

// Calcula cuántos km de sobra te quedan después del viaje
function calcularKmSobra(cargaRestante, terreno) {
    let consumoPorKm = 1;

    if (terreno === "subida") {
        consumoPorKm = 2;
    } else if (terreno === "montaña") {
        consumoPorKm = 3;
    }

    let kmExtra = Math.floor(cargaRestante / consumoPorKm);
    return kmExtra;
}

// Formatea los minutos a un texto legible (ej: "1h 30min")
function formatearTiempo(minutos) {
    if (minutos >= 60) {
        let horas = Math.floor(minutos / 60);
        let mins = minutos % 60;
        return horas + "h " + mins + "min";
    } else {
        return minutos + " min";
    }
}

// Formatea gramos de CO₂ a texto legible
function formatearCO2(gramos) {
    if (gramos >= 1000) {
        let kg = (gramos / 1000).toFixed(1);
        return kg + " kg";
    } else {
        return gramos + " g";
    }
}


// ========================
// FUNCIONES DE INTERACCIÓN
// ========================

// Toggle del modo Eco (se llama con onclick)
function toggleModoEco() {
    if (modoEco === false) {
        modoEco = true;
        toggleEcoBtn.classList.add("activo");
        textoEco.textContent = "Activado 🍃";
    } else {
        modoEco = false;
        toggleEcoBtn.classList.remove("activo");
        textoEco.textContent = "Desactivado";
    }
}

// Función principal que se llama al hacer click en Calcular
function calcularRuta() {
    let km = parseFloat(inputKm.value);
    let bateria = parseFloat(inputBateria.value);
    let terreno = selectTerreno.value;

    // Validar inputs
    if (!km || !bateria || km <= 0 || bateria <= 0 || bateria > 100) {
        mensajeError.classList.remove("oculto");
        return;
    }

    mensajeError.classList.add("oculto");

    // Paso 1: Calcular consumo base
    let consumo = calcularConsumo(km, terreno);

    // Paso 2: Si modo eco está activo, reducir consumo
    if (modoEco) {
        consumo = aplicarModoEco(consumo);
    }

    // Paso 3: Verificar si alcanza la batería
    let alcanza = verificarAutonomia(bateria, consumo);
    let cargaFinal = Math.round(bateria - consumo);

    // Paso 4: Calcular bonus (tiempo y CO₂)
    let tiempo = calcularTiempo(km, terreno);
    let co2 = calcularCO2(km);
    let kmExtra = calcularKmSobra(Math.max(cargaFinal, 0), terreno);

    // Mostrar resultado principal
    if (alcanza) {
        iconoResultado.textContent = "✅";
        textoResultado.textContent = "¡La batería alcanza para tu ruta!";
        textoResultado.classList.add("exito");
        textoResultado.classList.remove("fallo");
    } else {
        iconoResultado.textContent = "❌";
        textoResultado.textContent = "No alcanza la batería para esta ruta";
        textoResultado.classList.add("fallo");
        textoResultado.classList.remove("exito");
    }

    // Mostrar detalles
    consumoEstimado.textContent = Math.round(consumo) + "%";
    bateriaRestante.textContent = cargaFinal + "%";
    kmSobra.textContent = alcanza ? kmExtra + " km" : "0 km";
    tiempoEstimado.textContent = formatearTiempo(tiempo);
    co2Ahorrado.textContent = formatearCO2(co2);

    // Mostrar advertencia si aplica
    let textoAdv = mostrarAdvertencia(cargaFinal);
    if (textoAdv !== "") {
        textoAdvertencia.textContent = textoAdv;
        advertencia.classList.remove("oculto");
    } else {
        advertencia.classList.add("oculto");
    }

    // Mostrar sugerencia si no alcanza
    if (!alcanza) {
        let kmMaximos = Math.floor(bateria / (consumo / km));
        textoSugerencia.textContent = "💡 Sugerencia: Con tu batería actual puedes recorrer máximo " + kmMaximos + " km en terreno " + terreno + ". Busca un punto de recarga cercano.";
        sugerencia.classList.remove("oculto");
    } else {
        sugerencia.classList.add("oculto");
    }

    // Cambiar de vista: ocultar formulario, mostrar resultados
    formulario.classList.add("oculto");
    resultados.classList.remove("oculto");
}

// Volver al formulario para calcular otra ruta
function volverAlFormulario() {
    resultados.classList.add("oculto");
    formulario.classList.remove("oculto");
}
