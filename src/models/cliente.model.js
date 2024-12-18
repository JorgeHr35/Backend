import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        trim: true,
        minlength: [3, "El nombre debe tener al menos 3 caracteres"],
        maxlength: [100, "El nombre no puede exceder los 100 caracteres"],
    },
    correo_electronico: {
        type: String,
        required: [true, "El correo electrónico es obligatorio"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: "El correo electrónico no es válido",
        },
    },
    contrasena: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    },
    direccion: {
        type: String,
        trim: true,
        maxlength: [200, "La dirección no puede exceder los 200 caracteres"],
    },
    telefono: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[0-9]{10}$/.test(v); // Valida números de 10 dígitos
            },
            message: "El número de teléfono no es válido",
        },
    },
    rol: {
        type: String,
        enum: ["cliente", "administrador"],
        required: [true, "El rol es obligatorio"],
        default: "cliente", // Por defecto, el rol será "cliente"
    },
    fecha_creacion: {
        type: Date,
        default: Date.now,
    },
});

// Middleware para convertir correos electrónicos a minúsculas antes de guardar
clienteSchema.pre("save", function (next) {
    if (this.isModified("correo_electronico")) {
        this.correo_electronico = this.correo_electronico.toLowerCase();
    }
    next();
});

const Cliente = mongoose.model("Cliente", clienteSchema);
export default Cliente;
