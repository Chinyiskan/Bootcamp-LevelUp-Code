// server.js - PetShelter API

require("dotenv").config()
let express = require("express")
let app = express()

// Middleware para parsear JSON (debe ir antes de las rutas)
app.use(express.json())

// Middleware personalizado para registrar peticiones (logger)
app.use(function (req, res, next) {
    console.log(`${req.method} ${req.path}`)
    next()
})

// Rutas de la API
let mascotasRoutes = require("./routes/mascotas.routes")
app.use("/mascotas", mascotasRoutes)

// Middleware de manejo de errores (debe ir al final de las rutas)
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).json({ error: "Algo salió mal en el servidor" })
})

let PORT = process.env.PORT || 3000
app.listen(PORT, function () {
    console.log("refugio conectado, servidor prendido en el puerto " + PORT)
})