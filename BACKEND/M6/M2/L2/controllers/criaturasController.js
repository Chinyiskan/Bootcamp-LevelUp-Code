const supabase = require('../config/supabaseClient');

// GET /criaturas - Obtener todas las criaturas
const obtenerCriaturas = async (req, res) => {
    const { data, error } = await supabase
        .from('criaturas')
        .select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
};

// GET /criaturas/:id - Obtener una criatura por su ID (Bonus)
const obtenerCriaturaPorId = async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('criaturas')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) {
        return res.status(404).json({ mensaje: 'Criatura no encontrada' });
    }

    res.json(data);
};

// POST /criaturas - Crear una nueva criatura (Ticket 1)
const crearCriatura = async (req, res) => {
    const { nombre, tipo, poder, capturada } = req.body;

    const { data, error } = await supabase
        .from('criaturas')
        .insert([{ nombre, tipo, poder, capturada }])
        .select()
        .single();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
};

// PUT /criaturas/:id - Actualizar una criatura por ID (Ticket 2)
const actualizarCriatura = async (req, res) => {
    const { id } = req.params;
    const { nombre, tipo, poder, capturada } = req.body;

    const { data, error } = await supabase
        .from('criaturas')
        .update({ nombre, tipo, poder, capturada })
        .eq('id', id)
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    // Si data viene vacío, significa que el ID no existía
    if (!data || data.length === 0) {
        return res.status(404).json({ mensaje: 'Criatura no encontrada para actualizar' });
    }

    res.json(data[0]);
};

// DELETE /criaturas/:id - Eliminar una criatura por ID (Ticket 3)
const eliminarCriatura = async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('criaturas')
        .delete()
        .eq('id', id)
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    // Si data viene vacío, significa que el ID no existía
    if (!data || data.length === 0) {
        return res.status(404).json({ mensaje: 'Criatura no encontrada para eliminar' });
    }

    res.json({ mensaje: 'Criatura eliminada correctamente', criatura: data[0] });
};

module.exports = {
    obtenerCriaturas,
    obtenerCriaturaPorId,
    crearCriatura,
    actualizarCriatura,
    eliminarCriatura
};
