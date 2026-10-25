// Seccion no sabe qué le van a meter: pone el título y deja el hueco {children},
// donde React coloca lo que vino entre <Seccion> y </Seccion>.
function Seccion({ titulo, children }) {
    return (
        <section>
            <h2 className="seccion-titulo">{titulo}</h2>
            {children}
        </section>
    );
}

export default Seccion;
