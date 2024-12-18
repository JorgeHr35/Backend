import app from "./app.js";
import { PORT } from "./config.js";

// Iniciar el servidor
const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
            console.log(`🌐 URL: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Error al iniciar el servidor:", error.message);
        process.exit(1); // Detener el proceso si hay un fallo crítico
    }
};

// Llamar a la función para iniciar el servidor
startServer();
