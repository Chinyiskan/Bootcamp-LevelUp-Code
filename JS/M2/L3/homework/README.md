# 🚀 Home Challenge — Elige tu Cliente

---

## El contexto

Llevas tres semanas en **The Bit Masters**, la agencia de desarrollo donde conseguiste tu primer trabajo como trainee. Hasta ahora has estado observando, tomando notas y ayudando en tareas pequeñas.

Hoy tu Senior se acerca al escritorio y dice:

> *"Tenemos tres clientes esperando. Los tres necesitan lo mismo en el fondo: un sistema que procese datos repetitivos de forma automática. Nada que no puedas manejar con lo que ya sabes. Revisa los briefings, elige el que más te llame y entrégame algo que podamos mostrarle al cliente el viernes."*
>
> *"Ah, y una cosa: aquí no entregamos borradores. Si va con tu nombre, que se vea profesional."*

Abres los briefings. Hay tres sobre la mesa.

---

## 📋 Antes de elegir — Lee esto

Los tres proyectos tienen el mismo nivel de exigencia técnica. No hay uno más fácil que otro. Todos requieren:

- Un **bucle `for`** como motor principal
- Un **acumulador** que vaya sumando resultados vuelta a vuelta
- Lógica **`if / else`** dentro del bucle para tomar decisiones
- Funciones con `return` para los cálculos (nada de lógica suelta en los eventos)
- Una interfaz que un cliente real pagaría por usar

Elige el que más conecte contigo. La motivación importa más que la comodidad.

---

## 🟢 Cliente A — RepTracker

**Sector:** Fitness / Bienestar
**Contacto:** Daniela Mora, fundadora de una app de entrenamiento personal

> *"Nuestros usuarios anotan sus rutinas en papel. Necesito una herramienta donde ingresen sus series y el sistema les diga cuánto trabajaron, cuánto les falta y si están progresando."*

### Tu misión

Crear una app donde el usuario configure su sesión de entrenamiento: cuántas series va a hacer, cuántas repeticiones por serie y el peso usado. El sistema genera el reporte completo de la sesión.

### Qué debe hacer la app

El usuario ingresa el número de series, las reps por serie y el peso. Al presionar **"Generar Sesión"**, un bucle recorre cada serie y construye su fila en el reporte. Al final muestra el resumen de la sesión.

**Cálculos obligatorios:**

- Volumen por serie: `reps × peso`
- Volumen total acumulado: suma de todas las series
- Clasificación de la sesión según volumen total:
  - **Ligera:** menos de 5.000 kg
  - **Moderada:** entre 5.000 y 15.000 kg
  - **Intensa:** más de 15.000 kg

**La interfaz debe mostrar:**

- Una fila por cada serie con su número, reps, peso y volumen
- Resumen final: total de series, total de reps, volumen total y clasificación

### Extra task

- Que el usuario pueda ingresar el nombre del ejercicio y aparezca en el reporte
- Agregar un segundo ejercicio y comparar cuál tuvo mayor volumen
- Mostrar calorías aproximadas quemadas (usa 0.1 kcal por kg de volumen como estimado)

---

## 🔵 Cliente B — StarterKit

**Sector:** Ciberseguridad / Productividad
**Contacto:** Tomás Vargas, CTO de una startup de herramientas para developers

> *"Nuestros usuarios necesitan generar contraseñas seguras constantemente. Quiero una herramienta rápida, limpia y confiable. Nada de terceros, la lógica debe ser nuestra."*

### Tu misión

Crear un generador de contraseñas donde el usuario elige la longitud y el tipo de caracteres. El sistema construye la contraseña carácter a carácter usando un bucle y muestra un análisis de seguridad.

### Qué debe hacer la app

El usuario selecciona la longitud (entre 8 y 32 caracteres) y activa o desactiva tipos de caracteres: minúsculas, mayúsculas, números y símbolos. Al presionar **"Generar"**, el bucle construye la contraseña y el sistema evalúa su fortaleza.

**Cálculos obligatorios:**

- Construcción de la contraseña: un `for` que en cada vuelta elige un carácter aleatorio del pool seleccionado
- Conteo de cada tipo de carácter presente en el resultado
- Nivel de seguridad según longitud y variedad:
  - **Débil:** menos de 10 caracteres o un solo tipo
  - **Media:** entre 10 y 16 caracteres con al menos 2 tipos
  - **Fuerte:** más de 16 caracteres con 3 o más tipos

