const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabaseClient');

const registrarJugador = async (req, res) => {
  const { nombre, correo, clave } = req.body;

  const hashClave = await bcrypt.hash(clave, 10);

  const { error } = await supabase
    .from('jugadores')
    .insert({ nombre, correo, clave: hashClave });

  if (error) {
    return res.status(500).json({ mensaje: 'No se pudo registrar el jugador' });
  }

  return res.status(201).json({ mensaje: 'Jugador registrado correctamente' });
};

const iniciarSesion = async (req, res) => {
  const { correo, clave } = req.body;

  const { data, error } = await supabase
    .from('jugadores')
    .select('id, nombre, clave')
    .eq('correo', correo)
    .single();

  if (error || !data) {
    return res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }

  const esCorrecta = await bcrypt.compare(clave, data.clave);

  if (!esCorrecta) {
    return res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }

  const token = jwt.sign(
    { id: data.id, nombre: data.nombre },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  return res.json({ token });
};

const verPerfil = (req, res) => {
  res.json({
    mensaje: 'Bienvenido al comando, ' + req.jugador.nombre,
  });
};

module.exports = { registrarJugador, iniciarSesion, verPerfil };