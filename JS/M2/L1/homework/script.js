// ============================================
// 🎮 LA ORDEN DEL BIT - MISIÓN XAR-7
// ============================================
// ✅ VERSIÓN SOLUCIONADA
// Juego narrativo para practicar condicionales
// y toma de decisiones en JavaScript
// ============================================

// ============================================
// PASO 1: ELEMENTOS DEL DOM
// ============================================
const gameImage = document.querySelector('#game-image');
const narrativeText = document.querySelector('#narrative-text');
const buttonContainer = document.querySelector('#button-container');
const endingFeedback = document.querySelector('#ending-feedback');


// ============================================
// PASO 2: VARIABLES DE ESTADO
// ============================================
let currentScene = 'intro';
let gameEnded = false;


// ============================================
// NARRATIVAS DEL JUEGO
// ============================================
const narratives = {
    intro: `
        <p><strong>PLANETA XAR-7 - SECTOR FRONTERIZO</strong></p>
        <p>Eres un Caballero de la <strong class="blink">ORDEN DEL BIT</strong>, la élite tecnológica 
        que protege los datos de la galaxia.</p>
        <p>Una transmisión urgente ha llegado a la Orden:</p>
        <p><em>"Las bases de datos del Núcleo Central han sido robadas. 
        El ladrón fue visto por última vez en el planeta desértico XAR-7."</em></p>
        <p>Tu nave aterriza en el inhóspito planeta. Arena roja hasta donde alcanza la vista. 
        Estructuras abandonadas. Silencio absoluto.</p>
        <p><strong>TU MISIÓN:</strong> Recuperar las bases de datos y capturar al ladrón.</p>
        <p class="blink" style="color: var(--pixel-gold);">¿Estás listo para comenzar?</p>
    `,

    decision1: `
        <p><strong>ZONA DE ATERRIZAJE - XAR-7</strong></p>
        <p>Sales de tu nave. El viento arrastra arena contra tu armadura.</p>
        <p>Tu escáner detecta <strong>tres señales diferentes:</strong></p>
        <p>📡 <strong>SEÑAL AZUL:</strong> Interferencia electrónica a 2 km al norte. 
        Podría ser tecnología avanzada... o una trampa.</p>
        <p>👣 <strong>RASTRO VISUAL:</strong> Huellas frescas que se adentran en el desierto. 
        El ladrón podría estar cerca, pero hay peligro en estas arenas.</p>
        <p>🆘 <strong>SEÑAL DE EMERGENCIA:</strong> Transmisión de socorro a unos kilómetros al este. 
        Mercaderes en apuros. Esto podría desviarte de tu misión...</p>
        <p><strong>DECISIÓN CRÍTICA:</strong> ¿Qué camino tomas?</p>
    `,

    goodEnding: `
        <p><strong>REFUGIO SUBTERRÁNEO - 2 KM AL NORTE</strong></p>
        <p>Tu análisis era correcto. La señal electrónica te llevó a un refugio oculto bajo las dunas.</p>
        <p>Dentro encuentras al ladrón: un antiguo hacker renegado intentando descifrar los datos robados.</p>
        <p><strong>"¡Maldición! ¿Cómo me encontraste tan rápido?"</strong></p>
        <p>Lo capturas sin resistencia. Recuperas las <strong>BASES DE DATOS INTACTAS</strong>.</p>
        <p>Transmites a la Orden: <em>"Misión cumplida. Datos recuperados. Ladrón bajo custodia."</em></p>
        <p style="color: var(--pixel-green);" class="blink">🎉 ¡MISIÓN EXITOSA! 🎉</p>
    `,

    badEnding: `
        <p><strong>DESIERTO DE ARENA ROJA - UBICACIÓN DESCONOCIDA</strong></p>
        <p>Decidiste seguir las huellas sin analizar. Avanzas con confianza por las dunas...</p>
        <p>De repente, la arena bajo tus pies se hunde.</p>
        <p><strong>¡RUGIDO ENSORDECEDOR!</strong></p>
        <p>Un <strong>GUSANO DE ARENA</strong> gigantesco emerge de las profundidades. 
        Sus múltiples mandíbulas se abren revelando hileras de dientes afilados.</p>
        <p>Tu armadura no es rival para una criatura de este tamaño.</p>
        <p>Lo último que ves es oscuridad...</p>
        <p style="color: var(--pixel-red);" class="blink">💀 FIN - DEVORADO POR EL GUSANO 💀</p>
        <p><em>La Orden envía un segundo equipo... pero para ti, la misión ha terminado.</em></p>
    `,

    merchantsEncounter: `
        <p><strong>CAMPAMENTO DE MERCADERES - LÍMITE ESTE DEL DESIERTO</strong></p>
        <p>Decides investigar la señal de emergencia. A unos kilómetros encuentras un pequeño campamento.</p>
        <p>Un grupo de <strong>MERCADERES INTERESTELARES</strong> te recibe con alivio.</p>
        <p><em>"¡Gracias a las estrellas! Nuestro MECH DE CARGA se averió hace horas. 
        No tenemos las herramientas para repararlo."</em></p>
        <p>El líder del grupo te mira con esperanza:</p>
        <p><strong>"Si nos ayudas a repararlo, te pagaremos generosamente. 
        Tenemos... información valiosa. Coordenadas que podrían interesarte."</strong></p>
        <p>Miras tu cronómetro. Ayudarlos te tomará al menos <strong>dos días</strong>. 
        El ladrón podría escapar del planeta en ese tiempo...</p>
        <p><strong>NUEVA DECISIÓN:</strong></p>
        <p style="color: var(--pixel-blue);">¿Los ayudas y arriesgas tu misión principal...</p>
        <p style="color: var(--pixel-red);">...o los ignoras y continúas solo?</p>
    `,

    secretEnding: `
        <p><strong>TEMPLO ANTIGUO - COORDENADAS ENCRIPTADAS</strong></p>
        <p>Pasaste dos días ayudando a los mercaderes. Finalmente, el mech está operativo.</p>
        <p>Como agradecimiento, te entregan un <strong>CRISTAL DE DATOS ENCRIPTADO</strong>:</p>
        <p><em>"Lo encontramos en unas ruinas. Nunca pudimos descifrarlo, pero tú tienes la tecnología de la Orden."</em></p>
        <p>Tu escáner descifra el cristal. Son <strong>COORDENADAS</strong>.</p>
        <p>Viajas a la ubicación. Bajo las arenas, oculto durante milenios...</p>
        <p>Un <strong>TEMPLO DE LA ORDEN</strong> perdido hace siglos.</p>
        <p>En su interior, intactos y perfectamente preservados:</p>
        <p>📜 <strong>LOS PLANOS ORIGINALES</strong> de la primera nave interestelar de la Orden.</p>
        <p>Estos planos se creían perdidos para siempre. Su valor histórico y tecnológico es <strong>INCALCULABLE</strong>.</p>
        <p>Transmites a la Orden. Largo silencio. Luego:</p>
        <p><em>"Caballero... has hecho un descubrimiento que cambiará la historia de la Orden. 
        Te concedemos la <strong>MEDALLA DEL BIT SUPREMO</strong> 
        y el rango de <strong>MAESTRO DIGITAL</strong>."</em></p>
        <p style="color: var(--pixel-purple);" class="blink">✨ ¡FINAL SECRETO DESBLOQUEADO! ✨</p>
        <p><strong>🏆 ASCENDIDO A MAESTRO DIGITAL 🏆</strong></p>
    `,

    abandonmentEnding: `
        <p><strong>DESIERTO DE XAR-7 - DÍAS DESPUÉS</strong></p>
        <p>Decidiste no ayudar a los mercaderes. "No tengo tiempo para esto", pensaste.</p>
        <p>Continuaste tu búsqueda del ladrón, adentrándote más en el desierto...</p>
        <p>De repente, el cielo se oscurece. <strong>TORMENTA DE ARENA</strong>.</p>
        <p>Arena roja te golpea desde todas direcciones. Pierdes la orientación.</p>
        <p>El sistema de navegación falla. Las comunicaciones se cortan.</p>
        <p><strong>TRES DÍAS PERDIDO EN LA TORMENTA.</strong></p>
        <p>Cuando finalmente la tormenta cesa, apenas puedes caminar. 
        Llegas a tu nave con lo último de tu energía.</p>
        <p>El ladrón escapó hace tiempo. Misión fallida.</p>
        <p>Transmisión de la Orden:</p>
        <p><em>"Tu falta de criterio puso en riesgo la misión. 
        Las bases de datos siguen perdidas. 
        <strong>ERES DEGRADADO DE RANGO</strong>."</em></p>
        <p style="color: var(--pixel-red);" class="blink">⚠️ FIN - MISIÓN FALLIDA ⚠️</p>
        <p><strong>REPRENSIÓN DEL CONSEJO - DEGRADACIÓN</strong></p>
    `
};


