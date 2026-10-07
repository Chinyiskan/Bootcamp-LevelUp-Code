// Responsabilidad: Definir los puntos de entrada HTTP para la autenticación y perfil de pilotos.

import { Router } from 'express';
import { registrarPiloto, iniciarSesion, obtenerPerfil } from '../controllers/auth.controller.js';
import verificarPase from '../middlewares/verificarPase.js';

let authRouter = Router();

// Rutas públicas de acceso inicial
authRouter.post('/registro', registrarPiloto);
authRouter.post('/login', iniciarSesion);

// Ruta protegida para consultar los datos del piloto en sesión activa
authRouter.get('/perfil', verificarPase, obtenerPerfil);

export default authRouter;
