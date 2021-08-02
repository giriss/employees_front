import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from '../reducers/employeesSlice';
import tokenReducer from '../reducers/tokenSlice';

const token = JSON.parse(window.sessionStorage.getItem('token'));

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    employees: employeesReducer,
  },
  ...(token ? { preloadedState: { token } } : {}),
});

store.subscribe(() => {
  window.sessionStorage.setItem('token', JSON.stringify(store.getState().token));
});
