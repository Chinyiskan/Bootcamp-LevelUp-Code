// Responsabilidad: Gestionar el CRUD de unidades mechas y aplicar las reglas de autorización por propiedad y por rol.

import supabase from '../config/supabaseClient.js';

// TICKET 1
// Crear una nueva mecha asignando la propiedad obligatoriamente al piloto autenticado
export let crearMecha = async (req, res) => {
  let { nombre, clase, potencia, blindaje, velocidad } = req.body;

  // Validamos que los datos indispensables vengan en la petición
  if (!nombre || !clase || potencia === undefined || blindaje === undefined || velocidad === undefined) {
    return res.status(400).json({
      error: 'Datos incompletos: se requiere nombre, clase, potencia, blindaje y velocidad'
    });
  }

  // Restringimos las clases permitidas para mantener la consistencia del hangar
  let clasesValidas = ['Asalto', 'Brawler', 'Sigilo', 'Sniper', 'Soporte'];
  if (!clasesValidas.includes(clase)) {
    return res.status(400).json({
      error: 'Clase inválida. Las clases permitidas son: Asalto, Brawler, Sigilo, Sniper o Soporte'
    });
  }

  // Convertimos a enteros y validamos el rango operacional 1-100
  let pot = parseInt(potencia);
  let bli = parseInt(blindaje);
  let vel = parseInt(velocidad);

  if (isNaN(pot) || isNaN(bli) || isNaN(vel) || pot < 1 || pot > 100 || bli < 1 || bli > 100 || vel < 1 || vel > 100) {
    return res.status(400).json({
      error: 'Las estadísticas (potencia, blindaje, velocidad) deben ser números enteros entre 1 y 100'
    });
  }

  try {
    // Por regla estricta de seguridad, el piloto_id SIEMPRE se extrae de req.piloto.id (token verificado)
    // Jamás confiamos en un ID enviado en req.body para evitar vulnerabilidades de asignación masiva o suplantación
    let { data: nuevaMecha, error } = await supabase
      .from('mechas')
      .insert([
        {
          piloto_id: req.piloto.id,
          nombre: nombre.trim(),
          clase,
          potencia: pot,
          blindaje: bli,
          velocidad: vel
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: 'Error al registrar la mecha en la base de datos' });
    }

    return res.status(201).json({
      mensaje: 'Mecha construida y desplegada en tu hangar',
      mecha: nuevaMecha
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor al crear la mecha' });
  }
};

// TICKET 2
// Listar únicamente las mechas que pertenecen al piloto que inició sesión
export let listarMisMechas = async (req, res) => {
  try {
    // Aislamos los datos a nivel de consulta: el filtro se aplica con el ID del token verificado
    let { data: mechas, error } = await supabase
      .from('mechas')
      .select('*')
      .eq('piloto_id', req.piloto.id)
      .order('id', { ascending: true });

    if (error) {
      return res.status(500).json({ error: 'Error al consultar las mechas de tu hangar' });
    }

    return res.status(200).json({
      total: mechas.length,
      mechas
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor al obtener tus mechas' });
  }
};

// TICKET 3
// Modificar una mecha previa verificación estricta de propiedad
export let actualizarMecha = async (req, res) => {
  let { id } = req.params;
  let { nombre, clase, potencia, blindaje, velocidad } = req.body;

  try {
    // Paso 1: Consultamos la mecha existente para verificar quién es su legítimo dueño
    let { data: mecha, error: errorBusqueda } = await supabase
      .from('mechas')
      .select('*')
      .eq('id', id)
      .single();

    // Si el registro no existe o pertenece a otro piloto, emitimos el mismo error 403 genérico
    // Esto evita que un atacante descubra qué IDs existen en la base de datos (prevención de enumeración de recursos)
    if (errorBusqueda || !mecha || String(mecha.piloto_id) !== String(req.piloto.id)) {
      return res.status(403).json({ error: 'No tienes permiso para modificar esta mecha' });
    }

    // Paso 2: Construimos los datos a actualizar validando campos presentes
    let datosActualizar = {};

    if (nombre !== undefined) datosActualizar.nombre = nombre.trim();
    if (clase !== undefined) {
      let clasesValidas = ['Asalto', 'Brawler', 'Sigilo', 'Sniper', 'Soporte'];
      if (!clasesValidas.includes(clase)) {
        return res.status(400).json({ error: 'Clase inválida. Opciones: Asalto, Brawler, Sigilo, Sniper o Soporte' });
      }
      datosActualizar.clase = clase;
    }

    if (potencia !== undefined) {
      let pot = parseInt(potencia);
      if (isNaN(pot) || pot < 1 || pot > 100) {
        return res.status(400).json({ error: 'Potencia debe ser un número entero entre 1 y 100' });
      }
      datosActualizar.potencia = pot;
    }

    if (blindaje !== undefined) {
      let bli = parseInt(blindaje);
      if (isNaN(bli) || bli < 1 || bli > 100) {
        return res.status(400).json({ error: 'Blindaje debe ser un número entero entre 1 y 100' });
      }
      datosActualizar.blindaje = bli;
    }

    if (velocidad !== undefined) {
      let vel = parseInt(velocidad);
      if (isNaN(vel) || vel < 1 || vel > 100) {
        return res.status(400).json({ error: 'Velocidad debe ser un número entero entre 1 y 100' });
      }
      datosActualizar.velocidad = vel;
    }

    // Paso 3: Ejecutamos el update solo tras haber superado la validación de propiedad
    let { data: mechaActualizada, error: errorUpdate } = await supabase
      .from('mechas')
      .update(datosActualizar)
      .eq('id', id)
      .select()
      .single();

    if (errorUpdate) {
      return res.status(500).json({ error: 'Error al actualizar los componentes de la mecha' });
    }

    return res.status(200).json({
      mensaje: 'Mecha reconfigurada exitosamente en tu hangar',
      mecha: mechaActualizada
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor al actualizar la mecha' });
  }
};

// TICKET 4
// Desmantelar (eliminar) una mecha previa verificación estricta de propiedad
export let eliminarMecha = async (req, res) => {
  let { id } = req.params;

  try {
    // Paso 1: Consultamos la mecha en la base de datos para inspeccionar el campo piloto_id
    let { data: mecha, error: errorBusqueda } = await supabase
      .from('mechas')
      .select('*')
      .eq('id', id)
      .single();

    // Verificamos propiedad: si no existe o el dueño no coincide con el token, rechazamos con 403
    if (errorBusqueda || !mecha || String(mecha.piloto_id) !== String(req.piloto.id)) {
      return res.status(403).json({ error: 'No tienes permiso para desmantelar esta mecha' });
    }

    // Paso 2: Ejecutamos la eliminación de forma segura
    let { error: errorDelete } = await supabase
      .from('mechas')
      .delete()
      .eq('id', id);

    if (errorDelete) {
      return res.status(500).json({ error: 'Error al desmantelar la mecha de la base de datos' });
    }

    return res.status(200).json({
      mensaje: 'Mecha desmantelada exitosamente de tu hangar'
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor al eliminar la mecha' });
  }
};

// TICKET 5
// Listar todas las mechas de la base estelar (acceso reservado exclusivamente al comandante)
export let listarTodasMechas = async (req, res) => {
  try {
    // Control de acceso basado en roles (RBAC): solo un piloto con rol "comandante" puede supervisar toda la flota
    if (req.piloto.rol !== 'comandante') {
      return res.status(403).json({
        error: 'Acceso restringido: se requiere rango de Comandante para ver la flota completa'
      });
    }

    // TICKET 6
    // Al traer información del piloto asociado a cada mecha, explicitamos columnas seguras sin exponer la clave
    let { data: todasLasMechas, error } = await supabase
      .from('mechas')
      .select(`
        id,
        piloto_id,
        nombre,
        clase,
        potencia,
        blindaje,
        velocidad,
        pilotos:piloto_id (
          id,
          nombre,
          correo,
          rol
        )
      `)
      .order('id', { ascending: true });

    if (error) {
      return res.status(500).json({ error: 'Error al consultar la flota global de mechas' });
    }

    return res.status(200).json({
      total: todasLasMechas.length,
      flota: todasLasMechas
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor al listar la flota completa' });
  }
};
