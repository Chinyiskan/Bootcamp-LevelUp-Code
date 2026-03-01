// ====================================================
// 🗝️ EL GUARDIÁN DEL TESORO - LOGIN BÁSICO
// ====================================================
// Este script valida una contraseña usando condicionales
// y muestra diferentes respuestas según el resultado
// ====================================================

// ============================================
// PASO 1: SELECCIONAR ELEMENTOS DEL DOM
// ============================================

const inputPassword = document.querySelector('#password');
const botonVerificar = document.querySelector('#btn-check');
const areaMensaje = document.querySelector('#mensaje');
const cofre = document.querySelector('#cofre');
const textoIntentos = document.querySelector('#numero-intentos');
const contenedorIntentos = document.querySelector('#intentos');


// ============================================
// PASO 2: VARIABLES DE ESTADO
// ============================================
// Guardamos información importante que va a cambiar

let intentosRestantes = 3;  // Empezamos con 3 intentos
let accesoPermitido = false;  // Al inicio, NO tiene acceso


// ============================================
// PASO 3: EVENT LISTENER - VERIFICAR CONTRASEÑA
// ============================================

botonVerificar.addEventListener('click', () => {

    // ============================================
    // 1. LEER LO QUE ESCRIBIÓ EL USUARIO
    // ============================================

    const contraseñaEscrita = inputPassword.value;


    // ============================================
    // 2. VALIDAR SI ESTÁ VACÍO
    // ============================================

    // Si NO escribió nada (texto vacío)
    if (contraseñaEscrita === '') {

        // Mostramos mensaje de error
        areaMensaje.innerText = '⚠️ Por favor, escribe una contraseña';
        areaMensaje.classList.remove('text-success');
        areaMensaje.classList.add('text-danger');

        // Hacemos vibrar el input
        inputPassword.classList.add('vibrar');

        // Quitamos la vibración después de medio segundo
        // (usamos setTimeout solo para quitar la clase, no es el foco del ejercicio)
        setTimeout(() => {
            inputPassword.classList.remove('vibrar');
        }, 500);

        // Detenemos aquí, no seguimos verificando
        return;
    }


    // ============================================
    // 3. COMPARAR LA CONTRASEÑA
    // ============================================
    // La contraseña correcta es: "LevelUp123"

    // Si la contraseña es CORRECTA
    if (contraseñaEscrita === 'LevelUp123') {

        // ========================================
        // CASO: CONTRASEÑA CORRECTA ✅
        // ========================================

        // Mostramos mensaje de éxito (verde)
        areaMensaje.innerText = '✅ ¡Correcto! El tesoro es tuyo';
        areaMensaje.classList.remove('text-danger');
        areaMensaje.classList.add('text-success');

        // Cambiamos el input a estado correcto (verde)
        inputPassword.classList.remove('incorrecto');
        inputPassword.classList.add('correcto');

        // Abrimos el cofre (cambiamos el emoji)
        cofre.innerText = '💰';

        // Cambiamos el estado a permitido
        accesoPermitido = true;

        // Deshabilitamos el botón (ya ganó)
        botonVerificar.disabled = true;

        // Ocultamos el contador de intentos
        contenedorIntentos.style.display = 'none';
    }


    // Si la contraseña es INCORRECTA
    if (contraseñaEscrita !== 'LevelUp123') {

        // ========================================
        // CASO: CONTRASEÑA INCORRECTA ❌
        // ========================================

        // Restamos un intento
        intentosRestantes = intentosRestantes - 1;

        // Actualizamos el contador visual
        textoIntentos.innerText = intentosRestantes;

        // Mostramos mensaje de error (rojo)
        areaMensaje.innerText = '❌ Contraseña incorrecta. Intenta de nuevo';
        areaMensaje.classList.remove('text-success');
        areaMensaje.classList.add('text-danger');

        // Cambiamos el input a estado incorrecto (rojo)
        inputPassword.classList.remove('correcto');
        inputPassword.classList.add('incorrecto');

        // Hacemos vibrar el input
        inputPassword.classList.add('vibrar');

        setTimeout(() => {
            inputPassword.classList.remove('vibrar');
        }, 500);

        // Limpiamos el input para que vuelva a intentar
        inputPassword.value = '';


        // ========================================
        // VERIFICAR SI SE ACABARON LOS INTENTOS
        // ========================================

        // Si ya NO quedan intentos
        if (intentosRestantes === 0) {

            // Mostramos mensaje de bloqueo
            areaMensaje.innerText = '🔒 Se acabaron los intentos. Acceso bloqueado';

            // Deshabilitamos el botón
            botonVerificar.disabled = true;

            // Deshabilitamos el input
            inputPassword.disabled = true;

            // Ponemos el contador en crítico (rojo)
            contenedorIntentos.classList.add('critico');
        }

        // Si todavía quedan intentos
        if (intentosRestantes > 0) {

            // Si solo queda 1 intento, advertimos
            if (intentosRestantes === 1) {
                areaMensaje.innerText = '⚠️ ¡ÚLTIMO INTENTO! Piensa bien';
                contenedorIntentos.classList.add('critico');
            }
        }
    }

});


