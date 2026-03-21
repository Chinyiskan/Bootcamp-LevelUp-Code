# PokéDev TrainerCard v2.0 — Partner Update ⚡

> **M3L2 · Home Challenge · ~3 a 5 horas**

---

## El contexto

Han pasado dos días desde que entregaste la TrainerCard v1.0.
Esta mañana tu Tech Lead te escribe por Slack:

> *"El equipo de la Liga Pokémon quedó impresionado con las tarjetas.
> Pero acaban de llamar para pedir una mejora urgente: los entrenadores
> quieren registrar también a su Pokémon insignia. Dicen que una tarjeta
> sin su compañero se siente incompleta. Ya sé que el sprint estaba
> cerrado — pero esto es prioritario. ¿Puedes tenerlo listo esta semana?"*

No es un proyecto nuevo. Es tu propio código, mejorado.
En el mundo real esto se llama iterar — y es lo que hacen
los buenos desarrolladores todo el tiempo.

---

## 🚀 El encargo

La Liga Pokémon quiere que la TrainerCard muestre dos tarjetas:
la del entrenador (que ya construiste) y una nueva **PokéCard**
con los datos del Pokémon insignia.

Tu trabajo es agregar una segunda sección al formulario,
construir un **segundo objeto** con esos datos y renderizar
ambas tarjetas juntas en pantalla.

---

## 📋 Datos del Pokémon insignia

La segunda sección del formulario debe capturar:

- **Nombre** del Pokémon
- **Tipo principal** (select: Fuego, Agua, Planta, Eléctrico, Psíquico, Sombra)
- **Nivel** (número entre 1 y 100)
- **Movimiento especial** (texto libre — el ataque favorito)
- **Frase de combate** (texto libre — lo que grita el entrenador al enviarlo)

---

## 🧠 Lo que debes construir en JS

**1. Leer y validar los 5 campos nuevos**
El mismo patrón que ya usaste para el entrenador: leer el valor,
verificar que no esté vacío, mostrar error con `mostrarError()` si falla.
Para el nivel, verifica además que sea un número entre 1 y 100.

**2. Construir el objeto `pokemonInsignia`**
Un objeto independiente del objeto `entrenador`, con sus 5 propiedades
y un método `presentarse()` que retorne una frase con su nombre y nivel.

Ejemplo de resultado:
`"Soy Charizard, nivel 78, listo para el combate."`

**3. Llamar a `renderizarPokeCard(pokemonInsignia)`**
Esta función ya viene implementada en el HTML — igual que
`renderizarTarjeta()` en la v1.0. Solo necesita recibir tu objeto.

---

## 📦 Entregables

1. **Repositorio en GitHub** — puede ser el mismo de la v1.0
   en una rama nueva, o un fork. Lo que prefieras.
2. **Proyecto desplegado** en GitHub Pages o Vercel.
3. **README actualizado** explicando qué agregaste
   y qué aprendiste en el proceso.

---

## ✅ Criterios

**Funcionalidad:**
- Ambas tarjetas se renderizan correctamente al enviar el formulario
- Todos los campos nuevos tienen validación
- El método `presentarse()` de `pokemonInsignia` retorna la frase correcta
- No hay errores en consola

**Código:**
- Los dos objetos son independientes — cada uno con sus propias propiedades
- Toda la lógica de validación vive dentro del manejador del submit
- Comentarios que expliquen las partes nuevas que agregaste

**Diseño:**
- La PokéCard tiene su propia estética diferenciada de la TrainerCard
- El layout con dos tarjetas se ve bien en móvil y desktop

---

## 🔥 Extra Bonus — El Equipo de Gimnasio

Si terminaste todo lo anterior y tienes energía de sobra,
aquí hay un reto extra que va un nivel más arriba.

**El entrenador no va solo al gimnasio — lleva un equipo.**

Implementa un sistema donde el entrenador pueda registrar
hasta **5 Pokémon** para su equipo de duelo:

- Cada Pokémon se agrega uno por uno con un formulario pequeño
  (nombre, tipo, nivel y movimiento especial).
- Cada vez que se agrega uno, se empuja al array `equipoPokemon`
  con `push` y se renderiza la lista actualizada debajo de la TrainerCard.
- Si el entrenador intenta agregar un sexto Pokémon, el sistema
  muestra un aviso: *"Tu equipo ya está completo. ¡A batallar!"*

Pista: `equipoPokemon.length` te dice cuántos lleva hasta ahora.
Pista: un `forEach` sobre el array construye todas las mini-tarjetas
del equipo de una sola vez.

> ⚠️ El programa funciona perfectamente sin este bonus.
> El bonus es para los que quieren llegar al gimnasio con ventaja.

---

## 💬 Últimas palabras de tu Tech Lead

> *"Dos objetos en pantalla no es el doble de trabajo —
> es el doble de claridad. Cada entidad tiene su identidad,
> sus datos y su comportamiento. Eso es diseñar con objetos."*

> *"La TrainerCard que entregues esta semana ya no es un ejercicio.
> Es una pieza de portafolio. Trátala como tal."*

---

**Módulo:** 3 — Lección 2: Objetos
**Dificultad:** ⭐⭐⭐ Intermedio
**Tiempo estimado:** 3 a 5 horas