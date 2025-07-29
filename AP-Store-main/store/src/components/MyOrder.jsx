// Clean, consistent MyOrders page UI upgrade
// - Unified card design with consistent placement of status
// - Status shown as clear pill on the right bottom next to cancel button
// - Removed repeated and messy structures
// - Modern, clean, readable UI

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchMyOrders, cancelOrder } from "../store/OrderSlice";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await dispatch(cancelOrder(orderId)).unwrap();
      toast.success("Order cancelled successfully");
    } catch (err) {
      toast.error(err || "Failed to cancel order");
    }
  };

  let filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  filteredOrders = [...filteredOrders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        🛒 My Orders
      </h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {["All", "Pending", "Completed", "Cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
              filterStatus === status
                ? "bg-emerald-500 text-white border-emerald-500 shadow"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order, index) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition p-4 relative"
            >
              {/* Order Number */}
              <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow">
                #{index + 1}
              </div>

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                <div className="text-lg font-semibold text-gray-800">
                  Order ID:{" "}
                  <span className="text-gray-600">{order._id.slice(-6)}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}{" "}
                  {new Date(order.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700 mb-3">
                <div>
                  <strong>Amount:</strong> ₹{order.totalAmount}
                </div>
                <div>
                  <strong>Payment:</strong> {order.paymentMethod}
                </div>
                <div className="sm:col-span-2">
                  <strong>Address:</strong> {order.shippingInfo.address}
                </div>
              </div>

              {/* Items */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
                <strong className="text-gray-800">Items:</strong>
                <ul className="list-disc list-inside text-gray-700 text-sm mt-1">
                  {order.cartItems.map((item) => (
                    <li key={item._id}>
                      {item.name} x {item.quantity} — ₹{item.price}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center flex-wrap gap-3">
                {order.status === "Pending" && (
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full text-sm font-medium transition"
                  >
                    Cancel Order
                  </button>
                )}
                <span
                  className={`text-base font-bold rounded-full px-4 py-1 ${
                    order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-rose-100 text-rose-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
