// Tarea, Ticket 2: componente propio de la cabina.
// Recomienda una canción de la playlist. El botón "Otra" pasa a la siguiente.
// Recibe la playlist por props (la prop canciones) y guarda en su estado cuál está mostrando.
import { useState } from "react";

function CancionDelDia({ canciones }) {
    // Guardamos la posición, igual que el reproductor: un solo número decide qué canción se ve.
    const [indice, setIndice] = useState(0);

    // Si la playlist está vacía no hay nada que recomendar
    if (canciones.length === 0) {
        return null;
    }

    // % (resto de la división) evita salirse del array si la playlist cambió de tamaño
    const cancion = canciones[indice % canciones.length];

    function otra() {
        setIndice((indice + 1) % canciones.length);
    }

    return (
        <section className="del-dia" aria-live="polite">
            <p className="del-dia-etiqueta">Canción del día</p>

            {/* key cambia con la canción: React crea el bloque de nuevo y la animación de entrada se repite */}
            <div className="del-dia-cuerpo" key={cancion.id}>
                <img src={cancion.portada} alt={`Portada de ${cancion.titulo}`} className="del-dia-portada" />
                <div className="del-dia-textos">
                    <p className="del-dia-titulo">{cancion.titulo}</p>
                    <p className="del-dia-artista">{cancion.artista}</p>
                    <p className="del-dia-nota">
                        {cancion.favorita ? "Una de tus favoritas" : `Energía ${cancion.energia} de 100`}
                    </p>
                </div>
            </div>

            <button className="del-dia-boton" onClick={otra}>
                Otra
            </button>
        </section>
    );
}

export default CancionDelDia;
