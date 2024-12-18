import express from "express";
import { getAllCategories, createCategory, deleteCategory } from "../controllers/category.controller.js";

const router = express.Router();

// Obtener todas las categorías
router.get("/", getAllCategories);

// Crear una nueva categoría
router.post("/", createCategory);

// Eliminar una categoría
router.delete("/:id", deleteCategory);

export default router;
