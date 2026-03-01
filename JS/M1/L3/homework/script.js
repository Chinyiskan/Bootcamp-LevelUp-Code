// ====================================================
// ✍️ RESIZER DE TEXTO DINÁMICO
// ====================================================
// Este script controla el tamaño y color del texto
// usando NÚMEROS y OPERADORES MATEMÁTICOS
// ====================================================

// ============================================
// PASO 1: SELECCIONAR ELEMENTOS DEL DOM
// ============================================

const texto = document.querySelector('#texto');
const btnAumentar = document.querySelector('#btn-aumentar');
const btnDisminuir = document.querySelector('#btn-disminuir');
const selectorColor = document.querySelector('#colorPicker');
const indicadorTamaño = document.querySelector('#tamañoActual');


// ============================================
// PASO 2: CREAR VARIABLE DE ESTADO (TAMAÑO)
// ============================================
// Esta variable es un NÚMERO que representa el tamaño del texto en píxeles

let tamañoTexto = 18;  // Empezamos con 18px


// ============================================
// PASO 3: CONFIGURACIÓN INICIAL
// ============================================
// Aplicamos el tamaño inicial al texto cuando carga la página

texto.style.fontSize = tamañoTexto + 'px';


// ============================================
// PASO 4: BOTÓN AUMENTAR - SUMAR TAMAÑO
// ============================================
// Cuando hacemos click en "Aumentar", el tamaño SUBE

btnAumentar.addEventListener('click', () => {

    // SUMAMOS 2 píxeles al tamaño (operador +)
    tamañoTexto = tamañoTexto + 2;

    // VALIDACIÓN: El tamaño no puede ser mayor que 48px
    if (tamañoTexto > 48) {
        tamañoTexto = 48;  // Si subió de 48, lo dejamos en 48
    }

    // Actualizamos el texto visual
    actualizarTexto();
});


// ============================================
// PASO 5: BOTÓN DISMINUIR - RESTAR TAMAÑO
// ============================================
// Cuando hacemos click en "Disminuir", el tamaño BAJA

btnDisminuir.addEventListener('click', () => {

    // RESTAMOS 2 píxeles al tamaño (operador -)
    tamañoTexto = tamañoTexto - 2;

    // VALIDACIÓN: El tamaño no puede ser menor que 10px
    if (tamañoTexto < 10) {
        tamañoTexto = 10;  // Si bajó de 10, lo dejamos en 10
    }

    // Actualizamos el texto visual
    actualizarTexto();
});


// ============================================
// PASO 6: CAMBIAR COLOR EN TIEMPO REAL
// ============================================
// Escuchamos el evento 'input' para cambiar el color AL INSTANTE

selectorColor.addEventListener('input', () => {

    // Leemos el color que el usuario seleccionó
    const colorElegido = selectorColor.value;

    // Aplicamos el color al texto INMEDIATAMENTE
    texto.style.color = colorElegido;

    // No necesitamos botón, el cambio es en tiempo real
});


// ============================================
// PASO 7: FUNCIÓN PARA ACTUALIZAR EL TEXTO
// ============================================
// Esta función aplica el tamaño actual al texto

function actualizarTexto() {

    // 1. APLICAR EL TAMAÑO AL TEXTO
    // Concatenamos el número con 'px'
    // Si tamañoTexto = 20 → style.fontSize = "20px"

    texto.style.fontSize = tamañoTexto + 'px';


    // 2. ACTUALIZAR EL INDICADOR VISUAL
    // Mostramos el tamaño actual

    indicadorTamaño.innerText = tamañoTexto + 'px';
}


