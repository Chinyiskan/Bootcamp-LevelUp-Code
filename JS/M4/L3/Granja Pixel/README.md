# 🌾 Granja Pixel — Guía de Soluciones del Profe

> **Módulo 4 · Lección 3 — Herencia con `extends` y `super()`**  
> Esta guía es para que la consultes si te bloqueaste, quieres comparar tu solución, o quieres entender *por qué* el código funciona así.  
> Léela con calma. Cada decisión tiene una razón.

---

## 📐 Arquitectura del proyecto (qué archivo hace qué)

Antes de ver las soluciones, entiende el mapa:

| Archivo | Rol |
|---|---|
| `Planta.js` | Clase base de todos los cultivos. **No tocar.** |
| `Cultivos.js` | Subclases: `Maiz`, `Fresa`, `Berenjena`. **Tu tarea del día.** |
| `Animal.js` | Clase base de todos los animales. **No tocar.** |
| `Animales.js` | Subclases: `Pollo`, `Vaca`. **Tu tarea del día.** |
| `Corral.js` | Motor y UI del corral. Ya estaba implementado. |
| `Juego.js` | Estado global + bucle principal. Ya estaba implementado. |
| `Interfaz.js` | Renderizado DOM + eventos. Ya estaba implementado. |

La regla de oro es: **los archivos base (`Planta.js`, `Animal.js`) definen el contrato; tus subclases lo implementan.**

---

---

## 🌱 CULTIVOS — `Cultivos.js`

### ¿Cómo leer el código de Maíz antes de empezar?

El `Maiz` ya estaba implementado. Era tu mapa. La estructura es siempre la misma:

```js
export class Maiz extends Planta {   // 1. Extiende Planta
  constructor() {
    super({ /* configuración */ });  // 2. Llama al padre PRIMERO
    this.icono   = '🌽';            // 3. Propiedades propias DESPUÉS
    this.colorUI = '#c8a400';
  }

  renderizar() { /* opcional: sobreescribir */ }
}
```

El error más común: intentar usar `this` **antes** de llamar `super()`. JavaScript te dará `ReferenceError: Must call super constructor in derived class before accessing 'this'`. **`super()` siempre va primero.**

---

### 🎫 Ticket 1 — Clase `Fresa`

**Qué se pedía:** La fresa es el cultivo rápido y frágil:
- Crece en 8 segundos (más rápido que el Maíz con 12).
- Vale 10 oro (menos que el Maíz con 15).
- Pierde agua un **50% más rápido** que cualquier otra planta.

**La solución, paso a paso:**

**[1a] El constructor — `super()` con los valores correctos:**

```js
// Solución Ticket 1a
super({
  nombre:            'Fresa',
  tiempoCrecimiento: 8,   // ← Más RÁPIDO que Maíz (12s)
  valor:             10,  // ← Menos oro que Maíz (15)
  rutaImagen:        'images/fresa/fresa_semillas.webp',
  rutasEstados: {
    semilla: 'images/fresa/fresa.webp',
    brote:   'images/fresa/fresa_brote.webp',
    frutos:  'images/fresa/fresa_frutos.webp',
    madura:  'images/fresa/fresa_madura.webp',
    seca:    'images/fresa/fresa_seca.webp',
  },
});
```

**[1b] Propiedades propias — después de `super()`:**

```js
// Solución Ticket 1b
this.colorUI = '#c0392b'; // rojo frambuesa
this.icono   = '🍓';
```

**[1c] El método `deshidratar()` — con tasa acelerada:**

Mira el método original en `Planta.js`:

```js
// En Planta.js (el padre):
deshidratar(deltaTiempoSegundos, factorAspersores = 1) {
  const tasaBase = 12; // % por segundo
  const reduccion = (deltaTiempoSegundos * tasaBase) / factorAspersores;
  this.nivelHidratacion = Math.max(0, this.nivelHidratacion - reduccion);
}
```

La fresa pierde agua 50% más rápido. 50% más sobre 12 = **18**. La fórmula es idéntica, solo cambia el número:

```js
// Solución Ticket 1c
deshidratar(deltaTiempoSegundos, factorAspersores = 1) {
  const tasaBase = 18; // 12 + 50% = 18
  const reduccion = (deltaTiempoSegundos * tasaBase) / factorAspersores;
  if (!this.estaMuerta) {
    this.nivelHidratacion = Math.max(0, this.nivelHidratacion - reduccion);
  }
}
```

