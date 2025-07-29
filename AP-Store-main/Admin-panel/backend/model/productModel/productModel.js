import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false, // optional, you can make it required if you want
      default: "", // default empty string if not provided
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("products", Schema);

export default productModel;
