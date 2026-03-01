// ==========================================
// 🎯 PASO 1: SELECCIONAR ELEMENTOS DEL DOM
// ==========================================
// Necesitamos "capturar" los elementos del HTML para poder trabajar con ellos

const inputEdad = document.getElementById('inputEdad');      // El campo donde escribimos la edad
const btnVerificar = document.getElementById('btnVerificar'); // El botón que vamos a clickear
const mensaje = document.getElementById('mensaje');           // Donde aparecerá el mensaje

// Seleccionamos también los checkboxes de requisitos
const checkValentia = document.getElementById('checkValentia');         // Checkbox de valentía
const checkAcompañado = document.getElementById('checkAcompañado');     // Checkbox de acompañante
const checkMiedo = document.getElementById('checkMiedo');               // Checkbox de miedo extremo


// ==========================================
// 🎯 PASO 2: AGREGAR EVENTO AL BOTÓN
// ==========================================
// Le decimos al botón: "Cuando te hagan click, ejecuta este código"

btnVerificar.addEventListener('click', function () {

    // Obtenemos el valor que escribió el usuario en el input
    const edad = inputEdad.value;

    // Obtenemos el estado de los checkboxes (true si está marcado, false si no)
    const esValiente = checkValentia.checked;
    const vieneAcompañado = checkAcompañado.checked;
    const tieneMiedoExtremo = checkMiedo.checked;


    // ==========================================
    // 🎯 EXPLICACIÓN DE OPERADORES LÓGICOS
    // ==========================================

    // OPERADOR && (AND - Y)
    // ---------------------
    // Ambas condiciones deben ser verdaderas para que el resultado sea true
    // Ejemplo: true && true = true ✅
    //          true && false = false ❌

    // OPERADOR || (OR - O)
    // --------------------
    // Al menos UNA de las condiciones debe ser verdadera para que el resultado sea true
    // Ejemplo: true || false = true ✅
    //          false || false = false ❌

    // OPERADOR ! (NOT - NO/NEGACIÓN)
    // -------------------------------
    // Invierte el valor booleano: true se convierte en false, y viceversa
    // Ejemplo: !true = false
    //          !false = true


    // ==========================================
    // 🎯 VERIFICACIÓN CON TODOS LOS OPERADORES
    // ==========================================
    // Ahora usamos los 3 operadores directamente en la condición del if:
    // - edad >= 16 → verifica que tenga la edad mínima
    // - (esValiente || vieneAcompañado) → usa || para verificar que cumpla AL MENOS UNA
    // - !tieneMiedoExtremo → usa ! para negar el miedo (NO debe tener miedo)
    // - && combina todas las condiciones (TODAS deben ser verdaderas)

    if (edad >= 16 && (esValiente || vieneAcompañado) && !tieneMiedoExtremo) {

        // ✅ SÍ PUEDE VER LA PELÍCULA
        mensaje.textContent = '✅ ¡Perfecto! Cumples todos los requisitos. A disfrutar la película de zombies 🧟';

        // Agregamos la clase "permitido" al input para cambiar su estilo
        inputEdad.classList.add('permitido');

        // Removemos la clase "denegado" por si estaba antes
        inputEdad.classList.remove('denegado');

    } else {

        // ❌ NO PUEDE VER LA PELÍCULA
        mensaje.textContent = '❌ Lo sentimos, no cumples todos los requisitos para ver esta película de terror';

        // Agregamos la clase "denegado" al input para cambiar su estilo
        inputEdad.classList.add('denegado');

        // Removemos la clase "permitido" por si estaba antes
        inputEdad.classList.remove('permitido');
    }

});


// ==========================================
// 📚 EXPLICACIÓN: ¿POR QUÉ USAR classList EN VEZ DE .style?
// ==========================================

/*
 * OPCIÓN 1: Usando .style (❌ NO recomendado para proyectos reales)
 * ---------------------------------------------------------------------
 * inputEdad.style.border = '3px solid green';
 * inputEdad.style.backgroundColor = '#d4edda';
 * inputEdad.style.color = 'green';
 * 
 * PROBLEMAS:
 * - Tienes que escribir CADA propiedad CSS una por una en JavaScript
 * - Tu código JavaScript se llena de estilos (no es su trabajo)
 * - Si quieres cambiar los colores, tienes que modificar el JavaScript
 * - Es difícil de mantener y leer
 * - Si tienes 10 estilos, son 10 líneas de código
 * 
 * 
 * OPCIÓN 2: Usando classList (✅ RECOMENDADO)
 * ---------------------------------------------------------------------
 * inputEdad.classList.add('permitido');
 * 
 * VENTAJAS:
 * - Solo 1 línea de código en vez de muchas
 * - Todos los estilos están en el archivo CSS (donde deben estar)
 * - Es más fácil de leer y entender
 * - Puedes reutilizar la clase en otros elementos
 * - Si quieres cambiar colores, solo editas el CSS, no tocas JavaScript
 * - Puedes agregar/remover/alternar clases fácilmente
 * - Es la forma PROFESIONAL de trabajar
 * 
 * CONCLUSIÓN:
 * classList mantiene tu código ORGANIZADO:
 * - JavaScript maneja la LÓGICA (qué hacer)
 * - CSS maneja los ESTILOS (cómo se ve)
 * 
 * Es como tener tu ropa organizada en el closet en vez de tirada en el piso 🧹
 */
