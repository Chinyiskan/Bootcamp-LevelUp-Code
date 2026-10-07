# 🎧 Mixtape — Respuesta sugerida (Lección 1 + Home Challenge)

Esta es la versión resuelta del Mixtape con **todo incluido**: los tres tickets y el bonus de la clase, más los tres tickets y el bonus del Home Challenge.

Úsala para comparar con tu proyecto o como punto de partida si te atrasaste. Intenta primero hacerlo tú: los comentarios del código dicen a qué ticket pertenece cada parte y por qué está escrita así.

## Cómo arrancarla

```bash
pnpm install
pnpm dev
```

Abre la dirección que muestra la terminal (normalmente `http://localhost:5173`). Para apagarla: Ctrl + C.

## Dónde está cada ticket

| Archivo | Qué resuelve |
|---|---|
| `src/components/TarjetaCancion.jsx` | Clase T1 (errores de JSX), clase T3 (datos con import), Home T2 (año, reproducciones y "Lanzada hace") |
| `src/components/Encabezado.jsx` | Clase T2 (un solo padre y `export default`) |
| `src/App.jsx` | Clase T2 (mostrar `Encabezado`), Home T1 (mostrar `PiePagina`) |
| `src/components/Controles.jsx` | Bonus de la clase |
| `src/components/PiePagina.jsx` | Home T1 |
| `src/components/Siguiente.jsx` | Bonus del Home Challenge |
| `src/data/cancion.js` | Home T2 (`anio`, `reproducciones`), Home T3 (tus datos) y datos del bonus |
| `src/index.css` | Estilos del pie de página y de "Siguiente", pegados al final |

## Lo que cambia en tu versión

- En `PiePagina.jsx`, cambia `"Tu nombre"` por el tuyo.
- En `cancion.js`, los datos de la canción son de ejemplo. El Ticket 3 pide que pongas tu canción favorita, con tu propia portada en `public/portadas/`.
- En `index.css`, el Ticket 3 también pide cambiar el color de la regla `.logo`.
