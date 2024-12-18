import Producto from "../models/products.model.js";

// Obtener todos los productos con la categoría poblada
export const getAllProducts = async (req, res) => {
    try {
        const productos = await Producto.find().populate("categoria", "nombre");
        res.status(200).json(productos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ error: "Error al obtener productos" });
    }
};

// Obtener un producto por ID con la categoría poblada
export const getProductById = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id).populate("categoria", "nombre");
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.status(200).json(producto);
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).json({ error: "Error al obtener el producto" });
    }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
    try {
        const { nombre, descripcion, precio, categoria, stock, imagen_base64 } = req.body;

        // Validar que los datos requeridos estén presentes
        if (!nombre || !precio || !categoria) {
            return res.status(400).json({ message: "Faltan datos requeridos" });
        }

        const nuevoProducto = new Producto({
            nombre,
            descripcion,
            precio,
            categoria,
            stock: stock || 0,
            imagen_base64: imagen_base64 || null, // Guardar la imagen en Base64 si existe
        });

        const productoGuardado = await nuevoProducto.save();
        res.status(201).json(productoGuardado);
    } catch (error) {
        console.error("Error al crear producto:", error);
        res.status(500).json({ message: "Error al crear el producto" });
    }
};

// Actualizar un producto existente
export const updateProduct = async (req, res) => {
    try {
        const { nombre, descripcion, precio, categoria, stock, imagen_base64 } = req.body;

        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        // Actualizar campos
        producto.nombre = nombre || producto.nombre;
        producto.descripcion = descripcion || producto.descripcion;
        producto.precio = precio || producto.precio;
        producto.categoria = categoria || producto.categoria;
        producto.stock = stock !== undefined ? stock : producto.stock;
        producto.imagen_base64 = imagen_base64 || producto.imagen_base64;

        const productoActualizado = await producto.save();
        res.status(200).json(productoActualizado);
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ message: "Error al actualizar el producto" });
    }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
    try {
        const productoEliminado = await Producto.findByIdAndDelete(req.params.id);

        if (!productoEliminado) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.status(200).json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
};
