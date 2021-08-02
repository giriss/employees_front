import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from '../app/Axios';
import { ENDPOINT } from '../app/constants';

const initialState = {
  value: null,
  errors: [],
};

const makeUserRequest = async (
  { username, password, isCreate = false },
  { rejectWithValue },
) => {
  try {
    const response = await Axios.post(
      `${ENDPOINT}/users${isCreate ? '' : '/login'}`,
      {
        user: { username, password },
      },
    );
    return response.data.data.access_token;
  } catch (error) {
    const errors = error.response.data.errors;
    return rejectWithValue(
      Object.keys(errors).map(field => `${field} - ${errors[field]}`)
    );
  }
}

export const createUserAsync = createAsyncThunk(
  'token/createUser',
  async ({ username, password }, { rejectWithValue }) => {
    return makeUserRequest({ username, password, isCreate: true }, { rejectWithValue });
  }
);

export const fetchUserAsync = createAsyncThunk(
  'token/createUser',
  async ({ username, password }, { rejectWithValue }) => {
    return makeUserRequest({ username, password }, { rejectWithValue });
  }
);

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    clearErros(state) {
      state.errors = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      createUserAsync.fulfilled,
      (state, { payload }) => {
        state.value = payload;
      },
    ).addCase(
      createUserAsync.rejected,
      (state, { payload }) => {
        state.errors = payload;
      }
    );
  },
});

export const { clearErros } = tokenSlice.actions;

export const selectToken = (state) => state.token.value;
export const selectErrors = (state) => state.token.errors;

export default tokenSlice.reducer;
