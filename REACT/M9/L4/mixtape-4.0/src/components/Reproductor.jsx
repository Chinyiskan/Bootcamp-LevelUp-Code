// Clase, Tickets 1, 2 y 3.
// Reemplaza a Controles.jsx: los botones de antes no hacían nada, este reproductor sí.
import { useState } from "react";

import { canciones } from "../data/canciones.js";
import { IconoPlay, IconoPausa, IconoAnterior, IconoSiguiente } from "./Iconos.jsx";

// ── Pieza de Nova: ya viene lista, no la cambies ─────────────────────────
// El <audio> es un elemento especial: cambiar un estado no lo hace sonar.
// Hay que darle la orden "play" o "pause" directamente, y esta función
// busca el audio en la página y se la da. Tú solo la llamas:
//     darOrden("play")    o    darOrden("pause")
function darOrden(orden) {
    const audio = document.getElementById("audio-mixtape");
    if (!audio) return;

    if (orden === "play") {
        audio.play().catch(() => {});
    } else {
        audio.pause();
    }
}
// ─────────────────────────────────────────────────────────────────────────

function Reproductor() {
    // Ticket 1: si fuera una variable normal, React no se enteraría del cambio y
    // el icono, el texto y el ecualizador se quedarían congelados.
    const [reproduciendo, setReproduciendo] = useState(false);

    // Ticket 2: guardamos la posición (no la canción entera) para que un solo número
    // decida qué portada, título y artista se pintan.
    const [indice, setIndice] = useState(0);

    // Ticket 3: porcentaje de 0 a 100. Cada vez que cambia, React vuelve a pintar la barra.
    const [progreso, setProgreso] = useState(0);

    // La canción que está sonando sale del array, según el índice
    const cancion = canciones[indice];

    // Ticket 1
    function alternar() {
        // Aquí "reproduciendo" todavía tiene el valor de antes del clic: por eso, si vale true,
        // lo que toca hacer es pausar.
        if (reproduciendo) {
            darOrden("pause");
        } else {
            darOrden("play");
        }
        setReproduciendo(!reproduciendo);
    }

    // Ticket 2
    function siguiente() {
        // Pasarse de la última posición dejaría canciones[indice] en undefined y la pantalla en blanco.
        if (indice === canciones.length - 1) {
            setIndice(0);
        } else {
            setIndice(indice + 1);
        }
        // Ticket 3: la canción nueva empieza desde cero
        setProgreso(0);
    }

    // Ticket 2
    function anterior() {
        if (indice === 0) {
            setIndice(canciones.length - 1);
        } else {
            setIndice(indice - 1);
        }
        setProgreso(0);
    }

    return (
        <div className="reproductor">
            {/* El audio no se ve: suena. key hace que se cree uno nuevo cada vez que cambia la canción,
                y autoPlay hace que la nueva arranque sola si la anterior estaba sonando. */}
            <audio
                id="audio-mixtape"
                key={indice}
                src={cancion.audio}
                autoPlay={reproduciendo}
                // Ticket 2: cuando la canción termina, pasa a la siguiente. Va sin paréntesis:
                // le pasamos la función para que el navegador la llame cuando termine.
                onEnded={siguiente}
                // Ticket 3: el navegador lo dispara varias veces por segundo mientras suena.
                // currentTime / duration da un número entre 0 y 1; por 100 queda en porcentaje.
                onTimeUpdate={(e) => setProgreso((e.target.currentTime / e.target.duration) * 100)}
            ></audio>

            <div className="reproductor-info">
                <img src={cancion.portada} alt="Portada" className="reproductor-portada" />

                <div className="reproductor-textos">
                    {/* Ticket 1: dos opciones, "esto o aquello", por eso es un ternario */}
                    <p className="reproductor-estado">{reproduciendo ? "Sonando ahora" : "En pausa"}</p>
                    <p className="reproductor-titulo">{cancion.titulo}</p>
                    <p className="reproductor-artista">{cancion.artista}</p>
                    {!cancion.audio && <p className="reproductor-aviso">Esta canción no tiene audio</p>}
                </div>

                {/* Ticket 1: "esto o nada", por eso && y no ternario */}
                {reproduciendo && (
                    <div className="ecualizador">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                )}
            </div>

            {/* Ticket 3: el ancho cambia con cada canción, por eso sale del estado y va en style.
                El % tiene que ir dentro de un texto: width: "37%" y no width: 37. */}
            <div className="barra-progreso">
                <div className="barra-progreso-relleno" style={{ width: `${progreso}%` }}></div>
            </div>

            <div className="controles">
                <button className="boton-control" aria-label="Anterior" onClick={anterior}>
                    <IconoAnterior />
                </button>
                <button className="boton-control boton-play" aria-label="Play o pausa" onClick={alternar}>
                    {reproduciendo ? <IconoPausa /> : <IconoPlay />}
                </button>
                <button className="boton-control" aria-label="Siguiente" onClick={siguiente}>
                    <IconoSiguiente />
                </button>
            </div>
        </div>
    );
}

export default Reproductor;
