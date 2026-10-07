// Responsabilidad: Gestionar el registro de pilotos, la autenticación mediante contraseñas cifradas y la emisión de tokens JWT.

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import supabase from '../config/supabaseClient.js';

// Controlador para dar de alta un nuevo piloto en el sistema del hangar
export let registrarPiloto = async (req, res) => {
  let { nombre, correo, clave } = req.body;

  // Validación temprana para no procesar datos incompletos en el servidor
  if (!nombre || !correo || !clave) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios (nombre, correo, clave)' });
  }

  try {
    // Verificamos si el correo ya está en uso para evitar duplicados en la base de datos
    // TICKET 6
    // Usamos select explícito para nunca traer campos confidenciales innecesarios
    let { data: pilotoExistente } = await supabase
      .from('pilotos')
      .select('id, nombre, correo, rol')
      .eq('correo', correo.toLowerCase().trim())
      .single();

    if (pilotoExistente) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado por otro piloto' });
    }

    // Ciframos la contraseña con salting (factor de costo 10) para proteger la identidad del usuario ante filtraciones
    let claveHasheada = await bcrypt.hash(clave, 10);

    // Todo piloto nuevo inicia con el rango básico de "piloto" por principio de menor privilegio
    // TICKET 6
    // Explicitamos las columnas a retornar para no devolver el hash de la clave bajo ninguna circunstancia
    let { data: nuevoPiloto, error: errorInsertar } = await supabase
      .from('pilotos')
      .insert([
        {
          nombre: nombre.trim(),
          correo: correo.toLowerCase().trim(),
          clave: claveHasheada,
          rol: 'piloto'
        }
      ])
      .select('id, nombre, correo, rol')
      .single();

    if (errorInsertar) {
      return res.status(500).json({ error: 'Error al registrar al piloto en la base de datos' });
    }

    return res.status(201).json({
      mensaje: 'Piloto registrado exitosamente en el hangar',
      piloto: nuevoPiloto
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor al procesar el registro' });
  }
};

// Controlador para autenticar credenciales y generar el pase de acceso (JWT)
export let iniciarSesion = async (req, res) => {
  let { correo, clave } = req.body;

  if (!correo || !clave) {
    return res.status(400).json({ error: 'Se requiere correo y clave para ingresar al hangar' });
  }

  try {
    // Obtenemos únicamente las columnas necesarias para validar la autenticación y emitir el payload del token
    let { data: piloto, error: errorConsulta } = await supabase
      .from('pilotos')
      .select('id, nombre, correo, clave, rol')
      .eq('correo', correo.toLowerCase().trim())
      .single();

    // Mensaje de error genérico para no filtrar si el correo existe o no en el sistema (evita enumeración de usuarios)
    if (errorConsulta || !piloto) {
      return res.status(401).json({ error: 'Credenciales inválidas: correo o clave incorrectos' });
    }

    // Comparamos el texto plano con el hash almacenado usando tiempo constante para prevenir ataques de temporización
    let claveValida = await bcrypt.compare(clave, piloto.clave);
    if (!claveValida) {
      return res.status(401).json({ error: 'Credenciales inválidas: correo o clave incorrectos' });
    }

    // Incluimos en el payload los datos esenciales que requerirán los middlewares de autorización
    let payload = {
      id: piloto.id,
      nombre: piloto.nombre,
      rol: piloto.rol
    };

    // Firmamos el token con una expiración de 24h para limitar la ventana de exposición en caso de robo del token
    let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

    return res.status(200).json({
      mensaje: 'Autenticación exitosa. Bienvenido al Hangar.',
      token,
      piloto: {
        id: piloto.id,
        nombre: piloto.nombre,
        correo: piloto.correo,
        rol: piloto.rol
      }
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor al iniciar sesión' });
  }
};

// Controlador para consultar el perfil del piloto autenticado
export let obtenerPerfil = async (req, res) => {
  try {
    // TICKET 6
    // Consultamos el registro del piloto garantizando que el campo 'clave' nunca viaje hacia el cliente
    let { data: piloto, error } = await supabase
      .from('pilotos')
      .select('id, nombre, correo, rol')
      .eq('id', req.piloto.id)
      .single();

    if (error || !piloto) {
      return res.status(404).json({ error: 'Piloto no encontrado en el sistema' });
    }

    return res.status(200).json({ piloto });
  } catch (error) {
    return res.status(500).json({ error: 'Error al consultar la información del piloto' });
  }
};
