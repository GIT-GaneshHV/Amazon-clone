import { createSlice } from "@reduxjs/toolkit";

// Load old cart from localStorage
const savedCart = localStorage.getItem("cartItems");
const initialState = {
  items: savedCart ? JSON.parse(savedCart) : [],
};

// Save cart to localStorage helper
const saveCart = (items) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: Number(product.price),
          quantity: 1,
        });
      }

      saveCart(state.items);  // ✨ Save after add
    },

    removeFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);

      saveCart(state.items);  // ✨ Save after remove
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