// ====================================================
// 🎯 CONCEPTOS NUEVOS QUE USAMOS:
// ====================================================
//
// 1. CONDICIONALES (IF)
//    - Toman DECISIONES basadas en condiciones
//    - if (condición) { código }
//    - Solo se ejecuta si la condición es VERDADERA
//
// 2. OPERADORES DE COMPARACIÓN
//    - === (igual a): compara si dos valores son iguales
//      Ejemplo: 'hola' === 'hola' → true
//      Ejemplo: 'hola' === 'adios' → false
//
//    - !== (diferente de): compara si son diferentes
//      Ejemplo: 'hola' !== 'adios' → true
//      Ejemplo: 'hola' !== 'hola' → false
//
// 3. TRUE y FALSE (Booleanos)
//    - Son valores especiales de JavaScript
//    - true = verdadero
//    - false = falso
//    - Ejemplo: let accesoPermitido = false;
//
// 4. CLASSLIST (repaso + nuevo uso)
//    - .add('clase'): Agrega una clase CSS
//    - .remove('clase'): Quita una clase CSS
//    - Podemos agregar/quitar varias clases según la condición
//
// 5. .DISABLED
//    - Desactiva un elemento (botón o input)
//    - boton.disabled = true → botón desactivado
//    - input.disabled = true → input desactivado
//
// 6. .STYLE.DISPLAY
//    - Controla si un elemento se muestra o no
//    - elemento.style.display = 'none' → lo oculta
//
// 7. RETURN
//    - Detiene la ejecución del código
//    - Útil cuando hay un error y no queremos seguir
//
// ====================================================
// 💡 FLUJO DEL PROGRAMA:
// ====================================================
//
// 1. Página carga
//    - intentosRestantes = 3
//    - accesoPermitido = false
//    ↓
// 2. Usuario escribe en el input
//    ↓
// 3. Usuario hace CLICK en "Verificar"
//    ↓
// 4. Leemos el valor: contraseñaEscrita = input.value
//    ↓
// 5. PRIMERA VALIDACIÓN: ¿Está vacío?
//    - if (contraseñaEscrita === '')
//    - SI → Mostrar error y PARAR (return)
//    - NO → Continuar
//    ↓
// 6. SEGUNDA VALIDACIÓN: ¿Es correcta?
//    - if (contraseñaEscrita === 'LevelUp123')
//    - SI → Éxito, abrir cofre, deshabilitar botón
//    - NO → Continuar
//    ↓
// 7. SI llegamos aquí, es INCORRECTA
//    - if (contraseñaEscrita !== 'LevelUp123')
//    - Restar intento
//    - Mostrar error
//    - Vibrar input
//    ↓
// 8. ¿Quedan intentos?
//    - if (intentosRestantes === 0)
//    - SI → Bloquear todo
//    - NO → Dar otra oportunidad
//
// ====================================================
// 🧠 LÓGICA DE DECISIONES:
// ====================================================
//
// Este ejercicio usa MÚLTIPLES IF para tomar decisiones:
//
// IF vacío → error
// IF correcta → éxito
// IF incorrecta → restar intento
//   IF intentos = 0 → bloquear
//   IF intentos = 1 → advertir
//
// Cada IF es una DECISIÓN independiente.
// No necesitamos else porque usamos return para detener.
//
// ====================================================
// 🔒 NOTA IMPORTANTE SOBRE SEGURIDAD:
// ====================================================
//
// ❌ ESTO NO ES UN LOGIN REAL
//
// ¿Por qué?
// 1. La contraseña está en el código JavaScript
//    (Cualquiera puede verla abriendo el código)
//
// 2. No hay servidor que valide
//    (Todo pasa en el navegador del usuario)
//
// 3. No hay encriptación ni protección
//
// Este ejercicio es para aprender:
// - Condicionales
// - Validación de interfaz
// - Feedback visual
//
// Un login REAL necesita:
// - Backend (servidor)
// - Base de datos
// - Encriptación
// - Autenticación segura
//
// ✅ Esto es solo LÓGICA DE INTERFAZ
//
// ====================================================
