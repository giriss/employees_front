import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from '../reducers/employeesSlice';
import tokenReducer from '../reducers/tokenSlice';
import loadingReducer from '../reducers/loadingSlice';

const token = JSON.parse(window.localStorage.getItem('token'));

const store = configureStore({
  reducer: {
    token: tokenReducer,
    employees: employeesReducer,
    loading: loadingReducer,
  },
  ...(token ? { preloadedState: { token } } : {}),
});

store.subscribe(() => {
  window.localStorage.setItem('token', JSON.stringify(store.getState().token));
});

export { store };