// ============================================
// FEEDBACKS VISUALES DE FINALES
// ============================================
const feedbacks = {
    goodEnding: `
        <div class="ending-title">✅ FINAL BUENO ✅</div>
        <p>MISIÓN COMPLETADA</p>
        <p>DATOS RECUPERADOS</p>
        <p>LADRÓN CAPTURADO</p>
        <p style="margin-top: 20px; color: var(--pixel-gold);">
            +500 PUNTOS DE EXPERIENCIA
        </p>
    `,

    badEnding: `
        <div class="ending-title">❌ FINAL MALO ❌</div>
        <p>MISIÓN FALLIDA</p>
        <p>CABALLERO CAÍDO</p>
        <p>GUSANO DE ARENA VICTORIOSO</p>
        <p style="margin-top: 20px; color: var(--pixel-gold);">
            "La paciencia es virtud del guerrero digital."
        </p>
    `,

    secretEnding: `
        <div class="ending-title">🌟 FINAL SECRETO 🌟</div>
        <p>DESCUBRIMIENTO HISTÓRICO</p>
        <p>PLANOS ANCESTRALES RECUPERADOS</p>
        <p>RANGO: MAESTRO DIGITAL</p>
        <p style="margin-top: 20px; color: var(--pixel-gold);">
            +10,000 PUNTOS DE EXPERIENCIA
        </p>
        <p class="blink">¡LOGRO DESBLOQUEADO!</p>
    `,

    abandonmentEnding: `
        <div class="ending-title">❌ FINAL MALO ❌</div>
        <p>MISIÓN FALLIDA</p>
        <p>PERDIDO EN LA TORMENTA</p>
        <p>DEGRADADO DE RANGO</p>
        <p style="margin-top: 20px; color: var(--pixel-gold);">
            "La compasión también es fortaleza."
        </p>
    `
};


