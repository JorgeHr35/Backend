import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre de la categoría es obligatorio"],
        trim: true,
        maxlength: [100, "El nombre no puede exceder los 100 caracteres"],
    },
    descripcion: {
        type: String,
        trim: true,
        maxlength: [500, "La descripción no puede exceder los 500 caracteres"],
    },
    fecha_creacion: {
        type: Date,
        default: Date.now,
    },
});

const Categoria = mongoose.model("Categoria", categorySchema);
export default Categoria;
