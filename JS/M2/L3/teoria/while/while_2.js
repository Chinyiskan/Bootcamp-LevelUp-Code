// break corta el bucle inmediatamente, aunque la condición siga siendo true.

let intentos = 0;
const clave = 1234;

while (true) { // Bucle "infinito"... en apariencia
  intentos++;
  let intento = Math.floor(Math.random() * 9999);
  console.log("Intento " + intentos + ": probando " + intento);

  if (intento === clave) {
    console.log("🔓 ¡Clave encontrada en " + intentos + " intentos!");
    break; // Aquí la fábrica para la línea.
  }

  if (intentos >= 20) {
    console.log("🔒 Demasiados intentos. Sistema bloqueado.");
    break;
  }
}
