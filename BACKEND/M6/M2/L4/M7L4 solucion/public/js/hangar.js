// Responsabilidad: Orquestar la interfaz del hangar, renderizar unidades por clase, gestionar operaciones CRUD y habilitar la vista de Comandante.

let token = localStorage.getItem('token_hangar');
let pilotoGuardado = localStorage.getItem('piloto_hangar');

// Si no hay token de autenticación en almacenamiento local, redirigimos al acceso
if (!token) {
  window.location.href = 'login.html';
}

let pilotoActual = pilotoGuardado ? JSON.parse(pilotoGuardado) : null;
let modoComandanteActivo = false;

// Mapa de imágenes por clase táctica según los assets en public/images/
let mapaImagenesClase = {
  'Asalto': './images/asalto.webp',
  'Brawler': './images/brawler.webp',
  'Sigilo': './images/sigilo.webp',
  'Sniper': './images/sniper.webp',
  'Soporte': './images/soporte.webp'
};

// Referencias a elementos del DOM
let distintivoPiloto = document.getElementById('distintivoPiloto');
let insigniaRol = document.getElementById('insigniaRol');
let btnCerrarSesion = document.getElementById('btnCerrarSesion');
let alertaGlobal = document.getElementById('alertaGlobal');
let tituloVistaActual = document.getElementById('tituloVistaActual');
let contenedorBotonComandante = document.getElementById('contenedorBotonComandante');
let btnVerTodaFlota = document.getElementById('btnVerTodaFlota');
let btnVerMisMechas = document.getElementById('btnVerMisMechas');
let panelDespliegue = document.getElementById('panelDespliegue');
let formularioCrearMecha = document.getElementById('formularioCrearMecha');
let gridMechas = document.getElementById('gridMechas');
let mensajeVacio = document.getElementById('mensajeVacio');

// Modal de edición
let modalEditar = document.getElementById('modalEditar');
let formularioEditarMecha = document.getElementById('formularioEditarMecha');
let btnCancelarEdicion = document.getElementById('btnCancelarEdicion');
let editarIdMecha = document.getElementById('editarIdMecha');
let editarNombre = document.getElementById('editarNombre');
let editarClase = document.getElementById('editarClase');
let editarPotencia = document.getElementById('editarPotencia');
let editarBlindaje = document.getElementById('editarBlindaje');
let editarVelocidad = document.getElementById('editarVelocidad');

// Notificaciones flotantes
let mostrarMensaje = (mensaje, esError = true) => {
  alertaGlobal.textContent = mensaje;
  alertaGlobal.className = `alerta ${esError ? 'alerta-error' : 'alerta-exito'}`;
  alertaGlobal.style.display = 'block';
  setTimeout(() => {
    alertaGlobal.style.display = 'none';
  }, 4000);
};

