// Este archivo ya viene armado — no lo edites.
// Su único trabajo es crear UNA conexión a Supabase
// y prestarla a cualquier ruta que la necesite.

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// La URL y la key salen del .env — nunca se escriben directo aquí,
// porque este archivo sí se sube a GitHub y el .env no.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;