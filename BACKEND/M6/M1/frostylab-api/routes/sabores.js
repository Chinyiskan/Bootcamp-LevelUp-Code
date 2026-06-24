const express = require("express");
const router = express.Router();
const sabores = require("../data/menu");

// GET /sabores — devuelve todos los sabores
router.get("/", (req, res) => {
    res.json(sabores);
});

// GET /sabores/info — devuelve información del local
router.get("/info", (req, res) => {
    res.json({
        nombre:   "FrostyLab",
        direccion: "Calle 42 #18-30, Piso 2",
        horario:  "Lunes a Sábado 10am - 8pm",
        telefono: "601 555 0192"
    });
});

// GET /sabores/destacado — helado del día
router.get("/destacado", (req, res) => {
    const disponibles = sabores.filter(s => s.disponible);
    const destacado = disponibles[0];
    res.json({
        mensaje:  "🍦 Helado del día",
        producto: destacado
    });
});

// GET /sabores/:id — busca un sabor por id
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const sabor = sabores.find(s => s.id === id);

    if (!sabor) {
        res.status(404).json({ error: "Sabor no encontrado" });
        return;
    }

    res.json(sabor);
});

module.exports = router;