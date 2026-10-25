// Operación Cola. Nova ya armó la carcasa: la lista, los botones y los estilos.
// Este componente no guarda estado. Recibe los pedidos por props y avisa al padre (App)
// llamando las funciones onMarcar y onBorrar. El estado vive en App.jsx.
function ListaPedidos({ pedidos, onMarcar, onBorrar }) {
    // Clase, Ticket 3: se calcula del array en cada pintado. No necesita un estado nuevo.
    const pendientes = pedidos.filter((p) => !p.sono).length;

    return (
        <section className="cola">
            <h2 className="seccion-titulo">Cola de pedidos</h2>
            <p className="cola-contador">{pendientes} por sonar</p>

            {pedidos.length === 0 ? (
                <p className="cola-vacia">Aún no hay pedidos en la cola.</p>
            ) : (
                <ul className="cola-lista">
                    {pedidos.map((p) => (
                        // Clase, Ticket 3: la clase "sono" tacha el pedido
                        <li key={p.id} className={p.sono ? "pedido-item sono" : "pedido-item"}>
                            <div className="pedido-texto">
                                <span className="pedido-titulo">{p.titulo}</span>
                                <span className="pedido-quien">pedida por {p.quien}</span>
                            </div>
                            <div className="pedido-acciones">
                                {/* Clase, Ticket 3: la arrow function evita que onMarcar se ejecute al pintar */}
                                <button className="boton-mini" onClick={() => onMarcar(p.id)}>
                                    {p.sono ? "Desmarcar" : "Ya sonó"}
                                </button>
                                {/* Clase, Ticket 2 */}
                                <button className="boton-mini boton-mini-peligro" onClick={() => onBorrar(p.id)}>
                                    Quitar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default ListaPedidos;
