# Tamagotchi v2.0 — Premium Expansion Pack
## Tarea Semanal · M4L2 · LevelUp Code Bootcamp 2026

---

> **De:** Tech Lead (Área de Desarrollo)
> **Asunto:** RE: FEEDBACK CLIENTE - ¡Demo aprobada!
> 
> *¡Equipo! El cliente (RetroToys) quedó fascinado con el prototipo que entregaron en clase. Los inversores ya están preguntando por la fecha de lanzamiento, pero antes nos han pedido una actualización 'Premium'.*
> 
> *Quieren implementar un sistema de economía para que el usuario sienta progreso. El objetivo es que cuidar a la mascota genere ingresos, y que con ese dinero se puedan desbloquear fondos nuevos y una mascota secreta: el Perrito. Tienen una semana para este sprint de expansión.*

---

## 📦 Notas del Repositorio
**IMPORTANTE:** En este repositorio **solo encontrarás las imágenes extra** (`images/puppy_...`, `images/beach.webp`, `images/space.webp`). 
Para que el proyecto funcione, debes copiar aquí todo el código que desarrollamos en clase (`main.js`, `pet.js`, `ui.js`, etc.). Este es un proyecto acumulativo: tu base de código es la que ya hiciste.

---

## Tus tickets de expansión

### 🎫 Ticket 1 — El Sistema de Economía (Billetera)
La mascota ahora debe ser capaz de "trabajar" para ganar su sustento.
1.  **Billetera:** Agrega `this.coins = 0` al constructor en `pet.js`.
2.  **Ganar Monedas:** Modifica tus métodos `feed()`, `play()` y `clean()`. Cada vez que se ejecuten con éxito, suma una pequeña cantidad de monedas (ej: 10 🪙).
3.  **UI:** Crea un contador en tu HTML para que el usuario vea su saldo actual.

### 🎫 Ticket 2 — La Tienda "Premium"
Crea un menú o sección de tienda donde el usuario pueda comprar las siguientes mejoras (puedes ajustar los precios a tu gusto):
* **Fondo de Playa (100 🪙):** Cambia el fondo de la habitación.
* **Fondo Espacial (200 🪙):** Un fondo de otro mundo.
* **Mascota Perrito (500 🪙):** ¡El gran premio! Al comprarlo, la mascota actual debe transformarse permanentemente en el perrito.

**Lógica Técnica:** Crea un método `gastarMonedas(cantidad)` que verifique si el saldo es suficiente. Si lo es, descuenta y retorna `true`. Si no, retorna `false` y muestra un aviso al usuario.

### 🔥 Ticket 3 — BONUS: El Salón Arcade
Para los que no quieren esperar, crea un acceso a un mini-juego rápido (como un Piedra, Papel o Tijera o un juego de adivinar un número o encontrar los pares). Si el usuario gana, se lleva un premio gordo de monedas o simplemente haces que se ganen mas monedas.

---

## 💡 Tips del Senior

**1. ¿Cómo cambio al perrito?**
Te recomiendo crear una propiedad `this.isPuppy = false` en el constructor. Cuando compren el perro, cámbiala a `true`. Luego, en tu método `_resolveSprite()`, usa esa propiedad para decidir si la ruta de la imagen debe ser la del perro o la de la larva.

**2. Desbloqueables:**
Usa booleanos para saber si el usuario ya compró algo (ej: `this.hasSpaceBackground = false`). Una vez comprado, el botón de la tienda debería cambiar su funcionalidad de "Comprar" a "Equipar".

**3. Persistencia:**
Si quieres que el dinero y las compras no se borren al recargar la página, no olvides agregarlos a tu sistema de `localStorage` dentro de `pet.js`.

---

## Regla de oro

> No intentes hacer todo de una. Primero asegúrate de que el bicho gane monedas. Luego crea el botón para gastarlas. Al final, preocúpate por los cambios visuales. 
> 
> ¡Suerte con el perrito, nos vemos en la próxima revisión de código! 🎮