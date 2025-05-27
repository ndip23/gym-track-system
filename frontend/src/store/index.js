// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; // We'll create this next

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // other reducers will go here
  },
});