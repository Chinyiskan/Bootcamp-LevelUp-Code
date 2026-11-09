// Ya viene listo. Panel lateral con lo que hay en el carrito.
function PanelCarrito({ items, total, onCerrar, onQuitar }) {
    return (
        <div className="fondo-panel" onClick={onCerrar}>
            {/* stopPropagation evita que un clic dentro del panel lo cierre */}
            <aside className="panel" onClick={(e) => e.stopPropagation()}>
                <div className="panel-cabeza">
                    <h2>Tu carrito</h2>
                    <button className="boton-cerrar" onClick={onCerrar}>Cerrar (Esc)</button>
                </div>

                {items.length === 0 ? (
                    <div className="carrito-vacio">
                        <img src="/img/nova-carrito-vacio.png" alt="Nova junto a una caja vacía" />
                        <p>Todavía no hay repuestos aquí.</p>
                    </div>
                ) : (
                    <ul className="lista-carrito">
                        {items.map((item) => (
                            <li key={item.id}>
                                <span>{item.nombre} x{item.cantidad}</span>
                                <span>{item.precio * item.cantidad} cr</span>
                                <button onClick={() => onQuitar(item.id)}>Quitar</button>
                            </li>
                        ))}
                    </ul>
                )}

                <p className="total">Total: {total} cr</p>
            </aside>
        </div>
    );
}

export default PanelCarrito;
