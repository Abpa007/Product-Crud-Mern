import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminOrders,
  updateOrderStatus,
  deleteOrder,
} from "../store/adminOrderSlice";
import toast from "react-hot-toast";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All");
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const ordersPerPage = 5;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(fetchAdminOrders(token));
    } else {
      toast.error("You are not logged in as admin. Please login first.");
    }
  }, [dispatch, token]);

  const filteredOrders = orders
    .filter(
      (order) =>
        order.shippingInfo.name.toLowerCase().includes(search.toLowerCase()) ||
        order.shippingInfo.phone.includes(search)
    )
    .filter((order) =>
      statusFilter === "All" ? true : order.status === statusFilter
    );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleMarkCompleted = async (orderId) => {
    if (!token) {
      toast.error("You are not logged in. Please login first.");
      return;
    }
    try {
      setUpdatingId(orderId);
      await dispatch(
        updateOrderStatus({ orderId, token, status: "Completed" })
      ).unwrap();
      toast.success("Order marked as Completed ✅");
    } catch (error) {
      toast.error(`Failed to update: ${error}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    if (!token) {
      toast.error("You are not logged in. Please login first.");
      return;
    }
    try {
      setDeletingId(orderId);
      await dispatch(deleteOrder({ orderId, token })).unwrap();
      toast.success("Order deleted successfully 🗑️");
    } catch (error) {
      toast.error(`Failed to delete: ${error}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen px-4 py-4 sm:px-8 sm:py-4 bg-gradient-to-br from-slate-100 via-slate-50 to-white">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7h18M3 12h18M3 17h18"
            />
          </svg>
          Admin Orders
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <input
            type="text"
            placeholder="🔍 Search by customer or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-72 px-4 py-2 rounded-md border border-slate-300 shadow focus:ring-2 focus:ring-emerald-400 outline-none transition"
          />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-md border border-slate-300 shadow focus:ring-2 focus:ring-emerald-400 outline-none transition"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center text-emerald-600 font-medium animate-pulse">
            Loading orders...
          </p>
        ) : error ? (
          <p className="text-center text-red-500 font-medium">Error: {error}</p>
        ) : currentOrders.length === 0 ? (
          <p className="text-center text-slate-500 flex flex-col items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-slate-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-7 0h8M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2h-4l-2-2H9L7 5H3a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            No orders found.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl shadow-lg bg-white backdrop-blur bg-opacity-90 scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-200">
            <table className="min-w-full text-sm text-left">
              <thead className="sticky top-0 bg-emerald-600 text-white uppercase text-xs">
                <tr>
                  {[
                    "#",
                    "Customer",
                    "Phone",
                    "Address",
                    "Amount",
                    "Payment",
                    "Items",
                    "Status",
                    "Date",
                    "Action",
                  ].map((header) => (
                    <th key={header} className="p-3 whitespace-nowrap">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order, index) => (
                  <tr
                    key={order._id}
                    className={`border-t ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50"
                    } hover:bg-emerald-50 transition`}
                  >
                    <td className="p-3">{indexOfFirstOrder + index + 1}</td>
                    <td className="p-3 font-semibold text-slate-800">
                      {order.shippingInfo.name}
                    </td>
                    <td className="p-3 text-slate-700">
                      {order.shippingInfo.phone}
                    </td>
                    <td className="p-3 max-w-[200px] whitespace-pre-wrap text-slate-600">
                      {order.shippingInfo.address}
                    </td>
                    <td className="p-3 font-bold text-emerald-700">
                      ₹{order.totalAmount}
                    </td>
                    <td className="p-3 text-sky-700 font-medium">
                      {order.paymentMethod}
                    </td>
                    <td className="p-3 space-y-1">
                      {order.cartItems.map((item) => (
                        <div key={item._id} className="text-slate-600">
                          {item.name} x {item.quantity}
                        </div>
                      ))}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                      <span className="block text-xs text-slate-400">
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col gap-1">
                        {order.status === "Pending" ? (
                          <button
                            onClick={() => handleMarkCompleted(order._id)}
                            disabled={updatingId === order._id}
                            className={`px-2 py-1 rounded-full text-xs font-semibold shadow transition ${
                              updatingId === order._id
                                ? "bg-slate-300 cursor-not-allowed"
                                : "bg-emerald-500 hover:bg-emerald-600 text-white"
                            }`}
                          >
                            {updatingId === order._id
                              ? "Updating..."
                              : "Mark Completed"}
                          </button>
                        ) : (
                          <span className="text-emerald-600 text-xs font-semibold">
                            Completed
                          </span>
                        )}
                        <button
                          onClick={() => handleDeleteOrder(order._id)}
                          disabled={deletingId === order._id}
                          className={`px-2 py-1 rounded-full text-xs font-semibold shadow transition ${
                            deletingId === order._id
                              ? "bg-slate-300 cursor-not-allowed"
                              : "bg-red-500 hover:bg-red-600 text-white"
                          }`}
                        >
                          {deletingId === order._id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-center items-center gap-2 p-4">
              <button
                aria-label="Previous Page"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-slate-200 hover:bg-slate-300 rounded-full shadow disabled:opacity-50 transition"
              >
                Prev
              </button>
              <span className="text-sm font-medium text-slate-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                aria-label="Next Page"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-slate-200 hover:bg-slate-300 rounded-full shadow disabled:opacity-50 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
