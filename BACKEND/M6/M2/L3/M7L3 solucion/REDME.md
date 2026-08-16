# 🕶️ Academia de Hackers — Misión 27

## 📌 Premisa

La Academia necesita un sistema de acceso real. Hasta ahora cualquiera podía
entrar a cualquier ruta sin identificarse — hoy eso se termina. Tu trabajo es
completar el sistema de autenticación: que solo reclutas registrados puedan
entrar, que sus claves nunca se guarden en texto plano, y que el panel secreto
solo se abra con un pase válido.

## 💡 ¿Por qué vale la pena?

El registro ya viene resuelto como guía — síguelo de cerca, porque el login
usa exactamente el mismo tipo de piezas (bcrypt, Supabase) en el orden
inverso: en vez de crear un hash, lo comparas. Si completas los 3 tickets,
tendrás el mismo sistema de acceso que usan apps reales todos los días.

## 🎫 Tickets

1. ~~Registro~~ — ya resuelto, úsalo de guía.
2. **Login** — `controllers/auth.controller.js` → `iniciarSesion`
3. **Middleware de verificación** — `middlewares/verificarPase.js`
4. **Perfil protegido** — `controllers/auth.controller.js` → `verPerfil`

## ▶️ Cómo correr el proyecto
pnpm install
pnpm dev

Abre `http://localhost:3000/registro.html` en el navegador.

## 🧪 Cómo probar (usa test.http con REST Client)

Prueba primero con REST Client, y cuando el login te devuelva un token,
pruébalo también desde el navegador con el flujo completo: regístrate,
inicia sesión, y verifica que el panel te reconozca.

## 🔥 Bonus (10 min)

Crea una segunda ruta protegida, `GET /secreto-nivel-2`, que use el MISMO
`verificarPase` y devuelva un mensaje distinto (el que quieras). No dupliques
lógica — la idea es que veas que un mismo middleware protege cualquier
cantidad de rutas sin reescribir nada.