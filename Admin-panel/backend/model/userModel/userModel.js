import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }, // ✅ add this
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);
export default userModel;