// Sincronizar datos del perfil y actualizar la interfaz según el rol
let inicializarPerfil = async () => {
  try {
    let respuesta = await fetch('/auth/perfil', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (respuesta.status === 401) {
      localStorage.clear();
      window.location.href = 'login.html';
      return;
    }

    if (respuesta.ok) {
      let datos = await respuesta.json();
      pilotoActual = datos.piloto;
      localStorage.setItem('piloto_hangar', JSON.stringify(pilotoActual));
    }
  } catch (error) {
    console.error('Error al sincronizar perfil con el servidor');
  }

  if (pilotoActual) {
    distintivoPiloto.textContent = `Piloto: ${pilotoActual.nombre}`;
    
    if (pilotoActual.rol === 'comandante') {
      insigniaRol.textContent = 'COMANDANTE';
      insigniaRol.className = 'insignia-rol rol-comandante';
      // Habilitamos el acceso táctico exclusivo para el comandante
      contenedorBotonComandante.style.display = 'flex';
      contenedorBotonComandante.style.gap = '0.5rem';
    } else {
      insigniaRol.textContent = 'PILOTO';
      insigniaRol.className = 'insignia-rol rol-piloto';
    }
  }
};

// Renderizar una tarjeta individual vertical de mecha con efecto 3D flip al hover
let crearTarjetaHTML = (mecha, esVistaFlotaCompleta = false) => {
  let claseCss = `clase-${mecha.clase}`;
  let etiquetaCss = `etiqueta-${mecha.clase}`;
  let rutaImagen = mapaImagenesClase[mecha.clase] || './images/asalto.webp';

  let infoPilotoHTML = '';
  if (esVistaFlotaCompleta && mecha.pilotos) {
    let nombrePiloto = mecha.pilotos.nombre || (Array.isArray(mecha.pilotos) && mecha.pilotos[0] ? mecha.pilotos[0].nombre : 'Desconocido');
    let correoPiloto = mecha.pilotos.correo || (Array.isArray(mecha.pilotos) && mecha.pilotos[0] ? mecha.pilotos[0].correo : '');
    infoPilotoHTML = `
      <div class="piloto-propietario" style="display: flex; align-items: center; gap: 0.4rem;">
        <svg class="icono icono-sm" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        <span><strong>Piloto:</strong> ${nombrePiloto} ${correoPiloto ? `(${correoPiloto})` : ''}</span>
      </div>
    `;
  }

  // Permitimos editar/borrar solo si el usuario autenticado es el dueño de la mecha
  let esDueno = pilotoActual && String(mecha.piloto_id) === String(pilotoActual.id);
  let botonesAccionHTML = '';

  if (esDueno) {
    botonesAccionHTML = `
      <div class="acciones-tarjeta">
        <button class="btn btn-secundario" style="flex: 1; padding: 0.45rem; gap: 0.35rem; font-size: 0.85rem;" onclick="abrirModalEdicion('${mecha.id}', '${mecha.nombre}', '${mecha.clase}', ${mecha.potencia}, ${mecha.blindaje}, ${mecha.velocidad})">
          <svg class="icono icono-sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          <span>Modificar</span>
        </button>
        <button class="btn btn-peligro" style="flex: 1; padding: 0.45rem; gap: 0.35rem; font-size: 0.85rem;" onclick="confirmarEliminar('${mecha.id}', '${mecha.nombre}')">
          <svg class="icono icono-sm" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          <span>Desmantelar</span>
        </button>
      </div>
    `;
  } else {
    botonesAccionHTML = `
      <div class="acciones-tarjeta" style="display: flex; align-items: center; gap: 0.4rem; justify-content: center;">
        <svg class="icono icono-sm" style="color: var(--texto-secundario);" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        <span style="font-size: 0.75rem; color: var(--texto-secundario); font-style: italic;">
          Unidad de otro piloto (Solo lectura)
        </span>
      </div>
    `;
  }

  let colorBarraClase = `var(--color-${mecha.clase.toLowerCase()})`;

  return `
    <div class="contenedor-tarjeta-flip">
      <div class="tarjeta-flip-inner ${claseCss}">
        
        <!-- Cara Frontal: Imagen, Nombre y Clase -->
        <div class="tarjeta-cara tarjeta-frontal">
          <div class="tarjeta-imagen-wrapper">
            <img src="${rutaImagen}" alt="Mecha clase ${mecha.clase}" class="imagen-mecha" onerror="this.src='./images/asalto.webp'">
            <div class="overlay-gradiente"></div>
            <div class="badge-clase-frontal">
              <span class="etiqueta-clase ${etiquetaCss}">${mecha.clase}</span>
            </div>
          </div>

          <div class="tarjeta-info-frontal">
            <h4 class="nombre-mecha" title="${mecha.nombre}">${mecha.nombre}</h4>
            ${infoPilotoHTML}
            <div class="indicador-flip">
              <svg class="icono icono-sm" viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
              <span>Ver telemetría y stats</span>
            </div>
          </div>
        </div>

        <!-- Cara Trasera: Telemetría, Stats y Acciones -->
        <div class="tarjeta-cara tarjeta-trasera">
          <div>
            <div class="cabecera-trasera">
              <div>
                <span class="etiqueta-clase ${etiquetaCss}">${mecha.clase}</span>
                <h4 class="nombre-mecha-trasero" title="${mecha.nombre}">${mecha.nombre}</h4>
              </div>
              <div class="badge-hud">HUD TÁCTICO</div>
            </div>

            <div class="lista-stats">
              <div class="fila-stat">
                <div class="etiquetas-stat">
                  <span>Potencia de Fuego</span>
                  <span class="stat-valor">${mecha.potencia}%</span>
                </div>
                <div class="barra-fondo">
                  <div class="barra-progreso" style="width: ${mecha.potencia}%; background: ${colorBarraClase};"></div>
                </div>
              </div>

              <div class="fila-stat">
                <div class="etiquetas-stat">
                  <span>Blindaje de Casco</span>
                  <span class="stat-valor">${mecha.blindaje}%</span>
                </div>
                <div class="barra-fondo">
                  <div class="barra-progreso" style="width: ${mecha.blindaje}%; background: var(--color-soporte);"></div>
                </div>
              </div>

              <div class="fila-stat">
                <div class="etiquetas-stat">
                  <span>Velocidad de Propulsión</span>
                  <span class="stat-valor">${mecha.velocidad}%</span>
                </div>
                <div class="barra-fondo">
                  <div class="barra-progreso" style="width: ${mecha.velocidad}%; background: var(--color-acento);"></div>
                </div>
              </div>
            </div>
          </div>

          <div>
            ${esVistaFlotaCompleta && !esDueno ? infoPilotoHTML : ''}
            ${botonesAccionHTML}
          </div>
        </div>

      </div>
    </div>
  `;
};

// Cargar las mechas privadas del piloto autenticado (TICKET 2)
let cargarMisMechas = async () => {
  modoComandanteActivo = false;
  tituloVistaActual.textContent = 'Mis Unidades de Combate';
  panelDespliegue.style.display = 'block';
  btnVerTodaFlota.style.display = 'inline-flex';
  btnVerMisMechas.style.display = 'none';

  try {
    let respuesta = await fetch('/mechas', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (respuesta.status === 401) {
      localStorage.clear();
      window.location.href = 'login.html';
      return;
    }

    let datos = await respuesta.json();

    if (!respuesta.ok) {
      mostrarMensaje(datos.error || 'Error al cargar unidades');
      return;
    }

    if (!datos.mechas || datos.mechas.length === 0) {
      gridMechas.innerHTML = '';
      mensajeVacio.style.display = 'block';
      mensajeVacio.textContent = 'Aún no has desplegado ninguna mecha en tu hangar. ¡Construye tu primera unidad arriba!';
      return;
    }

    mensajeVacio.style.display = 'none';
    gridMechas.innerHTML = datos.mechas.map(m => crearTarjetaHTML(m, false)).join('');
  } catch (error) {
    mostrarMensaje('No se pudo conectar con el hangar');
  }
};

// Cargar la flota completa de todos los pilotos (TICKET 5 - Rol Comandante)
let cargarTodaLaFlota = async () => {
  modoComandanteActivo = true;
  tituloVistaActual.textContent = 'Flota Global de la Base Estelar (Vista de Comandante)';
  panelDespliegue.style.display = 'none';
  btnVerTodaFlota.style.display = 'none';
  btnVerMisMechas.style.display = 'inline-flex';

  try {
    let respuesta = await fetch('/mechas/todas', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (respuesta.status === 401) {
      localStorage.clear();
      window.location.href = 'login.html';
      return;
    }

    if (respuesta.status === 403) {
      mostrarMensaje('Acceso denegado: se requiere rango de Comandante');
      cargarMisMechas();
      return;
    }

    let datos = await respuesta.json();

    if (!respuesta.ok) {
      mostrarMensaje(datos.error || 'Error al obtener la flota completa');
      return;
    }

    if (!datos.flota || datos.flota.length === 0) {
      gridMechas.innerHTML = '';
      mensajeVacio.style.display = 'block';
      mensajeVacio.textContent = 'No hay unidades de combate registradas en ningún sector de la base.';
      return;
    }

    mensajeVacio.style.display = 'none';
    gridMechas.innerHTML = datos.flota.map(m => crearTarjetaHTML(m, true)).join('');
  } catch (error) {
    mostrarMensaje('Error al consultar la flota global');
  }
};

// Desplegar nueva mecha (TICKET 1)
formularioCrearMecha.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  let nombre = document.getElementById('nombreMecha').value.trim();
  let clase = document.getElementById('claseMecha').value;
  let potencia = document.getElementById('potenciaMecha').value;
  let blindaje = document.getElementById('blindajeMecha').value;
  let velocidad = document.getElementById('velocidadMecha').value;

  try {
    // Enviamos únicamente los datos de la mecha: el servidor asigna el piloto_id desde el token
    let respuesta = await fetch('/mechas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ nombre, clase, potencia, blindaje, velocidad })
    });

    if (respuesta.status === 401) {
      localStorage.clear();
      window.location.href = 'login.html';
      return;
    }

    let datos = await respuesta.json();

    if (!respuesta.ok) {
      mostrarMensaje(datos.error || 'Error al construir la mecha');
      return;
    }

    mostrarMensaje('¡Unidad mecha construida y desplegada exitosamente!', false);
    formularioCrearMecha.reset();
    document.getElementById('potenciaMecha').value = 75;
    document.getElementById('blindajeMecha').value = 80;
    document.getElementById('velocidadMecha').value = 65;

    cargarMisMechas();
  } catch (error) {
    mostrarMensaje('Fallo de comunicación con la fábrica de mechas');
  }
});