// ====================================================
// 🎯 CONCEPTOS QUE USAMOS:
// ====================================================
//
// 1. VARIABLES CON NÚMEROS
//    - let tamañoTexto = 18;
//    - Guardamos un NÚMERO que representa píxeles
//
// 2. OPERADORES MATEMÁTICOS
//    - Suma: tamañoTexto = tamañoTexto + 2
//    - Resta: tamañoTexto = tamañoTexto - 2
//
// 3. CONCATENACIÓN (UNIR NÚMERO + STRING)
//    - tamañoTexto + 'px'
//    - Si tamañoTexto = 20 → resultado = "20px"
//    - El número se convierte en texto y se une con 'px'
//
// 4. .STYLE.FONTSIZE
//    - Cambia el tamaño de fuente de un elemento
//    - texto.style.fontSize = "20px"
//    - El NÚMERO controla una propiedad VISUAL
//
// 5. .STYLE.COLOR
//    - Cambia el color del texto
//    - texto.style.color = "#ff0000"
//
// 6. EVENTO 'INPUT'
//    - Se dispara cada vez que cambia el valor de un input
//    - Perfecto para cambios en tiempo real
//    - No necesita botón ni click
//
// 7. .VALUE (repaso)
//    - selectorColor.value obtiene el color seleccionado
//    - Ejemplo: "#2c3e50"
//
// 8. VALIDACIÓN CON IF
//    - Evitamos que el tamaño sea muy grande o muy pequeño
//    - if (tamañoTexto > 48) { tamañoTexto = 48; }
//
// ====================================================
// 💡 FLUJO DEL PROGRAMA:
// ====================================================
//
// FLUJO INICIAL:
// 1. Página carga
//    ↓
// 2. tamañoTexto = 18
//    ↓
// 3. texto.style.fontSize = "18px"
//    ↓
// 4. El texto se muestra a 18 píxeles
//
// FLUJO AL AUMENTAR:
// 1. Usuario hace CLICK en "Aumentar"
//    ↓
// 2. tamañoTexto = tamañoTexto + 2 (ahora = 20)
//    ↓
// 3. Validamos que no sea mayor que 48
//    ↓
// 4. actualizarTexto()
//    ↓
// 5. texto.style.fontSize = "20px"
//    ↓
// 6. indicadorTamaño.innerText = "20px"
//    ↓
// 7. El usuario VE el texto más grande
//
// FLUJO AL CAMBIAR COLOR:
// 1. Usuario MUEVE el selector de color
//    ↓
// 2. Evento 'input' se dispara AUTOMÁTICAMENTE
//    ↓
// 3. Leemos el color con .value
//    ↓
// 4. texto.style.color = color elegido
//    ↓
// 5. El cambio es INSTANTÁNEO (tiempo real)
//
// ====================================================
// 🧙♂️ CONCEPTO CLAVE:
// ====================================================
//
// "El tamaño del texto no es un efecto visual.
// Es un ESTADO que cambia con decisiones."
//
// El número tamañoTexto es la "verdad".
// El fontSize es solo la "representación visual" de esa verdad.
//
// No cambiamos el diseño directamente.
// Cambiamos el NÚMERO, y el diseño lo refleja.
//
// Así funcionan:
// - Zoom en aplicaciones
// - Ajustes de accesibilidad
// - Editores de texto
// - Configuraciones de fuente
//
// TODO se reduce a:
// número → cambia → diseño responde
//
// ====================================================
// 🎓 LO MÁS IMPORTANTE:
// ====================================================
//
// Este ejercicio te enseña que:
//
// ✅ Los números controlan propiedades visuales
// ✅ Los operadores + y - modifican el estado
// ✅ La concatenación une números con unidades (px)
// ✅ Los límites evitan estados imposibles
// ✅ El evento 'input' permite cambios en tiempo real
// ✅ No todo necesita un botón para cambiar
//
// Esto es exactamente igual que:
// - La barra de HP (número → ancho)
// - El generador de memes (input → texto)
//
// La lógica es la misma:
// ESTADO (número) → ACCIÓN (operador) → VISUAL (DOM)
//
// ¡Ahora dominas el patrón fundamental de JavaScript! 🎯
//
// ====================================================
