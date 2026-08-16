const supabase = require('../config/supabaseClient');

// GET /jefes - Obtener todos los jefes (✅ ya resuelto)
const obtenerJefes = async (req, res) => {
    const { data, error } = await supabase
        .from('jefes')
        .select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
};

// GET /jefes/:id - Obtener un jefe por su ID (✅ ya resuelto)
const obtenerJefePorId = async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('jefes')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) {
        return res.status(404).json({ mensaje: 'Jefe no encontrado' });
    }

    res.json(data);
};

// GET /jefes/filtrar?tipo=Dragón - Filtrar jefes por tipo (🎫 Ticket único)
const obtenerJefesPorTipo = async (req, res) => {
    const { tipo } = req.query;

    // Bonus: si no llega "tipo" en el query, responde con todos
    if (!tipo) {
        const { data, error } = await supabase
            .from('jefes')
            .select('*');

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        return res.json(data);
    }

    // Consulta filtrando por el tipo con .eq('tipo', tipo)
    const { data, error } = await supabase
        .from('jefes')
        .select('*')
        .eq('tipo', tipo);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
};

// POST /jefes - Crear un nuevo jefe (✅ ya resuelto — semana pasada)
const crearJefe = async (req, res) => {
    const { nombre, tipo, vida, nivel_amenaza, derrotado } = req.body;

    const { data, error } = await supabase
        .from('jefes')
        .insert([{ nombre, tipo, vida, nivel_amenaza, derrotado }])
        .select()
        .single();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
};

// PUT /jefes/:id - Actualizar un jefe por ID (✅ ya resuelto — semana pasada)
const actualizarJefe = async (req, res) => {
    const { id } = req.params;
    const { nombre, tipo, vida, nivel_amenaza, derrotado } = req.body;

    const { data, error } = await supabase
        .from('jefes')
        .update({ nombre, tipo, vida, nivel_amenaza, derrotado })
        .eq('id', id)
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ mensaje: 'Jefe no encontrado para actualizar' });
    }

    res.json(data[0]);
};

// DELETE /jefes/:id - Eliminar un jefe por ID (✅ ya resuelto — semana pasada)
const eliminarJefe = async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('jefes')
        .delete()
        .eq('id', id)
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ mensaje: 'Jefe no encontrado para eliminar' });
    }

    res.json({ mensaje: 'Jefe eliminado del bestiario', jefe: data[0] });
};

module.exports = {
    obtenerJefes,
    obtenerJefePorId,
    obtenerJefesPorTipo,
    crearJefe,
    actualizarJefe,
    eliminarJefe
};