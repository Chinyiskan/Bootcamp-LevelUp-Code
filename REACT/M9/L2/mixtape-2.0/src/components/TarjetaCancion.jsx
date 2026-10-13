// Clase, Tickets 1 y 3 + Home Challenge, Ticket 2.
// Antes los datos llegaban con import desde cancion.js. Ahora llegan por props desde App,
// así que la misma tarjeta sirve para cualquier canción de la playlist.
// Controles y Siguiente salieron de aquí (Ticket 1): no tiene sentido repetirlos en cada tarjeta.
function TarjetaCancion({
    titulo,
    artista,
    album,
    duracion,
    portada,
    anio,
    reproducciones,
    favorita,
    energia,
}) {
    return (
        <article className="tarjeta">
            <img src={portada} alt="Portada del álbum" className="tarjeta-portada" />

            {/* Clase, Ticket 3: si favorita es false, && se detiene ahí y React no pinta nada */}
            {favorita && <span className="etiqueta-favorita">❤️ Favorita</span>}

            <h2 className="tarjeta-titulo">{titulo}</h2>
            <p className="tarjeta-artista">{artista}</p>
            <p className="tarjeta-detalle">Álbum: {album}</p>
            <p className="tarjeta-detalle">Duración: {duracion}</p>
            <p className="tarjeta-detalle">Año: {anio}</p>
            <p className="tarjeta-detalle">Reproducciones: {reproducciones}</p>
            <p className="tarjeta-detalle">Lanzada hace {2026 - anio} años</p>

            {/* Home Challenge, Ticket 2: el ancho cambia con cada canción, por eso va en style.
                Las llaves de afuera son de JSX y las de adentro son del objeto. */}
            <div className="barra-energia">
                <div className="barra-energia-relleno" style={{ width: `${energia}%` }}></div>
            </div>
        </article>
    );
}

export default TarjetaCancion;
