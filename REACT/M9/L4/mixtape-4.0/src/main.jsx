import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./estilos-l2.css";
import "./estilos-l3.css";
import "./estilos-l4.css";
// Tarea: estilos propios de la cabina (paleta, componente propio y pulido). Van al final para que ganen.
import "./estilos-cabina.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
