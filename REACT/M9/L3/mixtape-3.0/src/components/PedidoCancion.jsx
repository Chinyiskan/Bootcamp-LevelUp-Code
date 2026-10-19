// Home Challenge, Tickets 1, 2 y 3 + Bonus.
import { useState } from "react";

function PedidoCancion() {
    // Ticket 1: inputs controlados. Cada campo guarda lo que el usuario escribe en un estado.
    const [cancion, setCancion] = useState("");
    const [nombre, setNombre] = useState("");

    // Ticket 2: el mensaje de error vive en un estado; "" significa que no hay error y no se pinta nada.
    const [error, setError] = useState("");

    // Ticket 3: mismo patrón que el error, para el mensaje de pedido recibido.
    const [confirmacion, setConfirmacion] = useState("");

    function manejarEnvio(e) {
        // Ticket 2: sin esto el formulario recarga la página y se pierde todo
        e.preventDefault();

        // Ticket 3: si este pedido falla, no puede quedar en pantalla el mensaje del pedido anterior
        setConfirmacion("");

        // Ticket 2: trim() quita los espacios de los extremos, así "   " no cuenta como texto.
        // return corta la función: si hay un error, no seguimos con el pedido.
        if (cancion.trim().length < 2) {
            setError("El nombre de la canción necesita al menos 2 letras.");
            return;
        }
        if (nombre.trim() === "") {
            setError("Escribe quién pide la canción.");
            return;
        }

        setError("");

        // Ticket 3: este orden es a propósito. setCancion("") no cambia la variable cancion en este
        // instante: durante toda la función conserva lo que valía al hacer clic, y por eso el mensaje
        // sale con la canción completa. Con nombre pasa igual.
        setCancion("");
        setConfirmacion(`Pedido recibido: ${cancion}, para ${nombre}`);
        setNombre("");
    }

    return (
        <form className="pedido" onSubmit={manejarEnvio}>
            <h2 className="seccion-titulo">Pide una canción</h2>

            <label>Canción</label>
            {/* Ticket 1: value y onChange van siempre juntos. Con value solo, el input no deja escribir. */}
            <input type="text" placeholder="¿Qué quieres escuchar?" value={cancion} onChange={(e) => setCancion(e.target.value)} />

            {/* Bonus: el número sale de cancion.length. La clase roja cambia con un ternario. */}
            <span className={cancion.length > 40 ? "contador-letras contador-letras-rojo" : "contador-letras"}>{cancion.length}/40</span>

            <label>Tu nombre</label>
            <input type="text" placeholder="¿Quién la pide?" value={nombre} onChange={(e) => setNombre(e.target.value)} />

            {/* Ticket 2: se apaga si CUALQUIERA de los dos está vacío, por eso es || y no &&.
                Bonus: también se apaga si la canción pasa de 40 letras. */}
            <button type="submit" disabled={cancion === "" || nombre === "" || cancion.length > 40}>Enviar pedido</button>

            {/* Ticket 2 y Ticket 3: "esto o nada", por eso &&. El párrafo solo existe cuando hay un mensaje. */}
            {error !== "" && <p className="pedido-error">{error}</p>}
            {confirmacion !== "" && <p className="pedido-exito">{confirmacion}</p>}
        </form>
    );
}

export default PedidoCancion;
