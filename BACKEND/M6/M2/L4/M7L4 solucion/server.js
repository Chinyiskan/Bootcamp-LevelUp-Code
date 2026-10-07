// Responsabilidad: Configurar el servidor Express, registrar middlewares globales y levantar la aplicación web del Hangar.

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRouter from './routes/auth.routes.js';
import mechasRouter from './routes/mechas.routes.js';

// Cargamos las variables de entorno al iniciar la aplicación
dotenv.config();

let __filename = fileURLToPath(import.meta.url);
let __dirname = path.dirname(__filename);

let app = express();
let puerto = process.env.PORT || 3000;

// Middlewares globales esenciales
app.use(cors()); // Habilita peticiones cruzadas para desarrollo y pruebas
app.use(express.json()); // Permite analizar cuerpos de petición en formato JSON
app.use(express.static(path.join(__dirname, 'public'))); // Sirve la interfaz estática del frontend garantizando la ruta absoluta

// Registro de enrutadores modulares
app.use('/auth', authRouter);
app.use('/mechas', mechasRouter);

// Ruta raíz de cortesía para redirigir directamente al panel de acceso
app.get('/', (req, res) => {
  res.redirect('/login.html');
});

// Manejador centralizado para rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada en el sistema del Hangar' });
});

// Iniciamos la escucha del servidor
app.listen(puerto, () => {
  console.log(`[HANGAR DE MECHAS] Servidor activo y listo en http://localhost:${puerto}`);
});
