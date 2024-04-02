'use client'

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cart: []
}

export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToCart: (state, action) => {
         const { product, qty } = action.payload;
         state.cart = [...state.cart , { ...product, qty:qty }]
         console.log(state.cart);
      },
      removeFromCart: (state, action) => {
        state.cart = state.cart.filter(p => p.id !== action.payload)
      },
      increment: (state, action) => {
        state.cart = state.cart.map(p => p.id === action.payload ? { ...p, qty: p.qty + 1 } : p)
      },
      decrement: (state, action) => {
        state.cart = state.cart.map(p => p.id === action.payload ? { ...p, qty: p.qty - 1  } : p)
      },
      clear_item: (state, action) => {
        state.cart = [];
        toast.success('محصولات با موفقیت حذف شدند.')
      }
   }
})

export const { addToCart, removeFromCart, increment, decrement, deletedProduct, clear_item } = cartSlice.actions;
export const  cartReducer  = cartSlice.reducer;