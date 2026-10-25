// Iconos del reproductor. Ya vienen listos: solo se usan como etiquetas, por ejemplo <IconoPlay />.
// Son SVG normales escritos en JSX, así que se pueden usar dentro de un ternario igual que cualquier componente.

export function IconoPlay() {
    return (
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path d="M8 5v14l11-7z" fill="currentColor" />
        </svg>
    );
}

export function IconoPausa() {
    return (
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor" />
        </svg>
    );
}

export function IconoAnterior() {
    return (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M6 5h2v14H6zM20 5v14L9 12z" fill="currentColor" />
        </svg>
    );
}

export function IconoSiguiente() {
    return (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M16 5h2v14h-2zM4 5v14l11-7z" fill="currentColor" />
        </svg>
    );
}

// Corazón para la etiqueta de favorita (reemplaza al emoji de la Lección 2)
export function IconoCorazon() {
    return (
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" className="icono-corazon">
            <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.2 5.3 3.1 1.7-1.9 3.2-3.1 5.3-3.1 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z" fill="currentColor" />
        </svg>
    );
}
