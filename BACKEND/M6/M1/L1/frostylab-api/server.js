const express = require("express");
const saboresRouter = require("./routes/sabores");

const app = express();
const PORT = 3000;

app.use("/sabores", saboresRouter);

app.listen(PORT, () => {
    console.log(`FrostyLab API corriendo en http://localhost:${PORT}`);
});

