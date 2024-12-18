import Pedido from "../models/order.model.js";

export const createOrder = async (req, res) => {
  try {
    const { productos, total } = req.body;

    if (!productos || !total) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    const nuevoPedido = new Pedido({
      productos,
      total,
    });

    await nuevoPedido.save();
    res.status(201).json({ message: "Pedido creado exitosamente", pedido: nuevoPedido });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el pedido" });
  }
};

// Obtener todos los pedidos
export const getAllOrders = async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate("productos.producto", "nombre precio") // Trae detalles del producto
      .sort({ fecha: -1 }); // Ordenar por fecha descendente
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los pedidos" });
  }
};
