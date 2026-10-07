// Cada componente vive en su archivo; App solo los junta.
import Encabezado from "./components/Encabezado.jsx";
import TarjetaCancion from "./components/TarjetaCancion.jsx";
import PiePagina from "./components/PiePagina.jsx";

function App() {
    return (
        <main className="app">
            <Encabezado />
            <TarjetaCancion />
            {/* Home Challenge, Ticket 1: debajo de la tarjeta, dentro del main */}
            <PiePagina />
        </main>
    );
}

export default App;
