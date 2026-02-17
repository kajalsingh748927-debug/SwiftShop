import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Internal imports - Ensure these files exist with .js extensions
import connectDb from "./config/db.js";
import authRoutes from "./routers/auth.routes.js";
import adminRoutes from "./routers/admin.routes.js";
import vendorRoutes from "./routers/vendor.routes.js";
import userRoutes from "./routers/user.routes.js";
import cartRoutes from "./routers/cart.routes.js";
import productRoutes from "./routers/productRoutes.js";

import { errorHandler } from "./middleware/error.middleware.js";

// 1. Initialize Environment Variables
dotenv.config();

const app = express();

// 2. Middleware setup
app.use(express.json());

// CORS configuration - allowing local development and production frontend
const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  })
);

// 3. Health Check Routes (Helps Render monitor service status)
app.get("/", (req, res) => {
  res.send("SwiftShop API is running...");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// 4. API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);

// 5. Global Error Handler (Must be defined AFTER routes)
app.use(errorHandler);

// 6. Server Initialization
// Render uses port 10000 by default, so we prioritize the env variable
const PORT = process.env.PORT || 10000;

const startServer = async () => {
  try {
    // Wait for Database to connect before starting the server
    await connectDb();
    console.log("✅ MongoDB Connected Successfully");
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Deployment failed during startup:", error.message);
    process.exit(1); // Exit process with failure
  }
};

startServer();
