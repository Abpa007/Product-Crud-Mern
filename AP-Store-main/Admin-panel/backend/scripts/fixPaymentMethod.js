// scripts/fixPaymentMethod.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Order from "../model/orderModel/orderModel.js";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), "../.env") });
console.log("MONGO_URI:", process.env.MONGO_URI);

const fixPaymentMethod = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB for fixing paymentMethod");

    const result = await Order.updateMany(
      { paymentMethod: { $exists: false } },
      { $set: { paymentMethod: "COD" } }
    );

    console.log(
      `✅ Fixed orders with missing paymentMethod: ${result.modifiedCount}`
    );
    process.exit(0);
  } catch (error) {
    console.error("❌ Error fixing paymentMethod:", error);
    process.exit(1);
  }
};

fixPaymentMethod();
