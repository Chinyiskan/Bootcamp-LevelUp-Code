// routes/mascotas.routes.js

let express = require("express")
let router = express.Router()
let mascotasController = require("../controllers/mascotas.controller")

router.get("/", mascotasController.obtenerMascotas)
router.get("/:id", mascotasController.obtenerMascotaPorId)
router.post("/", mascotasController.crearMascota)
router.put("/:id", mascotasController.actualizarMascota)
router.delete("/:id", mascotasController.eliminarMascota)

module.exports = router