// ============================================
// PASO 3: INICIALIZAR JUEGO - PANTALLA INTRO
// ============================================
console.log('🎮 Iniciando La Orden del Bit - Misión XAR-7');

// Mostrar imagen de intro
gameImage.src = 'images/1.png';

// Mostrar texto narrativo de intro
narrativeText.innerHTML = narratives.intro;

// Crear botón de iniciar misión
const btnStart = document.createElement('button');
btnStart.className = 'btn-pixel btn-primary-pixel';
btnStart.textContent = '▶ INICIAR MISIÓN';
btnStart.addEventListener('click', () => {

    console.log('Click en: INICIAR MISIÓN');

    // Cambiar a escena de primera decisión
    currentScene = 'decision1';

    // Cambiar imagen
    gameImage.src = 'images/2.png';

    // Cambiar texto narrativo
    narrativeText.innerHTML = narratives.decision1;

    // Limpiar botones anteriores
    buttonContainer.innerHTML = '';

    // ============================================
    // PASO 4: CREAR BOTONES DE PRIMERA DECISIÓN
    // ============================================

    // BOTÓN A: Analizar señales (FINAL BUENO)
    const btnOptionA = document.createElement('button');
    btnOptionA.className = 'btn-pixel btn-primary-pixel';
    btnOptionA.textContent = '🔍 ANALIZAR SEÑALES';
    btnOptionA.addEventListener('click', () => {

        console.log('Usuario eligió: ANALIZAR SEÑALES');

        // Cambiar a final bueno
        currentScene = 'goodEnding';
        gameEnded = true;

        // Cambiar imagen
        gameImage.src = 'images/3.png';

        // Cambiar texto narrativo
        narrativeText.innerHTML = narratives.goodEnding;

        // Mostrar feedback del final bueno
        endingFeedback.classList.remove('hidden');
        endingFeedback.className = 'ending-feedback ending-good';
        endingFeedback.innerHTML = feedbacks.goodEnding;

        // Limpiar botones y crear botón de reinicio
        buttonContainer.innerHTML = '';

        const btnRestart = document.createElement('button');
        btnRestart.className = 'btn-pixel btn-restart';
        btnRestart.textContent = '🔄 VOLVER A JUGAR';
        btnRestart.addEventListener('click', () => {
            location.reload(); // Recargar la página para reiniciar
        });

        buttonContainer.appendChild(btnRestart);
    });

    // BOTÓN B: Avanzar sin análisis (FINAL MALO - GUSANO)
    const btnOptionB = document.createElement('button');
    btnOptionB.className = 'btn-pixel btn-primary-pixel';
    btnOptionB.textContent = '⚡ AVANZAR SIN ANÁLISIS';
    btnOptionB.addEventListener('click', () => {

        console.log('Usuario eligió: AVANZAR SIN ANÁLISIS');

        // Cambiar a final malo (gusano)
        currentScene = 'badEnding';
        gameEnded = true;

        // Cambiar imagen
        gameImage.src = 'images/4.png';

        // Cambiar texto narrativo
        narrativeText.innerHTML = narratives.badEnding;

        // Mostrar feedback del final malo
        endingFeedback.classList.remove('hidden');
        endingFeedback.className = 'ending-feedback ending-bad';
        endingFeedback.innerHTML = feedbacks.badEnding;

        // Limpiar botones y crear botón de reinicio
        buttonContainer.innerHTML = '';

        const btnRestart = document.createElement('button');
        btnRestart.className = 'btn-pixel btn-restart';
        btnRestart.textContent = '🔄 VOLVER A JUGAR';
        btnRestart.addEventListener('click', () => {
            location.reload();
        });

        buttonContainer.appendChild(btnRestart);
    });

    // BOTÓN C: Investigar emergencia (CAMINO A MERCADERES)
    const btnOptionC = document.createElement('button');
    btnOptionC.className = 'btn-pixel btn-primary-pixel';
    btnOptionC.textContent = '🆘 INVESTIGAR EMERGENCIA';
    btnOptionC.addEventListener('click', () => {

        console.log('Usuario eligió: INVESTIGAR EMERGENCIA');

        // ============================================
        // PASO 5: ENCUENTRO CON MERCADERES
        // ============================================

        // Cambiar a escena de mercaderes
        currentScene = 'merchantsEncounter';

        // Cambiar imagen
        gameImage.src = 'images/5.png';

        // Cambiar texto narrativo
        narrativeText.innerHTML = narratives.merchantsEncounter;

        // Limpiar botones anteriores
        buttonContainer.innerHTML = '';

        // BOTÓN: Ayudar a reparar (FINAL SECRETO)
        const btnHelp = document.createElement('button');
        btnHelp.className = 'btn-pixel btn-primary-pixel';
        btnHelp.textContent = '🔧 AYUDAR A REPARAR';
        btnHelp.addEventListener('click', () => {

            console.log('Usuario eligió: AYUDAR A REPARAR');

            // Cambiar a final secreto
            currentScene = 'secretEnding';
            gameEnded = true;

            // Cambiar imagen
            gameImage.src = 'images/6.png';

            // Cambiar texto narrativo
            narrativeText.innerHTML = narratives.secretEnding;

            // Mostrar feedback del final secreto
            endingFeedback.classList.remove('hidden');
            endingFeedback.className = 'ending-feedback ending-secret';
            endingFeedback.innerHTML = feedbacks.secretEnding;

            // Limpiar botones y crear botón de reinicio
            buttonContainer.innerHTML = '';

            const btnRestart = document.createElement('button');
            btnRestart.className = 'btn-pixel btn-restart';
            btnRestart.textContent = '🔄 VOLVER A JUGAR';
            btnRestart.addEventListener('click', () => {
                location.reload();
            });

            buttonContainer.appendChild(btnRestart);
        });

        // BOTÓN: Continuar solo (FINAL MALO - TORMENTA)
        const btnIgnore = document.createElement('button');
        btnIgnore.className = 'btn-pixel btn-primary-pixel';
        btnIgnore.textContent = '❌ CONTINUAR SOLO';
        btnIgnore.addEventListener('click', () => {

            console.log('Usuario eligió: CONTINUAR SOLO');

            // Cambiar a final malo (tormenta)
            currentScene = 'abandonmentEnding';
            gameEnded = true;

            // Cambiar imagen
            gameImage.src = 'images/7.png';

            // Cambiar texto narrativo
            narrativeText.innerHTML = narratives.abandonmentEnding;

            // Mostrar feedback del final malo
            endingFeedback.classList.remove('hidden');
            endingFeedback.className = 'ending-feedback ending-bad';
            endingFeedback.innerHTML = feedbacks.abandonmentEnding;

            // Limpiar botones y crear botón de reinicio
            buttonContainer.innerHTML = '';

            const btnRestart = document.createElement('button');
            btnRestart.className = 'btn-pixel btn-restart';
            btnRestart.textContent = '🔄 VOLVER A JUGAR';
            btnRestart.addEventListener('click', () => {
                location.reload();
            });

            buttonContainer.appendChild(btnRestart);
        });

        // Agregar botones de mercaderes
        buttonContainer.appendChild(btnHelp);
        buttonContainer.appendChild(document.createElement('br'));
        buttonContainer.appendChild(btnIgnore);
    });

    // Agregar botones de primera decisión
    buttonContainer.appendChild(btnOptionA);
    buttonContainer.appendChild(document.createElement('br'));
    buttonContainer.appendChild(btnOptionB);
    buttonContainer.appendChild(document.createElement('br'));
    buttonContainer.appendChild(btnOptionC);
});

