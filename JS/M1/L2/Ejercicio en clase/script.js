// ====================================================
// 🎮 GENERADOR DE PERFIL GAMER
// ====================================================
// Este script lee datos del formulario y genera
// un perfil personalizado con información del usuario
// ====================================================

// ============================================
// PASO 1: SELECCIONAR ELEMENTOS DEL DOM
// ============================================
// Usamos querySelector para conectar con los elementos HTML

// Seleccionamos el botón
const botonGenerar = document.querySelector('#btn-generar');

// Seleccionamos los inputs del formulario
const inputNombre = document.querySelector('#nombre');
const selectRango = document.querySelector('#rango');
const inputClan = document.querySelector('#clan');

// Seleccionamos la card donde aparecerá el resultado
const cardResultado = document.querySelector('#resultado');


// ============================================
// PASO 2: EVENT LISTENER - ESCUCHAR EL CLICK
// ============================================
// Cuando el usuario haga click en "Generar Perfil"

botonGenerar.addEventListener('click', () => {

  // ============================================
  // PASO 3: LEER LOS VALORES DE LOS INPUTS
  // ============================================
  // Usamos .value para obtener lo que el usuario escribió

  const nombre = inputNombre.value;      // Lo que escribió en el nombre
  const rango = selectRango.value;       // La opción que seleccionó
  const clan = inputClan.value;          // Lo que escribió en el clan


  // ============================================
  // PASO 4: VALIDACIÓN - VERIFICAR CAMPOS VACÍOS
  // ============================================
  // Antes de generar el perfil, verificamos que TODO esté lleno

  // Verificamos si el nombre está vacío
  if (nombre === '') {
    cardResultado.innerHTML = `
      <div class="card-body text-center">
        <p style="color: #e74c3c; font-weight: 600;">⚠️ ¡Atención!</p>
        <p>Por favor, escribe tu nombre</p>
      </div>
    `;
    return;  // Detenemos el código aquí
  }

  // Verificamos si NO seleccionó un rango
  if (rango === '') {
    cardResultado.innerHTML = `
      <div class="card-body text-center">
        <p style="color: #e74c3c; font-weight: 600;">⚠️ ¡Atención!</p>
        <p>Por favor, selecciona tu rango</p>
      </div>
    `;
    return;  // Detenemos el código aquí
  }

  // Verificamos si el clan está vacío
  if (clan === '') {
    cardResultado.innerHTML = `
      <div class="card-body text-center">
        <p style="color: #e74c3c; font-weight: 600;">⚠️ ¡Atención!</p>
        <p>Por favor, escribe tu clan</p>
      </div>
    `;
    return;  // Detenemos el código aquí
  }


  // ============================================
  // PASO 5: DETERMINAR EL EMOJI SEGÚN EL RANGO
  // ============================================
  // Usamos if/else para asignar un emoji diferente a cada rango

  let emoji = '';  // Variable que guardará el emoji

  if (rango === 'bronce') {
    emoji = '🥉';
  }

  if (rango === 'plata') {
    emoji = '🥈';
  }

  if (rango === 'oro') {
    emoji = '🥇';
  }


  // ============================================
  // PASO 6: CONSTRUIR EL MENSAJE CON TEMPLATE STRINGS
  // ============================================
  // Usamos backticks (`) y ${} para crear un mensaje dinámico

  const mensaje = `
    <div class="profile-content">
      <div class="rank-emoji">${emoji}</div>
      <h2 class="profile-title">¡Bienvenido, Guerrero ${nombre}!</h2>
      <p class="profile-message">
        Tu rango <strong>${rango.toUpperCase()}</strong> es vital para el clan <strong>${clan}</strong>
      </p>
    </div>
  `;


  // ============================================
  // PASO 7: MOSTRAR EL RESULTADO EN LA CARD
  // ============================================
  // Usamos innerHTML para insertar nuestro HTML dinámico

  cardResultado.innerHTML = mensaje;


  // ============================================
  // PASO 8: CAMBIAR EL ESTILO SEGÚN EL RANGO
  // ============================================
  // Primero quitamos todas las clases de rango anteriores
  cardResultado.classList.remove('bronce');
  cardResultado.classList.remove('plata');
  cardResultado.classList.remove('oro');
  cardResultado.classList.remove('empty');

  // Luego agregamos la clase correspondiente al rango seleccionado
  if (rango === 'bronce') {
    cardResultado.classList.add('bronce');
  }

  if (rango === 'plata') {
    cardResultado.classList.add('plata');
  }

  if (rango === 'oro') {
    cardResultado.classList.add('oro');
  }

});


// ====================================================
// 🎯 CONCEPTOS QUE USAMOS:
// ====================================================
//
// 1. QUERYSELECTOR
//    - Busca y selecciona elementos del HTML por su ID
//    - Ejemplo: document.querySelector('#nombre')
//
// 2. .VALUE
//    - Obtiene el valor que el usuario escribió en un input
//    - Ejemplo: const nombre = inputNombre.value;
//    - También sirve para select (obtiene la opción seleccionada)
//
// 3. TEMPLATE STRINGS (Plantillas de texto)
//    - Se escriben con backticks `texto aquí`
//    - Permiten insertar variables con ${variable}
//    - Ejemplo: `Hola ${nombre}, tu rango es ${rango}`
//    - Son MUY útiles para crear mensajes dinámicos
//
// 4. INNERHTML
//    - Inserta contenido HTML dentro de un elemento
//    - Ejemplo: elemento.innerHTML = '<p>Hola</p>';
//
// 5. IF
//    - Toma decisiones basadas en condiciones
//    - Ejemplo: if (rango === 'oro') { ... }
//    - El triple igual (===) compara si son iguales
//
// 6. RETURN
//    - Detiene la ejecución del código en ese punto
//    - Útil para salir si hay un error
//
// 7. CLASSLIST
//    - .add('clase'): Agrega una clase CSS
//    - .remove('clase'): Quita una clase CSS
//
// ====================================================
// 💡 FLUJO DEL PROGRAMA:
// ====================================================
//
// 1. Usuario llena el formulario
//    ↓
// 2. Usuario hace CLICK en "Generar Perfil"
//    ↓
// 3. JavaScript LEE los valores con .value
//    ↓
// 4. VALIDA cada campo uno por uno
//    → Si falta algo: muestra mensaje y PARA
//    → Si todo está bien: continúa
//    ↓
// 5. DETERMINA el emoji según el rango
//    ↓
// 6. CONSTRUYE el mensaje con template strings
//    ↓
// 7. MUESTRA el mensaje en la card
//    ↓
// 8. CAMBIA el color de la card según el rango
//    ↓
// 9. ¡Listo! El usuario ve su perfil
//
// ====================================================
