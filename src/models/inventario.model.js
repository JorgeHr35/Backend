import mongoose from "mongoose";

const inventarioSchema = new mongoose.Schema({
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: [true, "El producto es obligatorio"],
    },
    cantidad_disponible: {
        type: Number,
        required: [true, "La cantidad disponible es obligatoria"],
        min: [0, "La cantidad disponible no puede ser negativa"],
    },
    fecha_actualizacion: {
        type: Date,
        default: Date.now,
    },
});

// Middleware para actualizar automáticamente la fecha cuando se modifica el inventario
inventarioSchema.pre("save", function (next) {
    this.fecha_actualizacion = Date.now();
    next();
});

const Inventario = mongoose.model("Inventario", inventarioSchema);
export default Inventario;
