# TripBudget — Proyecto Final Módulo 2 🌍

> **M2 · Proyecto Final · 1 semana**

---

## El contexto

Llevas dos meses en **The Bit Masters** y tu Senior ha notado tu progreso.
Esta mañana te llama aparte y te dice:

> *"Tenemos un cliente nuevo. Una agencia de viajes que quiere una herramienta
> para que sus clientes planeen su presupuesto antes de reservar. Nada
> demasiado complejo, pero tiene que verse y funcionar como un producto real.
> He decidido asignártelo a ti. El cliente espera algo el viernes."*

---

## 🧳 ¿Qué debe hacer TripBudget?

El usuario ingresa los datos de su viaje planeado:

- **Destino** — a dónde quiere ir
- **Duración** — cuántos días dura el viaje
- **Presupuesto disponible** — cuánto dinero tiene para gastar
- **Costo de transporte** — ida y vuelta
- **Costo de alojamiento por noche** — hotel, hostal, Airbnb
- **Presupuesto de comida diario** — cuánto planea gastar por día
- **Presupuesto de actividades diario** — tours, entradas, paseos

Con esos datos, la app debe:

- Calcular el **costo total estimado** del viaje
- Comparar el costo total con el presupuesto disponible
- Decirle al usuario si su presupuesto **alcanza o no**
- Si alcanza: mostrar cuánto dinero le **sobra**
- Si no alcanza: mostrar cuánto dinero le **falta**
- Dar una **categoría al viaje** según el gasto diario promedio:
  - 💚 Económico — menos de $100.000 por día
  - 💛 Moderado — entre $100.000 y $300.000 por día
  - 🔴 Lujoso — más de $300.000 por día
- Mostrar un **resumen visual** con todos los datos y el resultado

---

## 🛠️ Herramientas que ya tienes

A lo largo de estos dos módulos aprendiste exactamente lo que necesitas
para construir esto. No es coincidencia:

- **Funciones** para encapsular cada cálculo — una función por responsabilidad
- **Validación de formularios** para que ningún campo llegue vacío o con datos inválidos
- **Condiciones** para el veredicto y la categoría del viaje
- **Bucles** si decides procesar múltiples días, categorías o escenarios
- **El DOM** para mostrar el resultado de forma dinámica en pantalla

---

## 📦 Entregables

```
trip-budget/
├── index.html
├── style.css
├── script.js
└── README.md
```

1. **Repositorio en GitHub** con estructura semántica.
2. **Proyecto desplegado** en GitHub Pages o Vercel.
3. **README personalizado** explicando qué hace la app y cómo la construiste.

---

## ✅ Criterios

**Interfaz:**

- Diseño atractivo, coherente y con personalidad propia
- Responsive — debe verse bien en móvil y desktop
- Al menos una imagen o ilustración decorativa
- Iconos y fuentes de Google Fonts
- Que se vea como algo que un cliente pagaría por usar

**Código JavaScript:**

- Toda la lógica de cálculo dentro de funciones con `return`
- Las funciones solo usan lo que reciben por parámetros
- Validación de todos los campos antes de procesar
- Comentarios que expliquen qué hace cada parte
- Cero lógica suelta fuera de funciones

---

## 💬 Últimas palabras de tu Senior

> *"Este es tu primer proyecto propio. No me entregues lo primero que funcione —
> entrégame lo mejor que puedas hacer."*

> *"Antes de escribir código, escribe en papel qué funciones vas a necesitar
> y qué calcula cada una. Si no puedes explicarlo en español, no puedes programarlo."*

> *"El cliente no sabe nada de código. Lo que ve es el diseño.
> Pero yo sí sé de código. Lo que reviso es la arquitectura."*

---

**Módulo:** 2 — Proyecto Final
**Dificultad:** ⭐⭐⭐ Intermedio
**Tiempo estimado:** 4 a 6 horas
