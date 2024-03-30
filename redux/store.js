'use client'

import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cardSlice";


const store = configureStore({
  reducer: {
     shoppingCard: cartReducer
  },
});

export default store;