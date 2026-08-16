const supabase = require('../config/supabaseClient');

//GET
const obtenerMonturas = async (req, res) => {
    const { data, error } = await supabase
        .from('monturas')
        .select('*')

    if (error) {
        return res.status(500).json({ error: error.message});
    }

    res.json(data);
}

const obtenerMonturaPorId = async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('monturas')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) {
        return res.status(404).json({ mensaje: 'Montura no encontrada' });
    }

    res.json(data);
};


const crearMontura = async (req, res) => {
    const { nombre, especie, velocidad, domada } = req.body;

    const { data, error } = await supabase
        .from('monturas')
        .insert({ nombre, especie, velocidad, domada })
        .select()
        .single()

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
};

    const actualizarMontura = async (req, res) => {
        res.json({ mensaje: 'pendiente' });
    };

const eliminarMontura = async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('monturas')
        .delete()
        .eq('id', id)
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ mensaje: 'Montura no encontrada' });
    }

    res.json({ mensaje: 'Montura eliminada correctamente', montura: data[0] });
};

module.exports = {
    obtenerMonturas,
    obtenerMonturaPorId,
    crearMontura,
    actualizarMontura,
    eliminarMontura
};