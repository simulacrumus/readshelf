import axios from "axios";
import store from '../store'
import { USER_LOGOUT } from '../actions/types';

const api = axios.create({
    baseURL: '/api/v1',
    headers: {
      'Content-Type': 'application/json'
    }
});

axios.defaults.headers.common = {authorization: `Bearer ${localStorage.getItem('token')}`}

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch({ type: USER_LOGOUT });
    }
    return Promise.reject(err);
  }
);

export default api