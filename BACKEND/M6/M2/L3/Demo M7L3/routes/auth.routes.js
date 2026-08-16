const express = require('express');
const verificarPase = require('../middlewares/verificarPase');
const { registrarJugador, iniciarSesion, verPerfil } = require('../controllers/auth.controller');

const router = express.Router();
router.post('/registro', registrarJugador);
router.post('/login', iniciarSesion);
router.get('/perfil', verificarPase, verPerfil);

module.exports = router;