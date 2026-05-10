// ============================================================
//  DevBoard — KanbanCard.js
//  Web Component: tarjeta individual de tarea
// ============================================================
//  Atributos disponibles desde el HTML:
//    titulo      → texto principal de la tarjeta
//    responsable → nombre de quien tiene asignada la tarea
//    prioridad   → "alta" | "media" | "baja"
//
//  Ejemplo de uso:
//    <kanban-card
//        titulo="Diseñar login"
//        responsable="Ana Torres"
//        prioridad="alta">
//    </kanban-card>
// ============================================================

class KanbanCard extends HTMLElement {

    constructor() {
        // super() conecta esta clase con el motor interno del navegador.
        // Sin esta línea el elemento no puede existir en el DOM.
        super();

        // attachShadow crea el árbol DOM privado del componente.
        // Los estilos de adentro no salen — los de afuera no entran.
        this.attachShadow({ mode: "open" });
    }

    // Le dice al navegador qué atributos debe vigilar.
    // Solo los de esta lista disparan attributeChangedCallback.
    static get observedAttributes() {
        return ["titulo", "responsable", "prioridad"];
    }

    // El navegador llama esto automáticamente cuando el elemento
    // entra al DOM por primera vez.
    connectedCallback() {
        this.render();
    }

    // El navegador llama esto automáticamente cuando cambia
    // cualquier atributo de la lista de arriba.
    attributeChangedCallback(name, oldValue, newValue) {
        // La guarda evita que render() corra antes de que el Shadow DOM
        // esté listo (puede pasar durante la construcción inicial).
        if (this.shadowRoot) {
            this.render();
        }
    }

    // Construye el HTML y los estilos del componente.
    // Toda la lógica visual vive aquí adentro, encapsulada.
    render() {
        let titulo      = this.getAttribute("titulo")      || "Sin título";
        let responsable = this.getAttribute("responsable") || "Sin asignar";
        let prioridad   = this.getAttribute("prioridad")   || "baja";

        // Traducir la prioridad a color y etiqueta.
        // Esta lógica vive adentro del componente — quien usa
        // <kanban-card> no necesita saber cómo se procesa por dentro.
        let colorPrioridad = "#3fb950";  // verde = baja
        let etiqueta       = "Baja";
        if (prioridad === "alta") {
            colorPrioridad = "#f85149";  // rojo = alta
            etiqueta       = "Alta";
        }
        if (prioridad === "media") {
            colorPrioridad = "#d29922";  // amarillo = media
            etiqueta       = "Media";
        }

        // Icono SVG de punto de color para el badge (sin emojis)
        const iconoPrioridad = `
            <svg width="7" height="7" viewBox="0 0 8 8" fill="${colorPrioridad}">
                <circle cx="4" cy="4" r="4"/>
            </svg>
        `;

        // Generar las iniciales del responsable para el avatar.
        // Si el nombre tiene dos palabras, tomamos la primera letra de cada una.
        let palabras  = responsable.split(" ");
        let iniciales = palabras[0][0].toUpperCase();
        if (palabras[1]) {
            iniciales += palabras[1][0].toUpperCase();
        }

        // El innerHTML del shadowRoot es la cápsula completa:
        // estilos + estructura HTML — todo privado.
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }

                .card {
                    background: #ffffff;
                    border-radius: 10px;
                    padding: 14px 16px;
                    margin-bottom: 10px;
                    border: 1px solid #e5e7eb;
                    border-left: 3px solid ${colorPrioridad};
                    cursor: grab;
                    transition: transform 0.15s ease, box-shadow 0.15s ease;
                    font-family: 'Outfit', sans-serif;
                    user-select: none;
                    position: relative;  /* necesario para posicionar el botón eliminar */
                }

                .card:active {
                    cursor: grabbing;
                }

