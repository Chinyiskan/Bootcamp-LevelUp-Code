# ⬟ PokéDev — TrainerCard

> **Misión 10 · LevelUp Code Bootcamp 2026**
> Módulo 3 — Estructuras de Datos: El Poder de la Información

---

## 🌍 La historia

La Liga Pokémon acaba de contratar a **PokéDev**, una startup de tecnología, para digitalizar el sistema de registro de entrenadores.

Durante décadas, las tarjetas de entrenador se llenaban a mano en papel. Ahora la Liga quiere una plataforma web donde cualquier entrenador pueda ingresar sus datos y recibir su **TrainerCard oficial** en segundos.

El equipo de diseño ya terminó el HTML y el CSS. El equipo de backend ya conectó los sistemas. Ahora le toca al equipo de **JavaScript** — y ese equipo eres tú.

Tu Tech Lead te acaba de asignar los tickets del sprint.

---

## 🎫 Tus Tickets

| # | Ticket | Descripción |
|---|--------|-------------|
| 01 | Leer y validar | Capturar los 5 campos del formulario y verificar que ninguno esté vacío |
| 02 | Construir el objeto | Crear el objeto `entrenador` con sus propiedades y el método `presentarse()` |
| 03 | Renderizar | Llamar a `renderizarTarjeta(entrenador)` para mostrar la tarjeta oficial |
| 🔥 | BONUS | Agregar el método `obtenerInsignia()` con `if/else if` por región |

---

## 🛠️ Stack del proyecto

- HTML semántico
- CSS propio (sin Bootstrap) con variables CSS y Google Fonts
- JavaScript vanilla — sin librerías externas

---

## 🚀 Cómo correrlo

1. Clona o descarga este repositorio.
2. Abre `index.html` directamente en tu navegador.
3. No necesitas instalar nada.

---

## 📁 Estructura
```
trainercard/
├── index.html   ← estructura de la app
├── style.css    ← toda la estética Pokémon
├── script.js    ← tu campo de batalla ⚔️
└── README.md    ← estás aquí
```

---

## ✅ Estado esperado al terminar

- [ ] Los 5 campos se leen correctamente del formulario.
- [ ] Si algún campo está vacío, aparece el mensaje de error correcto.
- [ ] El objeto `entrenador` tiene las 5 propiedades cargadas.
- [ ] El método `presentarse()` retorna una frase con nombre y región.
- [ ] `renderizarTarjeta(entrenador)` pinta la tarjeta en pantalla.
- [ ] 🔥 BONUS: `obtenerInsignia()` retorna el emoji correcto según la región.

---

*"Un dato suelto es solo un número. Un objeto es una identidad."*
*— Maestro Hexa*