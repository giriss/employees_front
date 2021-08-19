import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from '../app/Axios';
import { ENDPOINT } from '../app/constants';
import { camelToSnakeCaseObj, snakeToCamelCaseObj } from '../app/tools';

const initialState = {
  items: [],
};

export const createEmployee = createAsyncThunk(
  'employees/create',
  async ({ employee, token }, { rejectWithValue }) => {
    try {
      const response = await Axios.post(
        `${ENDPOINT}/employees`,
        { employee: camelToSnakeCaseObj(employee) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return snakeToCamelCaseObj(response.data.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateEmployee = createAsyncThunk(
  'employees/update',
  async ({ employee, token }) => {
    const response = await Axios.put(
      `${ENDPOINT}/employees/${employee.id}`,
      { employee: camelToSnakeCaseObj(employee) },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return snakeToCamelCaseObj(response.data.data);
  },
);

export const addEmployeePicture = createAsyncThunk(
  'employees/addPicture',
  async ({ id, picture, token }) => {
    const formData = new FormData();
    formData.append('picture', picture, picture.name);

    const response = await Axios.put(
      `${ENDPOINT}/employees/${id}/picture`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return snakeToCamelCaseObj(response.data.data);
  },
);

export const deleteEmployeePicture = createAsyncThunk(
  'employees/deletePicture',
  async ({ id, token }) => {
    const response = await Axios.delete(
      `${ENDPOINT}/employees/${id}/picture`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return snakeToCamelCaseObj(response.data.data);
  },
);

export const listEmployees = createAsyncThunk(
  'employees/list',
  async (token) => {
    const response = await Axios.get(
      `${ENDPOINT}/employees`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data.map(employee => snakeToCamelCaseObj(employee));
  },
);

export const deleteEmployee = createAsyncThunk(
  'employees/delete',
  async ({ employee: { id }, token }) => {
    await Axios.delete(
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
    builder.addCase(
      updateEmployee.fulfilled,
      (state, { payload }) => {
        const index = state.items.findIndex(e => e.id === payload.id);
        state.items[index] = payload;
      },
    );
    builder.addCase(
      addEmployeePicture.fulfilled,
      (state, { payload }) => {
        const index = state.items.findIndex(e => e.id === payload.id);
        state.items[index] = payload;
      },
    );
    builder.addCase(
      deleteEmployeePicture.fulfilled,
      (state, { payload }) => {
        const index = state.items.findIndex(e => e.id === payload.id);
        state.items[index] = payload;
      },
    );
  },
});

export const selectEmployees = (state) => state.employees.items;

export default employeesSlice.reducer;
