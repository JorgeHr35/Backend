import express from "express";
import { getCart, addToCart, removeFromCart, clearCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/:usuarioId", getCart); // Obtener el carrito del usuario
router.post("/add", addToCart); // Agregar un producto al carrito
router.post("/remove", removeFromCart); // Eliminar un producto del carrito
router.post("/clear", clearCart); // Vaciar el carrito

export default router;