**La interfaz debe mostrar:**

- La contraseña generada con opción de copiar
- Barra visual de nivel de seguridad
- Desglose: cuántos caracteres de cada tipo tiene la contraseña

**Pista técnica:** Para elegir un carácter aleatorio de un string usa:

```javascript
let pool = "abcdefghijklmnopqrstuvwxyz";
let charAleatorio = pool[Math.floor(Math.random() * pool.length)];
```

### Extra task

- Botón para regenerar sin cambiar la configuración
- Historial de las últimas 5 contraseñas generadas en la sesión
- Opción de excluir caracteres confusos (0, O, l, 1)

---

## 🟡 Cliente C — ScoreBoard

**Sector:** Entretenimiento / Esports
**Contacto:** Valentina Cruz, organizadora de torneos de videojuegos universitarios

> *"Organizo torneos entre facultades y todo lo hago a mano en Excel. Necesito algo donde ingrese los resultados de cada partida y me dé la tabla de rendimiento automáticamente."*

### Tu misión

Crear una app donde el organizador ingresa los puntos obtenidos por un jugador en cada partida de un torneo. El sistema procesa todos los resultados y genera la tabla de rendimiento.

### Qué debe hacer la app

El usuario define cuántas partidas tuvo el jugador e ingresa el puntaje de cada una. Al presionar **"Calcular Rendimiento"**, un bucle recorre cada partida, construye su fila en la tabla y acumula los totales.

**Cálculos obligatorios:**

- Puntaje acumulado: suma de todas las partidas
- Promedio por partida: total ÷ número de partidas
- Mejor y peor partida del torneo (usa `if` dentro del bucle para comparar)
- Categoría del jugador según promedio:
  - **Leyenda:** promedio mayor a 80
  - **Pro:** promedio entre 50 y 80
  - **Amateur:** promedio entre 25 y 50
  - **Novato:** promedio menor a 25

**La interfaz debe mostrar:**

- Una fila por partida con su número y puntaje
- Resumen: puntaje total, promedio, mejor partida, peor partida y categoría

### Extra task

- Permitir ingresar el nombre del jugador y que aparezca en el reporte
- Agregar un segundo jugador y mostrar quién ganó el torneo
- Resaltar visualmente la mejor y peor partida en la tabla

---

## 📦 Entregables

```
mi-proyecto/
├── index.html      
├── style.css       
├── script.js       
└── README.md       
```

Tu README debe explicar qué cliente elegiste, qué funciones creaste y qué hace cada una.

---

## 📜 El contrato de The Bit Masters

Para que el proyecto sea aprobado:

**Toda la lógica de cálculo vive dentro de funciones con `return`.** Nada de cálculos sueltos dentro de los eventos.

**Las funciones solo usan lo que reciben por parámetros.** No leen el DOM adentro.

**El bucle `for` es el motor.** Si tu solución no usa un bucle para procesar las iteraciones, no cumple el requisito.

**La interfaz debe verse profesional.** Responsive, colores coherentes, sin errores de consola, no olvides colocar al menos una imagen o ilustracion decorativa.

---

## 🎓 Criterios de evaluación

| Criterio | Peso | Qué se evalúa |
|----------|------|---------------|
| **Bucle y acumulador** | 35% | El `for` procesa los datos correctamente vuelta a vuelta |
| **Funcionalidad completa** | 30% | Todo lo especificado funciona sin errores |
| **Arquitectura de funciones** | 25% | Lógica encapsulada, parámetros claros, `return` presente |
| **Diseño profesional** | 10% | UI limpia, coherente y responsive |

---

## 💬 Últimas palabras de tu Senior

> *"No me entregues lo primero que funcione. Entrégame lo mejor que puedas hacer."*

> *"Antes de escribir código, escribe en papel qué hace el bucle en cada vuelta. Si no puedes explicarlo en español, no puedes programarlo."*

> *"El extra task no es obligatorio. Pero los trainees que lo hacen son los que recuerdo cuando hay una vacante."*

---

**Módulo:** 2 — Lección 3: Bucles
**Dificultad:** ⭐⭐⭐ Intermedio
**Tiempo estimado:** 4 a 6 horas
