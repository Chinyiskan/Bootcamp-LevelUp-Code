// Responsabilidad: Procesar la inscripción de nuevos pilotos y gestionar la redirección al portal de ingreso.

let formularioRegistro = document.getElementById('formularioRegistro');
let mensajeAlerta = document.getElementById('mensajeAlerta');

let mostrarAlerta = (mensaje, esError = true) => {
  mensajeAlerta.textContent = mensaje;
  mensajeAlerta.className = `alerta ${esError ? 'alerta-error' : 'alerta-exito'}`;
  mensajeAlerta.style.display = 'block';
};

formularioRegistro.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  let nombre = document.getElementById('nombre').value.trim();
  let correo = document.getElementById('correo').value.trim();
  let clave = document.getElementById('clave').value;

  if (clave.length < 6) {
    mostrarAlerta('La clave de seguridad debe contener al menos 6 caracteres');
    return;
  }

  try {
    // Enviamos los datos para crear el registro de piloto con rol predeterminado 'piloto'
    let respuesta = await fetch('/auth/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, correo, clave })
    });

    let datos = await respuesta.json();

    if (!respuesta.ok) {
      mostrarAlerta(datos.error || 'Error al procesar el registro del piloto');
      return;
    }

    mostrarAlerta('¡Registro completado con éxito! Redirigiendo al acceso...', false);

    // Redirigimos al login tras una breve confirmación visual
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1200);
  } catch (error) {
    mostrarAlerta('Error de comunicación con el centro de reclutamiento');
  }
});
