import express from "express";
import { getInventory, updateInventory } from "../controllers/inventory.controller.js";

const router = express.Router();

// Obtener el inventario de productos
router.get("/", getInventory);

// Actualizar el stock de un producto
router.put("/:id", updateInventory);

export default router;
