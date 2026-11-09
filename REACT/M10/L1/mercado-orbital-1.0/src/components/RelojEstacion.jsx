import { useState, useEffect } from "react";

// ===== INICIO · Solución Tarea, Ticket 2 =====
// Hora de la estación, se actualiza cada segundo
function RelojEstacion() {
    const [hora, setHora] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => {
            setHora(new Date());
        }, 1000);

        // Ticket 3: con StrictMode, al cargar se apaga el primer intervalo y queda uno solo
        return () => clearInterval(id);
    }, []);

    return <p className="reloj">Hora de la estación: {hora.toLocaleTimeString()}</p>;
}
// ===== FIN · Tarea, Ticket 2 =====

export default RelojEstacion;
