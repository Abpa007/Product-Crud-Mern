import express from "express";
import {
  getData,
  getProductById,
  createData,
  updateData,
  deleteData,
} from "../../controller/productController/productController.js";
import upload from "../../middleware/upload.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js"; // your JWT auth

const productRoute = express.Router();

// Public routes
productRoute.get("/", getData);
productRoute.get("/:id", getProductById);

// Protected routes (admin)
productRoute.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("image"),
  createData
);
productRoute.put(
  "/:id",
  verifyToken,
  isAdmin,
  upload.single("image"),
  updateData
);
productRoute.delete("/:id", verifyToken, isAdmin, deleteData);

export default productRoute;
