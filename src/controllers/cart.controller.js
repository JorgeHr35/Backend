//cart controller
import Carrito from "../models/cart.model.js";

// Obtener el carrito del usuario
export const getCart = async (req, res) => {
    try {
        const carrito = await Carrito.findOne({ usuario: req.params.usuarioId }).populate("items.producto");
        if (!carrito) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }
        res.status(200).json(carrito);
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        res.status(500).json({ error: "Error al obtener el carrito" });
    }
};

// Agregar un producto al carrito
export const addToCart = async (req, res) => {
    try {
        const { usuarioId, productoId, cantidad } = req.body;

        let carrito = await Carrito.findOne({ usuario: usuarioId });

        if (!carrito) {
            // Crear un nuevo carrito si no existe
            carrito = new Carrito({ usuario: usuarioId, items: [] });
        }

        // Verificar si el producto ya está en el carrito
        const itemIndex = carrito.items.findIndex((item) => item.producto.toString() === productoId);

        if (itemIndex > -1) {
            // Actualizar la cantidad del producto
            carrito.items[itemIndex].cantidad += cantidad;
        } else {
            // Agregar el producto al carrito
            carrito.items.push({ producto: productoId, cantidad });
        }

        await carrito.save();
        res.status(200).json(carrito);
    } catch (error) {
        console.error("Error al agregar al carrito:", error);
        res.status(500).json({ error: "Error al agregar al carrito" });
    }
};

// Eliminar un producto del carrito
export const removeFromCart = async (req, res) => {
    try {
        const { usuarioId, productoId } = req.body;

        const carrito = await Carrito.findOne({ usuario: usuarioId });

        if (!carrito) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        carrito.items = carrito.items.filter((item) => item.producto.toString() !== productoId);
        await carrito.save();

        res.status(200).json(carrito);
    } catch (error) {
        console.error("Error al eliminar del carrito:", error);
        res.status(500).json({ error: "Error al eliminar del carrito" });
    }
};

// Vaciar el carrito
export const clearCart = async (req, res) => {
    try {
        const { usuarioId } = req.body;

        const carrito = await Carrito.findOne({ usuario: usuarioId });

        if (!carrito) {
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        carrito.items = [];
        await carrito.save();

        res.status(200).json({ message: "Carrito vaciado exitosamente" });
    } catch (error) {
        console.error("Error al vaciar el carrito:", error);
        res.status(500).json({ error: "Error al vaciar el carrito" });
    }
};
