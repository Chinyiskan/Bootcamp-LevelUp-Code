const express = require("express");
const router = express.Router();

// Importamos los datos desde el almacén
const goles = require("../data/registros");

// ─────────────────────────────────────────────
// TICKET 1 — GET /goles

router.get("/", (req, res) => {
  res.json(goles);
});

// ─────────────────────────────────────────────
// TICKET 2 — POST /goles

router.post("/", (req, res) => {
  const nuevoGol = req.body;
  goles.push(nuevoGol);
  res.status(201).json({ mensaje: "Gol registrado", gol: nuevoGol });
});

// ─────────────────────────────────────────────
// 🔥 BONUS — GET /goles/seleccion/:nombre

router.get("/seleccion/:nombre", (req, res) => {
  const nombre = req.params.nombre;
  const golesFiltrados = goles.filter(
    (gol) => gol.seleccion.toLowerCase() === nombre.toLowerCase()
  );
  res.json(golesFiltrados);
});

module.exports = router;