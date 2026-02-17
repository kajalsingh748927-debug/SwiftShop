import express from "express";
// CHANGE 'controllers' to 'Controllers' to match your folder name!
import {
  getAllProducts,
  getProductById,
  placeOrder,
  getMyOrders,
  cancelOrder,
  getVendorProducts,
  getVendors
} from "../Controllers/user.controller.js"; 

import { protect } from "../middleware/auth.middleware.js";
import { isUser } from "../middleware/role.middleware.js";

const router = express.Router();

// GET SINGLE PRODUCT
router.get("/product/:id", protect, getProductById);

// GET ALL PRODUCTS
router.get("/products", protect, getAllProducts);

// GET VENDOR PRODUCTS
router.get("/products/vendor/:vendorId", protect, getVendorProducts);

// Orders
router.post("/order", protect, isUser, placeOrder);
router.get("/orders", protect, isUser, getMyOrders);
router.put("/order/:id/cancel", protect, isUser, cancelOrder);
router.get('/vendors', getVendors);

export default router;
