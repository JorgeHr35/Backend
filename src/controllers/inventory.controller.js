//inventory controller

import Producto from "../models/products.model.js";

// Obtener todo el inventario (nombre, stock y categoría)
export const getInventory = async (req, res) => {
    try {
        const inventario = await Producto.find({}, "nombre stock categoria");
        res.status(200).json(inventario);
    } catch (error) {
        console.error("Error al obtener el inventario:", error);
        res.status(500).json({ error: "Error al obtener el inventario" });
    }
};

// Actualizar el stock de un producto
export const updateInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;

        if (stock < 0) {
            return res.status(400).json({ error: "El stock no puede ser negativo" });
        }

        const productoActualizado = await Producto.findByIdAndUpdate(
            id,
            { stock },
            { new: true }
        );

        if (!productoActualizado) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.status(200).json({ message: "Stock actualizado", producto: productoActualizado });
    } catch (error) {
        console.error("Error al actualizar el inventario:", error);
        res.status(500).json({ error: "Error al actualizar el inventario" });
    }
};
