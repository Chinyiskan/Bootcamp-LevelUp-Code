// ====================================================
// 🚦 SEMÁFORO INTERACTIVO - SCRIPT PRINCIPAL
// ====================================================

// ============================================
// PASO 1: SELECCIÓN DE ELEMENTOS DEL DOM
// ============================================
// Usamos querySelector para "conectar" nuestro JavaScript 
// con los elementos de HTML que necesitamos controlar

// Seleccionamos las 3 luces del semáforo usando sus IDs
const luzRoja = document.querySelector('#redLight');
const luzAmarilla = document.querySelector('#yellowLight');
const luzVerde = document.querySelector('#greenLight');

// Seleccionamos los 4 botones de control
const botonRojo = document.querySelector('#btnRed');
const botonAmarillo = document.querySelector('#btnYellow');
const botonVerde = document.querySelector('#btnGreen');
const botonApagar = document.querySelector('#btnOff');

// Seleccionamos el elemento que muestra el texto del estado
const textoEstado = document.querySelector('#statusText');


// ============================================
// PASO 2: ESTADO INICIAL
// ============================================
// El estado es la "memoria" de nuestra aplicación
// Usamos variables `let` porque sus valores van a cambiar

// Estas variables guardan si cada luz está encendida o apagada
let rojoEncendido = false;
let amarilloEncendido = false;
let verdeEncendido = false;


// ============================================
// PASO 3: EVENT LISTENERS (Oyentes de Eventos)
// ============================================
// Los event listeners "escuchan" cuando el usuario hace click

// ===== BOTÓN ROJO =====
// Cuando se hace click en el botón rojo:
botonRojo.addEventListener('click', () => {
  
  // Primero APAGAMOS todas las luces
  // Quitamos la clase 'on' (encendido) y agregamos 'off' (apagado)
  luzRoja.classList.remove('on');
  luzRoja.classList.add('off');
  
  luzAmarilla.classList.remove('on');
  luzAmarilla.classList.add('off');
  
  luzVerde.classList.remove('on');
  luzVerde.classList.add('off');
  
  // Ahora ENCENDEMOS solo la luz roja
  luzRoja.classList.remove('off');  // Quitamos estado apagado
  luzRoja.classList.add('on');      // Agregamos estado encendido
  
  // Actualizamos el texto del estado
  textoEstado.innerText = '🛑 Alto - Detente';
  
  // Actualizamos el estado (memoria) de las variables
  rojoEncendido = true;
  amarilloEncendido = false;
  verdeEncendido = false;
});


// ===== BOTÓN AMARILLO =====
// Cuando se hace click en el botón amarillo:
botonAmarillo.addEventListener('click', () => {
  
  // APAGAMOS todas las luces primero
  luzRoja.classList.remove('on');
  luzRoja.classList.add('off');
  
  luzAmarilla.classList.remove('on');
  luzAmarilla.classList.add('off');
  
  luzVerde.classList.remove('on');
  luzVerde.classList.add('off');
  
  // ENCENDEMOS solo la luz amarilla
  luzAmarilla.classList.remove('off');
  luzAmarilla.classList.add('on');
  
  // Actualizamos el texto
  textoEstado.innerText = '⚠️ Precaución - Prepárate';
  
  // Actualizamos el estado
  rojoEncendido = false;
  amarilloEncendido = true;
  verdeEncendido = false;
});


// ===== BOTÓN VERDE =====
// Cuando se hace click en el botón verde:
botonVerde.addEventListener('click', () => {
  
  // APAGAMOS todas las luces
  luzRoja.classList.remove('on');
  luzRoja.classList.add('off');
  
  luzAmarilla.classList.remove('on');
  luzAmarilla.classList.add('off');
  
  luzVerde.classList.remove('on');
  luzVerde.classList.add('off');
  
  // ENCENDEMOS solo la luz verde
  luzVerde.classList.remove('off');
  luzVerde.classList.add('on');
  
  // Actualizamos el texto
  textoEstado.innerText = '✅ Avanza - Puedes pasar';
  
  // Actualizamos el estado
  rojoEncendido = false;
  amarilloEncendido = false;
  verdeEncendido = true;
});


// ===== BOTÓN APAGAR TODO =====
// Cuando se hace click en el botón "Apagar Todo":
botonApagar.addEventListener('click', () => {
  
  // APAGAMOS todas las luces
  luzRoja.classList.remove('on');
  luzRoja.classList.add('off');
  
  luzAmarilla.classList.remove('on');
  luzAmarilla.classList.add('off');
  
  luzVerde.classList.remove('on');
  luzVerde.classList.add('off');
  
  // Actualizamos el texto a "Apagado"
  textoEstado.innerText = '⚫ Apagado';
  
  // Actualizamos el estado - todas las luces apagadas
  rojoEncendido = false;
  amarilloEncendido = false;
  verdeEncendido = false;
});


// ====================================================
// 🎯 CONCEPTOS CLAVE QUE USAMOS:
// ====================================================
// 
// 1. QUERYSELECTOR
//    - Busca y selecciona elementos del HTML por su ID, clase o etiqueta
//    - Ejemplo: document.querySelector('#btnRed')
//    - El '#' significa que buscamos por ID
//
// 2. ADDEVENTLISTENER
//    - "Escucha" eventos como clicks, teclas, etc.
//    - Sintaxis: elemento.addEventListener('click', () => { código })
//    - La flecha () => { } es una función que se ejecuta al hacer click
//
// 3. CLASSLIST
//    - Permite manipular las clases CSS de un elemento
//    - .add('clase'): Agrega una clase
//    - .remove('clase'): Quita una clase
//    - Las clases 'on' y 'off' cambian los estilos visuales
//
// 4. INNERTEXT
//    - Cambia el texto que está dentro de un elemento
//    - Ejemplo: textoEstado.innerText = 'Nuevo texto'
//
// 5. VARIABLES LET
//    - Guardan el estado (memoria) de la aplicación
//    - Usamos `let` porque el valor puede cambiar
//    - Ejemplo: let rojoEncendido = false
//
// 6. IF / ELSE
//    - (No lo usamos aquí, pero podrías si quieres)
//    - Sirve para tomar decisiones basadas en condiciones
//    - Ejemplo: if (rojoEncendido === true) { ... }
//
// ====================================================
// 💡 LÓGICA DEL PROGRAMA:
// ====================================================
//
// El flujo es simple:
// 
// 1. Usuario hace CLICK en un botón
//    ↓
// 2. Se ejecuta el EVENT LISTENER de ese botón
//    ↓
// 3. APAGAMOS todas las luces (ponemos clase 'off')
//    ↓
// 4. ENCENDEMOS solo la luz que queremos (ponemos clase 'on')
//    ↓
// 5. ACTUALIZAMOS el texto del estado
//    ↓
// 6. ACTUALIZAMOS las variables de estado
//    ↓
// 7. El usuario VE el cambio visual en la pantalla
//
// La clave: SIEMPRE apagamos todas las luces primero
// antes de encender una nueva. Así garantizamos que
// solo UNA luz esté encendida a la vez.
//
// ====================================================
// 🚀 DESAFÍO EXTRA (OPCIONAL):
// ====================================================
//
// Si quieres practicar más, intenta:
//
// 1. Usar IF/ELSE para verificar si una luz ya está encendida
//    antes de apagarla (para hacer el código más eficiente)
//
// 2. Agregar un contador que cuente cuántas veces
//    se presionó cada botón
//
// 3. Cambiar el color del fondo de la página según
//    qué luz esté encendida
//
// ====================================================
