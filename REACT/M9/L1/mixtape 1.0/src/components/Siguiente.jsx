// Home Challenge, Bonus.
// Es un componente aparte que trae sus propios datos con import:
// cada componente importa lo que necesita, no tiene que recibirlo de TarjetaCancion.
import { siguienteTitulo, siguienteArtista } from "../data/cancion.js";

function Siguiente() {
    return (
        <p className="siguiente">
            Sigue: {siguienteTitulo} — {siguienteArtista}
        </p>
    );
}

export default Siguiente;
