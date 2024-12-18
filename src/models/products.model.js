import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del producto es obligatorio"],
        trim: true,
    },
    descripcion: {
        type: String,
        trim: true,
        maxlength: [500, "La descripción no puede exceder los 500 caracteres"],
    },
    precio: {
        type: Number,
        required: [true, "El precio del producto es obligatorio"],
        min: [0, "El precio no puede ser negativo"],
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId, // Relación con la tabla de categorías
        ref: "Categoria", // Nombre del modelo de categorías
        required: [true, "La categoría es obligatoria"],
    },
    stock: {
        type: Number,
        default: 0,
        min: [0, "El stock no puede ser negativo"],
    },
    imagen_base64: {
        type: String,
        validate: {
            validator: function (v) {
                // Permite una cadena Base64 válida
                return /^data:image\/(png|jpeg|jpg|webp);base64,/.test(v) || v === null;
            },
            message: "La imagen no es una cadena Base64 válida",
        },
    },
    fecha_creacion: {
        type: Date,
        default: Date.now,
    },
    fecha_actualizacion: {
        type: Date,
        default: Date.now,
    },
});

// Middleware para actualizar la fecha de modificación automáticamente
productoSchema.pre("save", function (next) {
    this.fecha_actualizacion = Date.now();
    next();
});

const Producto = mongoose.model("Producto", productoSchema);
export default Producto;
