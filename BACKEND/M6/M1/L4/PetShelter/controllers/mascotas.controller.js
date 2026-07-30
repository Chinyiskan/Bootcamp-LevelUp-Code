// controllers/mascotas.controller.js

let mascotas = require("../data/mascotas")
let siguienteId = 5

function obtenerMascotas(req, res) {
    console.log("pidieron la lista de mascotas")
    res.json(mascotas)
}

function obtenerMascotaPorId(req, res) {
    let id = parseInt(req.params.id)
    let mascota = mascotas.find(function (m) { return m.id === id })
    if (!mascota) {
        res.status(404).json({ error: "esa mascota no existe" })
        return
    }
    res.json(mascota)
}

function crearMascota(req, res) {
    console.log("intento de registrar mascota nueva")
    let nueva = req.body
    nueva.id = siguienteId
    siguienteId = siguienteId + 1
    mascotas.push(nueva)
    res.json(nueva)
}

function actualizarMascota(req, res) {
    let id = parseInt(req.params.id)
    let index = mascotas.findIndex(function (m) { return m.id === id })
    if (index === -1) {
        res.status(404).json({ error: "esa mascota no existe" })
        return
    }
    mascotas[index] = { 
        id: id, 
        nombre: req.body.nombre, 
        especie: req.body.especie, 
        edad: req.body.edad, 
        adoptado: req.body.adoptado 
    }
    res.json(mascotas[index])
}

function eliminarMascota(req, res) {
    let id = parseInt(req.params.id)
    let index = mascotas.findIndex(function (m) { return m.id === id })
    if (index === -1) {
        res.status(404).json({ error: "esa mascota no existe" })
        return
    }
    mascotas.splice(index, 1)
    res.json({ mensaje: "mascota eliminada del refugio" })
}

module.exports = {
    obtenerMascotas,
    obtenerMascotaPorId,
    crearMascota,
    actualizarMascota,
    eliminarMascota
}
