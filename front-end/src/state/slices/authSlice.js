import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  activeProfileId: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setActiveProfile: (state, action) => {
      state.activeProfileId = action.payload.userId;
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.activeProfileId = null;
    },
  },
});

export const {
  setUser,
  setToken,
  setLogout,
  setActiveProfile,
} = authSlice.actions;

export default authSlice.reducer; 