// Modal de edición
window.abrirModalEdicion = (id, nombre, clase, potencia, blindaje, velocidad) => {
  editarIdMecha.value = id;
  editarNombre.value = nombre;
  editarClase.value = clase;
  editarPotencia.value = potencia;
  editarBlindaje.value = blindaje;
  editarVelocidad.value = velocidad;
  modalEditar.style.display = 'flex';
};

btnCancelarEdicion.addEventListener('click', () => {
  modalEditar.style.display = 'none';
});

// Guardar cambios de edición (TICKET 3)
formularioEditarMecha.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  let id = editarIdMecha.value;
  let nombre = editarNombre.value.trim();
  let clase = editarClase.value;
  let potencia = editarPotencia.value;
  let blindaje = editarBlindaje.value;
  let velocidad = editarVelocidad.value;

  try {
    let respuesta = await fetch(`/mechas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ nombre, clase, potencia, blindaje, velocidad })
    });

    if (respuesta.status === 401) {
      localStorage.clear();
      window.location.href = 'login.html';
      return;
    }

    let datos = await respuesta.json();

    if (!respuesta.ok) {
      mostrarMensaje(datos.error || 'No tienes permiso para modificar esta mecha');
      return;
    }

    mostrarMensaje('Mecha reconfigurada con éxito', false);
    modalEditar.style.display = 'none';

    if (modoComandanteActivo) {
      cargarTodaLaFlota();
    } else {
      cargarMisMechas();
    }
  } catch (error) {
    mostrarMensaje('Error al actualizar los sistemas de la mecha');
  }
});

// Desmantelar mecha (TICKET 4)
window.confirmarEliminar = async (id, nombre) => {
  let confirmado = window.confirm(`¿Estás seguro de que deseas desmantelar la unidad "${nombre}"? Esta acción no se puede deshacer.`);
  if (!confirmado) return;

  try {
    let respuesta = await fetch(`/mechas/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (respuesta.status === 401) {
      localStorage.clear();
      window.location.href = 'login.html';
      return;
    }

    let datos = await respuesta.json();

    if (!respuesta.ok) {
      mostrarMensaje(datos.error || 'No tienes permiso para desmantelar esta mecha');
      return;
    }

    mostrarMensaje('Unidad desmantelada del hangar', false);

    if (modoComandanteActivo) {
      cargarTodaLaFlota();
    } else {
      cargarMisMechas();
    }
  } catch (error) {
    mostrarMensaje('Error al procesar la desmantelación');
  }
};

// Eventos de botones de cambio de vista
btnVerTodaFlota.addEventListener('click', cargarTodaLaFlota);
btnVerMisMechas.addEventListener('click', cargarMisMechas);

// Cerrar sesión
btnCerrarSesion.addEventListener('click', () => {
  localStorage.removeItem('token_hangar');
  localStorage.removeItem('piloto_hangar');
  window.location.href = 'login.html';
});

// Inicialización de la aplicación al cargar
(async () => {
  await inicializarPerfil();
  await cargarMisMechas();
})();
