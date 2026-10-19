import { useState } from "react";
import Encabezado from "./components/Encabezado.jsx";
import TarjetaCancion from "./components/TarjetaCancion.jsx";
import PedidoCancion from "./components/PedidoCancion.jsx";
import Reproductor from "./components/Reproductor.jsx";
import PiePagina from "./components/PiePagina.jsx";
import Seccion from "./components/Seccion.jsx";
import { canciones } from "./data/canciones.js";

function App() {
    // Clase, Bonus: lo que el usuario escribe vive en un estado y el input lo muestra (input controlado)
    const [busqueda, setBusqueda] = useState("");

    // Clase, Bonus: .toLowerCase() a los dos lados para que "SEÑAL" y "señal" cuenten igual.
    // visibles es un array nuevo; el array canciones no se toca, así que al borrar el texto vuelven todas.
    const visibles = canciones.filter((cancion) =>
        cancion.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <main className="app">
            <Encabezado total={canciones.length} />

            {/* Se compara con > 0 porque {canciones.length && ...} pintaría un 0 suelto. */}
            {canciones.length > 0 ? (
                // Todo lo que va adentro le llega a Seccion como children
                <Seccion titulo="Turno de noche">
                    {/* Clase, Bonus */}
                    <input
                        className="buscador"
                        type="text"
                        placeholder="Buscar canción..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <section className="playlist">
                        {/* Clase, Bonus: el .map() recorre visibles, no canciones */}
                        {visibles.map((cancion) => (
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
                                favorita={cancion.favorita}
                                energia={cancion.energia}
                            />
                        ))}
                    </section>
                </Seccion>
            ) : (
                <p className="playlist-vacia">Aún no hay canciones en la estación</p>
            )}

            {/* Home Challenge, Ticket 1: el formulario va debajo de la playlist, antes del reproductor */}
            <PedidoCancion />

            {/* Clase, Ticket 1: el reproductor reemplaza a Controles */}
            <Reproductor />
            <PiePagina />
        </main>
    );
}

export default App;
