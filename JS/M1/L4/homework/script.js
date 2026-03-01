// ====================================================
// ⚔️ EL CAMINO DEL GUERRERO - PROYECTO FINAL MÓDULO 1
// ====================================================
// Diseño épico medieval con las imágenes del reino
// ====================================================

// ============================================
// PASO 1: SELECCIONAR ELEMENTOS DEL DOM
// ============================================

const body = document.querySelector('body');
const welcomeText = document.querySelector('#welcome-text');
const warriorNameInput = document.querySelector('#warrior-name');
const themeToggle = document.querySelector('#theme-toggle');

// Barra de progreso
const progressBar = document.querySelector('#progress-bar');
const progressText = document.querySelector('#progress-text');
const btnAdvance = document.querySelector('#btn-advance');
const btnRetreat = document.querySelector('#btn-retreat');

// Zona del dragón
const dragonLair = document.querySelector('#dragon-lair');
const questName = document.querySelector('#quest-name');
const questProgress = document.querySelector('#quest-progress');
const questNight = document.querySelector('#quest-night');
const btnUnlock = document.querySelector('#btn-unlock');
const knightReveal = document.querySelector('#knight-reveal');
const achievementScroll = document.querySelector('#achievement-scroll');

// Género y reset
const btnMale = document.querySelector('#btn-male');
const btnFemale = document.querySelector('#btn-female');
const btnReset = document.querySelector('#btn-reset');


// ============================================
// PASO 2: VARIABLES DE ESTADO
// ============================================

let nombreGuerrero = '';
let progresoQuest = 0;
let modoNocheActivo = false;
let dragonDespertado = false;
let generoSeleccionado = 'male';  // Por defecto masculino


// ============================================
// PASO 3: CARGAR DATOS DE LOCALSTORAGE
// ============================================

// Cargar nombre
const nombreGuardado = localStorage.getItem('nombreGuerrero');
if (nombreGuardado !== null) {
    nombreGuerrero = nombreGuardado;
    warriorNameInput.value = nombreGuerrero;
    actualizarBienvenida();
}

// Cargar progreso
const progresoGuardado = localStorage.getItem('progresoQuest');
if (progresoGuardado !== null) {
    progresoQuest = Number(progresoGuardado);
    actualizarProgreso();
}

// Cargar tema
const temaGuardado = localStorage.getItem('modoNoche');
if (temaGuardado === 'true') {
    modoNocheActivo = true;
    themeToggle.checked = true;
    body.classList.add('night-mode');
}

// Cargar género
const generoGuardado = localStorage.getItem('generoSeleccionado');
if (generoGuardado !== null) {
    generoSeleccionado = generoGuardado;
    actualizarBotonesGenero();
}


// ============================================
// LECCIÓN 2: NOMBRE DEL GUERRERO
// ============================================

warriorNameInput.addEventListener('input', () => {

    // Leer el nombre escrito
    nombreGuerrero = warriorNameInput.value;

    // Actualizar bienvenida
    actualizarBienvenida();

    // Guardar en localStorage
    localStorage.setItem('nombreGuerrero', nombreGuerrero);

    // Verificar misiones
    verificarMisiones();
});

// Función para actualizar el mensaje de bienvenida
function actualizarBienvenida() {

    // Si NO tiene nombre
    if (nombreGuerrero === '') {
        welcomeText.innerText = 'Bienvenido, Valiente Guerrero';
    }

    // Si tiene nombre
    if (nombreGuerrero !== '') {
        welcomeText.innerText = `Bienvenido, ${nombreGuerrero} el Valiente`;
    }
}


// ============================================
// LECCIÓN 1: MODO DÍA/NOCHE
// ============================================

themeToggle.addEventListener('change', () => {

    // Si está marcado (modo noche)
    if (themeToggle.checked === true) {

        body.classList.add('night-mode');
        modoNocheActivo = true;

        // Guardar en localStorage
        localStorage.setItem('modoNoche', 'true');
    }

    // Si está desmarcado (modo día)
    if (themeToggle.checked === false) {

        body.classList.remove('night-mode');
        modoNocheActivo = false;

        // Guardar en localStorage
        localStorage.setItem('modoNoche', 'false');
    }

    // Verificar misiones
    verificarMisiones();
});


// ============================================
// LECCIÓN 3: BARRA DE PROGRESO
// ============================================

// Botón AVANZAR
btnAdvance.addEventListener('click', () => {

    // Sumar 10 al progreso
    progresoQuest = progresoQuest + 10;

    // Validar límite máximo
    if (progresoQuest > 100) {
        progresoQuest = 100;
    }

    // Actualizar la barra visual
    actualizarProgreso();

    // Guardar en localStorage
    localStorage.setItem('progresoQuest', progresoQuest);

    // Verificar misiones
    verificarMisiones();
});

// Botón RETROCEDER
btnRetreat.addEventListener('click', () => {

    // Restar 10 al progreso
    progresoQuest = progresoQuest - 10;

    // Validar límite mínimo
    if (progresoQuest < 0) {
        progresoQuest = 0;
    }

    // Actualizar la barra visual
    actualizarProgreso();

    // Guardar en localStorage
    localStorage.setItem('progresoQuest', progresoQuest);

    // Verificar misiones
    verificarMisiones();
});

