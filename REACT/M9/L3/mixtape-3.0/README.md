# 🎧 Mixtape 3.0 — Respuesta sugerida (Lección 3 + Home Challenge)

Es el Mixtape de la Lección 2 con el kit 3.0 aplicado y **todo resuelto**: los tres tickets y el bonus de la clase (reproductor y buscador), más los tres tickets y el bonus del Home Challenge (formulario de pedidos).

Úsala para comparar con tu proyecto o como checkpoint si te atrasaste. Intenta primero hacerlo tú: los comentarios del código dicen a qué ticket pertenece cada parte. Si solo necesitas la clase, está en `mixtape-3.0-clase`.

## Cómo arrancarla

```bash
pnpm install
pnpm dev
```

## Qué cambió desde la Lección 2

| Archivo | Cambio |
|---|---|
| `src/main.jsx` | Importa `estilos-l3.css` (Paso 0) |
| `src/estilos-l3.css` | Nuevo, viene en el kit (incluye los estilos del formulario) |
| `src/components/Reproductor.jsx` | Nuevo, viene en el kit. `reproduciendo` y `alternar` (T1), `indice`, `siguiente` y `anterior` (T2), `progreso` (T3) |
| `src/components/Iconos.jsx` | Nuevo, viene en el kit |
| `src/components/Controles.jsx` | Borrado: lo reemplaza `Reproductor` |
| `src/components/PedidoCancion.jsx` | Nuevo. Inputs controlados (Home T1), validación con `preventDefault` y `trim()` (Home T2), confirmación con template literals (Home T3), contador de letras (Home Bonus) |
| `src/App.jsx` | `Reproductor` en vez de `Controles`, `busqueda` y `visibles` (Clase Bonus), `PedidoCancion` debajo de la playlist (Home T1) |
| `src/data/canciones.js` | Las 4 canciones de Nova con `audio` y su `duracion` real. Tu canción (`id: 5`) sigue sin `audio` |
| `public/audio/` | Las 4 canciones, nuevo |

## Lo que cambia en tu versión

- En `canciones.js`, la quinta canción es la tuya, con tu portada en `public/portadas/`.
- En `PiePagina.jsx`, tu nombre.

## Para pensar

- En `manejarEnvio`, `setCancion("")` va antes de `setConfirmacion(...)` a propósito. Un estado no cambia en el momento en que llamas a su `set`: durante toda la función, `cancion` conserva lo que valía al hacer clic. Por eso el mensaje sale con la canción completa.
- El botón se apaga con `||` y no con `&&`: basta con que **un** campo esté vacío.
