import express from "express";
import {
  createOrder,
  getOrders,
  getMyOrders,
  updateOrderStatus,
  deleteOrder,
  cancelOrder,
} from "../../controller/orderController/ordercontroller.js";

import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Create order (customer)
router.post("/", verifyToken, createOrder);

// Get all orders (admin)
router.get("/", verifyToken, isAdmin, getOrders);

// Get logged-in user's orders (customer "My Orders")
router.get("/my", verifyToken, getMyOrders);

// Update order status (admin)
router.put("/:id/status", verifyToken, isAdmin, updateOrderStatus);

// Delete order (admin)
router.delete("/:id", verifyToken, isAdmin, deleteOrder);

// Cancel order (customer)
router.put("/:id/cancel", verifyToken, cancelOrder);

export default router;