// Función para actualizar la barra de progreso
function actualizarProgreso() {

    // 1. Cambiar el ancho de la barra
    progressBar.style.width = progresoQuest + '%';

    // 2. Cambiar el texto dentro de la barra
    progressBar.innerText = progresoQuest + '%';

    // 3. Actualizar el texto superior
    progressText.innerText = 'Avance: ' + progresoQuest + '%';


    // ============================================
    // CAMBIAR COLOR SEGÚN EL PORCENTAJE
    // ============================================

    // Quitar todas las clases de color
    progressBar.classList.remove('medium');
    progressBar.classList.remove('high');

    // BAJO (0-49%): Rojo (clase por defecto)
    // No necesita clase adicional

    // MEDIO (50-74%): Dorado
    if (progresoQuest >= 50 && progresoQuest < 75) {
        progressBar.classList.add('medium');
    }

    // ALTO (75-100%): Verde
    if (progresoQuest >= 75) {
        progressBar.classList.add('high');
    }
}


// ============================================
// LECCIÓN 4: VERIFICAR MISIONES
// ============================================

function verificarMisiones() {

    // ========================================
    // MISIÓN 1: ¿Tiene nombre?
    // ========================================
    let mision1 = false;

    if (nombreGuerrero !== '') {
        mision1 = true;
        questName.innerText = '✓ Declara tu nombre al reino';
        questName.classList.add('completed');
    }

    if (nombreGuerrero === '') {
        mision1 = false;
        questName.innerText = '✗ Declara tu nombre al reino';
        questName.classList.remove('completed');
    }


    // ========================================
    // MISIÓN 2: ¿Progreso >= 75%?
    // ========================================
    let mision2 = false;

    if (progresoQuest >= 75) {
        mision2 = true;
        questProgress.innerText = '✓ Alcanza el 75% del camino';
        questProgress.classList.add('completed');
    }

    if (progresoQuest < 75) {
        mision2 = false;
        questProgress.innerText = '✗ Alcanza el 75% del camino';
        questProgress.classList.remove('completed');
    }


    // ========================================
    // MISIÓN 3: ¿Modo noche activo?
    // ========================================
    let mision3 = false;

    if (modoNocheActivo === true) {
        mision3 = true;
        questNight.innerText = '✓ Conquista el reino de la noche';
        questNight.classList.add('completed');
    }

    if (modoNocheActivo === false) {
        mision3 = false;
        questNight.innerText = '✗ Conquista el reino de la noche';
        questNight.classList.remove('completed');
    }


    // ========================================
    // EVALUACIÓN FINAL: ¿Todas las misiones?
    // ========================================

    // Si las 3 misiones están completas
    if (mision1 === true && mision2 === true && mision3 === true) {

        // HABILITAR el botón
        btnUnlock.disabled = false;
        btnUnlock.innerHTML = '<span class="material-icons" style="vertical-align: middle;">lock_open</span> DESPERTAR AL DRAGÓN';
        dragonLair.classList.add('unlocked');
    }

    // Si falta alguna misión
    if (mision1 === false || mision2 === false || mision3 === false) {

        // DESHABILITAR el botón
        btnUnlock.disabled = true;
        btnUnlock.innerHTML = '<span class="material-icons" style="vertical-align: middle;">lock</span> DESPERTAR AL DRAGÓN';
        dragonLair.classList.remove('unlocked');
    }
}


// ============================================
// EVENTO: DESPERTAR AL DRAGÓN
// ============================================

btnUnlock.addEventListener('click', () => {

    // Si ya despertó al dragón antes
    if (dragonDespertado === true) {
        return; // No hacer nada
    }

    // Marcar como despertado
    dragonDespertado = true;

    // Mostrar el caballero épico
    knightReveal.classList.add('show');

    // Mostrar el pergamino de logro
    achievementScroll.classList.add('show');

    // Cambiar el botón
    btnUnlock.innerHTML = '<span class="material-icons" style="vertical-align: middle;">check_circle</span> DRAGÓN DESPERTADO';

    // Guardar en localStorage
    localStorage.setItem('dragonDespertado', 'true');
});

// Verificar misiones al cargar
verificarMisiones();



// ============================================
// SELECCIÓN DE GÉNERO
// ============================================

// Botón Masculino
btnMale.addEventListener('click', () => {
    generoSeleccionado = 'male';
    actualizarBotonesGenero();
    actualizarImagenGuerrero();
    localStorage.setItem('generoSeleccionado', 'male');
});

// Botón Femenino
btnFemale.addEventListener('click', () => {
    generoSeleccionado = 'female';
    actualizarBotonesGenero();
    actualizarImagenGuerrero();
    localStorage.setItem('generoSeleccionado', 'female');
});

