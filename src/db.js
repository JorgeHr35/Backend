import mongoose from "mongoose";
import { DB_URI } from "./config.js";

const connectDB = async () => {
    try {
        // Conectar a la base de datos
        const connection = await mongoose.connect(DB_URI);

        console.log(
            `✅ Conectado a la base de datos MongoDB: ${connection.connection.host}`
        );
    } catch (error) {
        console.error("❌ Error al conectar a la base de datos:", error.message);

        // Cerrar la aplicación si hay un error crítico
        process.exit(1);
    }

    // Manejo de desconexión inesperada
    mongoose.connection.on("disconnected", () => {
        console.error("⚠️ La conexión con la base de datos se perdió.");
    });

    // Reintento automático en caso de desconexión
    mongoose.connection.on("reconnected", () => {
        console.log("🔄 Reconectado a la base de datos MongoDB.");
    });
};

export default connectDB;

