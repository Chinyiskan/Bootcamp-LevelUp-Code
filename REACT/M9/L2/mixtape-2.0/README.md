# 🎧 Mixtape 2.0 — Respuesta sugerida (Lección 2 + Home Challenge)

Es el Mixtape de la Lección 1 con el kit 2.0 aplicado y **todo resuelto**: los tres tickets y el bonus de la clase, más los tres tickets y el bonus del Home Challenge.

Úsala para comparar con tu proyecto o como checkpoint si te atrasaste. Intenta primero hacerlo tú: los comentarios del código dicen a qué ticket pertenece cada parte.

## Cómo arrancarla

```bash
pnpm install
pnpm dev
```

## Qué cambió desde la Lección 1

| Archivo | Cambio |
|---|---|
| `src/main.jsx` | Importa `estilos-l2.css` (Paso 0) |
| `src/components/TarjetaCancion.jsx` | Recibe todo por props (T1), etiqueta favorita con `&&` (T3), barra de energía con `style` (Home T2). Ya no tiene `Controles` ni `Siguiente` |
| `src/App.jsx` | `.map()` con `key` (T2), `Controles` abajo (T1), contador (bonus), `Seccion` (Home T1), ternario de playlist vacía (Home bonus) |
| `src/components/Encabezado.jsx` | Prop `total` (bonus) |
| `src/components/Seccion.jsx` | Nuevo, con `children` (Home T1) |
| `src/data/canciones.js` | Nuevo, la playlist. Tu canción va como `id: 5` (Home T3) |
| `src/data/cancion.js` y `Siguiente.jsx` | Borrados (Home T3) |

## Lo que cambia en tu versión

- En `canciones.js`, la quinta canción es la tuya, con tu portada en `public/portadas/`.
- En `PiePagina.jsx`, tu nombre.
