import express from "express";
import {
  createProduct,
  getProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct
} from "../controllers/product.js";
import { adminAuth } from "../middlewares/adminAuth.js";

const router = express.Router();

/* ADMIN */
router.post("/", adminAuth, createProduct);
router.put("/:productId", adminAuth, updateProduct);
router.delete("/:productId", adminAuth, deleteProduct);

/* PUBLIC */
router.get("/", getProducts);
router.get("/:slug", getProductBySlug);

export default router;