> **Concepto clave:** Esto se llama **sobreescritura de método** (*method override*). La Fresa tiene su propia versión de `deshidratar()`. Cuando el juego llama `planta.deshidratar(...)`, si `planta` es una Fresa, ejecuta *este* código, no el del padre.

**EXTRA BONUS — `renderizar()` adaptado a su velocidad:**

El `renderizar()` del padre usaba umbrales `< 30` y `< 65` para determinar la imagen. Esos umbrales fueron pensados para el Maíz (12 segundos). La Fresa crece en 8 segundos, así que visualmente avanza más rápido. Si usas los mismos umbrales, la fresa parecerá que no cambia hasta el final. La solución es ajustar los puntos de corte para que el cambio visual sea proporcional:

```js
// Solución EXTRA BONUS
renderizar() {
  if (this.estaMuerta) return this.rutasEstados.seca;
  if (this.estado === 'lista') return this.rutasEstados.madura;

  if (this.progresoCrecimiento < 15) return this.rutasEstados.semilla;
  if (this.progresoCrecimiento < 40) return this.rutasEstados.brote;
  return this.rutasEstados.frutos;
}
```

---

### 🎫 Ticket 2 — Clase `Berenjena`

**Qué se pedía:** La berenjena es el cultivo lento y valioso:
- Crece en 20 segundos (el más lento).
- Vale 30 oro base (el más valioso).
- Al cosechar tiene un **bono de rareza aleatorio** entre 0% y 50% extra.

**[2a] El constructor:**

```js
// Solución Ticket 2a
super({
  nombre:            'Berenjena',
  tiempoCrecimiento: 20,  // ← La más LENTA de las tres
  valor:             30,  // ← La más VALIOSA de las tres
  rutaImagen:        'images/berenjena/berenjena_semillas.webp',
  rutasEstados: {
    semilla: 'images/berenjena/berenjena.webp',
    brote:   'images/berenjena/berenjena_brote.webp',
    frutos:  'images/berenjena/berenjena_frutos.webp',
    madura:  'images/berenjena/berenjena_madura.webp',
    seca:    'images/berenjena/berenjena_seca.webp',
  },
});
```

**[2b] Propiedades propias:**

```js
// Solución Ticket 2b
this.colorUI = '#6c3483'; // morado oscuro
this.icono   = '🍆';
```

**[2c] El método `cosechar()` con bono de rareza:**

```js
// Solución Ticket 2c
cosechar(bonusSuperSuelo = 1) {
  // Paso 1: guarda — si no está lista, no hay cosecha
  if (this.estado !== 'lista') return 0;

  // Paso 2: bono aleatorio entre 1.0 y 1.5
  // Math.random() da un número entre 0 y 1.
  // Multiplicado por 0.5 da entre 0 y 0.5.
  // Sumado 1 da entre 1.0 y 1.5. ¡Listo!
  const bonoRareza = 1.0 + (Math.random() * 0.5);

  // Paso 3: retornar el oro redondeado
  return Math.round(this.valor * bonusSuperSuelo * bonoRareza);
}
```

> **Concepto clave:** El padre (`Planta.js`) ya tiene `cosechar()`. La Berenjena lo **sobreescribe** añadiendo su lógica extra. El Maíz y la Fresa siguen usando el del padre. El polimorfismo en acción.

---

### 🎫 Ticket 3 (Cultivos) — Activar el catálogo

Una vez implementadas las clases, hay **dos cosas que activar**:

**1. El catálogo funcional** — para que el juego pueda instanciar las plantas:

```js
// Solución Ticket 3 — Cultivos.js
export const CATALOGO_CULTIVOS = {
  maiz:      Maiz,
  fresa:     Fresa,      // ← Descomentar
  berenjena: Berenjena,  // ← Descomentar
};
```

**2. El catálogo visual** — para que la interfaz muestre las tarjetas desbloqueadas:

```js
// Cultivos.js — CATALOGO_VISUAL
fresa: {
  ...
  implementado: true,  // ← Cambiar de false a true
},
berenjena: {
  ...
  implementado: true,  // ← Cambiar de false a true
},
```

> **¿Por qué había dos lugares?** El `CATALOGO_CULTIVOS` le dice al motor *cómo crear* la planta. El `CATALOGO_VISUAL` le dice a la interfaz *cómo mostrar* la tarjeta. Son dos responsabilidades distintas. Un diseño más robusto las separa.

---

---

## 🐔 ANIMALES — `Animales.js`

