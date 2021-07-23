import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from '../reducers/employeesSlice';
import tokenReducer from '../reducers/tokenSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    employees: employeesReducer,
  },
});