                .card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14);
                }

                /* Botón eliminar: oculto por defecto, visible al pasar el mouse */
                .btn-eliminar {
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    width: 22px;
                    height: 22px;
                    border-radius: 6px;
                    border: none;
                    background: transparent;
                    color: #9ca3af;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.15s, background 0.15s, color 0.15s;
                    padding: 0;
                    flex-shrink: 0;
                }

                /* Mostrar el botón cuando el cursor está sobre la tarjeta */
                .card:hover .btn-eliminar {
                    opacity: 1;
                }

                .btn-eliminar:hover {
                    background: #fee2e2;
                    color: #dc2626;
                }

                /* Estado de confirmación: el botón se vuelve rojo */
                .btn-eliminar.confirmando {
                    opacity: 1;
                    background: #fca5a5;
                    color: #dc2626;
                    width: auto;
                    padding: 2px 7px;
                    font-size: 10px;
                    font-weight: 700;
                    font-family: 'Outfit', sans-serif;
                    letter-spacing: 0.3px;
                    border-radius: 6px;
                }

                .footer {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .responsable-grupo {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                }

                .avatar {
                    width: 26px;
                    height: 26px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    font-size: 10px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .nombre {
                    font-size: 12px;
                    color: #6b7280;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 110px;
                }

                .titulo {
                    font-size: 14px;
                    font-weight: 600;
                    color: #111827;
                    line-height: 1.45;
                    margin: 0 0 14px 0;
                    /* dejar espacio a la derecha para el botón eliminar */
                    padding-right: 20px;
                }

                .responsable-grupo {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                }

                .avatar {
                    width: 26px;
                    height: 26px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    font-size: 10px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .nombre {
                    font-size: 12px;
                    color: #6b7280;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 110px;
                }

                .badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 11px;
                    font-weight: 700;
                    padding: 3px 9px;
                    border-radius: 20px;
                    background: ${colorPrioridad}20;
                    color: ${colorPrioridad};
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    white-space: nowrap;
                }
            </style>

            <div class="card">
                <!-- Botón eliminar — aparece al pasar el mouse -->
                <button class="btn-eliminar" title="Eliminar tarjeta">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>

                <p class="titulo">${titulo}</p>
                <div class="footer">
                    <div class="responsable-grupo">
                        <div class="avatar">${iniciales}</div>
                        <span class="nombre">${responsable}</span>
                    </div>
                    <span class="badge">${iconoPrioridad} ${etiqueta}</span>
                </div>
            </div>
        `;

        // ── Lógica del botón eliminar ─────────────────────────────────
        // Necesitamos acceder al botón DESPUÉS de hacer innerHTML,
        // porque recien ahí existe en el Shadow DOM.
        const btnEliminar = this.shadowRoot.querySelector(".btn-eliminar");

        btnEliminar.addEventListener("click", (evento) => {
            // Importante: evitar que el clic active el drag de la tarjeta
            evento.stopPropagation();

            if (!btnEliminar.classList.contains("confirmando")) {
                // Primer clic: pedir confirmación
                btnEliminar.classList.add("confirmando");
                btnEliminar.innerHTML = "¿Seguro?";

                // Si el usuario no confirma en 2 segundos, cancelar
                setTimeout(() => {
                    if (btnEliminar.classList.contains("confirmando")) {
                        btnEliminar.classList.remove("confirmando");
                        btnEliminar.innerHTML = `
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        `;
                    }
                }, 2000);

            } else {
                // Segundo clic: eliminar la tarjeta
                // 1. Quitar el elemento del DOM
                this.remove();

                // 2. Lanzar un evento personalizado que "burbujea" hacia arriba.
                //    app.js lo escucha para actualizar los contadores.
                //    bubbles: true → el evento sube por el DOM hasta document
                //    composed: true → el evento puede cruzar el Shadow DOM
                this.dispatchEvent(new CustomEvent("tarjeta-eliminada", {
                    bubbles:  true,
                    composed: true
                }));
            }
        });
    }
}

// Registrar la etiqueta en el navegador.
// Desde esta línea, <kanban-card> es HTML válido en toda la página.
customElements.define("kanban-card", KanbanCard);