// Función para actualizar botones de género
function actualizarBotonesGenero() {

    // Remover clase active de ambos
    btnMale.classList.remove('active');
    btnFemale.classList.remove('active');

    // Agregar clase active al seleccionado
    if (generoSeleccionado === 'male') {
        btnMale.classList.add('active');
    }
    if (generoSeleccionado === 'female') {
        btnFemale.classList.add('active');
    }
}

// Función para actualizar la imagen del guerrero/guerrera
function actualizarImagenGuerrero() {

    const imgElement = knightReveal.querySelector('img');

    if (generoSeleccionado === 'male') {
        imgElement.src = 'images/caballero.png';
        imgElement.alt = 'Caballero Épico';
    }

    if (generoSeleccionado === 'female') {
        imgElement.src = 'images/femenino.png';
        imgElement.alt = 'Caballera Épica';
    }
}


// ============================================
// BOTÓN DE RESET
// ============================================

btnReset.addEventListener('click', () => {

    // Confirmar antes de resetear
    const confirmar = confirm(
        '¿Estás seguro de que quieres reiniciar tu quest?\n\n' +
        'Esto borrará todo tu progreso y tendrás que empezar de nuevo.'
    );

    if (confirmar === true) {

        // Limpiar TODO el localStorage
        localStorage.clear();

        // Forzar recarga completa sin caché
        window.location.reload(true);
    }
});


// ============================================
// CARGAR ESTADO DEL DRAGÓN Y ACTUALIZAR IMAGEN
// ============================================

// Cargar el género primero para actualizar la imagen correcta
actualizarImagenGuerrero();

// Luego cargar el estado del dragón
const dragonGuardado = localStorage.getItem('dragonDespertado');
if (dragonGuardado === 'true') {
    dragonDespertado = true;
    knightReveal.classList.add('show');
    achievementScroll.classList.add('show');
    btnUnlock.innerHTML = '<span class="material-icons" style="vertical-align: middle;">check_circle</span> DRAGÓN DESPERTADO';
}



// ====================================================
// 🎯 CONCEPTOS INTEGRADOS EN ESTE PROYECTO:
// ====================================================
//
// LECCIÓN 1: MODO DÍA/NOCHE
// - querySelector para seleccionar elementos
// - addEventListener para escuchar eventos
// - classList.add() / .remove() para cambiar temas
// - Toggle entre dos estados visuales
//
// LECCIÓN 2: IDENTIDAD DEL GUERRERO
// - .value para leer el input
// - Evento 'input' para actualización en tiempo real
// - Template strings: `${nombre} el Valiente`
// - .innerText para mostrar el saludo
//
// LECCIÓN 3: PROGRESO DE LA QUEST
// - Variables numéricas: let progreso = 0
// - Operadores + y - para modificar valores
// - Concatenación: progreso + '%'
// - Límites con validación (0-100)
// - .style.width para cambiar el ancho visual
// - Cambio de color según rangos
//
// LECCIÓN 4: MISIONES Y CONDICIONALES
// - if para tomar decisiones
// - Operadores === y !== para comparar
// - true y false (booleanos)
// - Múltiples condiciones con && y ||
// - .disabled para bloquear/desbloquear botones
// - Validación compleja de tres condiciones
//
// EXTRAS:
// - localStorage para guardar progreso
// - Funciones para organizar el código
// - Variables con nombres descriptivos
// - Comentarios educativos detallados
// - Animaciones CSS activadas desde JS
// - Imágenes integradas en el diseño
//
// ====================================================
// 🏰 FLUJO DEL JUEGO:
// ====================================================
//
// 1. El guerrero llega al reino (carga la página)
//    - Se muestra el banner épico
//    - Estado inicial: sin nombre, progreso 0%, modo día
//    ↓
// 2. El guerrero declara su identidad
//    - Escribe su nombre → actualiza bienvenida
//    ↓
// 3. El guerrero avanza en su quest
//    - Botones +10% / -10% → actualiza barra
//    - Color cambia: rojo → dorado → verde
//    ↓
// 4. El guerrero conquista la noche
//    - Toggle día/noche → cambia el tema completo
//    ↓
// 5. Verificación de misiones
//    - Cada acción verifica las 3 condiciones
//    - Las misiones completadas se marcan ✓
//    ↓
// 6. Cuando TODAS las misiones están completas
//    - El botón se HABILITA
//    - La guarida del dragón brilla
//    ↓
// 7. Click en "DESPERTAR AL DRAGÓN"
//    - El CABALLERO ÉPICO aparece con animación
//    - Se muestra el PERGAMINO DE LOGRO
//    - Se guarda el estado
//    ↓
// 8. VICTORIA TOTAL
//    - Título: CONQUISTADOR DE DRAGONES
//    - Proyecto del módulo completado
//
// ====================================================
// 🎨 DISEÑO MEDIEVAL:
// ====================================================
//
// - Banner: Imagen heroica en la parte superior
// - Dragon: Fondo de la zona de logro secreto
// - Caballero: Aparece solo al desbloquear
// - Tipografía Cinzel: Estilo medieval elegante
// - Colores oro, burgundy y pergamino
// - Tarjetas tipo pergamino antiguo
// - Botones con efecto ripple
// - Animaciones épicas y fluidas
//
// ====================================================
