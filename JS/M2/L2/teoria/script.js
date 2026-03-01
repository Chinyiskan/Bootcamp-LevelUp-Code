// ============================================================
//  🍝 VERSIÓN ESPAGUETI — Código repetitivo (¡NO hagas esto!)
// ============================================================
// Fíjate cómo el cálculo del IVA y el formateo del dinero
// se repiten TRES veces... si mañana el IVA cambia a 21%
// tienes que cambiarlo en TRES lugares. ¿Y si tienes 50 productos?

// Producto 1: Hamburguesa
let precio1 = 8000;
let iva1 = precio1 * 0.19;
let total1 = precio1 + iva1;
let totalFormateado1 = "$" + total1.toLocaleString("es-CO");
document.querySelector("#espagueti1").textContent = "Total: " + totalFormateado1;

// Producto 2: Papas  (copia y pega del de arriba 🤦)
let precio2 = 3500;
let iva2 = precio2 * 0.19;
let total2 = precio2 + iva2;
let totalFormateado2 = "$" + total2.toLocaleString("es-CO");
document.querySelector("#espagueti2").textContent = "Total: " + totalFormateado2;

// Producto 3: Bebida  (otra vez lo mismo 🤦🤦)
let precio3 = 2000;
let iva3 = precio3 * 0.19;
let total3 = precio3 + iva3;
let totalFormateado3 = "$" + total3.toLocaleString("es-CO");
document.querySelector("#espagueti3").textContent = "Total: " + totalFormateado3;

// 👆 3 productos y ya fueron 15 líneas de código repetido.
//    Si mañana el IVA cambia a 21%, hay que buscar TODOS los 0.19
//    y rezar que no se te escape ninguno. Eso es código espagueti.


// ============================================================
//  🧩 VERSIÓN CON FUNCIONES — Mismo resultado, código limpio
// ============================================================
// Cada cálculo vive en UN solo lugar.
// Si el IVA cambia, lo cambias UNA vez y listo.

function calcularIVA(precio) {
    return precio * 0.19;
}

function calcularTotal(precio) {
    return precio + calcularIVA(precio);
}

function formatearDinero(numero) {
    return "$" + numero.toLocaleString("es-CO");
}

// Ahora usamos las funciones para los 3 productos:
document.querySelector("#funcion1").textContent = "Total: " + formatearDinero(calcularTotal(8000));
document.querySelector("#funcion2").textContent = "Total: " + formatearDinero(calcularTotal(3500));
document.querySelector("#funcion3").textContent = "Total: " + formatearDinero(calcularTotal(2000));

// 👆 3 productos en 3 líneas. Si agregas 100 productos más,
//    solo necesitas 1 línea por producto.
//    Si el IVA cambia, lo cambias SOLO en calcularIVA(). Listo. ✅
