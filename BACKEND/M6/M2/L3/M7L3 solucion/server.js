// Cargar variables de entorno ANTES de usar el cliente, para que las credenciales estén disponibles.
require('dotenv').config();

// Express: maneja rutas, JSON y archivos estáticos.
const express = require('express');

// Cors: permite peticiones desde el navegador sin bloquear la política de mismo origen.
const cors = require('cors');

// Rutas de autenticación (registro, login, perfil).
const authRoutes = require('./routes/auth.routes');

// Instancia de la aplicación.
const app = express();

const PORT = process.env.PORT || 3000;

// Habilitar peticiones entre distintos orígenes y parsear JSON entrante.
app.use(cors());
app.use(express.json());

// Servir el frontend estático desde la carpeta "public".
app.use(express.static('public'));

// Montar todas las rutas de autenticación bajo el prefijo raíz.
app.use('/', authRoutes);

// Levantar el servidor y anunciar el puerto de escucha.
app.listen(PORT, () => {
  console.log(`Academia de Hackers escuchando en http://localhost:${PORT}`);
});