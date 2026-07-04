# ⚽ GoalAPI — Centro de Prensa del Mundial

Hoy construyes tu primera API con `GET` y `POST`.
La estructura ya está lista. Tu trabajo está en [routes/goles.js](file:///c:/Users/david/Desktop/GoalAPI/routes/goles.js).

---

## 🛠️ Paso 1 — Prepara el entorno

Abre la terminal en VS Code y corre estos comandos uno por uno:

```bash
pnpm init
pnpm add express
pnpm add -D nodemon
```

Ahora abre el [package.json](file:///c:/Users/david/Desktop/GoalAPI/package.json) que se creó y reemplaza todo su contenido con esto:

```json
{
  "name": "goalapi",
  "version": "1.0.0",
  "scripts": {
    "dev": "nodemon server.js"
  }
}
```

---

## 🚀 Paso 2 — Arranca el servidor

```bash
pnpm dev
```

Si en la terminal ves esto, todo está listo:

```text
GoalAPI corriendo en http://localhost:3000
```

> [!TIP]
> Para detener el servidor en cualquier momento presiona `Ctrl + C` en la terminal.

---

## 📋 Paso 3 — Tus tickets

Todo lo que tienes que completar está en [routes/goles.js](file:///c:/Users/david/Desktop/GoalAPI/routes/goles.js).
Cada ticket tiene un comentario que explica qué debe hacer la ruta.

| Ticket       | Método | Ruta                       | Qué debe hacer                           |
| :----------- | :----- | :------------------------- | :--------------------------------------- |
| **1**        | `GET`  | `/goles`                   | Devolver todos los goles registrados     |
| **2**        | `POST` | `/goles`                   | Registrar un gol nuevo                   |
| **🔥 Bonus** | `GET`  | `/goles/seleccion/:nombre` | Devolver solo los goles de esa selección |

---

## 🧪 Paso 4 — Prueba cada ticket

Después de completar cada ticket, abre [test.http](file:///c:/Users/david/Desktop/GoalAPI/test.http) y presiona **Send Request** encima de la petición correspondiente.

Si la ruta está bien hecha, verás el JSON en el panel de la derecha.

---

## 📁 Estructura del proyecto

```text
goalapi/
├── server.js               # Levanta el servidor (no tocar)
├── routes/
│   └── goles.js           # Aquí están tus tickets ✏️
├── data/
│   └── registros.js       # Los datos iniciales (no tocar)
├── test.http              # Peticiones para probar
└── package.json
```

> [!IMPORTANT]
> Solo necesitas editar [routes/goles.js](file:///c:/Users/david/Desktop/GoalAPI/routes/goles.js). El resto ya está listo.
