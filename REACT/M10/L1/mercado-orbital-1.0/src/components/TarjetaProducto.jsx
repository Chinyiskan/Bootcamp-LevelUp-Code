// Ya viene listo. Pinta un producto y avisa al padre cuando lo agregan.
function TarjetaProducto({ producto, onAgregar }) {
    return (
        <article className="tarjeta">
            <img src={producto.imagen} alt={producto.nombre} className="tarjeta-imagen" />
            <span className="etiqueta">{producto.categoria}</span>
            <h3>{producto.nombre}</h3>
            <p className="precio">{producto.precio} cr</p>
            <button className="boton-agregar" onClick={() => onAgregar(producto)}>
                Agregar al carrito
            </button>
        </article>
    );
}

export default TarjetaProducto;
