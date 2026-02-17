import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDb from "./config/db.js";

import authRoutes from "./routers/auth.routes.js";
import adminRoutes from "./routers/admin.routes.js";
import vendorRoutes from "./routers/vendor.routes.js";
import userRoutes from "./routers/user.routes.js";
import cartRoutes from "./routers/cart.routes.js";
import productRoutes from "./routers/productRoutes.js";

import { errorHandler } from "./middleware/error.middleware.js";


// ---------------- CONFIG ----------------
dotenv.config();
connectDb();

const app = express();


// ---------------- MIDDLEWARE ----------------

// body parser
app.use(express.json());

// CORS (works for both local + deployed frontend)
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);


// ---------------- ROUTES ----------------

// health check route (important for Render uptime check)
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);


// ---------------- ERROR HANDLER ----------------
// must be last middleware
app.use(errorHandler);


// ---------------- SERVER START ----------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
