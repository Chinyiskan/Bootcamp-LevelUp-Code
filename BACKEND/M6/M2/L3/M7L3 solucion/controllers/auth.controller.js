// Lógica de registro, login y perfil: cada controlador cumple una sola responsabilidad.
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabaseClient');

// ✅ YA IMPLEMENTADO — úsalo como guía para completar iniciarSesion
// POST /registro — dado nombre, correo y clave, crea un recluta con su clave hasheada.
const registrarRecluta = async (req, res) => {
  const { nombre, correo, clave } = req.body;

  // Nunca guardar la clave en texto plano: el hash protege al recluta ante filtraciones.
  const hashClave = await bcrypt.hash(clave, 10);

  const { error } = await supabase
    .from('reclutas')
    .insert({ nombre, correo, clave: hashClave });

  if (error) {
    return res.status(500).json({ mensaje: 'No se pudo registrar el recluta' });
  }

  return res.status(201).json({ mensaje: 'Recluta registrado correctamente' });
};

// 🎫 TICKET 2 — Completa el login
// POST /login — valida credenciales y entrega un token JWT de acceso.
const iniciarSesion = async (req, res) => {
  const { correo, clave } = req.body;

  // Paso 1 — Busca al recluta por correo en la base de datos.
  const { data, error } = await supabase
    .from('reclutas')
    .select('id, nombre, clave')
    .eq('correo', correo)
    .single();

  // Paso 2 — Si hubo error o no se encontró el recluta, respondemos 401.
  // Usamos el mismo mensaje para no revelar si el correo existe o no.
  if (error || !data) {
    return res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }

  // Paso 3 — Comparamos la clave que llegó con el hash que está guardado.
  const claveCorrecta = await bcrypt.compare(clave, data.clave);

  // Paso 4 — Si la clave no coincide, misma respuesta 401.
  if (!claveCorrecta) {
    return res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }

  // Paso 5 — Todo ok: generamos el token JWT con id y nombre del recluta.
  const token = jwt.sign(
    { id: data.id, nombre: data.nombre },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  // Paso 6 — Enviamos el token al cliente.
  return res.json({ token });
};

// 🎫 TICKET 4 — Completa el perfil protegido
// GET /perfil — protegida; usa los datos que dejó el middleware en req.recluta.
const verPerfil = (req, res) => {
  // El middleware ya verificó el token y guardó { id, nombre } en req.recluta.
  // Solo lo leemos y lo respondemos.
  res.json({
    mensaje: 'Bienvenido hacker, tus secretos están a salvo',
    nombre: req.recluta.nombre,
  });
};

module.exports = { registrarRecluta, iniciarSesion, verPerfil };