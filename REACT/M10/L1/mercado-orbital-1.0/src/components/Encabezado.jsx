import RelojEstacion from "./RelojEstacion.jsx";

// Ya viene listo. Recibe cuántas unidades hay en el carrito y qué hacer al tocar el botón.
function Encabezado({ totalUnidades, onAbrirCarrito }) {
    return (
        <header className="encabezado">
            <div className="marca">
                <img src="/img/logo-mercado.png" alt="Logo del Mercado Orbital" className="logo" />
                <div>
                    <h1>Mercado Orbital</h1>
                    <p className="subtitulo">Repuestos del hangar de Nova · Estación Umbral</p>
                    {/* Tarea, Ticket 2 */}
                    <RelojEstacion />
                </div>
            </div>

            <button className="boton-carrito" onClick={onAbrirCarrito}>
                Carrito <span className="contador">{totalUnidades}</span>
            </button>
        </header>
    );
}

export default Encabezado;