El patrón es **idéntico** al de los cultivos. Si ya entendiste la Fresa, esto te saldrá fácil.

### 🎫 Ticket 1 — Clase `Pollo`

**[1a] El constructor:**

```js
// Solución Ticket 1a
super({
  nombre:       'Pollo',
  tiempoFase:   20,   // segundos por fase (rápido)
  produccion:   20,   // monedas por ciclo (poco)
  costoCompra:  75,   // barato
  nombresFases: ['Huevo', 'Pollito', 'Adulto'],
  rutasEstados: {
    fases: [
      'images/pollo/pollo_huevo.webp',
      'images/pollo/pollito.webp',
      'images/pollo/pollo_adulto.webp',
    ],
    triste: 'images/pollo/pollo_triste.webp',
  },
});
```

**[1b] Propiedades propias:**

```js
// Solución Ticket 1b
this.icono   = '🐔';
this.colorUI = '#e67e22'; // naranja
```

> **Diferencia clave con las plantas:** El animal no tiene `rutasEstados` por estados de crecimiento. Tiene `fases` (un array con una imagen por fase) y `triste`. La clase base `Animal.js` usa `this.rutasEstados.fases[this.fase]` para saber qué imagen mostrar.

---

### 🎫 Ticket 2 — Clase `Vaca`

**[2a] El constructor:**

```js
// Solución Ticket 2a
super({
  nombre:       'Vaca',
  tiempoFase:   30,   // más lenta que el Pollo
  produccion:   45,   // más rentable que el Pollo
  costoCompra:  140,
  nombresFases: ['Bebé', 'Joven', 'Adulta'],
  rutasEstados: {
    fases: [
      'images/vaca/vaca_bebe.webp',
      'images/vaca/vaca_joven.webp',
      'images/vaca/vaca_adulta.webp',
    ],
    triste: 'images/vaca/vaca_triste.webp',
  },
});
```

**[2b] Propiedades propias:**

```js
// Solución Ticket 2b
this.icono   = '🐄';
this.colorUI = '#27ae60'; // verde
```

**[2c] El método `producirMonedas()` con bono de bienestar:**

Este es el más interesante de los tickets de animales. La Vaca sobreescribe `producirMonedas()`:

```js
// Solución Ticket 2c
producirMonedas() {
  // Paso 1: guarda — igual que el padre
  if (!this.esAdulto() || this.estaTriste) return 0;

  // Paso 2: bono de bienestar
  // Una vaca bien alimentada (hambre >= 75) da 15 extra
  if (this.hambre >= 75) {
    return this.produccion + 15; // 45 + 15 = 60 monedas
  }
  return this.produccion;        // 45 monedas normales
}
```

> **¿Por qué funciona?** El método del padre (`Animal.js`) retorna `this.produccion` sin más. La Vaca reemplaza ese comportamiento con su propia versión. `Corral.js` llama `animal.producirMonedas()` sin saber si es un Pollo o una Vaca — JavaScript ejecuta el método correcto automáticamente. Eso es **polimorfismo**.

---

### 🎫 Ticket 3 (Animales) — Activar `crearAnimal()`

```js
// Solución Ticket 3 — Animales.js
export function crearAnimal(tipo) {
  if (tipo === 'pollo') return new Pollo();  // ← Descomentar
  if (tipo === 'vaca')  return new Vaca();   // ← Descomentar
  throw new Error('Animal no implementado aún: ' + tipo);
}
```

`Corral.js` usa esta función para instanciar animales. Mientras esté comentado, el corral no puede crear ninguno.

---

### 🎫 Ticket 4 — `renderizarTarjetaAnimal()` en `Corral.js`

Este ticket era diferente: no pedía crear una clase, sino generar HTML con template literals.

La función `renderizarSpriteAnimal()` genera el contenedor del sprite:

```js
// Solución Ticket 4 — sprite en el pasto
function renderizarSpriteAnimal(animal, indice) {
  return `
    <div class="animal-sprite" id="sprite-${indice}"
         style="border-color: ${animal.colorUI}">
      <div class="animal-stats-flotantes" id="stats-${indice}">
        ${renderizarStatsFlotantes(animal)}
      </div>
      <img class="animal-sprite-img" src="${animal.renderizar()}" alt="${animal.nombre}" />
      <button class="animal-btn-alimentar" onclick="alimentarAnimal(${indice})">
        🌽
      </button>
    </div>`;
}
```

Y `renderizarStatsFlotantes()` genera las barras que aparecen al hacer hover:

