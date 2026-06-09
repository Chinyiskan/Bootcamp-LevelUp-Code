// ==========================================================================
// POKÉCARD - CONTROLADOR PRINCIPAL (API Y EVENTOS)
// Este es el archivo que los estudiantes utilizarán para practicar.
// Objetivos de aprendizaje: Uso de async/await, fetch, try/catch y manejo de promesas en ES6+.
// ==========================================================================

// Función principal que se ejecuta al intentar buscar un Pokémon
async function buscarPokemon(nombre) {
    // 1. Disparar el estado de carga visual (Función importada desde ui.js)
    mostrarCargando();

    try {
        // Limpiar entrada del usuario (pasar a minúsculas y quitar espacios en blanco laterales)
        const nombreLimpio = nombre.toLowerCase().trim();

        // Validar que el usuario no haya presionado "Buscar" estando vacío el campo
        if (nombreLimpio === "") {
            throw new Error("Por favor, ingresa el nombre de un Pokémon para realizar la búsqueda.");
        }

        // 2. Realizar petición asíncrona a la API pública de Pokémon (PokeAPI)
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombreLimpio}`);

        // 3. Validar de forma manual si el servidor responde con un error (Ej. Error 404 No encontrado)
        if (!respuesta.ok) {
            throw new Error(`No pudimos encontrar al Pokémon "${nombre}" en la base de datos. Revisa la ortografía e inténtalo de nuevo.`);
        }

        // 4. Transformar la respuesta del servidor a un formato de objeto JavaScript (JSON)
        const datos = await respuesta.json();

        // 5. Enviar los datos listos a la interfaz para que se pinten en pantalla (Función importada desde ui.js)
        mostrarPokemon(datos);

    } catch (error) {
        // 6. Canalizar cualquier error detectado para que se muestre una alerta estética (Función importada desde ui.js)
        mostrarError(error.message);
    }
}

// ==========================================
// CONEXIÓN DE EVENT LISTENERS (INTERACCIONES)
// ==========================================
const botonBuscar = document.getElementById("buscar-btn");
const inputPokemon = document.getElementById("pokemon-input");

// Registrar el clic en el botón de búsqueda
botonBuscar.addEventListener("click", () => {
    const valorInput = inputPokemon.value;
    buscarPokemon(valorInput);
});

// Registrar el evento de pulsación de teclado en el input (Búsqueda rápida al presionar Enter)
inputPokemon.addEventListener("keypress", (evento) => {
    if (evento.key === "Enter") {
        const valorInput = inputPokemon.value;
        buscarPokemon(valorInput);
    }
});
