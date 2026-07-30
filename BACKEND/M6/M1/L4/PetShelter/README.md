# 🐾 El Refugio que Nadie Organizó

## 📌 Premisa

**PetShelter** es un refugio de mascotas que digitalizó su registro de animales hace tres meses. El becario que armó el backend ya no trabaja aquí — se fue a otro proyecto y dejó todo funcionando, pero amontonado en un solo archivo, sin ningún orden.

Mañana llega una asociación aliada a revisar el sistema antes de firmar un convenio. El Tech Lead necesita que el backend esté organizado y sin bugs para la demo. Ese trabajo es de ustedes.

No van a escribir lógica nueva. Van a hacer lo que hace cualquier dev en su primera semana en un trabajo real: entrar a código ajeno, entenderlo, arreglar lo que esté roto, y dejarlo organizado.

## 💡 ¿Por qué vale la pena?

Hasta ahora siempre empezaron un proyecto desde cero. Hoy no. Hoy heredan código de otra persona — exactamente como va a pasar el primer día en cualquier trabajo real. Si logran que `test.http` corra completo y dejan el proyecto separado en rutas, controladores y datos, ya vivieron su primer día como dev de verdad.

## 📜 El Contrato (Tickets)

**Ticket 1 — El refugio no recibe mascotas nuevas (5 min)**
Prueben `test.http`. El POST no está guardando los datos, aunque el servidor no marca ningún error. Encuentren por qué `req.body` llega vacío y corríjanlo.
*Pista: el orden en que se declaran las cosas en Express importa.*

**Ticket 2 — Los animales no deberían vivir en el servidor (5 min)**
Muevan el array `mascotas` a `data/mascotas.js` y expórtenlo con `module.exports`. `server.js` no debería tener datos escritos adentro.

**Ticket 3 — Separar el qué hace de qué existe (15 min)**
Creen `controllers/mascotas.controller.js` con las funciones de cada ruta (mismo comportamiento, solo cambian de lugar). Creen `routes/mascotas.routes.js` con `express.Router()` y conecten cada ruta a su función del controlador. `server.js` debe terminar usando `app.use("/mascotas", mascotasRoutes)`.

**Ticket 4 — El puerto no debería estar a la vista (5 min)**
Creen `.env` con `PORT=3000`, instalen `dotenv`, y reemplacen el `3000` fijo por `process.env.PORT`.

**Ticket 5 — Cuando algo se rompe (10 min)**
Agreguen un middleware de manejo de errores al final de `server.js` (4 parámetros: `err, req, res, next`).

## 🔥 Bonus (10 min, opcional)

Creen un middleware propio que imprima en consola el método y la ruta de cada petición que llega al servidor. Regístrenlo con `app.use()` antes de las rutas.

## 🟢 Estado esperado al terminar

- `test.http` corre completo, incluyendo POST y PUT (bug corregido).
- `server.js` ya no tiene lógica de rutas ni datos — solo configuración y arranque.
- Existen `routes/`, `controllers/` y `data/` con responsabilidades separadas.
- El puerto sale de `.env`, no está escrito en el código.
- Hay un middleware de errores al final de la cadena.

## 🗂️ Estructura objetivo al terminar

petshelter-legacy/
├── server.js
├── routes/
│   └── mascotas.routes.js
├── controllers/
│   └── mascotas.controller.js
├── data/
│   └── mascotas.js
├── .env
└── test.http
