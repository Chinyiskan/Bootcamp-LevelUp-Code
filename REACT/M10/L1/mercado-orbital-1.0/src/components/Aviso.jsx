// Ya viene listo. Si el mensaje está vacío, no pinta nada.
function Aviso({ mensaje }) {
    if (mensaje === "") return null;

    return <div className="aviso" role="status">{mensaje}</div>;
}

export default Aviso;
