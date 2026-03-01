# StartupPay — Payroll Engine 💸

> **M2L3 · Sprint de clase · ~20 min**

---

## El contexto

Son las 9:15 AM. Llegas al daily standup y el Tech Lead dice:

> *"Necesitamos generar la nómina de este mes antes del cierre de cuentas.
> El sistema ya tiene el HTML, el CSS, los datos de los cinco freelancers
> y hasta la lógica de pantalla lista.
> Alguien tiene que conectar el motor — el bucle que procesa a todos.
> El ticket es tuyo."*

Silencio. Todos te miran. Abres VS Code.

Ese alguien eres tú.

---

## 🧮 La matemática antes del código

Un buen dev entiende el problema **antes** de abrir el editor.

### Pago individual

```
pagoTotal = horas_trabajadas × tarifa_por_hora
```

Ejemplo con Sara Méndez:

```
pagoTotal = 45 horas × $25.000 = $1.125.000
```

### Total de nómina — el acumulador

El total es la suma de los 5 pagos. En JavaScript esto se hace con un **acumulador**: una variable que empieza en `0` y en cada vuelta del bucle suma el pago calculado.

```
acumulador = 0
vuelta 1 → acumulador = 0 + pago₁
vuelta 2 → acumulador = pago₁ + pago₂
... y así hasta 5
```

⚠️ El acumulador debe declararse **antes** del `for`. Si lo declaras dentro, se reinicia a 0 en cada vuelta y pierdes la suma.

---

## 👥 Datos del equipo

| # | Nombre       | Horas | Tarifa/hora |
|---|--------------|-------|-------------|
| 1 | Sara Méndez  | 45    | $25.000     |
| 2 | Luis Torres  | 32    | $30.000     |
| 3 | Valeria Cruz | 18    | $28.000     |
| 4 | Andrés Ríos  | 40    | $22.000     |
| 5 | Camila Vega  | 55    | $35.000     |

---

## 🎫 Tu ticket — 20 min

El botón **Generar Nómina** ya está conectado a `generarNomina()` en el `script.js`. La preparación de pantalla y el resumen final ya están implementados. Tu misión es completar el interior: los acumuladores y el bucle.

Al presionar el botón debe ocurrir esto:

- Aparecen las tarjetas de los cinco freelancers con su desglose
- Las stat cards del hero muestran las horas totales y el monto de la nómina
- Al pie aparece el resumen con el total que pagó la empresa

Sigue los comentarios `TODO` del `script.js` de arriba a abajo.

> 💡 **Tip del Tech Lead:** Los datos están en variables separadas (`empleado1Nombre`, `empleado2Horas`...). Dentro del bucle necesitas un `if / else if` para saber qué variables leer según el valor de `i`. Sí, es incómodo. La próxima semana entenderás por qué existen los arrays. 😉

> 💡 **Tip del Tech Lead:** La función `crearTarjeta()` ya está construida en el `script.js`. Léela, entiende qué parámetros recibe y llámala con los datos correctos.

> ⚠️ **Importante:** El código del resumen final ya usa las variables `acumulador` y `horasTotales`. Asegúrate de nombrarlas exactamente así en el TODO 1, o el código de abajo no va a funcionar.

---

## 🔥 Extra Bonus — 10 min

Dentro del `for`, antes de agregar la tarjeta, declara una variable `etiqueta` y asígnale un texto según las horas del empleado:

- 🟢 Más de 40 horas → `"🟢 Full-time"`
- 🟡 Entre 20 y 40 → `"🟡 Part-time"`
- 🔴 Menos de 20 → `"🔴 Bajo horas"`

Luego muéstrala en consola junto al nombre. Resultado esperado:

```
Sara Méndez → 🟢 Full-time
Luis Torres → 🟡 Part-time
Valeria Cruz → 🔴 Bajo horas
Andrés Ríos → 🟡 Part-time
Camila Vega → 🟢 Full-time
```

---

## 🎓 Consejos del Tech Lead

> *"El bucle `for` no es magia. Es solo una forma de no repetir el mismo bloque de código 5 veces. Cada vuelta es idéntica en estructura, solo cambian los datos."*

> *"Prueba después de cada TODO, no al final de todos. Un error pequeño encontrado a tiempo vale más que cinco errores encontrados juntos."*

> *"Si algo no aparece en pantalla, abre la consola del navegador. El error casi siempre está ahí, esperándote."*

---

**Módulo:** 2 — Lección 3: Bucles
**Dificultad:** ⭐⭐ Intermedio
**Tiempo:** 20 min + 10 min extra bonus