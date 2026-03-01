// ====================================================
// ⚡ BARRA DE ENERGÍA (HP) - HEALTH POINTS
// ====================================================
// Este script controla los puntos de vida de un personaje
// usando NÚMEROS y OPERADORES MATEMÁTICOS
// ====================================================

// ============================================
// PASO 1: SELECCIONAR ELEMENTOS DEL DOM
// ============================================

const barra = document.querySelector('#hp-bar');
const btnAtacar = document.querySelector('#btn-atacar');
const btnCurar = document.querySelector('#btn-curar');
const numeroHP = document.querySelector('#hp-number');
const textoEstado = document.querySelector('#status');


// ============================================
// PASO 2: CREAR LA VARIABLE DE ESTADO (HP)
// ============================================
// Esta es la variable MÁS IMPORTANTE del programa
// Es un NÚMERO que representa la vida del personaje

let hp = 100;  // Empezamos con 100 puntos de vida


// ============================================
// PASO 3: BOTÓN ATACAR - RESTAR HP
// ============================================
// Cuando hacemos click en "Atacar", el HP BAJA

btnAtacar.addEventListener('click', () => {

    // RESTAMOS 10 puntos de vida (operador -)
    hp = hp - 10;

    // VALIDACIÓN: El HP no puede ser menor que 0
    if (hp < 0) {
        hp = 0;  // Si bajó de 0, lo ponemos en 0
    }


    // ============================================
    // ACTUALIZAR LA BARRA VISUAL
    // ============================================

    // 1. Cambiar el ancho de la barra según el HP
    barra.style.width = hp + '%';

    // 2. Cambiar el texto dentro de la barra
    barra.innerText = hp + '%';

    // 3. Actualizar el número visible arriba
    numeroHP.innerText = hp;


    // ============================================
    // CAMBIAR COLOR SEGÚN EL HP
    // ============================================

    // Si el HP es CRÍTICO (menos de 20), ponemos color ROJO
    if (hp < 20) {
        barra.classList.remove('bg-success');  // Quitamos verde
        barra.classList.add('bg-danger');      // Ponemos rojo
        numeroHP.style.color = '#e74c3c';      // Número en rojo
    }

    // Si el HP es NORMAL (20 o más), ponemos color VERDE
    if (hp >= 20) {
        barra.classList.remove('bg-danger');   // Quitamos rojo
        barra.classList.add('bg-success');     // Ponemos verde
        numeroHP.style.color = '#27ae60';      // Número en verde
    }


    // ============================================
    // ACTUALIZAR MENSAJE DE ESTADO
    // ============================================

    if (hp === 0) {
        textoEstado.innerHTML = '<span style="color: #e74c3c;">💀 Estado: Derrotado</span>';
    }

    if (hp > 0 && hp < 20) {
        textoEstado.innerHTML = '<span style="color: #e74c3c;">⚠️ Estado: CRÍTICO</span>';
    }

    if (hp >= 20 && hp < 50) {
        textoEstado.innerHTML = '<span style="color: #f39c12;">😰 Estado: Herido</span>';
    }

    if (hp >= 50 && hp < 80) {
        textoEstado.innerHTML = '<span style="color: #3498db;">🙂 Estado: Estable</span>';
    }

    if (hp >= 80 && hp < 100) {
        textoEstado.innerHTML = '<span style="color: #27ae60;">😊 Estado: Saludable</span>';
    }

    if (hp === 100) {
        textoEstado.innerHTML = '<span style="color: #27ae60;">💪 Estado: ¡A tope!</span>';
    }

});


// ============================================
// PASO 4: BOTÓN CURAR - SUMAR HP
// ============================================
// Cuando hacemos click en "Curar", el HP SUBE

