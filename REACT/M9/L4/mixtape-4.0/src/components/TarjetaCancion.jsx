import { IconoCorazon } from "./Iconos.jsx";

// Los datos llegan por props desde App, así que la misma tarjeta sirve para cualquier canción de la playlist.
// Tarea, Ticket 3: además recibe su id y la función onFavorita para avisar al padre.
function TarjetaCancion({
    id,
    titulo,
    artista,
    album,
    duracion,
    portada,
    anio,
    reproducciones,
    favorita,
    energia,
    onFavorita,
}) {
    return (
        // La clase "es-favorita" le pone el borde dorado a la tarjeta
        <article className={favorita ? "tarjeta es-favorita" : "tarjeta"}>
            <img src={portada} alt={`Portada de ${titulo}`} className="tarjeta-portada" />

            {/* Si favorita es false, && se detiene ahí y React no pinta nada */}
            {favorita && (
                <span className="etiqueta-favorita">
                    <IconoCorazon /> Favorita
                </span>
            )}

            <h2 className="tarjeta-titulo">{titulo}</h2>
            <p className="tarjeta-artista">{artista}</p>
            <p className="tarjeta-detalle">Álbum: {album}</p>
            <p className="tarjeta-detalle">Duración: {duracion}</p>
            <p className="tarjeta-detalle">Año: {anio}</p>
            <p className="tarjeta-detalle">Reproducciones: {reproducciones}</p>
            <p className="tarjeta-detalle">Lanzada hace {2026 - anio} años</p>

            {/* El ancho cambia con cada canción, por eso va en style.
                Las llaves de afuera son de JSX y las de adentro son del objeto. */}
            <div className="barra-energia">
                <div className="barra-energia-relleno" style={{ width: `${energia}%` }}></div>
            </div>

            {/* Tarea, Ticket 3: la arrow function hace que onFavorita se llame al hacer clic, no al pintar */}
            <div className="tarjeta-acciones">
                <button
                    className={favorita ? "boton-favorita activa" : "boton-favorita"}
                    onClick={() => onFavorita(id)}
                >
                    {favorita ? "Quitar de favoritas" : "Marcar favorita"}
                </button>
            </div>
        </article>
    );
}

export default TarjetaCancion;
