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

    // Validar que la imagen Base64 sea válida
    if (imagen_base64 && !/^data:image\/(png|jpeg|jpg|webp);base64,/.test(imagen_base64)) {
      return res.status(400).json({ error: "La imagen debe ser una cadena Base64 válida" });
    }

    const nuevoProducto = new Producto({
      nombre,
      descripcion,
      precio,
      categoria,
      stock,
      imagen_base64, // Guardar la imagen en formato Base64
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
    const { nombre, descripcion, precio, categoria, stock, imagen_base64 } = req.body;

    // Validar que la imagen Base64 sea válida si se envía
    if (imagen_base64 && !/^data:image\/(png|jpeg|jpg|webp);base64,/.test(imagen_base64)) {
      return res.status(400).json({ error: "La imagen debe ser una cadena Base64 válida" });
    }

    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      { nombre, descripcion, precio, categoria, stock, imagen_base64 },
      { new: true }
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

