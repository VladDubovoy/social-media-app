import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMenuOpen: false,
  isProfileOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setMenuOpen: (state, action) => {
      state.isMenuOpen = action.payload;
    },
    setProfileOpen: (state, action) => {
      state.isProfileOpen = action.payload;
    },
  },
});

export const { setMenuOpen, setProfileOpen } = uiSlice.actions;
export default uiSlice.reducer; 