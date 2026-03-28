# GameVault v2.0 — Segundo Sprint 🎮

> **M3L3 · Home Challenge · ~3 a 5 horas**

---

## El contexto

Han pasado dos días desde que entregaste el panel de inventario.
Esta mañana tu Tech Lead te escribe por Slack:

> *"El equipo de ventas quedó encantado con los filtros.
> Pero acaban de pedir mejoras para la demo del viernes:
> quieren filtrar por plataforma, por rango de precio,
> y marketing está pidiendo una sección de Top 3 que se
> actualice sola. Ya sé que el sprint estaba cerrado —
> pero el cliente manda. ¿Lo tienes para el jueves?"*

No es un proyecto nuevo. Es tu propio código, mejorado.
En el mundo real esto se llama iterar — y es lo que hacen
los buenos desarrolladores todo el tiempo.

---

## 🚀 El encargo

GameVault necesita tres mejoras concretas en el panel de inventario:
más opciones de filtrado, un filtro por precio y una sección de
destacados que responda en tiempo real a lo que el usuario está viendo.

---

## 📋 Los tickets del sprint

### 🎫 Ticket A — Filtro por plataforma

Agrega un `select` al panel de controles con las plataformas disponibles
(`PC`, `PS5`). Conéctalo al orquestador `aplicarFiltros()` con el mismo
patrón de capas que ya usaste para el género: una función nueva
`filtrarPorPlataforma(lista, plataforma)` y una capa más en la cadena.

Si el usuario selecciona "Todos", el filtro no se aplica.

### 🎫 Ticket B — Filtro por precio máximo

Agrega un `input` de tipo número donde el usuario escribe un precio
máximo. Al aplicar los filtros, solo deben aparecer los juegos con
precio menor o igual a ese valor.

Crea la función `filtrarPorPrecio(lista, precioMax)` y agrégala
como una capa más en `aplicarFiltros()`.

Casos a manejar:
- Si el campo está vacío, el filtro no se aplica.
- Rocket League tiene precio `0` — debe aparecer siempre que el
  filtro esté activo, sin importar qué número escriba el usuario.

### 🎫 Ticket C — Sección "Top 3 del filtro"

Debajo de los controles, muestra los tres juegos con mejor rating
del resultado actual. Cada vez que cambie algún filtro, esta sección
se actualiza sola.

La función `obtenerTop3(lista)` debe retornar un array con los tres
mejores. La pista está en el bonus de la clase de hoy: ya sabes cómo
encontrar el mejor rating con `forEach`. Ahora aplícalo tres veces —
encuentra el primero, exclúyelo de la búsqueda del segundo,
excluye los dos primeros para encontrar el tercero.

`filter` y `find` trabajan juntos aquí. Tú decides cómo combinarlos.

---

## 🧠 Lo que debes construir en JS

**1. `filtrarPorPlataforma(lista, plataforma)`**
Mismo patrón que `filtrarPorGenero()` — solo cambia la propiedad.

**2. `filtrarPorPrecio(lista, precioMax)`**
Un `filter` con condición numérica. Recuerda convertir el valor
del input a número con `Number()` antes de comparar.

**3. `obtenerTop3(lista)`**
Retorna un array con los tres objetos de mayor rating.
Pista: encuentra el mejor con `forEach` + `find`, luego
usa `filter` para quitarlo de la lista y repite el proceso
dos veces más.

**4. Actualizar `aplicarFiltros()`**
Integra los tres tickets como capas nuevas en el orquestador.
El patrón ya lo conoces — solo son tres `if` más en la cadena.

---

## 📦 Entregables

1. **Repositorio en GitHub** — puede ser el mismo de la clase
   en una rama nueva, o un fork. Lo que prefieras.
2. **Proyecto desplegado** en GitHub Pages o Vercel.
3. **README actualizado** explicando qué tickets resolviste,
   qué función creaste para cada uno y qué aprendiste
   al combinar los filtros en cadena.

---

## ✅ Criterios

**Funcionalidad:**
- Los tres filtros nuevos funcionan solos y combinados entre sí
- El Top 3 se actualiza en tiempo real al cambiar cualquier filtro
- Si el filtro activo tiene menos de 3 resultados, el Top 3 muestra
  solo los que hay — no explota
- No hay errores en consola

**Código:**
- Cada ticket vive en su propia función con `return`
- `aplicarFiltros()` aplica las capas en orden sin repetir lógica
- Comentarios que expliquen las partes nuevas que agregaste

**Diseño:**
- La sección Top 3 tiene una estética diferenciada del grid principal
- Los controles nuevos son consistentes con los que ya existían
- El layout se ve bien en móvil y desktop

---

## 🔥 Extra Bonus — El Comparador

Si terminaste todo lo anterior y tienes energía de sobra,
aquí hay un reto extra que va un nivel más arriba.

**El equipo de ventas quiere comparar dos juegos lado a lado.**

Implementa un modo comparador donde el usuario escriba dos títulos
en campos separados, presione un botón y la app muestre una tarjeta
doble con los stats de ambos enfrentados:

- Usa `find` dos veces para atrapar cada objeto por su título exacto.
- Si uno de los dos no existe en el catálogo, muestra un aviso claro
  antes de intentar renderizar nada.
- El ganador en rating, precio más bajo y mayor stock se resaltan
  visualmente en cada columna.

Pista: tres `if` simples comparando las propiedades de los dos objetos
son todo lo que necesitas para decidir quién gana en cada categoría.

> ⚠️ El programa funciona perfectamente sin este bonus.
> El bonus es para los que quieren llegar al siguiente sprint
> con ventaja.

---

## 💬 Últimas palabras de tu Tech Lead

> *"Filtrar no es magia — es hacerle preguntas a los datos.
> Cuando encadenas tres filtros, no estás escribiendo tres veces
> el mismo código: estás construyendo un motor de consultas
> que responde cualquier combinación posible de preguntas.
> Eso es pensar como ingeniero."*

> *"El panel que entregues esta semana ya no es un ejercicio.
> Es una feature real. Trátala como tal."*

---

**Módulo:** 3 — Lección 3: Sistemas de Información
**Dificultad:** ⭐⭐⭐ Intermedio
**Tiempo estimado:** 3 a 5 horas