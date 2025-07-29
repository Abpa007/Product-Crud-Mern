import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Fetch logged-in user's orders (GET /api/orders/my)
export const fetchMyOrders = createAsyncThunk(
  "orders/fetchMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      
      // 🛠️ DEBUG LOG
      console.log("🛠️ [fetchMyOrders] Checking Token:", token);

      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await fetch("http://localhost:5000/api/orders/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ [fetchMyOrders] API Error:", errorData);
        throw new Error(errorData.message || "Failed to fetch orders");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("❌ [fetchMyOrders] Catch Error:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Create order (POST) with paymentMethod included
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (
    { cartItems, shippingInfo, totalAmount, paymentMethod },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");

      // 🛠️ DEBUG LOGS - CHECK CONSOLE WHEN YOU CLICK PLACE ORDER
      console.log("🛠️ [createOrder] 1. Token found in localStorage:", token);
      console.log("📦 [createOrder] 2. Payload being sent:", {
        cartItems,
        shippingInfo,
        totalAmount,
        paymentMethod,
      });

      if (!token) {
        console.error("❌ [createOrder] ABORTING: Token is null!");
        throw new Error("Authentication failed: No token found. Please login again.");
      }

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cartItems,
          shippingInfo,
          totalAmount,
          paymentMethod,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get raw text in case JSON fails
        console.error("❌ [createOrder] Server Response Error:", errorText);
        
        let errorMessage = "Failed to create order";
        try {
            const jsonError = JSON.parse(errorText);
            errorMessage = jsonError.message || errorMessage;
        } catch (e) {
            errorMessage = errorText;
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("✅ [createOrder] Success:", data);
      return data;
    } catch (error) {
      console.error("❌ [createOrder] FINAL CATCH ERROR:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Cancel order (PUT /api/orders/:id/cancel)
export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log("🛠️ [cancelOrder] Token:", token);

      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/cancel`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to cancel order");
      }
      const data = await response.json();
      return data.order; // returning updated order
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch My Orders
    builder
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create Order
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        // Check if payload has 'order' property or is the order itself
        const newOrder = action.payload.order || action.payload;
        state.orders.unshift(newOrder); 
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Cancel Order
    builder
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload;
        state.orders = state.orders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;