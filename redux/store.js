'use client'

import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cardSlice";
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage  
}

const persistedReducer = persistReducer(persistConfig, cartReducer)

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
  reducer: {
     shoppingCard: persistedReducer
  },
});
export default store;

export const persistor = persistStore(store)