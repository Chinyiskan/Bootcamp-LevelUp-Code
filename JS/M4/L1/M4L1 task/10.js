// Ejercicio 10: ¿Cuántos días?

function diasEntre(fecha1, fecha2) {
  // Las fechas vienen como un texto separado por /
  // Usamos split para cortarlas en pedacitos: [día, mes, año]
  let trozos1 = fecha1.split("/");
  let trozos2 = fecha2.split("/");

  // Creamos objetos Date (muy útiles para el tiempo)
  // ¡Ojo! El mes en JavaScript empieza a contar en 0, no en 1.
  let fechaInicio = new Date(trozos1[2], trozos1[1] - 1, trozos1[0]);
  let fechaFin = new Date(trozos2[2], trozos2[1] - 1, trozos2[0]);

  // Si restamos dos fechas obtenemos los milisegundos de diferencia
  let milisegundos = fechaFin - fechaInicio;

  // Ahora pasamos de milisegundos a días usando multiplicaciones
  // 1000ms = 1s, 60s = 1m, 60m = 1h, 24h = 1d
  let dias = milisegundos / (1000 * 60 * 60 * 24);

  // Puede que hayamos restado al revés y nos dé negativo
  // Math.abs lo soluciona dejando siempre el número positivo!
  let respuesta = Math.abs(dias);

  return respuesta;
}

// Comprobando con los ejemplos que nos dejaron
console.log("Días entre 01/01/2024 y 15/03/2024: " + diasEntre("01/01/2024", "15/03/2024"));
console.log("Días entre 15/03/2024 y 01/01/2024: " + diasEntre("15/03/2024", "01/01/2024"));
