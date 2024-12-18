import Producto from "../models/products.model.js";

// Obtener todos los productos con la categoría poblada
export const getAllProducts = async (req, res) => {
    try {
        const productos = await Producto.find().populate("categoria", "nombre");
        // Modificar las URLs de imágenes a HTTPS si vienen de archivos locales
        const productosConUrl = productos.map((producto) => ({
            ...producto._doc,
            imagen_url: producto.imagen_url?.startsWith("uploads")
                ? `https://backend-12sq.onrender.com/${producto.imagen_url}`
                : producto.imagen_url,
        }));
        res.status(200).json(productosConUrl);
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).json({ error: "Error al obtener productos" });
    }
};

// Obtener un producto por ID con la categoría poblada
export const getProductById = async (req, res) => {
    try {
        let producto = await Producto.findById(req.params.id).populate("categoria", "nombre");
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        // Modificar la URL si la imagen es local
        producto = {
            ...producto._doc,
            imagen_url: producto.imagen_url?.startsWith("uploads")
                ? `https://backend-12sq.onrender.com/${producto.imagen_url}`
                : producto.imagen_url,
        };

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

        // Si se subió un archivo, guarda la URL de uploads
        const imagen_url = req.file
            ? `uploads/${req.file.filename}` // Ruta local
            : imagen_base64 || null; // Base64 si no se sube archivo

        const nuevoProducto = new Producto({
            nombre,
            descripcion,
            precio,
            categoria,
            stock,
            imagen_url,
        });

        const productoGuardado = await nuevoProducto.save();
        res.status(201).json({
            ...productoGuardado._doc,
            imagen_url: imagen_url.startsWith("uploads")
                ? `https://backend-12sq.onrender.com/${imagen_url}`
                : imagen_url,
        });
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({ error: "Error al crear el producto" });
    }
};

// Actualizar un producto existente
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, categoria, stock, imagen_base64 } = req.body;

        // Verifica si se subió un archivo o se envió una imagen en Base64
        const imagen_url = req.file
            ? `uploads/${req.file.filename}`
            : imagen_base64 || null;

        const productoActualizado = await Producto.findByIdAndUpdate(
            id,
            { nombre, descripcion, precio, categoria, stock, imagen_url },
            { new: true }
        );

        if (!productoActualizado) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.status(200).json({
            ...productoActualizado._doc,
            imagen_url: imagen_url?.startsWith("uploads")
                ? `https://backend-12sq.onrender.com/${imagen_url}`
                : imagen_url,
        });
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ error: "Error al actualizar el producto" });
    }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const productoEliminado = await Producto.findByIdAndDelete(id);

        if (!productoEliminado) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.status(200).json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
};
