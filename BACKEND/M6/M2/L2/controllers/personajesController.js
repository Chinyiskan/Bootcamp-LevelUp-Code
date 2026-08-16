const supabase = require('../config/supabaseClient');

// GET /personajes - Obtener todos los personajes
const obtenerPersonajes = async (req, res) => {
    const { data, error } = await supabase
        .from('personajes')
        .select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
};

// GET /persoanajes/:id - Obtener un personaje por su ID
const obtenerPersoanjePorId = async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('personajes')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) {
        return res.status(404).json({ mensaje: 'Personaje no encontrado' });
    }

    res.json(data);
};

// GET /personajes/filtrar?tipo=clase - Filtrar persoanjes por clase
const obtenerPersoanjePorClase = async (req, res) => {
    const { clase } = req.query;

    if (!clase) {
        const { data, error } = await supabase
            .from('personajes')
            .select('*');

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        return res.json(data);
    }

    const { data, error } = await supabase
        .from('personajes')
        .select('*')
        .eq('clase', clase);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
};

// POST /personajes - Crear un nuevo personaje
const crearPersonaje = async (req, res) => {
    const { nombre, clase, nivel, vivo } = req.body;

    const { data, error } = await supabase
        .from('personajes')
        .insert([{ nombre, clase, nivel, vivo }])
        .select()
        .single();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
};

// PUT /personajes/:id - Actualizar un personaje por ID
const actualizarPersonaje = async (req, res) => {
    const { id } = req.params;
    const { nombre, clase, nivel, vivo } = req.body;

    const { data, error } = await supabase
        .from('personajes')
        .update({ nombre, clase, nivel, vivo })
        .eq('id', id)
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ mensaje: 'Personaje no encontrado para actualizar' });
    }

    res.json(data[0]);
};

// DELETE /personajes/:id - Eliminar un personaje por ID
const eliminarPersonaje = async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('personajes')
        .delete()
        .eq('id', id)
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ mensaje: 'Personaje no encontrado para eliminar' });
    }

    res.json({ mensaje: 'Personaje eliminado correctamente', personaje: data[0] });
};

module.exports = {
    obtenerPersonajes,
    obtenerPersoanjePorId,
    obtenerPersoanjePorClase,
    crearPersonaje,
    actualizarPersonaje,
    eliminarPersonaje
};
