import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: true,
    },
    cantidad: {
        type: Number,
        required: true,
        min: 1,
    },
});

const cartSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cliente",
        required: true,
        unique: true, // Un carrito por usuario
    },
    items: [cartItemSchema],
    fecha_creacion: {
        type: Date,
        default: Date.now,
    },
});

const Carrito = mongoose.model("Carrito", cartSchema);
export default Carrito;
