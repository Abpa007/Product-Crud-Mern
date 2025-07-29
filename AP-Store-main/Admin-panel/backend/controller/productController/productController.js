import productModel from "../../model/productModel/productModel.js";

// Create a new product (admin only)
export const createData = async (req, res) => {
  try {
    console.log("📦 req.body:", req.body);
    console.log("🖼️ req.file:", req.file);

    const { name, price, description } = req.body;
    const image = req.file?.filename;

    // Validate required fields
    if (!name || !price || !image) {
      return res.status(400).json({ message: "Fill all required fields" });
    }

    // Create a new product document
    const newProduct = new productModel({ name, price, image, description });
    await newProduct.save();

    // Respond with the created product
    res.status(201).json({ message: "Product created", product: newProduct });
  } catch (err) {
    console.error("❌ Error creating product:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all products (public)
export const getData = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({
      message: "Data fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

// Get product by ID (public)
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      message: "Error fetching product",
      error: error.message,
    });
  }
};

// Update product by ID (admin only)
export const updateData = async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  // Default to old image if no new file is uploaded
  let image = req.body.image;

  // If new image is uploaded, override image value
  if (req.file) {
    image = req.file.filename;
  }

  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { name, price, image, description },
      {
        new: true, // return updated document
        runValidators: true, // validate fields before update
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
};

// Delete product by ID (admin only)
export const deleteData = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      message: "Failed to delete product",
      error: error.message,
    });
  }
};
