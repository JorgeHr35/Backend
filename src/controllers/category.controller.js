//category controller

import Categoria from "../models/category.model.js";

// Obtener todas las categorías
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Categoria.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener categorías" });
    }
};

// Crear una nueva categoría
export const createCategory = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const nuevaCategoria = new Categoria({ nombre, descripcion });
        await nuevaCategoria.save();
        res.status(201).json({ message: "Categoría creada exitosamente", nuevaCategoria });
    } catch (error) {
        res.status(500).json({ error: "Error al crear la categoría" });
    }
};

// Eliminar una categoría
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const categoriaEliminada = await Categoria.findByIdAndDelete(id);
        if (!categoriaEliminada) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }
        res.status(200).json({ message: "Categoría eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la categoría" });
    }
};
