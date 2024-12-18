import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import { body, param, validationResult } from "express-validator";

const router = express.Router();

// Middleware para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// --- Rutas Públicas ---

// Obtener todos los productos
router.get("/", getAllProducts);

// Obtener un producto por ID
router.get(
  "/:id",
  [
    param("id").notEmpty().withMessage("ID requerido").isMongoId().withMessage("ID inválido"),
  ],
  handleValidationErrors,
  getProductById
);

// Crear un nuevo producto (Imagen Base64)
router.post(
  "/",
  [
    body("nombre").notEmpty().withMessage("El nombre del producto es obligatorio"),
    body("descripcion").optional().isString().withMessage("La descripción debe ser un texto válido"),
    body("precio")
      .notEmpty()
      .isFloat({ min: 0 })
      .withMessage("El precio debe ser mayor o igual a 0"),
    body("categoria").notEmpty().isMongoId().withMessage("La categoría es obligatoria y válida"),
    body("imagen_base64")
      .optional()
      .matches(/^data:image\/(png|jpeg|jpg|webp);base64,/)
      .withMessage("La imagen debe ser una cadena Base64 válida"),
  ],
  handleValidationErrors,
  createProduct
);

// Actualizar un producto existente (Imagen Base64)
router.put(
  "/:id",
  [
    param("id").notEmpty().isMongoId().withMessage("ID inválido"),
    body("nombre").optional().notEmpty().withMessage("El nombre no puede estar vacío"),
    body("descripcion").optional().isString().withMessage("La descripción debe ser un texto válido"),
    body("precio").optional().isFloat({ min: 0 }).withMessage("Precio inválido"),
    body("categoria").optional().isMongoId().withMessage("La categoría debe ser válida"),
    body("imagen_base64")
      .optional()
      .matches(/^data:image\/(png|jpeg|jpg|webp);base64,/)
      .withMessage("La imagen debe ser una cadena Base64 válida"),
  ],
  handleValidationErrors,
  updateProduct
);

// Eliminar un producto por ID
router.delete(
  "/:id",
  [
    param("id").notEmpty().isMongoId().withMessage("ID inválido"),
  ],
  handleValidationErrors,
  deleteProduct
);

export default router;
