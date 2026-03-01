function simularAhorro() {
  const meta = Number(document.getElementById("meta").value);
  const historial = document.getElementById("historial");
  historial.innerHTML = "";

  let ahorros = 0;
  let mes = 1;
  const ahorroPorMes = 500;

  while (ahorros < meta) {
    ahorros += ahorroPorMes;
    const item = document.createElement("li");
    item.textContent = "Mes " + mes + ": $" + ahorros + " ahorrados";
    historial.appendChild(item);
    mes++;
  }

  const final = document.createElement("li");
  final.textContent = "🎯 ¡Meta alcanzada en " + (mes - 1) + " meses!";
  final.style.fontWeight = "bold";
  historial.appendChild(final);
}
// 👆 No sabemos cuántos meses necesitaremos: perfecto para while.
// Si el usuario pone $500, termina en 1 mes. Si pone $2500, en 5.
// El bucle se adapta solo a la condición.