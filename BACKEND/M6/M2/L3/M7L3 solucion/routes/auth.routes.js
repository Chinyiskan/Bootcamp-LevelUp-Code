// La vista de rutas separa "qué URL" de "qué hace": los controladores llevan la lógica.
const express = require('express');
const verificarPase = require('../middlewares/verificarPase');
const {
  registrarRecluta,
  iniciarSesion,
  verPerfil,
} = require('../controllers/auth.controller');

const router = express.Router();

router.post('/registro', registrarRecluta);
router.post('/login', iniciarSesion);

// Perfil está protegido: solo pasa si el token es válido (verificarPase primero).
router.get('/perfil', verificarPase, verPerfil);

// 🔥 BONUS — Misma protección, ruta diferente. Un middleware sirve para muchas rutas.
router.get('/secreto-nivel-2', verificarPase, (req, res) => {
  res.json({
    mensaje: '¡Nivel 2 desbloqueado! Ahora sabes que un middleware protege cualquier ruta.',
    nombre: req.recluta.nombre,
  });
});

module.exports = router;