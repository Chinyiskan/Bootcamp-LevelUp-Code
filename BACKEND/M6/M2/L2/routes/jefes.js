const express = require('express');
const router = express.Router();
const {
    obtenerJefes,
    obtenerJefePorId,
    obtenerJefesPorTipo,
    crearJefe,
    actualizarJefe,
    eliminarJefe
} = require('../controllers/jefesController');

// ⚠️ Orden importa: /filtrar va ANTES que /:id
router.get('/filtrar', obtenerJefesPorTipo);
router.get('/', obtenerJefes);
router.get('/:id', obtenerJefePorId);
router.post('/', crearJefe);
router.put('/:id', actualizarJefe);
router.delete('/:id', eliminarJefe);

module.exports = router;