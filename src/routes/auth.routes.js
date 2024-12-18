import express from "express";
import { register, login } from "../controllers/auth.controller.js"; // Remueve updateUserRole
import { body, validationResult } from "express-validator";

const router = express.Router();

// Validación de entrada para registrar un nuevo usuario
router.post(
  "/register",
  [
    body("nombre").trim().notEmpty().withMessage("El nombre es obligatorio"),
    body("correo_electronico")
      .trim()
      .isEmail()
      .withMessage("El correo electrónico no es válido"),
    body("contrasena")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  register
);

// Validación de entrada para iniciar sesión
router.post(
  "/login",
  [
    body("correo_electronico")
      .trim()
      .isEmail()
      .withMessage("El correo electrónico no es válido"),
    body("contrasena")
      .notEmpty()
      .withMessage("La contraseña es obligatoria"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  login
);

export default router;
