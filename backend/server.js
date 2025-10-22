import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// ===== Middleware =====
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Allow frontend access
  credentials: true,
}));
app.use(express.json());

// ===== Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Scriblr Buddy Backend is running successfully!");
});

// ===== MongoDB Connection =====
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb://localhost:27017/scriblr-buddy";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((error) =>
    console.error("❌ MongoDB connection failed:", error.message)
  );

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
