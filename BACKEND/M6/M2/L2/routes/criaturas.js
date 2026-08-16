const express = require('express');
const router = express.Router();
const {
    obtenerCriaturas,
    obtenerCriaturaPorId,
    crearCriatura,
    actualizarCriatura,
    eliminarCriatura
} = require('../controllers/criaturasController');

// Rutas de Criaturas
router.get('/', obtenerCriaturas);
router.get('/:id', obtenerCriaturaPorId);
router.post('/', crearCriatura);
router.put('/:id', actualizarCriatura);
router.delete('/:id', eliminarCriatura);

module.exports = router;