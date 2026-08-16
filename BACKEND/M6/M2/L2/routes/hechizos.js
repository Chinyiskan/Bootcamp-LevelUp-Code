const express = require('express');
const router = express.Router();
const {
    obtenerHechizos,
    obtenerHechizoPorId,
    obtenerHechizosPorEscuela,
    crearHechizo,
    actualizarHechizo,
    eliminarHechizo
} = require('../controllers/hechizosController');

// ⚠️ Orden importa: /filtrar va ANTES que /:id
router.get('/filtrar', obtenerHechizosPorEscuela);
router.get('/', obtenerHechizos);
router.get('/:id', obtenerHechizoPorId);
router.post('/', crearHechizo);
router.put('/:id', actualizarHechizo);
router.delete('/:id', eliminarHechizo);

module.exports = router;
