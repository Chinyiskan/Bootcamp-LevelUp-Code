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
