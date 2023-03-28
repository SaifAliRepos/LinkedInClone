import axios from 'axios';
import { SET_AlERT } from '../reducers/alertSlice';
import store from '../store';
// import store from '../store';
// import { LOGOUT } from '../actions/types';

// Create an instance of axios
const api = axios.create({
  baseURL: 'http://0.0.0.0:3005',
  headers: {
    'Content-Type': 'application/json'
  }
});
/*
  NOTE: intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
*/

// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response.status === 401) {
//       store.dispatch(SET_AlERT({ text: 'Welcome..', value: false }))
//     }
//     return Promise.reject(err);
//   }
// );

export default api;
