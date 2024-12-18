import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/products.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import orderRoutes from "./routes/orders.routes.js";
import path from "path";

// Cargar variables de entorno
dotenv.config();

// Validar variables de entorno críticas
if (!process.env.DB_URI) {
    console.error("Error: La variable DB_URI no está definida en el archivo .env");
    process.exit(1);
}

if (!process.env.JWT_SECRET) {
    console.error("Error: La variable JWT_SECRET no está definida en el archivo .env");
    process.exit(1);
}

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares globales
app.use(express.json()); // Parsear JSON
app.use(cors()); // Habilitar CORS

// Logger simple para depuración
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Servir archivos estáticos desde la carpeta "uploads" con una URL absoluta
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas principales
try {
    app.use("/api/auth", authRoutes); // Autenticación
    app.use("/api/products", productRoutes); // Productos
    app.use("/api/inventory", inventoryRoutes); // Inventario
    app.use("/api/orders", orderRoutes); // Pedidos
    app.use("/api/categories", categoryRoutes); // Categorías
} catch (error) {
    console.error("Error al cargar rutas:", error.message);
}

// Ruta raíz
app.get("/", (req, res) => {
    res.send("Bienvenido a la API de la tienda deportiva");
});

// Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

// Middleware de manejo global de errores
app.use((err, req, res, next) => {
    console.error("Error:", err.stack);
    res.status(500).json({
        error: "Error interno del servidor",
        message: err.message,
    });
});

export default app;
