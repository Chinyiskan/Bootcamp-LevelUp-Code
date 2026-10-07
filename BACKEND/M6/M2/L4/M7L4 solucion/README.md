# 🤖 Misión: Hangar de Mechas — Control de Acceso y Autorización

> **Versión de Control del Instructor** — Proyecto de referencia 100% funcional y completo para LevelUp Code.

---

## 🌌 Premisa

La Base Estelar cuenta con múltiples escuadrones de combate. Cada **piloto** dispone de su propio hangar privado donde puede construir, calibrar y desmantelar sus unidades **mechas**.

Sin embargo, en el fragor de la guerra galáctica, la seguridad informática es vital:
- Ningún piloto debe poder alterar o desmantelar los mechas de otro compañero (prevención de vulnerabilidades IDOR - *Insecure Direct Object References*).
- El **Comandante** de la base es la única autoridad con acceso a la telemetría de la **flota global**.
- La información crítica de identidad (como los hashes criptográficos de las claves de acceso) jamás debe exponerse en las respuestas del servidor.

---

## 💡 ¿Por qué vale la pena?

En misiones anteriores aprendimos a autenticar usuarios (**¿Quién eres?**) mediante contraseñas cifradas y tokens JWT.

En esta misión damos el salto crucial hacia la **Autorización** (**¿Qué tienes permitido hacer?**):
1. **Autorización basada en Propiedad (*Ownership Control*)**: Validar que el recurso sobre el que se ejecuta una acción pertenezca estrictamente al usuario que emite la petición (`req.piloto.id`).
2. **Autorización basada en Roles (*RBAC - Role-Based Access Control*)**: Restringir endpoints administrativos únicamente a rangos autorizados (`rol === "comandante"`).
3. **Principio de Menor Exposición (*Least Privilege Data Exposure*)**: Asegurar mediante consultas explícitas (`.select('id, nombre, correo, rol')`) que los hashes de contraseñas nunca viajen en las respuestas HTTP.

---

## 🎯 Lista de Tickets Pedagógicos

| Ticket | Endpoint | Método | Descripción Pedagógica |
| :--- | :--- | :---: | :--- |
| **TICKET 1** | `/mechas` | `POST` | Construye una mecha asignando obligatoriamente el `piloto_id` desde `req.piloto.id` (extraído del token), **nunca** desde `req.body`. |
| **TICKET 2** | `/mechas` | `GET` | Lista exclusivamente las mechas pertenecientes al piloto autenticado (`.eq('piloto_id', req.piloto.id)`). |
| **TICKET 3** | `/mechas/:id` | `PUT` | Edita una mecha. Antes de actualizar, consulta la base de datos, valida que `mecha.piloto_id === req.piloto.id` y responde `403` si no coincide. |
| **TICKET 4** | `/mechas/:id` | `DELETE` | Desmantela una mecha previa validación estricta de propiedad; responde `403` si se intenta borrar un recurso ajeno. |
| **TICKET 5** | `/mechas/todas` | `GET` | Endpoint táctico exclusivo para el rango `comandante`. Responde `403` a pilotos normales y `200` con la flota completa a comandantes. |
| **TICKET 6 (Bonus)** | Global | `SELECT` | Todas las consultas que devuelvan datos de pilotos usan `.select('id, nombre, correo, rol')` explícito, nunca `select('*')`. |

---

## 🛠️ Stack Técnico

- **Entorno de Ejecución**: Node.js
- **Framework Web**: Express
- **Gestor de Paquetes**: `pnpm` (no npm)
- **Base de Datos**: Supabase (`@supabase/supabase-js`), utilizado como base de datos PostgreSQL estándar (sin Supabase Auth, sin RLS). Nomenclatura moderna `publishable` / `secret`.
- **Criptografía y Autenticación**: `bcryptjs` (hasheo seguro) + `jsonwebtoken` (JWT con secreto propio).
- **Pruebas**: Archivo `test.http` integrado para la extensión **REST Client** de VS Code.
- **Frontend**: HTML5, CSS3 plano y Vanilla JS servidos estáticamente desde `public/`.

---

## 🗄️ Esquema de Base de Datos (Supabase SQL)

Ejecuta el siguiente script en el **SQL Editor** de tu proyecto Supabase para crear las tablas necesarias:

