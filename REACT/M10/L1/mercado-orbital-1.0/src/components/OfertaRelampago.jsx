import { useState, useEffect } from "react";

// ===== INICIO · Solución Tarea, Ticket 1 =====
// Cuenta regresiva de 60 segundos para la oferta del Propulsor turbo
function OfertaRelampago() {
    const [segundos, setSegundos] = useState(60);

    // Cada vez que segundos cambia, el efecto programa el siguiente paso de la cuenta.
    // Al llegar a 0 no programa nada más y la cuenta se detiene.
    useEffect(() => {
        if (segundos === 0) return;

        const id = setTimeout(() => {
            setSegundos(segundos - 1);
        }, 1000);

        return () => clearTimeout(id);
    }, [segundos]);

    if (segundos === 0) {
        return (
            <section className="oferta oferta-terminada">
                La oferta del Propulsor turbo terminó. Nova trae otra mañana.
            </section>
        );
    }

    return (
        <section className="oferta">
            <span><strong>Oferta relámpago:</strong> Propulsor turbo a 450 cr</span>
            <span className="cuenta">Termina en {segundos} s</span>
        </section>
    );
}
// ===== FIN · Tarea, Ticket 1 =====

export default OfertaRelampago;
