const express = require("express");
const router = express.Router();
 
// Importamos los datos desde el almacén
const goles = require("../data/registros");
 
// ─────────────────────────────────────────────
// ✅ TICKET 1 y 2 de la semana pasada
 
router.get("/", (req, res) => {
  res.json(goles);
});
 
router.post("/", (req, res) => {
  const nuevoGol = req.body;
  goles.push(nuevoGol);
  res.status(201).json({ mensaje: "Gol registrado", gol: nuevoGol });
});
 
// ─────────────────────────────────────────────
// 🔥 EXTRA 1 — GET /goles/ordenados
// Va antes de "/:id" para que Express no confunda "ordenados" con un id
 
router.get("/ordenados", (req, res) => {
  const golesOrdenados = [...goles].sort((a, b) => a.minuto - b.minuto);
  res.json(golesOrdenados);
});
 
// ─────────────────────────────────────────────
// 🔥 EXTRA 2 — GET /goles/estadisticas
// También va antes de "/:id" por la misma razón
 
router.get("/estadisticas", (req, res) => {
  const total = goles.length;
  const golMasTardio = goles.reduce((acumulador, gol) => {
    return gol.minuto > acumulador ? gol.minuto : acumulador;
  }, 0);
 
  res.json({ total, golMasTardio });
});
 
// ─────────────────────────────────────────────
// ✅ BONUS de la semana pasada — GET /goles/seleccion/:nombre
 
router.get("/seleccion/:nombre", (req, res) => {
  const nombre = req.params.nombre;
  const golesFiltrados = goles.filter(
    (gol) => gol.seleccion.toLowerCase() === nombre.toLowerCase()
  );
  res.json(golesFiltrados);
});
 
// ─────────────────────────────────────────────
// 🎫 TICKET 1 — PUT /goles/:id
// Corrige un gol existente (ej: el árbitro se equivocó de minuto)
 
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const indice = goles.findIndex((gol) => gol.id === id);
 
  if (indice === -1) {
    return res.status(404).json({ error: "Gol no encontrado" });
  }
 
  goles[indice] = { id, ...req.body };
  res.json({ mensaje: "Gol corregido", gol: goles[indice] });
});
 
// ─────────────────────────────────────────────
// 🎫 TICKET 2 — DELETE /goles/:id
// Anula un gol por decisión del VAR
 
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const indice = goles.findIndex((gol) => gol.id === id);
 
  if (indice === -1) {
    return res.status(404).json({ error: "Gol no encontrado" });
  }
 
  const golEliminado = goles.splice(indice, 1);
  res.json({ mensaje: "Gol anulado", gol: golEliminado[0] });
});
 
module.exports = router;