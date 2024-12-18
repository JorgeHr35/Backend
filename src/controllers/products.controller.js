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
    const { name, price, year, image_base64 } = req.body;

    const newProduct = new Products({
      name,
      price,
      year,
      image: image_base64 || null, // Guardar la imagen Base64 si existe
      user: req.user.id,
    });

    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ message: "Error al crear el producto" });
  }
};


// Actualizar un producto existente
export const editProduct = async (req, res) => {
  try {
    const { name, price, year, image_base64 } = req.body;

    const updatedData = {
      name,
      price,
      year,
      image: image_base64 || req.product.image, // Actualizar la imagen si existe
      user: req.user.id,
    };

    const updatedProduct = await Products.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error al editar producto:", error);
    res.status(500).json({ message: "Error al editar el producto" });
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
