import axios from "axios";
import { hideLoader, showLoader } from "../reducers/loadingSlice";

const Axios = axios.create();

Axios.interceptors.request.use(requestConfig => {
  const { store } = require('./store');
  store.dispatch(showLoader());
  return requestConfig;
});

Axios.interceptors.response.use(
  response => {
    const { store } = require('./store');
    store.dispatch(hideLoader());
    return response;
  },
  error => {
    const { store } = require('./store');
    store.dispatch(hideLoader());
    throw error;
  }
)

export default Axios;
