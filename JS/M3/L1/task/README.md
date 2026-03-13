# AniTrack — Mi Lista de Animes 🎌

> **M2L4 · Sprint de clase · ~20 min**

---

## El contexto

El equipo de producto de **AniTrack** necesita lanzar el MVP esta semana. El diseñador ya entregó el HTML y el CSS. El backend todavía no está listo, así que por ahora los datos viven en el frontend.

Tu Tech Lead te asigna el ticket:

> *"El formulario ya está en pantalla pero no hace nada. Necesito que valides los campos, guardes cada anime en la lista y renderices las tarjetas automáticamente. El botón no puede agregar basura a la base de datos — cada campo tiene sus reglas."*

Abres VS Code. El archivo `script.js` te espera.

---

## 🧮 La lógica antes del código

Antes de escribir, entiende el flujo:

```
Usuario llena el formulario
       ↓
submit interceptado con preventDefault()
       ↓
¿Los datos son válidos? → NO → mostrarError() + return
       ↓ SÍ
Crear objeto anime → push a listaAnimes
       ↓
renderizarLista() se encarga del resto ✅
```

---

## 📋 Reglas de validación

| Campo | Regla |
|-------|-------|
| Título | No puede estar vacío |
| Género | Debe estar seleccionado |
| Episodios | Número mayor a 0 |
| Puntuación | Entre 1 y 10 |

---

## 🎫 Tu ticket — 20 min

Tu misión se concentra en una sola función: `manejarEnvio()`. El renderizado, las tarjetas y el contador ya están resueltos — tú solo tienes que interceptar el formulario, validar los datos y, si todo pasa, guardar el anime y llamar a `renderizarLista()`.

Completa los `TODO` del `script.js` en orden.

> 💡 **Tip del Tech Lead:** `preventDefault()` es lo primero que escribes dentro del manejador. Siempre. Sin eso, la página recarga antes de que tu código pueda hacer nada.

> 💡 **Tip del Tech Lead:** Cada validación fallida debe llamar a `mostrarError()` y terminar con `return`. Si el código llega al TODO 5, es porque todos los filtros pasaron.

> 💡 **Tip del Tech Lead:** `crearTarjeta()` recibe un objeto anime con cuatro propiedades. Léela antes de construir el objeto en el TODO 5 para saber exactamente cómo nombrarlo.

---

## 🔥 Extra Bonus — 10 min

Al final de `renderizarLista()`, calcula el **promedio de puntuación** de todos los animes de la lista usando un `for` con acumulador. Muéstralo en el elemento `#statPromedio`.

Resultado esperado: `⭐ 8.3 promedio`

---

## 🎓 Consejos del Tech Lead

> *"Lee el flujo completo antes de escribir una sola línea. Entiende qué función llama a qué."*

> *"Un `return` dentro de la validación no es un error — es una salida de emergencia intencional. Si los datos no pasan, el código no debe continuar."*

> *"Si el formulario recarga la página al hacer submit, ya sabes qué olvidaste."*

---

**Módulo:** 2 — Lección 4: Formularios y Validación
**Dificultad:** ⭐⭐ Intermedio
**Tiempo:** 20 min + 10 min extra bonus
