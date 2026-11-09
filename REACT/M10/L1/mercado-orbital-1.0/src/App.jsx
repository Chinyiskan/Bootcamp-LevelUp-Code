import { useState, useEffect } from "react";
import Encabezado from "./components/Encabezado.jsx";
import TarjetaProducto from "./components/TarjetaProducto.jsx";
import PanelCarrito from "./components/PanelCarrito.jsx";
import Aviso from "./components/Aviso.jsx";
import OfertaRelampago from "./components/OfertaRelampago.jsx";
import { productos } from "./data/productos.js";

function App() {
    // Estado de la tienda (ya viene listo)
    const [carrito, setCarrito] = useState([]);
    const [aviso, setAviso] = useState("");
    const [carritoAbierto, setCarritoAbierto] = useState(false);

    // Valores calculados a partir del carrito (ya vienen listos)
    const totalUnidades = carrito.reduce((suma, item) => suma + item.cantidad, 0);
    const totalPrecio = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

    // Si el producto ya está en el carrito, le sube la cantidad; si no, lo agrega con cantidad 1
    function agregarAlCarrito(producto) {
        const yaEsta = carrito.some((item) => item.id === producto.id);

        if (yaEsta) {
            setCarrito(carrito.map((item) =>
                item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
            ));
        } else {
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }

        setAviso(`Agregaste ${producto.nombre} al carrito`);
    }

    function quitarDelCarrito(id) {
        setCarrito(carrito.filter((item) => item.id !== id));
    }

    // ===== INICIO · Solución Clase, Ticket 1 =====
    // La pestaña muestra cuántas unidades hay en el carrito
    useEffect(() => {
        document.title = `(${totalUnidades}) Mercado Orbital`;
    }, [totalUnidades]);
    // ===== FIN · Clase, Ticket 1 =====

    // ===== INICIO · Solución Clase, Ticket 2 =====
    // El aviso se borra solo a los 2,5 segundos
    useEffect(() => {
        if (aviso === "") return;

        const id = setTimeout(() => {
            setAviso("");
        }, 2500);

        return () => clearTimeout(id);
    }, [aviso]);
    // ===== FIN · Clase, Ticket 2 =====

    // ===== INICIO · Solución Clase, Ticket 3 =====
    // La tecla Escape cierra el panel del carrito
    useEffect(() => {
        function manejarTecla(e) {
            if (e.key === "Escape") {
                setCarritoAbierto(false);
            }
        }

        window.addEventListener("keydown", manejarTecla);

        return () => window.removeEventListener("keydown", manejarTecla);
    }, []);
    // ===== FIN · Clase, Ticket 3 =====

    // ===== INICIO · Solución Clase, Extra =====
    // La tecla C abre y cierra el carrito. Lee carritoAbierto, así que va en el arreglo
    useEffect(() => {
        function alternarConC(e) {
            if (e.key === "c" || e.key === "C") {
                setCarritoAbierto(!carritoAbierto);
            }
        }

        window.addEventListener("keydown", alternarConC);

        return () => window.removeEventListener("keydown", alternarConC);
    }, [carritoAbierto]);
    // ===== FIN · Clase, Extra =====

    return (
        <div className="app">
            <Encabezado
                totalUnidades={totalUnidades}
                onAbrirCarrito={() => setCarritoAbierto(true)}
            />

            <section className="bienvenida">
                <img src="/img/nova-tienda.png" alt="Nova en el mostrador del Mercado Orbital" />
                <div>
                    <h2>Bienvenido al puesto de Nova</h2>
                    <p>Repuestos revisados uno por uno en el hangar. Si algo falla, Kuma lo arregla.</p>
                </div>
            </section>

            {/* Tarea, Ticket 1 */}
            <OfertaRelampago />

            <main className="catalogo">
                {productos.map((producto) => (
                    <TarjetaProducto
                        key={producto.id}
                        producto={producto}
                        onAgregar={agregarAlCarrito}
                    />
                ))}
            </main>

            <Aviso mensaje={aviso} />

            {carritoAbierto && (
                <PanelCarrito
                    items={carrito}
                    total={totalPrecio}
                    onCerrar={() => setCarritoAbierto(false)}
                    onQuitar={quitarDelCarrito}
                />
            )}
        </div>
    );
}

export default App;
