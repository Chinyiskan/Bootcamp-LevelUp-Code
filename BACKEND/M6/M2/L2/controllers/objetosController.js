const supabase = require('../config/supabaseClient');

// GET /objetos - Obtener todos los objetos
const obtenerObjetos = async (req, res) => {
    const { data, error } = await supabase
        .from('objetos')
        .select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
};

// GET /objetos/:id - Obtener un objeto por su ID
const obtenerObjetoPorId = async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('objetos')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) {
        return res.status(404).json({ mensaje: 'Objeto no encontrado' });
    }

    res.json(data);
};

// GET /objetos/filtrar?tipo=Arma - Filtrar objetos por tipo
const obtenerObjetosPorTipo = async (req, res) => {
    const { tipo } = req.query;

    if (!tipo) {
        const { data, error } = await supabase
            .from('objetos')
            .select('*');

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        return res.json(data);
    }

    const { data, error } = await supabase
        .from('objetos')
        .select('*')
        .eq('tipo', tipo);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
};

// POST /objetos - Crear un nuevo objeto
const crearObjeto = async (req, res) => {
    const { nombre, tipo, valor, equipado } = req.body;

    const { data, error } = await supabase
        .from('objetos')
        .insert([{ nombre, tipo, valor, equipado }])
        .select()
        .single();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
};

// PUT /objetos/:id - Actualizar un objeto por ID
const actualizarObjeto = async (req, res) => {
    const { id } = req.params;
    const { nombre, tipo, valor, equipado } = req.body;

    const { data, error } = await supabase
        .from('objetos')
        .update({ nombre, tipo, valor, equipado })
        .eq('id', id)
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ mensaje: 'Objeto no encontrado para actualizar' });
    }

    res.json(data[0]);
};

// DELETE /objetos/:id - Eliminar un objeto por ID
const eliminarObjeto = async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('objetos')
        .delete()
        .eq('id', id)
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ mensaje: 'Objeto no encontrado para eliminar' });
    }

    res.json({ mensaje: 'Objeto eliminado correctamente', objeto: data[0] });
};

module.exports = {
    obtenerObjetos,
    obtenerObjetoPorId,
    obtenerObjetosPorTipo,
    crearObjeto,
    actualizarObjeto,
    eliminarObjeto
};
