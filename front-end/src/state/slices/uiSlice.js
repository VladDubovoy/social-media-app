import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'light',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

export const { setMode } = uiSlice.actions;

export default uiSlice.reducer; 