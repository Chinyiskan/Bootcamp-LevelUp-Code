# Concurso de Lógica — Misión 13
**LevelUp Code Bootcamp · 2026**

---

## Instrucciones

- Crea un archivo `logica.js` y trabaja ahí.
- Usa `console.log()` para mostrar todos tus resultados.
- Ejecuta con el botón ▶ de la extensión **Run Code** en VS Code.
- Puedes hacer los ejercicios en cualquier orden.
- Elige los que puedas resolver — no es obligatorio hacerlos todos.

---

## Puntuación

| Categoría   | Puntos por ejercicio |
|-------------|----------------------|
| Fácil       | 10 pts               |
| Intermedio  | 20 pts               |
| Difícil     | 30 pts               |

**Puntuación máxima: 200 pts**

---

---

# Fácil

---

### Ejercicio 1 — FizzBuzz `[10 pts]`

Recorre los números del **1 al 30** con un bucle. Para cada número:

- Si es múltiplo de **3** → imprime `"Fizz"`
- Si es múltiplo de **5** → imprime `"Buzz"`
- Si es múltiplo de **3 y de 5** → imprime `"FizzBuzz"`
- Si no es múltiplo de ninguno → imprime el número normalmente

Ejemplo de salida (primeros 16):
```
1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz, 16...
```

**Recuerda:**
- El operador `%` devuelve el residuo de una división.
  Si `numero % 3 === 0`, el número es divisible entre 3.
- El caso `"FizzBuzz"` debe evaluarse **antes** que los otros dos.

---

### Ejercicio 2 — Cuadrado y triángulo `[10 pts]`

Crea una función `dibujarFigura(lado, figura)` que reciba el tamaño del lado
y el nombre de la figura (`"cuadrado"` o `"triangulo"`) e imprima la figura
con asteriscos `*`.

Ejemplo para `dibujarFigura(4, "cuadrado")`:
```
****
****
****
****
```

Ejemplo para `dibujarFigura(4, "triangulo")`:
```
*
**
***
****
```

**Recuerda:**
- Necesitarás dos bucles anidados: el externo controla las filas,
  el interno construye cada fila.
- Para el cuadrado, cada fila tiene siempre el mismo número de `*`.
- Para el triángulo, la fila `i` tiene exactamente `i` asteriscos.
- Puedes acumular los `*` en una variable string dentro del bucle interno
  y hacer un solo `console.log` por fila.

---

### Ejercicio 3 — Años bisiestos `[10 pts]`

Crea una función `bisiestos(anioInicio)` que imprima los **30 próximos
años bisiestos** a partir del año recibido.

Ejemplo: `bisiestos(2024)` debería imprimir 2024, 2028, 2032...

Un año es bisiesto si:
- Es divisible entre **4**, Y
- Si es divisible entre **100**, también debe serlo entre **400**.

**Recuerda:**
- La condición completa en código es:
  `(anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0)`
- Necesitas un bucle que no cuente años, sino **años bisiestos encontrados**.
  Un `while` o un `for` con un contador separado funcionan bien aquí.

---

---

# Intermedio

---

### Ejercicio 4 — Marco de texto `[20 pts]`

Crea una función `marcoDeTexto(texto)` que reciba una cadena de palabras
y las imprima dentro de un marco rectangular de asteriscos,
con cada palabra en su propia línea.

Ejemplo: `marcoDeTexto("¿Qué te parece el reto?")`:
```
**********
* ¿Qué   *
* te     *
* parece *
* el     *
* reto?  *
**********
```

El ancho del marco se adapta a la palabra más larga.

**Recuerda:**
- `texto.split(" ")` convierte el string en un array de palabras.
- Necesitas encontrar la longitud de la palabra más larga para saber
  cuánto mide el marco. Un bucle con una variable `let maxLong = 0`
  que se actualiza con un `if` funciona bien.
- Para que las palabras queden alineadas, cada línea debe tener el mismo
  ancho. Si una palabra es más corta, rellena con espacios hasta completar.
- La primera y última línea son solo asteriscos.

---

### Ejercicio 5 — Daño Pokémon `[20 pts]`

Crea una clase `Pokemon` con las propiedades `nombre`, `tipo`, `ataque`
y `defensa` (ataque y defensa son números entre 1 y 100).

Luego crea una función `calcularDanio(atacante, defensor)` que reciba
dos instancias de `Pokemon` y retorne el daño causado según esta fórmula:

```
daño = 50 * (ataque / defensa) * efectividad
```

La efectividad depende de los tipos:

| Atacante  | Defensor  | Efectividad |
|-----------|-----------|-------------|
| Fuego     | Planta    | x2          |
| Agua      | Fuego     | x2          |
| Planta    | Agua      | x2          |
| Eléctrico | Agua      | x2          |
| Fuego     | Agua      | x0.5        |
| Agua      | Planta    | x0.5        |
| Planta    | Fuego     | x0.5        |
| Agua      | Eléctrico | x0.5        |
| cualquier otro | cualquier otro | x1   |

Pruébalo con al menos tres combinaciones distintas e imprime el resultado.

**Recuerda:**
- Crea los Pokémon con `new Pokemon(...)` antes de llamar a la función.
- La efectividad se determina comparando `atacante.tipo` y `defensor.tipo`
  con `if / else if`.
- El resultado puede tener decimales — es normal.

---

