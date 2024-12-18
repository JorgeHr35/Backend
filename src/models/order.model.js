import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  productos: [
    {
      producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

const Pedido = mongoose.model("Pedido", orderSchema);
export default Pedido;
