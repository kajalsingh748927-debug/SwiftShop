import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../Controllers/cart.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { isUser } from "../middleware/role.middleware.js";

const router = express.Router();

// ================= CART =================
router.post("/", protect, isUser, addToCart);
router.get("/", protect, isUser, getCart);
router.put("/:itemId", protect, isUser, updateCartItem);
router.delete("/:itemId", protect, isUser, removeFromCart);
router.delete("/", protect, isUser, clearCart);

export default router;
