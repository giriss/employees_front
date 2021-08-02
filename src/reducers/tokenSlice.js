import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from '../app/Axios';
import { ENDPOINT } from '../app/constants';

const initialState = {
  value: '',
  expiry: 0,
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
    return {
      accessToken: response.data.data.access_token,
      expiry: response.data.data.expiry,
    };
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
      (state, { payload: { accessToken, expiry } }) => {
        state.value = accessToken;
        state.expiry = expiry;
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

export const selectToken = ({ token: { value } }) => value === '' ? false : value;
export const selectIsTokenValid = ({ token: { value, expiry } }) => (
  value !== '' && expiry >= Date.now() / 1_000
);
export const selectErrors = (state) => state.token.errors;

export default tokenSlice.reducer;
