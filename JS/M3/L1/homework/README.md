# AniTrack v2.0 — Feature Update 🎌

> **M3L1 · Home Challenge · ~4 a 6 horas**

---

## El contexto

Han pasado tres días desde que entregaste el MVP de AniTrack.
Esta mañana tu Tech Lead te escribe por Slack:

> *"El cliente quedó muy contento con la primera versión. Dice que
> se ve profesional y que sus usuarios ya la están usando. Pero tiene
> una lista de features que quiere para la v2.0 — cosas que harían
> la app mucho más útil. He pensado en ti para este segundo sprint.
> ¿Arrancamos?"*

No es un proyecto nuevo. Es tu propio código, mejorado.
Eso en el mundo real se llama iterar — y es lo que hacen
los buenos desarrolladores todo el tiempo.

---

## 🚀 Features solicitadas por el cliente

Estas son las mejoras que el cliente quiere ver en la v2.0.
Todas son obligatorias:

**1. Eliminar animes específicos**
Cada tarjeta debe tener un botón de eliminar que quite ese anime
en particular de la lista, no solo el último. El array debe
actualizarse y la pantalla reflejar el cambio inmediatamente.

**2. Filtrar por género**
Un selector que permita ver solo los animes de un género específico.
Si el usuario selecciona "Acción", solo aparecen los de acción.
Si selecciona "Todos", vuelve a mostrar la lista completa.

**3. Contador de episodios totales**
Junto al contador de títulos, mostrar el total de episodios vistos
sumando los episodios de todos los animes de la lista.

**4. Mejoras visuales**
El cliente quiere que la app se vea más pulida y personalizada.
Puedes cambiar colores, tipografías, animaciones, layout — lo que
quieras. Hazla tuya. Lo único que no puede cambiar es que funcione.

---

## 📦 Entregables

1. **Repositorio en GitHub** — puede ser el mismo del ejercicio
   en clase, en una rama nueva o un fork. Lo que prefieras.
2. **Proyecto desplegado** en GitHub Pages o Vercel.
3. **README actualizado** explicando qué features agregaste
   y qué aprendiste en el proceso.

---

## ✅ Criterios

**Funcionalidad:**
- Las 4 features están implementadas y funcionan correctamente
- El array es siempre la fuente de verdad — la pantalla refleja
  su estado en todo momento
- No hay errores en consola

**Código:**
- Toda la lógica vive dentro de funciones
- Comentarios que expliquen las partes nuevas
- Código limpio y organizado

**Diseño:**
- La app se ve mejor que la v1.0
- Responsive en móvil y desktop

---

## 🔥 Extra Bonus — Para los que quieren ir más lejos

Si terminaste todo lo anterior y tienes energía de sobra,
elige una o más de estas mejoras adicionales y agrégalas a tu v2.0.
Todas se resuelven con herramientas que ya conoces:

**Límite de lista**
Que no se puedan agregar más de 10 animes. Si el usuario intenta
agregar un undécimo, muestra un mensaje de aviso y bloquea el envío.
Pista: `listaAnimes.length` te dice cuántos hay en el array.

**Buscador por título**
Un input que filtre la lista en tiempo real mientras el usuario escribe.
Solo deben aparecer los animes cuyo título contenga el texto ingresado.
Pista: un `for` con un `if` y `.includes()` pueden resolver esto.

**Ordenar por puntuación**
Un botón que ordene la lista de mayor a menor puntuación.
Pista: un `for` anidado comparando puntuaciones elemento por elemento.

> ⚠️ El programa funciona perfectamente sin este bonus.
>  Elige el que más te llame y diviértete con él.

---

## 💬 Últimas palabras de tu Tech Lead

> *"El cliente no sabe qué es un array. Lo que sabe es si la app
> le resuelve el problema o no. Tu trabajo es que resuelva el problema
> y que el código que hay detrás sea digno de lo que se ve."*

> *"Itera sobre tu propio código sin miedo. Romperlo y arreglarlo
> es la forma más rápida de aprender."*

> *"La v2.0 que entregues esta semana va directo a tu portafolio.
> Trátala como tal."*

---

**Módulo:** 3 — Lección 1: Arrays
**Dificultad:** ⭐⭐⭐ Intermedio
**Tiempo estimado:** 4 a 6 horas