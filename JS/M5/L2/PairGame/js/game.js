// Motor lógico del juego modularizado
(() => {
    // Estado interno utilizando variables mutables y controladas
    let gameState = {
        points: 0,
        attempts: 0,
        flippedCards: [],
        isLockBoard: false
    };

    // Almacenamiento de referencias del DOM
    const grid = document.getElementById('gameGrid');
    const pointsEl = document.getElementById('points');
    const attemptsEl = document.getElementById('attempts');
    const restartBtn = document.getElementById('restartBtn');
    const muteBtn = document.getElementById('muteBtn');

    // Referencias al modal de victoria
    const winOverlay      = document.getElementById('winOverlay');
    const finalPointsEl   = document.getElementById('finalPoints');
    const finalAttemptsEl = document.getElementById('finalAttempts');
    const finalAccuracyEl = document.getElementById('finalAccuracy');
    const winRestartBtn   = document.getElementById('winRestartBtn');
    const confettiContainer = document.getElementById('confettiContainer');

    // Carga de recursos de audio con volúmenes equilibrados
    const bgMusic = new Audio('SFX/1-08. Minecraft.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.25; // Música de fondo más suave

    const correctSound = new Audio('SFX/correcto.mp3');
    correctSound.volume = 0.4;

    const incorrectSound = new Audio('SFX/incorrecto.mp3');
    incorrectSound.volume = 0.4;

    const villagerSound = new Audio('SFX/aldeano.mp3');
    villagerSound.volume = 0.55;

    const clickSound = new Audio('SFX/Bow_shoot.ogg');
    clickSound.volume = 0.5;

    // Estado de audio
    let isMuted = false;
    let musicStarted = false;

    // Iniciar reproducción de la música de fondo de forma segura
    const startBgMusic = () => {
        if (musicStarted) return;
        bgMusic.play()
            .then(() => {
                musicStarted = true;
                // Remover escuchas una vez que inicia
                document.removeEventListener('click', startBgMusicOnInteraction);
                document.removeEventListener('keydown', startBgMusicOnInteraction);
                updateMuteButtonUI();
            })
            .catch(err => {
                console.log("Música de fondo en espera de interacción:", err);
            });
    };

    const startBgMusicOnInteraction = () => {
        if (!isMuted) {
            startBgMusic();
        }
    };

    // Alternar silencio de la música
    const toggleMusic = () => {
        isMuted = !isMuted;
        bgMusic.muted = isMuted;
        updateMuteButtonUI();

        if (!musicStarted && !isMuted) {
            startBgMusic();
        }
    };

    const updateMuteButtonUI = () => {
        if (isMuted) {
            muteBtn.textContent = '🔇 Música: OFF';
            muteBtn.style.opacity = '0.7';
        } else {
            muteBtn.textContent = '🔊 Música: ON';
            muteBtn.style.opacity = '1';
        }
    };

    // Inicializar el tablero de juego (Arrow Function)
    const initWorld = () => {
        grid.innerHTML = '';
        const shuffledPool = utils.shuffleCards(minecraftItems);

        shuffledPool.forEach((item, idx) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.id = item.id;
            card.dataset.index = idx;

            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        <img src="${item.image}" alt="${item.concept}" class="card-img">
                    </div>
                    <div class="card-back"></div>
                </div>
            `;
            
            card.addEventListener('click', () => handleCardFlip(card, item));
            grid.appendChild(card);
        });
    };

    // Controlar el volteo de tarjetas usando Desestructuración
    const handleCardFlip = (cardElement, itemData) => {
        const { flippedCards, isLockBoard } = gameState;

        // Validaciones rápidas del estado de juego
        if (isLockBoard) return;
        if (cardElement.classList.contains('flipped') || cardElement.classList.contains('matched')) return;

        // Reproducir sonido de clic/disparo de arco
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log("Error al reproducir audio:", e));

        cardElement.classList.add('flipped');
        gameState.flippedCards.push({ element: cardElement, data: itemData });

        if (gameState.flippedCards.length === 2) {
            gameState.attempts++;
            updateUI(gameState.points, gameState.attempts);
            verifyMatch();
        }
    };

    // Verificar coincidencias aplicando Destructuring en Arrays
    const verifyMatch = () => {
        const [card1, card2] = gameState.flippedCards;
        const success = card1.data.id === card2.data.id;

        success ? processMatch(card1, card2) : resetFlippedCards(card1, card2);
    };

    // Procesar pareja encontrada
    const processMatch = (c1, c2) => {
        c1.element.classList.add('matched');
        c2.element.classList.add('matched');
        
        gameState.points += 10;
        gameState.matchedPairs = (gameState.matchedPairs || 0) + 1;

        // Reproducir sonido de acierto
        correctSound.currentTime = 0;
        correctSound.play().catch(e => console.log("Error al reproducir audio:", e));

        utils.logGameAction('MATCH_SUCCESS', `Desbloqueado: ${c1.data.concept}`);
        clearTurn();

        // Verificar si todas las parejas fueron encontradas
        if (gameState.matchedPairs === minecraftItems.length) {
            setTimeout(() => showWinScreen(), 600);
        }
    };

    // Si no son iguales, voltear de vuelta con retraso cronometrado
    const resetFlippedCards = (c1, c2) => {
        gameState.isLockBoard = true;
        
        // Agregar clase de error visual (shake + borde rojo)
        c1.element.classList.add('error');
        c2.element.classList.add('error');
        
        // Reproducir sonido de error
        incorrectSound.currentTime = 0;
        incorrectSound.play().catch(e => console.log("Error al reproducir audio:", e));

        setTimeout(() => {
            c1.element.classList.remove('flipped', 'error');
            c2.element.classList.remove('flipped', 'error');
            clearTurn();
        }, 900);
    };

    // Limpiar variables de control de turno
    const clearTurn = () => {
        gameState.flippedCards = [];
        gameState.isLockBoard = false;
        updateUI(gameState.points, gameState.attempts);
    };

    // Actualizar los elementos visuales usando Rest Parameters (...scores)
    const updateUI = (...scores) => {
        const [currentPoints, currentAttempts] = scores;
        pointsEl.textContent = currentPoints;
        attemptsEl.textContent = currentAttempts;
    };

    // Resetear el juego por completo
    const resetWorld = () => {
        // Ocultar modal de victoria si está visible
        winOverlay.hidden = true;
        confettiContainer.innerHTML = '';

        gameState = { points: 0, attempts: 0, flippedCards: [], isLockBoard: false, matchedPairs: 0 };
        updateUI(0, 0);
        initWorld();
        utils.logGameAction('WORLD_RESET');

        // Reproducir sonido de aldeano al reiniciar el mundo
        villagerSound.currentTime = 0;
        villagerSound.play().catch(e => console.log("Error al reproducir audio:", e));
    };

    // Mostrar pantalla de victoria
    const showWinScreen = () => {
        const { points, attempts } = gameState;
        const totalPairs = minecraftItems.length;
        // Precisión: el mínimo posible de intentos es igual al número de parejas
        const accuracy = attempts > 0
            ? Math.round((totalPairs / attempts) * 100)
            : 100;

        finalPointsEl.textContent   = points;
        finalAttemptsEl.textContent = attempts;
        finalAccuracyEl.textContent = `${Math.min(accuracy, 100)}%`;

        winOverlay.hidden = false;
        spawnConfetti();

        utils.logGameAction('GAME_WIN', `Puntos: ${points} | Intentos: ${attempts}`);
    };

    // Generar partículas de confeti dentro del modal
    const spawnConfetti = () => {
        confettiContainer.innerHTML = '';
        const colors = [
            '#ffaa00', '#55ff55', '#ff5555', '#5555ff',
            '#ff55ff', '#55ffff', '#ffffff', '#ffff55'
        ];
        const totalPieces = 60;

        for (let i = 0; i < totalPieces; i++) {
            const piece = document.createElement('div');
            piece.classList.add('confetti-piece');

            const color  = colors[Math.floor(Math.random() * colors.length)];
            const left   = Math.random() * 100;          // % horizontal
            const size   = 6 + Math.random() * 8;        // 6–14px
            const delay  = Math.random() * 1.8;          // 0–1.8s
            const dur    = 2.2 + Math.random() * 2;      // 2.2–4.2s
            const isCircle = Math.random() > 0.5;

            piece.style.cssText = `
                left: ${left}%;
                width: ${size}px;
                height: ${size}px;
                background-color: ${color};
                border-radius: ${isCircle ? '50%' : '0'};
                animation-delay: ${delay}s;
                animation-duration: ${dur}s;
            `;

            confettiContainer.appendChild(piece);
        }
    };

    // Asignación de Event Listeners
    restartBtn.addEventListener('click', resetWorld);
    muteBtn.addEventListener('click', toggleMusic);
    winRestartBtn.addEventListener('click', resetWorld);

    // Arrancar automáticamente al cargar el script
    initWorld();

    // Escuchas para iniciar la música con la primera interacción genuina del usuario
    document.addEventListener('click', startBgMusicOnInteraction);
    document.addEventListener('keydown', startBgMusicOnInteraction);
})();
