// Clase, Ticket 3 + Home Challenge, Tickets 2 y Bonus.
// Todos los datos vienen de cancion.js: aquí no hay ninguna canción escrita a mano.
import {
    titulo,
    artista,
    album,
    duracion,
    portada,
    anio,
    reproducciones,
} from "../data/cancion.js";
import Controles from "./Controles.jsx";
import Siguiente from "./Siguiente.jsx";

function TarjetaCancion() {
    return (
        // Clase, Ticket 1: es className (no class). Un solo padre: el article.
        <article className="tarjeta">
            {/* Clase, Ticket 1: el img se cierra con /> y la ruta sale de la variable con llaves */}
            <img src={portada} alt="Portada del álbum" className="tarjeta-portada" />

            {/* Clase, Ticket 1: sin llaves saldría la palabra "titulo" en pantalla */}
            <h2 className="tarjeta-titulo">{titulo}</h2>
            <p className="tarjeta-artista">{artista}</p>
            <p className="tarjeta-detalle">Álbum: {album}</p>
            <p className="tarjeta-detalle">Duración: {duracion}</p>

            {/* Home Challenge, Ticket 2 */}
            <p className="tarjeta-detalle">Año: {anio}</p>
            <p className="tarjeta-detalle">Reproducciones: {reproducciones}</p>

            {/* Dentro de las llaves puede ir una operación, igual que {combustible * 3}
                en la Kestrel-7. Así el 7 se calcula solo y si cambias "anio" en
                cancion.js, el texto se actualiza. El 2026 va a mano porque todavía no
                vemos cómo pedirle la fecha actual al navegador. */}
            <p className="tarjeta-detalle">Lanzada hace {2026 - anio} años</p>

            {/* Clase, Bonus: los componentes se usan como etiquetas, con mayúscula inicial */}
            <Controles />

            {/* Home Challenge, Bonus: va debajo de Controles, al final de la tarjeta */}
            <Siguiente />
        </article>
    );
}

export default TarjetaCancion;
