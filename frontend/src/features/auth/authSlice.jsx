// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start true for initial check
};

// Attempt to load user from localStorage
const storedUser = localStorage.getItem('fitTrackProUser');
if (storedUser) {
  try {
    initialState.user = JSON.parse(storedUser);
    initialState.isAuthenticated = !!initialState.user; // Set true if user is found
  } catch (e) {
    console.error("Failed to parse stored user:", e);
    localStorage.removeItem('fitTrackProUser'); // Clear corrupted data
  }
}
initialState.isLoading = false; // Initial check is done

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      localStorage.setItem('fitTrackProUser', JSON.stringify(action.payload));
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      // isLoading might be set to false here too, or handled by page reload
      localStorage.removeItem('fitTrackProUser');
    },
    setAuthLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { loginSuccess, logoutSuccess, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;