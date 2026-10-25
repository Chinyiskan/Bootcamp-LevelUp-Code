import { useState } from "react";
import Encabezado from "./components/Encabezado.jsx";
import TarjetaCancion from "./components/TarjetaCancion.jsx";
import PedidoCancion from "./components/PedidoCancion.jsx";
import ListaPedidos from "./components/ListaPedidos.jsx";
import CancionDelDia from "./components/CancionDelDia.jsx";
import Reproductor from "./components/Reproductor.jsx";
import PiePagina from "./components/PiePagina.jsx";
import Seccion from "./components/Seccion.jsx";
import { canciones } from "./data/canciones.js";

// Tarea, Ticket 1: el nombre de la cabina vive en una constante y baja por props al Encabezado.
// Para renombrar la cabina se cambia en un solo lugar.
const NOMBRE_CABINA = "Radio Umbral";

function App() {
    // L3, Bonus: lo que el usuario escribe vive en un estado y el input lo muestra (input controlado)
    const [busqueda, setBusqueda] = useState("");

    // Tarea, Ticket 3: la playlist ahora es estado. Empieza con el array importado,
    // pero desde aquí en adelante React la puede cambiar mientras la app corre.
    const [playlist, setPlaylist] = useState(canciones);

    // L3, Bonus: .toLowerCase() a los dos lados para que "SEÑAL" y "señal" cuenten igual.
    // Tarea, Ticket 3: el buscador filtra playlist (el estado), no el array importado.
    const visibles = playlist.filter((cancion) =>
        cancion.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );

    // Tarea, Ticket 3: cuántas son favoritas se calcula de playlist en cada pintado. No necesita otro estado.
    const favoritas = playlist.filter((cancion) => cancion.favorita).length;

    // Clase, Ticket 1: la lista de pedidos vive aquí, en el padre, porque la necesitan dos hijos:
    // PedidoCancion la llena y ListaPedidos la muestra.
    const [pedidos, setPedidos] = useState([]);

    // Clase, Ticket 1: [...pedidos, nuevo] es un array nuevo: los pedidos de antes y el nuevo al final.
    // Con push, setPedidos recibía el mismo array de antes y React no repintaba.
    // Date.now() da los milisegundos actuales y sirve de id en una app chica.
    function agregar(titulo, quien) {
        const nuevo = { id: Date.now(), titulo, quien, sono: false };
        setPedidos([...pedidos, nuevo]);
    }

    // Clase, Ticket 2: filter se queda con los pedidos para los que la condición da true.
    // El pedido con el id buscado da false y no pasa al array nuevo.
    function borrar(id) {
        setPedidos(pedidos.filter((p) => p.id !== id));
    }

    // Clase, Ticket 3: map devuelve un array con la misma cantidad de pedidos.
    // El buscado se devuelve como una copia con sono invertido; los demás se devuelven iguales.
    function marcar(id) {
        setPedidos(pedidos.map((p) => (p.id === id ? { ...p, sono: !p.sono } : p)));
    }

    // Tarea, Ticket 3: mismo patrón que marcar. La canción buscada se copia con { ...c }
    // y se reemplaza solo favorita; las demás se devuelven tal cual. Nunca c.favorita = ...
    function alternarFavorita(id) {
        setPlaylist(playlist.map((c) => (c.id === id ? { ...c, favorita: !c.favorita } : c)));
    }

    return (
        <main className="app">
            <Encabezado nombre={NOMBRE_CABINA} total={playlist.length} favoritas={favoritas} />

            {/* Tarea, Ticket 2: el componente propio recibe la playlist por props */}
            <CancionDelDia canciones={playlist} />

            {/* Se compara con > 0 porque {playlist.length && ...} pintaría un 0 suelto. */}
            {playlist.length > 0 ? (
                // Todo lo que va adentro le llega a Seccion como children
                <Seccion titulo="Turno de noche">
                    {/* L3, Bonus */}
                    <input
                        className="buscador"
                        type="text"
                        placeholder="Buscar canción..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />

                    {/* Un buscador sin resultados también merece un mensaje */}
                    {visibles.length === 0 && (
                        <p className="playlist-vacia">Ninguna canción coincide con "{busqueda}".</p>
                    )}

                    <section className="playlist">
                        {/* L3, Bonus: el .map() recorre visibles, no canciones */}
                        {visibles.map((cancion) => (
                            <TarjetaCancion
                                // La key es para React, no para la tarjeta. El id es único.
                                key={cancion.id}
                                // Tarea, Ticket 3: la tarjeta necesita el id para avisar cuál canción cambió
                                id={cancion.id}
                                titulo={cancion.titulo}
                                artista={cancion.artista}
                                album={cancion.album}
                                duracion={cancion.duracion}
                                portada={cancion.portada}
                                anio={cancion.anio}
                                reproducciones={cancion.reproducciones}
                                favorita={cancion.favorita}
                                energia={cancion.energia}
                                // Tarea, Ticket 3: la tarjeta avisa al padre; el padre hace el set
                                onFavorita={alternarFavorita}
                            />
                        ))}
                    </section>
                </Seccion>
            ) : (
                <p className="playlist-vacia">Aún no hay canciones en la estación</p>
            )}

            {/* L3, Home Challenge: el formulario va debajo de la playlist, antes del reproductor */}
            {/* Clase, Ticket 1: el formulario recibe agregar en la prop onAgregar */}
            <PedidoCancion onAgregar={agregar} />

            {/* Clase: la cola recibe los datos y las funciones por props */}
            <ListaPedidos pedidos={pedidos} onMarcar={marcar} onBorrar={borrar} />

            {/* L3, Ticket 1: el reproductor reemplaza a Controles */}
            <Reproductor />
            <PiePagina />
        </main>
    );
}

export default App;
