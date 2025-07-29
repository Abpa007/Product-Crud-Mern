// scripts/fixOrders.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Order from "../model/orderModel/orderModel.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Explicitly load .env from backend folder
dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("MONGO_URI:", process.env.MONGO_URI);

const fixOrders = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB for fixing orders");

    const adminUserId = "687fb5c4d2ab522bcb20c1bd"; // your admin _id

    const result = await Order.updateMany(
      { $or: [{ user: { $exists: false } }, { user: null }] },
      { $set: { user: adminUserId } }
    );

    console.log(`✅ Fixed orders: ${result.modifiedCount}`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error fixing orders:", error);
    process.exit(1);
  }
};

fixOrders();
