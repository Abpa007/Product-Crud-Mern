import mongoose from "mongoose";
import Order from "../../model/orderModel/orderModel.js";

// Create new order
export const createOrder = async (req, res) => {
  try {
    const { cartItems, shippingInfo, totalAmount, paymentMethod } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.phone) {
      return res
        .status(400)
        .json({ message: "Incomplete shipping information" });
    }
    if (!paymentMethod || !["COD", "QR"].includes(paymentMethod)) {
      return res
        .status(400)
        .json({ message: "Invalid payment method. Choose COD or QR." });
    }

    const newOrder = new Order({
      user: req.user.id, // using id as set by verifyToken
      cartItems,
      shippingInfo,
      totalAmount,
      paymentMethod,
    });

    const savedOrder = await newOrder.save();
    res
      .status(201)
      .json({ message: "Order created successfully", order: savedOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

// Get all orders (admin)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // 🚩 DEBUG: Show exactly what is coming in
  console.log("🚩 Updating Order Status:");
  console.log("Params ID:", id);
  console.log("Body Status:", status);
  console.log("User:", req.user);

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as admin" });
    }

    if (!status || !["Pending", "Completed", "Cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    const updatedOrder = await order.save();

    res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("❌ Error updating order status:", error);
    res.status(500).json({
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

// Delete order (admin)
export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized as admin" });
    }

    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res
      .status(200)
      .json({ message: "Order deleted successfully", order: deletedOrder });
  } catch (error) {
    console.error("Error deleting order:", error);
    res
      .status(500)
      .json({ message: "Failed to delete order", error: error.message });
  }
};

// Get logged-in user's orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Failed to fetch user orders" });
  }
};

// Cancel order (customer)
export const cancelOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "Pending") {
      return res.status(400).json({ message: "Cannot cancel this order" });
    }

    if (order.user.toString() !== req.user.id.toString()) {
      return res
        .status(401)
        .json({ message: "Not authorized to cancel this order" });
    }

    order.status = "Cancelled";
    const updatedOrder = await order.save();
    res
      .status(200)
      .json({ message: "Order cancelled successfully", order: updatedOrder });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ message: "Failed to cancel order" });
  }
};
