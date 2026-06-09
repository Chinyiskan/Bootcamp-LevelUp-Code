// ==========================================================================
// POKÉCARD - CONTROLADOR DE INTERFAZ DE USUARIO (VISTA)
// Este archivo contiene la lógica compleja de renderizado HTML, 
// manipulación del DOM y eventos visuales de la galería.
// NOTA PARA ALUMNOS: NO ES NECESARIO MODIFICAR ESTE ARCHIVO.
// ==========================================================================

// Activa el estado de carga y oculta el resto de pantallas informativas
const mostrarCargando = () => {
    const tarjetaBienvenida = document.getElementById("welcome-card");
    const tarjetaPokemon = document.getElementById("pokemon-card");
    const mensajeError = document.getElementById("error-message");
    const estadoCarga = document.getElementById("loading-state");

    // Ocultar tarjetas informativas previas
    tarjetaBienvenida.classList.add("hidden");
    tarjetaPokemon.classList.add("hidden");
    mensajeError.classList.add("hidden");

    // Mostrar el spinner de carga
    estadoCarga.classList.remove("hidden");
};

// Muestra la tarjeta enriquecida con información tipo PokéDex
const mostrarPokemon = (data) => {
    const tarjetaPokemon = document.getElementById("pokemon-card");
    const estadoCarga = document.getElementById("loading-state");
    const mensajeError = document.getElementById("error-message");

    // Ocultar estados de carga y errores anteriores
    estadoCarga.classList.add("hidden");
    mensajeError.classList.add("hidden");

    // 1. Configuración de colores elementales de Pokémon
    const coloresTipos = {
        normal: "var(--type-normal)",
        fire: "var(--type-fire)",
        water: "var(--type-water)",
        electric: "var(--type-electric)",
        grass: "var(--type-grass)",
        ice: "var(--type-ice)",
        fighting: "var(--type-fighting)",
        poison: "var(--type-poison)",
        ground: "var(--type-ground)",
        flying: "var(--type-flying)",
        psychic: "var(--type-psychic)",
        bug: "var(--type-bug)",
        rock: "var(--type-rock)",
        ghost: "var(--type-ghost)",
        dragon: "var(--type-dragon)",
        dark: "var(--type-dark)",
        steel: "var(--type-steel)",
        fairy: "var(--type-fairy)"
    };

    // Obtener color elemental correspondiente al tipo primario
    const tipoPrincipal = data.types[0].type.name;
    const colorBrillo = coloresTipos[tipoPrincipal] || "rgba(255, 255, 255, 0.1)";

    // Aplicar estilos y brillos neón temáticos dinámicos a la tarjeta
    tarjetaPokemon.style.setProperty("--dynamic-glow-color", colorBrillo);
    tarjetaPokemon.style.borderColor = colorBrillo;
    tarjetaPokemon.style.boxShadow = `0 25px 50px rgba(0, 0, 0, 0.6), 0 0 35px ${colorBrillo}40`;

    // 2. Procesar información básica
    const idFormateado = `#${data.id.toString().padStart(4, "0")}`;
    const pesoKilogramos = (data.weight / 10).toFixed(1); 
    const alturaMetros = (data.height / 10).toFixed(2);  

    // 3. Procesamiento y creación de Badges de Tipos
    const tiposHtml = data.types.map(tipoObj => {
        const tipo = tipoObj.type.name;
        const colorBadge = coloresTipos[tipo] || "var(--text-muted)";
        return `<span class="type-badge" style="background-color: ${colorBadge}">${tipo}</span>`;
    }).join("");

    // 4. Preparación de Galería de Sprites (Thumbnails)
    const spritesDisponibles = [];
    if (data.sprites.front_default) spritesDisponibles.push({ label: "Frente", url: data.sprites.front_default });
    if (data.sprites.back_default) spritesDisponibles.push({ label: "Espalda", url: data.sprites.back_default });
    if (data.sprites.front_shiny) spritesDisponibles.push({ label: "Shiny F.", url: data.sprites.front_shiny });
    if (data.sprites.back_shiny) spritesDisponibles.push({ label: "Shiny E.", url: data.sprites.back_shiny });

    const miniaturasHtml = spritesDisponibles.map((sprite, index) => {
        const claseActiva = index === 0 ? "active" : "";
        return `
            <div class="sprite-thumb ${claseActiva}" data-sprite-url="${sprite.url}" title="${sprite.label}">
                <img src="${sprite.url}" alt="vista">
            </div>
        `;
    }).join("");

    // 5. Procesamiento de Estadísticas Base
    const nombresEstadisticas = {
        "hp": "HP",
        "attack": "Ataque",
        "defense": "Defensa",
        "special-attack": "Atk. Esp.",
        "special-defense": "Def. Esp.",
        "speed": "Velocidad"
    };

    const maxBaseStat = 255; 
    const statsHtml = data.stats.map(stat => {
        const nombreLegible = nombresEstadisticas[stat.stat.name] || stat.stat.name;
        const valorStat = stat.base_stat;
        let porcentajeBarra = (valorStat / maxBaseStat) * 100;
        if (porcentajeBarra > 100) porcentajeBarra = 100;

        return `
            <div class="stat-row">
                <span class="stat-name">${nombreLegible}</span>
                <span class="stat-value">${valorStat}</span>
                <div class="stat-bar-container">
                    <div class="stat-bar" data-porcentaje="${porcentajeBarra}"></div>
                </div>
            </div>
        `;
    }).join("");

    // 6. Procesamiento de Habilidades
    const habilidadesHtml = data.abilities.map(habilidadObj => {
        const nombreHabilidad = habilidadObj.ability.name.replace("-", " ");
        const esOculta = habilidadObj.is_hidden;
        const claseHabilidad = esOculta ? "ability-tag hidden-ability" : "ability-tag";
        return `<span class="${claseHabilidad}">${nombreHabilidad}</span>`;
    }).join("");

    // 7. Procesamiento de Movimientos Destacados
    const movimientosHtml = data.moves.slice(0, 6).map(movimientoObj => {
        const nombreMovimiento = movimientoObj.move.name.replace("-", " ");
        return `<span class="move-tag">${nombreMovimiento}</span>`;
    }).join("");

    // ==========================================
    // RENDERIZADO DEL CONTENIDO HTML
    // ==========================================
    tarjetaPokemon.innerHTML = `
        <div class="card-header">
            <h2 class="pokemon-name">${data.name}</h2>
            <span class="pokemon-id">${idFormateado}</span>
        </div>

        <div class="sprite-gallery">
            <div class="image-wrapper">
                <div class="pokeball-bg"></div>
                <img class="pokemon-img" id="main-pokemon-image" src="${data.sprites.front_default}" alt="${data.name}">
            </div>
            <div class="thumbnails-container">
                ${miniaturasHtml}
            </div>
        </div>

        <div class="types-container">
            ${tiposHtml}
        </div>

        <div class="physicals-grid">
            <div class="phys-card">
                <span class="phys-label">Altura</span>
                <span class="phys-value">${alturaMetros} m</span>
                <span class="phys-sub">Metros</span>
            </div>
            <div class="phys-card">
                <span class="phys-label">Peso</span>
                <span class="phys-value">${pesoKilogramos} kg</span>
                <span class="phys-sub">Kilogramos</span>
            </div>
        </div>

        <div class="stats-section">
            <div class="section-title">Estadísticas Base</div>
            <div class="stats-grid">
                ${statsHtml}
            </div>
        </div>

        <div class="secondary-details">
            <div>
                <div class="section-title" style="margin-bottom: 8px;">Habilidades</div>
                <div class="abilities-container">
                    ${habilidadesHtml}
                </div>
            </div>
            <div>
                <div class="section-title" style="margin-bottom: 8px;">Movimientos Clave</div>
                <div class="moves-container">
                    ${movimientosHtml}
                </div>
            </div>
        </div>
    `;

    // Mostrar tarjeta
    tarjetaPokemon.classList.remove("hidden");

    // ==========================================
    // VINCULACIÓN DE EVENTOS Y ANIMACIONES UI
    // ==========================================
    const miniaturas = tarjetaPokemon.querySelectorAll(".sprite-thumb");
    const imagenPrincipal = document.getElementById("main-pokemon-image");
    
    miniaturas.forEach(miniatura => {
        miniatura.addEventListener("click", function() {
            miniaturas.forEach(m => m.classList.remove("active"));
            this.classList.add("active");
            imagenPrincipal.src = this.getAttribute("data-sprite-url");
        });
    });

    setTimeout(() => {
        const barras = tarjetaPokemon.querySelectorAll(".stat-bar");
        barras.forEach(barra => {
            const porcentaje = barra.getAttribute("data-porcentaje");
            barra.style.width = `${porcentaje}%`;
        });
    }, 100);
};

// Muestra la tarjeta de error estilizada
const mostrarError = (mensaje) => {
    const mensajeError = document.getElementById("error-message");
    const tarjetaPokemon = document.getElementById("pokemon-card");
    const estadoCarga = document.getElementById("loading-state");
    const descripcionError = document.getElementById("error-desc");

    estadoCarga.classList.add("hidden");
    tarjetaPokemon.classList.add("hidden");

    descripcionError.textContent = mensaje;
    mensajeError.classList.remove("hidden");
};
