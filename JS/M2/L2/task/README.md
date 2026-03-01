# 🍔 BitBurger POS - Sistema de Punto de Venta

## 📋 Descripción del Proyecto

¡Bienvenido al equipo de desarrollo de **BitBurger**! La franquicia tiene un sistema que "funciona", pero está lleno de **deuda técnica**. El programador anterior (un becario sin experiencia) dejó todo el código en un bloque gigante y repetitivo. Tu misión es **refactorizar el código usando funciones** y **agregar nuevas funcionalidades** para el departamento de marketing.

Este proyecto te pondrá en los zapatos de un desarrollador real trabajando con:
- **TICKET 1:** Refactorización (eliminar código repetitivo)
- **TICKET 2:** Nueva feature (sistema de descuentos)

---

## 🎯 Objetivos de Aprendizaje

En este proyecto dominarás:
- ✅ **Funciones puras** - Crear funciones reutilizables
- ✅ **Parámetros y retorno** - Enviar datos y recibir resultados
- ✅ **DRY (Don't Repeat Yourself)** - Evitar código repetitivo
- ✅ **Refactorización** - Mejorar código existente sin cambiar su comportamiento
- ✅ **Cálculos matemáticos** - IVA, descuentos, totales
- ✅ **Lógica condicional en funciones** - Decisiones dentro de funciones

---

## 🎫 TICKET 1: Eliminar Deuda Técnica (Refactorización)

**Prioridad:** 🔴 Alta  
**Tipo:** Refactorización  
**Tiempo estimado:** 20 minutos

### 📝 Descripción del Problema:

El código actual calcula el IVA y formatea el dinero **de forma repetitiva** en varios lugares. Esto hace que:
- Sea difícil de mantener
- Sea propenso a errores
- No sea escalable

### ✅ Tareas:

#### Sub-tarea A: Crear función `calcularIVA(subtotal)`
- **Entrada:** `subtotal` (número)
- **Salida:** IVA calculado (subtotal × 0.19)
- **Propósito:** Calcular el 19% de impuesto sobre el subtotal

```javascript
// Ejemplo de uso:
let iva = calcularIVA(10000);
console.log(iva); // 1900
```

#### Sub-tarea B: Crear función `formatearDinero(numero)`
- **Entrada:** `numero` (número)
- **Salida:** String formateado como "$10.000"
- **Propósito:** Mostrar los números como moneda legible

```javascript
// Ejemplo de uso:
let precio = formatearDinero(15000);
console.log(precio); // "$15.000"
```

#### Sub-tarea C: Sustituir código repetitivo
- Reemplazar todos los cálculos manuales de IVA por llamadas a `calcularIVA()`
- Reemplazar todos los formateos de dinero por llamadas a `formatearDinero()`

---

## 🎫 TICKET 2: Feature - Sistema de Happy Hour & Cupones

**Prioridad:** 🟡 Media  
**Tipo:** Nueva Funcionalidad  
**Tiempo estimado:** 20 minutos

### 📝 Descripción del Requerimiento:

El departamento de marketing quiere lanzar promociones. Necesitamos un sistema de cupones que aplique descuentos antes de calcular el IVA.

### ✅ Tareas:

#### Crear función `aplicarDescuento(total, codigo)`
- **Entrada:** 
  - `total` (número): El subtotal antes de descuentos
  - `codigo` (string): El código de cupón ingresado
- **Salida:** Total con descuento aplicado
- **Lógica:**
  - Si `codigo === "BIT10"`: descuento del 10%
  - Si `codigo === "HAPPYHOUR"`: descuento del 20%
  - Si el código es inválido o vacío: retornar el total original sin cambios

```javascript
// Ejemplos de uso:
let subtotal = 10000;
let conDescuento = aplicarDescuento(subtotal, "BIT10");
console.log(conDescuento); // 9000

let sinDescuento = aplicarDescuento(subtotal, "INVALIDO");
console.log(sinDescuento); // 10000
```

### ⚖️ Regla de Negocio Importante:

El descuento se aplica **ANTES** de calcular el IVA:

$$
Total_{final} = (Subtotal - Descuento) + IVA
$$

**Orden correcto:**
1. Calcular subtotal (suma de items)
2. **Aplicar descuento** con `aplicarDescuento()`
3. Calcular IVA sobre el total con descuento con `calcularIVA()`
4. Sumar para obtener el total final

---

## 🚀 Sprint de Desarrollo (40 minutos)

### **SPRINT 1: Refactorizar - Crear las funciones base** ⏱️ 15 min

- [ ] Crear la función `calcularIVA(subtotal)`
- [ ] Crear la función `formatearDinero(numero)`
- [ ] Probar ambas funciones con `console.log()`
- [ ] Reemplazar el código repetitivo en el botón "Agregar Combo"

**💡 Pista:** Las funciones deben estar **fuera** del evento del botón para que sean reutilizables.

---

### **SPRINT 2: Nueva Feature - Sistema de descuentos** ⏱️ 15 min

- [ ] Crear la función `aplicarDescuento(total, codigo)`
- [ ] Implementar la lógica con `if/else` para los códigos
- [ ] Integrar la función en el flujo del botón "Pagar"
- [ ] Probar con diferentes códigos de cupón

**💡 Pista:** Recuerda que el descuento se aplica ANTES del IVA.

---

### **SPRINT 3: Testing & Polish** ⏱️ 10 min

- [ ] Probar el flujo completo: agregar items → aplicar cupón → pagar
- [ ] Verificar que los números se muestren correctamente formateados
- [ ] Probar con código válido ("BIT10", "HAPPYHOUR")
- [ ] Probar con código inválido
- [ ] Verificar que no haya errores en la consola

**💡 Pista:** Usa `console.log()` para verificar cada paso del cálculo.

---

## ✅ Resultado Esperado

Al finalizar, tu aplicación debe:

### 1. **Funciones Creadas:**
   - `calcularIVA(subtotal)`: Retorna el 19% del subtotal
   - `formatearDinero(numero)`: Retorna "$X.XXX" formateado
   - `aplicarDescuento(total, codigo)`: Aplica descuento según código

### 2. **Sistema de Combos:**
   - Agregar combos al carrito
   - Ver el subtotal actualizado (formateado)
   - Sin código repetitivo

### 3. **Sistema de Cupones:**
   - Input para ingresar código de cupón
   - Cupón "BIT10" aplica 10% de descuento
   - Cupón "HAPPYHOUR" aplica 20% de descuento
   - Códigos inválidos no generan errores

### 4. **Cálculo Final Correcto:**
   - Subtotal = Suma de items
   - Total con Descuento = Subtotal - Descuento
   - IVA = 19% del total con descuento
   - Total Final = Total con Descuento + IVA
   - Todos los valores mostrados con formato de dinero

### 5. **UI Profesional:**
   - Diseño limpio tipo McDonald's/Burger King
   - Colores corporativos (rojo, amarillo, blanco)
   - Interacciones suaves
   - Feedback visual al agregar items

---

## 🛠️ Tecnologías

- **HTML5** - Estructura (ya completa)
- **Bootstrap 5** - Layout y componentes
- **Vanilla CSS** - Estilos personalizados
- **JavaScript (Vanilla)** - Lógica con funciones

---

## 📚 Estructura de Funciones

### Anatomía de una Función:

```javascript
function nombreFuncion(parametro1, parametro2) {
    // Código que hace algo con los parámetros
    let resultado = parametro1 + parametro2;
    return resultado; // Devuelve el resultado
}

// Llamar/usar la función:
let miResultado = nombreFuncion(5, 3);
console.log(miResultado); // 8
```

### Funciones Puras:
Una función pura:
- Siempre retorna el mismo resultado con los mismos parámetros
- No modifica variables externas
- Solo trabaja con lo que recibe

**Ejemplo:**
```javascript
// ✅ PURA - Solo usa lo que recibe
function sumar(a, b) {
    return a + b;
}

// ❌ NO PURA - Modifica variable externa
let total = 0;
function sumarAlTotal(numero) {
    total += numero; // ¡Modifica variable externa!
}
```

---

## 🧮 Fórmulas Matemáticas

Antes de programar, necesitas entender las matemáticas. Aquí están las fórmulas que debes implementar:

### 📐 Cálculo de IVA (19%)

**Fórmula:**
```
IVA = Subtotal × 0.19
```

**Ejemplo:**
- Subtotal: $10.000
- IVA: $10.000 × 0.19 = $1.900

**¿Por qué 0.19?** 
- 19% se escribe como fracción: 19/100 = 0.19

---

### 💰 Cálculo de Descuentos

**Fórmula para 10% de descuento:**
```
Total con descuento = Total original × 0.90
```
*Alternativa: `Total original - (Total original × 0.10)`*

**Fórmula para 20% de descuento:**
```
Total con descuento = Total original × 0.80
```
*Alternativa: `Total original - (Total original × 0.20)`*

**Ejemplos:**

| Total Original | Descuento | Fórmula        | Total con Descuento |
| -------------- | --------- | -------------- | ------------------- |
| $10.000        | 10%       | $10.000 × 0.90 | $9.000              |
| $10.000        | 20%       | $10.000 × 0.80 | $8.000              |

**¿Por qué 0.90 para 10% OFF?**
- Si descuentas 10%, te queda el 90%
- 90% = 90/100 = 0.90

---

### 🧾 Cálculo del Total Final

**Orden de operaciones:**
```
1. Subtotal = Suma de todos los items
2. Total con Descuento = Subtotal - Descuento
3. IVA = Total con Descuento × 0.19
4. Total Final = Total con Descuento + IVA
```

**Ejemplo completo:**
```
Items: $8.500 + $12.000 = $20.500 (Subtotal)
Cupón "BIT10" (10% OFF): $20.500 × 0.90 = $18.450
IVA sobre $18.450: $18.450 × 0.19 = $3.505,50
Total Final: $18.450 + $3.505,50 = $21.955,50
```

**⚠️ IMPORTANTE:** El IVA se calcula **DESPUÉS** del descuento, no antes.

---

### 💵 Formato de Dinero

**Transformación:**
```
Número normal → Número con puntos de miles
15000 → "15.000"
1500 → "1.500"
```

**Agregar símbolo de pesos:**
```
"15.000" → "$15.000"
```

---

## 🎓 Consejos del Tech Lead

> *"Las funciones son como empleados: dales una tarea específica, proporcionales lo que necesitan (parámetros), y espera un resultado (return). Una función que hace 10 cosas es un mal empleado."*

> *"Si copias y pegas código, necesitas una función. DRY: Don't Repeat Yourself."*

> *"Nombra tus funciones como acciones: `calcular...`, `formatear...`, `aplicar...`. El nombre debe decir exactamente qué hace."*

> *"Prueba tus funciones de forma aislada con `console.log()` antes de integrarlas. Es más fácil debuggear funciones pequeñas."*

---

## 🏆 Bonus Challenge (Opcional)

Si terminas antes de tiempo, intenta:

### Nivel 1:
- Agregar validación: si el carrito está vacío, mostrar alerta
- Crear función `reset()` que limpie todo

### Nivel 2:
- Agregar más cupones con diferentes descuentos
- Crear función `calcularDescuento(total, porcentaje)` reutilizable

### Nivel 3:
- Agregar límite de usos por cupón
- Mostrar cuánto ahorraron con el descuento

---

## 🐛 Debugging Tips

**Problema:** La función no retorna nada
- ✅ Verifica que uses `return`

**Problema:** Los cálculos están mal
- ✅ Usa `console.log()` dentro de la función para ver los valores

**Problema:** "Function is not defined"
- ✅ Asegúrate de declarar la función ANTES de llamarla

**Problema:** El formato de dinero no se muestra
- ✅ Verifica que uses `formatearDinero()` al actualizar el HTML

---

## 📖 Conceptos Clave Repasados

- ✅ **Declaración de funciones** - `function nombre() {}`
- ✅ **Parámetros** - Datos que recibe la función
- ✅ **Return** - Valor que devuelve la función
- ✅ **Llamar funciones** - `nombreFuncion(arg1, arg2)`
- ✅ **Reutilización de código** - DRY principle
- ✅ **Refactorización** - Mejorar sin romper
- ✅ **Orden de operaciones** - Descuento → IVA → Total

---

**¡A refactorizar! 💪 ¡Muéstranos tus habilidades de desarrollo profesional!**

---

**Desarrollado para:** BitBurger  
**Dificultad:** ⭐⭐⭐ Intermedio-Avanzado  
**Tiempo estimado:** 40 minutos  
**Módulo:** 2 - Lección 2: Funciones  
**Versión:** 1.0
