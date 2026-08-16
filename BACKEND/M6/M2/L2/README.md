# 🐉 El Bestiario Despierta — Filtro por Tipo

**Misión 26 — Backend con Base de Datos**

## 📌 Premisa

El Gremio necesita catalogar a los jefes que enfrentan sus aventureros. La tabla `jefes` ya existe en Supabase con CRUD completo — eso ya lo dominan de la semana pasada. Pero el Tech Lead pide algo nuevo: poder pedir **solo los jefes de un tipo específico** (Dragones, Liches, Elementales...) sin traer la tabla completa.

Hasta ahora, cuando filtrabas con `.eq()`, siempre lo hacías con un `id` fijo que venía de `req.params`. Hoy ese valor no viene fijo en la URL — viene de lo que el usuario decide pedir, a través de `?tipo=Dragón` al final de la URL. Eso se llama **query param**, y en Express se lee con `req.query`.

## 🧠 Lo nuevo de hoy

`req.query` funciona igual que `req.params` — es un objeto con lo que venga en la URL — solo que en vez de venir de `/:algo`, viene de `?algo=valor` al final. Si alguien pide:

GET /jefes/filtrar?tipo=Dragón

Entonces `req.query.tipo` vale `"Dragón"`.

## 🎫 Ticket único — `obtenerJefesPorTipo`

Completa el controlador para que:

1. Lea `tipo` desde `req.query`.
2. Use `.eq('tipo', tipo)` sobre la tabla `jefes` — el mismo `.eq()` que ya usas en `update` y `delete`, ahora dentro de un `select()`.
3. Revise `error` antes de responder, igual que siempre.

El resto del CRUD (`GET` todos, `GET` por id, `POST`, `PUT`, `DELETE`) **ya está resuelto** — mismo código de la semana pasada, sin cambios. Solo agregas la ruta y el controlador nuevos.

## 🔥 Bonus (solo con herramientas ya vistas)

Si nadie manda `?tipo=...` en la URL (`req.query.tipo` es `undefined`), responde con todos los jefes en vez de romper la consulta.

## 🟢 Estado esperado al terminar

- `GET /jefes/filtrar?tipo=Dragón` devuelve solo los jefes de ese tipo.
- `GET /jefes/filtrar` (sin query param) devuelve todos, sin errores.
- Entiendes la diferencia entre `req.params` (valor fijo en la ruta) y `req.query` (valor opcional al final de la URL).
