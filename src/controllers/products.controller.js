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
      const { nombre, descripcion, precio, categoria, stock } = req.body;
  
      // Generar la ruta de la imagen si se subió
      const imagen_url = req.file ? `uploads/${req.file.filename}` : null;
  
      const nuevoProducto = new Producto({
        nombre,
        descripcion,
        precio,
        categoria,
        stock,
        imagen_url, // Guardar la ruta local
      });
  
      const productoGuardado = await nuevoProducto.save();
      res.status(201).json(productoGuardado);
    } catch (error) {
      console.error("Error al crear el producto:", error);
      res.status(500).json({ error: "Error al crear el producto" });
    }
  };
  
  


// Actualizar un producto existente
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, categoria, stock } = req.body;

        // Obtener la ruta de la imagen subida si existe
        const imagen_url = req.file ? req.file.path : req.body.imagen_url;

        const productoActualizado = await Producto.findByIdAndUpdate(
            id,
            { nombre, descripcion, precio, categoria, stock, imagen_url },
            { new: true } // Devuelve el producto actualizado
        );

        if (!productoActualizado) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.status(200).json(productoActualizado);
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
