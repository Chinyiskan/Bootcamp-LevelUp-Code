// 1. SELECCIÓN DE ELEMENTOS DEL DOM (Document Object Model)
// Usamos `document.querySelector` para "conectar" nuestro código JavaScript con los elementos de HTML.
// Guardamos estos elementos en constantes (const) para usarlos más tarde.
// Aquí seleccionamos el botón por su ID '#' y el título por su etiqueta.
const boton = document.querySelector('#btn-mode');
const titulo = document.querySelector('h1');

// 2. ESTADO (State)
// El "estado" es la memoria de nuestra aplicación. Son datos que pueden cambiar con el tiempo.
// Usamos una variable `let` porque su valor va a cambiar (de falso a verdadero y viceversa).
// `encendido = false` significa que empezamos con el "Modo Oscuro" apagado (tema claro).
let encendido = false;

// 3. OYENTE DE EVENTOS (Event Listener)
// `addEventListener` es como poner un "oído" atento al elemento.
// Le decimos: "Cuando el usuario haga 'click', ejecuta esta función flecha () => { ... }".
boton.addEventListener('click', () => {
  
  // 4. LÓGICA BASADA EN EL ESTADO
  // Preguntamos: "¿Está el modo oscuro apagado actualmente?"
  if (encendido === false) {
    // === BLOQUE PARA ENCENDER EL MODO OSCURO ===
    
    // CAMBIOS EN EL DOM (VISUALES)
    // Cambiamos el color de fondo de todo el cuerpo (body) a un gris oscuro.
    document.body.style.backgroundColor = '#212529';

    // Cambiamos el texto del título y su color.
    titulo.innerText = 'Modo Encendido 🌙';
    titulo.style.color = 'white';

    // Modificamos el botón: cambiamos su texto y sus clases de Bootstrap.
    // .classList nos permite manipular las clases CSS del elemento.
    boton.innerText = 'Apagar';
    boton.classList.remove('btn-dark'); // Quitamos estilo oscuro del botón
    boton.classList.add('btn-light');   // Agregamos estilo claro para contraste

    // 5. ACTUALIZACIÓN DEL ESTADO
    // Es CRUCIAL actualizar el estado. Ahora `encendido` es verdadero.
    // La próxima vez que hagamos clic, entrará en el 'else'.
    encendido = true;

  } else {
    // === BLOQUE PARA APAGAR EL MODO OSCURO (VOLVER A CLARO) ===
    // Si `encendido` NO es falso (es decir, es verdadero), entramos aquí.

    // Restauramos el fondo blanco
    document.body.style.backgroundColor = 'white';

    // Restauramos título original
    titulo.innerText = 'Modo Apagado 🌞';
    titulo.style.color = 'black';

    // Restauramos botón original
    boton.innerText = 'Encender';
    boton.classList.remove('btn-light');
    boton.classList.add('btn-dark');

    // Actualizamos el estado nuevamente a apagado.
    encendido = false;
  }
});

