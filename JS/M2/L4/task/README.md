# MercaYa — ShopRegister 🛒

> **M2L4 · Sprint de clase · ~20 min**

---

## El contexto

El equipo de frontend de **MercaYa** terminó el diseño esta mañana.
HTML listo, CSS listo, formulario en pantalla.
Pero el sistema no hace nada todavía.

Tu Tech Lead se acerca y dice:

> *"Necesito que este formulario funcione antes del deploy de esta tarde.
> Valida cada campo con sus reglas y si todo está correcto muestra la
> tarjeta de confirmación. Sin validación no hay registro."*

Abres el `script.js`. Hay dos tickets esperándote.

---

## 📋 Reglas de validación

| Campo | Regla |
|-------|-------|
| Nombre | Obligatorio, mínimo 3 caracteres |
| Fecha de nacimiento | Obligatorio, mayor de 18 años |
| País | Debe estar seleccionado |
| Ciudad | Obligatorio |
| Correo | Debe contener `@` y `.` |
| Teléfono | Exactamente 10 dígitos |
| Dirección | Obligatorio |
| Contraseña | Mínimo 8 caracteres |
| Confirmar contraseña | Debe coincidir con la anterior |

---

## 🎫 Ticket 1 — Funciones de validación · 10 min

En la **Sección 1** del `script.js` encontrarás las funciones de validación.
Las dos primeras ya están implementadas como guía.
Completa las demás siguiendo el mismo patrón:

> Si el dato no cumple la regla → `return false`. Si cumple → `return true`.

## 🎫 Ticket 2 — Manejador del submit · 10 min

En la **Sección 3** encontrarás el manejador del formulario.
El patrón del campo nombre ya está completo en cada paso.
Replícalo para los 8 campos restantes.

> ⚠️ **Importante:** Termina el Ticket 1 antes de empezar el Ticket 2.
> Tus funciones tienen que existir para poder llamarlas en el submit.

---

## 🔥 Extra Bonus — 10 min

La función `validarEmail()` actual tiene un problema: `"@."` pasaría
la validación porque contiene `@` y `.`.

Mejórala para que verifique:

- Que haya al menos un carácter **antes** del `@`
- Que haya al menos un carácter **entre** el `@` y el `.`
- Que haya al menos un carácter **después** del `.`

> 💡 Pista: `email.indexOf("@")` te dice en qué posición está el `@`.

---

## 🎓 Consejos del Tech Lead

> *"Escribe una función, pruébala en consola, confirma que funciona. Luego pasa a la siguiente. No intentes completar las 7 de un solo golpe."*

> *"Si el submit no hace nada al presionar el botón, revisa la consola. El error casi siempre está ahí esperándote."*

> *"La contraseña nunca va en el objeto de datos que le muestras al usuario. Nunca."*

---

**Módulo:** 2 — Lección 4: Formularios y Validación  
**Dificultad:** ⭐⭐ Intermedio  
**Tiempo:** 20 min + 10 min extra bonus
