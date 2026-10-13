import Encabezado from "./components/Encabezado.jsx";
import TarjetaCancion from "./components/TarjetaCancion.jsx";
import Controles from "./components/Controles.jsx";
import PiePagina from "./components/PiePagina.jsx";
import Seccion from "./components/Seccion.jsx";
import { canciones } from "./data/canciones.js";

function App() {
    return (
        <main className="app">
            {/* Clase, Bonus */}
            <Encabezado total={canciones.length} />

            {/* Home Challenge, Bonus: ternario porque es "esto o aquello".
                Se compara con > 0 porque {canciones.length && ...} pintaría un 0 suelto. */}
            {canciones.length > 0 ? (
                // Home Challenge, Ticket 1: todo lo que va adentro le llega a Seccion como children
                <Seccion titulo="Turno de noche">
                    <section className="playlist">
                        {/* Clase, Ticket 2: una tarjeta por cada objeto del array */}
                        {canciones.map((cancion) => (
                            <TarjetaCancion
                                // La key es para React, no para la tarjeta. El id es único.
                                key={cancion.id}
                                titulo={cancion.titulo}
                                artista={cancion.artista}
                                album={cancion.album}
                                duracion={cancion.duracion}
                                portada={cancion.portada}
                                anio={cancion.anio}
                                reproducciones={cancion.reproducciones}
                                // Clase, Ticket 3
                                favorita={cancion.favorita}
                                // Home Challenge, Ticket 2
                                energia={cancion.energia}
                            />
                        ))}
                    </section>
                </Seccion>
            ) : (
                <p className="playlist-vacia">Aún no hay canciones en la estación</p>
            )}

            {/* Clase, Ticket 1: los controles salieron de la tarjeta */}
            <Controles />
            <PiePagina />
        </main>
    );
}

export default App;