```js
// Solución Ticket 4 — stats flotantes
function renderizarStatsFlotantes(animal) {
  const hambre     = Math.round(animal.hambre);
  const nombreFase = animal.nombresFases[animal.fase];

  let barraFase = '';
  if (!animal.esAdulto()) {
    const progreso = Math.round(animal.progresoFase);
    barraFase = `
      <div class="stats-label">📈 ${progreso}%</div>
      <div class="stats-barra">
        <div class="stats-barra-fill stats-barra-progreso" style="width:${progreso}%"></div>
      </div>`;
  }

  const triste = animal.estaTriste
    ? '<div class="stats-triste">😢 ¡Hambre!</div>'
    : '';

  return `
    <div class="stats-nombre">${animal.icono} ${nombreFase}</div>
    <div class="stats-label">🍖 ${hambre}%</div>
    <div class="stats-barra">
      <div class="stats-barra-fill stats-barra-hambre"
           style="width:${hambre}%"></div>
    </div>
    ${barraFase}
    ${triste}`;
}
```

---

---

## 🔧 CORRECCIONES DE FRONT (lo que el profe tuvo que arreglar)

Esta sección es para que entiendas los problemas que el código base tenía a nivel de UI y por qué se corrigieron así. Son lecciones igual de importantes que los tickets.

---

### 🐛 Bug 1 — Semillas y corral bloqueados en la UI aunque el código estuviera listo

**Problema:** Aunque implementabas `Fresa` y `Berenjena` en `Cultivos.js`, en la pantalla seguían apareciendo con candado y el mensaje "¡Tu tarea!".

**Causa:** `Interfaz.js` lee el campo `implementado` del `CATALOGO_VISUAL`. Ese campo estaba en `false` por defecto. El juego NO lo actualiza automáticamente — tenías que cambiarlo tú al terminar la clase.

**Corrección:**

```js
// Cultivos.js — CATALOGO_VISUAL
fresa: {
  implementado: true,  // ← Cambiar cuando Fresa esté lista
},
berenjena: {
  implementado: true,  // ← Cambiar cuando Berenjena esté lista
},
```

**El corral** tampoco aparecía porque `Corral.js` no estaba siendo cargado en el HTML. Faltaba una línea en `index.html`:

```html
<!-- index.html — al final del body -->
<script type="module" src="scripts/Juego.js"></script>
<script type="module" src="scripts/Corral.js"></script>  <!-- ← Esta faltaba -->
```

Sin esa línea, `Corral.js` nunca se ejecutaba, y el corral quedaba como un bloque decorativo sin funcionalidad.

---

### 🐛 Bug 2 — El botón "Dar Comida" no respondía (el más importante)

**Problema:** Hacías clic en el botón de alimentar y nada pasaba. La barra de hambre no subía.

**Causa raíz — renderizado destructivo en cada tick:**

El bucle principal del corral llamaba `renderizarCorral()` en **cada fotograma** (60 veces por segundo). Esa función hacía `contenedor.innerHTML = html`, lo que **destruye y recrea todo el DOM** 60 veces por segundo.

Los eventos en HTML inline (`onclick="alimentarAnimal(0)"`) sí llegan al handler, pero el problema era otro: en el momento en que el clic se procesaba, la función `alimentarAnimal` llamaba a `renderizarCorral()`, que volvía a destruir y recrear el DOM inmediatamente. El efecto visual era invisible porque el DOM nuevo ya mostraba el estado anterior (el hambre se actualiza en el siguiente tick, y el tick vuelve a hacer `innerHTML` con el valor viejo).

**Solución — separar el renderizado en dos capas:**

```
Capa 1: reconstruirCorral()    → Solo se llama al comprar/desbloquear
         Genera el HTML "esqueleto" del corral: sprites, botones, contenedores.
         NUNCA se llama en el bucle principal.

Capa 2: actualizarEstadisticas() → Se llama en cada tick
         Solo actualiza el innerHTML del div de stats de cada animal.
         No toca los botones, no toca las imágenes, no toca las posiciones.
```

```js
// Antes (❌ — destruye el DOM 60 veces/segundo):
function tickCorral(tiempoActual) {
  // ... lógica ...
  renderizarCorral();  // ← AQUÍ estaba el problema
  requestAnimationFrame(tickCorral);
}

// Después (✅ — actualiza solo lo que cambia):
function tickCorral(tiempoActual) {
  // ... lógica ...
  moverAnimales(delta);        // mueve sprites
  actualizarEstadisticas();    // actualiza solo las barras
  requestAnimationFrame(tickCorral);
}
```

