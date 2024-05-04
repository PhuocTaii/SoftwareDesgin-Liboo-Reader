import axios from 'axios'
import {store} from '../store'

store.subscribe(listener)

axios.defaults.baseURL = 'http://localhost:8080/api';

function select(state) {
  return state.auth.currentUser?.access_token
}

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
})

// // Add a response interceptor
// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If the error status is 401 and there is no originalRequest._retry flag,
//     // it means the token has expired and we need to refresh it
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshToken = store.getState().auth.currentUser?.refresh_token;
//         const response = await axios.post('/refresh-token', { refreshToken });
//         const { token } = response.data;

//         // Retry the original request with the new token
//         originalRequest.headers.Authorization = `Bearer ${token}`;
//         return axios(originalRequest);
//       } catch (error) {
//         // Handle refresh token error or redirect to login
//         window.location.href = '/login';
//       }
//     }
//     return Promise.reject(error);
//   }
// );

function listener() {
  let token = select(store.getState())
  instance.defaults.headers.common['Authorization'] = "Bearer " + token;
}

export { instance }
export default axios