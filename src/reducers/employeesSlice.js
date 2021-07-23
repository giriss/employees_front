import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ENDPOINT } from '../app/constants';

const initialState = {
  items: [],
};

export const createEmployee = createAsyncThunk(
  'employees/create',
  async ({ employee, token }) => {
    const response = await axios.post(
      `${ENDPOINT}/employees`,
      { employee },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  },
);

export const listEmployees = createAsyncThunk(
  'employees/list',
  async (token) => {
    const response = await axios.get(
      `${ENDPOINT}/employees`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  },
);

export const deleteEmployee = createAsyncThunk(
  'employees/delete',
  async ({ employee: { id }, token }) => {
    await axios.delete(
      `${ENDPOINT}/employees/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return id;
  },
);

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(
      createEmployee.fulfilled,
      (state, { payload }) => {
        state.items = [payload, ...state.items];
      },
    );
    builder.addCase(
      listEmployees.fulfilled,
      (state, { payload }) => {
        state.items = payload.reverse();
      },
    );
    builder.addCase(
      deleteEmployee.fulfilled,
      (state, { payload: id }) => {
        state.items = state.items.filter(item => item.id !== id);
      },
    );
  },
});

export const selectEmployees = (state) => state.employees.items;

export default employeesSlice.reducer;