// Agregar botón de inicio
buttonContainer.appendChild(btnStart);


// ============================================
// 🎯 FLUJO DEL JUEGO (RESUMEN)
// ============================================
//
// INTRO (imagen 1)
//    ↓
// [Botón: INICIAR MISIÓN]
//    ↓
// DECISIÓN 1 (imagen 2)
//    ├─ [A: Analizar] → FINAL BUENO (imagen 3) ✅
//    ├─ [B: Avanzar] → FINAL MALO - Gusano (imagen 4) ❌
//    └─ [C: Emergencia] → MERCADERES (imagen 5)
//                           ↓
//                        DECISIÓN 2
//                        ├─ [Ayudar] → FINAL SECRETO (imagen 6) 🌟
//                        └─ [No Ayudar] → FINAL MALO - Tormenta (imagen 7) ❌
//    ↓
// [Todos los finales: VOLVER A JUGAR]
//
// ============================================
// 📚 CONCEPTOS APLICADOS:
// ============================================
// ✅ Variables (let, const)
// ✅ Objetos (narratives, feedbacks)
// ✅ Condicionales implícitos (event listeners anidados)
// ✅ Manipulación del DOM
//    - querySelector
//    - createElement
//    - addEventListener
//    - innerHTML
//    - classList
//    - appendChild
// ✅ Template literals (backticks)
// ✅ console.log para debugging
// ============================================
