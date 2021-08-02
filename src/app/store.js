import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from '../reducers/employeesSlice';
import tokenReducer from '../reducers/tokenSlice';
import loadingReducer from '../reducers/loadingSlice';

const token = JSON.parse(window.sessionStorage.getItem('token'));

const store = function() {
  console.log('again?');
  return configureStore({
    reducer: {
      token: tokenReducer,
      employees: employeesReducer,
      loading: loadingReducer,
    },
    ...(token ? { preloadedState: { token } } : {}),
  });
} ();

console.log(store.getState());

store.subscribe(() => {
  window.sessionStorage.setItem('token', JSON.stringify(store.getState().token));
});

export { store };
