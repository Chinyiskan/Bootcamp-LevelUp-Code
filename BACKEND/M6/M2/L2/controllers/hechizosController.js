const supabase = require('../config/supabaseClient');

// GET /hechizos - Obtener todos los hechizos
const obtenerHechizos = async (req, res) => {
    const { data, error } = await supabase
        .from('hechizos')
        .select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
};

// GET /hechizos/:id - Obtener un hechizo por su ID
const obtenerHechizoPorId = async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('hechizos')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) {
        return res.status(404).json({ mensaje: 'Hechizo no encontrado' });
    }

    res.json(data);
};

// GET /hechizos/filtrar?escuela=Evocación - Filtrar hechizos por escuela
const obtenerHechizosPorEscuela = async (req, res) => {
    const { escuela } = req.query;

    if (!escuela) {
        const { data, error } = await supabase
            .from('hechizos')
            .select('*');

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        return res.json(data);
    }

    const { data, error } = await supabase
        .from('hechizos')
        .select('*')
        .eq('escuela', escuela);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
};

// POST /hechizos - Crear un nuevo hechizo
const crearHechizo = async (req, res) => {
    const { nombre, escuela, mana_requerido, aprendido } = req.body;

    const { data, error } = await supabase
        .from('hechizos')
        .insert([{ nombre, escuela, mana_requerido, aprendido }])
        .select()
        .single();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
};

// PUT /hechizos/:id - Actualizar un hechizo por ID
const actualizarHechizo = async (req, res) => {
    const { id } = req.params;
    const { nombre, escuela, mana_requerido, aprendido } = req.body;

    const { data, error } = await supabase
        .from('hechizos')
        .update({ nombre, escuela, mana_requerido, aprendido })
        .eq('id', id)
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ mensaje: 'Hechizo no encontrado para actualizar' });
    }

    res.json(data[0]);
};

// DELETE /hechizos/:id - Eliminar un hechizo por ID
const eliminarHechizo = async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('hechizos')
        .delete()
        .eq('id', id)
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ mensaje: 'Hechizo no encontrado para eliminar' });
    }

    res.json({ mensaje: 'Hechizo eliminado correctamente', hechizo: data[0] });
};

module.exports = {
    obtenerHechizos,
    obtenerHechizoPorId,
    obtenerHechizosPorEscuela,
    crearHechizo,
    actualizarHechizo,
    eliminarHechizo
};
