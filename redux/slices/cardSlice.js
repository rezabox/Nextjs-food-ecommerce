'use client'

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
}

export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToCart: (state, action) => {
         console.log(state, action);
      },
      removeToCart: (state, action) => {
         
      }
   }

})

export const { addToCart } = cartSlice.actions;
export const  cartReducer  = cartSlice.reducer;