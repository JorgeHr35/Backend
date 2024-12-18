import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js"; // Importar correctamente la clave secreta

const validateAdmin = (req, res, next) => {
    try {
        // Obtener el token del encabezado Authorization
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            console.log("No se proporcionó un token.");
            return res.status(401).json({ error: "Acceso denegado. No se proporcionó un token." });
        }

        // Verificar y decodificar el token JWT
        const decoded = jwt.verify(token, JWT_SECRET);

        // Validar que el rol del usuario sea 'administrador'
        if (decoded.rol !== "administrador") {
            console.log(`Acceso denegado. Rol actual: ${decoded.rol}`);
            return res.status(403).json({ error: "Acceso denegado. No tienes permisos de administrador." });
        }

        // Log de información del usuario autenticado
        console.log(`Acceso concedido al usuario: ${decoded.correo_electronico} con rol: ${decoded.rol}`);

        // Agregar la información del usuario al objeto de la solicitud
        req.user = decoded;

        next(); // Continuar con el siguiente middleware o controlador
    } catch (error) {
        console.error("Error al validar el token:", error.message);
        return res.status(401).json({ error: "Token no válido o expirado." });
    }
};

export default validateAdmin;
