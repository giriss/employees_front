import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    showLoader(state) {
      state.value = true;
    },
    hideLoader(state) {
      state.value = false;
    },
  },
});

export const { showLoader, hideLoader } = loadingSlice.actions;

export const selectLoading = (state) => state.loading.value;

export default loadingSlice.reducer;
