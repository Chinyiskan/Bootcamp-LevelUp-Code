// Responsabilidad: Inicializar y exportar el cliente de Supabase para interactuar con la base de datos PostgreSQL.

import dotenv from 'dotenv';
dotenv.config();

import { createClient } from '@supabase/supabase-js';

// Usamos variables de entorno para evitar filtrar credenciales en el control de versiones
let supabaseUrl = process.env.SUPABASE_URL;
// Nomenclatura nueva de Supabase: secret key para operaciones del backend sin restricciones de RLS
let supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('ADVERTENCIA: SUPABASE_URL o SUPABASE_SECRET_KEY no están configuradas en el archivo .env');
}

// Creamos un cliente único reutilizable con fallback seguro para no romper la ejecución si aún no se configura .env
let supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseKey || 'placeholder_secret');

export default supabase;
