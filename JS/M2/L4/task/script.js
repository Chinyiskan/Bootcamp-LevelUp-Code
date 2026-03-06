// ============================================================
//  MercaYa — ShopRegister  |  script.js  ✅ SOLUCIÓN
//  M2L4 · JavaScript Bootcamp 2026
// ============================================================


// ────────────────────────────────────────────────────────────
//  SECCIÓN 1 — FUNCIONES DE VALIDACIÓN
//  Funciones puras: reciben un valor y retornan true o false.
//  No modifican nada fuera de ellas — solo evalúan y responden.
// ────────────────────────────────────────────────────────────

function validarNombre(nombre) {
    // .trim() elimina espacios al inicio y al final
    // así "   " no pasa como nombre válido
    if (nombre.trim() === "" || nombre.trim().length < 3) return false;
    return true;
}

function validarFecha(fecha) {
    if (fecha === "") return false;
    // Date() convierte el string "YYYY-MM-DD" a un objeto de fecha
    let hoy = new Date();
    let nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    if (edad < 18) return false;
    return true;
}

function validarPais(pais) {
    // El select tiene "" como valor del placeholder
    if (pais === "") return false;
    return true;
}

function validarCiudad(ciudad) {
    if (ciudad.trim() === "") return false;
    return true;
}

function validarEmail(email) {
    // Validación básica: debe tener @ y un punto en el dominio
    if (!email.includes("@") || !email.includes(".")) return false;
    return true;
}

function validarTelefono(telefono) {
    // .trim() por si el usuario dejó espacios
    if (telefono.trim().length !== 10) return false;
    return true;
}

function validarDireccion(direccion) {
    if (direccion.trim() === "") return false;
    return true;
}

function validarPassword(password) {
    if (password.length < 8) return false;
    return true;
}

function validarConfirmPassword(password, confirmPassword) {
    // Comparamos directamente las dos contraseñas
    if (confirmPassword !== password) return false;
    return true;
}


// ────────────────────────────────────────────────────────────
//  SECCIÓN 2 — FUNCIONES DE UI (ya implementadas)
// ────────────────────────────────────────────────────────────

function mostrarError(idError, mensaje) {
    document.getElementById(idError).textContent = mensaje;
}

function limpiarErrores() {
    // Limpiamos cada mensaje de error antes de cada intento
    document.getElementById("error-nombre").textContent = "";
    document.getElementById("error-fecha").textContent = "";
    document.getElementById("error-pais").textContent = "";
    document.getElementById("error-ciudad").textContent = "";
    document.getElementById("error-email").textContent = "";
    document.getElementById("error-telefono").textContent = "";
    document.getElementById("error-direccion").textContent = "";
    document.getElementById("error-password").textContent = "";
    document.getElementById("error-confirmPassword").textContent = "";
}

function generarTarjeta(datos) {
    // Recibe el objeto con los datos y construye el HTML del resumen
    return `
        <p><strong>Nombre:</strong> ${datos.nombre}</p>
        <p><strong>Fecha de nacimiento:</strong> ${datos.fecha}</p>
        <p><strong>País:</strong> ${datos.pais}</p>
        <p><strong>Ciudad:</strong> ${datos.ciudad}</p>
        <p><strong>Correo:</strong> ${datos.email}</p>
        <p><strong>Teléfono:</strong> ${datos.telefono}</p>
        <p><strong>Dirección:</strong> ${datos.direccion}</p>
    `;
}


// ────────────────────────────────────────────────────────────
//  SECCIÓN 3 — MANEJADOR DEL SUBMIT
// ────────────────────────────────────────────────────────────

document.getElementById("formRegistro").addEventListener("submit", function (evento) {

    // Lo primero siempre: detener la recarga y limpiar errores anteriores
    evento.preventDefault();
    limpiarErrores();

    // Leemos los 9 campos del formulario
    let nombre = document.getElementById("inputNombre").value;
    let fecha = document.getElementById("inputFecha").value;
    let pais = document.getElementById("inputPais").value;
    let ciudad = document.getElementById("inputCiudad").value;
    let email = document.getElementById("inputEmail").value;
    let telefono = document.getElementById("inputTelefono").value;
    let direccion = document.getElementById("inputDireccion").value;
    let password = document.getElementById("inputPassword").value;
    let confirmPassword = document.getElementById("inputConfirmPassword").value;

    // Validamos campo por campo en orden.
    // Cada if llama a su función de validación.
    // Si falla: muestra el error y sale con return — no sigue adelante.
    if (!validarNombre(nombre)) {
        mostrarError("error-nombre", "El nombre es obligatorio y debe tener al menos 3 caracteres.");
        return;
    }

    if (!validarFecha(fecha)) {
        mostrarError("error-fecha", "Debes ser mayor de 18 años para registrarte.");
        return;
    }

    if (!validarPais(pais)) {
        mostrarError("error-pais", "Por favor selecciona tu país.");
        return;
    }

    if (!validarCiudad(ciudad)) {
        mostrarError("error-ciudad", "La ciudad es obligatoria.");
        return;
    }

    if (!validarEmail(email)) {
        mostrarError("error-email", "Ingresa un correo válido (debe contener '@' y '.').");
        return;
    }

    if (!validarTelefono(telefono)) {
        mostrarError("error-telefono", "El teléfono debe tener exactamente 10 dígitos.");
        return;
    }

    if (!validarDireccion(direccion)) {
        mostrarError("error-direccion", "La dirección de residencia es obligatoria.");
        return;
    }

    if (!validarPassword(password)) {
        mostrarError("error-password", "La contraseña debe tener al menos 8 caracteres.");
        return;
    }

    if (!validarConfirmPassword(password, confirmPassword)) {
        mostrarError("error-confirmPassword", "Las contraseñas no coinciden.");
        return;
    }

    // Si llegamos aquí todos los datos son válidos ✅
    // Construimos el objeto con los datos visibles (sin contraseña)
    let datosRegistro = {
        nombre: nombre,
        fecha: fecha,
        pais: pais,
        ciudad: ciudad,
        email: email,
        telefono: telefono,
        direccion: direccion
    };

    // Insertamos la tarjeta de resumen y mostramos el resultado
    document.getElementById("summaryGrid").innerHTML = generarTarjeta(datosRegistro);
    document.querySelector(".form-section").style.display = "none";
    document.getElementById("resultadoRegistro").style.display = "block";

});


// ════════════════════════════════════════════════════════════
//  🔥 EXTRA BONUS: VALIDACIÓN DE EMAIL MEJORADA
// ════════════════════════════════════════════════════════════

function validarEmail(email) {
    // indexOf devuelve la posición del carácter en el string
    // Si no lo encuentra, devuelve -1
    let posArroba = email.indexOf("@");
    let puntoDespuesDeArroba = email.indexOf(".", posArroba);

    // Debe haber algo antes del @
    if (posArroba <= 0) return false;

    // Debe haber algo entre el @ y el .
    if (puntoDespuesDeArroba <= posArroba + 1) return false;

    // Debe haber algo después del .
    if (puntoDespuesDeArroba === email.length - 1) return false;

    return true;
}

// ────────────────────────────────────────────────────────────
//  TOGGLE CONTRASEÑA (ya implementado ✅ — no lo modifiques) 
// te lo dejamos aqui como una curiosidad 😉
// ────────────────────────────────────────────────────────────
document.querySelectorAll(".toggle-password").forEach(function (btn) {
    btn.addEventListener("click", function () {
        const input = document.getElementById(btn.getAttribute("data-target"));
        input.type = input.type === "password" ? "text" : "password";
    });
});