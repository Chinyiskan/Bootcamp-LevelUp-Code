function generarTabla() {
  const limite = Number(document.getElementById("limite").value);
  const lista = document.getElementById("resultado");
  lista.innerHTML = ""; // Limpiamos antes de cada ejecución

  for (let i = 1; i <= limite; i++) {
    const item = document.createElement("li");
    item.textContent = "3 x " + i + " = " + (3 * i);
    lista.appendChild(item);
  }
}
