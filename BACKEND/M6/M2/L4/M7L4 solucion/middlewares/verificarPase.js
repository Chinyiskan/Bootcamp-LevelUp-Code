// Responsabilidad: Interceptar las solicitudes entrantes y autenticar al piloto mediante la validación de su token JWT.

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

let verificarPase = (req, res, next) => {
  // El encabezado Authorization es el estándar HTTP para transportar credenciales de portador (Bearer)
  let cabeceraAutorizacion = req.headers.authorization;

  if (!cabeceraAutorizacion) {
    // 401 Unauthorized: El cliente no ha presentado credenciales válidas para ingresar al hangar
    return res.status(401).json({
      error: 'Acceso denegado: se requiere un pase de abordaje (token de autorización)'
    });
  }

  // Separamos la palabra clave 'Bearer' del valor real del token criptográfico
  let partes = cabeceraAutorizacion.split(' ');
  if (partes.length !== 2 || partes[0] !== 'Bearer') {
    return res.status(401).json({
      error: 'Formato de autorización inválido. Debe ser: Bearer <token>'
    });
  }

  let token = partes[1];
  let secretoJwt = process.env.JWT_SECRET;

  try {
    // Verificamos la firma criptográfica con la clave secreta del servidor para garantizar que no fue alterado
    let datosDecodificados = jwt.verify(token, secretoJwt);

    // Inyectamos los datos del piloto en el objeto req para que los controladores conozcan la identidad verificada
    req.piloto = {
      id: datosDecodificados.id,
      nombre: datosDecodificados.nombre,
      rol: datosDecodificados.rol
    };

    next();
  } catch (error) {
    // Si el token expiró o la firma no coincide con nuestro secreto, rechazamos la conexión
    return res.status(401).json({
      error: 'Pase de abordaje inválido o expirado. Inicia sesión nuevamente.'
    });
  }
};

export default verificarPase;
