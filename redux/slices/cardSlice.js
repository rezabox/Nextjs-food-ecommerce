import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, qty } = action.payload;
      state.cart = [...state.cart, { ...product, qty }];
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((p) => p.id !== action.payload);
    },
    removeFromCart2: (state, action) => {
      state.cart = state.cart.filter((p) => p.id !== action.payload);
      toast.success("محصول با موفقیت حذف گردید.");
    },
    increment: (state, action) => {
      state.cart = state.cart.map((p) =>
        p.id === action.payload ? { ...p, qty: p.qty + 1 } : p
      );
      toast.info("یک واحد به محصول اضافه شد.");
      // Save cart to localStorage
    },
    decrement: (state, action) => {
      state.cart = state.cart.map((p) =>
        p.id === action.payload ? { ...p, qty: p.qty - 1 } : p
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
      toast.info("یک واحد از محصول کم شد.");
    },
    clear_item: (state, action) => {
      state.cart = [];
      localStorage.clear(); // Clear cart from localStorage
      toast.success("محصولات با موفقیت حذف شدند.");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increment,
  decrement,
  clear_item,
  removeFromCart2,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

// Load cart from localStorage when Redux store initializes
export const totalAmountCart = ({ shoppingCard }) => {
 return shoppingCard.cart.reduce((total, product) => {
    return product.is_sale
      ? total + product.sale_price * product.qty
      : total + product.price * product.qty;
  }, 0);
};
