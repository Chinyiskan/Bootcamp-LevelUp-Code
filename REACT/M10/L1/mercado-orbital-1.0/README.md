# Mercado Orbital 1.0 · Solución sugerida (M10 · L1)

Solución de referencia de la semana: ejercicio en clase (MO-101) y tarea (MO-102) resueltos. Hay más de una forma correcta de hacerlo.

```bash
pnpm install
pnpm dev
```

## Dónde está cada solución

| Ticket | Archivo |
| --- | --- |
| Clase 1 · Pestaña con el carrito | `src/App.jsx` |
| Clase 2 · Aviso que se borra solo | `src/App.jsx` |
| Clase 3 · Escape cierra el carrito | `src/App.jsx` |
| Clase extra · Tecla C | `src/App.jsx` |
| Tarea 1 · Oferta relámpago | `src/components/OfertaRelampago.jsx` |
| Tarea 2 · Hora de la estación | `src/components/RelojEstacion.jsx` (usado en `Encabezado.jsx`) |

Cada solución está entre comentarios `INICIO` y `FIN`.

## Lo que vi en la consola (Tarea, Ticket 3)

Al cargar salen tres mensajes: "Reloj encendido", "Reloj apagado" y "Reloj encendido". En desarrollo, StrictMode monta el componente, lo desmonta y lo vuelve a montar para comprobar que el efecto tiene cleanup. El cleanup apaga el primer intervalo, así que queda uno solo corriendo. Con `pnpm build` y `pnpm preview` sale un solo "Reloj encendido".