btnCurar.addEventListener('click', () => {

    // SUMAMOS 10 puntos de vida (operador +)
    hp = hp + 10;

    // VALIDACIÓN: El HP no puede ser mayor que 100
    if (hp > 100) {
        hp = 100;  // Si subió de 100, lo ponemos en 100
    }


    // ============================================
    // ACTUALIZAR LA BARRA VISUAL
    // ============================================

    // 1. Cambiar el ancho de la barra según el HP
    barra.style.width = hp + '%';

    // 2. Cambiar el texto dentro de la barra
    barra.innerText = hp + '%';

    // 3. Actualizar el número visible arriba
    numeroHP.innerText = hp;


    // ============================================
    // CAMBIAR COLOR SEGÚN EL HP
    // ============================================

    // Si el HP es CRÍTICO (menos de 20), ponemos color ROJO
    if (hp < 20) {
        barra.classList.remove('bg-success');  // Quitamos verde
        barra.classList.add('bg-danger');      // Ponemos rojo
        numeroHP.style.color = '#e74c3c';      // Número en rojo
    }

    // Si el HP es NORMAL (20 o más), ponemos color VERDE
    if (hp >= 20) {
        barra.classList.remove('bg-danger');   // Quitamos rojo
        barra.classList.add('bg-success');     // Ponemos verde
        numeroHP.style.color = '#27ae60';      // Número en verde
    }


    // ============================================
    // ACTUALIZAR MENSAJE DE ESTADO
    // ============================================

    if (hp === 0) {
        textoEstado.innerHTML = '<span style="color: #e74c3c;">💀 Estado: Derrotado</span>';
    }

    if (hp > 0 && hp < 20) {
        textoEstado.innerHTML = '<span style="color: #e74c3c;">⚠️ Estado: CRÍTICO</span>';
    }

    if (hp >= 20 && hp < 50) {
        textoEstado.innerHTML = '<span style="color: #f39c12;">😰 Estado: Herido</span>';
    }

    if (hp >= 50 && hp < 80) {
        textoEstado.innerHTML = '<span style="color: #3498db;">🙂 Estado: Estable</span>';
    }

    if (hp >= 80 && hp < 100) {
        textoEstado.innerHTML = '<span style="color: #27ae60;">😊 Estado: Saludable</span>';
    }

    if (hp === 100) {
        textoEstado.innerHTML = '<span style="color: #27ae60;">💪 Estado: ¡A tope!</span>';
    }

});


// ====================================================
// 🎯 CONCEPTOS QUE USAMOS:
// ====================================================
//
// 1. VARIABLES CON NÚMEROS
//    - let hp = 100;
//    - La variable guarda un NÚMERO, no texto
//    - Los números se pueden sumar y restar
//
// 2. OPERADORES MATEMÁTICOS
//    - Suma: hp = hp + 10
//    - Resta: hp = hp - 10
//
// 3. NÚMEROS vs STRINGS (TEXTOS)
//    - Número: let edad = 25
//    - String: let nombre = "Juan"
//    - Si sumas números: 10 + 5 = 15
//    - Si "sumas" strings: "10" + "5" = "105"
//
// 4. CONCATENACIÓN (UNIR TEXTO CON NÚMEROS)
//    - hp + '%' → El número se convierte en texto
//    - Ejemplo: si hp = 75 → resultado = "75%"
//
// 5. COMPARACIONES CON NÚMEROS
//    - < (menor que): hp < 20
//    - > (mayor que): hp > 100
//    - === (igual): hp === 0
//    - >= (mayor o igual): hp >= 20
//
// 6. .STYLE.WIDTH
//    - Cambia el ancho de un elemento
//    - barra.style.width = "50%"
//    - El NÚMERO controla una propiedad VISUAL
//
// 7. .STYLE.COLOR
//    - Cambia el color del texto
//    - elemento.style.color = "#e74c3c"
//
// 8. CLASSLIST (repaso)
//    - .add('clase'): Agrega una clase CSS
//    - .remove('clase'): Quita una clase CSS
//
// ====================================================
// 💡 FLUJO DEL PROGRAMA:
// ====================================================
//
// 1. Página carga, hp = 100
//    ↓
// 2. Usuario hace CLICK en "Atacar"
//    ↓
// 3. hp = hp - 10 (ahora hp = 90)
//    ↓
// 4. Verificamos que hp no sea menor que 0
//    ↓
// 5. Actualizamos la barra:
//    - Ancho: style.width = "90%"
//    - Texto: innerText = "90%"
//    - Número: innerText = 90
//    ↓
// 6. Verificamos el color:
//    - ¿hp < 20? No → color verde
//    ↓
// 7. Actualizamos el mensaje de estado
//    ↓
// 8. El usuario VE los cambios visuales
//
// ====================================================
// 🧙♂️ CONCEPTO CLAVE:
// ====================================================
//
// "No modificamos el diseño directamente.
// Modificamos el ESTADO (el número hp),
// y dejamos que el diseño lo REPRESENTE."
//
// El número hp es la "verdad".
// La barra visual es solo una "representación".
//
// Así funcionan:
// - Barras de vida en juegos
// - Indicadores de batería
// - Barras de descarga
//
// TODO se reduce a:
// un número → se refleja visualmente
//
// ====================================================

hola.addEventListener()