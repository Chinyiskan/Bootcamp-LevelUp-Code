// Los datos llegan por props desde App, así que la misma tarjeta sirve para cualquier canción de la playlist.
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

            {/* Si favorita es false, && se detiene ahí y React no pinta nada */}
            {favorita && <span className="etiqueta-favorita">❤️ Favorita</span>}

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
        </article>
    );
}

export default TarjetaCancion;
