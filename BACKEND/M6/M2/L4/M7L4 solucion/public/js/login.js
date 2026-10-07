// Responsabilidad: Gestionar el envío de credenciales de inicio de sesión y almacenar el pase JWT en el navegador.

let formularioLogin = document.getElementById('formularioLogin');
let mensajeAlerta = document.getElementById('mensajeAlerta');

let mostrarAlerta = (mensaje, esError = true) => {
  mensajeAlerta.textContent = mensaje;
  mensajeAlerta.className = `alerta ${esError ? 'alerta-error' : 'alerta-exito'}`;
  mensajeAlerta.style.display = 'block';
};

formularioLogin.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  let correo = document.getElementById('correo').value.trim();
  let clave = document.getElementById('clave').value;

  try {
    // Enviamos las credenciales al endpoint de autenticación
    let respuesta = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, clave })
    });

    let datos = await respuesta.json();

    if (!respuesta.ok) {
      mostrarAlerta(datos.error || 'Fallo en la autenticación del piloto');
      return;
    }

    // Persistimos el token en localStorage para enviarlo en las cabeceras Authorization de las peticiones subsiguientes
    localStorage.setItem('token_hangar', datos.token);
    localStorage.setItem('piloto_hangar', JSON.stringify(datos.piloto));

    mostrarAlerta('Credenciales validadas. Ingresando al hangar...', false);

    // Redirigimos al panel de control una vez asegurado el pase de acceso
    setTimeout(() => {
      window.location.href = 'hangar.html';
    }, 800);
  } catch (error) {
    mostrarAlerta('No se pudo conectar con la terminal de mando del servidor');
  }
});
