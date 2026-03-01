// ====================================================
// 😂 MEME GENERATOR - GENERADOR DE MEMES
// ====================================================
// Este script actualiza el texto del meme EN TIEMPO REAL
// mientras el usuario escribe (sin necesidad de botones)
// ====================================================

// ============================================
// PASO 1: SELECCIONAR ELEMENTOS DEL DOM
// ============================================
// Conectamos con los elementos que vamos a manipular

// Seleccionamos los inputs donde el usuario escribe
const inputSuperior = document.querySelector('#inputTop');
const inputInferior = document.querySelector('#inputBottom');

// Seleccionamos los elementos donde aparecerá el texto sobre la imagen
const textoSuperior = document.querySelector('#topText');
const textoInferior = document.querySelector('#bottomText');


// ============================================
// PASO 2: EVENT LISTENER - TEXTO SUPERIOR
// ============================================
// Escuchamos el evento 'input' en el campo de texto superior
// El evento 'input' se dispara cada vez que el usuario escribe o borra

inputSuperior.addEventListener('input', () => {
  
  // Leemos lo que el usuario está escribiendo en este momento
  const textoEscrito = inputSuperior.value;
  
  // Actualizamos el texto que aparece sobre la imagen
  // Usamos innerText para cambiar el contenido
  textoSuperior.innerText = textoEscrito;
  
  // ¡Eso es todo! No necesitamos botones
  // El cambio es INMEDIATO mientras escribes
});


// ============================================
// PASO 3: EVENT LISTENER - TEXTO INFERIOR
// ============================================
// Lo mismo pero para el texto de abajo

inputInferior.addEventListener('input', () => {
  
  // Leemos el valor actual del input inferior
  const textoEscrito = inputInferior.value;
  
  // Actualizamos el texto inferior sobre la imagen
  textoInferior.innerText = textoEscrito;
  
  // De nuevo: sin botones, sin esperas
  // Todo pasa en tiempo real ⚡
});


// ====================================================
// 🎯 CONCEPTOS CLAVE QUE USAMOS:
// ====================================================
//
// 1. EVENTO 'INPUT'
//    - Se dispara cada vez que el contenido de un input cambia
//    - Es diferente a 'click' (que se dispara solo al hacer click)
//    - Es perfecto para actualizar cosas "mientras escribes"
//    - Sintaxis: elemento.addEventListener('input', () => { ... })
//
// 2. .VALUE (repaso)
//    - Obtiene el texto actual que el usuario escribió en un input
//    - Se actualiza automáticamente cada vez que escribes
//    - Ejemplo: const texto = inputSuperior.value;
//
// 3. .INNERTEXT (repaso)
//    - Cambia el contenido de texto de un elemento HTML
//    - Solo acepta texto plano (no HTML)
//    - Ejemplo: elemento.innerText = 'Nuevo texto';
//
// 4. QUERYSELECTOR (repaso)
//    - Busca y selecciona elementos del DOM
//    - Usamos # para IDs
//    - Ejemplo: document.querySelector('#miId')
//
// 5. ADDEVENTLISTENER (repaso)
//    - "Escucha" eventos del usuario
//    - Puede escuchar muchos eventos: 'click', 'input', 'keypress', etc.
//    - La función flecha () => {} se ejecuta cuando ocurre el evento
//
// ====================================================
// 💡 ¿POR QUÉ NO USAMOS CLICK AQUÍ?
// ====================================================
//
// 'click' → Se ejecuta UNA VEZ cuando haces click en algo
// 'input' → Se ejecuta CADA VEZ que cambias el contenido
//
// Para un meme generator queremos ver los cambios
// MIENTRAS escribimos, no después de presionar un botón.
//
// Por eso 'input' es PERFECTO para este caso.
//
// ====================================================
// 💡 FLUJO DEL PROGRAMA:
// ====================================================
//
// 1. Página carga
//    ↓
// 2. JavaScript selecciona los elementos (querySelector)
//    ↓
// 3. JavaScript "escucha" los inputs (addEventListener con 'input')
//    ↓
// 4. Usuario empieza a escribir en un input
//    ↓
// 5. Evento 'input' se dispara AUTOMÁTICAMENTE
//    ↓
// 6. Leemos el valor actual con .value
//    ↓
// 7. Actualizamos el texto sobre la imagen con .innerText
//    ↓
// 8. El usuario VE el cambio INMEDIATAMENTE (tiempo real)
//    ↓
// 9. Si el usuario sigue escribiendo o borra...
//    ↓
// 10. El evento se vuelve a disparar (pasos 5-8 se repiten)
//
// Todo esto pasa EN TIEMPO REAL, sin recargar la página,
// sin botones, sin esperas. ¡Eso es JavaScript moderno! ⚡
//
// ====================================================
// 🧙♂️ OJO DEL MAESTRO HEXA:
// ====================================================
//
// "La diferencia entre un botón y tiempo real
// es la diferencia entre una carta y WhatsApp.
//
// Ambos funcionan.
// Pero uno se siente del futuro." 🚀
//
// ====================================================
// 🚀 DESAFÍO EXTRA (OPCIONAL):
// ====================================================
//
// Si quieres practicar más, intenta:
//
// 1. Agregar un tercer input que cambie el tamaño del texto
//    (pista: puedes cambiar el estilo con .style.fontSize)
//
// 2. Agregar botones para cambiar entre diferentes imágenes
//    (pista: cambia el .src de la imagen)
//
// 3. Agregar un botón "Limpiar todo" que borre ambos textos
//    (pista: inputSuperior.value = '')
//
// 4. Contar cuántos caracteres quedan disponibles
//    (el maxlength es 50, muestra 50 - texto.length)
//
// 5. Cambiar el color del texto según un select
//    (pista: textoSuperior.style.color = 'red')
//
// 6. Agregar un botón "Descargar meme" (más avanzado)
//    (necesitarías canvas API - para otro nivel)
//
// ====================================================
// 🎓 LO MÁS IMPORTANTE QUE DEBES ENTENDER:
// ====================================================
//
// Este ejercicio te enseña algo FUNDAMENTAL:
//
// ✅ No todo necesita un botón
// ✅ JavaScript puede "escuchar" mientras el usuario actúa
// ✅ Una interfaz puede ser "viva" y reaccionar al instante
// ✅ El evento 'input' es tu mejor amigo para tiempo real
//
// Esto es lo que diferencia una página estática
// de una aplicación web moderna.
//
// Apps como Google Docs, Gmail, Twitter...
// todas usan esta técnica de actualizar mientras escribes.
//
// ¡Ahora tú también sabes hacerlo! 🎉
//
// ====================================================