### Ejercicio 6 — Los ejércitos `[20 pts]`

Dos ejércitos se enfrentan. Cada uno está formado por razas,
y cada raza tiene un valor de poder. El resultado de la batalla
depende de la **suma total** de (valor × cantidad de integrantes) de cada ejército.

Razas disponibles y su valor:

| Raza           | Bando   | Valor |
|----------------|---------|-------|
| Pelosos        | Bien    | 1     |
| Sureños buenos | Bien    | 2     |
| Enanos         | Bien    | 3     |
| Númenóreanos   | Bien    | 4     |
| Elfos          | Bien    | 5     |
| Sureños malos  | Mal     | 2     |
| Orcos          | Mal     | 2     |
| Goblins        | Mal     | 2     |
| Huargos        | Mal     | 3     |
| Trolls         | Mal     | 5     |

Crea una clase `Raza` con las propiedades `nombre`, `valor` e `integrantes`.
Arma dos ejércitos (arrays de instancias de `Raza`), calcula la fuerza total
de cada uno y determina quién gana o si hay empate.

**Recuerda:**
- La fuerza de cada tropa es `raza.valor * raza.integrantes`.
- Suma la fuerza de todas las tropas de cada ejército con un bucle.
- Compara los totales con `if / else` para declarar el resultado.
- Tienes total libertad para decidir cuántas tropas tiene cada ejército.

---

### Ejercicio 7 — ¿Dónde está el robot? `[20 pts]`

Un robot comienza en la posición `(x: 0, y: 0)` mirando hacia el norte
(eje `y` positivo). Recibe un array de pasos a dar.

Reglas:
- Cada número del array indica cuántos pasos da antes de detenerse.
- Los pasos negativos van en sentido contrario a donde mira.
- Después de cada secuencia de pasos, el robot gira **90 grados
  en sentido antihorario** (norte → oeste → sur → este → norte...).
- Los primeros pasos siempre son en el eje `y`.

Ejemplo: `[10, 5, -2]`
- Mueve 10 hacia el norte → y = 10
- Gira: ahora mira al oeste. Mueve 5 hacia el oeste → x = -5
- Gira: ahora mira al sur. Mueve -2 en sentido contrario al sur → y = 10 + 2 = 12
- Resultado: `x: -5, y: 12`

Crea una función `moverRobot(pasos)` que reciba el array y retorne
(o imprima) las coordenadas finales.

**Recuerda:**
- Necesitas una variable que guarde la dirección actual: puedes usar
  un número (0 = norte, 1 = oeste, 2 = sur, 3 = este) y avanzar con `(dir + 1) % 4`.
- Según la dirección y el signo del paso, decides si sumar o restar en `x` o en `y`.
- Piensa bien cómo el giro afecta el significado de un paso negativo.

---

---

# Difícil

---

### Ejercicio 8 — ¿Es número primo? `[30 pts]`

Crea una función `esPrimo(numero)` que retorne `true` si el número es primo
y `false` si no lo es.

Un número primo es mayor que 1 y no tiene divisores entre 2 y (numero − 1).

Pruébala con varios números:
```
esPrimo(2)  → true
esPrimo(7)  → true
esPrimo(10) → false
esPrimo(1)  → false
esPrimo(97) → true
```

**Recuerda:**
- Recorre con un `for` desde 2 hasta `numero - 1`.
  Si en alguna vuelta `numero % i === 0`, no es primo → `return false`.
- Si el bucle termina sin encontrar divisor → `return true`.
- El 1 no es primo por definición — manéjalo con un `if` al inicio.

---

### Ejercicio 9 — Sucesión de Fibonacci `[30 pts]`

Imprime los **50 primeros números** de la sucesión de Fibonacci empezando en 0.

```
0, 1, 1, 2, 3, 5, 8, 13, 21, 34...
```

Cada número es la suma de los dos anteriores.

**Recuerda:**
- No necesitas guardar toda la sucesión en un array.
  Con dos variables (`let a = 0` y `let b = 1`) y un bucle es suficiente.
- En cada vuelta: el siguiente número es `a + b`,
  luego `a` toma el valor de `b`, y `b` toma el valor del siguiente.
- Piensa bien el orden de las asignaciones — si no, pisas un valor
  antes de usarlo.

---

### Ejercicio 10 — ¿Cuántos días? `[30 pts]`

Crea una función `diasEntre(fecha1, fecha2)` que reciba dos fechas
en formato `"dd/MM/yyyy"` y retorne cuántos días hay entre ellas.
La diferencia debe ser siempre positiva, sin importar el orden.

```
diasEntre("01/01/2024", "15/03/2024") → 74
diasEntre("15/03/2024", "01/01/2024") → 74
```

**Recuerda:**
- Puedes separar día, mes y año con `fecha.split("/")`.
  Esto devuelve un array: `["01", "01", "2024"]`.
- Con esos datos puedes construir un objeto `Date`:
  `new Date(anio, mes - 1, dia)` (el mes va de 0 a 11 en JavaScript).
- La diferencia entre dos fechas en milisegundos es `fecha2 - fecha1`.
  Para convertir a días: divide entre `1000 * 60 * 60 * 24`.
- Para el valor absoluto puedes usar `Math.abs(...)` — recibe un número
  y devuelve su versión positiva.

---

---

*LevelUp Code Bootcamp · Misión 13 — Plantillas de Software*