// ══════════════════════════════════════════════════════════════
//  STARTUPPAY — Payroll Engine
//  M2L3 · JavaScript Bootcamp 2026 · ✅ SOLUCIÓN
// ══════════════════════════════════════════════════════════════


// ────────────────────────────────────────────────────────────
//  DATOS DE EMPLEADOS
// ────────────────────────────────────────────────────────────

let empleado1Nombre = "Sara Méndez";
let empleado1Horas  = 45;
let empleado1Tarifa = 25000;

let empleado2Nombre = "Luis Torres";
let empleado2Horas  = 32;
let empleado2Tarifa = 30000;

let empleado3Nombre = "Valeria Cruz";
let empleado3Horas  = 18;
let empleado3Tarifa = 28000;

let empleado4Nombre = "Andrés Ríos";
let empleado4Horas  = 40;
let empleado4Tarifa = 22000;

let empleado5Nombre = "Camila Vega";
let empleado5Horas  = 55;
let empleado5Tarifa = 35000;

let totalEmpleados = 5;


// ────────────────────────────────────────────────────────────
//  FUNCIONES DE APOYO
// ────────────────────────────────────────────────────────────

function formatearDinero(numero) {
    return "$" + numero.toLocaleString("es-CO");
}

function crearTarjeta(nombre, horas, tarifa, pago) {
    return `
        <div class="col-md-4">
            <div class="sp-card">
                <div class="sp-card-header">
                    <div class="sp-avatar">${nombre.charAt(0)}</div>
                    <div>
                        <p class="sp-card-name">${nombre}</p>
                        <p class="sp-card-role">Freelancer</p>
                    </div>
                </div>
                <div class="sp-card-body">
                    <div class="sp-card-row">
                        <span>Horas trabajadas</span>
                        <strong>${horas} h</strong>
                    </div>
                    <div class="sp-card-row">
                        <span>Tarifa por hora</span>
                        <strong>${formatearDinero(tarifa)}</strong>
                    </div>
                    <div class="sp-card-total">
                        <span>Pago del mes</span>
                        <strong>${formatearDinero(pago)}</strong>
                    </div>
                </div>
            </div>
        </div>
    `;
}


// ────────────────────────────────────────────────────────────
//  FECHA EN NAVBAR
// ────────────────────────────────────────────────────────────

document.getElementById("fechaActual").textContent =
    new Date().toLocaleDateString("es-CO", {
        weekday: "short",
        day:     "2-digit",
        month:   "short",
        year:    "numeric",
    });


// ════════════════════════════════════════════════════════════
//  ✅ SOLUCIÓN: GENERAR NÓMINA
// ════════════════════════════════════════════════════════════

function generarNomina() {

    // 1 — Prepara la pantalla
    document.getElementById("estadoInicial").style.display = "none";
    document.getElementById("contenedorNomina").innerHTML  = "";

    // 2 — Acumuladores (ambos fuera del for)
    let acumulador    = 0;
    let horasTotales  = 0;

    for (let i = 1; i <= totalEmpleados; i++) {

        // 3 — Datos del empleado según i
        let nombre, horas, tarifa;

        if (i === 1) {
            nombre = empleado1Nombre;
            horas  = empleado1Horas;
            tarifa = empleado1Tarifa;
        } else if (i === 2) {
            nombre = empleado2Nombre;
            horas  = empleado2Horas;
            tarifa = empleado2Tarifa;
        } else if (i === 3) {
            nombre = empleado3Nombre;
            horas  = empleado3Horas;
            tarifa = empleado3Tarifa;
        } else if (i === 4) {
            nombre = empleado4Nombre;
            horas  = empleado4Horas;
            tarifa = empleado4Tarifa;
        } else if (i === 5) {
            nombre = empleado5Nombre;
            horas  = empleado5Horas;
            tarifa = empleado5Tarifa;
        }

        // 4 — Cálculo y acumulación
        let pagoTotal  = horas * tarifa;
        acumulador    += pagoTotal;
        horasTotales  += horas;

        // BONUS — Semáforo de horas
        let etiqueta;
        if (horas > 40) {
            etiqueta = "🟢 Full-time";
        } else if (horas >= 20) {
            etiqueta = "🟡 Part-time";
        } else {
            etiqueta = "🔴 Bajo horas";
        }
        console.log(nombre + " → " + etiqueta);

        // 5 — Tarjeta al contenedor
        document.getElementById("contenedorNomina").innerHTML +=
            crearTarjeta(nombre, horas, tarifa, pagoTotal);

    } // ← fin del for


    // 6 — Resumen al pie
    document.getElementById("resumenTotal").classList.remove("d-none");
    document.getElementById("totalNomina").textContent      = formatearDinero(acumulador);
    document.getElementById("resumenEmpleados").textContent = totalEmpleados;

    // 7 — Stat cards del hero
    document.getElementById("statHoras").textContent = horasTotales + " h";
    document.getElementById("statTotal").textContent = formatearDinero(acumulador);

} // ← fin de generarNomina()