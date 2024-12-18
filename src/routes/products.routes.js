import express from "express";
import multer from "multer";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import { body, param, validationResult } from "express-validator";

const router = express.Router();

// --- Configuración de Multer (Única y Corregida) ---
// Almacenamiento y nombre del archivo
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta donde se almacenarán las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Reemplazar espacios en blanco con guiones bajos
    const sanitizedFilename = file.originalname.replace(/\s+/g, "_");
    cb(null, `${uniqueSuffix}-${sanitizedFilename}`);
  },
});

// Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("El archivo debe ser una imagen válida (jpg, png, etc.)"), false);
  }
};

// Middleware de multer
const upload = multer({ storage, fileFilter });

// Middleware para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// --- Rutas Públicas (sin protecciones) ---
router.get("/", getAllProducts);

router.get(
  "/:id",
  [
    param("id").notEmpty().withMessage("ID requerido").isMongoId().withMessage("ID inválido"),
  ],
  handleValidationErrors,
  getProductById
);

// --- Crear Producto con Imagen ---
router.post(
  "/",
  upload.single("imagen"), // Middleware para subir un archivo con nombre 'imagen'
  [
    body("nombre").notEmpty().withMessage("El nombre del producto es obligatorio"),
    body("precio")
      .notEmpty()
      .isFloat({ min: 0 })
      .withMessage("El precio debe ser mayor o igual a 0"),
  ],
  handleValidationErrors,
  createProduct
);

// --- Actualizar Producto con Imagen ---
router.put(
  "/:id",
  upload.single("imagen"), // Middleware para actualizar un archivo
  [
    param("id").notEmpty().isMongoId().withMessage("ID inválido"),
    body("nombre").optional().notEmpty().withMessage("El nombre no puede estar vacío"),
    body("precio").optional().isFloat({ min: 0 }).withMessage("Precio inválido"),
  ],
  handleValidationErrors,
  updateProduct
);

// --- Eliminar Producto ---
router.delete(
  "/:id",
  [
    param("id").notEmpty().isMongoId().withMessage("ID inválido"),
  ],
  handleValidationErrors,
  deleteProduct
);

export default router;
