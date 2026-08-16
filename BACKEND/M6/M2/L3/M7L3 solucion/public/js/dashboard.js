// Panel: si hay token, pide el perfil protegido; si no, devuelve al login.
const mensaje = document.getElementById('mensaje');
const token = localStorage.getItem('token');

// Sin token no hay sesión válida: directamente al login.
if (!token) {
  window.location.href = 'login.html';
}

const cargarPerfil = async (token) => {
  try {
    const respuesta = await fetch('/perfil', {
      method: 'GET',
      headers: {
        // El backend espera el formato "Bearer <token>".
        Authorization: `Bearer ${token}`,
      },
    });

    if (!respuesta.ok) {
      // Token inválido o vencido: limpiar y volver al login.
      localStorage.removeItem('token');
      window.location.href = 'login.html';
      return;
    }

    const datos = await respuesta.json();
    mensaje.textContent = `${datos.mensaje}, ${datos.nombre}`;
    mensaje.className = 'mensaje exito';
  } catch (error) {
    mensaje.textContent = 'Error de conexión con el servidor';
    mensaje.className = 'mensaje error';
  }
};

if (token) {
  cargarPerfil(token);
}