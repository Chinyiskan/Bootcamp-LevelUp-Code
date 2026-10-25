// Tarea, Ticket 1: el nombre de la cabina llega por props desde App.
// El total y las favoritas también llegan por props: se calculan en App a partir de playlist.
function Encabezado({ nombre, total, favoritas }) {
    return (
        <header className="encabezado">
            {/* Tarea, Ticket 1: logo propio guardado en public/. El alt describe la imagen. */}
            <img src="/logo-cabina.svg" alt="Logo de Radio Umbral: un casete con una antena" className="cabina-logo" />
            <h1 className="logo">{nombre}</h1>
            <p className="lema">La cabina de Mixtape para los turnos largos de la estación</p>

            <div className="encabezado-datos">
                <p className="contador">{total} canciones en la estación</p>
                {/* Tarea, Ticket 3: el número sale de playlist, por eso cambia al marcar o desmarcar */}
                <p className="contador-favoritas">{favoritas} favoritas</p>
            </div>
        </header>
    );
}

export default Encabezado;
