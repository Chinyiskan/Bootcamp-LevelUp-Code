const express = require('express')
const router = express.Router()

const {
    obtenerMonturas,
    obtenerMonturaPorId,
    crearMontura,
    actualizarMontura,
    eliminarMontura
} = require('../controllers/monturasController')

router.get('/', obtenerMonturas);
router.get('/:id', obtenerMonturaPorId);
router.post('/', crearMontura);
router.put('/:id', actualizarMontura);
router.delete('/:id', eliminarMontura);

module.exports = router
