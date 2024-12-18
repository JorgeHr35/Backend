import dotenv from "dotenv";
import path from "path";

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// Validar que las variables esenciales estén definidas
const requiredEnvVars = ["JWT_SECRET", "DB_URI"];

requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        console.error(`❌ Falta la variable de entorno ${envVar} en el archivo .env`);
        process.exit(1); // Detener la aplicación
    }
});

// Exportar las configuraciones
export const JWT_SECRET = process.env.JWT_SECRET;
export const DB_URI = process.env.DB_URI;
export const PORT = process.env.PORT || 4000;
export const NODE_ENV = process.env.NODE_ENV || "development";

console.log(`✅ Configuración cargada en modo: ${NODE_ENV}`);

