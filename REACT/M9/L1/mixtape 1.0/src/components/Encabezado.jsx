// Clase, Ticket 2.
function Encabezado() {
    return (
        // Antes el h1 y el p estaban sueltos. Un componente solo puede devolver
        // un elemento, así que el header los agrupa.
        // (Si no quieres agregar una etiqueta al HTML, el fragmento <> </> también sirve.)
        <header className="encabezado">
            <h1 className="logo">Mixtape</h1>
            <p className="lema">Música para los turnos largos de la estación</p>
        </header>
    );
}

// Sin esta línea, App.jsx no puede importar el componente y la app se rompe.
export default Encabezado;
