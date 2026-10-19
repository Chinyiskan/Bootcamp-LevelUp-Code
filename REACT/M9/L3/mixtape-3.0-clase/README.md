# 🎧 Mixtape 3.0 — Respuesta sugerida (Lección 3, ejercicio en clase)

Es el Mixtape de la Lección 2 con el kit 3.0 aplicado y **resuelto el ejercicio de clase**: los tres tickets del reproductor y el bonus del buscador. El Home Challenge (el formulario de pedidos) **no está** en esta versión: está en `mixtape-3.0-completo`.

Úsala para comparar con tu proyecto, o como punto de partida del Home Challenge si no terminaste la clase. Intenta primero hacerlo tú: los comentarios del código dicen a qué ticket pertenece cada parte.

## Cómo arrancarla

```bash
pnpm install
pnpm dev
```

## Qué cambió desde la Lección 2

| Archivo | Cambio |
|---|---|
| `src/main.jsx` | Importa `estilos-l3.css` (Paso 0) |
| `src/estilos-l3.css` | Nuevo, viene en el kit |
| `src/components/Reproductor.jsx` | Nuevo, viene en el kit. `useState` para `reproduciendo` y `alternar` (T1), `indice`, `siguiente` y `anterior` (T2), `progreso` (T3) |
| `src/components/Iconos.jsx` | Nuevo, viene en el kit |
| `src/components/Controles.jsx` | Borrado: lo reemplaza `Reproductor` |
| `src/App.jsx` | Importa `Reproductor` en vez de `Controles`. Estado `busqueda` y array `visibles` (Bonus) |
| `src/data/canciones.js` | Las 4 canciones de Nova con `audio` y su `duracion` real. Tu canción (`id: 5`) sigue sin `audio` |
| `public/audio/` | Las 4 canciones, nuevo |

## Lo que cambia en tu versión

- En `canciones.js`, la quinta canción es la tuya, con tu portada en `public/portadas/`.
- En `PiePagina.jsx`, tu nombre.

## Para pensar

- Si en `alternar` pones `setReproduciendo(!reproduciendo)` **antes** de `darOrden`, la función sigue usando el valor viejo de `reproduciendo`. Un estado no cambia en el momento en que llamas a su `set`, sino en el siguiente pintado.
- `onTimeUpdate` se dispara varias veces por segundo. Cada vez cambia `progreso` y React vuelve a pintar solo la barra.
