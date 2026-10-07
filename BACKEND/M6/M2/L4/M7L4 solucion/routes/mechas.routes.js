// Responsabilidad: Definir y proteger todas las rutas del hangar de mechas mediante el middleware de verificación de token.

import { Router } from 'express';
import {
  crearMecha,
  listarMisMechas,
  actualizarMecha,
  eliminarMecha,
  listarTodasMechas
} from '../controllers/mechas.controller.js';
import verificarPase from '../middlewares/verificarPase.js';

let mechasRouter = Router();

// Aplicamos el middleware a nivel de router para garantizar que ninguna ruta del hangar quede desprotegida por omisión
mechasRouter.use(verificarPase);

// TICKET 1: Construir y desplegar nueva mecha
mechasRouter.post('/', crearMecha);

// TICKET 2: Listar mechas del piloto autenticado
mechasRouter.get('/', listarMisMechas);

// TICKET 5: Supervisión de toda la flota (colocado antes de /:id para evitar que Express lo interprete como parámetro de ruta)
mechasRouter.get('/todas', listarTodasMechas);

// TICKET 3: Reconfigurar mecha propia
mechasRouter.put('/:id', actualizarMecha);

// TICKET 4: Desmantelar mecha propia
mechasRouter.delete('/:id', eliminarMecha);

export default mechasRouter;
