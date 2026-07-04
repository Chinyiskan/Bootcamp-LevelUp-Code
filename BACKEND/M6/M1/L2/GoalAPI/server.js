const express = require("express");
const app = express();
const PORT = 3000;

// Esta línea le dice a Express cómo leer los datos que llegan en POST
// La explicamos a fondo en la Misión 24 — por ahora solo sábete que debe estar aquí
app.use(express.json());

// Importamos el router de goles
const golesRouter = require("./routes/goles");

// Todo lo que llegue a /goles se lo mandamos al router de goles
app.use("/goles", golesRouter);

app.listen(PORT, () => {
  console.log(`GoalAPI corriendo en http://localhost:${PORT}`);
});