```sql
-- 1. Tabla de Pilotos (con columna rol)
CREATE TABLE IF NOT EXISTS pilotos (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre TEXT NOT NULL,
  correo TEXT UNIQUE NOT NULL,
  clave TEXT NOT NULL,
  rol TEXT NOT NULL DEFAULT 'piloto'
);

-- 2. Tabla de Mechas
CREATE TABLE IF NOT EXISTS mechas (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  piloto_id BIGINT REFERENCES pilotos(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  clase TEXT NOT NULL CHECK (clase IN ('Asalto', 'Brawler', 'Sigilo', 'Sniper', 'Soporte')),
  potencia INTEGER NOT NULL CHECK (potencia BETWEEN 1 AND 100),
  blindaje INTEGER NOT NULL CHECK (blindaje BETWEEN 1 AND 100),
  velocidad INTEGER NOT NULL CHECK (velocidad BETWEEN 1 AND 100),
  creado_en TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🚀 Cómo Correr el Proyecto

### 1. Clonar e Instalar Dependencias con `pnpm`

```bash
pnpm install
```

### 2. Configurar Variables de Entorno

Copia el archivo de ejemplo `.env.example` y crea tu `.env`:

```bash
cp .env.example .env
```

Configura tus credenciales reales en `.env`:

```env
PORT=3000
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SECRET_KEY=tu_supabase_secret_key
JWT_SECRET=tu_clave_secreta_para_firmar_jwt
```

### 3. Iniciar el Servidor de Desarrollo

```bash
pnpm dev
```

La aplicación estará lista y accesible en:
- **Terminal Web**: [http://localhost:3000](http://localhost:3000)
- **Registro de Pilotos**: [http://localhost:3000/registro.html](http://localhost:3000/registro.html)
- **Hangar de Mechas**: [http://localhost:3000/hangar.html](http://localhost:3000/hangar.html)

---

## 🧪 Cómo Probar con `test.http`

1. Instala la extensión **REST Client** (`humao.rest-client`) en Visual Studio Code.
2. Abre el archivo [`test.http`](file:///c:/Users/david/Desktop/M7L4%20solucion/test.http).
3. Haz clic sobre **`Send Request`** en orden descendente:
   - **Registro e inicio de sesión** de dos pilotos distintos (`Valquiria-01` y `Tigre-Blindado`).
   - **Creación de mechas** con cada piloto.
   - **Listado y edición exitosa** de mechas propias (`200 OK`).
   - **Intento de usurpación / edición ajena**: El Piloto 2 intenta modificar o borrar la mecha del Piloto 1 (`403 Forbidden`).
   - **Intento de acceso de comandante**: Un piloto normal intenta acceder a `/mechas/todas` (`403 Forbidden`).
   - **Ascenso a Comandante**: Ejecuta en Supabase:
     ```sql
     UPDATE pilotos SET rol = 'comandante' WHERE correo = 'valquiria@hangar.space';
     ```
     Vuelve a hacer login con `valquiria@hangar.space` y ejecuta `GET /mechas/todas` (`200 OK`).
   - **Desmantelación de mecha propia** (`200 OK`).

---

## 🏆 Bonus y Buenas Prácticas Implementadas

- **Protección contra Fuga de Datos (Data Leakage)**: Ningún endpoint responde jamás con el hash `clave` de los pilotos gracias a selecciones de columnas explícitas.
- **Mensajes de Error Ambigüos contra Enumeración**: Al intentar acceder a un recurso ajeno o inexistente, se responde un `403` estándar sin revelar metadatos internos.
- **Interfaz Reactiva por Clases y Tarjetas Verticales 3D Flip**: En el frontend, cada mecha se presenta como una tarjeta coleccionable vertical con su ilustración táctica y, al pasar el cursor, gira 180° para revelar la telemetría, estadísticas y acciones:
  - **Asalto**: Borde carmesí ofensivo (`#ef4444`)
  - **Brawler**: Borde verde de combate cuerpo a cuerpo (`#10b981`)
  - **Sigilo**: Borde morado furtivo (`#a855f7`)
  - **Sniper**: Borde amarillo de precisión a distancia (`#eab308`)
  - **Soporte**: Borde azul defensivo (`#3b82f6`)
- **Vista Especial para Comandantes**: Si el token decodificado posee el rol `comandante`, la interfaz activa el botón *"Ver Hangar Completo"* permitiendo la inspección de toda la flota de la base estelar.
