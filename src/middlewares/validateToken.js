//validar token

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

const validateToken = (req, res, next) => {
    try {
        // Obtener el token del encabezado Authorization
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ error: "Acceso denegado. No se proporcionó un token." });
        }

        // Verificar y decodificar el token JWT
        const decoded = jwt.verify(token, JWT_SECRET);

        // Agregar la información del usuario al objeto de la solicitud
        req.user = decoded;

        next(); // Continuar con el siguiente middleware o controlador
    } catch (error) {
        return res.status(401).json({ error: "Token no válido o expirado." });
    }
};

export default validateToken;
