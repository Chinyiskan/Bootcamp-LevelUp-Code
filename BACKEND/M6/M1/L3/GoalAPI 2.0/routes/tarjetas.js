const express = require("express");
const router = express.Router();
 
// Importamos los datos desde el almacén
const tarjetas = require("../data/tarjetasData");
 
// ─────────────────────────────────────────────
// TICKET 1 — POST /tarjetas
 
router.post("/", (req, res) => {
  const nuevaTarjeta = req.body;
  tarjetas.push(nuevaTarjeta);
  res.status(201).json({ mensaje: "Tarjeta registrada", tarjeta: nuevaTarjeta });
});
 
// ─────────────────────────────────────────────
// TICKET 2 — GET /tarjetas
 
router.get("/", (req, res) => {
  res.json(tarjetas);
});
 
// ─────────────────────────────────────────────
// 🔥 BONUS — GET /tarjetas/tipo/:tipo
// Va antes de "/:id" para que Express no confunda "tipo" con un id
 
router.get("/tipo/:tipo", (req, res) => {
  const tipo = req.params.tipo;
  const tarjetasFiltradas = tarjetas.filter(
    (tarjeta) => tarjeta.tipo.toLowerCase() === tipo.toLowerCase()
  );
  res.json(tarjetasFiltradas);
});
 
// ─────────────────────────────────────────────
// TICKET 3 — GET /tarjetas/:id
 
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const tarjeta = tarjetas.find((t) => t.id === id);
 
  if (!tarjeta) {
    return res.status(404).json({ error: "Tarjeta no encontrada" });
  }
 
  res.json(tarjeta);
});
 
// ─────────────────────────────────────────────
// TICKET 4 — PUT /tarjetas/:id
// Ej: una segunda amarilla se corrige a roja
 
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const indice = tarjetas.findIndex((t) => t.id === id);
 
  if (indice === -1) {
    return res.status(404).json({ error: "Tarjeta no encontrada" });
  }
 
  tarjetas[indice] = { id, ...req.body };
  res.json({ mensaje: "Tarjeta actualizada", tarjeta: tarjetas[indice] });
});
 
// ─────────────────────────────────────────────
// TICKET 5 — DELETE /tarjetas/:id
 
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const indice = tarjetas.findIndex((t) => t.id === id);
 
  if (indice === -1) {
    return res.status(404).json({ error: "Tarjeta no encontrada" });
  }
 
  const tarjetaEliminada = tarjetas.splice(indice, 1);
  res.json({ mensaje: "Tarjeta eliminada", tarjeta: tarjetaEliminada[0] });
});
 
module.exports = router;