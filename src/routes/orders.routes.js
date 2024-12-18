import express from "express";
import { createOrder } from "../controllers/orders.controller.js";
import { getAllOrders } from "../controllers/orders.controller.js";

const router = express.Router();

// Crear un nuevo pedido
router.post("/", createOrder);

router.get("/", getAllOrders);

export default router;
