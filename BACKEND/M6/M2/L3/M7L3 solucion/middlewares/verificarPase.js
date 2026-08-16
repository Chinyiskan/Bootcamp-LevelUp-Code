// Middleware que protege las rutas: sin un token válido nadie entra al panel.
const jwt = require('jsonwebtoken');

// 🎫 TICKET 3 — Completa el middleware de verificación
const verificarPase = (req, res, next) => {
  // Paso 1 — Leer el header Authorization. Si no existe o no empieza con "Bearer ",
  // respondemos 401 y cortamos el flujo con return.
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'No autorizado' });
  }

  // Paso 2 — Extraer solo el token (lo que va después de "Bearer ").
  const token = authHeader.split(' ')[1];

  // Paso 3 — Verificar el token. Si es válido, guardamos { id, nombre } en
  // req.recluta y dejamos pasar con next(). Si falla, respondemos 401.
  try {
    const datos = jwt.verify(token, process.env.JWT_SECRET);
    req.recluta = { id: datos.id, nombre: datos.nombre };
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido o vencido' });
  }
};

module.exports = verificarPase;