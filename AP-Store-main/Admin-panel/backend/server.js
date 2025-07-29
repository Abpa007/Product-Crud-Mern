import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./config/db.js"; // MongoDB connection

import productRoute from "./routes/productRoute/productRoute.js";
import userRoute from "./routes/userRoute/userRoute.js";
import orderRoutes from "./routes/orderRoute/orderRoute.js";

dotenv.config();

const app = express();
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

app.use(
  cors({
    origin: allowedOrigins,
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
