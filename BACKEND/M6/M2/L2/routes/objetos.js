const express = require('express');
const router = express.Router();
const {
    obtenerObjetos,
    obtenerObjetoPorId,
    obtenerObjetosPorTipo,
    crearObjeto,
    actualizarObjeto,
    eliminarObjeto
} = require('../controllers/objetosController');

// ⚠️ Orden importa: /filtrar va ANTES que /:id
router.get('/filtrar', obtenerObjetosPorTipo);
router.get('/', obtenerObjetos);
router.get('/:id', obtenerObjetoPorId);
router.post('/', crearObjeto);
router.put('/:id', actualizarObjeto);
router.delete('/:id', eliminarObjeto);

module.exports = router;
