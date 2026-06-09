// Funciones de utilidad aplicando la sintaxis ES6+ solicitada
const utils = {
    // Mezcla el arreglo usando el Spread Operator y Arrow Functions
    shuffleCards: (cardsArray) => {
        // Duplicamos el set de tarjetas usando Spread Operator
        const pool = [...cardsArray, ...cardsArray];
        // Algoritmo de ordenación aleatoria moderno y directo
        return pool.sort(() => Math.random() - 0.5);
    },

    // Consola limpia usando Rest Parameters para empaquetar detalles arbitrarios
    logGameAction: (actionType, ...meta) => {
        console.log(`%c[MC-ENGINE] ${actionType}`, 'color: #55ff55; font-weight: bold;', meta);
    }
};
