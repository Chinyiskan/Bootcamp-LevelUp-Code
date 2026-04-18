// Ejercicio 7: ¿Dónde está el robot?

function moverRobot(pasos) {
  let x = 0;
  let y = 0;
  
  // Empezamos mirando al norte
  // Usamos números para nuestra brújula mental:
  // 0 = Norte (suma en Y)
  // 1 = Oeste (resta en X)
  // 2 = Sur (resta en Y)
  // 3 = Este (suma en X)
  let direccion = 0; 

  for (let i = 0; i < pasos.length; i++) {
    let paso = pasos[i]; // El número de pasos en esta instrucción

    // Dependiendo hacia dónde miramos, sabemos en qué eje movernos
    if (direccion === 0) {
      y += paso;
    } else if (direccion === 1) {
      x -= paso; 
    } else if (direccion === 2) {
      y -= paso; 
    } else if (direccion === 3) {
      x += paso; 
    }

    // El robot gira a la izquierda (antihorario) para la próxima
    // Hacemos +1 pero le sacamos el resto de 4 para que no pase del 3 y vuelva al 0
    direccion = (direccion + 1) % 4;
  }

  console.log("El robot terminó en -> X: " + x + ", Y: " + y);
  return {x: x, y: y};
}

// Probamos con el ejemplo del README
moverRobot([10, 5, -2]); 
