const express = require('express');
const router = express.Router();
const {
    obtenerPersonajes,
    obtenerPersoanjePorId,
    obtenerPersoanjePorClase,
    crearPersonaje,
    actualizarPersonaje,
    eliminarPersonaje
} = require('../controllers/personajesController');

// ⚠️ Orden importa: /filtrar va ANTES que /:id
router.get('/filtrar', obtenerPersoanjePorClase);
router.get('/', obtenerPersonajes);
router.get('/:id', obtenerPersoanjePorId);
router.post('/', crearPersonaje);
router.put('/:id', actualizarPersonaje);
router.delete('/:id', eliminarPersonaje);

module.exports = router;