// Home Challenge, Ticket 1: mismo patrón que Encabezado.jsx.
// Función con mayúscula, un solo elemento padre y export default al final.
function PiePagina() {
    // Pon aquí tu nombre. Vive en una variable para cambiarlo en un solo lugar.
    const autor = "Tu nombre";

    return (
        <footer className="pie">
            {/* Las llaves dentro del texto mezclan texto fijo con el valor de la variable */}
            Hecho por {autor} · Estación Umbral
        </footer>
    );
}

export default PiePagina;