Y `alimentarAnimal` también cambia:

```js
// Antes (❌):
window.alimentarAnimal = function (indice) {
  let animal = corralEstado.animales[indice];
  animal.alimentar();
  renderizarCorral();  // ← destruía y recreaba todo
};

// Después (✅):
window.alimentarAnimal = function (indice) {
  let animal = corralEstado.animales[indice];
  animal.alimentar();
  actualizarEstadisticas();  // ← solo actualiza las barras
};
```

---

### 🐛 Bug 3 — Animales estáticos (sin movimiento)

**Problema:** Los animales se mostraban como imágenes fijas.

**Causa:** El sistema de renderizado destructivo (Bug 2) impedía cualquier movimiento: aunque actualizaras una posición CSS, el siguiente tick destruía el elemento y lo recreaba en la posición original.

**Solución:** Con el DOM separado en capas, ahora cada sprite tiene un `id` único (`sprite-0`, `sprite-1`, etc.). En cada tick se actualiza solo su posición via JavaScript:

```js
function actualizarSprites() {
  corralEstado.animales.forEach(function (animal, i) {
    const sprite = document.getElementById('sprite-' + i);
    const pos    = corralEstado._posiciones[i];
    const mov    = corralEstado._movimientos[i];

    sprite.style.left      = pos.x + 'px';
    sprite.style.bottom    = (10 + pos.y) + 'px';
    sprite.style.transform = mov.flipX ? 'scaleX(-1)' : 'scaleX(1)';
  });
}
```

Y cada animal tiene una posición y velocidad independientes que cambian en el tiempo, con rebote en los bordes y cambios de dirección aleatorios.

---

### 🎨 Mejora — Panel lateral de tienda en el corral

**Antes:** Los botones de compra de animales estaban en el centro, mal alineados, sin jerarquía visual.

**Solución:** Layout de dos columnas con Flexbox:
- Panel izquierdo fijo (`corral-panel-tienda`): los botones de compra.
- Área derecha flexible (`corral-pasto`): el espacio donde los animales se mueven libremente.

```html
<!-- Estructura del corral desbloqueado -->
<div class="corral-layout">
  <aside class="corral-panel-tienda">
    <!-- botones de compra aquí -->
  </aside>
  <div class="corral-pasto" id="corral-pasto">
    <!-- sprites libres aquí -->
  </div>
</div>
```

---

---

## 🧠 Conceptos OOP aplicados en esta lección

| Concepto | Dónde se usa |
|---|---|
| **Herencia** (`extends`) | `Fresa extends Planta`, `Pollo extends Animal` |
| **Constructor padre** (`super()`) | Todos los constructores de subclase |
| **Sobreescritura de métodos** | `Fresa.deshidratar()`, `Vaca.producirMonedas()`, `Maiz.renderizar()` |
| **Polimorfismo** | El juego llama `planta.cosechar()` sin saber si es Maíz o Berenjena |
| **Encapsulamiento** | `Animal.js` no depende de si es Pollo o Vaca; solo del contrato de la clase |

---

## ✅ Checklist final

Antes de dar tu tarea por terminada, verifica:

- [ ] `Fresa` tiene `tiempoCrecimiento: 8` y `valor: 10`
- [ ] `Fresa.deshidratar()` usa `tasaBase = 18` (50% más que 12)
- [ ] `Berenjena` tiene `tiempoCrecimiento: 20` y `valor: 30`
- [ ] `Berenjena.cosechar()` aplica `1.0 + Math.random() * 0.5`
- [ ] `Pollo` tiene `tiempoFase: 20`, `produccion: 20`, `costoCompra: 75`
- [ ] `Vaca` tiene `tiempoFase: 30`, `produccion: 45`, `costoCompra: 140`
- [ ] `Vaca.producirMonedas()` da +15 si `hambre >= 75`
- [ ] `crearAnimal()` tiene las líneas de `Pollo` y `Vaca` sin comentar
- [ ] `CATALOGO_CULTIVOS` tiene `fresa` y `berenjena` sin comentar
- [ ] `CATALOGO_VISUAL` tiene `implementado: true` para `fresa` y `berenjena`
- [ ] `index.html` carga `Corral.js` como `type="module"`

---

*The Bit Masters © 2026 — M4·L3 · Granja Pixel · Soluciones del Profe*