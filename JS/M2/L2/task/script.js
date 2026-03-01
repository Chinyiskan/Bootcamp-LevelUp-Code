// Variables globales
let carrito = [];
let subtotal = 0;

// Selección de elementos del DOM
let carritoVacio = document.querySelector("#carritoVacio");
let listaItems = document.querySelector("#listaItems");
let subtotalArea = document.querySelector("#subtotalArea");
let subtotalMostrado = document.querySelector("#subtotalMostrado");

let inputCupon = document.querySelector("#inputCupon");
let btnPagar = document.querySelector("#btnPagar");

let resumenPago = document.querySelector("#resumenPago");
let resumenSubtotal = document.querySelector("#resumenSubtotal");
let resumenDescuento = document.querySelector("#resumenDescuento");
let resumenIVA = document.querySelector("#resumenIVA");
let resumenTotal = document.querySelector("#resumenTotal");


// Función pura: calcula el 19% de IVA
function calcularIVA(subtotal) {
   let iva = subtotal * 0.19;
   return iva;
}

// Función pura: formatea un número como dinero colombiano
function formatearDinero(numero) {
   let formateado = "$" + numero.toLocaleString('es-CO');
   return formateado;
}

// Función pura: aplica descuento según código de cupón
function aplicarDescuento(total, codigo) {
   if (codigo === "BIT10") {
      return total * 0.90;
   } else if (codigo === "HAPPYHOUR") {
      return total * 0.80;
   } else {
      return total;
   }
}


// Función: agregar combo al carrito
function agregarCombo(nombre, precio) {
   console.log("🛒 Agregando al carrito:", nombre, precio);

   carrito.push({ nombre: nombre, precio: precio });

   subtotal += precio;

   carritoVacio.style.display = "none";
   subtotalArea.style.display = "block";

   subtotalMostrado.textContent = formatearDinero(subtotal);

   renderizarCarrito();
}


// Función: renderizar los items del carrito en pantalla
function renderizarCarrito() {
   listaItems.innerHTML = "";

   carrito.forEach(function (item) {
      let divItem = document.createElement("div");
      divItem.className = "cart-item";

      divItem.innerHTML = `
            <span class="cart-item-name">${item.nombre}</span>
            <span class="cart-item-price">${formatearDinero(item.precio)}</span>
        `;

      listaItems.appendChild(divItem);
   });
}


// Evento: procesar pago
btnPagar.addEventListener("click", function () {
   console.log("💳 Procesando pago...");

   if (carrito.length === 0) {
      alert("⚠️ El carrito está vacío. Agrega combos antes de pagar.");
      return;
   }

   let codigoCupon = inputCupon.value.trim().toUpperCase();
   console.log("Código de cupón:", codigoCupon);

   // Paso 1: Subtotal
   let subtotalPago = subtotal;
   resumenSubtotal.textContent = formatearDinero(subtotalPago);

   // Paso 2: Aplicar descuento
   let totalConDescuento = aplicarDescuento(subtotalPago, codigoCupon);
   let descuentoAplicado = subtotalPago - totalConDescuento;
   resumenDescuento.textContent = "-" + formatearDinero(descuentoAplicado);

   // Paso 3: Calcular IVA sobre el total con descuento
   let iva = calcularIVA(totalConDescuento);
   resumenIVA.textContent = formatearDinero(iva);

   // Paso 4: Total final
   let totalFinal = totalConDescuento + iva;
   resumenTotal.textContent = formatearDinero(totalFinal);

   // Paso 5: Mostrar resumen
   resumenPago.style.display = "block";

   console.log("✅ Pago procesado exitosamente");
   console.log("Subtotal:", formatearDinero(subtotalPago));
   console.log("Descuento:", formatearDinero(descuentoAplicado));
   console.log("IVA:", formatearDinero(iva));
   console.log("Total:", formatearDinero(totalFinal));
});
